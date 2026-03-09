import pickle
import numpy as np
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, schemas, models, auth
import os

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

model = None

def load_model():
    global model
    model_path = "backend/model/calorie_model.pkl"
    if os.path.exists(model_path):
        with open(model_path, "rb") as f:
            model = pickle.load(f)
    print("Model loaded successfully")

@router.post("/", response_model=schemas.PredictionResponse)
def predict(
    input_data: schemas.PredictionInput,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db)
):
    global model
    if model is None:
        load_model()
        if model is None:
             raise HTTPException(status_code=500, detail="Model not found")

    # Preprocess input
    gender_map = {models.Gender.MALE: 0, models.Gender.FEMALE: 1}
    activity_map = {
        models.ActivityLevel.SEDENTARY: 0,
        models.ActivityLevel.LIGHTLY_ACTIVE: 1,
        models.ActivityLevel.MODERATELY_ACTIVE: 2,
        models.ActivityLevel.VERY_ACTIVE: 3,
        models.ActivityLevel.EXTRA_ACTIVE: 4
    }

    features = pd.DataFrame([{
        "age": input_data.age,
        "gender": gender_map[input_data.gender],
        "height_cm": input_data.height_cm,
        "weight_kg": input_data.weight_kg,
        "activity_level": activity_map[input_data.activity_level]
    }])

    # Predict
    prediction = model.predict(features)[0]

    # Calculate BMI
    height_m = input_data.height_cm / 100
    bmi = input_data.weight_kg / (height_m ** 2)
    bmi = round(bmi, 2)

    # BMI Category
    if bmi < 18.5:
        bmi_category = "Underweight"
    elif 18.5 <= bmi < 24.9:
        bmi_category = "Normal Weight"
    elif 25 <= bmi < 29.9:
        bmi_category = "Overweight"
    else:
        bmi_category = "Obese"

    # Nutrition Plan Logic
    from ..services.nutrition_service import (
        adjust_calories_for_age,
        generate_meal_plan,
        calculate_nutrition_score,
        generate_parent_guidance
    )
    
    base_calories = prediction
    calories = adjust_calories_for_age(base_calories, input_data.age)

    is_veg = input_data.diet_preference and input_data.diet_preference.lower() == 'vegetarian'
    is_nut_free = input_data.allergies and 'nut' in input_data.allergies.lower()

    # Generate meal plan dynamically based on age logic
    meals, plan_type = generate_meal_plan(
        age=input_data.age,
        calories=calories,
        is_veg=is_veg,
        is_nut_free=is_nut_free
    )

    # Calculate status and score
    health_status = bmi_category
    nutrition_score = calculate_nutrition_score(health_status, is_veg)

    # Parent guidance
    parent_guidance = generate_parent_guidance(input_data.age, health_status, is_veg)

    # Save history
    history = models.PredictionHistory(
        user_id=current_user.id,
        age=input_data.age,
        gender=input_data.gender.value,
        height_cm=input_data.height_cm,
        weight_kg=input_data.weight_kg,
        activity_level=input_data.activity_level.value,
        caloric_needs=calories,
        bmi=bmi,
        bmi_category=bmi_category,
        diet_preference=input_data.diet_preference,
        allergies=input_data.allergies,
        health_status=health_status,
        nutrition_score=nutrition_score
    )
    db.add(history)
    db.commit()

    return {
        "caloric_needs": round(calories, 2),
        "bmi": bmi,
        "bmi_category": bmi_category,
        "daily_meal_plan": meals,
        "nutrition_score": nutrition_score,
        "health_status": health_status,
        "parent_guidance": parent_guidance,
        "message": f"Plan: {plan_type}"
    }

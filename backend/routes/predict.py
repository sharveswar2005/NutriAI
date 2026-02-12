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
    calories = prediction
    plan_type = ""
    meals = {}

    if calories < 1800:
        plan_type = "Weight Loss"
        meals = {
            "breakfast": "Oatmeal with berries and nuts (300 kcal)",
            "lunch": "Grilled chicken salad with olive oil dressing (500 kcal)",
            "dinner": "Steamed fish with quinoa and vegetables (400 kcal)",
            "snacks": "Greek yogurt or an apple (200 kcal)"
        }
    elif 1800 <= calories <= 2400:
        plan_type = "Maintenance"
        meals = {
            "breakfast": "Scrambled eggs with whole grain toast and avocado (500 kcal)",
            "lunch": "Turkey sandwich with plenty of veggies (700 kcal)",
            "dinner": "Grilled salmon with sweet potato and asparagus (600 kcal)",
            "snacks": "Handful of almonds and a banana (300 kcal)"
        }
    else: # > 2400
        plan_type = "Muscle Gain"
        meals = {
            "breakfast": "Large omelet with cheese, spinach, and toast (700 kcal)",
            "lunch": "Chicken breast with brown rice and broccoli (800 kcal)",
            "dinner": "Lean steak with baked potato and mixed greens (800 kcal)",
            "snacks": "Protein shake and peanut butter toast (500 kcal)"
        }

    # Save history
    history = models.PredictionHistory(
        user_id=current_user.id,
        age=input_data.age,
        gender=input_data.gender.value,
        height_cm=input_data.height_cm,
        weight_kg=input_data.weight_kg,
        activity_level=input_data.activity_level.value,
        caloric_needs=prediction,
        bmi=bmi,
        bmi_category=bmi_category
    )
    db.add(history)
    db.commit()

    return {
        "caloric_needs": round(prediction, 2),
        "bmi": bmi,
        "bmi_category": bmi_category,
        "nutrition_plan": meals,
        "message": f"Plan: {plan_type}"
    }

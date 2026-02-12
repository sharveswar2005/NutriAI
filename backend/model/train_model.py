import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import pickle
import os

# Create model directory if not exists
os.makedirs("backend/model", exist_ok=True)

def generate_synthetic_data(n_samples=5000):
    np.random.seed(42)
    
    # Random features
    age = np.random.randint(18, 80, n_samples)
    gender = np.random.choice([0, 1], n_samples) # 0: Male, 1: Female (Encoded)
    height = np.random.normal(170, 10, n_samples) # cm
    weight = np.random.normal(70, 15, n_samples) # kg
    activity_level = np.random.choice([0, 1, 2, 3, 4], n_samples) # 0: Sedentary -> 4: Extra Active
    
    # Calculate BMR (Mifflin-St Jeor Equation)
    # Men: 10W + 6.25H - 5A + 5
    # Women: 10W + 6.25H - 5A - 161
    bmr = []
    for i in range(n_samples):
        base = 10 * weight[i] + 6.25 * height[i] - 5 * age[i]
        if gender[i] == 0: # Male
            base += 5
        else: # Female
            base -= 161
        bmr.append(base)
    
    bmr = np.array(bmr)
    
    # Activity multipliers
    multipliers = {0: 1.2, 1: 1.375, 2: 1.55, 3: 1.725, 4: 1.9}
    tdee = []
    for i in range(n_samples):
        tdee.append(bmr[i] * multipliers[activity_level[i]])
        
    tdee = np.array(tdee)
    
    # Add random noise to make it "realistic" for ML to learn patterns, not just perfect formula
    noise = np.random.normal(0, 50, n_samples)
    calories = tdee + noise
    
    df = pd.DataFrame({
        'age': age,
        'gender': gender,
        'height_cm': height,
        'weight_kg': weight,
        'activity_level': activity_level,
        'calories': calories
    })
    
    return df

def train():
    print("Generating synthetic data...")
    df = generate_synthetic_data()
    
    X = df[['age', 'gender', 'height_cm', 'weight_kg', 'activity_level']]
    y = df['calories']
    
    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Regressor...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    print("Evaluating model...")
    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    rmse = np.sqrt(mean_squared_error(y_test, predictions))
    
    print(f"MAE: {mae:.2f}")
    print(f"RMSE: {rmse:.2f}")
    
    # Save model
    model_path = "backend/model/calorie_model.pkl"
    with open(model_path, "wb") as f:
        pickle.dump(model, f)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train()

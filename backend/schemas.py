from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from .models import ActivityLevel, Gender

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class PredictionInput(BaseModel):
    age: int
    gender: Gender
    height_cm: float
    weight_kg: float
    activity_level: ActivityLevel
    diet_preference: Optional[str] = None
    allergies: Optional[str] = None

class PredictionResponse(BaseModel):
    caloric_needs: float
    bmi: float
    bmi_category: str
    daily_meal_plan: dict
    nutrition_score: int
    health_status: str
    parent_guidance: List[str]
    message: str

class HistoryResponse(BaseModel):
    id: int
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    activity_level: str
    caloric_needs: float
    bmi: float
    bmi_category: str
    diet_preference: Optional[str] = None
    allergies: Optional[str] = None
    health_status: Optional[str] = None
    nutrition_score: Optional[int] = None
    timestamp: datetime

    class Config:
        from_attributes = True

class RecommendationRequest(BaseModel):
    weight_kg: float
    goal: str

class RecommendationResponse(BaseModel):
    calorie_estimation: float
    food_suggestions: List[str]

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    response: str

class InsightsResponse(BaseModel):
    low_stock_items: List[str]
    restocking_suggestions: List[str]
    most_used_items: List[str]

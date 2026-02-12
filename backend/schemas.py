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

class PredictionResponse(BaseModel):
    caloric_needs: float
    bmi: float
    bmi_category: str
    nutrition_plan: dict
    message: str

class HistoryResponse(BaseModel):
    id: int
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    activity_level: str
    caloric_needs: float
    timestamp: datetime

    class Config:
        from_attributes = True

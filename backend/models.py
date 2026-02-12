from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum as SqEnum
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime
import enum

class ActivityLevel(str, enum.Enum):
    SEDENTARY = "sedentary"
    LIGHTLY_ACTIVE = "lightly_active"
    MODERATELY_ACTIVE = "moderately_active"
    VERY_ACTIVE = "very_active"
    EXTRA_ACTIVE = "extra_active"

class Gender(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    predictions = relationship("PredictionHistory", back_populates="owner")

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    age = Column(Integer)
    gender = Column(String) # Stored as string to simplify, or use Enum
    height_cm = Column(Float)
    weight_kg = Column(Float)
    activity_level = Column(String)
    caloric_needs = Column(Float)
    bmi = Column(Float)
    bmi_category = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="predictions")

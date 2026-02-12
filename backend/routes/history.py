from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import database, schemas, models, auth

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

@router.get("/", response_model=List[schemas.HistoryResponse])
def get_history(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db)
):
    return current_user.predictions

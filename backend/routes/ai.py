from fastapi import APIRouter
from ..schemas import (
    RecommendationRequest, 
    RecommendationResponse, 
    QueryRequest, 
    QueryResponse, 
    InsightsResponse
)
from ..services.ai_engine import process_query
from ..services.recommendation import get_recommendation
from ..services.insights import get_inventory_insights

router = APIRouter()

@router.post("/recommend", response_model=RecommendationResponse)
def recommend(request: RecommendationRequest):
    """
    Suggests caloric needs and foods based on user weight and goal.
    """
    result = get_recommendation(request.weight_kg, request.goal)
    return result

@router.post("/ask", response_model=QueryResponse)
def ask_question(request: QueryRequest):
    """
    Parses a natural language query related to fitness and returns a response.
    """
    response = process_query(request.query)
    return {"response": response}

@router.get("/insights", response_model=InsightsResponse)
def insights():
    """
    Retrieves low stock items, restocking suggestions, and most used products.
    """
    return get_inventory_insights()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .database import engine, Base
from .routes import auth, predict, history, ai
from .routes.predict import load_model
import os

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NutriAI API")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(predict.router)
app.include_router(history.router)
app.include_router(ai.router, prefix="/ai", tags=["AI"])

@app.on_event("startup")
async def startup_event():
    # Load model on startup
    if os.path.exists("backend/model/calorie_model.pkl"):
        load_model()

@app.get("/")
def read_root():
    return {"message": "Welcome to NutriAI API"}

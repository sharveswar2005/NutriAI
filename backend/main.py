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

# Ensure dist and assets directories exist before mounting static files
os.makedirs("frontend/dist/assets", exist_ok=True)

# Mount static files
app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

# CORS
origins = [
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "https://nutriai-api.onrender.com", # Add render URL if needed, but not strictly necessary for CORS right now if it's served securely from the same origin.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
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

@app.get("/{path:path}")
async def serve_frontend(path: str):
    # Serve index.html for all non-API routes
    if not path.startswith("api/") and not path.startswith("docs") and not path.startswith("redoc"):
        return FileResponse("frontend/dist/index.html")
    return {"message": "Not found"}

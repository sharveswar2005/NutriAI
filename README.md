# NutriAI

AI-powered nutrition analysis application built with FastAPI backend and React frontend.

## Features

- User authentication and registration
- Nutrition prediction and analysis
- AI-powered insights and recommendations
- Interactive dashboard with charts
- History tracking

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy, scikit-learn, pandas
- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **Database**: SQLite (development) / PostgreSQL (production)

## Local Development

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations (if needed)
python migrate_db.py

# Start backend
python -m uvicorn backend.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Deployment

This application is configured for deployment on Render.com with:

- Python backend serving the API
- Built React frontend served as static files
- Automatic build process that installs dependencies and builds frontend

## API Documentation

Once running, visit `http://localhost:8000/docs` for interactive API documentation.
#!/usr/bin/env bash
# exit on error
set -o errexit

# --- Backend build ---
pip install --upgrade pip
pip install -r requirements.txt

# --- Frontend build ---
cd frontend
npm install
npm run build
cd ..

# Ensure assets directory exists so FastAPI doesn't crash if it looks for it before the build finishes or if 'dist/assets' is empty initially
mkdir -p frontend/dist/assets

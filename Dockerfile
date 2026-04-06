# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies for Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Copy Python requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Install Python package
RUN pip install -e .

# Build frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Copy built frontend to root
RUN cp -r dist/* /app/

# Go back to root
WORKDIR /app

# Expose port
EXPOSE 8000

# Start the application
CMD python -m uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}
#!/bin/bash

# Function to kill any process using port 3000 (frontend)
echo "🔍 Checking and killing any process using port 3000..."
PID=$(lsof -ti:3000)
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "✅ Process on port 3000 (PID: $PID) has been terminated."
else
  echo "✅ No process is using port 3000."
fi

# Start backend on port 8000
cd backend
echo "🚀 Starting backend on port 8000..."
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Move to frontend directory
cd ../frontend

# Build frontend
echo "📦 Building frontend..."
npm run build

# Start frontend in production mode
echo "🚀 Starting frontend on port 3000 (production)..."
npm start &
FRONTEND_PID=$!

# Wait for both processes to finish
wait $BACKEND_PID
wait $FRONTEND_PID

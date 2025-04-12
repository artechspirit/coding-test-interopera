#!/bin/bash

# Function to kill process using a specific port (Linux/macOS friendly)
kill_port_if_used() {
  local PORT=$1
  echo "🔍 Checking if port $PORT is in use..."

  # Use netstat or ss to find PID
  if command -v ss &> /dev/null; then
    PID=$(ss -ltnp "sport = :$PORT" | grep -Po 'pid=\K[0-9]+')
  elif command -v netstat &> /dev/null; then
    PID=$(netstat -ltnp 2>/dev/null | grep ":$PORT " | awk '{print $7}' | cut -d'/' -f1)
  else
    echo "⚠️ Neither ss nor netstat is available. Cannot check port $PORT."
    return
  fi

  if [ -n "$PID" ]; then
    echo "⚠️ Port $PORT is in use by PID $PID. Killing..."
    kill -9 "$PID"
    echo "✅ Process on port $PORT (PID: $PID) has been terminated."
  else
    echo "✅ Port $PORT is free."
  fi
}

# Kill ports if used
kill_port_if_used 3000
kill_port_if_used 8000

# --- Backend setup ---
cd backend
echo "📦 Checking backend dependencies..."

if [ ! -d ".venv" ] && ! pip freeze | grep -q fastapi; then
  echo "📥 Installing backend dependencies..."
  pip install -r requirements.txt
else
  echo "✅ Backend dependencies already installed."
fi

echo "🚀 Starting backend on port 8000..."
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# --- Frontend setup ---
cd ../frontend
echo "📦 Checking frontend dependencies..."

if [ ! -d "node_modules" ]; then
  echo "📥 Installing frontend dependencies..."
  npm install
else
  echo "✅ Frontend dependencies already installed."
fi

if [ ! -d ".next" ]; then
  echo "🔧 Building frontend..."
  npm run build
else
  echo "✅ Frontend already built."
fi

echo "🚀 Starting frontend on port 3000 (production)..."
npm start &
FRONTEND_PID=$!

# Wait for both processes to finish
wait $BACKEND_PID
wait $FRONTEND_PID

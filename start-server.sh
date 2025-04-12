#!/bin/bash

# start frontend and backend parallelly

# Pindah ke folder backend dan jalankan server
cd backend
echo "Starting backend..."
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Pindah ke folder frontend dan jalankan dev server
cd ../frontend
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Menunggu proses
wait $BACKEND_PID
wait $FRONTEND_PID

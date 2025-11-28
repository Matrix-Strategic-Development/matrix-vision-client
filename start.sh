#!/bin/bash

echo "🚀 Starting Matrix Vision System..."

echo "📦 Installing Python dependencies..."
cd server
python3 -m venv venv 2>/dev/null || true
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

echo "🗄️  Setting up database..."
python -c "
from app.core.database import engine, Base
import asyncio

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print('✅ Database initialized')

asyncio.run(init_db())
" 2>/dev/null || echo "⚠️  Database already exists or could not be created"

echo "🐍 Starting FastAPI backend on http://localhost:8000..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

cd ..

echo "📦 Installing Node.js dependencies..."
npm install > /dev/null 2>&1

echo "⚛️  Starting Next.js frontend on http://localhost:3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Matrix Vision is running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers..."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

wait

#!/bin/bash

echo "🔧 Fixing backend configuration..."

cd server

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_HOST=localhost
DATABASE_PASSWORD=root
DATABASE_NAME=matrix-vision

API_V1_STR=/api/v1
PROJECT_NAME=Matrix Vision API
VERSION=1.0.0
EOF
fi

echo "✅ Backend configuration fixed!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create database: createdb matrix-vision"
echo "3. Start backend: cd server && uvicorn app.main:app --reload"
echo "4. Generate mock data: cd server && python generate_mock_data.py"
echo "5. Start frontend: npm run dev"
echo ""
echo "Or run everything with: ./start.sh"

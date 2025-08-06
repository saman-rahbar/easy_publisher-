#!/bin/bash

echo "🎓 Scholarly Publishing Platform - Local Demo"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version is below 18. Some features may not work properly."
    echo "   Recommended: Upgrade to Node.js 18+"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Set up environment variables
if [ ! -f ".env.local" ]; then
    echo "⚙️  Setting up environment variables..."
    cp env.example .env.local
    
    # Generate a secure NEXTAUTH_SECRET
    SECRET=$(openssl rand -base64 32)
    sed -i '' "s/your-secret-key-here/$SECRET/" .env.local
    
    echo "✅ Environment variables configured!"
fi

# Set up database
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma db push

# Start the development server
echo "🚀 Starting development server..."
echo "📱 Open your browser and go to: http://localhost:3000"
echo "🎯 Demo features available at: http://localhost:3000/demo"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev 
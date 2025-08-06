#!/bin/bash

echo "🚀 Scholarly Publisher Desktop Setup"
echo "===================================="

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

echo "📦 Installing main dependencies..."
npm install

echo "📦 Installing Electron dependencies..."
cd electron
npm install
cd ..

echo "🔨 Building the application..."
npm run build

echo "🖥️  Setting up Electron..."
cd electron
npm install

echo "✅ Setup complete!"
echo ""
echo "🎯 Available commands:"
echo "  npm run electron:dev     - Start development mode"
echo "  npm run desktop:mac      - Build for macOS"
echo "  npm run desktop:win      - Build for Windows"
echo "  npm run desktop:linux    - Build for Linux"
echo ""
echo "🚀 To start development:"
echo "  npm run electron:dev"
echo ""
echo "📦 To build for distribution:"
echo "  npm run desktop:mac      # For macOS (.dmg)"
echo "  npm run desktop:win      # For Windows (.exe)"
echo "  npm run desktop:linux    # For Linux (.AppImage)" 
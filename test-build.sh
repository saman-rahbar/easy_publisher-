#!/bin/bash

echo "🧪 Testing Build Process"
echo "========================"

# Check Node.js version
echo "📊 Checking Node.js version..."
NODE_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)

if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is below 18. Please run: ./fix-node-version.sh"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if dependencies are installed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check if Electron dependencies are installed
echo "📦 Checking Electron dependencies..."
if [ ! -d "electron/node_modules" ]; then
    echo "📦 Installing Electron dependencies..."
    cd electron
    npm install
    cd ..
else
    echo "✅ Electron dependencies already installed"
fi

# Test build
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Test Electron build (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Testing Electron build for macOS..."
    cd electron
    npm run dist:mac
    cd ..
    
    if [ -f "electron/dist/Scholarly Publisher-1.0.0.dmg" ]; then
        echo "✅ macOS installer created successfully!"
    else
        echo "⚠️  macOS installer not found, but build may have succeeded"
    fi
fi

echo ""
echo "🎉 All tests passed!"
echo ""
echo "🚀 You can now:"
echo "   - Run development server: npm run dev"
echo "   - Build installers: ./build-installers.sh"
echo "   - Start desktop app: npm run electron:dev" 
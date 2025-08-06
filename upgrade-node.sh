#!/bin/bash

echo "🔧 Node.js Version Upgrade Script"
echo "================================="

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "❌ nvm (Node Version Manager) is not installed."
    echo ""
    echo "📦 Installing nvm..."
    echo "Please run the following command:"
    echo ""
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo ""
    echo "Then restart your terminal and run this script again."
    exit 1
fi

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Get current Node.js version
CURRENT_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.17.0"

echo "📊 Current Node.js version: $CURRENT_VERSION"
echo "📊 Required Node.js version: $REQUIRED_VERSION"

# Check if current version meets requirements
if node --version | grep -q "v18\|v19\|v20\|v21"; then
    echo "✅ Node.js version is compatible!"
    echo "🚀 You can now run: npm run dev"
    exit 0
fi

echo "⚠️  Node.js version needs to be upgraded."
echo ""

# Install the required version
echo "📦 Installing Node.js $REQUIRED_VERSION..."
nvm install $REQUIRED_VERSION

# Use the installed version
echo "🔄 Switching to Node.js $REQUIRED_VERSION..."
nvm use $REQUIRED_VERSION

# Set as default
echo "🔧 Setting as default version..."
nvm alias default $REQUIRED_VERSION

echo ""
echo "✅ Node.js has been upgraded successfully!"
echo "📊 New version: $(node --version)"
echo ""
echo "🚀 You can now run:"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "💡 To verify the installation:"
echo "   node --version"
echo "   npm --version" 
#!/bin/bash

echo "🔧 Node.js Version Fix Script"
echo "============================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check current Node.js version
CURRENT_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2)
REQUIRED_VERSION="18.17.0"

echo "📊 Current Node.js version: ${CURRENT_VERSION:-'Not installed'}"
echo "📊 Required Node.js version: $REQUIRED_VERSION"

# Check if current version meets requirements
if [[ "$CURRENT_VERSION" != "" ]] && node --version | grep -q "v18\|v19\|v20\|v21"; then
    echo "✅ Node.js version is compatible!"
    echo "🚀 You can now run: npm run dev"
    exit 0
fi

echo "⚠️  Node.js version needs to be upgraded or installed."
echo ""

# Try different installation methods
echo "🔍 Detecting installation method..."

# Method 1: Check if nvm is available
if command_exists nvm; then
    echo "📦 Using nvm to install Node.js..."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    nvm install $REQUIRED_VERSION
    nvm use $REQUIRED_VERSION
    nvm alias default $REQUIRED_VERSION
    
    echo "✅ Node.js installed via nvm!"
    
elif command_exists brew; then
    echo "📦 Using Homebrew to install Node.js..."
    brew install node@18
    brew link node@18 --force
    
    echo "✅ Node.js installed via Homebrew!"
    
elif command_exists apt-get; then
    echo "📦 Using apt to install Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    echo "✅ Node.js installed via apt!"
    
elif command_exists yum; then
    echo "📦 Using yum to install Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
    
    echo "✅ Node.js installed via yum!"
    
else
    echo "❌ No package manager detected."
    echo ""
    echo "📦 Please install Node.js manually:"
    echo ""
    echo "Option 1: Install nvm (recommended)"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "  # Then restart terminal and run: nvm install 18.17.0"
    echo ""
    echo "Option 2: Download from nodejs.org"
    echo "  Visit: https://nodejs.org/en/download/"
    echo "  Download Node.js 18.17.0 or later"
    echo ""
    echo "Option 3: Use Homebrew (macOS)"
    echo "  brew install node@18"
    echo ""
    exit 1
fi

# Verify installation
echo ""
echo "🔍 Verifying installation..."
NEW_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2)

if [[ "$NEW_VERSION" != "" ]] && node --version | grep -q "v18\|v19\|v20\|v21"; then
    echo "✅ Node.js successfully installed!"
    echo "📊 New version: $(node --version)"
    echo ""
    echo "🚀 You can now run:"
    echo "   npm install"
    echo "   npm run dev"
    echo ""
    echo "💡 To verify:"
    echo "   node --version"
    echo "   npm --version"
else
    echo "❌ Node.js installation failed or version is still incompatible."
    echo "Please try installing manually."
    exit 1
fi 
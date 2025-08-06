#!/bin/bash

echo "🚀 Scholarly Publisher - Release Builder"
echo "========================================"

# Check Node.js version
echo "📊 Checking Node.js version..."
NODE_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)

if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is below 18. Please run: ./fix-node-version.sh"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup Electron
echo "📦 Setting up Electron..."
cd electron
npm install
cd ..

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors above."
    exit 1
fi

echo "✅ Build successful!"

# Create icons
echo "🎨 Creating app icons..."
mkdir -p electron/assets

# Create SVG icon
cat > electron/assets/icon.svg << 'EOF'
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="80" fill="url(#grad)"/>
  <g transform="translate(128, 128) scale(0.5)">
    <path d="M 50 200 L 200 50 L 150 100 L 250 150 L 200 200 L 150 150 L 200 200 L 150 250 L 100 200 Z" 
          fill="white" stroke="white" stroke-width="2"/>
    <line x1="150" y1="100" x2="200" y2="200" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
  </g>
</svg>
EOF

# Convert icons if ImageMagick is available
if command -v convert &> /dev/null; then
    echo "🔄 Converting icons..."
    convert electron/assets/icon.svg -resize 512x512 electron/assets/icon.png
    convert electron/assets/icon.svg -resize 256x256 electron/assets/icon.ico
    convert electron/assets/icon.svg -resize 512x512 electron/assets/icon.icns
else
    echo "⚠️  ImageMagick not available, using placeholder icons"
    echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" | base64 -d > electron/assets/icon.png
    cp electron/assets/icon.png electron/assets/icon.ico
    cp electron/assets/icon.png electron/assets/icon.icns
fi

# Build installers
echo "📦 Building installers..."

PLATFORM=$(uname -s)
case $PLATFORM in
    Darwin*)
        echo "🍎 Building for macOS..."
        cd electron
        npm run dist:mac
        cd ..
        echo "✅ macOS installer created!"
        ;;
    Linux*)
        echo "🐧 Building for Linux..."
        cd electron
        npm run dist:linux
        cd ..
        echo "✅ Linux installer created!"
        ;;
    MINGW*|MSYS*|CYGWIN*)
        echo "🪟 Building for Windows..."
        cd electron
        npm run dist:win
        cd ..
        echo "✅ Windows installer created!"
        ;;
    *)
        echo "❓ Unknown platform: $PLATFORM"
        echo "💡 You can manually build for specific platforms:"
        echo "   npm run desktop:mac    # For macOS"
        echo "   npm run desktop:win    # For Windows"
        echo "   npm run desktop:linux  # For Linux"
        ;;
esac

echo ""
echo "🎉 Build complete!"
echo ""
echo "📁 Installers are located in: electron/dist/"
echo ""

# List created files
if [ -d "electron/dist" ]; then
    echo "📦 Available installers:"
    ls -la electron/dist/
    echo ""
else
    echo "⚠️  No installers found in electron/dist/"
    echo "   Check the build logs above for errors"
fi

echo "🚀 Next steps:"
echo "   1. Test the installers locally"
echo "   2. Create a GitHub release:"
echo "      - Go to: https://github.com/saman-rahbar/easy_publisher-/releases"
echo "      - Click 'Create a new release'"
echo "      - Tag: v1.0.0"
echo "      - Title: Scholarly Publisher v1.0.0"
echo "      - Upload the installer files from electron/dist/"
echo "   3. Share the release links with users"
echo ""
echo "💡 For automatic builds on GitHub:"
echo "   - Create a release with tag v1.0.0"
echo "   - GitHub Actions will automatically build installers"
echo "   - Download links will be available in the release" 
#!/bin/bash

echo "🚀 Scholarly Publisher - Installer Builder"
echo "=========================================="

# Check if Node.js is installed and correct version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version is below 18. Please upgrade first:"
    echo "   ./upgrade-node.sh"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "📦 Installing Electron dependencies..."
cd electron
npm install
cd ..

echo "🔨 Building the application..."
npm run build

echo "🎨 Creating app icons..."
# Create a simple SVG icon based on the paper airplane design
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
    <!-- Paper airplane -->
    <path d="M 50 200 L 200 50 L 150 100 L 250 150 L 200 200 L 150 150 L 200 200 L 150 250 L 100 200 Z" 
          fill="white" stroke="white" stroke-width="2"/>
    <!-- Fold line -->
    <line x1="150" y1="100" x2="200" y2="200" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
  </g>
</svg>
EOF

echo "🖼️  Converting icons..."
# Install imagemagick if not available
if ! command -v convert &> /dev/null; then
    echo "📦 Installing ImageMagick..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install imagemagick
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y imagemagick
    else
        echo "⚠️  Please install ImageMagick manually for icon conversion"
    fi
fi

# Convert SVG to different formats
if command -v convert &> /dev/null; then
    echo "🔄 Converting to PNG..."
    convert electron/assets/icon.svg -resize 512x512 electron/assets/icon.png
    
    echo "🔄 Converting to ICO (Windows)..."
    convert electron/assets/icon.svg -resize 256x256 electron/assets/icon.ico
    
    echo "🔄 Converting to ICNS (macOS)..."
    # Create different sizes for ICNS
    convert electron/assets/icon.svg -resize 16x16 electron/assets/icon_16.png
    convert electron/assets/icon.svg -resize 32x32 electron/assets/icon_32.png
    convert electron/assets/icon.svg -resize 128x128 electron/assets/icon_128.png
    convert electron/assets/icon.svg -resize 256x256 electron/assets/icon_256.png
    convert electron/assets/icon.svg -resize 512x512 electron/assets/icon_512.png
    
    # Create ICNS file (macOS)
    if command -v iconutil &> /dev/null; then
        mkdir -p electron/assets/icon.iconset
        cp electron/assets/icon_16.png electron/assets/icon.iconset/icon_16x16.png
        cp electron/assets/icon_32.png electron/assets/icon.iconset/icon_16x16@2x.png
        cp electron/assets/icon_32.png electron/assets/icon.iconset/icon_32x32.png
        cp electron/assets/icon_64.png electron/assets/icon.iconset/icon_32x32@2x.png
        cp electron/assets/icon_128.png electron/assets/icon.iconset/icon_128x128.png
        cp electron/assets/icon_256.png electron/assets/icon.iconset/icon_128x128@2x.png
        cp electron/assets/icon_256.png electron/assets/icon.iconset/icon_256x256.png
        cp electron/assets/icon_512.png electron/assets/icon.iconset/icon_256x256@2x.png
        cp electron/assets/icon_512.png electron/assets/icon.iconset/icon_512x512.png
        cp electron/assets/icon_512.png electron/assets/icon.iconset/icon_512x512@2x.png
        iconutil -c icns electron/assets/icon.iconset -o electron/assets/icon.icns
        rm -rf electron/assets/icon.iconset
        rm electron/assets/icon_*.png
    else
        echo "⚠️  iconutil not available, using PNG as fallback"
        cp electron/assets/icon.png electron/assets/icon.icns
    fi
else
    echo "⚠️  ImageMagick not available, using placeholder icons"
    # Create placeholder icons
    echo "📝 Creating placeholder icons..."
    echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" | base64 -d > electron/assets/icon.png
    cp electron/assets/icon.png electron/assets/icon.ico
    cp electron/assets/icon.png electron/assets/icon.icns
fi

echo "📦 Building installers..."

# Build for current platform
PLATFORM=$(uname -s)
case $PLATFORM in
    Darwin*)
        echo "🍎 Building for macOS..."
        cd electron
        npm run dist:mac
        cd ..
        echo "✅ macOS installer created in electron/dist/"
        ;;
    Linux*)
        echo "🐧 Building for Linux..."
        cd electron
        npm run dist:linux
        cd ..
        echo "✅ Linux installer created in electron/dist/"
        ;;
    MINGW*|MSYS*|CYGWIN*)
        echo "🪟 Building for Windows..."
        cd electron
        npm run dist:win
        cd ..
        echo "✅ Windows installer created in electron/dist/"
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
echo "📦 Available installers:"
ls -la electron/dist/ 2>/dev/null || echo "   (No installers found - check build logs above)"
echo ""
echo "🚀 To distribute:"
echo "   1. Upload installers to GitHub Releases"
echo "   2. Share download links with users"
echo "   3. Users can install without coding knowledge"
echo ""
echo "💡 Next steps:"
echo "   - Test installers on target platforms"
echo "   - Create GitHub release with installers"
echo "   - Share download links with your audience" 
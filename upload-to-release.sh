#!/bin/bash

echo "📤 Uploading Installers to GitHub Release"
echo "=========================================="

# Check if installers exist
if [ ! -d "electron/dist" ]; then
    echo "❌ No installers found. Please run ./create-release.sh first."
    exit 1
fi

echo "📦 Found installers in electron/dist/:"
ls -la electron/dist/*.dmg electron/dist/*.zip 2>/dev/null || echo "   No .dmg or .zip files found"

echo ""
echo "🚀 To upload these to your GitHub release:"
echo ""
echo "1. Go to: https://github.com/saman-rahbar/easy_publisher-/releases"
echo "2. Click on your release (v1.0.0)"
echo "3. Click 'Edit release'"
echo "4. Scroll down to 'Attach binaries'"
echo "5. Drag and drop these files:"
echo ""

# List the files to upload
for file in electron/dist/*.dmg electron/dist/*.zip; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        size=$(du -h "$file" | cut -f1)
        echo "   📁 $filename ($size)"
    fi
done

echo ""
echo "6. Add a description (optional):"
echo "   - macOS: Drag to Applications folder"
echo "   - Windows: Run the installer"
echo "   - Linux: Make executable and run"
echo ""
echo "7. Click 'Update release'"
echo ""
echo "✅ Your download links will then work!"
echo ""
echo "💡 Alternative: Use GitHub CLI (if installed)"
echo "   gh release upload v1.0.0 electron/dist/*.dmg electron/dist/*.zip" 
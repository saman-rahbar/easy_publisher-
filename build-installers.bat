@echo off
echo 🚀 Scholarly Publisher - Installer Builder
echo ==========================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

echo 📦 Installing Electron dependencies...
cd electron
call npm install
cd ..

echo 🔨 Building the application...
call npm run build

echo 🎨 Creating app icons...
REM Create a simple SVG icon based on the paper airplane design
echo ^<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"^> > electron\assets\icon.svg
echo   ^<defs^> >> electron\assets\icon.svg
echo     ^<linearGradient id="grad" x1="0%%" y1="0%%" x2="100%%" y2="100%%"^> >> electron\assets\icon.svg
echo       ^<stop offset="0%%" style="stop-color:#3B82F6;stop-opacity:1" /^> >> electron\assets\icon.svg
echo       ^<stop offset="100%%" style="stop-color:#1D4ED8;stop-opacity:1" /^> >> electron\assets\icon.svg
echo     ^</linearGradient^> >> electron\assets\icon.svg
echo   ^</defs^> >> electron\assets\icon.svg
echo   ^<rect width="512" height="512" rx="80" fill="url(#grad)"/^> >> electron\assets\icon.svg
echo   ^<g transform="translate(128, 128) scale(0.5)"^> >> electron\assets\icon.svg
echo     ^<!-- Paper airplane --^> >> electron\assets\icon.svg
echo     ^<path d="M 50 200 L 200 50 L 150 100 L 250 150 L 200 200 L 150 150 L 200 200 L 150 250 L 100 200 Z" fill="white" stroke="white" stroke-width="2"/^> >> electron\assets\icon.svg
echo     ^<!-- Fold line --^> >> electron\assets\icon.svg
echo     ^<line x1="150" y1="100" x2="200" y2="200" stroke="rgba(255,255,255,0.3)" stroke-width="3"/^> >> electron\assets\icon.svg
echo   ^</g^> >> electron\assets\icon.svg
echo ^</svg^> >> electron\assets\icon.svg

echo 🖼️ Converting icons...
REM Check if ImageMagick is available
magick --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🔄 Converting to PNG...
    magick electron\assets\icon.svg -resize 512x512 electron\assets\icon.png
    
    echo 🔄 Converting to ICO (Windows)...
    magick electron\assets\icon.svg -resize 256x256 electron\assets\icon.ico
    
    echo 🔄 Converting to ICNS (macOS)...
    magick electron\assets\icon.svg -resize 512x512 electron\assets\icon.icns
) else (
    echo ⚠️ ImageMagick not available, using placeholder icons
    echo 📝 Creating placeholder icons...
    echo iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg== > temp.b64
    certutil -decode temp.b64 electron\assets\icon.png >nul 2>&1
    copy electron\assets\icon.png electron\assets\icon.ico >nul
    copy electron\assets\icon.png electron\assets\icon.icns >nul
    del temp.b64
)

echo 📦 Building installers...

echo 🪟 Building for Windows...
cd electron
call npm run dist:win
cd ..

echo.
echo 🎉 Build complete!
echo.
echo 📁 Installers are located in: electron\dist\
echo.
echo 📦 Available installers:
dir electron\dist\ 2>nul || echo    (No installers found - check build logs above)
echo.
echo 🚀 To distribute:
echo    1. Upload installers to GitHub Releases
echo    2. Share download links with users
echo    3. Users can install without coding knowledge
echo.
echo 💡 Next steps:
echo    - Test installers on target platforms
echo    - Create GitHub release with installers
echo    - Share download links with your audience
pause 
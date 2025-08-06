@echo off
echo 🚀 Scholarly Publisher Desktop Setup
echo ====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo 📦 Installing main dependencies...
call npm install

echo 📦 Installing Electron dependencies...
cd electron
call npm install
cd ..

echo 🔨 Building the application...
call npm run build

echo 🖥️ Setting up Electron...
cd electron
call npm install
cd ..

echo ✅ Setup complete!
echo.
echo 🎯 Available commands:
echo   npm run electron:dev     - Start development mode
echo   npm run desktop:mac      - Build for macOS
echo   npm run desktop:win      - Build for Windows
echo   npm run desktop:linux    - Build for Linux
echo.
echo 🚀 To start development:
echo   npm run electron:dev
echo.
echo 📦 To build for distribution:
echo   npm run desktop:win      # For Windows (.exe)
echo.
pause 
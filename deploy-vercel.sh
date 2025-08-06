#!/bin/bash

echo "🚀 Deploying to Vercel..."
echo "=========================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    echo "This will open a browser window for authentication."
    vercel login
fi

# Deploy
echo "🚀 Deploying..."
vercel --prod --yes

echo "✅ Deployment complete!"
echo "📝 Your live demo URL will be shown above." 
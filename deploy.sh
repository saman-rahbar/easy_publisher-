#!/bin/bash

echo "🚀 Scholarly Publishing Platform - Deployment Script"
echo "=================================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --yes

echo "✅ Deployment complete!"
echo "📝 Don't forget to set up your environment variables in the Vercel dashboard:"
echo "   - DATABASE_URL (use Vercel Postgres or external database)"
echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
echo "   - NEXTAUTH_URL (your Vercel deployment URL)" 
#!/bin/bash

echo "🚀 AI Umpire Agent - Google Cloud Deployment Script"
echo "=================================================="

# Step 1: Create App Engine application
echo "📱 Creating App Engine application..."
gcloud app create --region=us-central1

# Step 2: Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable storage.googleapis.com

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 4: Deploy to App Engine
echo "🚀 Deploying to Google Cloud..."
gcloud app deploy --quiet

# Step 5: Open the deployed application
echo "🌐 Opening your deployed application..."
gcloud app browse

echo "✅ Deployment complete!"
echo "Your AI Umpire Agent is now live on Google Cloud!"

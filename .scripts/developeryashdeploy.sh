#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the appnpm install next-iron-session

git pull git@github.com:iamyashsinghh/my-office.git
echo "New changes copied to server !"

echo "Installing Dependencies..."
npm install --yes

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload 0

echo "Deployment Finished!"
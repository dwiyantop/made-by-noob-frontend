#!/bin/bash

# Script to push to both origin (organization) and mirror (personal) repositories
# Usage: ./push-mirror.sh [branch-name]
# Default branch: main

BRANCH=${1:-main}

echo "🚀 Pushing to origin (MadeByNoob organization)..."
git push origin $BRANCH

if [ $? -eq 0 ]; then
  echo "✅ Successfully pushed to origin"
else
  echo "❌ Failed to push to origin"
  exit 1
fi

echo ""
echo "🪞 Pushing to mirror (dwiyantop personal)..."
git push mirror $BRANCH

if [ $? -eq 0 ]; then
  echo "✅ Successfully pushed to mirror"
  echo ""
  echo "🎉 All done! Code is synced to both repositories."
else
  echo "❌ Failed to push to mirror"
  echo "⚠️  Origin push succeeded, but mirror push failed"
  exit 1
fi


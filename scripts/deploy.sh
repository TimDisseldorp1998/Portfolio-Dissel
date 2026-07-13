#!/usr/bin/env bash
set -e

# Deploy to the TEST environment: builds and pushes the current feature
# branch (experimental). Hostinger auto-deploys experimental to
# dev.disseldesign.com, so the built out/ must be committed here too.
# Promote to the live site (main → disseldesign.com) with: npm run ship

MESSAGE="${1:-Deploy}"
CURRENT=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT" = "main" ]; then
  echo ""
  echo "❌ You're on 'main' (live). 'deploy' targets the test branch (experimental)."
  echo "   To promote experimental → main, use: npm run ship \"...\""
  exit 1
fi

echo ""
echo "→ [1/4] Building static site…"
rm -rf .next out
npm run build

echo ""
echo "→ [2/4] Staging source + built output…"
git add -A

if git diff --cached --quiet; then
  echo ""
  echo "ℹ️  No changes to commit. Nothing to deploy."
  exit 0
fi

echo ""
echo "→ [3/4] Committing: \"$MESSAGE\""
git commit -m "$MESSAGE"

echo ""
echo "→ [4/4] Pushing '$CURRENT' to GitHub…"
git push -u origin "$CURRENT"

echo ""
echo "✅ Pushed to '$CURRENT' — check it on https://dev.disseldesign.com"
echo "   (open in an incognito window to skip cache)"
echo ""
echo "   Happy with the result? Promote it to the live site:"
echo "   → npm run ship \"your message\""
echo ""

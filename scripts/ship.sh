#!/usr/bin/env bash
set -e

MESSAGE="${1:-Ship}"
CURRENT=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT" = "main" ]; then
  echo ""
  echo "❌ You're already on 'main'."
  echo "   Ship is meant to promote a feature branch (like 'experimental') to main."
  echo "   If you want to build & push main directly, use: npm run deploy \"...\""
  exit 1
fi

# Refuse if there are uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo ""
  echo "❌ You have uncommitted changes on '$CURRENT'."
  echo "   Save them first with: npm run deploy \"your message\""
  echo "   Then run: npm run ship \"...\""
  exit 1
fi

echo ""
echo "→ [1/7] Fetching latest from GitHub…"
git fetch origin

echo ""
echo "→ [2/7] Switching to main…"
git checkout main

echo ""
echo "→ [3/7] Pulling latest main…"
git pull origin main

echo ""
echo "→ [4/7] Merging '$CURRENT' → main ($MESSAGE)…"
git merge --no-ff "$CURRENT" -m "$MESSAGE"

echo ""
echo "→ [5/7] Building fresh static output…"
npm run build

echo ""
echo "→ [6/7] Staging any rebuild changes…"
git add .
if git diff --cached --quiet; then
  echo "  (No rebuild changes to commit)"
else
  git commit -m "Rebuild output for: $MESSAGE"
fi

echo ""
echo "→ [7/7] Pushing main to GitHub…"
git push

echo ""
echo "→ Switching back to '$CURRENT'…"
git checkout "$CURRENT"

echo ""
echo "✅ Shipped '$CURRENT' → main!"
echo ""
echo "   Last step (manual, Hostinger has no auto-deploy):"
echo "   → hPanel → Websites → disseldesign.com → Advanced → Git → Deployments"
echo "   → Click the purple 'Redeploy' button"
echo ""

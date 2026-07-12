#!/usr/bin/env bash
set -e

MESSAGE="${1:-Deploy}"
CURRENT=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT" = "main" ]; then
  echo ""
  echo "❌ You're on 'main'. 'deploy' is for feature branches (like experimental)."
  echo "   To promote experimental → main, use: npm run ship \"...\""
  exit 1
fi

echo ""
echo "→ [1/3] Staging source changes (excluding /out/ build artifacts)…"
# Stage everything except the build output — only main tracks fresh out/.
git add -A -- ':!out'

if git diff --cached --quiet; then
  echo ""
  echo "ℹ️  No source changes to commit. Nothing to deploy."
  exit 0
fi

echo ""
echo "→ [2/3] Committing: \"$MESSAGE\""
git commit -m "$MESSAGE"

echo ""
echo "→ [3/3] Pushing '$CURRENT' to GitHub…"
git push -u origin "$CURRENT"

echo ""
echo "✅ Saved to '$CURRENT' on GitHub. Not live yet."
echo ""
echo "   When you're happy with local testing, ship it:"
echo "   → npm run ship \"your message\""
echo ""

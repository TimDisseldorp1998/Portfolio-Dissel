#!/usr/bin/env bash
set -e

MESSAGE="${1:-Deploy}"

echo ""
echo "→ [1/4] Building static site (this compiles your source into HTML)…"
npm run build

echo ""
echo "→ [2/4] Staging all changes…"
git add .

if git diff --cached --quiet; then
  echo ""
  echo "ℹ️  No changes to commit. Nothing to deploy."
  exit 0
fi

echo ""
echo "→ [3/4] Committing: \"$MESSAGE\""
git commit -m "$MESSAGE"

echo ""
echo "→ [4/4] Pushing to GitHub…"
git push

echo ""
echo "✅ Done! Changes are on GitHub."
echo ""
echo "   Last step (manual, because Hostinger has no auto-deploy):"
echo "   → hPanel → Websites → disseldesign.com → Advanced → Git → Deployments"
echo "   → Click the purple 'Redeploy' button"
echo ""

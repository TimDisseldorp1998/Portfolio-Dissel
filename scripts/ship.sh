#!/usr/bin/env bash
set -e

MESSAGE="${1:-Ship}"
CURRENT=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT" = "main" ]; then
  echo ""
  echo "❌ You're already on 'main'. Ship promotes a feature branch."
  exit 1
fi

# Refuse if uncommitted changes on the feature branch
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo ""
  echo "❌ You have uncommitted changes on '$CURRENT'."
  echo "   Save them first with: npm run deploy \"your message\""
  exit 1
fi

echo ""
echo "→ [1/8] Fetching latest from GitHub…"
git fetch origin

echo ""
echo "→ [2/8] Switching to main…"
git checkout main

echo ""
echo "→ [3/8] Pulling main…"
git pull origin main

echo ""
echo "→ [4/8] Merging '$CURRENT' → main…"
if ! git merge --no-ff "$CURRENT" -m "$MESSAGE"; then
  echo ""
  echo "❌ Merge conflict. Aborting."
  git merge --abort || true
  git checkout "$CURRENT"
  exit 1
fi

echo ""
echo "→ [5/8] Building fresh static output on main…"
rm -rf .next out
if ! npm run build; then
  echo ""
  echo "❌ Build failed. Rolling back merge — main is untouched on GitHub."
  git reset --hard ORIG_HEAD
  git checkout "$CURRENT"
  exit 1
fi

echo ""
echo "→ [6/8] Committing built output…"
git add out/
if git diff --cached --quiet; then
  echo "  (No rebuild changes to commit)"
else
  git commit -m "Rebuild output for: $MESSAGE"
fi

echo ""
echo "→ [7/8] Pushing main to GitHub…"
git push origin main

echo ""
echo "→ [8/8] Syncing '$CURRENT' back to match main…"
git checkout "$CURRENT"
if git merge --ff-only main 2>/dev/null; then
  git push origin "$CURRENT" 2>&1 | grep -v "Everything up-to-date" || true
  echo "  ✓ '$CURRENT' fast-forwarded to main."
else
  echo "  ⚠️  Could not fast-forward '$CURRENT' (you have divergent commits)."
  echo "     Sync manually later with: git checkout $CURRENT && git merge main"
fi

echo ""
echo "✅ Shipped '$CURRENT' → main!"
echo ""
echo "   Last step (Hostinger has no auto-deploy — you must click):"
echo "   → hPanel → Websites → disseldesign.com → Advanced → Git → Deployments"
echo "   → Click the purple 'Redeploy' button"
echo ""
echo "   If something looks broken after Redeploy, run: npm run rollback"
echo ""

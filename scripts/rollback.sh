#!/usr/bin/env bash
set -e

# Rollback: undoes the last ship on main. Reverts the most recent commit(s),
# rebuilds, pushes. Use when you shipped something broken.

CURRENT=$(git rev-parse --abbrev-ref HEAD)

# Refuse if uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo ""
  echo "❌ You have uncommitted changes on '$CURRENT'."
  echo "   Save or discard them first before rolling back."
  exit 1
fi

echo ""
echo "→ [1/6] Fetching latest…"
git fetch origin

if [ "$CURRENT" != "main" ]; then
  echo ""
  echo "→ Switching to main for rollback…"
  git checkout main
  git pull origin main
fi

# Show the user what will be reverted
echo ""
echo "→ [2/6] Last two commits on main:"
git log --oneline -2
echo ""
read -p "   Revert the most recent one? [y/N] " CONFIRM
if [[ ! "$CONFIRM" =~ ^[yY]$ ]]; then
  echo "Aborted."
  if [ "$CURRENT" != "main" ]; then
    git checkout "$CURRENT"
  fi
  exit 0
fi

# Revert without committing so we can bundle the rebuild in one commit
echo ""
echo "→ [3/6] Reverting HEAD (no commit yet)…"
git revert HEAD --no-commit

echo ""
echo "→ [4/6] Rebuilding output…"
rm -rf .next out
if ! npm run build; then
  echo ""
  echo "❌ Build failed after revert. Aborting rollback — main untouched."
  git revert --abort || git reset --hard HEAD
  if [ "$CURRENT" != "main" ]; then
    git checkout "$CURRENT"
  fi
  exit 1
fi

echo ""
echo "→ [5/6] Committing rollback…"
git add -A
git commit -m "Rollback previous deploy"

echo ""
echo "→ [6/6] Pushing main…"
git push origin main

if [ "$CURRENT" != "main" ]; then
  echo ""
  echo "→ Syncing '$CURRENT' with rolled-back main…"
  git checkout "$CURRENT"
  git merge --ff-only main 2>/dev/null && git push origin "$CURRENT" || \
    echo "  ⚠️  Could not fast-forward '$CURRENT'. Sync manually."
fi

echo ""
echo "✅ Rolled back. Now click Redeploy in Hostinger to restore the site."
echo ""

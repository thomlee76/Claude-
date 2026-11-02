#!/bin/bash
# Публикует «Business English B1» в ветку GitHub Pages (папка docs/english-b1).
set -e
cd "$(git rev-parse --show-toplevel)"
PAGES=claude/english-learning-app-3ufdp7; DEST=docs/english-b1
python3 vocab/build.py
git fetch -q origin $PAGES
TMP=$(mktemp -d); git worktree add -q "$TMP" origin/$PAGES
rm -rf "$TMP/$DEST"; mkdir -p "$TMP/$DEST"
for f in index.html sw.js manifest.webmanifest apple-touch-icon.png icon-192.png icon-512.png; do cp vocab/$f "$TMP/$DEST/"; done
cp -r vocab/fonts vocab/audio "$TMP/$DEST/"
cd "$TMP"; git add -A $DEST
if git diff --cached --quiet; then echo "нет изменений"; else
git commit -qm "Business English B1: обновление (docs/english-b1)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01PrJN9HGzceweAP4YJhZkcm"
git push -q origin HEAD:$PAGES && echo "опубликовано"; fi
cd - >/dev/null; git worktree remove --force "$TMP"

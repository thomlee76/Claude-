#!/bin/bash
# Публикует справочник «Невидимая половина Claude» в ветку GitHub Pages (папка docs/claude-16).
set -e
cd "$(git rev-parse --show-toplevel)"
PAGES=claude/english-learning-app-3ufdp7; DEST=docs/claude-16
python3 guide/build.py
git fetch -q origin $PAGES
TMP=$(mktemp -d); git worktree add -q "$TMP" origin/$PAGES
rm -rf "$TMP/$DEST"; mkdir -p "$TMP/$DEST"
for f in index.html sw.js manifest.webmanifest apple-touch-icon.png icon-192.png icon-512.png; do cp guide/$f "$TMP/$DEST/"; done

cd "$TMP"; git add -A $DEST
if git diff --cached --quiet; then echo "нет изменений"; else
git commit -qm "Справочник «Невидимая половина Claude»: обновление (docs/claude-16)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01PrJN9HGzceweAP4YJhZkcm"
git push -q origin HEAD:$PAGES && echo "опубликовано"; fi
cd - >/dev/null; git worktree remove --force "$TMP"

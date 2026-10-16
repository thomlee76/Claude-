#!/bin/bash
# Публикует собранную книгу в ветку GitHub Pages (папка docs/book).
set -e
cd "$(git rev-parse --show-toplevel)"
SRC=claude/claude-work-book; PAGES=claude/english-learning-app-3ufdp7
git fetch -q origin $PAGES
TMP=$(mktemp -d); git worktree add -q "$TMP" origin/$PAGES
rm -rf "$TMP/docs/book"; mkdir -p "$TMP/docs/book"
for f in index.html sw.js manifest.webmanifest apple-touch-icon.png icon-192.png icon-512.png Claude-v-rabote.pdf; do cp book/$f "$TMP/docs/book/"; done
cp -r book/img book/fonts "$TMP/docs/book/"
cd "$TMP"; git add -A docs/book
if git diff --cached --quiet; then echo "нет изменений"; else
git commit -qm "Книга «Claude в работе»: обновление docs/book

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01PrJN9HGzceweAP4YJhZkcm"
git push -q origin HEAD:$PAGES && echo "опубликовано"; fi
cd - >/dev/null; git worktree remove --force "$TMP"

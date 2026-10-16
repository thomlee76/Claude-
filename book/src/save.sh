#!/bin/bash
# usage: save.sh blobsuffix figname [blobsuffix figname ...]
D=/root/.claude/projects/-home-user-Claude-/c03350e9-5148-5160-877a-6c5b981f1cb9/tool-results
while [ $# -gt 1 ]; do f=$(ls $D/mcp-Figma-blob-*-$1.png | head -1); cp "$f" /home/user/Claude-/book/img/fig-$2.png && echo "ok $2"; shift 2; done

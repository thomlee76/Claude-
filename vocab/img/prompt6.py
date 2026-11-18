#!/usr/bin/env python3
"""Промпт для сетки 3×2 (вебтун): python3 prompt6.py N  (N = 1..84) -> JSON {prompt, ids, cols, rows}."""
import json, sys
from pathlib import Path
R = Path(__file__).resolve().parent
sc = {}
for f in ('scenes-ja-a.json', 'scenes-ja-b.json'): sc.update(json.load(open(R / f, encoding='utf-8')))
allids = [f'j{t:02d}-{i:02d}' for t in range(1, 21) for i in range(1, 26)]
n = int(sys.argv[1]); ids = allids[(n - 1) * 6:n * 6]
STYLE = ('modern Korean webtoon (manhwa) style: clean crisp digital lineart, soft cel shading with smooth gradients, bright fresh colors, '
         'attractive expressive characters with large clear eyes, clean simple backgrounds with soft depth')
k = len(ids)
grid = ('an EXACT grid of 3 columns and 2 rows — exactly 6 equal square tiles' if k == 6 else f'exactly {k} equal square tiles side by side in one row')
p = (f'One single image: {grid}, separated by thin pure-white gutters, with a thin pure-white outer border. '
     f'Every tile is its own polished illustration in {STYLE}; one clear central subject, fully inside the tile with comfortable margin around heads and feet; '
     'consistent character design and style across all tiles. '
     'Strictly NO text of any kind anywhere: no speech bubbles, no captions, no labels, no letters, numbers, signs, kanji or writing.\n'
     'Tile contents in reading order (left to right, top row first):\n' + '\n'.join(f'{i + 1}. {sc[x].rstrip(".")}.' for i, x in enumerate(ids)))
json.dump({'prompt': p, 'ids': ids, 'cols': 3 if k == 6 else k, 'rows': 2 if k == 6 else 1,
           'width': 2048 if k == 6 else 2048, 'height': 1365 if k == 6 else 1024}, sys.stdout, ensure_ascii=False)

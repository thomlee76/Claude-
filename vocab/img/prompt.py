#!/usr/bin/env python3
"""Промпт для сетки 5×4: python3 prompt.py en|ja N -> печатает промпт и список id для сетки N (с 0)."""
import json, sys
from pathlib import Path
R = Path(__file__).resolve().parent
course, n = sys.argv[1], int(sys.argv[2])
if course == 'en':
    sc = json.load(open(R / 'scenes-en.json', encoding='utf-8'))
else:
    sc = {**json.load(open(R / 'scenes-ja-a.json', encoding='utf-8')), **json.load(open(R / 'scenes-ja-b.json', encoding='utf-8'))}
ids = sorted(sc)[n * 20:(n + 1) * 20]
style = ('warm cream paper, soft transparent watercolor washes, light loose ink linework, muted harmonious palette' if course == 'en'
         else 'warm cream washi paper, soft transparent watercolor washes, light loose ink linework, gentle Japanese palette (sakura pink, indigo, matcha green, vermilion)')
lines = '\n'.join(f'{i + 1}. {sc[k].rstrip(".")}.' for i, k in enumerate(ids))
p = (f'One single image: a precise grid of 5 columns and 4 rows = 20 equal square tiles, separated by thin pure-white gutters, with a thin pure-white outer border. '
     f'Every tile is its own small watercolor painting: {style}; one clear central subject with empty paper around it; consistent style across all tiles. '
     'Strictly NO text of any kind anywhere: no captions, no labels under the pictures, no letters, numbers, signs, kanji or writing.\n'
     'Tile contents in reading order (left to right, top row first):\n' + lines)
json.dump({'prompt': p, 'ids': ids}, sys.stdout, ensure_ascii=False)

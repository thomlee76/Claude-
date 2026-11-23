#!/usr/bin/env python3
"""Промпт для пары картинок в стиле бота JLPT N5: python3 prompt_bot.py N (N = 1..45) -> JSON {prompt, ids, width, height}.
Слова — японские слова приложения без картинки из бота (нет в ja-src-map.json), по порядку id."""
import json, sys, glob
from pathlib import Path
R = Path(__file__).resolve().parent
sc = {}
for f in ('scenes-ja-a.json', 'scenes-ja-b.json'): sc.update(json.load(open(R / f, encoding='utf-8')))
m = json.load(open(R / 'ja-src-map.json', encoding='utf-8'))
allids = [f'j{t:02d}-{i:02d}' for t in range(1, 21) for i in range(1, 26)]
todo = [k for k in allids if k not in m]
n = int(sys.argv[1]) if sys.argv[1:] else 0
if not n: print(len(todo), (len(todo) + 1) // 2); sys.exit()
ids = todo[(n - 1) * 2:n * 2]
STYLE = ('cinematic Japanese anime illustration in the look of a 1990s theatrical anime film still: bold expressive ink linework, '
         'highly detailed hand-painted background with visible brush texture and fine film grain, dramatic cinematic lighting with warm highlights and glowing light, '
         'rich saturated colors, expressive characters with dynamic poses')
panels = ['Top panel', 'Bottom panel']
p = ('One single image made of exactly ' + str(len(ids)) + ' equal landscape panels stacked vertically, separated by a thin pure-white horizontal gutter, with a thin pure-white outer border. '
     f'Each panel is its own complete picture: {STYLE}. Both panels share exactly the same style.\n' +
     '\n'.join(f'{panels[i]}: {sc[k].rstrip(".")}.' for i, k in enumerate(ids)) +
     '\nNo text, no letters, no numbers, no signs with writing, no kanji, no logos, no watermark, no speech bubbles.')
if len(ids) == 1: p = p.replace('Top panel', 'The panel')
json.dump({'prompt': p, 'ids': ids, 'width': 1024, 'height': 1536}, sys.stdout, ensure_ascii=False)

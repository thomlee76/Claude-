#!/usr/bin/env python3
"""Нарезка вертикальной стопки широких панелей (стиль бота): python3 crop_panels.py grid out_dir id1 id2 ...
Ищет белые полосы между панелями, каждую панель обрезает по центру до 1.538:1 (как картинки бота) и сохраняет WebP q90, ширина ≤1024."""
import sys
from pathlib import Path
from PIL import Image
import numpy as np, os
TH = int(os.environ.get("TH", 246))
src, out, ids = sys.argv[1], Path(sys.argv[2]), sys.argv[3:]
out.mkdir(parents=True, exist_ok=True)
im = Image.open(src).convert('RGB'); a = np.asarray(im.convert('L')).astype(float)
row = np.percentile(a, 10, axis=1) > TH; col = np.percentile(a, 10, axis=0) > TH
def runs(m):
    r = []; i = 0
    while i < len(m):
        if not m[i]: j = i; 
        if not m[i]:
            while j < len(m) and not m[j]: j += 1
            r.append((i, j)); i = j
        else: i += 1
    return r
ys = [r for r in runs(row) if r[1] - r[0] > 40]; xs = [r for r in runs(col) if r[1] - r[0] > 40]
x0, x1 = xs[0][0], xs[-1][1]
assert len(ys) == len(ids), ('панелей', len(ys), 'id', len(ids), ys)
for (y0, y1), k in zip(ys, ids):
    p = im.crop((x0 + 4, y0 + 4, x1 - 4, y1 - 4)); w, h = p.size; R = 1280 / 832
    if w / h > R: nw = int(h * R); p = p.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else: nh = int(w / R); p = p.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    if p.width > 1024: p = p.resize((1024, round(p.height * 1024 / p.width)), Image.LANCZOS)
    p.save(out / f'{k}.webp', 'WEBP', quality=90, method=6); print(k, p.size, 'panel', (w, h))

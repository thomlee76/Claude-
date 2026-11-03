#!/usr/bin/env python3
"""Нарезка сетки 5×4 на 20 квадратов: python3 crop.py grid.png out_dir id1 id2 ... (20 id в порядке чтения).
Ищет светлые межплиточные полосы по проекциям яркости; если не нашёл — делит равномерно."""
import sys
from pathlib import Path
from PIL import Image, ImageStat
import numpy as np

def bands(prof, n, light):
    """Возвращает n+1 границ (центры светлых полос) вдоль оси."""
    L = len(prof); bright = prof > light
    runs = []; i = 0
    while i < L:
        if bright[i]:
            j = i
            while j < L and bright[j]: j += 1
            runs.append((i, j)); i = j
        else: i += 1
    # ожидаемые позиции границ
    exp = [L * k / n for k in range(n + 1)]
    cuts = []
    for k, e in enumerate(exp):
        cand = [r for r in runs if abs((r[0] + r[1]) / 2 - e) < L / n * .35]
        if cand:
            r = min(cand, key=lambda r: abs((r[0] + r[1]) / 2 - e))
            cuts.append(r)
        else:
            cuts.append((int(e), int(e)))
    return cuts

def main():
    src, out, ids = sys.argv[1], Path(sys.argv[2]), sys.argv[3:]
    out.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert('RGB'); a = np.asarray(im.convert('L')).astype(float)
    colp = np.percentile(a, 8, axis=0); rowp = np.percentile(a, 8, axis=1)
    import os
    C, Rw = int(os.environ.get('COLS', 5)), int(os.environ.get('ROWS', 4))
    cx = bands(colp, C, 248); cy = bands(rowp, Rw, 248)
    k = 0
    for r in range(Rw):
        for c in range(C):
            x0, x1 = cx[c][1], cx[c + 1][0]; y0, y1 = cy[r][1], cy[r + 1][0]
            w, h = x1 - x0, y1 - y0; s = min(w, h); ins = int(s * .03)
            xc, yc = x0 + w / 2, y0 + h / 2; s2 = s / 2 - ins
            tile = im.crop((int(xc - s2), int(yc - s2), int(xc + s2), int(yc + s2)))  # исходное разрешение, без растяжения
            if k < len(ids): tile.save(out / f'{ids[k]}.webp', 'WEBP', quality=95, method=6)
            k += 1
    print('cuts x', [c[1] for c in cx], 'y', [c[1] for c in cy])

main()

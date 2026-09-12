#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Режет 2x2 композит на отдельные иллюстрации уроков и снимает подпись.

    python3 tools/cut-grid.py grid.png 17 18 19 20

Кладёт app/images/day-017.jpg ... в порядке: левый верхний, правый верхний,
левый нижний, правый нижний. Подпись-карточка внизу плитки отрезается,
результат приводится к 3:2 и 1350x900.
"""
from PIL import Image
import numpy as np, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'app/images')


def gutter(mean1d, lo, hi):
    """Центр светлой канавки между плитками."""
    band = [i for i in range(lo, hi) if mean1d[i] > 240]
    return (band[0] + band[-1]) // 2 if band else (lo + hi) // 2


def caption_top(tile):
    """Верхняя граница белой карточки с подписью."""
    g = tile.mean(axis=2)
    h, w = g.shape
    core = g[:, int(w * 0.10):int(w * 0.90)]
    bright = core.mean(axis=1)
    grad = np.abs(np.diff(core, axis=1)).mean(axis=1)
    for y in range(int(h * 0.55), h - 4):
        if bright[y] > 232 and grad[y] < 1.5 and bright[y:].mean() > 195:
            return y
    return h


def cut(path, days):
    im = Image.open(path).convert('RGB')
    a = np.asarray(im).astype(int)
    H, W, _ = a.shape
    cx = gutter(a.mean(axis=(0, 2)), int(W * 0.45), int(W * 0.55))
    cy = gutter(a.mean(axis=(1, 2)), int(H * 0.45), int(H * 0.55))
    pad = 6
    boxes = [(0, 0, cx - pad, cy - pad), (cx + pad, 0, W, cy - pad),
             (0, cy + pad, cx - pad, H), (cx + pad, cy + pad, W, H)]
    os.makedirs(OUT, exist_ok=True)
    for day, (x0, y0, x1, y1) in zip(days, boxes):
        tile = a[y0:y1, x0:x1]
        art_h = max(caption_top(tile) - 8, int(tile.shape[0] * 0.55))
        crop = im.crop((x0, y0, x1, y0 + art_h))
        w, h = crop.size
        want = int(round(w / 1.5))
        if h > want:
            off = (h - want) // 2
            crop = crop.crop((0, off, w, off + want))
        crop = crop.resize((1350, 900), Image.LANCZOS)
        dest = os.path.join(OUT, 'day-%03d.jpg' % day)
        crop.save(dest, 'JPEG', quality=82, optimize=True, progressive=True)
        print('day-%03d.jpg  %d КБ' % (day, os.path.getsize(dest) // 1024))


if __name__ == '__main__':
    if len(sys.argv) != 6:
        sys.exit('использование: cut-grid.py <композит.png> <день1> <день2> <день3> <день4>')
    cut(sys.argv[1], [int(x) for x in sys.argv[2:6]])

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Рисует иконки приложения: книга с бирюзовым корешком на коралловом фоне.

Мотив взят с обложки «김재우의 기본 동사 100»: белое поле, бирюзовый
тяжёлый шрифт, коралловый фон.

    python3 tools/make-icons.py [путь_к_Unbounded.ttf]

Пишет docs/icons/icon-180, -192, -512 и -512-maskable.
Для корейского нужен шрифт с хангылем (wqy-zenhei), для цифр — Unbounded;
если Unbounded не найден, берётся DejaVu Sans Bold.
"""
from PIL import Image, ImageDraw, ImageFont
import os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORAL = (233, 104, 58)
TEAL  = (26, 168, 160)
WHITE = (255, 255, 255)

KO = "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"
UNB = sys.argv[1] if len(sys.argv) > 1 else "/tmp/claude-0/scratch/Unbounded.ttf"
if not os.path.exists(UNB):
    UNB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def draw(s, pad=0.0):
    """pad — доля поля по краям: 0 для iOS, ~0.1 для maskable."""
    img = Image.new("RGB", (s, s), CORAL)
    d = ImageDraw.Draw(img)
    k = 1.0 - pad * 2

    # книга
    bw, bh = s * 0.64 * k, s * 0.70 * k
    x0 = (s - bw) / 2
    y0 = (s - bh) / 2
    x1, y1 = x0 + bw, y0 + bh
    r = s * 0.055 * k
    d.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=WHITE)

    # корешок
    sp = bw * 0.19
    d.rounded_rectangle([x0, y0, x0 + sp + r, y1], radius=r, fill=TEAL)
    d.rectangle([x0 + sp, y0, x0 + sp + r, y1], fill=WHITE)
    d.rectangle([x0 + sp - r, y0, x0 + sp, y1], fill=TEAL)

    # тонкая линия страниц у корешка
    d.line([(x0 + sp + bw * 0.055, y0 + bh * 0.10),
            (x0 + sp + bw * 0.055, y1 - bh * 0.10)],
           fill=(226, 240, 238), width=max(1, int(s * 0.006)))

    cx = (x0 + sp + x1) / 2          # центр белого поля

    def center(text, font, fill, cy, stroke=0):
        b = d.textbbox((0, 0), text, font=font, stroke_width=stroke)
        d.text((cx - (b[2] - b[0]) / 2 - b[0], cy - (b[3] - b[1]) / 2 - b[1]),
               text, font=font, fill=fill, stroke_width=stroke, stroke_fill=fill)

    f1 = ImageFont.truetype(KO, int(s * 0.168 * k))
    center("동사", f1, TEAL, y0 + bh * 0.34, stroke=int(s * 0.009 * k))
    f2 = ImageFont.truetype(UNB, int(s * 0.150 * k))
    center("100", f2, CORAL, y0 + bh * 0.66)
    return img


def render(size, pad=0.0):
    return draw(size * 4, pad).resize((size, size), Image.LANCZOS)


if __name__ == "__main__":
    out = os.path.join(ROOT, "docs/icons")
    os.makedirs(out, exist_ok=True)
    for size in (180, 192, 512):
        render(size).save(os.path.join(out, "icon-%d.png" % size))
    render(512, pad=0.10).save(os.path.join(out, "icon-512-maskable.png"))
    render(1024).save(os.path.join(ROOT, "build/verb100-icon-1024.png"))
    print("иконки готовы:", ", ".join(sorted(os.listdir(out))))

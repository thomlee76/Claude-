#!/usr/bin/env python3
"""PNG 1024 из папки (аргумент) → docs/icons/alt/<id>-{180,192,512}.png."""
import os, sys, glob
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(ROOT, 'docs/icons/alt')
os.makedirs(out, exist_ok=True)
for f in sorted(glob.glob(os.path.join(sys.argv[1], '*.png'))):
    name = os.path.basename(f)[:-4]
    im = Image.open(f).convert('RGB')
    for s in (180, 192, 512):
        im.resize((s, s), Image.LANCZOS).save(os.path.join(out, '%s-%d.png' % (name, s)), optimize=True)
    print(name)

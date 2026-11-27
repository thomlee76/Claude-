"""Download full-resolution 2x2 comic grids and split them into panels -> drama-video/panels/epNN_pK.jpg"""
import io, json, sys, time, urllib.request
from pathlib import Path
import numpy as np
from PIL import Image
ROOT = Path(__file__).resolve().parent
OUT = ROOT / "panels"; OUT.mkdir(exist_ok=True)
URLS = json.load(open(ROOT / "anime_urls.json"))

def gutter(profile, n):
    lo, hi = int(n * .35), int(n * .65)
    best, cur, start = (n // 2, n // 2), 0, None
    for i in range(lo, hi):
        if profile[i] > 236:
            if start is None: start = i
            if i - start + 1 > best[1] - best[0]: best = (start, i + 1)
        else: start = None
    return best

def trim(a, lo, hi, axis):
    while lo < hi - 10 and a.take(lo, axis=axis).mean() > 236: lo += 1
    while hi > lo + 10 and a.take(hi - 1, axis=axis).mean() > 236: hi -= 1
    return lo, hi

def split(im):
    a = np.asarray(im.convert("L"), dtype=float); H, W = a.shape
    y0, y1 = gutter(a.mean(1), H); x0, x1 = gutter(a.mean(0), W)
    boxes = [(0, 0, x0, y0), (x1, 0, W, y0), (0, y1, x0, H), (x1, y1, W, H)]
    out = []
    for (l, t, r, b) in boxes:
        sub = a[t:b, l:r]
        tt, bb = trim(sub, 0, sub.shape[0], 0); ll, rr = trim(sub, 0, sub.shape[1], 1)
        out.append(im.crop((l + ll, t + tt, l + rr, t + bb)))
    return out

fail = []
for ep, url in sorted(URLS.items()):
    if all((OUT / f"ep{ep}_p{k}.jpg").exists() for k in range(1, 5)) and "--force" not in sys.argv: continue
    for i in range(5):
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=60).read(); break
        except Exception as e:
            print("retry", ep, e); time.sleep(3 + 3 * i)
    else:
        fail.append(ep); continue
    im = Image.open(io.BytesIO(data)).convert("RGB")
    for k, p in enumerate(split(im), 1):
        p.thumbnail((1400, 1400)); p.save(OUT / f"ep{ep}_p{k}.jpg", quality=90)
    print(ep, im.size, [p.size for p in split(im)], flush=True)
print("FAILED:", fail)
sys.exit(1 if fail else 0)

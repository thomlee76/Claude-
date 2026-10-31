#!/usr/bin/env python3
"""Справочник «Невидимая половина Claude»: data.json + app.html -> index.html + sw.js (приложение для iPhone в стиле «Фитнеса»)."""
import json, hashlib
from pathlib import Path
R = Path(__file__).resolve().parent
data = json.loads((R / 'data.json').read_text(encoding='utf-8'))
import subprocess
vids = {}
for f in sorted((R / 'video').glob('ch-*.mp4')):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(f)], capture_output=True, text=True).stdout.strip()
    if out: vids[f.stem] = round(float(out))
data['videos'] = vids
data['videoMB'] = round(sum(f.stat().st_size for f in (R / 'video').glob('ch-*.mp4')) / 1e6) if vids else 0
html = (R / 'app.html').read_text(encoding='utf-8').replace('__DATA__', json.dumps(data, ensure_ascii=False).replace('</', '<\\/'))
(R / 'index.html').write_text(html, encoding='utf-8')
pre = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'] + sorted('fonts/' + p.name for p in (R / 'fonts').iterdir()) + sorted('video/' + p.name for p in (R / 'video').glob('ch-*.jpg'))
h = hashlib.sha1(html.encode())
for p in pre[2:]: h.update((R / p).read_bytes())
(R / 'sw.js').write_text((R / 'sw-template.js').read_text(encoding='utf-8').replace('__CACHE__', 'cl16-' + h.hexdigest()[:10]).replace('__PRECACHE__', json.dumps(pre)), encoding='utf-8')
print('ok', len(html), 'bytes')

#!/usr/bin/env python3
"""Business English B1: topics.json + words/*.json + app.html -> index.html + sw.js"""
import json, hashlib
from pathlib import Path
R = Path(__file__).resolve().parent
topics = json.loads((R / 'topics.json').read_text(encoding='utf-8'))
for t in topics:
    t['words'] = json.loads((R / 'words' / f"{t['id']}.json").read_text(encoding='utf-8'))
audio = sorted('audio/' + p.name for p in (R / 'audio').glob('*.m4a')) if (R / 'audio').exists() else []
has_audio = len(audio) == 600
data = {'topics': topics, 'audio': has_audio, 'meta': {'lede': '300 частотных слов делового английского уровня B1 в 12 темах: компания, переговоры, продажи, маркетинг, финансы, контракты, логистика, производство, проекты, переписка, карьера, командировки. Примеры — из практики продаж медицинского оборудования. Интервальное повторение: слово возвращается через 1, 3, 7, 14 и 30 дней; выученным считается после 4 верных ответов подряд. Прогресс хранится на этом устройстве, всё работает без интернета.'}}
html = (R / 'app.html').read_text(encoding='utf-8').replace('__DATA__', json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/'))
(R / 'index.html').write_text(html, encoding='utf-8')
pre = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'] + sorted('fonts/' + p.name for p in (R / 'fonts').iterdir()) + (audio if has_audio else [])
h = hashlib.sha1(html.encode())
for p in pre[2:]: h.update((R / p).read_bytes())
(R / 'sw.js').write_text((R / 'sw-template.js').read_text(encoding='utf-8').replace('__CACHE__', 'b1w-' + h.hexdigest()[:10]).replace('__PRECACHE__', json.dumps(pre)), encoding='utf-8')
print('ok', len(html), 'bytes, audio', len(audio))

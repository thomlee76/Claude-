#!/usr/bin/env python3
"""Слова: English B1 + 日本語 N5 — topics/words + app.html -> index.html + sw.js"""
import json, hashlib
from pathlib import Path
R = Path(__file__).resolve().parent

def load(base):
    topics = json.loads((base / 'topics.json').read_text(encoding='utf-8'))
    for t in topics:
        f = base / 'words' / f"{t['id']}.json"
        t['words'] = json.loads(f.read_text(encoding='utf-8')) if f.exists() else []
    return topics

en = load(R)
audio = sorted('audio/' + p.name for p in (R / 'audio').glob('*.m4a')) if (R / 'audio').exists() else []
ja = load(R / 'ja')
for t in ja:
    for w in t['words']:  # единые поля для интерфейса
        w['ipa'] = w['rom'] if w['kana'] == w['w'] else w['kana']
        w['ru'], w['ru2'], w['exRu'], w['cefr'], w['note'] = w['ko'], w['ko2'], w['exKo'], 'N5', w['exp']
        for k in ('ko', 'ko2', 'exKo', 'exp', 'lvl'): w.pop(k, None)
data = {'courses': {
  'en': {'topics': en, 'audio': len(audio) == 600, 'meta': {
    'lede': '300 частотных слов делового английского уровня B1 в 12 темах: компания, переговоры, продажи, маркетинг, финансы, контракты, логистика, производство, проекты, переписка, карьера, командировки. Примеры — из практики продаж медицинского оборудования. Интервальное повторение: слово возвращается через 1, 3, 7, 14 и 30 дней; выученным считается после 4 верных ответов подряд. Прогресс хранится на этом устройстве, всё работает без интернета.',
    'foot': '300 частотных слов делового английского уровня B1 в 12 темах.'}},
  'ja': {'topics': ja, 'audio': False, 'meta': {
    'lede': '300 базовых слов японского уровня JLPT N5 в 12 темах с корейским переводом: чтение каной и ромадзи, разбор ханча (学 배울 학), объяснение по-корейски и пример с фуриганой. Отдельное упражнение «Как читается?». Озвучка — японским голосом iPhone. Прогресс японского курса хранится отдельно от английского.',
    'foot': '300 базовых слов японского JLPT N5 в 12 темах, перевод и объяснения на корейском.'}}}}
html = (R / 'app.html').read_text(encoding='utf-8').replace('__DATA__', json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/'))
(R / 'index.html').write_text(html, encoding='utf-8')
pre = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'] + sorted('fonts/' + p.name for p in (R / 'fonts').iterdir()) + (audio if len(audio) == 600 else [])
h = hashlib.sha1(html.encode())
for p in pre[2:]: h.update((R / p).read_bytes())
(R / 'sw.js').write_text((R / 'sw-template.js').read_text(encoding='utf-8').replace('__CACHE__', 'b1w-' + h.hexdigest()[:10]).replace('__PRECACHE__', json.dumps(pre)), encoding='utf-8')
print('ok', len(html), 'bytes; ja words', sum(len(t['words']) for t in ja))

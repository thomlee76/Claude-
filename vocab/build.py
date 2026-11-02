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
    'lede': 'JLPT N5 핵심 단어 500개를 20개 주제로 정리했습니다. 가나 읽기와 로마자, 한자 풀이(学 배울 학), 한국어 설명, 후리가나가 달린 예문과 번역을 담았습니다. 한자 읽기를 연습하는 「어떻게 읽나요?」 모드도 있습니다. 발음은 iPhone 일본어 음성으로 재생됩니다. 진도는 영어 과정과 따로 저장됩니다.',
    'foot': 'JLPT N5 핵심 단어 500개, 20개 주제, 한국어 번역과 설명.'}}}}
html = (R / 'app.html').read_text(encoding='utf-8').replace('__DATA__', json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/'))
(R / 'index.html').write_text(html, encoding='utf-8')
pre = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'] + sorted('fonts/' + p.name for p in (R / 'fonts').iterdir()) + (audio if len(audio) == 600 else [])
h = hashlib.sha1(html.encode())
for p in pre[2:]: h.update((R / p).read_bytes())
(R / 'sw.js').write_text((R / 'sw-template.js').read_text(encoding='utf-8').replace('__CACHE__', 'b1w-' + h.hexdigest()[:10]).replace('__PRECACHE__', json.dumps(pre)), encoding='utf-8')
print('ok', len(html), 'bytes; ja words', sum(len(t['words']) for t in ja))

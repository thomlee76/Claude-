#!/usr/bin/env python3
"""Проверка сценария видеоурока: python3 check-script.py scripts/ch-01.json [...]"""
import json, re, sys

NEED = {  # тип -> функция ожидаемого числа фрагментов say
    'title': lambda s: 1,
    'text': lambda s: (1, 2),
    'flow': lambda s: len(s['nodes']),
    'bullets': lambda s: len(s['items']),
    'steps': lambda s: len(s['items']),
    'chat': lambda s: 2,
    'compare': lambda s: 2,
    'warn': lambda s: len(s['items']),
    'check': lambda s: len(s['items']) + 1,
}
FIELDS = {'text': ['eyebrow', 'head', 'sub'], 'flow': ['eyebrow', 'nodes'], 'bullets': ['eyebrow', 'items'],
          'steps': ['eyebrow', 'items'], 'chat': ['eyebrow', 'user', 'reply'], 'compare': ['eyebrow', 'left', 'right'],
          'warn': ['eyebrow', 'items'], 'check': ['eyebrow', 'items', 'task']}
ok = True
for p in sys.argv[1:]:
    d = json.load(open(p, encoding='utf-8'))
    errs = []
    words = 0
    for i, s in enumerate(d['scenes']):
        t = s.get('type')
        if t not in NEED:
            errs.append(f'сцена {i}: неизвестный тип {t}'); continue
        for f in FIELDS.get(t, []):
            if f not in s: errs.append(f'сцена {i} ({t}): нет поля {f}')
        try:
            n = NEED[t](s)
        except Exception as e:
            errs.append(f'сцена {i} ({t}): {e}'); continue
        k = len(s.get('say', []))
        if (isinstance(n, tuple) and k not in n) or (isinstance(n, int) and k != n):
            errs.append(f'сцена {i} ({t}): say={k}, нужно {n}')
        for x in s.get('say', []):
            words += len(x.split())
            if re.search(r'\d', x): errs.append(f'сцена {i} ({t}): цифры в озвучке: «{x[:60]}…»')
    if not 400 <= words <= 500: errs.append(f'слов в озвучке {words}, нужно 420–480')
    print(f'{p}: {words} слов, {len(d["scenes"])} сцен, ≈ {words/130:.1f} мин' + ('' if not errs else '\n  ' + '\n  '.join(errs)))
    ok &= not errs
sys.exit(0 if ok else 1)

#!/usr/bin/env python3
"""Проверка карточек: python3 check-words.py words/t01.json [...]"""
import json, re, sys
from pathlib import Path

R = Path(__file__).resolve().parent
TOP = {t['id']: t for t in json.load(open(R / 'topics.json', encoding='utf-8'))}
POS = {'noun', 'verb', 'adj', 'adv', 'phrase', 'phrasal verb'}
ok = True
for p in sys.argv[1:]:
    tid = Path(p).stem
    errs = []
    try:
        arr = json.load(open(p, encoding='utf-8'))
    except Exception as e:
        print(p, 'JSON:', e); ok = False; continue
    words = TOP[tid]['words']
    if len(arr) != len(words): errs.append(f'{len(arr)} карточек, нужно {len(words)}')
    for i, (c, w) in enumerate(zip(arr, words), 1):
        tag = f'{i:02d} {w}:'
        if c.get('id') != f'{tid}-{i:02d}': errs.append(f'{tag} id={c.get("id")}')
        if c.get('w') != w: errs.append(f'{tag} w={c.get("w")!r}')
        if c.get('pos') not in POS: errs.append(f'{tag} pos={c.get("pos")!r}')
        if not re.fullmatch(r'/[^/]+/', c.get('ipa', '')) or ('ˈ' not in c['ipa'] and len(re.findall('[aeiouɑɒɔəɜʊʌɪæɛ]+', c['ipa'])) > 1): errs.append(f'{tag} ipa={c.get("ipa")!r}')
        for f in ('ru', 'ex', 'exw', 'exRu'):
            if not c.get(f): errs.append(f'{tag} пусто {f}')
        if 'ru2' not in c or 'note' not in c: errs.append(f'{tag} нет ru2/note')
        ex = c.get('ex', '')
        n = len(ex.split())
        if not 6 <= n <= 16: errs.append(f'{tag} пример {n} слов')
        if c.get('exw') and c['exw'] not in ex: errs.append(f'{tag} exw {c["exw"]!r} нет в примере')
        if not (isinstance(c.get('col'), list) and len(c['col']) == 2): errs.append(f'{tag} col')
        if len(c.get('note', '')) > 140: errs.append(f'{tag} note длинный')
        if c.get('cefr') not in ('A2', 'B1', 'B2'): errs.append(f'{tag} cefr')
    print(p + ': ' + ('OK' if not errs else '\n  ' + '\n  '.join(errs)))
    ok &= not errs
sys.exit(0 if ok else 1)

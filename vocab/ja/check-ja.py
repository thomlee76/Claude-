#!/usr/bin/env python3
"""Проверка японских карточек: python3 check-ja.py words/j01.json [...]"""
import json, re, sys
from pathlib import Path

R = Path(__file__).resolve().parent
TOP = {t['id']: t for t in json.load(open(R / 'topics.json', encoding='utf-8'))}
POS = {'명사', '대명사', '수사', '의문사', '동사 1그룹', '동사 2그룹', '동사 3그룹', 'い형용사', 'な형용사', '부사', '조수사'}
KANJI = re.compile(r'[一-鿿々]')
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
        if not re.fullmatch(r'[぀-ヿー]+', c.get('kana', '')): errs.append(f'{tag} kana={c.get("kana")!r}')
        if not re.fullmatch(r"[a-zāīūēō' -]+", c.get('rom', '')): errs.append(f'{tag} rom={c.get("rom")!r}')
        for f in ('ko', 'ex', 'exR', 'exw', 'exKo', 'exp'):
            if not c.get(f): errs.append(f'{tag} пусто {f}')
        if 'ko2' not in c or 'hanja' not in c: errs.append(f'{tag} нет ko2/hanja')
        if KANJI.search(w) and not c.get('hanja'): errs.append(f'{tag} нет разбора hanja')
        ex = c.get('ex', '')
        if c.get('exw') and c['exw'] not in ex: errs.append(f'{tag} exw {c["exw"]!r} нет в примере')
        plain = re.sub(r'\{([^|{}]+)\|[^{}]+\}', r'\1', c.get('exR', ''))
        if plain != ex: errs.append(f'{tag} exR без разметки ≠ ex: {plain!r}')
        for m in re.finditer(r'\{([^|{}]+)\|([^{}]+)\}', c.get('exR', '')):
            if not re.fullmatch(r'[぀-ヿー]+', m.group(2)): errs.append(f'{tag} фуригана не кана: {m.group(0)}')
        rest = re.sub(r'\{[^{}]+\}', '', c.get('exR', ''))
        if KANJI.search(rest): errs.append(f'{tag} кандзи без фуриганы в exR: {rest!r}')
        if not 6 <= len(ex) <= 34: errs.append(f'{tag} длина примера {len(ex)}')
        if not (isinstance(c.get('col'), list) and len(c['col']) == 2): errs.append(f'{tag} col')
        if not 20 <= len(c.get('exp', '')) <= 200: errs.append(f'{tag} exp длина {len(c.get("exp", ""))}')
        if c.get('lvl') != 'N5': errs.append(f'{tag} lvl')
    print(p + ': ' + ('OK' if not errs else '\n  ' + '\n  '.join(errs)))
    ok &= not errs
sys.exit(0 if ok else 1)

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает content/lessons.json из файлов content/src/lessons_*.py.

Попутно валидирует: уникальность номеров, полноту структуры, ровно одну
реплику ученика в диалоге и то, что правильный ответ теста собирается
из предложенных слов.
"""
import glob, importlib, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'content/src')
sys.path.insert(0, SRC)

lessons, errors = {}, []
for path in sorted(glob.glob(os.path.join(SRC, 'lessons_*.py'))):
    mod = importlib.import_module(os.path.basename(path)[:-3])
    for day, body in mod.L.items():
        if day in lessons:
            errors.append('DAY %d встречается дважды' % day)
        lessons[day] = body

# Дополнительные примеры: content/src/more_*.py → M = {день: [E(...)×6]}
more = {}
for path in sorted(glob.glob(os.path.join(SRC, 'more_*.py'))):
    mod = importlib.import_module(os.path.basename(path)[:-3])
    for day, items in mod.M.items():
        if day in more:
            errors.append('DAY %d: доп. примеры встречаются дважды' % day)
        more[day] = items

days = {x['day']: x for x in json.load(
    open(os.path.join(ROOT, 'content/days.json'), encoding='utf-8'))['days']}

for day, b in sorted(lessons.items()):
    tag = 'DAY %d' % day
    if day not in days:
        errors.append('%s: нет такого дня в days.json' % tag); continue
    for key, n in (('examples', 6), ('dialogue', 4), ('notes', 3), ('quiz', 2)):
        if len(b.get(key, [])) != n:
            errors.append('%s: %s — %d вместо %d' % (tag, key, len(b.get(key, [])), n))
    if sum(1 for d in b['dialogue'] if d.get('you')) != 1:
        errors.append('%s: в диалоге должна быть ровно одна реплика ученика' % tag)
    for field in ('meaning',):
        for lang in ('ru', 'ko'):
            if not b[field].get(lang):
                errors.append('%s: %s.%s пустое' % (tag, field, lang))
    for item in b['examples'] + b['dialogue']:
        for lang in ('en', 'ru', 'ko'):
            if not item.get(lang):
                errors.append('%s: пустое поле %s в "%s"' % (tag, lang, item.get('en', '?')))
    for q in b['quiz']:
        if q['type'] == 'build':
            words = q['answer'].split()
            pool = words + q['extra']
            if len(pool) != len(set(pool)) and len(words) > len(set(words)):
                pass  # повторы слов внутри ответа допустимы
            if any(w in q['extra'] for w in words):
                errors.append('%s: лишнее слово теста совпадает с нужным' % tag)
        else:
            if sum(1 for o in q['options'] if o['ok']) != 1:
                errors.append('%s: у вопроса должен быть ровно один верный вариант' % tag)

def norm(t):
    return ''.join(ch for ch in t.lower() if ch.isalnum())

for day, items in sorted(more.items()):
    tag = 'DAY %d (доп.)' % day
    if day not in lessons:
        errors.append('%s: нет основного урока' % tag); continue
    if len(items) != 6:
        errors.append('%s: %d примеров вместо 6' % (tag, len(items)))
    seen = {norm(x['en']) for x in lessons[day]['examples'] + lessons[day]['dialogue']}
    for x in items:
        for lang in ('en', 'ru', 'ko'):
            if not x.get(lang):
                errors.append('%s: пустое поле %s в "%s"' % (tag, lang, x.get('en', '?')))
        if norm(x['en']) in seen:
            errors.append('%s: повтор "%s"' % (tag, x['en']))
        seen.add(norm(x['en']))
    lessons[day]['more'] = items

missing = [d for d in range(1, 101) if d not in lessons]
no_more = [d for d in range(1, 101) if d in lessons and d not in more]

if errors:
    print('ОШИБКИ:')
    for e in errors:
        print('  ' + e)
    sys.exit(1)

out = {str(k): v for k, v in sorted(lessons.items())}
json.dump(out, open(os.path.join(ROOT, 'content/lessons.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('content/lessons.json — %d уроков' % len(out))
if missing:
    print('без содержания: ' + ', '.join(map(str, missing)))
else:
    print('все 100 дней с полным содержанием')
print('доп. примеры: %d дней' % (100 - len(no_more)) + ('' if not no_more else ' (нет: ' + ', '.join(map(str, no_more)) + ')'))

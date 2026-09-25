#!/usr/bin/env python3
"""Собирает docs/data.js из content/days.json и content/lessons.json.

Поле image берётся не из days.json, а с диска: ищется docs/images/day-NNN.*
в порядке jpg, jpeg, png, webp. Если файла нет, image = null и урок
показывает заглушку. Так неважно, в каком формате пришла картинка.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, 'docs/images')
EXTS = ('jpg', 'jpeg', 'png', 'webp')


def find_image(day):
    for ext in EXTS:
        name = 'day-%03d.%s' % (day, ext)
        if os.path.exists(os.path.join(IMG_DIR, name)):
            return name
    return None


days = json.load(open(os.path.join(ROOT, 'content/days.json'), encoding='utf-8'))
lessons = json.load(open(os.path.join(ROOT, 'content/lessons.json'), encoding='utf-8'))

keys = ('day', 'chapter', 'verb', 'sense', 'en', 'ru', 'ko')
slim = []
for x in days['days']:
    row = {k: x[k] for k in keys}
    row['image'] = find_image(x['day'])
    slim.append(row)

js = ("/* Автогенерируемый файл — правьте content/*.json и запускайте tools/build-data.py */\n"
      "window.CHAPTERS=" + json.dumps(days['chapters'], ensure_ascii=False) + ";\n"
      "window.DAYS=" + json.dumps(slim, ensure_ascii=False) + ";\n"
      "window.LESSONS=" + json.dumps(lessons, ensure_ascii=False) + ";\n")
open(os.path.join(ROOT, 'docs/data.js'), 'w', encoding='utf-8').write(js)

with_img = [r['day'] for r in slim if r['image']]
print('docs/data.js — %d уроков, %d с полным содержанием, %d с картинкой'
      % (len(slim), len(lessons), len(with_img)))
missing = [d for d in range(1, 101) if d not in with_img]
if missing:
    print('без картинки: ' + ', '.join(str(d) for d in missing))

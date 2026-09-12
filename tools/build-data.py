#!/usr/bin/env python3
"""Собирает app/data.js из content/days.json и content/lessons.json."""
import json, os, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
d = json.load(open(os.path.join(root, 'content/days.json'), encoding='utf-8'))
l = json.load(open(os.path.join(root, 'content/lessons.json'), encoding='utf-8'))
keys = ('day', 'chapter', 'verb', 'sense', 'en', 'ru', 'ko', 'image')
slim = [{k: x[k] for k in keys} for x in d['days']]
js = ("/* Автогенерируемый файл — правьте content/*.json и запускайте tools/build-data.py */\n"
      "window.CHAPTERS=" + json.dumps(d['chapters'], ensure_ascii=False) + ";\n"
      "window.DAYS=" + json.dumps(slim, ensure_ascii=False) + ";\n"
      "window.LESSONS=" + json.dumps(l, ensure_ascii=False) + ";\n")
open(os.path.join(root, 'app/data.js'), 'w', encoding='utf-8').write(js)
print("app/data.js — %d уроков, %d с полным содержанием" % (len(slim), len(l)))

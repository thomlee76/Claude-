#!/usr/bin/env python3
"""Собирает build/artifact.html — версию приложения для публикации артефактом.

Артефакт оборачивает файл в собственный <html>/<head>/<body>, поэтому здесь
остаётся только содержимое страницы: <title>, шрифты, стили и разметка.
Service worker и manifest в этой версии не подключаются, но иконка для
экрана «Домой» подключается: без неё iOS кладёт на ярлык скриншот страницы.
"""
import os, re

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(root, 'app/index.html'), encoding='utf-8').read()

body = src[src.index('<div id="app">'):src.index('</body>')]
body = body.replace('<script src="data.js"></script>', '<script src="data.js"></script>')

head = '''<title>Verb 100</title>
<link rel="apple-touch-icon" sizes="180x180" href="icons/icon-180.png">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">
<meta name="apple-mobile-web-app-title" content="Verb 100">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#FBF7F1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700&family=Golos+Text:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap">
<link rel="stylesheet" href="app.css">
'''

os.makedirs(os.path.join(root, 'build'), exist_ok=True)
out = os.path.join(root, 'build/artifact.html')
open(out, 'w', encoding='utf-8').write(head + body)
print('build/artifact.html — %.1f KB' % (os.path.getsize(out) / 1024))

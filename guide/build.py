#!/usr/bin/env python3
"""Справочник «Невидимая половина Claude»: src.html (артефакт) -> index.html + sw.js (приложение для iPhone)."""
import re, json, hashlib
from pathlib import Path
R = Path(__file__).resolve().parent
src = (R / 'src.html').read_text(encoding='utf-8')
body = src.split('<body>', 1)[1].rsplit('</body>', 1)[0]
reset = re.search(r'<style>(:root\{color-scheme:light.*?)</style>', src, re.S).group(1)
title = re.search(r'<title>(.*?)</title>', body).group(1)
body = re.sub(r'<title>.*?</title>\s*', '', body)
body = re.sub(r'<link rel="preconnect"[^>]*>\s*', '', body)
body = re.sub(r'<link rel="stylesheet" href="https://fonts.googleapis.com[^"]*">', '<link rel="stylesheet" href="fonts/fonts.css">', body)
body = body.replace('Отметки «Опробовал» хранятся только в этом браузере.', 'Отметки «Опробовал» хранятся на этом устройстве.')
head = f'''<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="16 функций Claude и Claude Code, которыми вы пока не пользуетесь: что это, зачем, как начать и готовый запрос.">
<meta name="theme-color" content="#0B6E78">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="icon" href="icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Невидимая половина">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<style>{reset}
.hint{{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:20;width:min(520px,calc(100vw - 32px));display:flex;gap:10px;align-items:center;
  background:var(--ink);color:var(--bg);border-radius:12px;padding:12px 10px 12px 16px;font-size:14.5px;line-height:1.4;box-shadow:0 8px 24px rgba(0,0,0,.2)}}
.hint span{{flex:1;min-width:0}}.hint button{{border:0;background:transparent;color:var(--bg);font-size:18px;padding:4px 8px;cursor:pointer;opacity:.8}}
</style>
</head>
<body>
'''
tail = '''<div class="hint" id="hint" hidden><span>Установите справочник как приложение: <b>Поделиться</b> внизу Safari → <b>На экран «Домой»</b>. Он будет работать и без интернета.</span><button type="button" id="hintX" aria-label="Закрыть">✕</button></div>
<script>(function(){try{var ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
var sa=navigator.standalone||matchMedia('(display-mode: standalone)').matches;var k='cl16-hint';
if(ios&&!sa&&location.protocol==='https:'&&!localStorage.getItem(k)){var h=document.getElementById('hint');h.hidden=false;document.getElementById('hintX').onclick=function(){h.hidden=true;try{localStorage.setItem(k,'1')}catch(e){}};}}catch(e){}
if('serviceWorker' in navigator){var had=!!navigator.serviceWorker.controller,rl=false;navigator.serviceWorker.addEventListener('controllerchange',function(){if(had&&!rl){rl=true;location.reload()}});
addEventListener('load',function(){navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(function(){})});}
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(function(){});})();</script>
</body>
</html>
'''
html = head + body.strip() + '\n' + tail
(R / 'index.html').write_text(html, encoding='utf-8')
fonts = sorted('fonts/' + p.name for p in (R / 'fonts').iterdir())
pre = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'] + fonts
h = hashlib.sha1(html.encode())
for p in pre[2:]: h.update((R / p).read_bytes())
(R / 'sw.js').write_text((R / 'sw-template.js').read_text(encoding='utf-8').replace('__CACHE__', 'cl16-' + h.hexdigest()[:10]).replace('__PRECACHE__', json.dumps(pre)), encoding='utf-8')
print('ok', len(html), 'bytes;', len(pre), 'files to cache')

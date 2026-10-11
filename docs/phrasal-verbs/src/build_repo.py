"""Build the GitHub version of «Фразовые глаголы 100».
- phrasal-verbs/index.html  : PWA (works offline after first open; images/audio as files, cached by sw.js)
- phrasal-verbs/offline/phrasal-verbs-100-offline.html : one self-contained file (everything embedded)
- phrasal-verbs/src/         : sources to keep editing later
"""
import re, os, json, io, base64, glob, shutil, hashlib
from PIL import Image, ImageDraw, ImageFont

HK = '/home/claude/hk'
OUT = '/home/claude/claude-/phrasal-verbs'
AUDIO_DIR = '/home/claude/tts/out'
FILES = ['lessons.js', 'lessons2.js', 'lessons_21.js', 'lessons_41.js', 'lessons_61.js', 'lessons_81.js']

app = open(f'{HK}/app.html', encoding='utf-8').read()
cut = app.index('<header class="bar">')
head_part, body_part = app[:cut], app[cut:]

data = '\n'.join(open(f'{HK}/{f}', encoding='utf-8').read() for f in FILES)
marks = {}
for j in sorted(glob.glob(AUDIO_DIR + '/day*.json')):
    n = int(re.search(r'day(\d+)', j).group(1))
    marks[n] = json.load(open(j))

def audio_name(n): return 'day%02d.mp3' % n
def img_name(n): return 'day%02d.jpg' % n

def jpeg_bytes(p, size=540, q=76):
    im = Image.open(p).convert('RGB').resize((size, size), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=q, optimize=True, progressive=True); return b.getvalue()

BASE_CSS = ('<style>html{-webkit-text-size-adjust:100%}:root{padding-top:env(safe-area-inset-top,0px);'
            'padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}'
            '[hidden]{display:none!important}</style>')

def page(data_js, extra_head='', extra_body=''):
    body = body_part.replace('/*LESSONS*/', data_js)
    return ('<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<meta name="theme-color" content="#E8642C">\n' + BASE_CSS + '\n' + extra_head + head_part +
            '</head>\n<body>\n' + body + extra_body + '\n</body>\n</html>\n')

# ---------- clean output ----------
if os.path.exists(OUT): shutil.rmtree(OUT)
for d in ['img', 'audio', 'offline', 'src']: os.makedirs(f'{OUT}/{d}', exist_ok=True)

# ---------- media ----------
img_files, audio_files = [], []
for n in range(1, 101):
    src = f'{HK}/img/day{n:02d}.jpg'
    if os.path.exists(src):
        open(f'{OUT}/img/{img_name(n)}', 'wb').write(jpeg_bytes(src)); img_files.append('img/' + img_name(n))
    a = f'{AUDIO_DIR}/day{n:02d}.mp3'
    if os.path.exists(a):
        shutil.copy(a, f'{OUT}/audio/{audio_name(n)}'); audio_files.append('audio/' + audio_name(n))

# ---------- icons ----------
def icon(sz, path):
    im = Image.new('RGB', (sz, sz), '#E8642C'); d = ImageDraw.Draw(im)
    f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', int(sz * .30))
    for txt, y, col in [('go', .20, '#FFFFFF'), ('up', .52, '#BFE6F6')]:
        w = d.textlength(txt, font=f); d.text(((sz - w) / 2, sz * y), txt, font=f, fill=col)
    im.save(path)
icon(192, f'{OUT}/icon-192.png'); icon(512, f'{OUT}/icon-512.png'); icon(180, f'{OUT}/apple-touch-icon.png')
json.dump({"name": "Фразовые глаголы 100", "short_name": "Глаголы 100", "lang": "ru", "start_url": "./",
           "scope": "./", "display": "standalone", "background_color": "#FFFAF5", "theme_color": "#E8642C",
           "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
                     {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"}]},
          open(f'{OUT}/manifest.webmanifest', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- PWA page ----------
attach = ('\n(function(M){for(const k in M){const L=window.LESSONS[k];if(L){L.audio="audio/day"+String(k).padStart(2,"0")+".mp3";'
          'L.marks=M[k]}}})(' + json.dumps(marks) + ');\n')
pwa_head = ('<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
            '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n'
            '<meta name="apple-mobile-web-app-title" content="Глаголы 100">\n'
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">\n')
pwa_body = ('<script>if("serviceWorker" in navigator){addEventListener("load",()=>{navigator.serviceWorker.register("sw.js")'
            '.then(()=>navigator.serviceWorker.ready).then(r=>{if(r.active)r.active.postMessage("ensure")})'
            '.catch(()=>{})})}</script>')
html = page(data + attach, pwa_head, pwa_body)
open(f'{OUT}/index.html', 'w', encoding='utf-8').write(html)

# ---------- service worker ----------
precache = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'] + img_files + audio_files
_h = hashlib.sha1()
for _p in precache[1:]: _h.update(_p.encode()); _h.update(open(f'{OUT}/{_p}', 'rb').read())
ver = _h.hexdigest()[:10]
sw = '''const CACHE="pv100-%s";const PRECACHE=%s;
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("pv100-")&&k!==CACHE&&k!=="pv100-fonts").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function rangeResponse(req,res){const range=req.headers.get("range");if(!range||!res)return res;
  const buf=await res.arrayBuffer();const m=/bytes=(\\d*)-(\\d*)/.exec(range);let s=m&&m[1]?+m[1]:0;let e=m&&m[2]?+m[2]:buf.byteLength-1;e=Math.min(e,buf.byteLength-1);
  return new Response(buf.slice(s,e+1),{status:206,statusText:"Partial Content",headers:{"Content-Type":res.headers.get("Content-Type")||"audio/mpeg","Content-Range":`bytes ${s}-${e}/${buf.byteLength}`,"Content-Length":String(e-s+1),"Accept-Ranges":"bytes"}})}
async function ensure(){const c=await caches.open(CACHE);const have=new Set((await c.keys()).map(r=>new URL(r.url).pathname));
  const base=new URL("./",self.registration.scope);const miss=PRECACHE.filter(p=>!have.has(new URL(p,base).pathname));
  for(let i=0;i<miss.length;i+=12){await Promise.all(miss.slice(i,i+12).map(p=>c.add(p).catch(()=>{})))}}
self.addEventListener("message",e=>{if(e.data==="ensure")e.waitUntil(ensure())});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET")return;
  if(u.hostname.endsWith("fonts.googleapis.com")||u.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.open("pv100-fonts").then(async c=>{const hit=await c.match(e.request);const net=fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}).catch(()=>hit);return hit||net}));return}
  if(u.origin!==location.origin)return;
  e.respondWith((async()=>{const c=await caches.open(CACHE);const key=new Request(u.pathname.endsWith("/")?u.pathname:u.href);
    let hit=await c.match(e.request,{ignoreSearch:true})||await c.match(key,{ignoreSearch:true});
    if(e.request.mode==="navigate"&&!hit)hit=await c.match("index.html");
    if(hit)return u.pathname.endsWith(".mp3")?rangeResponse(e.request,hit.clone()):hit;
    try{const r=await fetch(e.request);if(r.ok&&r.status===200)c.put(e.request,r.clone());return r}catch(err){return hit||Response.error()}})())});
''' % (ver, json.dumps(precache))
open(f'{OUT}/sw.js', 'w', encoding='utf-8').write(sw)

# ---------- single-file offline version ----------
def b64(p, mime): return f'data:{mime};base64,' + base64.b64encode(open(p, 'rb').read()).decode()
off_data = re.sub(r'img:"(img/day\d+\.jpg)"', lambda m: 'img:"' + b64(f'{OUT}/{m.group(1)}', 'image/jpeg') + '"', data)
amap = {n: b64(f'{OUT}/audio/{audio_name(n)}', 'audio/mpeg') for n in marks}
off_attach = ('\n(function(M,A){for(const k in M){const L=window.LESSONS[k];if(L){L.audio=A[k];L.marks=M[k]}}})(' +
              json.dumps(marks) + ',' + json.dumps(amap) + ');\n')
open(f'{OUT}/offline/phrasal-verbs-100-offline.html', 'w', encoding='utf-8').write(page(off_data + off_attach))

# ---------- sources ----------
for f in FILES + ['app.html', 'build.py', 'build_repo.py', 'validate.js', 'plan_21_100.txt']:
    shutil.copy(f'{HK}/{f}', f'{OUT}/src/{f}')
for n in range(1, 101):
    pass
json.dump(marks, open(f'{OUT}/src/audio_marks.json', 'w'))

sz = lambda p: round(os.path.getsize(p) / 1e6, 2)
print('index.html MB', sz(f'{OUT}/index.html'), '| offline MB', sz(f'{OUT}/offline/phrasal-verbs-100-offline.html'),
      '| imgs', len(img_files), '| audio', len(audio_files), '| precache', len(precache), '| sw ver', ver)

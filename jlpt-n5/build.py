#!/usr/bin/env python3
"""그림 변환과 오프라인 목록 생성.
사용: python3 build.py [PNG 폴더]
 - PNG 폴더가 주어지면 <id>.png 를 img/<id>.webp (400px)로 변환한다.
 - assets.js (그림이 있는 단어 id 목록)와 sw.js (오프라인 캐시 목록)를 다시 만든다.
"""
import hashlib, json, os, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IMG = ROOT / "img"
IMG.mkdir(exist_ok=True)

if len(sys.argv) > 1:
    from PIL import Image
    for p in sorted(Path(sys.argv[1]).glob("*.png")):
        im = Image.open(p).convert("RGB")
        if max(im.size) > 400:
            im.thumbnail((400, 400), Image.LANCZOS)
        im.save(IMG / (p.stem + ".webp"), "WEBP", quality=82, method=6)

ids = sorted(p.stem for p in IMG.glob("*.webp"))
(ROOT / "assets.js").write_text("window.IMGS=" + json.dumps(ids, separators=(",", ":")) + ";\n", encoding="utf-8")

core = ["./", "index.html", "words.js", "assets.js", "manifest.webmanifest",
        "icon-192.png", "icon-512.png", "apple-touch-icon.png"]
files = core + ["img/%s.webp" % i for i in ids]
h = hashlib.sha1()
for f in files[1:]:
    p = ROOT / f
    if p.exists():
        h.update(f.encode()); h.update(p.read_bytes())
ver = h.hexdigest()[:10]

SW = r'''const CACHE="n5-%s";const CORE=%d;const PRECACHE=%s;
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE.slice(0,CORE))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("n5-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function ensure(){const c=await caches.open(CACHE);const have=new Set((await c.keys()).map(r=>new URL(r.url).pathname));
  const base=new URL("./",self.registration.scope);const miss=PRECACHE.filter(p=>!have.has(new URL(p,base).pathname));
  for(let i=0;i<miss.length;i+=8){await Promise.all(miss.slice(i,i+8).map(p=>c.add(p).catch(()=>{})))}}
self.addEventListener("message",e=>{if(e.data==="ensure")e.waitUntil(ensure())});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  if(e.request.mode==="navigate"||/\/(index\.html|words\.js|assets\.js)$/.test(u.pathname)){
    const key=e.request.mode==="navigate"?"index.html":e.request;
    e.respondWith((async()=>{const c=await caches.open(CACHE);
      try{const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),4000);
        const r=await fetch(e.request,{cache:"no-store",signal:ctl.signal});clearTimeout(t);
        if(r.ok){c.put(key,r.clone());return r}}catch(err){}
      return (await c.match(key,{ignoreSearch:true}))||(await c.match("./"))||Response.error()})());return}
  e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
    try{const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}catch(err){return Response.error()}})())});
'''
(ROOT / "sw.js").write_text(SW % (ver, len(core), json.dumps(files)), encoding="utf-8")
print("images:", len(ids), "cache:", "n5-" + ver)

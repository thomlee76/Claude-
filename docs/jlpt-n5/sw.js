const CACHE="n5-02c57cf272";const CORE=8;const PRECACHE=["./", "index.html", "words.js", "assets.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "img/ane.webp", "img/ani.webp", "img/chichi.webp", "img/gakusei.webp", "img/genki.webp", "img/haha.webp", "img/hito.webp", "img/imouto.webp", "img/inu.webp", "img/kaeru.webp", "img/neko.webp", "img/nigiyaka.webp", "img/otouto.webp", "img/samui.webp", "img/suki.webp", "img/taberu.webp", "img/tomodachi.webp", "img/watashi.webp"];
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

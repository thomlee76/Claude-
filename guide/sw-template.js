const CACHE="__CACHE__";const PRECACHE=__PRECACHE__;
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("cl16-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  if(e.request.mode==="navigate"||u.pathname.endsWith("/index.html")){
    e.respondWith((async()=>{const c=await caches.open(CACHE);
      try{const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),4000);
        const r=await fetch(e.request,{cache:"no-store",signal:ctl.signal});clearTimeout(t);
        if(r.ok){c.put("index.html",r.clone());return r}}catch(err){}
      return (await c.match("index.html"))||(await c.match("./"))||Response.error()})());return}
  e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
    try{const r=await fetch(e.request);if(r.ok&&r.status===200)c.put(e.request,r.clone());return r}catch(err){return Response.error()}})())});

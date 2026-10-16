const CACHE="__CACHE__";const PRECACHE=__PRECACHE__;
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE.slice(0,6))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("cvr-")&&k!==CACHE&&k!=="cvr-fonts"&&k!=="cvr-files").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function ensure(){const c=await caches.open(CACHE);const have=new Set((await c.keys()).map(r=>new URL(r.url).pathname));
  const base=new URL("./",self.registration.scope);const miss=PRECACHE.filter(p=>!have.has(new URL(p,base).pathname));
  for(let i=0;i<miss.length;i+=8){await Promise.all(miss.slice(i,i+8).map(p=>c.add(p).catch(()=>{})))}}
self.addEventListener("message",e=>{if(e.data==="ensure")e.waitUntil(ensure())});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET")return;
  if(u.hostname.endsWith("fonts.googleapis.com")||u.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.open("cvr-fonts").then(async c=>{const hit=await c.match(e.request);const net=fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}).catch(()=>hit);return hit||net}));return}
  if(u.origin!==location.origin)return;
  if(e.request.mode==="navigate"||u.pathname.endsWith("/index.html")){
    e.respondWith((async()=>{const c=await caches.open(CACHE);
      try{const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),4000);
        const r=await fetch(e.request,{cache:"no-store",signal:ctl.signal});clearTimeout(t);
        if(r.ok){c.put("index.html",r.clone());return r}}catch(err){}
      return (await c.match("index.html"))||(await c.match("./"))||Response.error()})());return}
  if(u.pathname.endsWith(".pdf")){e.respondWith(caches.open("cvr-files").then(async c=>{const hit=await c.match(e.request);if(hit)return hit;const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}));return}
  e.respondWith((async()=>{const c=await caches.open(CACHE);
    const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
    try{const r=await fetch(e.request);if(r.ok&&r.status===200)c.put(e.request,r.clone());return r}catch(err){return Response.error()}})())});

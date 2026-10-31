const CACHE="cl16-c4b86cee1d";const PRECACHE=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "fonts/Unbounded-cyrillic-cb504d.woff2", "fonts/Unbounded-latin-37e641.woff2", "fonts/fonts.css", "video/ch-01.jpg", "video/ch-02.jpg", "video/ch-03.jpg", "video/ch-04.jpg", "video/ch-05.jpg", "video/ch-06.jpg", "video/ch-07.jpg", "video/ch-08.jpg"];const VC="cl16-video";
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("cl16-")&&k!==CACHE&&k!==VC).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
async function ranged(req,res){const range=req.headers.get("range");if(!range)return res;const buf=await res.arrayBuffer();const m=/bytes=(\d*)-(\d*)/.exec(range);
  let s=m&&m[1]?+m[1]:0,e=m&&m[2]?+m[2]:buf.byteLength-1;e=Math.min(e,buf.byteLength-1);
  return new Response(buf.slice(s,e+1),{status:206,statusText:"Partial Content",headers:{"Content-Type":"video/mp4","Content-Range":`bytes ${s}-${e}/${buf.byteLength}`,"Content-Length":String(e-s+1),"Accept-Ranges":"bytes"}})}
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  if(u.pathname.endsWith(".mp4")){e.respondWith((async()=>{const c=await caches.open(VC);const key=new URL("video/"+u.pathname.split("/").pop(),self.registration.scope).href;
    const hit=await c.match(key);if(hit)return ranged(e.request,hit.clone());try{return await fetch(e.request)}catch(err){return Response.error()}})());return}
  if(e.request.mode==="navigate"||u.pathname.endsWith("/index.html")){
    e.respondWith((async()=>{const c=await caches.open(CACHE);
      try{const ctl=new AbortController();const t=setTimeout(()=>ctl.abort(),4000);
        const r=await fetch(e.request,{cache:"no-store",signal:ctl.signal});clearTimeout(t);
        if(r.ok){c.put("index.html",r.clone());return r}}catch(err){}
      return (await c.match("index.html"))||(await c.match("./"))||Response.error()})());return}
  e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;
    try{const r=await fetch(e.request);if(r.ok&&r.status===200)c.put(e.request,r.clone());return r}catch(err){return Response.error()}})())});

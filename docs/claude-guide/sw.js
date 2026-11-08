const CACHE = 'cg-1bb5675ad8';
const VCACHE = 'cg-video-6256e62a';
const PRECACHE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "content.enc"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE && k !== VCACHE && k.startsWith('cg-')).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Encrypted media: served from the video cache when the user saved it; otherwise network.
  if (url.pathname.includes('/video/') && url.pathname.endsWith('.enc')) {
    e.respondWith((async () => {
      const vc = await caches.open(VCACHE);
      const hit = await vc.match(url.href, { ignoreSearch: true });
      return hit || fetch(req);
    })());
    return;
  }

  // Shell + content.enc: network first (so a new password or content arrives at once), cache when offline.
  const fresh = req.mode === 'navigate' || /\/(index\.html|content\.enc|sw\.js|manifest\.webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
  e.respondWith((async () => {
    if (fresh) {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 6000);
        const res = await fetch(req, { signal: ctrl.signal, cache: 'no-cache' });
        clearTimeout(t);
        if (res.ok) { const c = await caches.open(CACHE); c.put(req, res.clone()).catch(() => {}); return res; }
      } catch (err) {}
      const hit = await caches.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') return caches.match('index.html');
      return Response.error();
    }
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    return fetch(req);
  })());
});

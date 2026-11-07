const CACHE = 'cg-4f53fef257';
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

  // App shell and content.enc: cache first, then network, then index for navigations.
  e.respondWith((async () => {
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      return await fetch(req);
    } catch (err) {
      if (req.mode === 'navigate') return caches.match('index.html');
      throw err;
    }
  })());
});

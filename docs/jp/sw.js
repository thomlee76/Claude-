/* 日本語 復習ノート — 오프라인 서비스 워커
   앱 셸: 미리 캐시(cache-first) · 수업 자료: 열어본 것만 캐시(앱 업데이트해도 유지)
   외부 자원(구글 폰트): stale-while-revalidate */
const VERSION = 'jpn-v11';
const SHELL = VERSION + '-shell';
const RUNTIME = VERSION + '-runtime';
const SHEETS = 'jpn-sheets-v2';   // 버전과 무관 — 한 번 받은 자료는 다시 받지 않음

const SHELL_FILES = [
  './',
  './index.html',
  './data.js',
  './app.js',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SHELL)
      .then(c => c.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  const keep = [SHELL, RUNTIME, SHEETS];
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => keep.indexOf(k) < 0).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

function cacheFirst(req, cacheName) {
  return caches.open(cacheName).then(c =>
    c.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200) c.put(req, res.clone());
      return res;
    }))
  );
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 페이지 이동: 네트워크 우선, 실패 시 캐시된 셸로 오프라인 동작
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(SHELL).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html', { ignoreSearch: true })
          .then(r => r || caches.match('./')))
    );
    return;
  }

  if (url.origin === location.origin) {
    // 수업 자료 이미지: 열어본 것만 따로 보관
    if (url.pathname.indexOf('/sheets/') >= 0) { e.respondWith(cacheFirst(req, SHEETS)); return; }
    // 그 밖의 같은 출처 파일: 앱 셸 캐시
    e.respondWith(cacheFirst(req, SHELL));
    return;
  }

  // 외부 자원(구글 폰트 등): 캐시 반환 후 백그라운드 갱신
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(RUNTIME).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

/* Базовые глаголы 100 (Verb 100) — офлайн-кэш.
   Код и данные (index, app.js, app.css, data.js, fonts.css): сначала сеть (3 с), иначе кэш —
   обновления видны с первого запуска. Картинки, шрифты, иконки: сначала кэш.
   Обслуживает только свои файлы и удаляет только кэши verb100-*: соседние
   приложения (phrasal-verbs/, jp/, book/ …) кэшируют себя сами. */
var CACHE = "verb100-v2";
var CORE = [
  "./", "./index.html", "./app.css", "./app.js", "./data.js", "./fonts.css", "./manifest.webmanifest",
  "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"
];
var OWN = /^(|index\.html|app\.css|app\.js|data\.js|fonts\.css|manifest\.webmanifest|(fonts|icons|images)\/[^\/]+)$/;
var FRESH = /^(|index\.html|app\.css|app\.js|data\.js|fonts\.css|manifest\.webmanifest)$/;

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(CORE.map(function (u) { return c.add(new Request(u, { cache: "reload" })).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf("verb100-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function networkFirst(req) {
  return caches.open(CACHE).then(function (c) {
    var ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 3000) : null;
    return fetch(req, ctl ? { cache: "no-store", signal: ctl.signal } : { cache: "no-store" }).then(function (res) {
      if (timer) clearTimeout(timer);
      if (res && res.status === 200) c.put(req, res.clone());
      return res;
    }).catch(function () {
      return c.match(req, { ignoreSearch: true }).then(function (hit) { return hit || Response.error(); });
    });
  });
}

function cacheFirst(req) {
  return caches.match(req).then(function (hit) {
    var net = fetch(req).then(function (res) {
      if (res && res.status === 200) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () { return hit; });
    return hit || net;
  });
}

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  var base = new URL("./", self.registration.scope).pathname;
  if (url.pathname.indexOf(base) !== 0) return;
  var rel = url.pathname.slice(base.length);
  if (!OWN.test(rel)) return;
  e.respondWith(FRESH.test(rel) ? networkFirst(e.request) : cacheFirst(e.request));
});

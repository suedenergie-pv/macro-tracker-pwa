const CACHE_NAME = 'macro-tracker-7c64854a59a2cbb2';
const INDEX_URL = '/macro-tracker/';
const PRECACHE_URLS = [
  "/macro-tracker/",
  "/macro-tracker/.nojekyll",
  "/macro-tracker/404.html",
  "/macro-tracker/icon-180.png",
  "/macro-tracker/icon-192.png",
  "/macro-tracker/icon-512.png",
  "/macro-tracker/index.html",
  "/macro-tracker/manifest.webmanifest",
  "/macro-tracker/metadata.json",
  "/macro-tracker/_expo/static/js/web/index-03a066d15a86c2d6914bf891273d27bf.js",
  "/macro-tracker/_expo/static/js/web/index-46f6615a318802945c0f6fb0f1d079c2.js"
];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('macro-tracker-') && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(INDEX_URL, copy)); return response; }).catch(() => caches.match(INDEX_URL)));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => { if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)); } return response; })));
});

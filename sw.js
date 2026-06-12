// Simple service worker for PWA install + offline support
var CACHE = 'novel-reader-v1';
var FILES = [
  '/novel-reader/',
  '/novel-reader/index.html',
  '/novel-reader/manifest.json',
  '/novel-reader/icon.svg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request);
    })
  );
});

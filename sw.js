// Minimal service worker — only for PWA install trigger, no page caching
// (index.html changes frequently; caching it blocks updates)
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  // Clear all old caches
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    })
  );
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e) {
  // Pass through — never cache, always fetch from network
  e.respondWith(fetch(e.request));
});

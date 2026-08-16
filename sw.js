const CACHE_NAME = 'nstropy-v4';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './logo-clean.png',
  './logo.png',
  './header-logo.png',
  './logo-square.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './gallery/g1.jpg',
  './gallery/g2.jpg',
  './gallery/g3.jpg',
  './gallery/g4.jpg',
  './gallery/g5.jpg',
  './gallery/g6.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => cached);
    })
  );
});

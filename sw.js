const CACHE_NAME = 'am3lue-portfolio-v5'; // Bumped to v5 to force CSS update
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/profile.html',
    '/repos.html',
    '/style.css',
    '/app.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Fira+Code:wght@400;500&display=swap',
    'https://unpkg.com/vue@3/dist/vue.global.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.js',
    'https://unpkg.com/aos@2.3.1/dist/aos.css'
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force active immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
            })
        ))
    );
    self.clients.claim(); // Take control immediately
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('api.github.com')) return;
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
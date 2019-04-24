const cacheName = 'cache-v1';
const resourcesToPrechace = [
	'/',
	'index.html',
	'styles/style.css',
	'scripts/script.js',
	'scripts/bootstrap.min.css',
	'scripts/bootstrap.min.js',
	'scripts/jquery-3.4.0.js',
	'assets/music-player.svg'.
];

self.addEventListener('install', event => {
	console.log('Service Worker Install event');
	event.waitUntil(
		caches.open(cacheName)
		.then(cache => {
			return cache.addAll(resourcesToPrechace);
		})
	);
});

self.addEventListener('activate', event => {
	console.log('Activate event');
});

self.addEventListener('fetch', event => {
	event.respondWith(caches.match(event.request)
		.then(cachedResponse => {
			return cachedResponse || fetch(event.request);
		})
	);
	console.log('Fetch intercepted for:', event.request.url);
});



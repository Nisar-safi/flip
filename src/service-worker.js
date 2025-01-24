// Import necessary values
const build = self.__SAPPER__?.build || [];
const files = self.__SAPPER__?.files || [];
const version = self.__SAPPER__?.version || "1";

const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files  // everything in `static`
];

// Install service worker
self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE);
			await cache.addAll(ASSETS);
		})()
	);
});

// Activate service worker
self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			for (const key of keys) {
				if (key !== CACHE) {
					await caches.delete(key);
				}
			}
		})()
	);
});

// Fetch event handler
self.addEventListener('fetch', (event) => {
	// Ignore non-GET requests
	if (event.request.method !== 'GET') return;

	event.respondWith(
		(async () => {
			const url = new URL(event.request.url);
			const cache = await caches.open(CACHE);

			// Serve assets from cache if present
			if (ASSETS.includes(url.pathname)) {
				const cachedResponse = await cache.match(url.pathname);
				if (cachedResponse) {
					return cachedResponse;
				}
			}

			try {
				// Attempt to fetch from the network
				const response = await fetch(event.request);
				const isNotExtension = url.protocol.startsWith('http');
				const isSuccess = response.status === 200;

				// Cache successful responses for non-extension requests
				if (isNotExtension && isSuccess) {
					cache.put(event.request, response.clone());
				}
				return response;
			} catch (error) {
				// Fallback to cache if network fails
				const cachedResponse = await cache.match(url.pathname);
				if (cachedResponse) {
					return cachedResponse;
				}

				// Return a fallback response if not found in cache
				return new Response('Not found', { status: 404 });
			}
		})()
	);
});

const CACHE_NAME = 'carga-perfecta-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

// Instalar Service Worker
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Cache abierto');
      return cache.addAll(urlsToCache);
    }).catch(function(err) {
      console.log('Error en cache:', err);
    })
  );
  self.skipWaiting();
});

// Activar Service Worker
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia: Cache First, luego Network
self.addEventListener('fetch', function(e) {
  // Solo interceptar GET requests
  if (e.request.method !== 'GET') {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(response) {
      // Si existe en cache, devolverlo
      if (response) {
        return response;
      }

      // Si no está en cache, hacer fetch de la red
      return fetch(e.request).then(function(response) {
        // No cachear respuestas no válidas
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clonar la respuesta
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, responseToCache);
        });

        return response;
      }).catch(function(err) {
        console.log('Error en fetch:', err);
        // Opcionalmente, devolver una página offline
        return new Response('Offline - Por favor intenta más tarde', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      });
    })
  );
});

// Manejar mensajes desde clientes
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
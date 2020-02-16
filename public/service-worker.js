const filesToCache = [
    '/offline',
    '/error404',
    '/manifest.webmanifest',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon.ico',
    '/css/style.css',
    '/img/android-chrome-192x192.png',
    '/img/android-chrome-512x512.png',
    '/img/apple-touch-icon.png',
    '/js/home.js',
    '/js/signin.js',
    '/js/signup.js',
    '/js/workout.js',
    '/js/workoutCreate.js',
    '/js/workouts.js'
  ];
  
  const staticCacheName = 'pages-cache-v2';
  
  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
    );
  });
  
  self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
  
    const cacheWhitelist = [staticCacheName];
  
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
        .then(response => {
          if (response.status === 404) {
            return caches.match('/error404');
          }
          return caches.open(staticCacheName)
          .then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      }).catch(error => {
        console.log('Error, ', error);
        return caches.match('/offline');
      })
    );
  });
  
  
  
  
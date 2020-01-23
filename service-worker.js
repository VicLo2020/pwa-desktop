var CACHE_NAME = 'PWA-test-cache-v1';
var urlsToCache = [
  '/index.html', 
  '/index.css',
  '/index.js',
  '/App.css',
  '/App.js',
  '/serviceWorker.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  // Precache static resources here.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  console.log('Finally active. Ready to start serving content!');  
  // Remove previous cached data from disk.
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  self.clients.claim();

});

self.addEventListener('fetch', function(e) {
  
  console.log('[ServiceWorker] Fetch', e.request.url);

  var _url = e.request.url;
  e.respondWith(
    fetch(e.request)
      .catch((err) => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            let site = 'localhost';
            let filename = getFileName( _url );
            filename = filename == site ? 'index.html' : filename;
            return cache.match(filename);
          });
      })
  );
});

function getFileName(u) {
  let f = u.split('?').filter(item => item).shift();
  f = f.split('/').filter(item => item).pop();
  return f;
}
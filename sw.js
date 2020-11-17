const staticCacheName = "site-static-v2",
  assets = [
    "/",
    "/index.html",
    "assets/js/storage.js",
    "assets/js/weather.js",
    "assets/js/ui.js",
    "assets/js/app.js",
    "assets/css/style.css"
  ];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//install service worker
self.addEventListener("install", evt => {
  // console.log("service worker has been installed");
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});
//Activate service worker
self.addEventListener("activate", evt => {
  // console.log("service worker has been activated");
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key != staticCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});
//fetch event
self.addEventListener("fetch", evt => {
  // console.log("Fetch evt", evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});

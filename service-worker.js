self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("linkshort-cache").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/css/style.css",
        "/assets/js/app.js",
        "/assets/img/logo.svg",
        "/assets/img/icon-192.png",
        "/assets/img/icon-512.png"
      ]);
    })
  );
});


self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});

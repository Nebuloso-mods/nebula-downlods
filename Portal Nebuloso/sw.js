const CACHE_NAME = "portal-nebuloso-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",

  "./manifest.json",

  "./css/Base.css",
  "./css/Layout.css",
  "./css/Componentes.css",
  "./css/Loader.css",
  "./css/Login.css",
  "./css/Chat.css",
  "./css/Style.css",

  "./js/app.js",
  "./js/navigation.js",
  "./js/mods.js",
  "./js/pwa.js",
  "./js/profile.js",

  "./firebase/firebase-config.js",
  "./firebase/auth.js",
  "./firebase/chat.js",
  "./firebase/admin.js",

  "./Banner.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
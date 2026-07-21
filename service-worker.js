const CACHE_NAME = "madeira-2026-v6";
const IMAGE_ASSETS = [
  "./images/barreirinha.jpg",
  "./images/canico.jpg",
  "./images/cristo-rei.jpg",
  "./images/faial.jpg",
  "./images/fanalwald.jpg",
  "./images/funchal-altstadt.jpg",
  "./images/funchal-marina.jpg",
  "./images/funchal-promenade.jpg",
  "./images/hotel-cais-da-oliveira.jpg",
  "./images/levada-dos-balcoes.jpg",
  "./images/machico.jpg",
  "./images/mercado-dos-lavradores.jpg",
  "./images/miradouro-do-guindaste.jpg",
  "./images/paul-da-serra.jpg",
  "./images/pico-do-arieiro.jpg",
  "./images/ponta-da-oliveira.jpg",
  "./images/ponta-de-sao-lourenco.jpg",
  "./images/porto-da-cruz.jpg",
  "./images/praia-do-garajau.jpg",
  "./images/santana.jpg",
  "./images/credits.json"
];
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20260721-5",
  "./app.js?v=20260721-5",
  "./enhancements.js?v=20260721-5",
  "./link-fixes.js?v=20260721-5",
  "./manifest.json",
  "./assets/madeira-coast.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png",
  ...IMAGE_ASSETS
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  const isAppCode = event.request.mode === "navigate" || /\.(?:html|js|css)$/.test(requestUrl.pathname);
  if (isAppCode) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }))
  );
});
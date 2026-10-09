
/* ⚡ PORTAL NEBULOSO — SERVICE WORKER */

const CACHE_NAME = "portal-nebuloso-v4";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./CSS/base.css",
  "./CSS/chat.css",
  "./CSS/components.css",
  "./CSS/layout.css",
  "./CSS/loader.css",
  "./CSS/login.css",
  "./CSS/profile.css",
  "./CSS/pwa.css",

  "./Assets/imagens/Banner.png",

  "./Assets/icons/icon-192.png",
  "./Assets/icons/icon-512.png",
  "./Assets/icons/maskable-icon-512.png"
];

/* INSTALAÇÃO */
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    await Promise.allSettled(
      FILES_TO_CACHE.map(async caminho => {
        try {
          const resposta = await fetch(caminho);

          if (resposta.ok) {
            await cache.put(caminho, resposta);
          } else {
            console.warn(
              "[Nebuloso] Arquivo não encontrado:",
              caminho
            );
          }
        } catch (erro) {
          console.warn(
            "[Nebuloso] Falha ao carregar:",
            caminho
          );
        }
      })
    );

    await self.skipWaiting();
  })());
});

/* ATIVAÇÃO */
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const chaves = await caches.keys();

    await Promise.all(
      chaves
        .filter(chave =>
          chave.startsWith("portal-nebuloso-") &&
          chave !== CACHE_NAME
        )
        .map(chave => caches.delete(chave))
    );

    await self.clients.claim();
  })());
});

/* REQUISIÇÕES */
self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const respostaCache = await cache.match(request);

    if (respostaCache) {
      return respostaCache;
    }

    try {
      const respostaRede = await fetch(request);

      if (respostaRede.ok) {
        await cache.put(request, respostaRede.clone());
      }

      return respostaRede;
    } catch (erro) {
      if (request.mode === "navigate") {
        const pagina = await cache.match("./index.html");

        if (pagina) return pagina;
      }

      return new Response("Você está offline.", {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      });
    }
  })());
});
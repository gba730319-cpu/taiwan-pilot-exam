const CACHE_NAME = "pilot-exam-offline-v2";
const CORE_ASSETS = ["/", "/offline.html", "/manifest.webmanifest", "/icons/pilot-192.svg", "/icons/pilot-512.svg"];

async function cacheResponse(cache, url, requestOptions = {}) {
  try {
    const response = await fetch(url, { cache: "reload", ...requestOptions });
    if (response && response.ok && response.type !== "opaque") {
      await cache.put(url, response.clone());
      return response;
    }
  } catch (_) {}
  return null;
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    let html = "";
    const page = await cacheResponse(cache, "/", { credentials: "same-origin" });
    if (page) {
      try { html = await page.clone().text(); } catch (_) {}
    }

    // Pre-cache the JavaScript and CSS referenced by the Next.js app shell.
    // This is important for standalone iOS home-screen launches while offline.
    const assets = new Set();
    const patterns = [
      /<script[^>]+src=["']([^"']+)["']/g,
      /<link[^>]+href=["']([^"']+\.css(?:\?[^"']*)?)["']/g,
      /<link[^>]+href=["']([^"']*\/_next\/static\/[^"']+)["']/g
    ];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        try {
          const assetUrl = new URL(match[1], self.location.origin);
          if (assetUrl.origin === self.location.origin) assets.add(assetUrl.href);
        } catch (_) {}
      }
    }

    await Promise.all([...assets].map(async (url) => {
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok && response.type !== "opaque") await cache.put(url, response);
      } catch (_) {}
    }));

    await Promise.all(CORE_ASSETS.filter((url) => url !== "/").map((url) => cacheResponse(cache, url)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("pilot-exam-offline-") && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/_next/webpack-hmr")) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("/", response.clone());
          await cache.put(request, response.clone());
        }
        return response;
      } catch (_) {
        return (await caches.match(request)) ||
          (await caches.match(url.pathname)) ||
          (await caches.match("/")) ||
          (await caches.match("/offline.html"));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && (response.type === "basic" || response.type === "cors")) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      return new Response("", { status: 503, statusText: "Offline" });
    }
  })());
});

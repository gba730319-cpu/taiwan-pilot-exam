const CACHE_NAME = "pilot-exam-offline-v4";
const APP_SHELL = ["/", "/mock-exam", "/offline.html", "/manifest.webmanifest", "/icons/pilot-192.svg", "/icons/pilot-512.svg"];

function absolute(path) {
  return new URL(path, self.location.origin).href;
}

async function cacheResponse(cache, request, response) {
  if (!response || !response.ok || response.type === "opaque") return false;
  await cache.put(request, response.clone());
  return true;
}

async function precachePath(cache, path) {
  const request = new Request(absolute(path), { credentials: "same-origin", cache: "reload" });
  const response = await fetch(request);
  if (!await cacheResponse(cache, request, response)) throw new Error("Required offline asset failed: " + path);
}

function findAppAssets(html) {
  const assets = new Set();
  const tags = html.match(/<(?:script|link)\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const isScript = /^<script/i.test(tag);
    const isCss = /^<link/i.test(tag) && /rel=["']stylesheet["']/i.test(tag);
    if (!isScript && !isCss) continue;
    const match = tag.match(isScript ? /\bsrc=["']([^"']+)["']/i : /\bhref=["']([^"']+)["']/i);
    if (!match) continue;
    try {
      const url = new URL(match[1], self.location.origin);
      if (url.origin === self.location.origin && url.pathname.startsWith("/_next/")) assets.add(url.href);
    } catch (_) {}
  }
  return [...assets];
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const homeRequest = new Request(absolute("/"), { credentials: "same-origin", cache: "reload" });
    const homeResponse = await fetch(homeRequest);
    if (!await cacheResponse(cache, homeRequest, homeResponse)) {
      throw new Error("Homepage could not be cached; offline install aborted.");
    }

    const assets = findAppAssets(await homeResponse.clone().text());
    await Promise.all(APP_SHELL.filter((path) => path !== "/").map((path) => precachePath(cache, path)));

    const assetResults = await Promise.all(assets.map(async (url) => {
      const request = new Request(url, { credentials: "same-origin", cache: "reload" });
      try {
        const response = await fetch(request);
        return await cacheResponse(cache, request, response);
      } catch (_) { return false; }
    }));
    console.info("[Pilot Exam PWA] App shell cached", { html: true, assetsFound: assets.length, assetsCached: assetResults.filter(Boolean).length });
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
          await cache.put(absolute("/"), response.clone());
          await cache.put(request, response.clone());
        }
        return response;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(request, { ignoreSearch: true }))
          || (await cache.match(absolute(url.pathname)))
          || (await cache.match(absolute("/")))
          || (await cache.match(absolute("/offline.html")))
          || new Response("離線快取尚未準備完成。請先連線開啟網站一次。", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && (response.type === "basic" || response.type === "cors")) await cache.put(request, response.clone());
      return response;
    } catch (_) {
      return new Response("", { status: 503, statusText: "Offline" });
    }
  })());
});

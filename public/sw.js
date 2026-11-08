const CACHE_NAME = "pilot-exam-offline-v3";
const APP_SHELL = ["/", "/mock-exam", "/offline.html", "/manifest.webmanifest", "/icons/pilot-192.svg", "/icons/pilot-512.svg"];

function absolute(path) {
  return new URL(path, self.location.origin).href;
}

async function store(cache, request, response) {
  if (response && response.ok && response.type !== "opaque") {
    await cache.put(request, response.clone());
    return true;
  }
  return false;
}

async function precacheAsset(cache, path) {
  const url = absolute(path);
  const request = new Request(url, { credentials: "same-origin", cache: "reload" });
  const response = await fetch(request);
  if (!await store(cache, request, response)) {
    throw new Error("Unable to precache required app shell asset: " + path);
  }
  return response;
}

function findAppAssets(html) {
  const assets = new Set();
  const tags = html.match(/<(?:script|link)\\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const isScript = /^<script/i.test(tag);
    const isCss = /^<link/i.test(tag) && /rel=["']stylesheet["']/i.test(tag);
    if (!isScript && !isCss) continue;
    const attr = isScript ? "src" : "href";
    const match = tag.match(new RegExp(attr + "=[\\"']([^\\"']+)[\\"']", "i"));
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
    const homeUrl = absolute("/");
    const homeRequest = new Request(homeUrl, { credentials: "same-origin", cache: "reload" });
    const homeResponse = await fetch(homeRequest);
    if (!await store(cache, homeRequest, homeResponse)) {
      throw new Error("Homepage could not be cached; offline support is not ready.");
    }

    const html = await homeResponse.clone().text();
    const assets = findAppAssets(html);
    await Promise.all(APP_SHELL.filter((path) => path !== "/").map((path) => precacheAsset(cache, path)));
    await Promise.all(assets.map(async (url) => {
      const request = new Request(url, { credentials: "same-origin", cache: "reload" });
      try {
        const response = await fetch(request);
        await store(cache, request, response);
      } catch (error) {
        console.warn("[Pilot Exam PWA] Could not precache asset:", url, error);
      }
    }));
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
          || new Response("離線快取尚未準備完成。請先連線開啟引水人備考網站一次，再重新嘗試。", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
          });
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

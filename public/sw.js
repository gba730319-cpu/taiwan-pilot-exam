const CACHE_NAME = "pilot-exam-offline-v6";
const APP_ROUTES = ["/", "/mock-exam"];
const APP_SHELL = ["/offline.html", "/manifest.webmanifest", "/icons/pilot-192.svg", "/icons/pilot-512.svg"];

function absolute(path) {
  return new URL(path, self.location.origin).href;
}

async function putResponse(cache, request, response) {
  if (!response || !response.ok || response.type === "opaque") {
    throw new Error("Offline cache failed: " + request.url);
  }
  await cache.put(request, response.clone());
}

function findAppAssets(html) {
  const assets = new Set();
  const tags = html.match(/<(?:script|link)\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const isScript = /^<script/i.test(tag);
    const isAssetLink = /^<link/i.test(tag) &&
      /(stylesheet|modulepreload|preload)/i.test(tag);
    if (!isScript && !isAssetLink) continue;
    const match = tag.match(isScript
      ? /\bsrc=["']([^"']+)["']/i
      : /\bhref=["']([^"']+)["']/i);
    if (!match) continue;
    try {
      const url = new URL(match[1], self.location.origin);
      if (url.origin !== self.location.origin) continue;
      if (url.pathname.startsWith("/_next/")) assets.add(url.href);
    } catch (_) {}
  }
  return [...assets];
}

async function cacheAsset(cache, url) {
  const request = new Request(url, {
    method: "GET",
    credentials: "same-origin",
    cache: "reload"
  });
  const response = await fetch(request);
  await putResponse(cache, request, response);
}

async function cacheRoute(cache, path) {
  const request = new Request(absolute(path), {
    method: "GET",
    credentials: "same-origin",
    cache: "reload"
  });
  const response = await fetch(request);
  if (!response.ok) throw new Error("Offline page cache failed: " + path);
  const html = await response.clone().text();
  await putResponse(cache, request, response);

  const assets = findAppAssets(html);
  // Do not activate an incomplete offline version: every script/style asset
  // referenced by each app route must be available in the cache.
  await Promise.all(assets.map((url) => cacheAsset(cache, url)));
  return { path, assets: assets.length };
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const path of APP_SHELL) {
      const request = new Request(absolute(path), {
        credentials: "same-origin",
        cache: "reload"
      });
      const response = await fetch(request);
      await putResponse(cache, request, response);
    }
    const results = [];
    for (const path of APP_ROUTES) {
      results.push(await cacheRoute(cache, path));
    }
    console.info("[Pilot Exam PWA] Complete offline app shell cached", results);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith("pilot-exam-offline-") && key !== CACHE_NAME)
      .map((key) => caches.delete(key)));
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
      const cache = await caches.open(CACHE_NAME);
      const cachedPage = (await cache.match(request, { ignoreSearch: true }))
        || (await cache.match(absolute(url.pathname)))
        || (await cache.match(absolute("/")));

      // iOS standalone mode can leave a network navigation pending for a long
      // time while offline. Bound the wait, then serve the local app shell.
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      try {
        const response = await fetch(request, { signal: controller.signal });
        if (response.ok) {
          await cache.put(request, response.clone());
          await cache.put(absolute(url.pathname), response.clone());
        }
        return response;
      } catch (_) {
        return cachedPage
          || (await cache.match(absolute("/offline.html")))
          || new Response("離線版本尚未完整快取。請先連網開啟網站並等待快取完成。", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
          });
      } finally {
        clearTimeout(timeout);
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
      if (response.ok && (response.type === "basic" || response.type === "cors")) {
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) {
      return new Response("", { status: 503, statusText: "Offline" });
    }
  })());
});

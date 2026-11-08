"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const reloadKey = "pilot-exam-sw-controller-reload";
    // Clear the one-shot marker after the controller-triggered reload.
    // This also allows a later service-worker update to refresh the page.
    if (window.sessionStorage.getItem(reloadKey) === "1") {
      window.sessionStorage.removeItem(reloadKey);
    }

    const onControllerChange = () => {
      // The first controller takes over an already-rendered page. Reload once
      // so its Next.js chunks and other same-origin assets are fetched through
      // the service worker and become available to the offline cache.
      if (window.sessionStorage.getItem(reloadKey) === "1") return;
      window.sessionStorage.setItem(reloadKey, "1");
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch((error) => {
        console.error("PWA service worker registration failed:", error);
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => {
      window.removeEventListener("load", register);
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  return null;
}

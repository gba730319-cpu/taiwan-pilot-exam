"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const reloadKey = "pilot-exam-sw-controller-reload";
    const safeGet = () => {
      try { return window.sessionStorage.getItem(reloadKey); } catch (_) { return null; }
    };
    const safeSet = (value: string) => {
      try { window.sessionStorage.setItem(reloadKey, value); } catch (_) {}
    };
    const safeRemove = () => {
      try { window.sessionStorage.removeItem(reloadKey); } catch (_) {}
    };

    if (safeGet() === "1") safeRemove();

    const onControllerChange = () => {
      if (safeGet() === "1") return;
      safeSet("1");
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch((error) => {
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

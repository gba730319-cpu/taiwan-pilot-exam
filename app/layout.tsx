import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaRegister from "../components/pwa-register";

export const metadata: Metadata = {
  title: "引水人備考題庫｜台灣引水人考試",
  description: "台灣引水人考試歷屆題庫整理平台，以高雄港為主要港區。",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "引水人備考" },
  applicationName: "引水人備考學院",
  icons: {
    icon: [{ url: "/icons/pilot-192.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/pilot-192.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#10263b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body><PwaRegister />{children}</body></html>;
}

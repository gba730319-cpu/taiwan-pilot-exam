import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "引水人備考題庫｜台灣引水人考試", description: "台灣引水人考試歷屆題庫整理平台，以高雄港為主要港區。" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-Hant"><body>{children}</body></html>; }
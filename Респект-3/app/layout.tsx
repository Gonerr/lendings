import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Респект-4 — охрана и обслуживание объектов",
  description:
    "Физическая охрана жилых комплексов, строительных объектов и складов в Санкт-Петербурге. Администраторы, консьержи и аудит безопасности.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}

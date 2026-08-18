import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Респект-5 — охрана и обслуживание объектов",
  description:
    "ООО «Респект-5»: круглосуточное присутствие персонала, консьерж-сервис и административное сопровождение объектов в Санкт-Петербурге.",
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

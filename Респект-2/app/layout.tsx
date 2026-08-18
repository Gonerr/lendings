import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Респект-2 — частная охранная организация",
  description:
    "Физическая охрана жилых комплексов, дворов, парковок и строительных объектов в Санкт-Петербурге.",
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

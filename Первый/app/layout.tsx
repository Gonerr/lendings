import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Первый — управление пространствами",
  description:
    "ООО «Первый» — участник ЖСК и управляющая компания фуд-кортной зоны в Санкт-Петербурге.",
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

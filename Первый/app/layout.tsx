import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Первый — фуд-холл «Аллея вкусов»",
  description:
    "ООО «Первый» — управление фуд-холлом «Аллея вкусов» в Парк Молле, Санкт-Петербург.",
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

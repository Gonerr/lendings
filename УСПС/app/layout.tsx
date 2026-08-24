import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "ООО «УСПС» — официальная информация",
  description:
    "Официальная информационная страница ООО «Управление сопровождения проектов строительства»: сведения об организации, участие в ЖСК, памятки, реквизиты и контакты.",
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

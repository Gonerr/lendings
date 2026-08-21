import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://respekt-4-security.lihachka3.chatgpt.site"),
  title: "ООО «Респект-4» — контроль доступа и охрана объектов",
  description:
    "Контроль доступа на объекты строительства и в офисы Л1, организация постов охраны и пропускного режима в Санкт-Петербурге.",
  openGraph: {
    title: "ООО «Респект-4»",
    description: "Контроль доступа. Порядок на объекте.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ООО «Респект-4» — контроль доступа" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ООО «Респект-4»",
    description: "Контроль доступа. Порядок на объекте.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

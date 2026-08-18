import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ООО «МАК» — физкультурно-оздоровительный комплекс",
  description:
    "ООО «МАК» — физкультурно-оздоровительная деятельность в Санкт-Петербурге. Контакты, адрес и сведения о компании.",
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

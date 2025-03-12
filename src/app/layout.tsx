import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kibewall - Anime Wallpaper Gallery",
  description: "Browse and download high-quality anime wallpapers",
  icons: {
    icon: [
      { url: "/icon.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/icon.jpg", sizes: "16x16", type: "image/jpeg" }
    ],
    shortcut: [{ url: "/icon.jpg" }],
    apple: [{ url: "/icon.jpg" }],
    other: [
      {
        rel: "apple-touch-icon",
        url: "/icon.jpg",
        sizes: "180x180"
      }
    ],
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/jpeg" href="/icon.jpg" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

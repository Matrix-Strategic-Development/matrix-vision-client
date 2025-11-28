import type { Metadata } from "next";
import { Mulish, Poppins } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Matrix Vision | Анализ видео с ИИ",
    template: "%s | Matrix Vision"
  },
  description: "Умный анализ видео для заводов. Обнаружение людей, отслеживание действий и контроль безопасности с помощью ИИ.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.variable} ${poppins.variable} font-sans antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
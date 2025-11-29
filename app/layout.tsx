import type { Metadata } from "next";
import { Mulish, Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { VideoProvider } from "@/contexts/video-context";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Matrix Vision | AI-система мониторинга завода",
    template: "%s | Matrix Vision"
  },
  description: "Умная система анализа видео для производств. AI-распознавание людей, действий и мониторинг безопасности в промышленных условиях.",
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
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${mulish.variable} ${rubik.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <VideoProvider>
            {children}
            <Toaster />
          </VideoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
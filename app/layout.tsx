import type { Metadata } from "next";
import { Mulish, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
    default: "Matrix Vision | AI-Powered Factory Monitoring",
    template: "%s | Matrix Vision"
  },
  description: "Smart video analysis system for factories. AI-powered person detection, action recognition, and safety monitoring for industrial environments.",
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
        <Toaster />
      </body>
    </html>
  );
}
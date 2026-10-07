import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { monaSans } from "./fonts/monaSans";
import SmoothScroll from "./components/SmoothScroll";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ashraf Dalal — Full Stack Developer",
  description:
    "Full Stack Developer building React.js, Node.js, Express.js, PostgreSQL and MongoDB applications. Based in Mumbai, India.",
  applicationName: "Ashraf Dalal",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "full stack developer",
    "react developer",
    "node.js",
    "express.js",
    "mongodb",
    "postgresql",
    "portfolio",
    "Mumbai",
    "India",
  ],
  colorScheme: "dark",
  openGraph: {
    title: "Ashraf Dalal — Full Stack Developer",
    description:
      "Full Stack Developer building React.js, Node.js, Express.js, PostgreSQL and MongoDB applications.",
    siteName: "Ashraf Dalal",
    locale: "en-US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ashraf Dalal — Full Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashraf Dalal — Full Stack Developer",
    description:
      "Full Stack Developer building React.js, Node.js, Express.js, PostgreSQL and MongoDB applications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${monaSans.className} bg-[#0b0b0b] text-white antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

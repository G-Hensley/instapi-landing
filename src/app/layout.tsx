import type { Metadata } from "next";
import { Orbitron, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://instapi.app"),
  title: {
    default: "InstAPI - Ship backends in minutes, not days",
    template: "%s | InstAPI",
  },
  description:
    "Generate secure, production-ready backends in minutes. Design visually, export tested code with authentication, validation, and documentation. You own it, you ship it.",
  keywords: [
    "API generator",
    "backend generator",
    "code generator",
    "Node.js",
    "Express",
    "Python",
    "FastAPI",
    "REST API",
    "secure backend",
    "production-ready",
    "backend as a service",
    "API builder",
    "no-code backend",
    "low-code API",
  ],
  authors: [{ name: "InstAPI" }],
  creator: "InstAPI",
  publisher: "InstAPI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "InstAPI - Ship backends in minutes, not days",
    description:
      "Generate secure, production-ready backends in minutes. Design visually, export tested code. You own it, you ship it.",
    url: "https://instapi.app",
    siteName: "InstAPI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/instapi-screenshot.png",
        width: 1200,
        height: 630,
        alt: "InstAPI - Ship backends in minutes, not days",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InstAPI - Ship backends in minutes, not days",
    description:
      "Generate secure, production-ready backends in minutes. Design visually, export tested code. You own it, you ship it.",
    images: ["/instapi-screenshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${orbitron.variable} ${ibmPlexMono.variable}`}
    >
      <body className={`antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

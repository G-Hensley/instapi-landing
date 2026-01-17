import type { Metadata } from "next";
import { Orbitron, IBM_Plex_Mono } from "next/font/google";
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
  title: "InstAPI - Ship backends in minutes, not days",
  description:
    "Generate secure, production-ready backends in minutes. Design visually, export tested code with authentication, validation, and documentation. You own it, you ship it.",
  keywords: [
    "API generator",
    "backend generator",
    "code generator",
    "Node.js",
    "Express",
    "REST API",
    "secure backend",
    "production-ready",
  ],
  authors: [{ name: "InstAPI" }],
  openGraph: {
    title: "InstAPI - Ship backends in minutes, not days",
    description:
      "Generate secure, production-ready backends in minutes. Design visually, export tested code. You own it, you ship it.",
    url: "https://instapi.app",
    siteName: "InstAPI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstAPI - Ship backends in minutes, not days",
    description:
      "Generate secure, production-ready backends in minutes. Design visually, export tested code. You own it, you ship it.",
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
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

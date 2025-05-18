import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import {
  Karla as FontKarla,
  Poppins as FontPoppins,
  Inconsolata as FontInconsolata,
} from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const fontKarla = FontKarla({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-karla",
});

const fontPoppins = FontPoppins({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const fontInconsolata = FontInconsolata({
  weight: ["500", "900"],
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export const viewport: Viewport = {
  themeColor: "#2B7FFF",
};

export const metadata: Metadata = {
  title: "Scheduling made easier.",
  description: "The scheduling system your apps can depend on",
  keywords: [
    "scheduling system",
    "task automation",
    "Schedify",
    "workflow management",
    "calendar API",
    "task scheduler",
    "event automation",
  ],
  openGraph: {
    siteName: "Schedify",
    title: "Scheduling made easier.",
    description: "The scheduling system your apps can depend on",
    images: [
      {
        url: "https://schedify.dev/schedify.png",
        width: 200,
        height: 200,
        alt: "Schedify Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Scheduling made easier.",
    description: "The scheduling system your apps can depend on",
    images: ["https://schedify.dev/schedify.png"],
  },
  icons: [
    {
      sizes: "any",
      url: "/favicon-32x32.png",
      type: "image/png",
      rel: "icon",
    },
    {
      sizes: "32x32",
      url: "/favicon-32x32.png",
      type: "image/png",
      rel: "icon",
    },
    {
      sizes: "16x16",
      url: "/favicon-16x16.png",
      type: "image/png",
      rel: "icon",
    },
    {
      sizes: "180x180",
      url: "/apple-touch-icon.png",
      type: "image/png",
      rel: "apple-touch-icon",
    },
  ],
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  authors: {
    name: "Samir Kumar Gupta",
    url: "https://ksamir.dev",
  },
};

import ProgressBarProvider from "@/components/ProgressBarProvider";
import QueryProvider from "./query-provider";
import ChatwootWidget from "@/components/ChatwootWidget";

export default function RootLayout({
  children,
  header,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${fontKarla.variable} ${fontPoppins.variable} ${fontInconsolata.variable} antialiased bg-background hero-gradient bg-no-repeat min-h-screen`}
          >
            <ProgressBarProvider>
              {header}
              {children}
              <Toaster />
              <ChatwootWidget />
            </ProgressBarProvider>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}

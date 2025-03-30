import type { Metadata } from "next";
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
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const fontInconsolata = FontInconsolata({
  weight: ["500", "900"],
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  title: "Scheduling made easier.",
  description: "The scheduling system your apps can depend on",
  openGraph: {
    title: "Scheduling made easier.",
    description: "The scheduling system your apps can depend on",
    images: [
      {
        url: "https://schedify.dev/schedify.png",
        width: 1200,
        height: 630,
        alt: "Schedify Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scheduling made easier.",
    description: "The scheduling system your apps can depend on",
    images: ["https://schedify.dev/schedify.png"],
  },
};

// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/theme-xcode";

import ProgressBarProvider from "./components/ProgressBarProvider";
import QueryProvider from "./query-provider";

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
            className={`${geistSans.variable} ${geistMono.variable} ${fontKarla.variable} ${fontPoppins.variable} ${fontInconsolata.variable} antialiased bg-background`}
          >
            <ProgressBarProvider>
              {header}
              {children}
              <Toaster />
            </ProgressBarProvider>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}

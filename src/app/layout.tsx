import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "./components/Header";
import React from "react";
import { Karla as FontKarla, Poppins as FontPoppins } from "next/font/google";
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
export const metadata: Metadata = {
  title: "Automate Your System. Schedule Them with Ease.",
  description:
    "Effortlessly schedule and send webhooks at the perfect time—secure, reliable, and automated.",
  icons: [
    {
      url: "/favicon.svg",
    },
  ],
};
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/theme-xcode";

import ProgressBarProvider from "./components/ProgressBarProvider";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${fontKarla.variable} ${fontPoppins.variable} antialiased bg-background`}
        >
          <ProgressBarProvider>
            <Header />
            {children}
            {modal}
            <Toaster />
          </ProgressBarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

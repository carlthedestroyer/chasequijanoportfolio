import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Berta Medical",
  description: "The home page of Berta Medical.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics/>
        <SpeedInsights/>
        {/* <SessionProvider> */}
        {children}
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}

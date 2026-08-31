import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Find Your Local Representatives & Government Officials | Public Directory",
  description:
    "Search by Division, District, Upazila, and Union to access verified contact information for your local elected representatives and government administrative officials.",
  openGraph: {
    title: "Public Representatives & Government Officials Directory",
    description:
      "Search by Division, District, Upazila, and Union to access verified contact information.",
  },
};

export const viewport: Viewport = {
  themeColor: "#008751",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#eef6f2] text-slate-900 selection:bg-emerald-600/20 selection:text-emerald-900">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

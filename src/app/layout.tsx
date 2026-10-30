import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pyro Prestige — Premium Pyrotechnics Display Planner",
  description:
    "A curated catalog of premium display shells, cake assortments and salute systems ranked by visual impact, safety specs and budget tier. Plan high-budget fireworks displays on mobile and desktop.",
  keywords: [
    "pyrotechnics",
    "display shells",
    "fireworks display",
    "cake assortments",
    "firecrackers",
    "NFPA 1123",
    "budget planner",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Pyro Prestige — Premium Pyrotechnics Display Planner",
    description:
      "Curated premium fireworks catalog with impact ratings, safety specs and a budget planner.",
    siteName: "Pyro Prestige",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

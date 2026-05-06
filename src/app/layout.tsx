import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClerkProvider } from "@/components/ClerkProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dzaleka Business - Marketplace for Events & Products",
  description: "Your premier marketplace for event tickets and unique products. Discover, connect, and transact with ease.",
  keywords: ["marketplace", "events", "tickets", "shopping", "dzaleka"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#0f0f23]">
        <ClerkProvider>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
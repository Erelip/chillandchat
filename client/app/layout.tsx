import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chillandchat",
  description: "Simple app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background h-screen max-[450px]:h-[calc(100dvh-var(--spacing-nav))]">
        <div className="flex w-full h-screen max-[450px]:h-[calc(100dvh-var(--spacing-nav))]">
          <Navbar />

          <main className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

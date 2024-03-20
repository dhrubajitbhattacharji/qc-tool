import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video QC Tool",
  description: "Video Qc Tool for Kriyam.ai/ ***for internal use only***",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
        {children}
        </main>
        <Toaster className="" />
        </body>
    </html>
  );
}

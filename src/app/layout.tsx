import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata  = {
  title:'Task Manger Aap',
  description:'Task manger app is the best way to organize your day'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
        className={cn(
          " flex  bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <Toaster />
      {children}
      </body>
    </html>
  );
}

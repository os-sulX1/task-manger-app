import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SideNav from "@/components/SideNav";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          " bg-background font-sans antialiased  h-full",
          fontSans.variable
        )}
      >
        <main className="w-full min-h-full bg-white  ">
          <div className="flex w-full h-full ">
            <div className="">
              <Toaster/>
              <SideNav />
            </div>
           {children}
          </div>
        </main>
      </body>
    </html>
  );
}
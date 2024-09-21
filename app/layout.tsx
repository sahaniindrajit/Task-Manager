import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RecoilProvider from '@/components/RecoilProvider';
import { Analytics } from "@vercel/analytics/react"

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

export const metadata: Metadata = {
  title: "ManageFiasco",
  description: "Manage your task easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecoilProvider>
          {children}
          <Analytics />
        </RecoilProvider>

      </body>
    </html>



  );
}

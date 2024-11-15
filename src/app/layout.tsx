import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

const kanitFont = localFont({
  src: "/fonts/Kanit-Regular.ttf", // Assuming it's in the public/fonts directory
  variable: "--font-kanit",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanitFont.variable} antialiased relative`}
      >
        <div className="fixed inset-0 w-full h-full bg-[url('/galaxy-bg.webp')] bg-cover bg-center bg-no-repeat" style={{ zIndex: -2 }} />
        {children}
      </body>
    </html>
  );
}

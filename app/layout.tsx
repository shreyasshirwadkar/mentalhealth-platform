import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Link from "next/link";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mental Health Platform",
  description: "By Shreyas Shirwadkar",
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
        <div className="shadow-md border-b-2 p-4 flex justify-end">
          <div className="flex gap-3 mr-5">
            <Link className="flex flex-col justify-center text-xl" href={"/"}>
              Home |
            </Link>
            <Link className="flex flex-col justify-center text-xl" href={"/chatbot"}>
              Chatbot |
            </Link>
            <Link className="flex flex-col justify-center text-xl" href={"/therapists"}>
              Therapists |
            </Link>
            <Link className="flex flex-col justify-center text-xl" href={"/mood"}>
              Mood Tracking |
            </Link>
            <Link className="flex flex-col justify-center text-xl" href={"/survey"}>
              Survey 
            </Link>
          </div>
          <div className="flex gap-2">
            <Link
              className="bg-black text-white py-2 px-4 rounded-md text-xl"
              href={"/auth/login"}
            >
              Login
            </Link>

       
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}

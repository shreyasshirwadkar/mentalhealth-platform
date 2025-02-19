import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

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
        <div className="lg:hidden p-5 ">
          <div className="">
            <Link href="/" className="">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9.5l9-7 9 7M4 10v10a1 1 0 001 1h5m5 0h5a1 1 0 001-1V10M9 21V14h6v7"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="hidden  shadow-md border-b-2 p-5 lg:flex justify-between">
          <div className="flex flex-col justify-center text-2xl font-bold">
            <Link href={"/"}>Mental Health Platform</Link>
          </div>
          <div className="flex">
            <div className="flex gap-3 mr-5">
              <Link
                className="flex flex-col justify-center text-xl"
                href={"/chatbot"}
              >
                Chatbot |
              </Link>
              <Link
                className="flex flex-col justify-center text-xl"
                href={"/therapists"}
              >
                Therapists |
              </Link>
              <Link
                className="flex flex-col justify-center text-xl"
                href={"/mood"}
              >
                Mood Tracking |
              </Link>
              <Link
                className="flex flex-col justify-center text-xl"
                href={"/survey"}
              >
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
        </div>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}

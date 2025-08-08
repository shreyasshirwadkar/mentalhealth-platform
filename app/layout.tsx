import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";

import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50`}
      >
        {/* Mobile Navbar */}
        <div className="lg:hidden p-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md rounded-b-2xl">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-white"
          >
            <svg
              className="w-6 h-6 text-teal-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9.5l9-7 9 7M4 10v10a1 1 0 001 1h5m5 0h5a1 1 0 001-1V10M9 21V14h6v7"
              />
            </svg>
            Mental Health
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md rounded-b-2xl border-b border-gray-700">
          <Link
            href="/"
            className="text-2xl font-extrabold text-white hover:text-blue-200 transition-colors"
          >
            Mental Health Platform
          </Link>

          <div className="flex items-center gap-6">
            {[
              { name: "Chatbot", href: "/chatbot" },
              { name: "Therapists", href: "/therapists" },
              { name: "Mood Tracking", href: "/mood" },
              { name: "Survey", href: "/survey" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-lg text-gray-300 hover:text-blue-200 transition-colors
                           after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 
                           after:bg-blue-200 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/auth/login"
              className="bg-blue-200 text-black font-bold py-2 px-5 rounded-full shadow-sm hover:brightness-110 transition duration-150"
            >
              Login
            </Link>
          </div>
        </div>

        <Suspense fallback={<div className="p-10 text-center text-gray-700">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}

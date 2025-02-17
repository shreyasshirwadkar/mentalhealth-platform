"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default function MoodLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header for Mood tracking page */}
        <div className="bg-blue-600 text-white py-4 px-6">
          <h1 className="text-3xl font-bold">Mood Tracking</h1>
        </div>

        {/* Content of Mood tracking */}
        <main className="flex-grow p-4">{children}</main>

        {/* Footer or Navigation */}
        <div className="bg-gray-800 text-white py-2 px-6">
          <Link href="/" className="text-white">
            Back to Home
          </Link>
        </div>
      </div>
    </SessionProvider>
  );
}

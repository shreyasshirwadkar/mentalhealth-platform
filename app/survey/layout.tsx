"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function SurveyLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="bg-black text-white py-4 px-6">
          <h1 className="text-3xl font-bold">Survey</h1>
        </div>

        <main className="flex-grow p-4">{children}</main>
      </div>
    </SessionProvider>
  );
}

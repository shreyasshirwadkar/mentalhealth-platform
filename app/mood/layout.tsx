"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function MoodLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex flex-col bg-gray-100  md:h-[88vh]">
        <div className="bg-black text-white py-4 px-6">
          <h1 className="text-3xl font-bold">Mood Tracking</h1>
        </div>

        <main className=" p-4 ">{children}</main>
      </div>
    </SessionProvider>
  );
}

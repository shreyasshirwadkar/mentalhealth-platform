"use client";
import Link from "next/link";
import Image from "next/image";

type ButtonProps = {
  path: string;
  title: string;
};

function ButtonComp({ path, title }: ButtonProps) {
  return (
    <Link
      href={path}
      className="bg-black text-white font-semibold py-3 px-6 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out"
    >
      {title}
    </Link>
  );
}

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-3xl text-center">
        <Image
          src="/panda.webp"
          alt="Panda"
          width={200}
          height={200}
          className="rounded-full shadow-lg border-4 border-white"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-6 mb-4">
          Mental Health Platform
        </h1>
        <p className="text-gray-600 max-w-md mb-8">
          Your safe space for emotional well-being. Connect with therapists,
          track your mood, chat with AI, and take guided surveys.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <ButtonComp path="/chatbot" title="💬 Chatbot" />
          <ButtonComp path="/therapists" title="🧑‍⚕️ Therapists" />
          <ButtonComp path="/mood" title="📊 Mood Tracking" />
          <ButtonComp path="/survey" title="📝 Survey" />
        </div>
      </div>
    </div>
  );
}

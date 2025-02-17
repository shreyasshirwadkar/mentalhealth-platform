"use client";
import Link from "next/link";
type ButtonProps = {
  path: string;
  title: string;
};

export function ButtonComp({ path, title }: ButtonProps) {
  return (
    <Link className="bg-black py-2 px-4 text-white font-bold rounded-xl" href={path}>
      {title}
    </Link>
  );
}
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Mental Health Platform</h1>

      <div className=" flex gap-10">
        <ButtonComp path="/chatbot" title="Chatbot" />
        <ButtonComp path="/therapists" title="Therapists" />
        <ButtonComp path="/mood" title="Mood Tracking" />
        <ButtonComp path="/survey" title="Survey" />
      </div>
    </div>
  );
}

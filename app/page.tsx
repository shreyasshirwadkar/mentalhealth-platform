"use client";
import Link from "next/link";
import Image from "next/image";
type ButtonProps = {
  path: string;
  title: string;
};
export function ButtonComp({ path, title }: ButtonProps) {
  return (
    <Link
      className="bg-black py-2 px-4 text-white font-bold rounded-xl"
      href={path}
    >
      {title}
    </Link>
  );
}
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center   h-screen  bg-gray-100">
      <Image
        src={"/panda.webp"}
        alt="Panda"
        width={250}
        height={250}
        className="rounded-md"
      />
      <h1 className="text-4xl font-bold mb-8 mt-2">Mental Health Platform</h1>

      <div className="flex flex-col md:flex-row md:gap-10 gap-5">
        <ButtonComp path="/chatbot" title="Chatbot" />
        <ButtonComp path="/therapists" title="Therapists" />
        <ButtonComp path="/mood" title="Mood Tracking" />
        <ButtonComp path="/survey" title="Survey" />
      </div>
    </div>
  );
}

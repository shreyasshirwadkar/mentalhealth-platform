"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) router.push("/");
    else alert("Invalid credentials");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="shadow-md border-2 flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl font-bold">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col mt-4">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 p-2 m-2 text-xl"
          />
          <input
            placeholder="Password"
            className="border-2 p-2 m-2 text-xl"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-black text-white text-lg font-bold py-2 px-4 rounded-md mt-4"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex p-4 gap-2 ">
          <div>Don't have an account? </div>
          <Link href="/auth/register" className="text-gray-500 underline ">Register here</Link>
        </div>
      </div>
    </div>
  );
}

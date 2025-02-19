"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import z from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (data.user) {
      router.push("/auth/login");
    } else {
      alert("Error registering user");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="shadow-md border-2 flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl font-bold">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col mt-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 p-2 m-2 text-xl"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 p-2 m-2 text-xl"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 p-2 m-2 text-xl"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <button
            className="bg-black text-white text-lg font-bold py-2 px-4 rounded-md mt-4"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="flex gap-2 p-2">
          <div>Already have an account?</div>
          <Link className="underline text-gray-500" href="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

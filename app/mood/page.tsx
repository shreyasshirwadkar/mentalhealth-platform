"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Mood() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mood, setMood] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  const handleSubmit = async () => {
    if (session) {
      await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: session.user.id, mood }),
      });
      alert("Mood Recorded");
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>How do you feel today?</h1>
      <input
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Your mood..."
      />
      <button onClick={handleSubmit}>Submit Mood</button>
    </div>
  );
}

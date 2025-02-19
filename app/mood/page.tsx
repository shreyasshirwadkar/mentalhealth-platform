"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MoodButtons from "@/components/MoodButtons";
import MoodChart from "@/components/MoodChart";

interface MoodEntry {
  timestamp: string;
  mood: string;
}

export default function Mood() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mood, setMood] = useState<string>("Happiest");
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Please login first");
      router.push("/auth/login");
    }
  }, [status, router]);

  const fetchMoodHistory = useCallback(async () => {
    if (session) {
      try {
        const response = await fetch("/api/mood/");
        const data: { created_at: string; mood: string }[] =
          await response.json();

        const formattedData: MoodEntry[] = data.map((entry) => ({
          timestamp: entry.created_at,
          mood: entry.mood,
        }));

        setMoodHistory(formattedData);
      } catch (error) {
        console.error("Error fetching mood history:", error);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchMoodHistory();
  }, [fetchMoodHistory]);

  const handleSubmit = async () => {
    if (session) {
      try {
        const response = await fetch("/api/mood", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: session.user?.id, mood }),
        });
        const result: { message?: string; error?: string } =
          await response.json();
        if (response.ok) {
          alert(result.message || "Mood Recorded");
          fetchMoodHistory(); // Ensure latest history is fetched
        } else {
          alert(result.error || "Error recording mood");
        }
      } catch (error) {
        alert("Error submitting mood");
        console.error(error);
      }
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-end md:gap-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-center">
            How are you
            <br />
            feeling today?
          </h1>
          <MoodButtons setMood={setMood} />
          <div className="text-2xl font-bold">You are {mood}</div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Submit Mood
          </button>
        </div>
        <div className="text-4xl font-bold mt-10">
          History:
          <MoodChart moodHistory={moodHistory} />
        </div>
      </div>
    </div>
  );
}

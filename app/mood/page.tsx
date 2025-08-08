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
        const data: { created_at: string; mood: string }[] = await response.json();

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
        const result: { message?: string; error?: string } = await response.json();
        if (response.ok) {
          alert(result.message || "Mood Recorded");
          fetchMoodHistory();
        } else {
          alert(result.error || "Error recording mood");
        }
      } catch (error) {
        alert("Error submitting mood");
        console.error(error);
      }
    }
  };

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-white/30">
        <div className="flex flex-col md:flex-row justify-between md:gap-20">
          {/* Mood Picker Section */}
          <div className="flex flex-col justify-center items-center w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-950 text-center mb-6">
              How are you feeling today?
            </h1>
            <MoodButtons setMood={setMood} />
            <div className="text-2xl font-semibold text-gray-700 mt-4">
              You are <span className="text-blue-600">{mood}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-8 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Submit Mood
            </button>
          </div>

          {/* Mood History Section */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">Mood History</h2>
            <MoodChart moodHistory={moodHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

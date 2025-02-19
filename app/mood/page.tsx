"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MoodButtons from "@/components/MoodButtons";
import MoodChart from "@/components/MoodChart"; // Import the MoodChart component

export default function Mood() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mood, setMood] = useState("Happiest");
  const [moodHistory, setMoodHistory] = useState<any[]>([]); // Store mood history

  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Please login first");
      router.push("/auth/login");
    }
  }, [status, router]);

  // Fetch mood history from the API
  const fetchMoodHistory = async () => {
    if (session) {
      try {
        const response = await fetch("/api/mood/");
        const data = await response.json();

        // Map API response to correct format
        const formattedData = data.map((entry: any) => ({
          timestamp: entry.created_at,
          mood: entry.mood,
        }));

        setMoodHistory(formattedData);
      } catch (error) {
        console.error("Error fetching mood history:", error);
      }
    }
  };

  useEffect(() => {
    fetchMoodHistory();
  }, [session]);

  // Handle mood submission
  const handleSubmit = async () => {
    if (session) {
      try {
        const response = await fetch("/api/mood", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: session.user.id, mood }),
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message || "Mood Recorded");
          fetchMoodHistory(); // Refetch the mood history after submission
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
    <div className=" flex flex-col items-center ">
      <div className="flex flex-col md:flex-row justify-end md:gap-20 ">
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
          <MoodChart moodHistory={moodHistory} />{" "}
        </div>
      </div>
    </div>
  );
}

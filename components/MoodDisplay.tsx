"use client";
import { useState } from "react";
import MoodChart from "@/components/MoodChart";

interface MoodDisplayProps {
  initialMoodHistory: { timestamp: string; mood: string }[];
}

const MoodDisplay: React.FC<MoodDisplayProps> = ({ initialMoodHistory }) => {
  const [moodHistory] = useState(initialMoodHistory);

  return (
    <div className="text-4xl font-bold mt-10">
      History:
      <MoodChart moodHistory={moodHistory} />
    </div>
  );
};

export default MoodDisplay;

"use client";
import { FC, useState } from "react";

interface MoodButtonsProps {
  setMood: (mood: string) => void;
}

const MoodButtons: FC<MoodButtonsProps> = ({ setMood }) => {
  const [selectedMood, setSelectedMood] = useState<string>("Happiest");

  const moods = [
    { emoji: "😄", value: "Happiest" },
    { emoji: "😊", value: "Very Happy" },
    { emoji: "🙂", value: "Happy" },
    { emoji: "😞", value: "Very Sad" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😡", value: "Angry" },
  ];

  const handleMoodClick = (mood: string) => {
    setMood(mood);
    setSelectedMood(mood);
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {moods.map((mood) => (
        <div
          key={mood.value}
          className={`shadow-md rounded-xl w-[25vw] h-[16vh] md:w-[8vw] md:h-[14vh] flex flex-col justify-center items-center cursor-pointer transition-all duration-200 ${
            selectedMood === mood.value
              ? "bg-blue-100 border-2 border-blue-400"
              : "bg-white hover:bg-blue-50"
          }`}
          onClick={() => handleMoodClick(mood.value)}
        >
          <div className="text-4xl">{mood.emoji}</div>
          <span className="mt-2 text-sm font-medium text-gray-700">{mood.value}</span>
        </div>
      ))}
    </div>
  );
};

export default MoodButtons;

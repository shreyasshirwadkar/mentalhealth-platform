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
    <div className="grid grid-cols-3 gap-9 p-4 m-4">
      {moods.map((mood) => (
        <div
          key={mood.value}
          className={`shadow-md rounded-xl w-[25vw] h-[16vh] md:w-[10vw] md:h-[18vh] flex flex-col justify-center items-center cursor-pointer ${
            selectedMood === mood.value ? "bg-[#f2dcf4]" : ""
          }`}
          onClick={() => handleMoodClick(mood.value)}
        >
          <div className="text-4xl ">{mood.emoji}</div>
        </div>
      ))}
    </div>
  );
};

export default MoodButtons;

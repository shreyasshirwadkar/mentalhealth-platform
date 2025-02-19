"use client";

import { useState } from "react";

type SurveyFormProps = {
  questions: { question: string }[];
  userId: string;
};

export default function SurveyForm({ questions, userId }: SurveyFormProps) {
  const [responses, setResponses] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState<number>(0);
  const [mentalHealthStatus, setMentalHealthStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const options = [
    { text: "Not at all", score: 0 },
    { text: "Several days", score: 1 },
    { text: "More than half the days", score: 2 },
    { text: "Nearly every day", score: 3 },
  ];

  const handleResponseChange = (questionIndex: number, answerIndex: number) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: options[answerIndex].score,
    }));
  };

  const calculateScore = () => {
    const totalScore = Object.values(responses).reduce(
      (acc, val) => acc + val,
      0
    );
    setScore(totalScore);

    let result = "";
    if (totalScore >= 20) result = "Severe Depression (Seek Professional Help)";
    else if (totalScore >= 15) result = "Moderately Severe Depression";
    else if (totalScore >= 10) result = "Moderate Depression";
    else if (totalScore >= 5) result = "Mild Depression";
    else result = "Minimal or No Depression";

    setMentalHealthStatus(result);
  };

  const handleSubmit = async () => {
    {
      console.log(`userId : ${userId}`);
    }

    if (Object.keys(responses).length !== questions.length) {
      setError("Please answer all the questions before submitting.");
      return;
    }
    setError("");

    calculateScore();

    await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        responses_score: score,
        result: mentalHealthStatus,
      }),
    });

    await window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <form>
        {questions.map((question, index) => (
          <div key={index} className="mb-4 shadow-xl p-4 rounded-xl w-[80vw] md:w-[45vw]">
            <p className="font-semibold text-xl">{question.question}</p>
            <div className="mt-2 text-lg">
              {options.map((option, optionIndex) => (
                <label key={optionIndex} className="block">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    onChange={() => handleResponseChange(index, optionIndex)}
                    className="mr-2"
                  />
                  {option.text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-4"
      >
        Submit Survey
      </button>

      {error && <div className="mt-4 text-red-500 text-wrap">{error}</div>}

      {mentalHealthStatus && (
        <div className="mt-6 p-4 border rounded-md h-full shadow-md w-[80vw] md:w-[26vw] border-4 border-gray-5 00">
          <h2 className="text-xl font-semibold">Your Mental Health Status:</h2>
          <p className="text-lg">{mentalHealthStatus}</p>
          <p className="text-gray-600">Overall Score: {score}</p>
        </div>
      )}
    </div>
  );
}

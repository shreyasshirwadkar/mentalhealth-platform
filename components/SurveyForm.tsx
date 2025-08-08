// components/SurveyForm.tsx
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
    const totalScore = Object.values(responses).reduce((acc, val) => acc + val, 0);
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
    if (Object.keys(responses).length !== questions.length) {
      setError("⚠️ Please answer all the questions before submitting.");
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

    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      {questions.map((question, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
        >
          <p className="font-semibold text-lg mb-4 text-blue-900">
            {index + 1}. {question.question}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((option, optionIndex) => {
              const selected = responses[index] === option.score;
              return (
                <button
                  type="button"
                  key={optionIndex}
                  onClick={() => handleResponseChange(index, optionIndex)}
                  className={`p-3 rounded-xl text-left border transition-all duration-200 ${
                    selected
                      ? "bg-blue-500 text-white border-blue-500 shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-blue-50 border-gray-300"
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-8 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        Submit Survey
      </button>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {mentalHealthStatus && (
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Your Mental Health Status
          </h2>
          <p className="text-lg text-gray-700 mb-1">{mentalHealthStatus}</p>
          <p className="text-gray-500">Overall Score: {score}</p>
        </div>
      )}
    </div>
  );
}

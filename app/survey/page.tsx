"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SurveyResponse = {
  [key: number]: number; // Key is the question index, value is the selected score (0-3)
};

export default function Survey() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [responses, setResponses] = useState<SurveyResponse>({});
  const [score, setScore] = useState<number>(0);
  const [mentalHealthStatus, setMentalHealthStatus] = useState<string>("");

  // DSM-5 / PHQ-9 Standard Questions
  const questions = [
    { question: "Little interest or pleasure in doing things?" },
    { question: "Feeling down, depressed, or hopeless?" },
    { question: "Trouble falling/staying asleep, or sleeping too much?" },
    { question: "Feeling tired or having little energy?" },
    { question: "Poor appetite or overeating?" },
    {
      question:
        "Feeling bad about yourself — or thinking you are a failure or have let yourself or your family down?",
    },
    {
      question:
        "Trouble concentrating on things, such as reading or watching TV?",
    },
    {
      question:
        "Moving or speaking so slowly that other people could have noticed? Or the opposite—being fidgety and restless?",
    },
    {
      question:
        "Thoughts that you would be better off dead, or thoughts of hurting yourself?",
    },
  ];

  const options = [
    { text: "Not at all", score: 0 },
    { text: "Several days", score: 1 },
    { text: "More than half the days", score: 2 },
    { text: "Nearly every day", score: 3 },
  ];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

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

    // DSM-5 Depression Severity Classification
    let result = "";
    if (totalScore >= 20) result = "Severe Depression (Seek Professional Help)";
    else if (totalScore >= 15) result = "Moderately Severe Depression";
    else if (totalScore >= 10) result = "Moderate Depression";
    else if (totalScore >= 5) result = "Mild Depression";
    else result = "Minimal or No Depression";

    setMentalHealthStatus(result);
  };

  const handleSubmit = async () => {
    calculateScore();

    await fetch("/api/survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: session?.user?.id, score }),
    });

    await window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-6 flex ">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-6">DSM-5 (PHQ-9) Questionnaire</h1>
        <form>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{question.question}</p>
              <div className="mt-2">
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
      </div>
      {mentalHealthStatus && (
        <div className="mt-6 p-4 border rounded-md h-full shadow-md">
          <h2 className="text-xl font-semibold">Your Mental Health Status:</h2>
          <p className="text-lg">{mentalHealthStatus}</p>
          <p className="text-gray-600">Overall Score: {score}</p>
        </div>
      )}
    </div>
  );
}

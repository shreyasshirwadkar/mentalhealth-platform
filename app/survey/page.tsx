import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SurveyForm from "@/components/SurveyForm";

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

export default async function SurveyPage() {
  const session = await getServerSession();
  if (!session) {
    alert("Please login first");
    redirect("/auth/login");
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">DSM-5 (PHQ-9) Questionnaire</h1>

      <SurveyForm questions={questions} userId={session.user.id} />
    </div>
  );
}

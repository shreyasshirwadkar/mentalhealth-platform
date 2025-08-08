// app/survey/page.tsx
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
    redirect("/auth/login");
  }

  return (
    <div className="overflow-y-auto min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-10 px-4 ">
      <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-8 text-center">
        DSM-5 (PHQ-9) Questionnaire
      </h1>

      <SurveyForm questions={questions} userId={session.user.id} />
    </div>
  );
}

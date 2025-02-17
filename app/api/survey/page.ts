// pages/api/survey.ts

import { NextRequest } from "next/server";

export default async function POST(req: NextRequest) {
  const { user_id, score } = await req.json();
  // Store the score in the database or process as needed
  // Example: await saveScoreToDatabase(user_id, score);

  Response.json({ message: "Survey Submitted Successfully" });
}

import client from "@/config/db";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { user_id, responses_score, result } = await req.json();

  try {
    const res = await client.query(
      "INSERT INTO survey_responses (user_id, responses_score, result) VALUES ($1, $2, $3)",
      [user_id, responses_score, result]
    );
    return Response.json({ message: "Survey Response recorded successfully" });
  } catch (error) {
    return Response.json({ error: "Error saving Response" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import client from "@/config/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { user_id, mood } = await req.json();
  try {
    await client.query("INSERT INTO moods (user_id, mood) VALUES ($1, $2)", [
      user_id,
      mood,
    ]);
    return Response.json({ message: "Mood recorded successfully" });
  } catch (err) {
    return Response.json({ error: "Error saving mood", err }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const moods = await client.query("SELECT * FROM moods ", []);
  return Response.json(moods.rows);
}

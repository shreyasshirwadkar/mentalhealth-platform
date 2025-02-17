import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import client from "@/config/db";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const res = await client.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, name]
    );
    return new Response(JSON.stringify({ user: res.rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }
}

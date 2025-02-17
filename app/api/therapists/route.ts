import { NextRequest } from "next/server";
import client from "@/config/db";

export async function GET(req: NextRequest) {
  const therapists = await client.query("SELECT * FROM therapists");
  return Response.json(therapists.rows);
}
    
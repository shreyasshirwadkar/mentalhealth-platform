import client from "@/config/db";

export async function GET() {
  const therapists = await client.query("SELECT * FROM therapists");
  return Response.json(therapists.rows);
}

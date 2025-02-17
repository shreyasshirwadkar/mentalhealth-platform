import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { message } = await req.json();
    const response = `You said: ${message}`;
    return Response.json({ response });
}

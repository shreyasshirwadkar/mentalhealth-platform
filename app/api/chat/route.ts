import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system:
        "You are a mental therapist. Your job is to provide comfort and solutions to patients." +
        " Think carefully before you answer.",
      messages,
    });

    console.log("Returning AI stream response...");
    const response = await result.toDataStreamResponse({
      getErrorMessage: (error: unknown) => {
        if (error == null) return "unknown error";
        if (typeof error === "string") return error;
        if (error instanceof Error) return error.message;
        return JSON.stringify(error);
      },
    });

    return new NextResponse(response.body, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error in API:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

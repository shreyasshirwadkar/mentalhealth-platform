import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system:
        "You are a mental therapist. Your job is to provide comfort and solutions to patients." +
        "Think Carefully before you answer.",
      messages,
    });

    console.log("Returning AI stream response...");

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error) {
    console.error("Error in API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

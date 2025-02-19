"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat",
    });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-msg",
          role: "assistant",
          content: "Hello! How can I help you today?",
        },
      ]);
    }
  }, [messages.length, setMessages]);

  return (
    <div className=" flex flex-col items-center  bg-blue-200 md:h-[88vh] h-[92vh]">
      <div
        ref={chatContainerRef}
        className="mt-5 w-[80vw] md:w-[38vw] p-4 space-y-4 overflow-y-auto  h-[71vh] md:h-[70vh] bg-white rounded-lg shadow-lg"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-center ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role !== "user" && (
              <div className="w-10 h-10 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-gray-500"
                >
                  <path d="M12 2a7 7 0 0 1 7 7v1a5 5 0 0 1 2 4v1H3v-1a5 5 0 0 1 2-4V9a7 7 0 0 1 7-7zM7 9v1h10V9a5 5 0 0 0-10 0zm10 3H7a3 3 0 0 0-3 3v1h16v-1a3 3 0 0 0-3-3z" />
                </svg>
              </div>
            )}
            <div
              className={`p-3 rounded-lg shadow-md max-w-xs ${
                m.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              {m.content}
            </div>
            {m.role === "user" && (
              <div className="w-10 h-10 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-blue-600"
                >
                  <path d="M12 2a7 7 0 0 1 7 7v1a5 5 0 0 1 2 4v1H3v-1a5 5 0 0 1 2-4V9a7 7 0 0 1 7-7zM7 9v1h10V9a5 5 0 0 0-10 0zm10 3H7a3 3 0 0 0-3 3v1h16v-1a3 3 0 0 0-3-3z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[80vw] md:w-[38vw] p-4 bg-white border-t border-gray-300 fixed bottom-4 rounded-lg shadow-lg"
      >
        <div className="flex items-center gap-2">
          <textarea
            className="flex-1 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:h-[6vh]"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

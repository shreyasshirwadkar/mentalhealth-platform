"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat({ api: "/api/chat" });

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
          content: "🌸 Hi there! How can I help you today?",
        },
      ]);
    }
  }, [messages.length, setMessages]);

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="flex flex-col w-full max-w-3xl h-full md:h-[80vh] bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30">
        
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-5 space-y-4 overflow-y-auto"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role !== "user" && (
                <div className="w-9 h-9 mr-2 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center rounded-full shadow">
                  💬
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl shadow-md max-w-[75%] text-sm md:text-base ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-br-none"
                    : "bg-gradient-to-br from-purple-100 to-pink-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="w-9 h-9 ml-2 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center rounded-full shadow">
                  🧑
                </div>
              )}
            </div>
          ))}

          {/* Three-dot loading animation */}
          {isLoading && (
            <div className="flex items-center justify-start space-x-1 ml-11">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white/80 backdrop-blur-lg border-t border-white/30"
        >
          <div className="flex items-center gap-2">
            <textarea
              className="flex-1 p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none text-sm md:text-base"
              rows={1}
              value={input}
              placeholder="Type your message..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-full shadow-md hover:scale-105 transition-transform duration-200"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

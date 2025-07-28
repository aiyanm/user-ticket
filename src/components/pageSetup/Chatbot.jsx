import React, { useState } from "react";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: "1", role: "assistant", content: "Hello! How can I help you today?" },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true); // new state

  const handleSend = async (customInput) => {
    const question = customInput || input;
    if (!question.trim()) return;

    if (customInput) {
      setShowSuggestions(false); // hide suggestions after click
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://vii-children-scared-pts.trycloudflare.com/chat/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      const botReply = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.answer || "No response from bot.",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      const errorReply = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, something went wrong while contacting the server.",
      };
      setMessages((prev) => [...prev, errorReply]);
      console.error("API error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 text-black">
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex justify-center">
          <h1 className="text-base font-semibold text-gray-800">ASK NOAH</h1>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="text-center mt-20" />
            <MessageList messages={messages} isTyping={isTyping} />
          </div>
        </div>

        {/* Suggestion Buttons */}
        {showSuggestions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 pb-4 md:max-w-3xl mx-auto">
            {[
              {
                title: "What are the advantages",
                subtitle: "of using Next.js?",
                question: "What are the advantages of using Next.js?",
              },
              {
                title: "Write code to",
                subtitle: "demonstrate dijkstra's algorithm",
                question: "Write code to demonstrate dijkstra's algorithm",
              },
              {
                title: "Help me write an essay",
                subtitle: "about silicon valley",
                question: "Help me write an essay about silicon valley",
              },
              {
                title: "What is the weather",
                subtitle: "in San Francisco?",
                question: "What is the weather in San Francisco?",
              },
            ].map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setInput(item.question);
                  handleSend(item.question);
                }}
                className="w-full text-left p-4 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 transition-colors shadow-sm"
              >
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </button>
            ))}
          </div>
        )}

        {/* Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex flex-col px-4 pb-4 md:pb-6 gap-4 w-full md:max-w-3xl mx-auto"
        >
          <div className="flex items-end gap-4">
            <MessageInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                }
              }}
              placeholder="Ask Anything..."
              rows={2}
              className="flex w-full border border-input px-3 py-2 text-base ring-offset-background 
                         placeholder:text-muted-foreground focus-visible:outline-none 
                         focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                         disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[24px] 
                         max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl 
                         bg-white text-black"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

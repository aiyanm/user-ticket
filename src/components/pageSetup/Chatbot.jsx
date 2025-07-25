import React, { useState } from "react";
import { MessageInput } from "@/components/ui/message-input"
import { MessageList } from "@/components/ui/message-list";

const Chatbot = () => {
  const [messages, setMessages] = useState([
      { id: "1", role: "assistant", content: "Hello! How can I help you today?" },
  ]);

  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a mock reply from the bot.",
    };

    setMessages((prev) => [...prev, botReply]);
    setIsTyping(false);
  }, 1000);
};

  //   setTimeout(() => {
  //     setMessages((prev) => [
  //       ...prev,
  //       { sender: "bot", text: "This is a mock reply from the bot." },
  //     ]);
  //   }, 800);
  //   setInput("");
  // };
  
  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Side Panel */}
      {showSidebar && (
        <div className="w-64 bg-white shadow-md p-4 border-r">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <img
                src="/batmanicon.png"
                alt="Batman Icon"
                className="w-6 h-6 rounded-sm"
              />
              <h2 className="text-lg font-semibold">ChatDemo</h2>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="text-blue-600 font-medium">+ New Chat</li>
            <li className="text-gray-600">Chat 1</li>
            <li className="text-gray-600">Chat 2</li>
          </ul>
        </div>
      )}

      {/* Main chat */}
      <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center justify-between">
        <button
            onClick={() => setShowSidebar((prev) => !prev)}
            className="text-gray-600 hover:text-black"
          >
            ☰
         </button>
      <h1 className="text-base font-semibold text-gray-800">KEIRO</h1>
      <div className="w-6" />
      </header>

      {/* chat message */}
      <div className="flex-1 p-4 overflow-y-auto flex justify-center">  
        <div className="w-full max-w-3xl">
          <MessageList messages={messages} isTyping={isTyping} />
        </div>
      </div>
   
        <form 
        onSubmit={(e) =>{
          e.preventDefault();
          handleSend();
        }}
        className="flex flex-col px-4 pb-4 md:pb-6 gap-4 w-full md:max-w-3xl mx-auto">
          {/* Textarea & Send */}
          <div className="flex items-end gap-4">
            <MessageInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                   e.preventDefault(); 
                 }
               }}
              placeholder="Ask Anything.."
              rows={2}
              className="flex w-full border border-input px-3 py-2 text-base ring-offset-background 
                         placeholder:text-muted-foreground focus-visible:outline-none 
                         focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                         disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[24px] 
                         max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base 
                         bg-transparent dark:border-zinc-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;


        {/* Chat Messages
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div> */}
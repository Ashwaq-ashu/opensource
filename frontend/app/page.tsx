"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function ChatPage() {
  const router = useRouter();

  const [userName, setUserName] = useState<string | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("userName");
      if (token && name) {
        setUserName(name);
      }
      setIsAuthChecking(false);
    }
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm the Life Optimizer Assistant. How can I help you reflect on your day and improve yourself?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "/signup";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Combined with Next.js rewrites, this works on any network/mobile without extra ports
      const backendUrl = "/chat";

      // Send message history plus current message to backend
      const token = localStorage.getItem("token");
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // Skip the system message from UI state if present, or backend will handle it.
        // The backend expects the whole history array
        body: JSON.stringify({
          messages: [...messages, userMessage].filter((m) => m.role !== "system"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please make sure the backend server is running and the API key is set.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  if (isAuthChecking) {
    return (
      <div className="h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  // If not logged in, show a landing/welcome state instead of redirecting
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 selection:bg-purple-500/30">
        <div className="w-full max-w-md text-center space-y-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mx-auto mb-6">
            <Bot size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Life Optimizer
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Your personal growth assistant is ready. Let's start reflecting on your journey.
          </p>
          <div className="space-y-4 pt-4">
            <button 
              onClick={() => window.location.href = "/signup"}
              className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              Get Started
            </button>
            <button 
              onClick={() => window.location.href = "/login"}
              className="w-full py-4 rounded-2xl bg-neutral-900 text-neutral-300 font-semibold border border-neutral-800 hover:bg-neutral-800 transition-all active:scale-95"
            >
              Already have an account? Sign In
            </button>
          </div>
          <p className="text-xs text-neutral-600">Accessing from: {typeof window !== "undefined" ? window.location.hostname : ""}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="w-10 h-10" /> {/* Spacer for centering Title */}
        
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
          <Bot className="text-blue-400" size={24} />
          Life Optimizer Chat
        </h1>

        <div className="flex items-center gap-4">
          {userName && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800">
              <User size={14} className="text-blue-400" />
              <span className="text-sm font-medium text-neutral-300">{userName}</span>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-neutral-800 hover:border-red-500/30 transition-all shadow-sm group"
            title="Logout"
          >
            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </header>

      {/* Chat History */}
      <main className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-[85%] sm:max-w-[75%] gap-4 p-5 rounded-3xl shadow-md ${msg.role === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-neutral-900 text-neutral-200 rounded-bl-sm border border-neutral-800"
                }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 mt-0.5">
                {msg.role === "user" ? (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-blue-400/50 shadow-sm">
                    <User size={16} className="text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shadow-sm">
                    <Bot size={16} className="text-purple-400" />
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="text-[15px] leading-relaxed break-words pt-1 flex-1">
                {msg.content.split("\n").map((paragraph, i) => (
                  <span key={i}>
                    {paragraph}
                    {i !== msg.content.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="flex max-w-[85%] sm:max-w-[75%] gap-4 p-5 rounded-3xl shadow-md bg-neutral-900 text-neutral-200 rounded-bl-sm border border-neutral-800 items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <Bot size={16} className="text-purple-400" />
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 text-neutral-400">
                <Loader2 size={16} className="animate-spin text-purple-400" />
                <span className="text-sm font-medium animate-pulse">Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="w-full max-w-4xl mx-auto p-4 pb-8 bg-neutral-950">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all duration-200"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full bg-transparent text-neutral-100 placeholder-neutral-500 py-4 pl-5 pr-14 resize-none focus:outline-none min-h-[56px] max-h-48 overflow-y-auto"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="text-center mt-4 text-xs text-neutral-500 font-medium">
          Life Optimizer Chat responses are AI-generated.
        </div>
      </footer>
    </div>
  );
}

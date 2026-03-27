"use client";

import { useState, useEffect } from "react";
import { Bot, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        window.location.href = "/";
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    
    setIsLoading(true);
    try {
      const apiBaseUrl = "/api/auth";
      const backendUrl = `/api/auth/login`;
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      // Save user info to local storage
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name || "User");

      // Redirect to chat
      window.location.href = "/";
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4 selection:bg-purple-500/30">
      <div className="w-full max-w-md p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
             <Bot size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
            Welcome Back
          </h1>
          <p className="text-neutral-400 mt-2 text-sm text-center">
            Sign in to continue your personal growth journey.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={18} className="absolute left-4 text-neutral-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-300 ml-1">Password</label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-4 text-neutral-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.email || !formData.password}
            className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Continue to Chat
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        <p className="mt-6 text-center text-xs text-neutral-500">
          Don't have an account? <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

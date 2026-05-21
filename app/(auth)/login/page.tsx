"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore, UserRole } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { KeyRound, Mail, User as UserIcon, Lock, Sparkles, Building2 } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuthStore();

  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<UserRole>("user");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sync mode with query param
  useEffect(() => {
    if (searchParams.get("register") === "true") {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }, [searchParams]);

  // Fast autofill for dev testing
  const autofill = (selectedRole: UserRole) => {
    setError("");
    setRole(selectedRole);
    if (selectedRole === "admin") {
      setEmail("admin@aadana.in");
      setName("System Administrator");
    } else if (selectedRole === "agent") {
      setEmail("agent@aadana.in");
      setName("Suresh Kumar");
    } else if (selectedRole === "builder") {
      setEmail("builder@aadana.in");
      setName("Aadana Developers");
    } else {
      setEmail("buyer@aadana.in");
      setName("Anand Kumar");
    }
    setPassword("password123");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || (isRegister && !name)) {
      setError("Please fill in all required fields.");
      return;
    }

    // Mock successful authentication
    const mockUser = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: isRegister ? name : (email.includes("admin") ? "System Administrator" : email.includes("agent") ? "Suresh Kumar" : email.includes("builder") ? "Aadana Developers" : "Anand Kumar"),
      email,
      role: isRegister ? role : (email.includes("admin") ? "admin" as const : email.includes("agent") ? "agent" as const : email.includes("builder") ? "builder" as const : "user" as const),
      phoneNumber: phone || "9876543210",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    };

    setSuccess(isRegister ? "Registration successful! Redirecting..." : "Login successful! Redirecting...");
    
    setTimeout(() => {
      login(mockUser, "mock-jwt-token-xyz-123");
      
      // Redirect to correct dashboard
      if (mockUser.role === "admin") {
        router.push("/admin");
      } else if (mockUser.role === "agent") {
        router.push("/agent");
      } else if (mockUser.role === "builder") {
        router.push("/builder");
      } else {
        router.push("/");
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-lg bg-[#111827] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        {/* Glow effect */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#C9A84C]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#C9A84C]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] text-xs font-semibold rounded-full mb-4">
            <Sparkles size={12} /> Aadana Tharakar · ஆதனத் தரகர்
          </div>
          <h2 className="text-3xl font-bold">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {isRegister ? "Join Tamil Nadu's premium real estate platform" : "Sign in to manage your premium listings & inquiries"}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 bg-[#0A0F1E] p-1 rounded-xl mb-6 border border-white/5">
          <button
            onClick={() => { setIsRegister(false); setError(""); setSuccess(""); }}
            className={`py-2 text-sm font-semibold rounded-lg transition-all ${!isRegister ? "bg-[#111827] text-[#C9A84C] shadow" : "text-slate-400 hover:text-white"}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsRegister(true); setError(""); setSuccess(""); }}
            className={`py-2 text-sm font-semibold rounded-lg transition-all ${isRegister ? "bg-[#111827] text-[#C9A84C] shadow" : "text-slate-400 hover:text-white"}`}
          >
            Register
          </button>
        </div>

        {/* Error / Success Alerts */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3.5 rounded-xl text-sm mb-6 text-center">
            {success}
          </div>
        )}

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3.5 text-slate-500" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#0A0F1E] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:border-[#C9A84C]/50 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">I am signing up as</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["user", "agent", "builder"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 px-3 border text-xs font-semibold rounded-lg capitalize transition-colors ${role === r ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]" : "border-white/5 bg-[#0A0F1E] text-slate-400 hover:text-white"}`}
                    >
                      {r === "user" ? "Buyer/Renter" : r}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#0A0F1E] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:border-[#C9A84C]/50 outline-none transition-colors"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Phone Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full bg-[#0A0F1E] border border-white/5 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:border-[#C9A84C]/50 outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Password</label>
              {!isRegister && (
                <button type="button" className="text-[#C9A84C] text-xs hover:underline">
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0F1E] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:border-[#C9A84C]/50 outline-none transition-colors"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity mt-6">
            {isRegister ? "Create Free Account" : "Sign In"}
          </Button>
        </form>

        {/* Demo Fast Login Shortcuts */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-slate-400 text-xs text-center font-medium mb-3">Quick Login (Testing Shortcuts)</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => autofill("admin")}
              className="py-2 px-2 bg-[#0A0F1E] hover:bg-[#0A0F1E]/80 border border-[#C9A84C]/20 text-[#C9A84C] rounded-lg text-xs font-semibold transition-colors"
            >
              Admin Dev
            </button>
            <button
              onClick={() => autofill("agent")}
              className="py-2 px-2 bg-[#0A0F1E] hover:bg-[#0A0F1E]/80 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              Agent Dev
            </button>
            <button
              onClick={() => autofill("builder")}
              className="py-2 px-2 bg-[#0A0F1E] hover:bg-[#0A0F1E]/80 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              Builder Dev
            </button>
            <button
              onClick={() => autofill("user")}
              className="py-2 px-2 bg-[#0A0F1E] hover:bg-[#0A0F1E]/80 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
            >
              Buyer Dev
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0F1E] text-white flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

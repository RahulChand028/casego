'use client';

import Footer from "../../components/Footer";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
// import { createAuthClient } from "better-auth/react";

import { authClient } from "@/common/clientAuth";

// Initialize the auth client with the correct configuration
// export const authClient = createAuthClient({
//   baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
//   basePath: '/api/auth',
// });

export default function OnboardPage() {
  const [step, setStep] = useState<"choose" | "login" | "signup">("choose");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await authClient.signIn.social({ 
        provider: "google",
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // Header with logo
  const header = (
    <header className="border-b border-black/10 px-4 py-3 flex flex-col gap-2 sm:gap-4 md:flex-row md:justify-between md:items-center w-full">
      <div className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-black tracking-tight">
        <Link href="/">
        <Image src="/casego-logo.png" alt="casego" width={120} height={100} />
        </Link>
      </div>
    </header>
  );

  return (
    <>
      {header}
      <main
        className="flex min-h-screen flex-col items-center justify-center p-8"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
      <div className="flex flex-col items-center w-full mt-48 font-sans" style={{ color: "var(--foreground)" }}>
        <h1 className="text-4xl font-black mb-4 text-center">Welcome to Casego</h1>
        <p className="mb-2 text-lg font-bold text-center">Smarter analytics for modern businesses.</p>
        <p className="mb-8 text-base text-center max-w-xl font-normal">
          Sign up or log in with Google to get instant access to your analytics dashboard, insights, and reports delivered directly to your WhatsApp.
        </p>
        
        {/* Error message display */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-full max-w-md text-center">
            {error}
          </div>
        )}
        {step === "choose" && (
          <div className="flex flex-col gap-4 w-full max-w-md">
            <button
              onClick={() => { setStep("login"); handleGoogleLogin(); }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg shadow hover:bg-slate-900 active:bg-black transition font-bold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              <FcGoogle className="h-5 w-5" />
              {loading ? 'Redirecting...' : 'Login with Google'}
            </button>
            <button
              onClick={() => { setStep("signup"); handleGoogleLogin(); }}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#FFD700] text-black rounded-lg shadow  focus:outline-none focus:ring-2  focus:ring-offset-2 font-bold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              <FcGoogle className="h-5 w-5" />
              {loading ? 'Redirecting...' : 'Sign up with Google'}
            </button>
          </div>
        )}
      </div>
      <div className="mt-64 w-full">
      <Footer />
      </div>
      
    </main>
    </>
  );
};
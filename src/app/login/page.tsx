"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        router.push("/dashboard");
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">JobScope AI</h1>
          <p className="text-gray-500 text-sm mt-1">
            Smart resume analysis & job matching
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-6">
            Sign in to continue
          </p>

          <div className="space-y-4">

            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 border rounded-lg border-gray-300 
              focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 border rounded-lg border-gray-300 
              focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />

            <div className="flex justify-between text-sm">
              <Link href="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 rounded-lg bg-primary text-white font-semibold hover:bg-blue-700"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t"></div>
            <span className="mx-3 text-xs text-gray-400">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          {/* OAuth Buttons */}

          <button className="w-full h-12 border rounded-lg mb-3 flex items-center justify-center gap-2 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
            Continue with Google
          </button>

          <button className="w-full h-12 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              className="w-5"
            />
            Continue with Facebook
          </button>

        </div>

        {/* Signup */}
        <p className="text-center text-sm text-gray-500 mt-6">
          New to JobScope AI?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}
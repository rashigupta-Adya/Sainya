"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TEST_CREDENTIALS = [
  { label: "Admin", email: "admin@sainya.com", password: "admin123" },
  { label: "Institute", email: "institute@sainya.com", password: "institute123" },
  { label: "Mentor", email: "mentor@sainya.com", password: "mentor123" },
  { label: "Student (SSB)", email: "student@sainya.com", password: "student123" },
  { label: "Student (Written)", email: "student2@sainya.com", password: "student123" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (!result.success) {
      setError(result.error ?? "Login failed");
    }
  }

  return (
    <div className="flex min-h-screen flex-row">
      {/* ── Left half: brand panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-forest-dark via-forest to-forest-light items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl font-bold text-white">
            S
          </div>
          <h1 className="text-4xl font-extrabold text-white">Sainya</h1>
          <p className="text-lg text-white/70">
            Complete Defence Preparation Platform
          </p>
          <p className="text-sm text-white/50">
            From Written Exam to SSB Recommendation. One Platform.
          </p>
        </div>
      </div>

      {/* ── Right half: login form ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex flex-col items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest text-lg font-bold text-white">
              S
            </div>
            <h2 className="text-xl font-bold text-forest">Sainya</h2>
          </div>

          {/* Heading */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">User ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-rust text-white hover:bg-rust-dark"
            >
              Sign In
            </Button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-slate-500">
            New student?{" "}
            <Link href="/register/student" className="font-medium text-forest hover:underline">
              Register here
            </Link>
          </p>

          {/* Test credentials */}
          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-medium text-slate-400">
              Test Credentials
            </p>
            <ul className="space-y-1">
              {TEST_CREDENTIALS.map((cred) => (
                <li key={cred.email} className="text-xs text-slate-500">
                  <span className="font-medium">{cred.label}:</span>{" "}
                  {cred.email} / {cred.password}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

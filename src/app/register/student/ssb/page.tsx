"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function SSBStudentOnboarding() {
  const router = useRouter()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    examCleared: "",
    ssbDate: "",
    ssbAttempt: "",
    email: "student@sainya.com",
    password: "student123",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const result = login(form.email, form.password)
    if (result.success) {
      router.push("/student/olq-assessment")
    } else {
      setError(result.error || "Login failed. Check your credentials.")
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Back link */}
      <Link
        href="/register/student"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-forest mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Path Selection
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold mb-1">Tell us about yourself</h1>
        <p className="text-gray-500 text-sm mb-8">
          This helps us personalize your SSB preparation journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Your Name <span className="text-rust">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
            />
          </div>

          {/* Exam Cleared */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Which exam did you clear? <span className="text-rust">*</span>
            </label>
            <select
              name="examCleared"
              required
              value={form.examCleared}
              onChange={handleChange}
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all appearance-none"
            >
              <option value="" disabled>
                Select exam
              </option>
              <option value="NDA">NDA</option>
              <option value="CDS">CDS</option>
              <option value="AFCAT">AFCAT</option>
              <option value="INET">INET</option>
              <option value="TGC/SSC Tech">TGC/SSC Tech</option>
              <option value="NCC Special">NCC Special</option>
              <option value="Direct Entry">Direct Entry</option>
            </select>
          </div>

          {/* SSB Date */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              SSB Date if known
            </label>
            <input
              type="date"
              name="ssbDate"
              value={form.ssbDate}
              onChange={handleChange}
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
            />
          </div>

          {/* SSB Attempt */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              SSB Attempt <span className="text-rust">*</span>
            </label>
            <select
              name="ssbAttempt"
              required
              value={form.ssbAttempt}
              onChange={handleChange}
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all appearance-none"
            >
              <option value="" disabled>
                Select attempt
              </option>
              <option value="First attempt Fresher">
                First attempt Fresher
              </option>
              <option value="Screened Out before">Screened Out before</option>
              <option value="Conference Out">Conference Out</option>
              <option value="3+ attempts">3+ attempts</option>
            </select>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 mb-3">Account credentials (for prototype, use the pre-filled test account)</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Email <span className="text-rust">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Password <span className="text-rust">*</span>
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-11 bg-rust text-white rounded-lg font-semibold hover:bg-rust-dark transition-colors mt-2"
          >
            Begin OLQ Assessment
          </button>
          <p className="text-center text-xs text-gray-400">
            30 questions &middot; ~10 minutes &middot; Instant results
          </p>
        </form>
      </div>
    </div>
  )
}

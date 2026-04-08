"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

const entryRoutes = ["NDA", "CDS", "AFCAT", "Tech Entry", "SSB Only", "Other"]
const useCases = [
  "Upload written exam content",
  "AI-powered SSB evaluation",
  "Manage student batches",
  "Connect students with mentors",
]

export default function InstituteRegistration() {
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    instituteName: "",
    city: "",
    instituteType: "",
    studentCount: "",
    contactName: "",
    phoneEmail: "",
    entryRoutes: [] as string[],
    useCases: [] as string[],
    website: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function toggleCheckbox(field: "entryRoutes" | "useCases", value: string) {
    const current = form[field]
    setForm({
      ...form,
      [field]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    })
  }

  function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    setStep(2)
  }

  function handleStep2(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(true)
  }

  /* ------------------------------------------------------------------ */
  /*  Success State                                                      */
  /* ------------------------------------------------------------------ */
  if (success) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Registration Submitted</h1>
          <p className="text-gray-500 text-sm mb-8">
            Our team will verify your details and reach out within 24 hours.
          </p>

          <div className="text-left bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-semibold mb-3">What happens next</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-forest text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                Verification call
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-forest text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                Branded portal setup
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-forest text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                Content upload walkthrough
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 bg-forest text-white rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </span>
                Student onboarding
              </li>
            </ol>
          </div>

          <Link
            href="/"
            className="inline-block text-sm font-semibold text-forest hover:text-forest-dark transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    )
  }

  /* ------------------------------------------------------------------ */
  /*  Step Indicator                                                     */
  /* ------------------------------------------------------------------ */
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          step > 1
            ? "bg-green-100 text-green-600"
            : "bg-forest text-white"
        }`}
      >
        {step > 1 ? <Check className="w-4 h-4" /> : "1"}
      </div>
      <div className="w-8 h-px bg-gray-300" />
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          step === 2
            ? "bg-forest text-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        2
      </div>
    </div>
  )

  /* ------------------------------------------------------------------ */
  /*  Step 1 — Institute Details                                         */
  /* ------------------------------------------------------------------ */
  if (step === 1) {
    return (
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-forest mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <StepIndicator />

          <h1 className="text-2xl font-bold mb-1">Register Your Institute</h1>
          <p className="text-gray-500 text-sm mb-8">
            Tell us about your coaching center. We&apos;ll set up your dedicated
            portal.
          </p>

          <form onSubmit={handleStep1} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Institute Name <span className="text-rust">*</span>
              </label>
              <input
                type="text"
                name="instituteName"
                required
                value={form.instituteName}
                onChange={handleChange}
                placeholder="e.g. Warriors Defence Academy"
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                City <span className="text-rust">*</span>
              </label>
              <input
                type="text"
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. Lucknow"
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Institute Type <span className="text-rust">*</span>
              </label>
              <select
                name="instituteType"
                required
                value={form.instituteType}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all appearance-none"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="SSB Coaching">SSB Coaching</option>
                <option value="NDA Academy">NDA Academy</option>
                <option value="Defence Coaching Written+SSB">
                  Defence Coaching Written+SSB
                </option>
                <option value="College/University">College/University</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Approximate Student Count <span className="text-rust">*</span>
              </label>
              <select
                name="studentCount"
                required
                value={form.studentCount}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all appearance-none"
              >
                <option value="" disabled>
                  Select range
                </option>
                <option value="1-50">1-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Your Name <span className="text-rust">*</span>
              </label>
              <input
                type="text"
                name="contactName"
                required
                value={form.contactName}
                onChange={handleChange}
                placeholder="Contact person name"
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Phone / Email <span className="text-rust">*</span>
              </label>
              <input
                type="text"
                name="phoneEmail"
                required
                value={form.phoneEmail}
                onChange={handleChange}
                placeholder="Phone number or email"
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-forest text-white rounded-lg font-semibold hover:bg-forest-dark transition-colors mt-2"
            >
              Continue to Profile Setup
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ------------------------------------------------------------------ */
  /*  Step 2 — Profile Setup                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => setStep(1)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-forest mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Details
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <StepIndicator />

        <h1 className="text-2xl font-bold mb-1">Set Up Your Profile</h1>
        <p className="text-gray-500 text-sm mb-8">
          What entry routes do you cover?
        </p>

        <form onSubmit={handleStep2} className="space-y-6">
          {/* Entry Routes */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Entry Routes
            </label>
            <div className="grid grid-cols-2 gap-2">
              {entryRoutes.map((route) => (
                <label
                  key={route}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.entryRoutes.includes(route)}
                    onChange={() => toggleCheckbox("entryRoutes", route)}
                    className="w-4 h-4 rounded border-gray-300 text-forest focus:ring-forest accent-forest"
                  />
                  {route}
                </label>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <label className="block text-sm font-medium mb-3">
              What you&apos;ll use Sainya for
            </label>
            <div className="space-y-2">
              {useCases.map((uc) => (
                <label
                  key={uc}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.useCases.includes(uc)}
                    onChange={() => toggleCheckbox("useCases", uc)}
                    className="w-4 h-4 rounded border-gray-300 text-forest focus:ring-forest accent-forest"
                  />
                  {uc}
                </label>
              ))}
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Website <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://yoursite.com"
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-forest text-white rounded-lg font-semibold hover:bg-forest-dark transition-colors mt-2"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  )
}

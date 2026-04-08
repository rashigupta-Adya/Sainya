"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

const ssbStages = [
  "Screening (OIR+PPDT)",
  "Psychology Tests (TAT/WAT/SRT/SD)",
  "GTO Tasks (GD/GPE/PGT/Lecturette)",
  "Personal Interview",
  "Physical Fitness",
  "Written Exam Subjects",
]

export default function MentorRegistration() {
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    fullName: "",
    background: "",
    yearsExperience: "",
    phoneEmail: "",
    stages: [] as string[],
    bio: "",
    affiliatedInstitute: "",
  })

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function toggleStage(value: string) {
    const current = form.stages
    setForm({
      ...form,
      stages: current.includes(value)
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
          <h1 className="text-2xl font-bold mb-2">Application Submitted</h1>
          <p className="text-gray-500 text-sm mb-8">
            We&apos;ll verify your credentials and activate your profile within
            48 hours.
          </p>
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
          step > 1 ? "bg-green-100 text-green-600" : "bg-forest text-white"
        }`}
      >
        {step > 1 ? <Check className="w-4 h-4" /> : "1"}
      </div>
      <div className="w-8 h-px bg-gray-300" />
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          step === 2 ? "bg-forest text-white" : "bg-gray-100 text-gray-400"
        }`}
      >
        2
      </div>
    </div>
  )

  /* ------------------------------------------------------------------ */
  /*  Step 1 — Personal Details                                          */
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

          <h1 className="text-2xl font-bold mb-1">Join as Mentor</h1>
          <p className="text-gray-500 text-sm mb-8">
            Share your defence expertise. Coach aspirants at scale.
          </p>

          <form onSubmit={handleStep1} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Full Name <span className="text-rust">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Col. (Retd.) Rajesh Sharma"
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Background <span className="text-rust">*</span>
              </label>
              <select
                name="background"
                required
                value={form.background}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all appearance-none"
              >
                <option value="" disabled>
                  Select background
                </option>
                <option value="Ex-SSB Recommended Officer">
                  Ex-SSB Recommended Officer
                </option>
                <option value="Ex-IO">Ex-IO</option>
                <option value="Military Psychologist">
                  Military Psychologist
                </option>
                <option value="GTO Expert">GTO Expert</option>
                <option value="Defence Subject Teacher">
                  Defence Subject Teacher
                </option>
                <option value="Retired Officer">Retired Officer</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Years of Experience <span className="text-rust">*</span>
              </label>
              <select
                name="yearsExperience"
                required
                value={form.yearsExperience}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all appearance-none"
              >
                <option value="" disabled>
                  Select range
                </option>
                <option value="1-3">1-3</option>
                <option value="4-10">4-10</option>
                <option value="10-20">10-20</option>
                <option value="20+">20+</option>
              </select>
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
              Continue to Expertise
            </button>
          </form>
        </div>
      </div>
    )
  }

  /* ------------------------------------------------------------------ */
  /*  Step 2 — Expertise                                                 */
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

        <h1 className="text-2xl font-bold mb-1">Your Expertise</h1>
        <p className="text-gray-500 text-sm mb-8">
          Which SSB stages can you coach?
        </p>

        <form onSubmit={handleStep2} className="space-y-6">
          {/* SSB Stages */}
          <div>
            <label className="block text-sm font-medium mb-3">
              SSB Stages
            </label>
            <div className="space-y-2">
              {ssbStages.map((stage) => (
                <label
                  key={stage}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.stages.includes(stage)}
                    onChange={() => toggleStage(stage)}
                    className="w-4 h-4 rounded border-gray-300 text-forest focus:ring-forest accent-forest"
                  />
                  {stage}
                </label>
              ))}
            </div>
          </div>

          {/* Brief Bio */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Brief Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Share your experience and what you bring to aspirants..."
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all resize-none"
            />
          </div>

          {/* Affiliated Institute */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Affiliated Institute{" "}
              <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              name="affiliatedInstitute"
              value={form.affiliatedInstitute}
              onChange={handleChange}
              placeholder="e.g. Centurion Defence Academy"
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-forest text-white rounded-lg font-semibold hover:bg-forest-dark transition-colors mt-2"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}

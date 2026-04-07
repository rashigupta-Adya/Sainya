"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"
import { Radar } from "react-chartjs-2"
import { ArrowLeft, ArrowRight, Check, Target, TrendingUp, AlertTriangle } from "lucide-react"

import { useAuth } from "@/lib/auth"
import { questions } from "@/lib/olq-questions"
import {
  OLQ_NAMES,
  FACTORS,
  FACTOR_NAMES,
  calculateOLQScores,
  calculateFactorScores,
  calculateOverallScore,
  getScoreLabel,
} from "@/lib/olq-scoring"

// ---------------------------------------------------------------------------
// Chart.js registration
// ---------------------------------------------------------------------------

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LETTERS = ["A", "B", "C", "D"]

function scoreLabelClasses(color: string) {
  if (color === "green") return "bg-emerald-100 text-emerald-700"
  if (color === "amber") return "bg-amber-100 text-amber-700"
  return "bg-red-100 text-red-700"
}

function progressBarColor(color: string) {
  if (color === "green") return "bg-emerald-500"
  if (color === "amber") return "bg-amber-500"
  return "bg-red-500"
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OLQAssessmentPage() {
  const { user } = useAuth()

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    new Array(questions.length).fill(null),
  )
  const [showResults, setShowResults] = useState(false)

  // Derived scoring (computed only when results visible)
  const olqScores = useMemo(
    () => (showResults ? calculateOLQScores(answers, questions) : []),
    [showResults, answers],
  )
  const factorScores = useMemo(
    () => (showResults ? calculateFactorScores(olqScores) : {}),
    [showResults, olqScores],
  )
  const overallScore = useMemo(
    () => (showResults ? calculateOverallScore(factorScores) : 0),
    [showResults, factorScores],
  )
  const overallLabel = useMemo(
    () => (showResults ? getScoreLabel(overallScore) : { label: "", color: "" }),
    [showResults, overallScore],
  )

  // Weak and strong OLQs for roadmap
  const weakOLQs = useMemo(
    () =>
      showResults
        ? OLQ_NAMES.map((name, i) => ({ name, score: olqScores[i] }))
            .filter((o) => o.score < 50)
            .sort((a, b) => a.score - b.score)
        : [],
    [showResults, olqScores],
  )
  const strongOLQs = useMemo(
    () =>
      showResults
        ? OLQ_NAMES.map((name, i) => ({ name, score: olqScores[i] }))
            .filter((o) => o.score >= 75)
            .sort((a, b) => b.score - a.score)
        : [],
    [showResults, olqScores],
  )

  // Handlers
  function selectOption(optionIdx: number) {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentQ] = optionIdx
      return next
    })
  }

  function goNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1)
    } else {
      setShowResults(true)
    }
  }

  function goPrev() {
    if (currentQ > 0) setCurrentQ((q) => q - 1)
  }

  // =========================================================================
  // RESULTS VIEW
  // =========================================================================

  if (showResults) {
    const radarData = {
      labels: FACTOR_NAMES,
      datasets: [
        {
          label: "Your Score",
          data: FACTOR_NAMES.map((f) => factorScores[f] ?? 0),
          backgroundColor: "rgba(42, 87, 68, 0.2)",
          borderColor: "#2a5744",
          borderWidth: 2,
          pointBackgroundColor: "#2a5744",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#2a5744",
        },
      ],
    }

    const radarOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 25, display: false },
          grid: { color: "rgba(0,0,0,0.06)" },
          angleLines: { color: "rgba(0,0,0,0.06)" },
          pointLabels: { font: { size: 12, weight: 600 as const }, color: "#334155" },
        },
      },
    }

    return (
      <div className="mx-auto max-w-4xl space-y-8 pb-12">
        {/* Heading */}
        <div>
          <h1 className="text-2xl font-bold">Your OLQ Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {user?.name ?? "Candidate"}&apos;s baseline assessment across 15 Officer Like Qualities
          </p>
        </div>

        {/* Overall Score */}
        <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
          <p className="mt-2 text-6xl font-extrabold text-forest">{overallScore}%</p>
          <span
            className={`mt-3 inline-block rounded-full px-4 py-1 text-sm font-semibold ${scoreLabelClasses(overallLabel.color)}`}
          >
            {overallLabel.label}
          </span>
        </div>

        {/* Radar Chart */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Factor Breakdown</h2>
          <div className="mx-auto h-72 w-full max-w-sm">
            <Radar data={radarData} options={radarOptions} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {FACTOR_NAMES.map((f) => {
              const s = factorScores[f] ?? 0
              const lbl = getScoreLabel(s)
              return (
                <div key={f} className="rounded-lg bg-forest-50 px-3 py-3 text-center">
                  <p className="text-2xl font-bold text-forest">{s}%</p>
                  <p className="mt-0.5 text-xs leading-tight text-muted-foreground">{f}</p>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${scoreLabelClasses(lbl.color)}`}
                  >
                    {lbl.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Per-factor OLQ breakdown */}
        {FACTOR_NAMES.map((factor) => {
          const { indices } = FACTORS[factor]
          return (
            <div key={factor} className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">{factor}</h2>
              <div className="space-y-4">
                {indices.map((olqIdx) => {
                  const score = olqScores[olqIdx]
                  const lbl = getScoreLabel(score)
                  return (
                    <div key={olqIdx}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium">{OLQ_NAMES[olqIdx]}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{score}%</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${scoreLabelClasses(lbl.color)}`}
                          >
                            {lbl.label}
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all ${progressBarColor(lbl.color)}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Preparation Roadmap */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Preparation Roadmap</h2>

          {weakOLQs.length > 0 && (
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-600">
                <AlertTriangle className="size-4" />
                Priority Areas (Needs Work)
              </div>
              <ul className="space-y-2">
                {weakOLQs.map(({ name, score }) => (
                  <li
                    key={name}
                    className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-2.5"
                  >
                    <span className="text-sm font-medium">{name}</span>
                    <span className="text-sm font-semibold text-red-600">{score}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {strongOLQs.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <TrendingUp className="size-4" />
                Your Strengths
              </div>
              <ul className="space-y-2">
                {strongOLQs.map(({ name, score }) => (
                  <li
                    key={name}
                    className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5"
                  >
                    <span className="text-sm font-medium">{name}</span>
                    <span className="text-sm font-semibold text-emerald-600">{score}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {weakOLQs.length === 0 && strongOLQs.length === 0 && (
            <p className="text-sm text-muted-foreground">
              All your OLQ scores are in the moderate range. Focus on moving them into the strong
              category through consistent practice.
            </p>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-dark"
          >
            <Target className="size-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // =========================================================================
  // ASSESSMENT VIEW
  // =========================================================================

  const question = questions[currentQ]
  const selected = answers[currentQ]
  const progress = ((currentQ + 1) / questions.length) * 100
  const isLast = currentQ === questions.length - 1

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Top bar */}
      <div className="border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <button
            onClick={currentQ === 0 ? undefined : goPrev}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-40"
            disabled={currentQ === 0}
          >
            <ArrowLeft className="size-4" />
            Back
          </button>

          <span className="text-sm font-semibold text-foreground">
            {currentQ + 1} / {questions.length}
          </span>

          <div className="w-16" /> {/* spacer for centering */}
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-2 max-w-2xl">
          <div className="h-1.5 w-full rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-forest transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question card — centered */}
      <div className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-forest px-3 py-1 text-xs font-semibold text-white">
              {question.factor}
            </span>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
              {question.olq}
            </span>
          </div>

          {/* Question text */}
          <h2 className="text-xl font-bold leading-snug text-foreground sm:text-2xl">
            {question.q}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selected === idx
              return (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition
                    ${
                      isSelected
                        ? "border-forest bg-forest-50"
                        : "border-border bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  {/* Letter circle */}
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold
                      ${isSelected ? "bg-forest text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    {isSelected ? <Check className="size-3.5" /> : LETTERS[idx]}
                  </span>

                  <span className="text-sm leading-relaxed">{opt}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="border-t bg-white px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentQ === 0}
            className="flex items-center gap-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-40"
          >
            <ArrowLeft className="size-4" />
            Previous
          </button>

          <button
            onClick={goNext}
            disabled={selected === null}
            className="flex items-center gap-1 rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-dark disabled:opacity-40"
          >
            {isLast ? "See Results" : "Next"}
            {!isLast && <ArrowRight className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}

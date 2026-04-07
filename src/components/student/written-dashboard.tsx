"use client"

import { useMemo } from "react"
import Link from "next/link"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import {
  Flame,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Trophy,
  Star,
  Shield,
  BookOpen,
  Brain,
  CalendarDays,
} from "lucide-react"

import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import studentsData from "@/data/students.json"
import mockTestsData from "@/data/mock-tests.json"

// ---------------------------------------------------------------------------
// Register Chart.js components
// ---------------------------------------------------------------------------

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STUDENT_ID = "student-002"
const EXAM_DATE = "2026-09-15"
const XP_FOR_NEXT_LEVEL = 3000

const BADGE_ICONS: Record<string, { icon: React.ReactNode; bg: string }> = {
  "first-mock": {
    icon: <Trophy className="size-3.5 text-white" />,
    bg: "bg-amber-500",
  },
  "first-salute": {
    icon: <Star className="size-3.5 text-white" />,
    bg: "bg-purple-500",
  },
  "math-streak-3": {
    icon: <Flame className="size-3.5 text-white" />,
    bg: "bg-orange-500",
  },
}

// Subject display config with labels matching the dashboard spec
const SUBJECT_CONFIG = [
  { key: "mathematics", label: "Mathematics" },
  { key: "english", label: "English" },
  { key: "generalKnowledge", label: "General Knowledge" },
  { key: "physics", label: "Physics" },
  { key: "chemistry", label: "Chemistry" },
] as const

// Hardcoded subject scores as specified (override JSON for prototype display)
const DISPLAY_SCORES: Record<string, number> = {
  mathematics: 55,
  english: 72,
  generalKnowledge: 48,
  physics: 38,
  chemistry: 45,
}

const TASKS = [
  { label: "Complete Trigonometry Module", xp: 50, completed: false },
  { label: "Physics: Mechanics Quiz (20 questions)", xp: 30, completed: false },
  { label: "Daily GK Current Affairs", xp: 20, completed: false },
  { label: "NDA Section Test: Mathematics", xp: 100, completed: false },
]

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function scoreColor(score: number): string {
  if (score >= 60) return "bg-forest"
  if (score >= 45) return "bg-amber-500"
  return "bg-rust"
}

function scoreTextColor(score: number): string {
  if (score >= 60) return "text-forest"
  if (score >= 45) return "text-amber-500"
  return "text-rust"
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WrittenDashboard() {
  const { user } = useAuth()

  const student = studentsData.students.find((s) => s.id === STUDENT_ID)!

  // Mock test data for student-002
  const studentTests = useMemo(
    () =>
      mockTestsData.mockTests
        .filter((t) => t.studentId === STUDENT_ID)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    []
  )

  const testScores = studentTests.map((t) => t.score)
  const bestScore = testScores.length > 0 ? Math.max(...testScores) : 0
  const latestScore =
    testScores.length > 0 ? testScores[testScores.length - 1] : 0
  const avgScore =
    testScores.length > 0
      ? Math.round(testScores.reduce((a, b) => a + b, 0) / testScores.length)
      : 0

  const daysLeft = daysUntil(EXAM_DATE)
  const examReadiness = 42
  const xpPercent = Math.round((student.xp / XP_FOR_NEXT_LEVEL) * 100)
  const xpToNext = XP_FOR_NEXT_LEVEL - student.xp
  const displayedBadges = student.badges.slice(0, 4)
  const remainingBadges = Math.max(0, student.badges.length - 4)

  // ---------- Chart config ----------

  const barData = {
    labels: studentTests.map((t) => {
      const d = new Date(t.date)
      return `${d.getDate()}/${d.getMonth() + 1}`
    }),
    datasets: [
      {
        label: "Score",
        data: testScores,
        backgroundColor: testScores.map((s) =>
          s >= 60 ? "#2a5744" : s >= 45 ? "#f59e0b" : "#c05433"
        ),
        borderRadius: 4,
        barThickness: 28,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { y: number | null } }) =>
            `Score: ${ctx.parsed.y ?? 0}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 25, font: { size: 11 } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false },
      },
    },
  }

  // ---------- Render ----------

  return (
    <div className="space-y-6">
      {/* ================================================================
          1. HERO CARD
          ================================================================ */}
      <div className="rounded-xl bg-gradient-to-r from-forest-dark to-forest-light p-6 text-white lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold lg:text-3xl">
              Welcome back, {user?.name ?? student.name}
            </h1>
            <p className="text-3xl font-extrabold lg:text-4xl">
              Your NDA Exam is in {daysLeft} days
            </p>
            <p className="text-sm text-white/80">
              NDA&ensp;|&ensp;First Attempt&ensp;|&ensp;Independent Student
            </p>
            <Link
              href="/student/curriculum"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-rust px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rust-dark"
            >
              Continue Studying
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Right — Exam Readiness Score */}
          <div className="flex flex-col items-center rounded-xl bg-white/10 px-8 py-6 backdrop-blur-sm">
            <span className="text-5xl font-extrabold lg:text-6xl">
              {examReadiness}
            </span>
            <span className="mt-1 text-sm font-medium text-white/90">
              Exam Readiness Score
            </span>
            <span className="text-xs text-white/60">Target: 70+</span>
          </div>
        </div>
      </div>

      {/* ================================================================
          2. GAMIFICATION STRIP
          ================================================================ */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Level + XP */}
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <Badge className="bg-forest text-white hover:bg-forest-dark w-fit px-3 py-1 text-xs font-semibold">
              <Shield className="mr-1 size-3" />
              {student.levelTitle}
            </Badge>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {student.xp.toLocaleString()} /{" "}
                  {XP_FOR_NEXT_LEVEL.toLocaleString()} XP
                </span>
                <span>
                  {xpToNext.toLocaleString()} XP to Level {student.level + 1}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-forest-50">
                <div
                  className="h-full rounded-full bg-forest transition-all"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Streak + Badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-semibold text-rust">
              <Flame className="size-5" />
              <span className="text-lg">{student.streak}</span>
              <span className="text-xs font-normal text-muted-foreground">
                days
              </span>
            </div>

            <div className="h-6 w-px bg-border" />

            <div className="flex items-center gap-1.5">
              {displayedBadges.map((b) => {
                const cfg = BADGE_ICONS[b]
                return (
                  <div
                    key={b}
                    className={`flex size-7 items-center justify-center rounded-full ${cfg?.bg ?? "bg-slate-400"}`}
                    title={b.replace(/-/g, " ")}
                  >
                    {cfg?.icon ?? <Star className="size-3.5 text-white" />}
                  </div>
                )
              })}
              {remainingBadges > 0 && (
                <span className="text-xs font-medium text-muted-foreground">
                  +{remainingBadges}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================
          3. AI RECOMMENDS
          ================================================================ */}
      <Card className="border-l-4 border-l-rust">
        <CardContent>
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 size-5 shrink-0 text-rust" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-rust">
                AI Recommends
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                Focus on Physics and Chemistry this week
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Your mock tests show Physics at 38% and Chemistry at 45%. These
                two subjects pull down your GAT score the most. Spend extra time
                on Mechanics and Organic Chemistry.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================
          4. TWO-COLUMN GRID
          ================================================================ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ————— LEFT COLUMN ————— */}
        <div className="space-y-6">
          {/* Subject Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="size-5 text-forest" />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {SUBJECT_CONFIG.map(({ key, label }) => {
                const score = DISPLAY_SCORES[key] ?? 0
                return (
                  <div key={key}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{label}</span>
                      <span className={`font-semibold ${scoreTextColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${scoreColor(score)} transition-all`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Mock Test Performance */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="text-lg">Mock Test Performance</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {studentTests.length} tests taken
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <Bar data={barData} options={barOptions} />
              </div>
              <div className="mt-4 flex items-center justify-around border-t pt-3 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-forest">{bestScore}%</p>
                  <p className="text-xs text-muted-foreground">Best</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{latestScore}%</p>
                  <p className="text-xs text-muted-foreground">Latest</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-rust">{avgScore}%</p>
                  <p className="text-xs text-muted-foreground">Avg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ————— RIGHT COLUMN ————— */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today&apos;s Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {TASKS.map((task) => (
                <div
                  key={task.label}
                  className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
                    task.completed
                      ? "border-forest/20 bg-forest-50"
                      : "border-border"
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="size-5 shrink-0 text-forest" />
                  ) : (
                    <Circle className="size-5 shrink-0 text-rust" />
                  )}
                  <span
                    className={`flex-1 text-sm ${
                      task.completed
                        ? "text-muted-foreground line-through"
                        : "font-medium"
                    }`}
                  >
                    {task.label}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      task.completed
                        ? "bg-forest/10 text-forest"
                        : "bg-rust-50 text-rust"
                    }`}
                  >
                    +{task.xp} XP
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Exam Readiness Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="size-5 text-forest" />
                Exam Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {/* Large circular readiness display */}
                <div className="flex size-32 items-center justify-center rounded-full border-4 border-rust/30 bg-rust-50">
                  <div className="text-center">
                    <span className="text-4xl font-extrabold text-rust">
                      {examReadiness}
                    </span>
                    <span className="text-lg text-rust/70">/100</span>
                  </div>
                </div>

                <div className="mt-4 w-full space-y-2 text-sm text-muted-foreground">
                  <p className="text-center font-medium text-foreground">
                    Score Breakdown
                  </p>
                  <div className="flex items-center justify-between">
                    <span>Mock Performance</span>
                    <span className="font-semibold">70%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Curriculum Completion</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Consistency</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-center text-sm font-medium text-amber-700">
                    Improve by 28 points to reach target.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Plan Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="size-5 text-forest" />
                AI Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-forest/20 bg-forest-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-forest">
                  This Week
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  Focus on Physics Mechanics and Chemistry Organic
                </p>
              </div>
              <div className="rounded-lg border px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Next Week
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  GK Modern History + Mock Test #6
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

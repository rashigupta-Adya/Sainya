"use client"

import { useMemo } from "react"
import Link from "next/link"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
import { Radar, Bar } from "react-chartjs-2"
import {
  Flame,
  Target,
  CheckCircle2,
  Circle,
  Calendar,
  Video,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Star,
  Shield,
  Zap,
  Swords,
} from "lucide-react"

import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import studentsData from "@/data/students.json"
import mockTestsData from "@/data/mock-tests.json"
import olqScoresData from "@/data/olq-scores.json"

// ---------------------------------------------------------------------------
// Register Chart.js components
// ---------------------------------------------------------------------------

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STUDENT_ID = "student-001"
const SSB_DATE = "2026-05-20"
const XP_FOR_NEXT_LEVEL = 7000

const BADGE_ICONS: Record<string, { icon: React.ReactNode; bg: string }> = {
  "first-mock": { icon: <Trophy className="size-3.5 text-white" />, bg: "bg-amber-500" },
  "streak-7": { icon: <Flame className="size-3.5 text-white" />, bg: "bg-orange-500" },
  "streak-10": { icon: <Flame className="size-3.5 text-white" />, bg: "bg-red-500" },
  "psych-explorer": { icon: <Star className="size-3.5 text-white" />, bg: "bg-purple-500" },
  "gto-warrior": { icon: <Swords className="size-3.5 text-white" />, bg: "bg-forest" },
}

const STAGE_CONFIG = [
  { key: "screening", label: "Screening", colorClass: "bg-forest", bgClass: "bg-forest-50" },
  { key: "psychology", label: "Psychology", colorClass: "bg-rust", bgClass: "bg-rust-50" },
  { key: "gto", label: "GTO", colorClass: "bg-rust", bgClass: "bg-rust-50" },
  { key: "interview", label: "Interview", colorClass: "bg-amber-500", bgClass: "bg-amber-50" },
  { key: "conference", label: "Conference", colorClass: "bg-slate-400", bgClass: "bg-slate-100" },
] as const

const TASKS = [
  { label: "OLQ Baseline Assessment", xp: 100, completed: true },
  { label: "SRT Practice (10 situations)", xp: 50, completed: false },
  { label: "Current Affairs (15 min reading)", xp: 30, completed: false },
  { label: "AI Mock Interview (weekly)", xp: 200, completed: false },
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StudentDashboard() {
  const { user } = useAuth()

  const student = studentsData.students.find((s) => s.id === STUDENT_ID)!
  const stageReadiness = student.stageReadiness as Record<string, number>

  // Mock test data for student-001
  const studentTests = useMemo(
    () =>
      mockTestsData.mockTests
        .filter((t) => t.studentId === STUDENT_ID)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  )

  const testScores = studentTests.map((t) => t.score)
  const bestScore = Math.max(...testScores)
  const latestScore = testScores[testScores.length - 1]
  const avgScore = Math.round(testScores.reduce((a, b) => a + b, 0) / testScores.length)

  // OLQ factor scores
  const olqFactors = olqScoresData.current.factors

  const daysLeft = daysUntil(SSB_DATE)
  const xpToNext = XP_FOR_NEXT_LEVEL - student.xp
  const xpPercent = Math.round((student.xp / XP_FOR_NEXT_LEVEL) * 100)
  const displayedBadges = student.badges.slice(0, 4)
  const remainingBadges = Math.max(0, student.badges.length - 4)

  // ---------- Chart configs ----------

  const radarData = {
    labels: ["Planning & Organizing", "Social Adjustment", "Social Effectiveness", "Dynamic"],
    datasets: [
      {
        label: "Current",
        data: [
          olqFactors.planningOrganizing.score,
          olqFactors.socialAdjustment.score,
          olqFactors.socialEffectiveness.score,
          olqFactors.dynamic.score,
        ],
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
        ticks: { stepSize: 20, display: false },
        grid: { color: "rgba(0,0,0,0.06)" },
        angleLines: { color: "rgba(0,0,0,0.06)" },
        pointLabels: { font: { size: 11 }, color: "#475569" },
      },
    },
  }

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
          s >= 70 ? "#2a5744" : s >= 60 ? "#3d7a60" : "#c05433"
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
          label: (ctx: { parsed: { y: number | null } }) => `Score: ${ctx.parsed.y ?? 0}%`,
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
              Your SSB is in {daysLeft} days
            </p>
            <p className="text-sm text-white/80">
              NDA Entry&ensp;|&ensp;SSB Centre: Allahabad&ensp;|&ensp;Attempt #{student.attempt}
            </p>
            <Link
              href="/student/practice"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-rust px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rust-dark"
            >
              Continue Preparation
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Right — SRS Score */}
          <div className="flex flex-col items-center rounded-xl bg-white/10 px-8 py-6 backdrop-blur-sm">
            <span className="text-5xl font-extrabold lg:text-6xl">{student.srsScore}</span>
            <span className="mt-1 text-sm font-medium text-white/90">Selection Readiness Score</span>
            <span className="text-xs text-white/60">Target: 75+</span>
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

            <div className="flex-1 min-w-0">
              <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{student.xp.toLocaleString()} / {XP_FOR_NEXT_LEVEL.toLocaleString()} XP</span>
                <span>{xpToNext.toLocaleString()} XP to Level {student.level + 1}: Leader</span>
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
            <div className="flex items-center gap-1.5 text-rust font-semibold">
              <Flame className="size-5" />
              <span className="text-lg">{student.streak}</span>
              <span className="text-xs text-muted-foreground font-normal">days</span>
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
                <span className="text-xs font-medium text-muted-foreground">+{remainingBadges}</span>
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
              <p className="text-xs font-bold uppercase tracking-wide text-rust">AI Recommends</p>
              <p className="mt-1 text-base font-semibold text-foreground">
                Focus on Psychology Tests today
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Your SRT consistency dropped 8% this week. Your TAT protagonist shows initiative
                but your SRT reactions defer to authority. Practice 10 SRT situations to build alignment.
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
          {/* Stage Readiness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="size-5 text-forest" />
                Stage Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {STAGE_CONFIG.map(({ key, label, colorClass, bgClass }) => {
                const value = stageReadiness[key] ?? 0
                return (
                  <div key={key}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{label}</span>
                      <span className="font-semibold">{value}%</span>
                    </div>
                    <div className={`h-2.5 w-full rounded-full ${bgClass}`}>
                      <div
                        className={`h-full rounded-full ${colorClass} transition-all`}
                        style={{ width: `${value}%` }}
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
                <p className="text-sm text-muted-foreground">{studentTests.length} tests taken</p>
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
          {/* OLQ Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">OLQ Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto h-56 w-full max-w-xs">
                <Radar data={radarData} options={radarOptions} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {(
                  [
                    { label: "Planning & Organizing", score: olqFactors.planningOrganizing.score },
                    { label: "Social Adjustment", score: olqFactors.socialAdjustment.score },
                    { label: "Social Effectiveness", score: olqFactors.socialEffectiveness.score },
                    { label: "Dynamic", score: olqFactors.dynamic.score },
                  ] as const
                ).map(({ label, score }) => (
                  <div key={label} className="rounded-lg bg-forest-50 px-3 py-2 text-center">
                    <p className="text-lg font-bold text-forest">{score}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/student/performance"
                className="mt-4 flex items-center gap-1 text-sm font-medium text-forest hover:text-forest-dark"
              >
                View full OLQ breakdown
                <ArrowRight className="size-3.5" />
              </Link>
            </CardContent>
          </Card>

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
                      task.completed ? "text-muted-foreground line-through" : "font-medium"
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

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Session 1 */}
              <div className="flex items-start gap-3 rounded-lg border px-3 py-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-forest-50">
                  <Video className="size-4 text-forest" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mock Interview with Col. Sharma</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    <span>Tomorrow, 4:00 PM</span>
                    <span className="text-border">|</span>
                    <span>1:1 Video</span>
                  </div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="flex items-start gap-3 rounded-lg border px-3 py-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rust-50">
                  <Clock className="size-4 text-rust" />
                </div>
                <div>
                  <p className="text-sm font-medium">Psychology Full Mock</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    <span>Apr 12, 10:00 AM</span>
                    <span className="text-border">|</span>
                    <span>Timed test</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

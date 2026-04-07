"use client"

import Link from "next/link"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js"
import { Radar } from "react-chartjs-2"
import {
  Lock,
  Trophy,
  Flame,
  Star,
  Swords,
  Zap,
  Shield,
  Mic,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  Calendar,
  Mail,
  BookOpen,
  Target,
  Building2,
  Hash,
  UserCheck,
} from "lucide-react"

import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import studentsData from "@/data/students.json"
import institutesData from "@/data/institutes.json"
import batchesData from "@/data/batches.json"
import olqScoresData from "@/data/olq-scores.json"

// ---------------------------------------------------------------------------
// Register Chart.js components
// ---------------------------------------------------------------------------

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STUDENT_ID = "student-001"

const LEVELS = [
  { level: 1, title: "Recruit", minXP: 0, maxXP: 999 },
  { level: 2, title: "Cadet", minXP: 1000, maxXP: 2999 },
  { level: 3, title: "Junior Leader", minXP: 3000, maxXP: 6999 },
  { level: 4, title: "Leader", minXP: 7000, maxXP: 14999 },
  { level: 5, title: "Senior Leader", minXP: 15000, maxXP: 29999 },
  { level: 6, title: "Chief", minXP: 30000, maxXP: Infinity },
]

const ALL_BADGES = [
  { id: "first-salute", name: "First Salute", icon: <Trophy className="size-5" />, color: "bg-amber-500" },
  { id: "storyteller", name: "Storyteller", icon: <BookOpen className="size-5" />, color: "bg-purple-500" },
  { id: "mind-reader", name: "Mind Reader", icon: <Star className="size-5" />, color: "bg-indigo-500" },
  { id: "iron-will", name: "Iron Will", icon: <Shield className="size-5" />, color: "bg-slate-600" },
  { id: "ai-warrior", name: "AI Warrior", icon: <Zap className="size-5" />, color: "bg-cyan-500" },
  { id: "battalion-commander", name: "Battalion Commander", icon: <Users className="size-5" />, color: "bg-forest" },
  { id: "voice-of-command", name: "Voice of Command", icon: <Mic className="size-5" />, color: "bg-rust" },
  { id: "selection-ready", name: "Selection Ready", icon: <CheckCircle2 className="size-5" />, color: "bg-emerald-500" },
  { id: "recommended", name: "Recommended", icon: <Award className="size-5" />, color: "bg-amber-600" },
  { id: "mentors-star", name: "Mentor's Star", icon: <Star className="size-5" />, color: "bg-yellow-500" },
]

// Student-001 has earned the first 7
const EARNED_BADGE_IDS = ALL_BADGES.slice(0, 7).map((b) => b.id)

const SESSIONS = [
  { title: "AI Mock Interview", date: "Apr 5, 2026", detail: "SRS +3" },
  { title: "Mentor Session: Col. Sharma", date: "Apr 3, 2026", detail: "Psychology Review" },
  { title: "SRT Practice (60 situations)", date: "Apr 2, 2026", detail: "Score: 72%" },
  { title: "TAT Practice (12 images)", date: "Mar 30, 2026", detail: "Score: 68%" },
  { title: "AI Mock Interview", date: "Mar 28, 2026", detail: "SRS +5" },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StudentProfile() {
  const { user } = useAuth()

  const student = studentsData.students.find((s) => s.id === STUDENT_ID)!
  const institute = institutesData.institutes.find((i) => i.id === student.instituteId)
  const batch = batchesData.batches.find((b) => b.id === student.batchId)
  const olqFactors = olqScoresData.current.factors

  // Level & XP calculations
  const currentLevel = LEVELS.find((l) => l.level === student.level)!
  const nextLevel = LEVELS.find((l) => l.level === student.level + 1)
  const xpCeiling = nextLevel ? nextLevel.minXP : currentLevel.maxXP
  const xpProgress = student.xp - currentLevel.minXP
  const xpRange = xpCeiling - currentLevel.minXP
  const xpPercent = Math.min(100, Math.round((xpProgress / xpRange) * 100))
  const xpToNext = xpCeiling - student.xp

  // Radar chart config
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
        ticks: { stepSize: 25, display: false },
        grid: { color: "rgba(0,0,0,0.06)" },
        angleLines: { color: "rgba(0,0,0,0.06)" },
        pointLabels: { font: { size: 11 }, color: "#475569" },
      },
    },
  }

  return (
    <div className="space-y-6">
      {/* ================================================================
          PAGE HEADER
          ================================================================ */}
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      {/* ================================================================
          1. PERSONAL INFO CARD
          ================================================================ */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left: Avatar + Name */}
            <div className="flex items-center gap-4">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-forest text-2xl font-bold text-white">
                RV
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name ?? student.name}</h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="size-3.5" />
                  {student.email}
                </p>
              </div>
            </div>

            {/* Right: Key details grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Target className="size-4 text-forest" />
                <div>
                  <p className="text-xs text-muted-foreground">Exam Type</p>
                  <p className="font-medium">{student.examType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-forest" />
                <div>
                  <p className="text-xs text-muted-foreground">Target Service</p>
                  <p className="font-medium">Army</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-rust" />
                <div>
                  <p className="text-xs text-muted-foreground">SSB Date</p>
                  <p className="font-medium">{formatDate(student.ssbDate!)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="size-4 text-rust" />
                <div>
                  <p className="text-xs text-muted-foreground">Attempt</p>
                  <p className="font-medium">#{student.attempt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-slate-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Institute</p>
                  <p className="font-medium">{institute?.name ?? "Self-prep"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="size-4 text-slate-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Batch</p>
                  <p className="font-medium">{batch?.name ?? "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="size-4 text-emerald-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge className="mt-0.5 bg-emerald-500 text-white hover:bg-emerald-600 text-[10px] px-2 py-0">
                    Active
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-slate-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Joined</p>
                  <p className="font-medium">{formatDate(student.joinedDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================
          2. LEVEL & XP CARD
          ================================================================ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Level & XP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Level stepper */}
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {LEVELS.map((lvl, idx) => {
              const isCurrent = lvl.level === student.level
              const isPast = lvl.level < student.level
              const isLast = idx === LEVELS.length - 1

              return (
                <div key={lvl.level} className="flex items-start flex-1 min-w-0">
                  <div className="flex flex-col items-center min-w-[80px]">
                    {/* Circle */}
                    <div
                      className={`flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                        isCurrent
                          ? "border-forest bg-forest text-white scale-110 ring-4 ring-forest/20"
                          : isPast
                            ? "border-forest bg-forest/10 text-forest"
                            : "border-slate-200 bg-white text-slate-400"
                      }`}
                    >
                      {lvl.level}
                    </div>
                    {/* Label */}
                    <p
                      className={`mt-1.5 text-xs text-center leading-tight ${
                        isCurrent ? "font-bold text-forest" : isPast ? "font-medium text-forest/70" : "text-slate-400"
                      }`}
                    >
                      {lvl.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground text-center">
                      {lvl.maxXP === Infinity
                        ? `${lvl.minXP.toLocaleString()}+`
                        : `${lvl.minXP.toLocaleString()}-${lvl.maxXP.toLocaleString()}`}
                    </p>
                  </div>
                  {/* Connector line */}
                  {!isLast && (
                    <div className="flex-1 mt-5 mx-1">
                      <div
                        className={`h-0.5 w-full ${
                          isPast ? "bg-forest" : isCurrent ? "bg-gradient-to-r from-forest to-slate-200" : "bg-slate-200"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* XP progress bar */}
          <div>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-semibold text-forest">
                {student.xp.toLocaleString()} / {xpCeiling.toLocaleString()} XP
              </span>
              <span className="text-muted-foreground">
                {xpToNext.toLocaleString()} XP to next level
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-forest-50">
              <div
                className="h-full rounded-full bg-forest transition-all"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================================================================
          3. BADGE COLLECTION + OLQ MINI CHART (two-col grid)
          ================================================================ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Badge Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Badges ({EARNED_BADGE_IDS.length} earned)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {ALL_BADGES.map((badge) => {
                const earned = EARNED_BADGE_IDS.includes(badge.id)
                return (
                  <div key={badge.id} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`flex size-12 items-center justify-center rounded-full transition-all ${
                        earned
                          ? `${badge.color} text-white`
                          : "bg-slate-100 text-slate-300"
                      }`}
                    >
                      {earned ? badge.icon : <Lock className="size-5" />}
                    </div>
                    <p
                      className={`text-[10px] text-center leading-tight ${
                        earned ? "font-medium text-foreground" : "text-slate-400"
                      }`}
                    >
                      {badge.name}
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* OLQ Mini Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">OLQ Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto h-52 w-full max-w-xs">
              <Radar data={radarData} options={radarOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
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
              View detailed analytics
              <ArrowRight className="size-3.5" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* ================================================================
          4. SESSION HISTORY
          ================================================================ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {SESSIONS.map((session, idx) => (
            <div
              key={`${session.title}-${idx}`}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                    session.title.includes("AI Mock")
                      ? "bg-forest-50"
                      : session.title.includes("Mentor")
                        ? "bg-amber-50"
                        : "bg-rust-50"
                  }`}
                >
                  {session.title.includes("AI Mock") ? (
                    <Zap className="size-4 text-forest" />
                  ) : session.title.includes("Mentor") ? (
                    <Users className="size-4 text-amber-600" />
                  ) : (
                    <Swords className="size-4 text-rust" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{session.title}</p>
                  <p className="text-xs text-muted-foreground">{session.date}</p>
                </div>
              </div>
              <Badge
                className={`text-xs ${
                  session.detail.startsWith("SRS")
                    ? "bg-forest/10 text-forest"
                    : session.detail.startsWith("Score")
                      ? "bg-rust-50 text-rust"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {session.detail}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

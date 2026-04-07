"use client"

import { useMemo } from "react"
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
} from "chart.js"
import { Radar, Line } from "react-chartjs-2"
import {
  TrendingUp,
  Flame,
  Target,
  ArrowUp,
  BarChart3,
  Activity,
  Shield,
  CheckCircle2,
} from "lucide-react"

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
  LinearScale
)

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STUDENT_ID = "student-001"

const OLQ_LABELS: Record<string, string> = {
  effectiveIntelligence: "Effective Intelligence",
  reasoningAbility: "Reasoning Ability",
  organizingAbility: "Organizing Ability",
  powerOfExpression: "Power of Expression",
  socialAdaptability: "Social Adaptability",
  cooperation: "Cooperation",
  senseOfResponsibility: "Sense of Responsibility",
  initiative: "Initiative",
  selfConfidence: "Self Confidence",
  speedOfDecision: "Speed of Decision",
  abilityToInfluenceGroup: "Ability to Influence Group",
  liveliness: "Liveliness",
  determination: "Determination",
  courage: "Courage",
  stamina: "Stamina",
}

const FACTOR_CONFIG = [
  {
    key: "planningOrganizing" as const,
    label: "Planning & Organizing",
    olqKeys: ["effectiveIntelligence", "reasoningAbility", "organizingAbility", "powerOfExpression"],
  },
  {
    key: "socialAdjustment" as const,
    label: "Social Adjustment",
    olqKeys: ["socialAdaptability", "cooperation", "senseOfResponsibility"],
  },
  {
    key: "socialEffectiveness" as const,
    label: "Social Effectiveness",
    olqKeys: ["initiative", "selfConfidence", "speedOfDecision", "abilityToInfluenceGroup", "liveliness"],
  },
  {
    key: "dynamic" as const,
    label: "Dynamic",
    olqKeys: ["determination", "courage", "stamina"],
  },
]

const STAGE_DETAIL: Record<string, { label: string; items: string[] }> = {
  screening: {
    label: "Screening",
    items: ["OIR Verbal & Non-Verbal", "PPDT Story Writing", "Group Narration"],
  },
  psychology: {
    label: "Psychology",
    items: ["TAT & WAT Consistency", "SRT Decision Quality", "Self Description Match"],
  },
  gto: {
    label: "GTO",
    items: ["Group Discussion", "GPE & HGT Performance", "Command Task Readiness"],
  },
  interview: {
    label: "Interview",
    items: ["Current Affairs Depth", "Self-Awareness & Clarity", "Rapid Fire Confidence"],
  },
  conference: {
    label: "Conference",
    items: ["Cross-Assessor Consistency", "Overall Impression Score"],
  },
}

function getBadgeVariant(score: number): { label: string; className: string } {
  if (score >= 70) return { label: "Strong", className: "bg-forest text-white hover:bg-forest-dark" }
  if (score >= 55) return { label: "Moderate", className: "bg-amber-500 text-white hover:bg-amber-600" }
  return { label: "Needs Work", className: "bg-rust text-white hover:bg-rust-dark" }
}

function getStageColor(pct: number): string {
  if (pct >= 70) return "bg-forest"
  if (pct >= 55) return "bg-amber-500"
  return "bg-rust"
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PerformancePage() {
  const student = studentsData.students.find((s) => s.id === STUDENT_ID)!
  const stageReadiness = student.stageReadiness as Record<string, number>
  const baseline = olqScoresData.baseline
  const current = olqScoresData.current

  // Mock test data filtered for student-001
  const studentTests = useMemo(
    () =>
      mockTestsData.mockTests
        .filter((t) => t.studentId === STUDENT_ID)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  )

  // ---------------------------------------------------------------------------
  // Radar Chart: Baseline vs Current
  // ---------------------------------------------------------------------------

  const radarData = {
    labels: ["Planning & Organizing", "Social Adjustment", "Social Effectiveness", "Dynamic"],
    datasets: [
      {
        label: `Baseline (Jan 2026)`,
        data: [
          baseline.factors.planningOrganizing.score,
          baseline.factors.socialAdjustment.score,
          baseline.factors.socialEffectiveness.score,
          baseline.factors.dynamic.score,
        ],
        backgroundColor: "rgba(42, 87, 68, 0.05)",
        borderColor: "rgba(42, 87, 68, 0.4)",
        borderWidth: 2,
        borderDash: [6, 4],
        pointBackgroundColor: "rgba(42, 87, 68, 0.4)",
        pointBorderColor: "#fff",
        pointRadius: 4,
      },
      {
        label: `Current (Apr 2026)`,
        data: [
          current.factors.planningOrganizing.score,
          current.factors.socialAdjustment.score,
          current.factors.socialEffectiveness.score,
          current.factors.dynamic.score,
        ],
        backgroundColor: "rgba(42, 87, 68, 0.15)",
        borderColor: "#2a5744",
        borderWidth: 2.5,
        pointBackgroundColor: "#2a5744",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12 },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, font: { size: 10 }, backdropColor: "transparent" },
        grid: { color: "rgba(0,0,0,0.06)" },
        angleLines: { color: "rgba(0,0,0,0.06)" },
        pointLabels: { font: { size: 12, weight: 500 as const }, color: "#334155" },
      },
    },
  }

  // ---------------------------------------------------------------------------
  // Line Chart: Mock Test Trend
  // ---------------------------------------------------------------------------

  const lineData = {
    labels: studentTests.map((t) => {
      const d = new Date(t.date)
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    }),
    datasets: [
      {
        label: "Mock Test Score",
        data: studentTests.map((t) => t.score),
        borderColor: "#2a5744",
        backgroundColor: "rgba(42, 87, 68, 0.08)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "#2a5744",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  const lineOptions = {
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
        ticks: { stepSize: 20, font: { size: 11 } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: { font: { size: 11 } },
        grid: { display: false },
      },
    },
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      {/* ==============================================================
          1. PAGE HEADER
          ============================================================== */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Performance Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your SSB readiness over time
        </p>
      </div>

      {/* ==============================================================
          2. TOP ROW — 3 STAT CARDS
          ============================================================== */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* SRS Score */}
        <Card>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Selection Readiness Score</p>
                <p className="mt-1 text-4xl font-extrabold text-forest">{student.srsScore}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    <ArrowUp className="size-3" />
                    +11 from baseline
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Target: 75+</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-forest-50">
                <Target className="size-5 text-forest" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OLQ Improvement */}
        <Card>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">OLQ Improvement</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-muted-foreground">Baseline: {baseline.overall}</span>
                  <span className="text-muted-foreground">&rarr;</span>
                  <span className="text-lg font-semibold text-forest">Current: {current.overall}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    <TrendingUp className="size-3" />
                    +{current.overall - baseline.overall} points
                  </span>
                </div>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-forest-50">
                <BarChart3 className="size-5 text-forest" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Practice Streak</p>
                <p className="mt-1 text-4xl font-extrabold text-rust">
                  {student.streak}
                  <span className="ml-1 text-lg font-semibold text-muted-foreground">days</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Best: 22 days</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-rust-50">
                <Flame className="size-5 text-rust" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ==============================================================
          3. OLQ RADAR CHART
          ============================================================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="size-5 text-forest" />
            OLQ Profile: Baseline vs Current
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto h-80 w-full max-w-lg">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </CardContent>
      </Card>

      {/* ==============================================================
          4. MOCK TEST TREND
          ============================================================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="size-5 text-forest" />
            Mock Test Score Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <Line data={lineData} options={lineOptions} />
          </div>
        </CardContent>
      </Card>

      {/* ==============================================================
          5. PER-OLQ BREAKDOWN
          ============================================================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="size-5 text-forest" />
            All 15 OLQs: Detailed Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {FACTOR_CONFIG.map((factor) => {
            const baselineFactor = baseline.factors[factor.key]
            const currentFactor = current.factors[factor.key]

            return (
              <div key={factor.key}>
                {/* Factor header */}
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-forest">
                    {factor.label}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    Factor: {baselineFactor.score} &rarr; {currentFactor.score}
                  </span>
                </div>

                {/* OLQ rows */}
                <div className="space-y-3">
                  {factor.olqKeys.map((olqKey) => {
                    const bScore = (baselineFactor.olqs as Record<string, number>)[olqKey] ?? 0
                    const cScore = (currentFactor.olqs as Record<string, number>)[olqKey] ?? 0
                    const change = cScore - bScore
                    const badge = getBadgeVariant(cScore)

                    return (
                      <div
                        key={olqKey}
                        className="grid grid-cols-[1fr_auto_auto_auto_1fr_auto] items-center gap-3 rounded-lg border px-4 py-3 sm:gap-4"
                      >
                        {/* OLQ name */}
                        <span className="text-sm font-medium text-foreground">
                          {OLQ_LABELS[olqKey] ?? olqKey}
                        </span>

                        {/* Baseline score */}
                        <span className="w-10 text-center text-xs text-muted-foreground">{bScore}</span>

                        {/* Arrow */}
                        <span className="text-muted-foreground">&rarr;</span>

                        {/* Current score */}
                        <span className="w-10 text-center text-sm font-semibold text-foreground">{cScore}</span>

                        {/* Progress bar */}
                        <div className="h-2.5 w-full rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full transition-all ${
                              cScore >= 70 ? "bg-forest" : cScore >= 55 ? "bg-amber-500" : "bg-rust"
                            }`}
                            style={{ width: `${cScore}%` }}
                          />
                        </div>

                        {/* Change + Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold ${
                              change > 0 ? "text-green-600" : change < 0 ? "text-red-500" : "text-muted-foreground"
                            }`}
                          >
                            {change > 0 ? `+${change}` : change}
                          </span>
                          <Badge className={badge.className}>{badge.label}</Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* ==============================================================
          6. STAGE READINESS DETAIL
          ============================================================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="size-5 text-forest" />
            5-Day Stage Readiness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {Object.entries(STAGE_DETAIL).map(([key, stage]) => {
              const pct = stageReadiness[key] ?? 0
              const colorClass = getStageColor(pct)

              return (
                <div
                  key={key}
                  className="rounded-xl border p-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground">{stage.label}</h4>
                    <span className="text-lg font-bold text-foreground">{pct}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 h-2.5 w-full rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${colorClass}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Sub-items */}
                  <ul className="mt-3 space-y-1">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

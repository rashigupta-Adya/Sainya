"use client"

import { useAuth } from "@/lib/auth"
import mockTestData from "@/data/mock-tests.json"
import studentsData from "@/data/students.json"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ClipboardList,
  Calculator,
  BookOpen,
  Shield,
  Brain,
  Users,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const TEST_NAME_MAP: Record<string, string> = {
  "nda-math": "NDA Paper 1: Mathematics",
  "nda-gat": "NDA Paper 2: GAT",
  "nda-full": "NDA Full Mock",
  "ssb-screening": "SSB Screening Mock",
  "ssb-psychology": "SSB Psychology Mock",
  "ssb-full-mock": "SSB Full Mock",
}

function scoreColor(score: number): string {
  if (score >= 60) return "text-forest"
  if (score >= 45) return "text-amber-600"
  return "text-rust"
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function MockTestsPage() {
  const { user } = useAuth()

  const studentId = user?.id ?? ""
  const student = studentsData.students.find((s) => s.id === studentId)
  const studentPath = student?.path ?? user?.studentPath ?? "ssb"

  const results = mockTestData.mockTests
    .filter((t) => t.studentId === studentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  /* ---------------------------------------------------------------- */
  /* NDA Available Tests                                              */
  /* ---------------------------------------------------------------- */

  const ndaTests = [
    {
      title: "NDA Full Mock Test",
      icon: ClipboardList,
      details: "2 Papers | 270 Questions | 5 Hours",
      description: "Matches real NDA exam pattern with negative marking",
    },
    {
      title: "NDA Paper 1: Mathematics",
      icon: Calculator,
      details: "120 Questions | 2.5 Hours",
      description: "Algebra, Trig, Calculus, Geometry, Statistics",
    },
    {
      title: "NDA Paper 2: GAT",
      icon: BookOpen,
      details: "150 Questions | 2.5 Hours",
      description: "English, GK, Physics, Chemistry",
    },
  ]

  /* ---------------------------------------------------------------- */
  /* SSB Stage Mocks                                                  */
  /* ---------------------------------------------------------------- */

  const ssbMocks = [
    {
      title: "Screening Mock",
      icon: Shield,
      details: "OIR + PPDT | 60 Minutes",
      description: "Verbal, non-verbal reasoning and picture perception",
    },
    {
      title: "Psychology Mock",
      icon: Brain,
      details: "TAT + WAT + SRT + SD | 3 Hours",
      description: "Full psychology battery with timed sections",
    },
    {
      title: "Full SSB Simulation",
      icon: Users,
      details: "5 Stages | Full Day",
      description: "End-to-end SSB simulation across all stages",
    },
  ]

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Mock Tests</h2>
        <p className="text-sm text-slate-500 mt-1">
          Practice with real exam patterns
        </p>
      </div>

      {/* Section 1: Available Tests */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Available Tests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ndaTests.map((test) => (
            <Card key={test.title}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center">
                    <test.icon className="w-5 h-5 text-forest" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    Free
                  </Badge>
                </div>
                <CardTitle className="mt-2">{test.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs font-medium text-slate-500">
                  {test.details}
                </p>
                <p className="text-sm text-slate-600">{test.description}</p>
                <Button
                  className="w-full bg-rust text-white hover:bg-rust-dark"
                  onClick={() =>
                    alert(`Starting ${test.title}... (coming in next release)`)
                  }
                >
                  Start Test
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 2: Past Results */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Past Results</h3>

        {results.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-sm text-slate-500">No tests taken yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-left">
                  <th className="px-4 py-3 font-medium text-slate-600">Test</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Date</th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Score
                  </th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Percentile
                  </th>
                  <th className="px-4 py-3 font-medium text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={`${r.testType}-${r.date}`}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {TEST_NAME_MAP[r.testType] ?? r.testType}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(r.date)}
                    </td>
                    <td className={`px-4 py-3 font-semibold ${scoreColor(r.score)}`}>
                      {r.score}%
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {r.percentile}th
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          alert(
                            `Review for ${TEST_NAME_MAP[r.testType] ?? r.testType} on ${formatDate(r.date)} — coming soon`
                          )
                        }
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Section 3: SSB Stage Mocks */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">
          SSB Stage Mocks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ssbMocks.map((mock) => (
            <Card key={mock.title} className="opacity-75">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <mock.icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="mt-2">{mock.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs font-medium text-slate-500">
                  {mock.details}
                </p>
                <p className="text-sm text-slate-600">{mock.description}</p>
                <Button
                  className="w-full"
                  variant="secondary"
                  disabled
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

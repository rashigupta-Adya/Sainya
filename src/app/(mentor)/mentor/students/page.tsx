"use client"

import {
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowRight,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import studentsData from "@/data/students.json"

// ---------------------------------------------------------------------------
// Assigned students (inst-001, SSB path)
// ---------------------------------------------------------------------------

const assignedIds = ["student-001", "student-003", "student-004"]
const assignedStudents = studentsData.students.filter((s) =>
  assignedIds.includes(s.id)
)

// ---------------------------------------------------------------------------
// Per-student hardcoded mentor context (OLQ summary, last session, trend)
// ---------------------------------------------------------------------------

interface MentorStudentContext {
  strengths: string[]
  gaps: string[]
  lastSession: string
  srsTrend: "up" | "down"
}

const mentorContext: Record<string, MentorStudentContext> = {
  "student-001": {
    strengths: ["Effective Intelligence", "Courage", "Determination"],
    gaps: ["Social Adaptability", "Cooperation", "Group Influence"],
    lastSession: "Apr 5, 2026",
    srsTrend: "up",
  },
  "student-003": {
    strengths: ["Reasoning Ability", "Determination", "Self Confidence"],
    gaps: ["Initiative", "Social Adaptability", "Liveliness"],
    lastSession: "Apr 3, 2026",
    srsTrend: "down",
  },
  "student-004": {
    strengths: ["Initiative", "Group Influence", "Stamina"],
    gaps: ["Courage", "Effective Intelligence", "Power of Expression"],
    lastSession: "Apr 4, 2026",
    srsTrend: "up",
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MentorStudentsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold">My Students</h2>
        <p className="text-sm text-muted-foreground">
          {assignedStudents.length} students assigned to you
        </p>
      </div>

      {/* Student Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assignedStudents.map((student) => {
          const ctx = mentorContext[student.id]
          const srs = student.srsScore ?? 0
          return (
            <Card key={student.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge className="bg-forest/10 text-forest hover:bg-forest/10 text-xs">
                        {student.examType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Attempt {student.attempt}
                      </span>
                    </div>
                  </div>
                  {/* SRS score */}
                  <div className="flex items-center gap-1 text-right">
                    <div>
                      <p className="text-xl font-bold tabular-nums">{srs}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                        SRS
                      </p>
                    </div>
                    {ctx.srsTrend === "up" ? (
                      <TrendingUp className="size-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="size-4 text-rust" />
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* OLQ Summary */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Top Strengths
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {ctx.strengths.map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 bg-emerald-50 text-emerald-700"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Focus Areas
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {ctx.gaps.map((g) => (
                        <Badge
                          key={g}
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 bg-amber-50 text-amber-700"
                        >
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Last Session */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  <span>Last session: {ctx.lastSession}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 gap-1.5 bg-forest text-white hover:bg-forest-dark"
                  >
                    View Full Dossier
                    <ArrowRight className="size-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-forest/30 text-forest hover:bg-forest-50"
                  >
                    Schedule Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Play,
  Lock,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ModuleStatus = "completed" | "in-progress" | "not-started"

interface Module {
  name: string
  status: ModuleStatus
  progress: number
}

interface Subject {
  name: string
  modules: Module[]
}

interface Paper {
  name: string
  marks: number
  subjects: Subject[]
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ndaCurriculum: Paper[] = [
  {
    name: "Paper 1: Mathematics",
    marks: 300,
    subjects: [
      {
        name: "Algebra",
        modules: [
          { name: "Quadratic Equations", status: "completed", progress: 100 },
          { name: "Progressions", status: "completed", progress: 100 },
          { name: "Complex Numbers", status: "in-progress", progress: 60 },
          { name: "Matrices", status: "in-progress", progress: 40 },
          { name: "Determinants", status: "not-started", progress: 0 },
          { name: "Probability", status: "not-started", progress: 0 },
        ],
      },
      {
        name: "Trigonometry",
        modules: [
          { name: "Trig Ratios", status: "completed", progress: 100 },
          { name: "Identities", status: "in-progress", progress: 75 },
          { name: "Inverse Functions", status: "not-started", progress: 0 },
          { name: "Height & Distance", status: "not-started", progress: 0 },
        ],
      },
      {
        name: "Calculus",
        modules: [
          { name: "Limits", status: "completed", progress: 100 },
          { name: "Differentiation", status: "not-started", progress: 0 },
          { name: "Integration", status: "not-started", progress: 0 },
          { name: "Differential Equations", status: "not-started", progress: 0 },
        ],
      },
      {
        name: "Geometry",
        modules: [
          { name: "Coordinate Geometry", status: "completed", progress: 100 },
          { name: "2D Geometry", status: "in-progress", progress: 80 },
          { name: "3D Geometry", status: "not-started", progress: 0 },
        ],
      },
      {
        name: "Statistics",
        modules: [
          { name: "Mean/Median/Mode", status: "completed", progress: 100 },
          { name: "Variance & SD", status: "in-progress", progress: 50 },
        ],
      },
    ],
  },
  {
    name: "Paper 2: GAT",
    marks: 600,
    subjects: [
      {
        name: "English",
        modules: [
          { name: "Grammar", status: "completed", progress: 100 },
          { name: "Vocabulary", status: "in-progress", progress: 80 },
          { name: "Comprehension", status: "in-progress", progress: 65 },
          { name: "Spotting Errors", status: "in-progress", progress: 45 },
          { name: "Sentence Correction", status: "not-started", progress: 0 },
        ],
      },
      {
        name: "General Knowledge",
        modules: [
          { name: "Indian History", status: "in-progress", progress: 55 },
          { name: "Geography", status: "in-progress", progress: 40 },
          { name: "Current Affairs", status: "in-progress", progress: 35 },
          { name: "Physics", status: "in-progress", progress: 20 },
          { name: "Chemistry", status: "in-progress", progress: 10 },
        ],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSubjectCompletion(subject: Subject): number {
  if (subject.modules.length === 0) return 0
  const total = subject.modules.reduce((sum, m) => sum + m.progress, 0)
  return Math.round(total / subject.modules.length)
}

function getPaperCompletion(paper: Paper): number {
  const allModules = paper.subjects.flatMap((s) => s.modules)
  if (allModules.length === 0) return 0
  const total = allModules.reduce((sum, m) => sum + m.progress, 0)
  return Math.round(total / allModules.length)
}

function statusConfig(status: ModuleStatus) {
  switch (status) {
    case "completed":
      return {
        icon: <CheckCircle2 className="size-4 text-emerald-600" />,
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        label: "Completed",
        barColor: "bg-emerald-500",
      }
    case "in-progress":
      return {
        icon: <Circle className="size-4 fill-amber-400 text-amber-500" />,
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        label: "In Progress",
        barColor: "bg-amber-500",
      }
    case "not-started":
      return {
        icon: <Circle className="size-4 text-slate-300" />,
        badgeClass: "bg-slate-50 text-slate-500 border-slate-200",
        label: "Not Started",
        barColor: "bg-slate-300",
      }
  }
}

function progressBarColor(pct: number): string {
  if (pct >= 75) return "bg-emerald-500"
  if (pct >= 40) return "bg-amber-500"
  return "bg-slate-300"
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ModuleRow({ module }: { module: Module }) {
  const cfg = statusConfig(module.status)
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3 transition-colors hover:bg-slate-50">
      {cfg.icon}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-800">{module.name}</p>
        <div className="mt-1.5 flex items-center gap-3">
          <div className="h-1.5 w-full max-w-[160px] rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all ${cfg.barColor}`}
              style={{ width: `${module.progress}%` }}
            />
          </div>
          <span className="text-xs tabular-nums text-slate-400">
            {module.progress}%
          </span>
        </div>
      </div>
      <span
        className={`hidden rounded-full border px-2 py-0.5 text-[11px] font-medium sm:inline-block ${cfg.badgeClass}`}
      >
        {cfg.label}
      </span>
      {module.status === "not-started" ? (
        <Button variant="outline" size="sm" className="ml-2 gap-1 text-xs">
          <Play className="size-3" />
          Start
        </Button>
      ) : module.status === "in-progress" ? (
        <Button variant="outline" size="sm" className="ml-2 gap-1 text-xs text-forest border-forest/30 hover:bg-forest-50">
          <Play className="size-3" />
          Continue
        </Button>
      ) : null}
    </div>
  )
}

function SubjectSection({ subject }: { subject: Subject }) {
  const [expanded, setExpanded] = useState(false)
  const completion = getSubjectCompletion(subject)

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 bg-slate-50/80 px-4 py-3 text-left transition-colors hover:bg-slate-100"
      >
        {expanded ? (
          <ChevronDown className="size-4 shrink-0 text-slate-500" />
        ) : (
          <ChevronRight className="size-4 shrink-0 text-slate-500" />
        )}
        <div className="min-w-0 flex-1">
          <span className="text-sm font-semibold text-slate-800">
            {subject.name}
          </span>
          <span className="ml-2 text-xs text-slate-400">
            {subject.modules.length} modules
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden h-1.5 w-24 rounded-full bg-slate-200 sm:block">
            <div
              className={`h-full rounded-full transition-all ${progressBarColor(completion)}`}
              style={{ width: `${completion}%` }}
            />
          </div>
          <span
            className={`text-sm font-semibold tabular-nums ${
              completion >= 75
                ? "text-emerald-600"
                : completion >= 40
                  ? "text-amber-600"
                  : "text-slate-400"
            }`}
          >
            {completion}%
          </span>
        </div>
      </button>

      {expanded && (
        <div className="space-y-2 bg-white p-3">
          {subject.modules.map((mod) => (
            <ModuleRow key={mod.name} module={mod} />
          ))}
        </div>
      )}
    </div>
  )
}

function PaperCard({ paper }: { paper: Paper }) {
  const [expanded, setExpanded] = useState(true)
  const completion = getPaperCompletion(paper)

  return (
    <Card>
      <CardHeader>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-3 text-left"
        >
          {expanded ? (
            <ChevronDown className="size-5 shrink-0 text-slate-500" />
          ) : (
            <ChevronRight className="size-5 shrink-0 text-slate-500" />
          )}
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base font-bold text-slate-900">
              {paper.name}
            </CardTitle>
            <p className="mt-0.5 text-xs text-slate-500">
              {paper.marks} marks &middot;{" "}
              {paper.subjects.reduce((n, s) => n + s.modules.length, 0)} modules
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden h-2 w-28 rounded-full bg-slate-200 md:block">
              <div
                className={`h-full rounded-full transition-all ${progressBarColor(completion)}`}
                style={{ width: `${completion}%` }}
              />
            </div>
            <span
              className={`text-lg font-bold tabular-nums ${
                completion >= 75
                  ? "text-emerald-600"
                  : completion >= 40
                    ? "text-amber-600"
                    : "text-slate-400"
              }`}
            >
              {completion}%
            </span>
          </div>
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-3 pt-0">
          {paper.subjects.map((subject) => (
            <SubjectSection key={subject.name} subject={subject} />
          ))}
        </CardContent>
      )}
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CurriculumPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Written Exam Curriculum</h2>
        <p className="mt-1 text-sm text-slate-500">
          Track your preparation across papers, subjects, and individual modules
        </p>
      </div>

      {/* Exam tabs */}
      <Tabs defaultValue="nda">
        <TabsList>
          <TabsTrigger value="nda">NDA</TabsTrigger>
          <TabsTrigger value="cds" disabled>
            CDS
            <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">
              Soon
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="afcat" disabled>
            AFCAT
            <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">
              Soon
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* NDA content */}
        <TabsContent value="nda" className="mt-4 space-y-6">
          {/* Summary strip */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ndaCurriculum.map((paper) => {
              const pct = getPaperCompletion(paper)
              const total = paper.subjects.reduce(
                (n, s) => n + s.modules.length,
                0
              )
              const done = paper.subjects
                .flatMap((s) => s.modules)
                .filter((m) => m.status === "completed").length
              return (
                <div
                  key={paper.name}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-forest-50">
                    <BookOpen className="size-5 text-forest" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {paper.name.replace("Paper 1: ", "").replace("Paper 2: ", "")}
                    </p>
                    <p className="text-xs text-slate-400">
                      {done}/{total} completed
                    </p>
                  </div>
                  <span
                    className={`text-lg font-bold tabular-nums ${
                      pct >= 75
                        ? "text-emerald-600"
                        : pct >= 40
                          ? "text-amber-600"
                          : "text-slate-400"
                    }`}
                  >
                    {pct}%
                  </span>
                </div>
              )
            })}
            {/* Overall */}
            {(() => {
              const allModules = ndaCurriculum.flatMap((p) =>
                p.subjects.flatMap((s) => s.modules)
              )
              const overall = Math.round(
                allModules.reduce((s, m) => s + m.progress, 0) /
                  allModules.length
              )
              const done = allModules.filter(
                (m) => m.status === "completed"
              ).length
              return (
                <div className="flex items-center gap-3 rounded-xl border border-forest/20 bg-forest-50 px-4 py-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-forest/10">
                    <CheckCircle2 className="size-5 text-forest" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Overall
                    </p>
                    <p className="text-xs text-slate-500">
                      {done}/{allModules.length} completed
                    </p>
                  </div>
                  <span className="text-lg font-bold tabular-nums text-forest">
                    {overall}%
                  </span>
                </div>
              )
            })()}
          </div>

          {/* Paper cards */}
          {ndaCurriculum.map((paper) => (
            <PaperCard key={paper.name} paper={paper} />
          ))}
        </TabsContent>

        {/* Disabled tab content */}
        <TabsContent value="cds">
          <ComingSoonPanel exam="CDS" />
        </TabsContent>
        <TabsContent value="afcat">
          <ComingSoonPanel exam="AFCAT" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ComingSoonPanel({ exam }: { exam: string }) {
  return (
    <Card className="mt-4 border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-slate-50">
          <Lock className="size-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">
          {exam} Curriculum
        </h3>
        <p className="mt-1 max-w-md text-sm text-slate-500">
          {exam} exam preparation modules are being developed and will be
          available soon.
        </p>
        <Badge variant="secondary" className="mt-4">
          Coming Soon
        </Badge>
      </CardContent>
    </Card>
  )
}

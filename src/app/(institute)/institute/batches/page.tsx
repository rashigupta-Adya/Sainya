"use client"

import { Plus, CheckCircle2, Clock, CircleDot } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import batchesData from "@/data/batches.json"
import mentorsData from "@/data/mentors.json"

// ---------------------------------------------------------------------------
// Data for inst-001
// ---------------------------------------------------------------------------

const instBatches = batchesData.batches.filter(
  (b) => b.instituteId === "inst-001"
)

const mentorMap = Object.fromEntries(
  mentorsData.mentors.map((m) => [m.id, m.name])
)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function modeBadge(mode: string) {
  if (mode === "hybrid") {
    return (
      <Badge className="bg-forest-50 text-forest border-forest/20">
        Hybrid
      </Badge>
    )
  }
  return (
    <Badge className="bg-rust-50 text-rust border-rust/20">Online</Badge>
  )
}

function milestoneIcon(status: string) {
  if (status === "completed") {
    return <CheckCircle2 className="size-4 text-emerald-500" />
  }
  if (status === "in_progress") {
    return <CircleDot className="size-4 text-amber-500" />
  }
  return <Clock className="size-4 text-slate-300" />
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function InstituteBatchesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Batch Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage training batches
          </p>
        </div>
        <Button className="bg-forest text-white hover:bg-forest-dark">
          <Plus className="mr-1.5 size-4" />
          Create New Batch
        </Button>
      </div>

      {/* Batch Cards */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {instBatches.map((batch) => {
          const mentorNames = batch.mentorIds
            .map((id) => mentorMap[id] ?? id)
            .join(", ")

          return (
            <Card key={batch.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{batch.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {batch.startDate} &mdash;{" "}
                      {batch.targetSSBDate ?? "Ongoing"}
                    </p>
                  </div>
                  {modeBadge(batch.mode)}
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold tabular-nums">
                      {batch.studentCount}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      Students
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-bold tabular-nums">
                      <span
                        className={
                          (batch.avgSRS ?? 0) >= 55
                            ? "text-forest"
                            : "text-rust"
                        }
                      >
                        {batch.avgSRS ?? "--"}
                      </span>
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      Avg SRS
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-bold tabular-nums">
                      {batch.avgMockScore ?? "--"}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                      Mock Score
                    </p>
                  </div>
                </div>

                {/* Mentors */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">
                    Mentors
                  </p>
                  <p className="text-xs text-slate-700">{mentorNames}</p>
                </div>

                {/* Milestone Timeline */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    Milestones
                  </p>
                  <div className="space-y-1.5">
                    {batch.milestones.map((ms, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {milestoneIcon(ms.status)}
                        <span
                          className={`text-xs flex-1 ${ms.status === "completed" ? "text-slate-500 line-through" : ms.status === "in_progress" ? "text-slate-800 font-medium" : "text-slate-400"}`}
                        >
                          {ms.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          {ms.targetDate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  Manage Batch
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

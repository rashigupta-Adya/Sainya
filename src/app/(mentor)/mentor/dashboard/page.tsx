"use client"

import { useAuth } from "@/lib/auth"
import {
  Calendar,
  ClipboardCheck,
  Users,
  IndianRupee,
  Star,
  AlertTriangle,
  TrendingUp,
  Video,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import mentorsData from "@/data/mentors.json"

// ---------------------------------------------------------------------------
// Mentor data
// ---------------------------------------------------------------------------

const mentor = mentorsData.mentors.find((m) => m.id === "mentor-001")!

const kpis = [
  {
    title: "Today's Sessions",
    value: 2,
    icon: Calendar,
    color: "text-forest",
    bg: "bg-forest-50",
  },
  {
    title: "Pending Evaluations",
    value: 5,
    icon: ClipboardCheck,
    color: "text-rust",
    bg: "bg-rust-50",
  },
  {
    title: "Students Assigned",
    value: 3,
    icon: Users,
    color: "text-forest",
    bg: "bg-forest-50",
  },
  {
    title: "Earnings This Month",
    value: `₹${mentor.monthlyEarnings.toLocaleString("en-IN")}`,
    icon: IndianRupee,
    color: "text-rust",
    bg: "bg-rust-50",
  },
]

const todaySessions = [
  {
    time: "10:00 AM",
    student: "Rahul Verma",
    type: "Mock Interview",
    mode: "1:1",
  },
  {
    time: "2:00 PM",
    student: "AFCAT Batch",
    type: "Group Discussion",
    mode: "Group",
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MentorDashboard() {
  const { user } = useAuth()

  const displayName = user?.name?.split(" ").slice(0, 2).join(" ") ?? "Mentor"

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold">Welcome, {displayName}</h2>
        <p className="text-sm text-muted-foreground">
          Your mentor dashboard for today
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="flex items-start gap-3">
              <div className={`rounded-lg p-2 ${kpi.bg}`}>
                <kpi.icon className={`size-5 ${kpi.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold tabular-nums">{kpi.value}</p>
                <p className="text-sm font-medium text-foreground">
                  {kpi.title}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-column: Schedule + Alerts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-forest" />
              <CardTitle>Today&apos;s Schedule</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySessions.map((session) => (
              <div
                key={session.time}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {session.time} &mdash; {session.student}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {session.type}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {session.mode}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="ml-3 gap-1.5 bg-forest text-white hover:bg-forest-dark"
                >
                  <Video className="size-3.5" />
                  Join Session
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Student Alerts */}
        <Card className="border-amber-300 ring-amber-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-amber-500" />
              <CardTitle>Student Alerts</CardTitle>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                1
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Amit Singh: SRS dropped 5 points this week
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Consider scheduling an extra session.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="ml-3 border-rust/30 text-rust hover:bg-rust-50"
              >
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-forest" />
            <CardTitle>Quick Stats</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
                <Star className="size-5 text-amber-500" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold tabular-nums">
                    {mentor.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">/ 5</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div className="ml-1 flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i <= Math.round(mentor.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Total Sessions */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-forest-50">
                <Calendar className="size-5 text-forest" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums">
                  {mentor.sessionsCompleted}
                </p>
                <p className="text-xs text-muted-foreground">Total Sessions</p>
              </div>
            </div>

            {/* Students Improved */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-forest-50">
                <Users className="size-5 text-forest" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums">42</p>
                <p className="text-xs text-muted-foreground">
                  Students Improved
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

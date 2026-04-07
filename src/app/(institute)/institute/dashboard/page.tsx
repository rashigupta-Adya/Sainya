"use client"

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
  GraduationCap,
  Layers,
  UserCheck,
  Bot,
  AlertTriangle,
  Plus,
  FileText,
  BarChart3,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import institutesData from "@/data/institutes.json"
import studentsData from "@/data/students.json"
import batchesData from "@/data/batches.json"
import mentorsData from "@/data/mentors.json"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

// ---------------------------------------------------------------------------
// Data for inst-001
// ---------------------------------------------------------------------------

const institute = institutesData.institutes.find((i) => i.id === "inst-001")!
const instStudents = studentsData.students.filter(
  (s) => s.instituteId === "inst-001"
)
const instBatches = batchesData.batches.filter(
  (b) => b.instituteId === "inst-001"
)
const instMentors = mentorsData.mentors.filter((m) =>
  m.affiliatedInstitutes.includes("inst-001")
)

// KPI data
const aiUsed = 342
const aiQuota = 500
const aiPct = Math.round((aiUsed / aiQuota) * 100)

const kpis = [
  {
    title: "Total Students",
    value: instStudents.length,
    subtitle: `${instStudents.filter((s) => s.status === "active").length} active`,
    icon: GraduationCap,
    color: "text-forest",
    bg: "bg-forest-50",
  },
  {
    title: "Active Batches",
    value: instBatches.filter((b) => b.status === "active").length,
    subtitle: `${instBatches.length} total`,
    icon: Layers,
    color: "text-forest",
    bg: "bg-forest-50",
  },
  {
    title: "Assigned Mentors",
    value: instMentors.length,
    subtitle: `${instMentors.filter((m) => m.verified).length} verified`,
    icon: UserCheck,
    color: "text-rust",
    bg: "bg-rust-50",
  },
  {
    title: "AI Sessions",
    value: `${aiUsed}/${aiQuota}`,
    subtitle: `${aiPct}% used this month`,
    icon: Bot,
    color: "text-rust",
    bg: "bg-rust-50",
    showProgress: true,
  },
]

// Top 5 students by SRS / readiness
const topStudents = [...instStudents]
  .map((s) => ({
    name: s.name.split(" ")[0],
    score:
      s.path === "ssb"
        ? ((s as (typeof instStudents)[0]).srsScore ?? 0)
        : ((s as (typeof instStudents)[0]).examReadiness ?? 0),
  }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 5)

const chartData = {
  labels: topStudents.map((s) => s.name),
  datasets: [
    {
      label: "SRS / Readiness",
      data: topStudents.map((s) => s.score),
      backgroundColor: "#2a5744",
      borderRadius: 4,
      barThickness: 32,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      grid: { color: "rgba(0,0,0,0.05)" },
      ticks: { font: { size: 12 } },
    },
    x: {
      grid: { display: false },
      ticks: { font: { size: 12 } },
    },
  },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function InstituteDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Institute Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">{institute.name}</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="flex items-start gap-3">
              <div className={`rounded-lg p-2 ${kpi.bg}`}>
                <kpi.icon className={`size-5 ${kpi.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-bold tabular-nums">{kpi.value}</p>
                <p className="text-sm font-medium text-foreground">
                  {kpi.title}
                </p>
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
                {"showProgress" in kpi && kpi.showProgress && (
                  <div className="mt-2 h-2 w-full rounded-full bg-rust-50">
                    <div
                      className="h-full rounded-full bg-rust transition-all"
                      style={{ width: `${aiPct}%` }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card className="border-amber-300 ring-amber-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-500" />
            <CardTitle>Alerts</CardTitle>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
              2
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">
                2 students inactive this week
              </p>
              <p className="text-xs text-muted-foreground">
                Kavita Reddy has not logged in for 7 days
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              View
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">
                Psychology Mock scheduled Apr 10
              </p>
              <p className="text-xs text-muted-foreground">
                NDA SSB Prep May 2026 batch &middot; 18 students
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-forest/30 text-forest hover:bg-forest-50"
            >
              Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-column: Batch Overview + Student Performance */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Batch Overview Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-forest" />
              <CardTitle>Batch Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs font-medium text-muted-foreground">
                    <th className="pb-2 pr-4">Batch</th>
                    <th className="pb-2 pr-4 text-right">Students</th>
                    <th className="pb-2 pr-4 text-right">Avg SRS</th>
                    <th className="pb-2 pr-4">Target</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {instBatches.map((batch) => (
                    <tr key={batch.id} className="border-b last:border-0">
                      <td className="py-2.5 pr-4">
                        <p className="font-medium">{batch.name}</p>
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">
                        {batch.studentCount}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">
                        <span
                          className={
                            (batch.avgSRS ?? 0) >= 55
                              ? "font-medium text-forest"
                              : "font-medium text-rust"
                          }
                        >
                          {batch.avgSRS ?? "--"}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-xs text-muted-foreground">
                        {batch.targetSSBDate ?? "Written exam"}
                      </td>
                      <td className="py-2.5">
                        <Badge
                          className={
                            batch.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }
                        >
                          {batch.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Student Performance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4 text-forest" />
              <CardTitle>Top Students by SRS</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-forest text-white hover:bg-forest-dark">
          <Plus className="mr-1.5 size-4" />
          Add Student
        </Button>
        <Button className="bg-forest text-white hover:bg-forest-dark">
          <Layers className="mr-1.5 size-4" />
          Create Batch
        </Button>
        <Button variant="outline">
          <FileText className="mr-1.5 size-4" />
          View Reports
        </Button>
      </div>
    </div>
  )
}

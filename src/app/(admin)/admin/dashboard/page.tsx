"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import {
  Users,
  Building2,
  UserCheck,
  IndianRupee,
  AlertTriangle,
  TrendingUp,
  Bot,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import institutesData from "@/data/institutes.json"
import mentorsData from "@/data/mentors.json"
import studentsData from "@/data/students.json"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const totalStudents = studentsData.students.length
const activeInstitutes = institutesData.institutes.filter(
  (i) => i.status === "active"
)
const pendingInstitutes = institutesData.institutes.filter(
  (i) => i.status === "pending_approval"
)
const verifiedMentors = mentorsData.mentors.filter((m) => m.verified)
const pendingMentors = mentorsData.mentors.filter(
  (m) => m.status === "pending_verification"
)

const pendingActions = [
  ...pendingInstitutes.map((i) => ({
    type: "institute" as const,
    label: `${i.name} (${i.city}) — Pending Approval`,
    sublabel: `Applied ${i.joinedDate} · Plan: ${i.plan}`,
  })),
  ...pendingMentors.map((m) => ({
    type: "mentor" as const,
    label: `${m.name} — Pending Verification`,
    sublabel: `${m.background} · ${m.experience}`,
  })),
]

const activeInstitutesSorted = [...activeInstitutes].sort(
  (a, b) => b.studentCount - a.studentCount
)

const aiUsage = [
  {
    name: "Cavalier Defence Academy",
    used: 342,
    quota: 500,
  },
  {
    name: "Olive Greens Academy",
    used: 180,
    quota: 250,
  },
]

const kpis = [
  {
    title: "Total Students",
    value: totalStudents,
    subtitle: "across all institutes",
    icon: Users,
    color: "text-forest",
    bg: "bg-forest-50",
  },
  {
    title: "Active Institutes",
    value: activeInstitutes.length,
    subtitle: `${pendingInstitutes.length} pending approval`,
    icon: Building2,
    color: "text-forest",
    bg: "bg-forest-50",
  },
  {
    title: "Verified Mentors",
    value: verifiedMentors.length,
    subtitle: `${pendingMentors.length} pending verification`,
    icon: UserCheck,
    color: "text-rust",
    bg: "bg-rust-50",
  },
  {
    title: "Platform MRR",
    value: "₹2,40,000",
    subtitle: "+18% from last month",
    icon: IndianRupee,
    color: "text-rust",
    bg: "bg-rust-50",
  },
]

const chartData = {
  labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Students",
      data: [12, 28, 45, 52, 63, 73],
      borderColor: "#2a5744",
      backgroundColor: "rgba(42, 87, 68, 0.1)",
      fill: true,
      tension: 0.3,
      pointBackgroundColor: "#2a5744",
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: "rgba(0,0,0,0.05)" },
      ticks: { font: { size: 12 } },
    },
    x: {
      grid: { display: false },
      ticks: { font: { size: 12 } },
    },
  },
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold">Platform Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Overview of all platform activity
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
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Actions */}
      {pendingActions.length > 0 && (
        <Card className="border-amber-300 ring-amber-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-amber-500" />
              <CardTitle>Requires Your Attention</CardTitle>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                {pendingActions.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingActions.map((action, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.sublabel}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-forest text-white hover:bg-forest-dark"
                >
                  Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Two-column: Chart + Table */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Student Growth Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-forest" />
              <CardTitle>Student Growth (6 months)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Institute Performance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-forest" />
              <CardTitle>Institute Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs font-medium text-muted-foreground">
                    <th className="pb-2 pr-4">Institute</th>
                    <th className="pb-2 pr-4 text-right">Students</th>
                    <th className="pb-2 pr-4 text-right">Avg SRS</th>
                    <th className="pb-2 text-right">Rec. Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInstitutesSorted.map((inst) => (
                    <tr key={inst.id} className="border-b last:border-0">
                      <td className="py-2.5 pr-4">
                        <p className="font-medium">{inst.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {inst.city}
                        </p>
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">
                        {inst.studentCount}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">
                        <span
                          className={
                            inst.avgSRS >= 55
                              ? "text-forest font-medium"
                              : "text-rust font-medium"
                          }
                        >
                          {inst.avgSRS}
                        </span>
                      </td>
                      <td className="py-2.5 text-right tabular-nums">
                        {inst.recommendationRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Usage Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bot className="size-4 text-forest" />
            <CardTitle>AI Session Usage This Month</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiUsage.map((inst) => {
            const pct = Math.round((inst.used / inst.quota) * 100)
            return (
              <div key={inst.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{inst.name}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {inst.used}/{inst.quota} sessions ({pct}%)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-forest-50">
                  <div
                    className="h-full rounded-full bg-forest transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-sm font-medium text-muted-foreground">
              Total AI cost this month
            </span>
            <span className="text-lg font-bold text-rust">₹12,400</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

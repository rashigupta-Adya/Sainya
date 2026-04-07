"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import data from "@/data/students.json"

const students = data.students

type FilterTab = "all" | "ssb" | "written" | "active" | "inactive"

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ssb", label: "SSB Path" },
  { key: "written", label: "Written Path" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
]

function pathBadge(path: string) {
  if (path === "ssb") {
    return (
      <Badge className="bg-forest-50 text-forest border-forest/20">SSB</Badge>
    )
  }
  return (
    <Badge className="bg-rust-50 text-rust border-rust/20">Written</Badge>
  )
}

function statusBadge(status: string) {
  if (status === "active") {
    return (
      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
        Active
      </Badge>
    )
  }
  return (
    <Badge className="bg-slate-100 text-slate-500 border-slate-200">
      Inactive
    </Badge>
  )
}

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all")
  const [search, setSearch] = useState("")

  const filtered = students.filter((s) => {
    // tab filter
    if (activeTab === "ssb" && s.path !== "ssb") return false
    if (activeTab === "written" && s.path !== "written") return false
    if (activeTab === "active" && s.status !== "active") return false
    if (activeTab === "inactive" && s.status !== "inactive") return false
    // search filter
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()))
      return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">All Students</h2>
        <p className="mt-1 text-sm text-slate-500">
          Platform-wide student overview
        </p>
      </div>

      {/* Filter tabs and search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              size="sm"
              variant={activeTab === tab.key ? "default" : "outline"}
              className={
                activeTab === tab.key
                  ? "bg-forest text-white hover:bg-forest-dark"
                  : ""
              }
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by name..."
            className="pl-8"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Path</th>
                <th className="px-4 py-3">Exam Type</th>
                <th className="px-4 py-3">Institute</th>
                <th className="px-4 py-3 text-right">SRS / Readiness</th>
                <th className="px-4 py-3 text-right">XP</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3 text-right">Streak</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((student) => {
                const readiness =
                  student.path === "ssb"
                    ? (student as typeof students[0]).srsScore
                    : (student as typeof students[1]).examReadiness
                const instituteLabel = student.instituteId ?? "B2C"

                return (
                  <tr
                    key={student.id}
                    className="transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {student.name}
                    </td>
                    <td className="px-4 py-3">{pathBadge(student.path)}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {student.examType}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {instituteLabel === "B2C" ? (
                        <Badge variant="outline" className="text-[10px]">
                          B2C
                        </Badge>
                      ) : (
                        <span className="text-xs">{instituteLabel}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                      {readiness ?? "--"}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                      {student.xp.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600">
                        Lv{student.level}{" "}
                        <span className="text-slate-400">
                          {student.levelTitle}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                      {student.streak > 0 ? `${student.streak}d` : "--"}
                    </td>
                    <td className="px-4 py-3">{statusBadge(student.status)}</td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-sm text-slate-400"
                  >
                    No students match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

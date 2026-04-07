"use client"

import { useState } from "react"
import { Search, Plus, Upload } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import studentsData from "@/data/students.json"
import batchesData from "@/data/batches.json"

// ---------------------------------------------------------------------------
// Data for inst-001
// ---------------------------------------------------------------------------

const instStudents = studentsData.students.filter(
  (s) => s.instituteId === "inst-001"
)

const batchMap = Object.fromEntries(
  batchesData.batches.map((b) => [b.id, b.name])
)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
    <Badge className="bg-red-50 text-red-700 border-red-200">Inactive</Badge>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function InstituteStudentsPage() {
  const [search, setSearch] = useState("")

  const filtered = instStudents.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()))
      return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Student Management
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage students enrolled in your institute
        </p>
      </div>

      {/* Action bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <Button className="bg-forest text-white hover:bg-forest-dark">
            <Plus className="mr-1.5 size-4" />
            Add Student
          </Button>
          <Button variant="outline">
            <Upload className="mr-1.5 size-4" />
            Bulk Upload (CSV)
          </Button>
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
                <th className="px-4 py-3">Exam</th>
                <th className="px-4 py-3">Batch</th>
                <th className="px-4 py-3 text-right">SRS / Readiness</th>
                <th className="px-4 py-3 text-right">XP</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3 text-right">Streak</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((student) => {
                const readiness =
                  student.path === "ssb"
                    ? (student as (typeof instStudents)[0]).srsScore
                    : (student as (typeof instStudents)[0]).examReadiness
                const batchName = student.batchId
                  ? batchMap[student.batchId] ?? student.batchId
                  : "--"

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
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600">{batchName}</span>
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
                    <td className="px-4 py-3">
                      {statusBadge(student.status)}
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-12 text-center text-sm text-slate-400"
                  >
                    No students match your search
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

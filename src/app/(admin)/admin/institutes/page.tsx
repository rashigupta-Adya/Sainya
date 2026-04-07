"use client"

import { Building2, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import data from "@/data/institutes.json"

const institutes = data.institutes

function statusBadge(status: string) {
  if (status === "active") {
    return (
      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
        Active
      </Badge>
    )
  }
  return (
    <Badge className="bg-amber-50 text-amber-700 border-amber-200">
      Pending
    </Badge>
  )
}

function typeLabel(type: string) {
  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function InstitutesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Institute Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Onboard and manage coaching institutes
          </p>
        </div>
        <Button className="gap-1.5 bg-rust text-white hover:bg-rust-dark">
          <Plus className="size-4" />
          Onboard New Institute
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Institute Name</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Students</th>
                <th className="px-4 py-3 text-right">Batches</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">AI Usage</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {institutes.map((inst) => {
                const usagePct =
                  inst.aiSessionsQuota > 0
                    ? Math.round(
                        (inst.aiSessionsUsed / inst.aiSessionsQuota) * 100
                      )
                    : 0
                const isPending = inst.status === "pending_approval"

                return (
                  <tr
                    key={inst.id}
                    className="transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {inst.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{inst.city}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {typeLabel(inst.type)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                      {inst.studentCount}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                      {inst.activeBatches}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{inst.plan}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs tabular-nums text-slate-600">
                          {inst.aiSessionsUsed}/{inst.aiSessionsQuota}
                        </span>
                        <div className="h-1.5 w-16 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-forest transition-all"
                            style={{ width: `${Math.min(usagePct, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{statusBadge(inst.status)}</td>
                    <td className="px-4 py-3">
                      {isPending ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-forest text-white hover:bg-forest-dark"
                          >
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

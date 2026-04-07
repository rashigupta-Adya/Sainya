"use client"

import { Star, UserCheck, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import data from "@/data/mentors.json"

const mentors = data.mentors
const pendingMentors = mentors.filter((m) => !m.verified)
const allMentors = mentors

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

function renderStars(rating: number) {
  if (rating === 0) return <span className="text-xs text-slate-400">--</span>
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={i}
          className="size-3.5 fill-amber-400 text-amber-400"
        />
      ))}
      {hasHalf && (
        <Star className="size-3.5 fill-amber-400/50 text-amber-400" />
      )}
      <span className="ml-1 text-xs tabular-nums text-slate-600">
        {rating}
      </span>
    </div>
  )
}

function formatCurrency(amount: number) {
  if (amount === 0) return "--"
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function MentorsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Mentor Management</h2>
        <p className="mt-1 text-sm text-slate-500">
          Verify and manage platform mentors
        </p>
      </div>

      {/* Pending verifications */}
      {pendingMentors.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="size-4" />
              Pending Verifications ({pendingMentors.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="flex items-center justify-between rounded-lg border border-amber-200 bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-800">{mentor.name}</p>
                  <p className="text-xs text-slate-500">
                    {mentor.background} &middot; {mentor.experience}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-forest text-white hover:bg-forest-dark"
                  >
                    <UserCheck className="mr-1 size-3.5" />
                    Verify
                  </Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* All mentors table */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Background</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Expertise</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3 text-right">Sessions</th>
                <th className="px-4 py-3 text-right">Monthly Earnings</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {allMentors.map((mentor) => (
                <tr
                  key={mentor.id}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {mentor.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {mentor.background}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {mentor.experience}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">{renderStars(mentor.rating)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {mentor.sessionsCompleted}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {formatCurrency(mentor.monthlyEarnings)}
                  </td>
                  <td className="px-4 py-3">
                    {statusBadge(mentor.status)}
                  </td>
                  <td className="px-4 py-3">
                    {mentor.verified ? (
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Awaiting verification
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

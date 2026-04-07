"use client"

import { Star, UserPlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import mentorsData from "@/data/mentors.json"

// ---------------------------------------------------------------------------
// Data for inst-001
// ---------------------------------------------------------------------------

const instMentors = mentorsData.mentors.filter((m) =>
  m.affiliatedInstitutes.includes("inst-001")
)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderStars(rating: number) {
  if (rating === 0) return <span className="text-xs text-slate-400">--</span>
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function InstituteMentorsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Mentor Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Mentors affiliated with your institute
          </p>
        </div>
        <Button className="bg-rust text-white hover:bg-rust/90">
          <UserPlus className="mr-1.5 size-4" />
          Request Mentor from Pool
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Expertise</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3 text-right">Sessions</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {instMentors.map((mentor) => (
                <tr
                  key={mentor.id}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{mentor.name}</p>
                    <p className="text-xs text-slate-500">
                      {mentor.background}
                    </p>
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
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-forest/30 text-forest hover:bg-forest-50"
                    >
                      Assign to Batch
                    </Button>
                  </td>
                </tr>
              ))}
              {instMentors.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-sm text-slate-400"
                  >
                    No mentors affiliated with your institute yet
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

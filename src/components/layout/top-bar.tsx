"use client"

import { Search, Bell } from "lucide-react"
import { useAuth } from "@/lib/auth"
import type { Role, SubRole } from "@/lib/auth"

const ROLE_LABELS: Record<Role | SubRole, string> = {
  super_admin: "Super Admin",
  content_manager: "Content Manager",
  operations: "Operations",
  analyst: "Analyst",
  institute: "Institute Admin",
  mentor: "Mentor",
  student: "Student",
}

export function TopBar() {
  const { user } = useAuth()

  const displayRole = user?.subRole ?? user?.role
  const roleLabel = displayRole ? ROLE_LABELS[displayRole] ?? displayRole : ""

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Left: user info */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900">
          {user?.name ?? ""}
        </span>
        <span className="text-xs text-slate-400">{roleLabel}</span>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
          <Search size={18} />
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
          <Bell size={18} />
          {/* Notification dot */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  )
}

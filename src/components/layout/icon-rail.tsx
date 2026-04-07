"use client"

import { LogOut } from "lucide-react"
import type { NavGroup } from "@/lib/navigation"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"

interface IconRailProps {
  navGroups: NavGroup[]
  activeGroup: number
  onGroupSelect: (index: number) => void
}

export function IconRail({ navGroups, activeGroup, onGroupSelect }: IconRailProps) {
  const { user, logout } = useAuth()

  const initials = user?.avatar ?? "?"

  return (
    <div className="flex h-screen w-[60px] flex-col items-center bg-forest-dark py-4 sticky top-0">
      {/* Logo */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-lg font-bold text-white">
        S
      </div>

      {/* Navigation group icons */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navGroups.map((group, index) => {
          const Icon = group.icon
          const isActive = index === activeGroup
          return (
            <button
              key={group.label}
              onClick={() => onGroupSelect(index)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:bg-white/10 hover:text-white/70"
              )}
              title={group.label}
            >
              <Icon size={20} />
            </button>
          )
        })}
      </nav>

      {/* User avatar + logout */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rust text-sm font-semibold text-white">
          {initials}
        </div>
        <button
          onClick={logout}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
          title="Log out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { NavGroup } from "@/lib/navigation"
import { cn } from "@/lib/utils"

interface SidePanelProps {
  group: NavGroup
}

export function SidePanel({ group }: SidePanelProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-[200px] flex-col border-r border-slate-200 bg-slate-50 sticky top-0">
      {/* Group label */}
      <div className="px-4 pt-5 pb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {group.label}
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {group.items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-white text-forest font-medium shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon size={16} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

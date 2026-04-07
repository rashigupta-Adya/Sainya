"use client"

import { useState, type ReactNode } from "react"
import type { NavGroup } from "@/lib/navigation"
import { IconRail } from "./icon-rail"
import { SidePanel } from "./side-panel"
import { TopBar } from "./top-bar"

interface PortalShellProps {
  navGroups: NavGroup[]
  children: ReactNode
}

export function PortalShell({ navGroups, children }: PortalShellProps) {
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Icon rail - fixed left */}
      <IconRail
        navGroups={navGroups}
        activeGroup={activeGroup}
        onGroupSelect={setActiveGroup}
      />

      {/* Side panel - sub-navigation */}
      {navGroups[activeGroup] && (
        <SidePanel group={navGroups[activeGroup]} />
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

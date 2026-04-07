"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { PortalShell } from "@/components/layout/portal-shell"
import { studentNav } from "@/lib/navigation"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  return <PortalShell navGroups={studentNav}>{children}</PortalShell>
}

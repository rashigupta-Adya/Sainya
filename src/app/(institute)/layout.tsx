"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { PortalShell } from "@/components/layout/portal-shell"
import { instituteNav } from "@/lib/navigation"

export default function InstituteLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "institute")) {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  return <PortalShell navGroups={instituteNav}>{children}</PortalShell>
}

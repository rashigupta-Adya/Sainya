"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { PortalShell } from "@/components/layout/portal-shell"
import { adminNav } from "@/lib/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "super_admin")) {
      router.replace("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return null

  return <PortalShell navGroups={adminNav}>{children}</PortalShell>
}

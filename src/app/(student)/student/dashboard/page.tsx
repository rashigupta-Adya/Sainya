"use client"

import { useAuth } from "@/lib/auth"
import SsbDashboard from "@/components/student/ssb-dashboard"
import WrittenDashboard from "@/components/student/written-dashboard"

export default function StudentDashboard() {
  const { user } = useAuth()

  if (user?.studentPath === "written") {
    return <WrittenDashboard />
  }

  return <SsbDashboard />
}

import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Settings,
  BarChart3,
  Trophy,
  CreditCard,
  MessageSquare,
  UserCheck,
  Brain,
  Target,
  Swords,
  FileText,
  Calendar,
  Star,
  Wallet,
  Layers,
  UserCircle,
  FolderOpen,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

export interface NavGroup {
  icon: LucideIcon
  label: string
  items: NavItem[]
}

// ---------------------------------------------------------------------------
// Super Admin
// ---------------------------------------------------------------------------

export const adminNav: NavGroup[] = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { title: "Team Management", href: "/admin/team", icon: Users },
    ],
  },
  {
    icon: Building2,
    label: "Manage",
    items: [
      { title: "Institutes", href: "/admin/institutes", icon: Building2 },
      { title: "Students Global", href: "/admin/students", icon: GraduationCap },
      { title: "Mentors", href: "/admin/mentors", icon: UserCheck },
    ],
  },
  {
    icon: BookOpen,
    label: "Content",
    items: [
      { title: "Curriculum CMS", href: "/admin/curriculum", icon: BookOpen },
      { title: "Mock Test Builder", href: "/admin/mock-tests", icon: ClipboardList },
      { title: "AI Configuration", href: "/admin/ai-config", icon: Settings },
    ],
  },
  {
    icon: BarChart3,
    label: "Analytics",
    items: [
      { title: "Reports", href: "/admin/reports", icon: FileText },
      { title: "Gamification", href: "/admin/gamification", icon: Trophy },
      { title: "Payments", href: "/admin/payments", icon: CreditCard },
    ],
  },
]

// ---------------------------------------------------------------------------
// Institute Admin
// ---------------------------------------------------------------------------

export const instituteNav: NavGroup[] = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/institute/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    icon: Users,
    label: "Manage",
    items: [
      { title: "Students", href: "/institute/students", icon: GraduationCap },
      { title: "Batches", href: "/institute/batches", icon: Layers },
      { title: "Mentors", href: "/institute/mentors", icon: UserCheck },
    ],
  },
  {
    icon: BookOpen,
    label: "Content",
    items: [
      { title: "Supplementary Content", href: "/institute/content", icon: FolderOpen },
    ],
  },
  {
    icon: BarChart3,
    label: "Reports",
    items: [
      { title: "Reports", href: "/institute/reports", icon: FileText },
      { title: "Leaderboard", href: "/institute/leaderboard", icon: Trophy },
      { title: "Subscription", href: "/institute/subscription", icon: CreditCard },
    ],
  },
]

// ---------------------------------------------------------------------------
// Mentor
// ---------------------------------------------------------------------------

export const mentorNav: NavGroup[] = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/mentor/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    icon: GraduationCap,
    label: "Students",
    items: [
      { title: "My Students", href: "/mentor/students", icon: Users },
      { title: "Sessions", href: "/mentor/sessions", icon: Calendar },
    ],
  },
  {
    icon: ClipboardList,
    label: "Evaluate",
    items: [
      { title: "Evaluate Tests", href: "/mentor/evaluate", icon: ClipboardList },
      { title: "Feedback", href: "/mentor/feedback", icon: MessageSquare },
    ],
  },
  {
    icon: BarChart3,
    label: "Performance",
    items: [
      { title: "My Analytics", href: "/mentor/analytics", icon: BarChart3 },
      { title: "Earnings", href: "/mentor/earnings", icon: Wallet },
    ],
  },
]

// ---------------------------------------------------------------------------
// Student
// ---------------------------------------------------------------------------

export const studentNav: NavGroup[] = [
  {
    icon: LayoutDashboard,
    label: "Home",
    items: [
      { title: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
      { title: "My Profile", href: "/student/profile", icon: UserCircle },
    ],
  },
  {
    icon: BookOpen,
    label: "Learn",
    items: [
      { title: "Curriculum", href: "/student/curriculum", icon: BookOpen },
      { title: "Mock Tests", href: "/student/mock-tests", icon: ClipboardList },
    ],
  },
  {
    icon: Target,
    label: "SSB Prep",
    items: [
      { title: "OLQ Assessment", href: "/student/olq-assessment", icon: Star },
      { title: "Psychology Practice", href: "/student/psychology", icon: Brain },
      { title: "AI Mock Interview", href: "/student/interview", icon: MessageSquare },
      { title: "GTO Practice", href: "/student/gto", icon: Swords },
    ],
  },
  {
    icon: BarChart3,
    label: "Progress",
    items: [
      { title: "Performance", href: "/student/performance", icon: BarChart3 },
      { title: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
      { title: "Mentors", href: "/student/mentors", icon: UserCheck },
    ],
  },
]

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

const navByRole: Record<string, NavGroup[]> = {
  admin: adminNav,
  institute: instituteNav,
  mentor: mentorNav,
  student: studentNav,
}

export function getNavForRole(role: string): NavGroup[] {
  return navByRole[role] ?? []
}

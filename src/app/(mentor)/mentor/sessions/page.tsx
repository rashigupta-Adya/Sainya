"use client"

import {
  Calendar,
  Video,
  Users,
  FileText,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Session {
  date: string
  time: string
  student: string
  type: string
  mode: string
  modeDetail?: string
}

const upcomingSessions: Session[] = [
  {
    date: "Apr 8",
    time: "10:00 AM",
    student: "Rahul Verma",
    type: "Mock Interview",
    mode: "1:1",
    modeDetail: "1:1 Video",
  },
  {
    date: "Apr 8",
    time: "2:00 PM",
    student: "AFCAT Batch",
    type: "Group Discussion",
    mode: "Group",
    modeDetail: "Group (12 students)",
  },
  {
    date: "Apr 10",
    time: "11:00 AM",
    student: "Sneha Patel",
    type: "Psychology Review",
    mode: "1:1",
    modeDetail: "1:1 Video",
  },
]

interface CompletedSession extends Session {
  id: string
}

const completedSessions: CompletedSession[] = [
  {
    id: "c1",
    date: "Apr 5",
    time: "10:00 AM",
    student: "Rahul Verma",
    type: "Mock Interview",
    mode: "1:1",
  },
  {
    id: "c2",
    date: "Apr 3",
    time: "3:00 PM",
    student: "Amit Singh",
    type: "GTO Review",
    mode: "1:1",
  },
  {
    id: "c3",
    date: "Apr 1",
    time: "11:00 AM",
    student: "Sneha Patel",
    type: "Personal Interview Prep",
    mode: "1:1",
  },
  {
    id: "c4",
    date: "Mar 28",
    time: "2:00 PM",
    student: "NDA Batch",
    type: "Group Discussion",
    mode: "Group",
  },
  {
    id: "c5",
    date: "Mar 25",
    time: "10:00 AM",
    student: "Rahul Verma",
    type: "Psychology Debrief",
    mode: "1:1",
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MentorSessionsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold">Sessions</h2>
        <p className="text-sm text-muted-foreground">
          Manage your upcoming and past sessions
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming
            <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">
              {upcomingSessions.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">
              {completedSessions.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Upcoming */}
        <TabsContent value="upcoming" className="mt-4 space-y-3">
          {upcomingSessions.map((session, idx) => (
            <Card key={idx}>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-forest-50">
                    {session.mode === "Group" ? (
                      <Users className="size-5 text-forest" />
                    ) : (
                      <Video className="size-5 text-forest" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {session.date}, {session.time} &mdash; {session.student}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {session.type}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {session.modeDetail ?? session.mode}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="gap-1.5 bg-forest text-white hover:bg-forest-dark"
                >
                  <Video className="size-3.5" />
                  Join Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Completed */}
        <TabsContent value="completed" className="mt-4 space-y-3">
          {completedSessions.map((session) => (
            <Card key={session.id}>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                    <Calendar className="size-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {session.date}, {session.time} &mdash; {session.student}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {session.type}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {session.mode}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                >
                  <FileText className="size-3.5" />
                  View Notes
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

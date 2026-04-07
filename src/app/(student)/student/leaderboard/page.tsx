import { Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Leaderboard</h2>
        <p className="text-sm text-slate-500 mt-1">
          Rank by XP and Selection Readiness Score across your batch
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Leaderboard</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Rank within your batch by XP and Selection Readiness Score.
            Platform-wide top 100 (opt-in). Weekly Rising Stars showing highest
            SRS improvement. Hall of Fame for students who achieved Selection
            Ready status.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

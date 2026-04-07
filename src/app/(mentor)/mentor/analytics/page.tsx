import { BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MentorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Performance metrics and student outcomes
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-forest-50">
            <BarChart3 className="size-8 text-forest/40" />
          </div>
          <h3 className="text-lg font-semibold">My Analytics</h3>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Track your student portfolio ranked by SRS, your average rating,
            student improvement rates, and platform ranking among mentors.
          </p>
          <Badge variant="secondary" className="mt-4">
            Coming Soon
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

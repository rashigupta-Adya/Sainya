import { BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Reports &amp; Analytics
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Executive summary, cohort analysis, institute league table, AI
          accuracy reports, content engagement metrics, mentor effectiveness
          tracking.
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Reports &amp; Analytics
          </h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Executive summary, cohort analysis, institute league table, AI
            accuracy reports, content engagement metrics, mentor effectiveness
            tracking.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

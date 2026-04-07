import { BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CurriculumPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Curriculum</h2>
        <p className="text-sm text-slate-500 mt-1">
          Structured 5-day SSB preparation mapped to each stage
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Curriculum</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            5-stage SSB curriculum mapped to Day 1 through Day 5. Video lessons,
            reading materials, and practice exercises organized by SSB stage.
            Each lesson tagged with the OLQ it develops.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

import { ClipboardList } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MockTestBuilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Mock Test Builder</h2>
        <p className="text-sm text-slate-500 mt-1">
          Build question banks with AI generation from syllabus. Compose timed
          tests matching real exam patterns. Assign to institutes or batches.
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <ClipboardList className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Mock Test Builder</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Build question banks with AI generation from syllabus. Compose timed
            tests matching real exam patterns. Assign to institutes or batches.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

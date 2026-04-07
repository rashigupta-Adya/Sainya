import { Swords } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GTOPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">GTO Practice</h2>
        <p className="text-sm text-slate-500 mt-1">
          Group Testing Officer tasks and group activity simulations
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <Swords className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">GTO Practice</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Practice for Group Testing Officer tasks: Group Planning Exercise
            (GPE), Group Discussion simulations with AI participants, and
            Lecturette practice with AI evaluation of content and delivery.
          </p>
          <Badge variant="outline">Phase 2</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

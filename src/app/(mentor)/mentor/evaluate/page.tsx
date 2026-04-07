import { ClipboardList } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MentorEvaluatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Evaluate Tests</h2>
        <p className="text-sm text-muted-foreground">
          Review and score student assessments
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-forest-50">
            <ClipboardList className="size-8 text-forest/40" />
          </div>
          <h3 className="text-lg font-semibold">Evaluate Tests</h3>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Review student TAT, WAT, SRT, SDT responses alongside AI
            pre-evaluations. Override or endorse AI scores with your expert
            reasoning. Score mock interviews and GTO observations.
          </p>
          <Badge variant="secondary" className="mt-4">
            Coming Soon
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

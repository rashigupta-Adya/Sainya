import { MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MentorFeedbackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Feedback System</h2>
        <p className="text-sm text-muted-foreground">
          Structured feedback mapped to OLQ traits
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-forest-50">
            <MessageSquare className="size-8 text-forest/40" />
          </div>
          <h3 className="text-lg font-semibold">Feedback System</h3>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Use structured OLQ-tagged feedback templates for each SSB stage.
            Attach voice notes. Every feedback item maps to a specific OLQ for
            tracking.
          </p>
          <Badge variant="secondary" className="mt-4">
            Coming Soon
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

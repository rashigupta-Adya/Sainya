import { Brain } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const PSYCHOLOGY_TESTS = [
  {
    abbr: "TAT",
    name: "Thematic Apperception Test",
    description: "Write stories based on ambiguous images revealing personality traits",
  },
  {
    abbr: "WAT",
    name: "Word Association Test",
    description: "Respond to 60 words in 15 seconds each, revealing subconscious patterns",
  },
  {
    abbr: "SRT",
    name: "Situation Reaction Test",
    description: "React to 60 real-life situations showing decision-making and OLQ alignment",
  },
  {
    abbr: "SDT",
    name: "Self Description Test",
    description: "Describe yourself from 5 perspectives in timed paragraphs",
  },
]

export default function PsychologyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Psychology Practice
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Practice all 4 psychology tests used in SSB evaluation
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Psychology Practice</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Practice all 4 psychology tests used in SSB: TAT, SRT, WAT, and SDT.
            AI evaluates your responses and maps them to OLQ dimensions.
          </p>
          <Badge variant="secondary" className="mb-6">
            Coming Soon
          </Badge>

          <div className="w-full max-w-sm space-y-3 text-left">
            {PSYCHOLOGY_TESTS.map((test) => (
              <div
                key={test.abbr}
                className="flex items-start gap-3 rounded-lg border border-dashed px-3 py-2.5"
              >
                <span className="shrink-0 rounded bg-forest-50 px-2 py-0.5 text-xs font-bold text-forest">
                  {test.abbr}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {test.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {test.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

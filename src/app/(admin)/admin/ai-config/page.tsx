import { Bot } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AIConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">AI Configuration</h2>
        <p className="text-sm text-slate-500 mt-1">
          Select and version AI models for Interview, Psychology, and
          Recommendation engines. Manage prompt library and evaluation rubrics.
          Monitor feedback quality.
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI Configuration</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Select and version AI models for Interview, Psychology, and
            Recommendation engines. Manage prompt library and evaluation rubrics.
            Monitor feedback quality.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

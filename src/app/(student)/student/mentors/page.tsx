import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MentorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Find a Mentor</h2>
        <p className="text-sm text-slate-500 mt-1">
          Connect with verified SSB mentors for personalized guidance
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Find a Mentor</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Browse verified SSB mentors: ex-recommended officers, military
            psychologists, GTO experts. View profiles, ratings, expertise areas.
            Book 1:1 or group sessions for mock interviews, psychology review,
            and personality coaching.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

import { Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MentorEarningsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Earnings</h2>
        <p className="text-sm text-muted-foreground">
          Session payouts and monthly statements
        </p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-rust-50">
            <Wallet className="size-8 text-rust/40" />
          </div>
          <h3 className="text-lg font-semibold">Earnings</h3>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            View completed sessions, pending payouts, monthly earnings
            statements, and commission details. Payout processed monthly.
          </p>
          <Badge variant="secondary" className="mt-4">
            Coming Soon
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

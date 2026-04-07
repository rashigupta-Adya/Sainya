import { CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InstituteSubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Subscription &amp; Billing
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Current plan details, AI session quota, seat usage, upgrade requests,
          and GST invoice history.
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rust-50 flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-rust" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Subscription &amp; Billing
          </h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Current plan details, AI session quota, seat usage, upgrade
            requests, and GST invoice history.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

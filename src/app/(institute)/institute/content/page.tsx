import { FolderOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InstituteContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Supplementary Content
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Upload additional content for your students: videos, PDFs, practice
          sets. Your content is visible only to your enrolled students.
        </p>
      </div>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8 text-forest" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Supplementary Content</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4">
            Upload additional content for your students: videos, PDFs, practice
            sets. Your content is visible only to your enrolled students.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

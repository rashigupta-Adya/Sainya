import Link from "next/link"

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-bold text-forest-dark">Sainya</span>
        </Link>
      </div>
      <div className="py-12 px-4">{children}</div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { FileText, Shield, ArrowLeft, ArrowRight } from "lucide-react"

export default function StudentPathSelection() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-forest mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-center mb-2">Choose Your Path</h1>
      <p className="text-gray-500 text-center mb-10">
        Where are you in your defence preparation?
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT CARD — Written Exam (Coming Soon) */}
        <div className="relative bg-white rounded-2xl border border-gray-200 p-6 opacity-75 cursor-default">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <h2 className="text-lg font-bold mb-2 text-gray-700">
            Preparing for Written Exam
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            NDA, CDS, AFCAT &mdash; studying for the written qualification exam
          </p>
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
            Coming Soon &mdash; Institute content marketplace
          </span>
        </div>

        {/* RIGHT CARD — SSB Interview (Active) */}
        <Link
          href="/register/student/ssb"
          className="group bg-white rounded-2xl border-2 border-forest p-6 hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-forest" />
          </div>
          <h2 className="text-lg font-bold mb-2">
            Preparing for SSB Interview
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Already have an SSB call letter or cleared written exam. Ready for
            the 5-day assessment.
          </p>
          <span className="text-rust font-semibold text-sm flex items-center gap-1">
            Start OLQ Assessment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  )
}

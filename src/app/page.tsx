"use client";

import Link from "next/link";
import {
  Star,
  ArrowRight,
  Check,
  BookOpen,
  Building2,
  User,
  BarChart3,
  LayoutDashboard,
  Users,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-forest-dark">Sainya</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-forest transition-colors">
            Features
          </a>
          <a href="#process" className="hover:text-forest transition-colors">
            SSB Process
          </a>
          <a href="#personas" className="hover:text-forest transition-colors">
            Who It&apos;s For
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-forest transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register/student/ssb"
            className="bg-rust text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rust-dark transition-colors"
          >
            Start Free Assessment
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <a
            href="#features"
            className="block text-sm font-medium text-gray-600 hover:text-forest"
            onClick={() => setMobileOpen(false)}
          >
            Features
          </a>
          <a
            href="#process"
            className="block text-sm font-medium text-gray-600 hover:text-forest"
            onClick={() => setMobileOpen(false)}
          >
            SSB Process
          </a>
          <a
            href="#personas"
            className="block text-sm font-medium text-gray-600 hover:text-forest"
            onClick={() => setMobileOpen(false)}
          >
            Who It&apos;s For
          </a>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-forest"
            >
              Login
            </Link>
            <Link
              href="/register/student/ssb"
              className="bg-rust text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:bg-rust-dark transition-colors"
            >
              Start Free Assessment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section
      className="pt-28 pb-20 px-4"
      style={{
        background: "linear-gradient(135deg, #1a3c2f 0%, #2a5744 50%, #3d7a60 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-3 py-1 rounded-full text-sm mb-6">
            <Star className="w-4 h-4" />
            Complete Defence Preparation Platform
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            From Written Exam
            <br />
            to SSB Recommendation.
            <br />
            <span className="text-rust-light">One Platform.</span>
          </h1>

          <p className="text-lg text-white/80 mb-8 max-w-lg">
            India&apos;s first LMS built for defence preparation. Institutes deliver
            content. AI evaluates your Officer Like Qualities. Mentors guide your
            growth.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/register/student/ssb"
              className="bg-rust text-white px-6 py-3 rounded-lg font-semibold hover:bg-rust-dark transition-colors flex items-center gap-2"
            >
              Take Free OLQ Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register/institute"
              className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Register Your Institute
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8 text-white/70 text-sm">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" /> Free Assessment
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" /> AI-Powered Feedback
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" /> 15 OLQ Mapping
            </span>
          </div>
        </div>

        {/* Right column — OLQ radar preview card */}
        <div className="hidden md:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-white/60 text-sm mb-4 text-center">
              Sample OLQ Profile
            </p>

            {/* Static radar chart mockup */}
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 200 200" className="w-64 h-64">
                {/* Background rings */}
                {[80, 60, 40, 20].map((r) => (
                  <polygon
                    key={r}
                    points={generateHexPoints(100, 100, r)}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Axes */}
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line
                      key={angle}
                      x1="100"
                      y1="100"
                      x2={100 + 80 * Math.cos(rad - Math.PI / 2)}
                      y2={100 + 80 * Math.sin(rad - Math.PI / 2)}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                    />
                  );
                })}
                {/* Data polygon */}
                <polygon
                  points={generateDataPoints(100, 100, [65, 72, 55, 68, 78, 60])}
                  fill="rgba(192,84,51,0.3)"
                  stroke="#d4704f"
                  strokeWidth="1.5"
                />
                {/* Data dots */}
                {getDataDots(100, 100, [65, 72, 55, 68, 78, 60]).map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.x}
                    cy={dot.y}
                    r="3"
                    fill="#d4704f"
                  />
                ))}
              </svg>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Planning & Organizing",
                "Social Adjustment",
                "Social Effectiveness",
                "Dynamic",
              ].map((label) => (
                <span
                  key={label}
                  className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Radar chart helpers */
function generateHexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (i * 60 * Math.PI) / 180 - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}

function generateDataPoints(
  cx: number,
  cy: number,
  values: number[]
): string {
  return values
    .map((v, i) => {
      const angle = (i * 60 * Math.PI) / 180 - Math.PI / 2;
      const r = (v / 100) * 80;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}

function getDataDots(
  cx: number,
  cy: number,
  values: number[]
): { x: number; y: number }[] {
  return values.map((v, i) => {
    const angle = (i * 60 * Math.PI) / 180 - Math.PI / 2;
    const r = (v / 100) * 80;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
const stats = [
  { value: "15-20L", label: "Aspirants yearly" },
  { value: "5-6%", label: "SSB recommendation rate" },
  { value: "15", label: "Officer Like Qualities" },
  { value: "5 Days", label: "SSB assessment duration" },
];

function Stats() {
  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(42,87,68,0.05), rgba(42,87,68,0.02))",
            }}
          >
            <div className="text-3xl font-bold text-forest">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Who It's For                                                       */
/* ------------------------------------------------------------------ */
const personas = [
  {
    icon: BookOpen,
    title: "Defence Aspirants",
    description:
      "NDA, CDS, AFCAT, Tech Entry \u2014 prepare for written exams and SSB with AI-powered OLQ assessment and personalized feedback.",
    cta: "Start Free Assessment",
    href: "/register/student",
  },
  {
    icon: Building2,
    title: "Coaching Institutes",
    description:
      "Bring your content, manage batches, track student OLQ progress. Scale beyond your physical classroom.",
    cta: "Register Institute",
    href: "/register/institute",
  },
  {
    icon: User,
    title: "Mentors & Trainers",
    description:
      "Ex-SSB officers, psychologists, GTO experts \u2014 coach aspirants at scale with structured tools and earn from sessions.",
    cta: "Join as Mentor",
    href: "/register/mentor",
  },
];

function Personas() {
  return (
    <section id="personas" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">
          Built for Everyone in Defence Prep
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          Whether you&apos;re an aspirant, a mentor, or running a coaching institute
          &mdash; Sainya is your platform.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.title}
                href={p.href}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-forest" />
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{p.description}</p>
                <span className="text-rust font-semibold text-sm flex items-center gap-1">
                  {p.cta}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SSB Process                                                        */
/* ------------------------------------------------------------------ */
const ssbSteps = [
  {
    day: "1",
    title: "Screening",
    description: "OIR + PPDT \u2014 reasoning & perception",
    accent: false,
  },
  {
    day: "2",
    title: "Psychology",
    description: "TAT, WAT, SRT, SD \u2014 personality assessment",
    accent: false,
  },
  {
    day: "3-4",
    title: "GTO Tasks",
    description: "Group discussions, planning, outdoor tasks",
    accent: false,
  },
  {
    day: "4",
    title: "Interview",
    description: "Personal Interview \u2014 your story matters",
    accent: false,
  },
  {
    day: "5",
    title: "Conference",
    description: "Board decision \u2014 recommended or not",
    accent: true,
  },
];

function SSBProcess() {
  return (
    <section id="process" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">
          The 5-Day SSB Selection Process
        </h2>
        <p className="text-gray-500 text-center mb-12">
          We prepare you for every stage with AI-powered evaluation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {ssbSteps.map((step) => (
            <div key={step.title} className="text-center p-4">
              <div
                className={`w-12 h-12 ${
                  step.accent ? "bg-rust" : "bg-forest"
                } text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold`}
              >
                {step.day}
              </div>
              <h4 className="font-bold text-sm mb-1">{step.title}</h4>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: BarChart3,
    title: "Real OLQ Assessment",
    description:
      "15 Officer Like Qualities scored using the actual SSB framework \u2014 not Big Five, not generic personality tests. Situational questions that mirror SSB methodology.",
  },
  {
    icon: LayoutDashboard,
    title: "Institute LMS",
    description:
      "Coaching centers bring their own content, manage batches, track student progress with real analytics. Scale beyond your physical classroom.",
  },
  {
    icon: Users,
    title: "Mentor Network",
    description:
      "Connect with verified ex-SSB officers and psychologists. Structured feedback tools, session scheduling, and performance tracking.",
  },
];

function Features() {
  return (
    <section id="features" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">Why Sainya?</h2>
        <p className="text-gray-500 text-center mb-12">
          What no other defence prep platform does.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 bg-rust/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-rust" />
                </div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */
function CTA() {
  return (
    <section
      className="py-16 px-4"
      style={{
        background: "linear-gradient(135deg, #1a3c2f 0%, #2a5744 50%, #3d7a60 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Know Your Officer Potential
        </h2>
        <p className="text-white/70 mb-8">
          Take the free OLQ Baseline Assessment. Discover your strengths and gaps
          across all 15 Officer Like Qualities in 10 minutes.
        </p>
        <Link
          href="/register/student/ssb"
          className="inline-block bg-rust text-white px-8 py-3 rounded-lg font-semibold hover:bg-rust-dark transition-colors"
        >
          Start Free Assessment
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-forest-dark py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span className="text-white/80 text-sm">
            Sainya &copy; 2026 | Powered by Adya AI
          </span>
        </div>
        <div className="flex gap-6 text-white/50 text-sm">
          <Link href="/register/institute" className="hover:text-white/80 transition-colors">
            Institutes
          </Link>
          <Link href="/register/mentor" className="hover:text-white/80 transition-colors">
            Mentors
          </Link>
          <Link href="/register/student" className="hover:text-white/80 transition-colors">
            Students
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar />
      <Hero />
      <Stats />
      <Personas />
      <SSBProcess />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

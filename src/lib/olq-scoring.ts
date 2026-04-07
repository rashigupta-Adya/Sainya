// ---------------------------------------------------------------------------
// OLQ Scoring – calculate per-OLQ, per-factor, and overall scores
// ---------------------------------------------------------------------------

import type { Question } from "./olq-questions"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const OLQ_NAMES = [
  "Effective Intelligence",
  "Reasoning Ability",
  "Organizing Ability",
  "Power of Expression",
  "Social Adaptability",
  "Cooperation",
  "Sense of Responsibility",
  "Initiative",
  "Self-Confidence",
  "Speed of Decision",
  "Ability to Influence Group",
  "Liveliness",
  "Determination",
  "Courage",
  "Stamina",
] as const

export type OLQName = (typeof OLQ_NAMES)[number]

export const FACTORS: Record<
  string,
  { indices: number[]; weight: number }
> = {
  "Planning & Organizing": { indices: [0, 1, 2, 3], weight: 0.25 },
  "Social Adjustment": { indices: [4, 5, 6], weight: 0.2 },
  "Social Effectiveness": { indices: [7, 8, 9, 10, 11], weight: 0.35 },
  Dynamic: { indices: [12, 13, 14], weight: 0.2 },
}

export const FACTOR_NAMES = Object.keys(FACTORS)

// ---------------------------------------------------------------------------
// Scoring helpers
// ---------------------------------------------------------------------------

/**
 * Calculate 15 OLQ scores (0–100).
 *
 * Each OLQ has 2 questions. The raw score for an OLQ is the sum of the two
 * question scores (each 1–4, so max 8). We normalise: (sum / 8) * 100.
 *
 * If a question is unanswered (null) we treat its contribution as 0.
 */
export function calculateOLQScores(
  answers: (number | null)[],
  questionList: Question[],
): number[] {
  const scores: number[] = new Array(15).fill(0)

  for (let olqIdx = 0; olqIdx < 15; olqIdx++) {
    const qStart = olqIdx * 2
    let sum = 0

    for (let offset = 0; offset < 2; offset++) {
      const qIdx = qStart + offset
      const chosen = answers[qIdx]
      if (chosen !== null && chosen !== undefined) {
        sum += questionList[qIdx].scores[chosen]
      }
    }

    scores[olqIdx] = Math.round((sum / 8) * 100)
  }

  return scores
}

/**
 * Calculate factor scores — average of OLQ scores within each factor.
 */
export function calculateFactorScores(
  olqScores: number[],
): Record<string, number> {
  const result: Record<string, number> = {}

  for (const [name, { indices }] of Object.entries(FACTORS)) {
    const sum = indices.reduce((acc, i) => acc + olqScores[i], 0)
    result[name] = Math.round(sum / indices.length)
  }

  return result
}

/**
 * Calculate overall weighted score from factor scores.
 */
export function calculateOverallScore(
  factorScores: Record<string, number>,
): number {
  let total = 0

  for (const [name, { weight }] of Object.entries(FACTORS)) {
    total += (factorScores[name] ?? 0) * weight
  }

  return Math.round(total)
}

/**
 * Map a 0–100 score to a human-readable label + colour.
 */
export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 75) return { label: "Strong", color: "green" }
  if (score >= 50) return { label: "Moderate", color: "amber" }
  return { label: "Needs Work", color: "red" }
}

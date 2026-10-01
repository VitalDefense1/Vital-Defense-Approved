/**
 * Short summaries are created when a product record is imported or updated,
 * then saved on that record. Pages only read the saved string.
 *
 * The summary uses the description's own sentences. It does not add specs,
 * compatibility, performance claims, or accessories that the description
 * does not already state. If the description cannot be summarized in about
 * 25–40 words on those terms, this returns undefined and the page keeps the
 * existing short description.
 */

const MIN_WORDS = 25
const MAX_WORDS = 40

function wordsOf(value: string) {
  return value.trim().split(/\s+/).filter(Boolean)
}

export function summaryFromDescription(description: string) {
  const normalized = description.trim().replace(/\s+/g, " ")
  const words = wordsOf(normalized)
  if (words.length < MIN_WORDS) return undefined
  if (words.length <= MAX_WORDS) return normalized

  const sentences = normalized.split(/(?<=[.!?])\s+/).filter(Boolean)
  const kept: string[] = []
  for (const sentence of sentences) {
    const next = [...kept, sentence].join(" ")
    if (wordsOf(next).length > MAX_WORDS) break
    kept.push(sentence)
  }

  const summary = kept.join(" ")
  const count = wordsOf(summary).length
  if (count < MIN_WORDS || count > MAX_WORDS) return undefined
  return summary
}

export function productShortDescription(product: { summary?: string; description: string }) {
  const summary = product.summary?.trim()
  return summary || product.description
}

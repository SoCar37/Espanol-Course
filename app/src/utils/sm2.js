// src/utils/sm2.js
// SM-2 Spaced Repetition Algorithm
// Returns updated card data based on rating (0=Missed, 1=Hard, 2=Good, 3=Easy)

export function sm2(card, rating) {
  // Default values for new cards
  let easeFactor = card.easeFactor ?? 2.5
  let interval = card.interval ?? 0
  let repetitions = card.repetitions ?? 0

  if (rating === 0) {
    // Missed — reset, show again in same session
    repetitions = 0
    interval = 0
  } else if (rating === 1) {
    // Hard — repeat tomorrow
    repetitions = Math.max(repetitions - 1, 0)
    interval = 1
    easeFactor = Math.max(1.3, easeFactor - 0.15)
  } else {
    // Good (2) or Easy (3)
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 3
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1

    if (rating === 2) {
      easeFactor = Math.max(1.3, easeFactor - 0.08)
    } else if (rating === 3) {
      easeFactor = Math.min(3.0, easeFactor + 0.1)
    }
  }

  // nextReview is a date string "YYYY-MM-DD"
  const nextReview = interval === 0
    ? getTodayString() // due again today (missed)
    : getFutureDateString(interval)

  return { easeFactor, interval, repetitions, nextReview }
}

export function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

export function getFutureDateString(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

// Returns true if a card is due today or overdue
export function isDue(cardData) {
  if (!cardData?.nextReview) return true // never reviewed = always due
  return cardData.nextReview <= getTodayString()
}

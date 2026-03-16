// src/hooks/useProgress.js
import { useState, useEffect, useCallback } from 'react'
import { sm2, isDue, getTodayString } from '../utils/sm2'

const STORAGE_KEY = 'espanol-course-progress'

// All units per level — used by unlockLevel to bulk-mark units complete
const LEVEL_UNITS = {
  A1: [
    'unit-01-greetings',
    'unit-02-numbers',
    'unit-03-colors',
    'unit-04-time',
    'unit-05-family',
    'unit-06-food',
    'unit-07-places',
    'unit-08-routines',
    'unit-09-weather',
    'unit-10-review',
  ],
  A2: [
    'unit-01-present-tense',
    'unit-02-reflexive-verbs',
    'unit-03-ser-estar',
    'unit-04-preterite-regular',
    'unit-05-preterite-irregular',
    'unit-06-imperfect',
    'unit-07-preterite-vs-imperfect',
    'unit-08-object-pronouns',
    'unit-09-expressions',
    'unit-10-shopping',
    'unit-11-travel',
    'unit-12-review',
  ],
  B1: [
    'unit-01-subjunctive-intro',
    'unit-02-future-tense',
    'unit-03-conditional',
    'unit-04-por-vs-para',
    'unit-05-relative-clauses',
    'unit-06-passive-voice',
    'unit-07-idiomatic-verbs',
    'unit-08-opinion-debate',
    'unit-09-formal-writing',
    'unit-10-mexican-culture',
    'unit-11-regional-language',
    'unit-12-review',
  ],
  B2: [
    'unit-01-subjunctive-past',
    'unit-02-subjunctive-advanced',
    'unit-03-if-clauses',
    'unit-04-complex-sentences',
    'unit-05-vocabulary-expansion',
    'unit-06-media-culture',
    'unit-07-argumentation',
    'unit-08-nuanced-expressions',
    'unit-09-literature',
    'unit-10-business-spanish',
    'unit-11-social-issues',
    'unit-12-review',
  ],
  C1: [
    'unit-01-advanced-grammar',
    'unit-02-stylistics',
    'unit-03-rhetoric',
    'unit-04-mexican-history',
    'unit-05-literature-advanced',
    'unit-06-media-analysis',
    'unit-07-professional-writing',
    'unit-08-translation',
    'unit-09-regional-variation',
    'unit-10-review',
  ],
}

// Levels in order — used to unlock all levels below the placed level
const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1']

const DEFAULT_PROGRESS = {
  version: '0.1.4',
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  longestStreak: 0,
  units: {},       // keyed by "A1-unit-01-greetings"
  vocab: {},       // keyed by vocab id, stores SM-2 data
  quizScores: {},  // keyed by unit id
  placementComplete: false,
  placementLevel: null,
}

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return DEFAULT_PROGRESS
    return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) }
  } catch {
    return DEFAULT_PROGRESS
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.warn('Could not save progress to localStorage:', e)
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  useEffect(() => {
    const today = new Date().toDateString()
    if (progress.lastStudyDate === today) return
    setProgress(prev => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const wasYesterday = prev.lastStudyDate === yesterday.toDateString()
      const newStreak = wasYesterday ? prev.streak + 1 : 1
      return {
        ...prev,
        streak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastStudyDate: today,
      }
    })
  }, [])

  const getUnitProgress = useCallback((unitKey) => {
    return progress.units[unitKey] || null
  }, [progress.units])

  const markLessonComplete = useCallback((unitKey) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + 10,
      units: {
        ...prev.units,
        [unitKey]: {
          ...prev.units[unitKey],
          lessonComplete: true,
          percent: Math.max(prev.units[unitKey]?.percent || 0, 25),
        },
      },
    }))
  }, [])

  const markExercisesComplete = useCallback((unitKey, score) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + 20,
      units: {
        ...prev.units,
        [unitKey]: {
          ...prev.units[unitKey],
          exercisesComplete: true,
          exerciseScore: score,
          percent: Math.max(prev.units[unitKey]?.percent || 0, 60),
        },
      },
    }))
  }, [])

  const markQuizComplete = useCallback((unitKey, score) => {
    const passed = score >= 70
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + (passed ? 50 : 10),
      quizScores: { ...prev.quizScores, [unitKey]: score },
      units: {
        ...prev.units,
        [unitKey]: {
          ...prev.units[unitKey],
          quizComplete: passed,
          quizScore: score,
          complete: passed,
          percent: passed ? 100 : Math.max(prev.units[unitKey]?.percent || 0, 80),
        },
      },
    }))
  }, [])

  const completeExercises = useCallback((unitKey, score, total, xpEarned) => {
    const pct = Math.round((score / total) * 100)
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + xpEarned,
      units: {
        ...prev.units,
        [unitKey]: {
          ...prev.units[unitKey],
          exercisesComplete: true,
          exerciseScore: pct,
          percent: Math.max(prev.units[unitKey]?.percent || 0, 60),
        },
      },
    }))
  }, [])

  const isExercisesComplete = useCallback((unitKey) => {
    return !!progress.units[unitKey]?.exercisesComplete
  }, [progress.units])

  const isQuizUnlocked = useCallback((unitKey) => {
    return !!progress.units[unitKey]?.exercisesComplete
  }, [progress.units])

  const addXP = useCallback((amount) => {
    setProgress(prev => ({ ...prev, xp: prev.xp + amount }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS)
  }, [])

  const getVocabData = useCallback((vocabId) => {
    return progress.vocab[vocabId] || null
  }, [progress.vocab])

  const rateVocabCard = useCallback((vocabId, rating) => {
    setProgress(prev => {
      const existing = prev.vocab[vocabId] || {}
      const updated = sm2(existing, rating)
      return {
        ...prev,
        vocab: { ...prev.vocab, [vocabId]: updated },
      }
    })
  }, [])

  const getDueVocab = useCallback((vocabArray) => {
    return vocabArray.filter(item => isDue(progress.vocab[item.id]))
  }, [progress.vocab])

  const getDueCount = useCallback((vocabArray) => {
    return vocabArray.filter(item => isDue(progress.vocab[item.id])).length
  }, [progress.vocab])

  // ── NEW: Placement test functions ─────────────────────────────────────────

  /**
   * unlockLevel(level)
   * Marks all units in all levels up to and including `level` as complete,
   * using the correct unitKey format: "LEVEL-unit-XX-slug".
   * This is the only way the placement test grants access to units.
   */
  const unlockLevel = useCallback((level) => {
    const levelIndex = LEVEL_ORDER.indexOf(level)
    if (levelIndex === -1) return

    const levelsToUnlock = LEVEL_ORDER.slice(0, levelIndex + 1)
    const unitsToMark = {}

    levelsToUnlock.forEach(lvl => {
      // All units in levels below the placed level → mark complete
      // The placed level itself → mark all units EXCEPT the first one complete,
      // so the user starts at the first unit of their placed level.
      const units = LEVEL_UNITS[lvl]
      if (!units) return

      if (lvl === level) {
        // Do NOT mark any units in the placed level complete —
        // the user starts here fresh. Just leave them unlocked via
        // the sequential logic already in CourseMapPage.jsx
        // (A2 unit 1 unlocks when A1 unit 10 is complete, etc.)
        // So we only need to mark the last unit of the previous level complete.
      } else {
        // Mark all units in lower levels as placementUnlocked only.
        // This drives isAvailable in CourseMapPage without setting complete:true,
        // so the user doesn't see false ✅ badges on units they never did.
        units.forEach(unitSlug => {
          const key = `${lvl}-${unitSlug}`
          unitsToMark[key] = {
            placementUnlocked: true,
          }
        })
      }
    })

    setProgress(prev => ({
      ...prev,
      units: { ...prev.units, ...unitsToMark },
    }))
  }, [])

  /**
   * setPlacementComplete(level)
   * Records that the placement test has been completed and the result level.
   * Used by Layout and CourseMapPage to suppress the placement prompt.
   */
  const setPlacementComplete = useCallback((level) => {
    setProgress(prev => ({
      ...prev,
      placementComplete: true,
      placementLevel: level,
    }))
  }, [])

  // ── End new functions ─────────────────────────────────────────────────────

  return {
    progress,
    getUnitProgress,
    markLessonComplete,
    markExercisesComplete,
    markQuizComplete,
    completeExercises,
    isExercisesComplete,
    isQuizUnlocked,
    addXP,
    resetProgress,
    getVocabData,
    rateVocabCard,
    getDueVocab,
    getDueCount,
    unlockLevel,
    setPlacementComplete,
  }
}

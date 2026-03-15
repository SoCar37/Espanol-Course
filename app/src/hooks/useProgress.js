import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'espanol-course-progress'

const DEFAULT_PROGRESS = {
  version: '0.1.0',
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  longestStreak: 0,
  units: {},       // keyed by "A1-unit-01" etc.
  vocab: {},       // keyed by vocab id, stores SM-2 data
  quizScores: {},  // keyed by unit id
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

  // Persist on every change
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  // Update streak on load
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

  const addXP = useCallback((amount) => {
    setProgress(prev => ({ ...prev, xp: prev.xp + amount }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS)
  }, [])

  return {
    progress,
    getUnitProgress,
    markLessonComplete,
    markExercisesComplete,
    markQuizComplete,
    addXP,
    resetProgress,
  }
}

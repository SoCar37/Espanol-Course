// src/hooks/useProgress.js
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'espanol-course-progress';

const defaultProgress = {
  xp: 0,
  streak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  completedLessons: [],   // array of unit slugs
  completedExercises: [], // array of unit slugs — exercises done, quiz unlocked
  completedQuizzes: [],   // array of unit slugs — quiz passed
  quizScores: {},         // { unitSlug: highScore }
  exerciseScores: {},     // { unitSlug: { score, total } }
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.warn('Could not save progress to localStorage');
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const updateProgress = useCallback((updater) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  // Call when user clicks "Lesson Complete"
  const completeLesson = useCallback(
    (unitSlug, xpAmount = 50) => {
      updateProgress((prev) => {
        const alreadyDone = prev.completedLessons.includes(unitSlug);
        const today = new Date().toISOString().split('T')[0];
        const lastDate = prev.lastActiveDate;

        let streak = prev.streak;
        let longestStreak = prev.longestStreak;

        if (!alreadyDone) {
          if (lastDate === today) {
            // same day, no streak change
          } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yStr = yesterday.toISOString().split('T')[0];
            if (lastDate === yStr) {
              streak += 1;
            } else {
              streak = 1;
            }
            longestStreak = Math.max(longestStreak, streak);
          }
        }

        return {
          ...prev,
          xp: alreadyDone ? prev.xp : prev.xp + xpAmount,
          streak,
          longestStreak,
          lastActiveDate: today,
          completedLessons: alreadyDone
            ? prev.completedLessons
            : [...prev.completedLessons, unitSlug],
        };
      });
    },
    [updateProgress]
  );

  // Call when user finishes the exercise set
  const completeExercises = useCallback(
    (unitSlug, score, total, xpEarned) => {
      updateProgress((prev) => {
        const alreadyDone = prev.completedExercises.includes(unitSlug);
        const today = new Date().toISOString().split('T')[0];
        return {
          ...prev,
          xp: prev.xp + (alreadyDone ? 0 : xpEarned),
          lastActiveDate: today,
          completedExercises: alreadyDone
            ? prev.completedExercises
            : [...prev.completedExercises, unitSlug],
          exerciseScores: {
            ...prev.exerciseScores,
            [unitSlug]: { score, total },
          },
        };
      });
    },
    [updateProgress]
  );

  // Call when user passes the quiz
  const completeQuiz = useCallback(
    (unitSlug, score, total, xpEarned = 100) => {
      updateProgress((prev) => {
        const prevBest = prev.quizScores[unitSlug] || 0;
        const pct = Math.round((score / total) * 100);
        const alreadyPassed = prev.completedQuizzes.includes(unitSlug);
        const today = new Date().toISOString().split('T')[0];
        return {
          ...prev,
          xp: alreadyPassed ? prev.xp : prev.xp + xpEarned,
          lastActiveDate: today,
          completedQuizzes: alreadyPassed
            ? prev.completedQuizzes
            : [...prev.completedQuizzes, unitSlug],
          quizScores: {
            ...prev.quizScores,
            [unitSlug]: Math.max(prevBest, pct),
          },
        };
      });
    },
    [updateProgress]
  );

  // getUnitProgress — used by CourseMapPage to get per-unit status
  // Returns { complete, percent } for a given unit key (e.g. "A1-unit-01-greetings")
  const getUnitProgress = useCallback(
    (unitKey) => {
      // unitKey comes in as "A1-unit-01-greetings" from CourseMapPage
      // Strip the level prefix to get the plain slug used in our arrays
      const slug = unitKey.replace(/^[A-C][12]-/, '');
      const lessonDone = progress.completedLessons.includes(slug);
      const exercisesDone = progress.completedExercises.includes(slug);
      const quizDone = progress.completedQuizzes.includes(slug);

      // Calculate a rough % for the progress bar on the unit card
      const steps = [lessonDone, exercisesDone, quizDone];
      const doneCount = steps.filter(Boolean).length;
      const percent = Math.round((doneCount / steps.length) * 100);
      const complete = quizDone;

      return { complete, percent, lessonDone, exercisesDone, quizDone };
    },
    [progress]
  );

  // Helpers
  const isLessonComplete = useCallback(
    (unitSlug) => progress.completedLessons.includes(unitSlug),
    [progress]
  );

  const isExercisesComplete = useCallback(
    (unitSlug) => progress.completedExercises.includes(unitSlug),
    [progress]
  );

  const isQuizComplete = useCallback(
    (unitSlug) => progress.completedQuizzes.includes(unitSlug),
    [progress]
  );

  const isQuizUnlocked = useCallback(
    (unitSlug) => progress.completedExercises.includes(unitSlug),
    [progress]
  );

  return {
    progress,
    completeLesson,
    completeExercises,
    completeQuiz,
    isLessonComplete,
    isExercisesComplete,
    isQuizComplete,
    isQuizUnlocked,
    getUnitProgress,
  };
}

# Espanol-Course — Project Handoff Document
## For use at the start of a new chat session
**Handoff version:** v0.1.7 — Current as of 2026-03-15

---

## ⚠️ CRITICAL INSTRUCTIONS FOR CLAUDE — READ BEFORE DOING ANYTHING

This project had serious breakage in a previous session because Claude rewrote files without reading their actual source code first. The root cause was guessing at internal structures instead of knowing them.

**Before writing any code, Claude must:**
1. Read every file listed in the "Critical source files" section below — they are included in full
2. Never rename, restructure, or change the signature of any function in `useProgress.js` without checking every file that calls it
3. Never change the `unitKey` format — it is always `"LEVEL-unit-XX-slug"` e.g. `"A1-unit-01-greetings"`
4. Always include `README.md`, `CHANGELOG.md`, and an updated handoff document in every zip delivery
5. Always deliver a zip file — never just paste code and ask the user to copy it manually

**The files that broke things last time and why:**
- `useProgress.js` — was rewritten with a different data structure, breaking every page that called it
- `LessonPage.jsx` — calls `markLessonComplete(unitKey)` — if that function is renamed or the key format changes, the lesson complete button silently breaks
- `CourseMapPage.jsx` — calls `getUnitProgress("A1-unit-01-greetings")` — key must include level prefix
- `FlashcardsPage.jsx` — `card` must be defined at the TOP of the component before any functions, not halfway down — caused black screen crash

---

## Project overview

**Mission:** The most complete free Spanish course for English speakers seeking fluency in Mexican Spanish.

**GitHub repo:** `github.com/SoCar37/Espanol-Course`
**Live URL:** `https://SoCar37.github.io/Espanol-Course`
**GitHub username:** SoCar37
**Local working copy:** `D:\Files\Coding\Espanol-Course`
**Current version:** v0.1.7

---

## All locked decisions

### Tech stack
- **Frontend:** React + Vite + Tailwind CSS
- **Content format:** Markdown (lessons) + JSON (vocab, exercises, quiz, meta)
- **Progress storage:** localStorage (v1.0) → Supabase (v2.0, deferred)
- **Hosting:** GitHub Pages — auto-deploys via GitHub Actions on every push to main
- **Audio:** Google Cloud TTS Neural2, es-MX voice — generate once, store as MP3 files
- **Analytics:** None for v1.0 — Plausible designated for later

### Content
- **Dialect anchor:** Mexican Spanish
  - Default pronouns: tú (informal), usted (formal), ustedes (plural — never vosotros)
  - Default vocabulary: computadora, carro, celular (not ordenador, coche, móvil)
- **Levels:** A1 through C1 (CEFR standard)
- **Units:** A1=10, A2=12, B1=12, B2=12, C1=10 (56 total)

### Versioning
- **Semver:** v0.1.x → v0.2.0 → v1.0.0
- **Folder structure:** `/content/A1/unit-01-greetings/` (lowercase, hyphenated, zero-padded)
- **Files per unit:** always exactly: `meta.json`, `lesson.md`, `vocab.json`, `exercises.json`, `quiz.json`
- **Branch:** main only
- **Version history:** `CHANGELOG.md` at repo root, Keep a Changelog format

### Design
- **Theme:** Dark (`#0f172a` background, `#1e293b` cards)
- **Palette:** Indigo `#6366f1` / Purple `#8b5cf6` / Pink `#ec4899` / Green `#10b981` / Amber `#f59e0b`
- **Font:** Poppins (Google Fonts)
- **Layout:** Mobile-first, three breakpoints

---

## Current file structure

```
D:\Files\Coding\Espanol-Course\
├── .github/workflows/deploy.yml
├── CHANGELOG.md
├── CONTRIBUTING.md
├── README.md
├── app/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js          ← base: '/Espanol-Course/', outDir: '../docs'
│   ├── public/
│   │   ├── manifest.json
│   │   ├── icons/
│   │   │   ├── icon-192.png    ← NEW v0.1.7
│   │   │   └── icon-512.png    ← NEW v0.1.7
│   │   └── content/
│   │       └── A1/
│   │           ├── unit-01-greetings/  ← 5 files
│   │           ├── unit-02-numbers/    ← 5 files
│   │           ├── unit-03-colors/     ← 5 files
│   │           ├── unit-04-time/       ← 5 files
│   │           ├── unit-05-family/     ← 5 files
│   │           ├── unit-06-food/       ← 5 files
│   │           ├── unit-07-places/     ← 5 files
│   │           ├── unit-08-routines/   ← 5 files
│   │           ├── unit-09-weather/    ← 5 files
│   │           └── unit-10-review/     ← 5 files
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles/globals.css
│       ├── hooks/
│       │   └── useProgress.js
│       ├── utils/
│       │   └── sm2.js
│       ├── components/
│       │   ├── layout/Layout.jsx
│       │   └── exercises/
│       │       ├── ExerciseEngine.jsx
│       │       ├── MultipleChoice.jsx
│       │       ├── FillInBlank.jsx
│       │       ├── Translation.jsx
│       │       ├── SentenceAssembly.jsx
│       │       └── ExerciseSummary.jsx
│       └── pages/
│           ├── CourseMapPage.jsx
│           ├── LessonPage.jsx
│           ├── ExercisesPage.jsx
│           ├── QuizPage.jsx
│           ├── FlashcardsPage.jsx
│           └── ProgressPage.jsx
├── content/
│   └── A1/
│       ├── unit-01-greetings/ through unit-10-review/
└── assets/audio/ (empty — TTS not yet generated)
```

---

## What is working in v0.1.7

- ✅ Full learning loop: Lesson → Exercises → Quiz → Unit complete → Next unit unlocks
- ✅ A1 Units 1–10 — all content complete and working
- ✅ Sequential unit unlock — each unit unlocks after previous quiz passed (≥70%)
- ✅ Exercise engine — 4 types: MCQ, fill-in-blank, translation, sentence assembly
- ✅ Flashcard engine — loads from vocab.json, SM-2 spaced repetition, English→Spanish direction
- ✅ Quiz engine — loads from quiz.json, pass/fail screens, score ring, XP
- ✅ Progress tracking — XP, streak, per-unit completion in localStorage
- ✅ PWA app icons — icon-192.png and icon-512.png in place
- ✅ GitHub Actions auto-deploy

## Known issues / not yet built

- ❌ Audio files — TTS generation not run yet (needs Google Cloud account setup)
- ❌ A2–C1 content not written
- ❌ Placement test not built
- ❌ Deprecated meta tag warning in index.html (`apple-mobile-web-app-capable`)
- ❌ Supabase accounts (v2.0)

---

## Critical architecture notes

### unitKey format — DO NOT CHANGE
The `unitKey` used throughout the app is always: `"LEVEL-unit-XX-slug"`
Examples: `"A1-unit-01-greetings"`, `"A1-unit-05-family"`, `"A2-unit-01-present-tense"`

This key is used by:
- `useProgress.js` — as the key into `progress.units[unitKey]`
- `LessonPage.jsx` — builds it as `` `${level?.toUpperCase()}-${unit}` ``
- `ExercisesPage.jsx` — builds it as `` `${resolvedLevel}-${resolvedUnit}` ``
- `QuizPage.jsx` — builds it as `` `${resolvedLevel}-${resolvedUnit}` ``
- `CourseMapPage.jsx` — builds it as `` `${levelData.level}-${unit.id}` ``

All must match. If you change this format anywhere, change it everywhere.

### Content serving — IMPORTANT
Content files must exist in TWO places:
1. `/content/A1/unit-XX-slug/` — source of truth
2. `/app/public/content/A1/unit-XX-slug/` — served copy

When adding new units, copy to BOTH locations.

### useProgress.js — the most dangerous file to modify
Every page depends on this file. The functions it exports and their signatures must not change without updating every caller. See full source below.

---

## Next steps (in priority order)

1. **Fix deprecated meta tag** — one line in `app/index.html`, change `apple-mobile-web-app-capable` to `mobile-web-app-capable`
2. **A2 content** — 12 units × 5 files = 60 files. Use same content generation pattern as A1. Add A2 units to `CourseMapPage.jsx` `COURSE_STRUCTURE` array and remove `comingSoon: true`
3. **Audio** — requires user to set up Google Cloud TTS account. Run `tools/generate-audio.py`
4. **Placement test** — planned for end of v1.0

---

## Local development workflow

```bash
# From D:\Files\Coding\Espanol-Course\app\
npm run dev
# Opens at http://localhost:5173/Espanol-Course/
```

Never run npm from a UNC/network path (\\NAS...). Local drive only.

---

## Content schema reference

### meta.json
```json
{
  "id": "A1-U01",
  "title": "Greetings and Introductions",
  "level": "A1",
  "unit": 1,
  "slug": "greetings",
  "estimated_minutes": 20,
  "topics": ["greetings", "introductions", "farewells"],
  "prereqs": [],
  "cefr_skills": ["speaking", "listening", "reading"],
  "cultural_note": true,
  "audio_available": false,
  "status": "draft",
  "version": "0.1.0"
}
```

### vocab.json item
```json
{
  "id": "A1-U01-V001",
  "word": "hola",
  "translation": "hello / hi",
  "pronunciation_hint": "OH-lah",
  "part_of_speech": "interjection",
  "example_sentence": "Hola, ¿cómo estás?",
  "example_translation": "Hello, how are you?",
  "audio_file": "A1/unit-01/hola.mp3",
  "tags": ["greeting", "essential"]
}
```

### exercises.json item
```json
{
  "id": "A1-U01-E001",
  "type": "multiple_choice",
  "prompt": "Question text here",
  "options": ["A", "B", "C", "D"],
  "answer": 1,
  "explanation": "Why this answer is correct"
}
```

**For sentence_assembly type, use `"words"` not `"options"`:**
```json
{
  "id": "A1-U01-E008",
  "type": "sentence_assembly",
  "prompt": "Arrange the words...",
  "words": ["Hola,", "me", "llamo", "María."],
  "answer": "Hola, me llamo María.",
  "explanation": "..."
}
```

Valid exercise types: `multiple_choice`, `fill_in_blank`, `translation`, `sentence_assembly`

### quiz.json
```json
{
  "id": "A1-U01-Q",
  "title": "Unit 1 Checkpoint Quiz",
  "passing_score": 70,
  "questions": [ ...same format as exercises, MCQ only... ]
}
```

---

## Claude prompt template for content generation

```
You are a curriculum writer for a Latin American Spanish course targeting
English speakers. Write Unit [N] of the [LEVEL] level: [TOPIC].

Anchor all examples in Mexican Spanish. Use tú (informal) and usted (formal).
Never use vosotros. Default vocabulary: computadora, carro, celular.

Output four sections with these exact filenames:

1. lesson.md — 400–600 word lesson with grammar explanation, example dialogues,
   tables where appropriate, and one cultural note section at the end.
   Use blockquotes for example sentences.

2. vocab.json — JSON array of 12–15 words following this schema exactly:
   id (LEVEL-U0N-V00N), word, translation, pronunciation_hint, part_of_speech,
   example_sentence, example_translation, audio_file, tags

3. exercises.json — JSON array of 8 exercises mixing types: multiple_choice,
   fill_in_blank, translation, sentence_assembly. Include answer and explanation
   for each. For sentence_assembly use "words" field not "options".

4. quiz.json — JSON object with id, passing_score: 70, and questions array of
   8 multiple_choice questions testing the lesson content.
```

---

## Changelog summary

| Version | Date | What changed |
|---------|------|-------------|
| v0.1.7 | 2026-03-15 | PWA app icons (icon-192.png, icon-512.png) |
| v0.1.6 | 2026-03-15 | A1 Units 2–10 content + sequential unlock logic |
| v0.1.5 | 2026-03-15 | Full quiz engine |
| v0.1.4 | 2026-03-15 | Exercise engine + flashcard SM-2 engine |
| v0.1.3 | 2026-03-15 | Fixed unit folder path mismatch |
| v0.1.2 | 2026-03-15 | Fixed content serving |
| v0.1.1 | 2026-03-15 | Fixed deploy.yml |
| v0.1.0 | 2026-03-15 | Initial scaffold |

---

## CRITICAL SOURCE FILES — INCLUDE THESE IN FULL

The following files must be read by Claude at the start of any session before making changes. They are included here in their exact current state.

---

### app/src/hooks/useProgress.js

```javascript
// src/hooks/useProgress.js
import { useState, useEffect, useCallback } from 'react'
import { sm2, isDue, getTodayString } from '../utils/sm2'

const STORAGE_KEY = 'espanol-course-progress'

const DEFAULT_PROGRESS = {
  version: '0.1.4',
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  longestStreak: 0,
  units: {},       // keyed by "A1-unit-01-greetings"
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
  }
}
```

---

### app/src/utils/sm2.js

```javascript
// src/utils/sm2.js
export function sm2(card, rating) {
  let easeFactor = card.easeFactor ?? 2.5
  let interval = card.interval ?? 0
  let repetitions = card.repetitions ?? 0

  if (rating === 0) {
    repetitions = 0
    interval = 0
  } else if (rating === 1) {
    repetitions = Math.max(repetitions - 1, 0)
    interval = 1
    easeFactor = Math.max(1.3, easeFactor - 0.15)
  } else {
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

  const nextReview = interval === 0
    ? getTodayString()
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

export function isDue(cardData) {
  if (!cardData?.nextReview) return true
  return cardData.nextReview <= getTodayString()
}
```

---

### app/src/App.jsx

```jsx
// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CourseMapPage from './pages/CourseMapPage';
import LessonPage from './pages/LessonPage';
import FlashcardsPage from './pages/FlashcardsPage';
import ExercisesPage from './pages/ExercisesPage';
import QuizPage from './pages/QuizPage';
import ProgressPage from './pages/ProgressPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CourseMapPage />} />
        <Route path="/lesson/:level/:unit" element={<LessonPage />} />
        <Route path="/lesson" element={<Navigate to="/lesson/A1/unit-01-greetings" replace />} />
        <Route path="/exercises/:level/:unit" element={<ExercisesPage />} />
        <Route path="/exercises" element={<Navigate to="/exercises/A1/unit-01-greetings" replace />} />
        <Route path="/quiz/:level/:unit" element={<QuizPage />} />
        <Route path="/quiz" element={<Navigate to="/quiz/A1/unit-01-greetings" replace />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/flashcards/:level/:unit" element={<FlashcardsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
```

---

### app/src/pages/LessonPage.jsx

```jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useProgress } from '../hooks/useProgress'

export default function LessonPage() {
  const { level, unit } = useParams()
  const navigate = useNavigate()
  const [lessonContent, setLessonContent] = useState('')
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { markLessonComplete, getUnitProgress } = useProgress()

  const unitKey = `${level?.toUpperCase()}-${unit}`
  const unitProgress = getUnitProgress(unitKey)

  useEffect(() => {
    async function loadLesson() {
      setLoading(true)
      setError(null)
      try {
        const lessonRes = await fetch(
          `/Espanol-Course/content/${level?.toUpperCase()}/${unit}/lesson.md`
        )
        if (!lessonRes.ok) throw new Error('Lesson not found')
        const text = await lessonRes.text()
        setLessonContent(text)
        const metaRes = await fetch(
          `/Espanol-Course/content/${level?.toUpperCase()}/${unit}/meta.json`
        )
        if (metaRes.ok) {
          const metaData = await metaRes.json()
          setMeta(metaData)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    loadLesson()
  }, [level, unit])

  function handleLessonComplete() {
    markLessonComplete(unitKey)
    navigate(`/exercises/${level?.toUpperCase()}/${unit}`)
  }

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} level={level} unit={unit} />

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-content-secondary">
          <li><Link to="/" className="hover:text-content-primary transition-colors">Course</Link></li>
          <li aria-hidden="true">›</li>
          <li><span className="text-brand-primary font-medium">{level?.toUpperCase()}</span></li>
          <li aria-hidden="true">›</li>
          <li className="text-content-primary">{meta?.title || unit}</li>
        </ol>
      </nav>
      {meta && (
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
              {meta.level} · Unit {meta.unit}
            </span>
            {meta.estimated_minutes && (
              <span className="text-content-secondary text-sm">⏱ ~{meta.estimated_minutes} min</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">{meta.title}</h1>
        </header>
      )}
      <article className="prose-lesson" aria-label="Lesson content">
        <ReactMarkdown
          components={{
            h2: ({children}) => <h2 className="text-xl font-semibold text-content-primary mt-8 mb-3">{children}</h2>,
            h3: ({children}) => <h3 className="text-lg font-medium text-brand-primary mt-6 mb-2">{children}</h3>,
            p: ({children}) => <p className="text-content-secondary leading-relaxed mb-4">{children}</p>,
            strong: ({children}) => <strong className="text-content-primary font-semibold">{children}</strong>,
            em: ({children}) => <em className="text-brand-accent not-italic font-medium">{children}</em>,
            blockquote: ({children}) => <blockquote className="example-block">{children}</blockquote>,
            ul: ({children}) => <ul className="list-disc list-inside space-y-1 mb-4 text-content-secondary">{children}</ul>,
            li: ({children}) => <li className="leading-relaxed">{children}</li>,
            table: ({children}) => <div className="overflow-x-auto mb-4"><table className="w-full text-sm border-collapse">{children}</table></div>,
            th: ({children}) => <th className="text-left p-3 bg-surface-hover text-content-primary font-medium border-b border-white/10">{children}</th>,
            td: ({children}) => <td className="p-3 text-content-secondary border-b border-white/5">{children}</td>,
          }}
        >
          {lessonContent}
        </ReactMarkdown>
      </article>
      <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="btn-secondary text-sm">← Back to course map</Link>
        {!unitProgress?.lessonComplete ? (
          <button onClick={handleLessonComplete} className="btn-primary" aria-label="Mark lesson as complete and continue to exercises">
            Complete lesson → Exercises
          </button>
        ) : (
          <Link to={`/exercises/${level?.toUpperCase()}/${unit}`} className="btn-primary" aria-label="Go to exercises">
            Continue to exercises →
          </Link>
        )}
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-64" role="status" aria-live="polite">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-bounce" aria-hidden="true">📖</div>
        <p className="text-content-secondary">Loading lesson...</p>
      </div>
    </div>
  )
}

function ErrorState({ error, level, unit }) {
  return (
    <div className="max-w-lg mx-auto text-center py-16" role="alert">
      <div className="text-5xl mb-4" aria-hidden="true">🚧</div>
      <h1 className="text-xl font-semibold text-content-primary mb-2">Lesson coming soon</h1>
      <p className="text-content-secondary mb-6">This lesson is still being prepared. Check back soon!</p>
      <Link to="/" className="btn-primary">← Back to course map</Link>
    </div>
  )
}
```

---

### app/src/pages/ExercisesPage.jsx

```jsx
// src/pages/ExercisesPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExerciseEngine from '../components/exercises/ExerciseEngine';
import { useProgress } from '../hooks/useProgress';

export default function ExercisesPage() {
  const { level, unit } = useParams();
  const navigate = useNavigate();
  const { completeExercises, isExercisesComplete } = useProgress();

  const [exercises, setExercises] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resolvedLevel = level || 'A1';
  const resolvedUnit = unit || 'unit-01-greetings';
  const unitKey = `${resolvedLevel}-${resolvedUnit}`;

  useEffect(() => {
    setLoading(true);
    setError(null);
    const base = `/Espanol-Course/content/${resolvedLevel}/${resolvedUnit}`;
    Promise.all([
      fetch(`${base}/exercises.json`).then((r) => {
        if (!r.ok) throw new Error(`exercises.json not found (${r.status})`);
        return r.json();
      }),
      fetch(`${base}/meta.json`).then((r) => {
        if (!r.ok) throw new Error(`meta.json not found (${r.status})`);
        return r.json();
      }),
    ])
      .then(([exData, metaData]) => {
        setExercises(exData);
        setMeta(metaData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [resolvedLevel, resolvedUnit]);

  const handleComplete = (score, total, xpEarned) => {
    completeExercises(unitKey, score, total, xpEarned);
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${resolvedLevel}/${resolvedUnit}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Loading exercises…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-4xl">😕</p>
        <h2 className="text-xl font-bold text-white">Couldn't load exercises</h2>
        <p className="text-slate-400 text-sm font-mono bg-slate-800 rounded-lg px-3 py-2">{error}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">Go back</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          <button onClick={() => navigate(`/lesson/${resolvedLevel}/${resolvedUnit}`)} className="hover:text-slate-300 transition-colors">
            {meta?.title || resolvedUnit}
          </button>
          <span>›</span>
          <span className="text-indigo-400">Exercises</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Practice</h1>
        <p className="text-slate-400 text-sm">Answer all {exercises.length} exercises to unlock the quiz. Wrong answers must be corrected before moving on.</p>
      </div>
      {isExercisesComplete(unitKey) && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30">
          <span className="text-green-400">✓</span>
          <div>
            <p className="text-green-300 font-semibold text-sm">Exercises already completed</p>
            <p className="text-green-400/70 text-xs">Quiz is unlocked — you can retake these for practice</p>
          </div>
          <button onClick={handleStartQuiz} className="ml-auto px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-semibold hover:bg-green-500/30 transition-colors whitespace-nowrap">
            Go to Quiz
          </button>
        </div>
      )}
      <ExerciseEngine
        exercises={exercises}
        level={resolvedLevel}
        unit={resolvedUnit}
        onComplete={handleComplete}
        onStartQuiz={handleStartQuiz}
      />
    </div>
  );
}
```

---

### app/src/pages/QuizPage.jsx

```jsx
// src/pages/QuizPage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

export default function QuizPage() {
  const { level, unit } = useParams()
  const navigate = useNavigate()
  const { isQuizUnlocked, markQuizComplete, getUnitProgress } = useProgress()

  const resolvedLevel = (level || 'A1').toUpperCase()
  const resolvedUnit = unit || 'unit-01-greetings'
  const unitKey = `${resolvedLevel}-${resolvedUnit}`

  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/Espanol-Course/content/${resolvedLevel}/${resolvedUnit}/quiz.json`)
      .then(r => {
        if (!r.ok) throw new Error(`quiz.json not found (${r.status})`)
        return r.json()
      })
      .then(data => {
        setQuizData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [resolvedLevel, resolvedUnit])

  useEffect(() => {
    if (!loading && !isQuizUnlocked(unitKey)) {
      navigate(`/exercises/${resolvedLevel}/${resolvedUnit}`, { replace: true })
    }
  }, [loading, unitKey])

  function handleSelect(idx) {
    if (submitted) return
    setSelected(idx)
  }

  function handleSubmit() {
    if (selected === null) return
    const correct = selected === question.answer
    if (correct) setScore(s => s + 1)
    setSubmitted(true)
  }

  function handleNext() {
    if (currentIndex + 1 >= quizData.questions.length) {
      const finalScore = submitted && selected === question.answer ? score + 1 : score
      const total = quizData.questions.length
      const pct = Math.round((finalScore / total) * 100)
      markQuizComplete(unitKey, pct)
      setFinished(true)
    } else {
      setCurrentIndex(i => i + 1)
      setSelected(null)
      setSubmitted(false)
    }
  }

  function handleRetry() {
    setCurrentIndex(0)
    setSelected(null)
    setSubmitted(false)
    setScore(0)
    setFinished(false)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Loading quiz…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-4xl">😕</p>
        <h2 className="text-xl font-bold text-white">Couldn't load quiz</h2>
        <p className="text-slate-400 text-sm font-mono bg-slate-800 rounded-lg px-3 py-2">{error}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">Go back</button>
      </div>
    )
  }

  const questions = quizData.questions
  const total = questions.length
  const question = questions[currentIndex]
  const passingScore = quizData.passing_score || 70

  if (finished) {
    const pct = Math.round((score / total) * 100)
    const passed = pct >= passingScore
    return (
      <div className="max-w-md mx-auto px-4 py-8 text-center space-y-8">
        <div className="relative w-40 h-40 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={passed ? '#10b981' : '#ef4444'} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
              style={{ transition: 'stroke-dashoffset 1s ease' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{pct}%</span>
            <span className="text-slate-400 text-xs">{score}/{total} correct</span>
          </div>
        </div>
        {passed ? (
          <div className="space-y-2">
            <p className="text-2xl font-bold text-green-400">¡Excelente! Unit complete!</p>
            <p className="text-slate-400 text-sm">You passed with {pct}% — the next unit is now unlocked.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-2xl font-bold text-red-400">Not quite — {pct}%</p>
            <p className="text-slate-400 text-sm">You need {passingScore}% to pass. Review the lesson and try again.</p>
          </div>
        )}
        {passed && (
          <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 mx-auto w-fit">
            <span className="text-2xl">⭐</span>
            <div className="text-left">
              <p className="text-amber-300 font-bold text-lg">+50 XP</p>
              <p className="text-amber-400/70 text-xs">Unit complete</p>
            </div>
          </div>
        )}
        <div className="space-y-3">
          {passed ? (
            <>
              <Link to="/" className="block w-full py-4 rounded-xl font-bold text-white text-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-indigo-500/25">Back to course map →</Link>
              <Link to={`/flashcards/${resolvedLevel}/${resolvedUnit}`} className="block w-full py-3 rounded-xl font-medium text-slate-300 text-center bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-colors">Review flashcards</Link>
            </>
          ) : (
            <>
              <button onClick={handleRetry} className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200">Try again</button>
              <Link to={`/lesson/${resolvedLevel}/${resolvedUnit}`} className="block w-full py-3 rounded-xl font-medium text-slate-300 text-center bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-colors">Review lesson</Link>
            </>
          )}
        </div>
      </div>
    )
  }

  const isCorrect = submitted && selected === question.answer
  const optionStyle = (idx) => {
    if (!submitted) {
      return selected === idx ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-400 hover:bg-slate-700'
    }
    if (idx === question.answer) return 'border-green-500 bg-green-500/10 text-green-300'
    if (idx === selected && !isCorrect) return 'border-red-500 bg-red-500/10 text-red-300'
    return 'border-slate-700 bg-slate-800/50 text-slate-500'
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          <span>{quizData.title || 'Unit Quiz'}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Checkpoint Quiz</h1>
          <span className="font-semibold text-white text-sm">{score}<span className="text-slate-500 font-normal"> / {total} correct</span></span>
        </div>
      </div>
      <div className="flex gap-1">
        {questions.map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-300 ${i < currentIndex ? 'bg-indigo-500' : i === currentIndex ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'}`} />
        ))}
      </div>
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/60 p-5 shadow-xl space-y-5">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Question {currentIndex + 1} of {total}</span>
        <p className="text-lg font-medium text-white leading-relaxed">{question.prompt}</p>
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleSelect(idx)} className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${optionStyle(idx)}`}>
              <span className="inline-flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">{String.fromCharCode(65 + idx)}</span>
                {opt}
              </span>
            </button>
          ))}
        </div>
        {submitted && (
          <div className={`rounded-xl border p-4 space-y-1 ${isCorrect ? 'border-green-500/40 bg-green-500/10' : 'border-red-500/40 bg-red-500/10'}`}>
            <p className={`font-semibold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</p>
            <p className="text-slate-300 text-sm">{question.explanation}</p>
          </div>
        )}
        {!submitted ? (
          <button onClick={handleSubmit} disabled={selected === null} className="w-full py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white">Check Answer</button>
        ) : (
          <button onClick={handleNext} className="w-full py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">{currentIndex + 1 >= total ? 'See Results' : 'Next Question →'}</button>
        )}
      </div>
    </div>
  )
}
```

---

### app/src/pages/FlashcardsPage.jsx

```jsx
// src/pages/FlashcardsPage.jsx
// IMPORTANT: card must be defined at the TOP of the component (before any functions)
// Defining it lower caused a black screen crash in a previous session.
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

export default function FlashcardsPage() {
  const { level, unit } = useParams()
  const navigate = useNavigate()
  const { getDueVocab, rateVocabCard, addXP } = useProgress()

  const resolvedLevel = (level || 'A1').toUpperCase()
  const resolvedUnit = unit || 'unit-01-greetings'

  const [allVocab, setAllVocab] = useState([])
  const [dueCards, setDueCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [sessionReviewed, setSessionReviewed] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)

  // card and total MUST be defined here at the top so handleRate can access them
  const card = dueCards[currentIndex]
  const total = dueCards.length

  useEffect(() => {
    setLoading(true)
    setDone(false)
    setCurrentIndex(0)
    setSessionReviewed(0)
    fetch(`/Espanol-Course/content/${resolvedLevel}/${resolvedUnit}/vocab.json`)
      .then(r => {
        if (!r.ok) throw new Error(`vocab.json not found (${r.status})`)
        return r.json()
      })
      .then(data => {
        setAllVocab(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [resolvedLevel, resolvedUnit])

  useEffect(() => {
    if (allVocab.length === 0) return
    const due = getDueVocab(allVocab)
    setDueCards(due)
    setCurrentIndex(0)
    setDone(due.length === 0)
  }, [allVocab])

  function handleFlip() {
    setIsFlipped(f => !f)
  }

  function handleRate(rating) {
    if (!card) return
    rateVocabCard(card.id, rating)
    addXP(2)
    setSessionReviewed(n => n + 1)
    setIsFlipped(false)
    if (rating === 0) {
      setDueCards(prev => {
        const rest = prev.filter((_, i) => i !== currentIndex)
        return [...rest, card]
      })
    } else {
      setDueCards(prev => {
        const rest = prev.filter((_, i) => i !== currentIndex)
        if (rest.length === 0) setTimeout(() => setDone(true), 300)
        return rest
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Loading flashcards…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-4xl">😕</p>
        <h2 className="text-xl font-bold text-white">Couldn't load vocab</h2>
        <p className="text-slate-400 text-sm font-mono bg-slate-800 rounded-lg px-3 py-2">{error}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">Go back</button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">You're all caught up!</h2>
          <p className="text-slate-400">
            {sessionReviewed > 0 ? `You reviewed ${sessionReviewed} card${sessionReviewed !== 1 ? 's' : ''} this session.` : 'No cards are due for review today.'}
          </p>
        </div>
        <div className="px-5 py-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
          <p className="text-indigo-300 font-semibold text-sm">Come back tomorrow</p>
          <p className="text-slate-400 text-xs">Your cards are scheduled — the ones you found hard will appear sooner, easy ones later.</p>
        </div>
        {sessionReviewed > 0 && (
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{sessionReviewed}</p>
              <p className="text-slate-500 text-xs">Cards reviewed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">+{sessionReviewed * 2}</p>
              <p className="text-slate-500 text-xs">XP earned</p>
            </div>
          </div>
        )}
        <div className="space-y-3">
          <button onClick={() => navigate(`/lesson/${resolvedLevel}/${resolvedUnit}`)} className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors">Back to lesson</button>
          <button onClick={() => navigate('/')} className="w-full py-3 rounded-xl font-medium text-slate-300 bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-colors">Course map</button>
        </div>
      </div>
    )
  }

  if (!card) return null

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold gradient-text mb-1">Flashcard Drills</h1>
        <p className="text-content-secondary text-sm">{total} card{total !== 1 ? 's' : ''} to review · {sessionReviewed} reviewed this session</p>
      </div>
      <div className="progress-bar mb-8">
        <div className="progress-fill" style={{ width: `${(sessionReviewed / (sessionReviewed + total)) * 100}%` }} role="progressbar" aria-label={`${sessionReviewed} of ${sessionReviewed + total} reviewed`} />
      </div>
      {card.pronunciation_hint && (
        <div className="flex justify-center mb-3">
          <span className="text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">🔊 {card.pronunciation_hint}</span>
        </div>
      )}
      <div className="relative cursor-pointer mb-8" style={{ perspective: '1000px' }} onClick={handleFlip} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') ? handleFlip() : null} role="button" tabIndex={0}
        aria-label={isFlipped ? `Spanish: ${card.word}. Press to flip back.` : `English: ${card.translation}. Press to reveal Spanish.`}>
        <div className="relative w-full transition-transform duration-500" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: '280px' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 text-center" style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, #ec4899, #f59e0b)' }} aria-hidden={isFlipped}>
            <p className="text-white/70 text-sm mb-3 uppercase tracking-wider">English</p>
            <p className="text-white text-3xl font-bold mb-4">{card.translation}</p>
            {card.part_of_speech && <p className="text-white/60 text-xs uppercase tracking-widest mb-3">{card.part_of_speech}</p>}
            <p className="text-white/50 text-xs mt-4">Tap to reveal Spanish</p>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} aria-hidden={!isFlipped}>
            <p className="text-white/70 text-sm mb-3 uppercase tracking-wider">Spanish</p>
            <p className="text-white text-4xl font-bold mb-3">{card.word}</p>
            {card.example_sentence && <p className="text-white/80 text-sm italic mb-1">"{card.example_sentence}"</p>}
            {card.example_translation && <p className="text-white/50 text-xs italic">"{card.example_translation}"</p>}
          </div>
        </div>
      </div>
      {isFlipped && (
        <div className="flex gap-3 justify-center animate-fade-in" role="group" aria-label="How well did you know this?">
          {[
            { label: 'Missed', color: 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30', value: 0 },
            { label: 'Hard', color: 'bg-orange-500/20 border-orange-500/40 text-orange-400 hover:bg-orange-500/30', value: 1 },
            { label: 'Good', color: 'bg-blue-500/20 border-blue-500/40 text-blue-400 hover:bg-blue-500/30', value: 2 },
            { label: 'Easy', color: 'bg-green-500/20 border-green-500/40 text-green-400 hover:bg-green-500/30', value: 3 },
          ].map(btn => (
            <button key={btn.label} onClick={() => handleRate(btn.value)} className={`flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${btn.color}`} aria-label={`Rate as ${btn.label}`}>
              {btn.label}
            </button>
          ))}
        </div>
      )}
      {!isFlipped && <p className="text-center text-content-secondary text-sm">Tap the card to reveal the Spanish</p>}
    </div>
  )
}
```

---

### app/src/pages/CourseMapPage.jsx

```jsx
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

const COURSE_STRUCTURE = [
  {
    level: 'A1',
    title: 'Foundations',
    description: 'Pronunciation, greetings, numbers, colors, basic present tense',
    color: 'from-indigo-500 to-purple-500',
    units: [
      { id: 'unit-01-greetings', title: 'Greetings & Introductions' },
      { id: 'unit-02-numbers',   title: 'Numbers & Counting' },
      { id: 'unit-03-colors',    title: 'Colors & Descriptions' },
      { id: 'unit-04-time',      title: 'Days, Months & Time' },
      { id: 'unit-05-family',    title: 'Family & People' },
      { id: 'unit-06-food',      title: 'Food & Drink' },
      { id: 'unit-07-places',    title: 'Places & Directions' },
      { id: 'unit-08-routines',  title: 'Daily Routines' },
      { id: 'unit-09-weather',   title: 'Weather & Seasons' },
      { id: 'unit-10-review',    title: 'A1 Review & Checkpoint' },
    ],
  },
  { level: 'A2', title: 'Building Blocks', description: 'Past tenses, reflexive verbs, common expressions, everyday vocabulary', color: 'from-purple-500 to-pink-500', units: [], comingSoon: true },
  { level: 'B1', title: 'Intermediate Fluency', description: 'Subjunctive intro, future & conditional, idioms, Latin American dialects', color: 'from-pink-500 to-rose-500', units: [], comingSoon: true },
  { level: 'B2', title: 'Advanced Expression', description: 'Subjunctive mastery, complex grammar, cultural context, debate & persuasion', color: 'from-rose-500 to-orange-500', units: [], comingSoon: true },
  { level: 'C1', title: 'Near-Native Proficiency', description: 'Nuanced writing, literature & media, regional variation, professional Spanish', color: 'from-orange-500 to-amber-500', units: [], comingSoon: true },
]

export default function CourseMapPage() {
  const { getUnitProgress } = useProgress()

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Your Spanish Journey</h1>
        <p className="text-content-secondary text-lg max-w-xl mx-auto">From complete beginner to near-native fluency — anchored in Mexican Spanish.</p>
      </div>
      <div className="space-y-6">
        {COURSE_STRUCTURE.map((levelData) => {
          const isLevelLocked = levelData.comingSoon
          return (
            <section key={levelData.level} aria-label={`${levelData.level} — ${levelData.title}`} className={`card ${isLevelLocked ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`bg-gradient-to-r ${levelData.color} text-white font-bold text-sm px-4 py-1.5 rounded-full`}>{levelData.level}</span>
                  <div>
                    <h2 className="font-semibold text-lg text-content-primary">{levelData.title}</h2>
                    <p className="text-content-secondary text-sm">{levelData.description}</p>
                  </div>
                </div>
                {isLevelLocked && <span className="text-content-secondary text-sm bg-surface-hover px-3 py-1 rounded-full">Coming soon</span>}
              </div>
              {!isLevelLocked && levelData.units.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {levelData.units.map((unit, index) => {
                    const unitKey = `${levelData.level}-${unit.id}`
                    const progress = getUnitProgress(unitKey)
                    const isComplete = !!progress?.complete
                    let isAvailable = false
                    if (index === 0) {
                      isAvailable = true
                    } else {
                      const prevUnit = levelData.units[index - 1]
                      const prevKey = `${levelData.level}-${prevUnit.id}`
                      const prevProgress = getUnitProgress(prevKey)
                      isAvailable = !!prevProgress?.complete
                    }
                    return (
                      <UnitCard key={unit.id} level={levelData.level} unit={unit} isAvailable={isAvailable} isComplete={isComplete} progress={progress} />
                    )
                  })}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

function UnitCard({ level, unit, isAvailable, isComplete, progress }) {
  const CardWrapper = isAvailable ? Link : 'div'
  const linkProps = isAvailable ? { to: `/lesson/${level}/${unit.id}` } : {}
  return (
    <CardWrapper {...linkProps}
      className={`group relative flex flex-col gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${isComplete ? 'bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-500/60' : isAvailable ? 'bg-surface-main border-white/10 hover:border-brand-primary hover:-translate-y-0.5 cursor-pointer' : 'bg-surface-main border-white/5 cursor-not-allowed'}`}
      aria-label={`${unit.title}${!isAvailable ? ' — locked' : ''}`}>
      <span className="text-lg" aria-hidden="true">{isComplete ? '✅' : isAvailable ? '📖' : '🔒'}</span>
      <span className={`text-sm font-medium leading-tight ${isAvailable ? 'text-content-primary' : 'text-content-secondary'}`}>{unit.title}</span>
      {progress?.percent > 0 && !isComplete && (
        <div className="progress-bar h-1.5">
          <div className="progress-fill" style={{ width: `${progress.percent}%` }} role="progressbar" aria-valuenow={progress.percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress.percent}% complete`} />
        </div>
      )}
    </CardWrapper>
  )
}
```

---

## How to start a new chat session

1. Start a new Claude chat
2. Paste the entire contents of this document as your first message
3. Claude will have full project context and actual source code — no guessing required
4. Add your instructions after the document

*This document must be updated at the end of every build session.*

# Espanol-Course — Project Handoff Document
## For use at the start of a new chat session
**Handoff version:** v0.2.0 — Current as of 2026-03-15

---

## ⚠️ CRITICAL INSTRUCTIONS FOR CLAUDE — READ BEFORE DOING ANYTHING

This project had serious breakage in a previous session because Claude rewrote files without reading their actual source code first. The root cause was guessing at internal structures instead of knowing them.

**Before writing any code, Claude must:**
1. Read every file listed in the "Critical source files" section below — they are included in full
2. Never rename, restructure, or change the signature of any function in `useProgress.js` without checking every file that calls it
3. Never change the `unitKey` format — it is always `"LEVEL-unit-XX-slug"` e.g. `"A1-unit-01-greetings"`
4. Always deliver a zip file — never just paste code and ask the user to copy it manually
5. Always put content files in BOTH locations in the zip (see Content serving note below)

**The files that broke things before and why:**
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
**Current version:** v0.2.0

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

### A2 unit list (all 12 — locked)
1. unit-01-present-tense — Present Tense Review & Stem-Changers
2. unit-02-reflexive-verbs — Reflexive Verbs & Daily Routines
3. unit-03-ser-estar — Ser vs. Estar — Deep Dive
4. unit-04-preterite-regular — Preterite Tense — Regular Verbs
5. unit-05-preterite-irregular — Preterite Tense — Irregular Verbs *(not yet built)*
6. unit-06-imperfect — Imperfect Tense *(not yet built)*
7. unit-07-preterite-vs-imperfect — Preterite vs. Imperfect *(not yet built)*
8. unit-08-object-pronouns — Direct & Indirect Object Pronouns *(not yet built)*
9. unit-09-expressions — Common Expressions & Idioms *(not yet built)*
10. unit-10-shopping — Shopping & Money *(not yet built)*
11. unit-11-travel — Travel & Transportation *(not yet built)*
12. unit-12-review — A2 Review & Checkpoint *(not yet built)*

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
│   │   │   ├── icon-192.png
│   │   │   └── icon-512.png
│   │   └── content/
│   │       ├── A1/
│   │       │   ├── unit-01-greetings/  ← 5 files
│   │       │   ├── unit-02-numbers/    ← 5 files
│   │       │   ├── unit-03-colors/     ← 5 files
│   │       │   ├── unit-04-time/       ← 5 files
│   │       │   ├── unit-05-family/     ← 5 files
│   │       │   ├── unit-06-food/       ← 5 files
│   │       │   ├── unit-07-places/     ← 5 files
│   │       │   ├── unit-08-routines/   ← 5 files
│   │       │   ├── unit-09-weather/    ← 5 files
│   │       │   └── unit-10-review/     ← 5 files
│   │       └── A2/
│   │           ├── unit-01-present-tense/    ← 5 files ✅ NEW v0.2.0
│   │           ├── unit-02-reflexive-verbs/  ← 5 files ✅ NEW v0.2.0
│   │           ├── unit-03-ser-estar/        ← 5 files ✅ NEW v0.2.0
│   │           └── unit-04-preterite-regular/ ← 5 files ✅ NEW v0.2.0
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
│           ├── CourseMapPage.jsx   ← UPDATED v0.2.0 (A2 units 1–4 added)
│           ├── LessonPage.jsx
│           ├── ExercisesPage.jsx
│           ├── QuizPage.jsx
│           ├── FlashcardsPage.jsx
│           └── ProgressPage.jsx
├── content/
│   ├── A1/
│   │   └── unit-01-greetings/ through unit-10-review/
│   └── A2/
│       ├── unit-01-present-tense/    ← 5 files ✅ NEW v0.2.0
│       ├── unit-02-reflexive-verbs/  ← 5 files ✅ NEW v0.2.0
│       ├── unit-03-ser-estar/        ← 5 files ✅ NEW v0.2.0
│       └── unit-04-preterite-regular/ ← 5 files ✅ NEW v0.2.0
└── assets/audio/ (empty — TTS not yet generated)
```

---

## What is working in v0.2.0

- ✅ Full learning loop: Lesson → Exercises → Quiz → Unit complete → Next unit unlocks
- ✅ A1 Units 1–10 — all content complete and working
- ✅ A2 Units 1–4 — content complete, wired into CourseMapPage
- ✅ A2 unlock logic — A2 Unit 1 requires A1 Unit 10 complete; subsequent A2 units unlock sequentially
- ✅ A2 "More units coming soon" badge on course map
- ✅ Exercise engine — 4 types: MCQ, fill-in-blank, translation, sentence assembly
- ✅ Flashcard engine — loads from vocab.json, SM-2 spaced repetition, English→Spanish direction
- ✅ Quiz engine — loads from quiz.json, pass/fail screens, score ring, XP
- ✅ Progress tracking — XP, streak, per-unit completion in localStorage
- ✅ PWA app icons — icon-192.png and icon-512.png in place
- ✅ GitHub Actions auto-deploy

## Known issues / not yet built

- ❌ A2 Units 5–12 content not yet written (next: units 5–8)
- ❌ Audio files — TTS generation not run yet (needs Google Cloud account setup)
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
1. `/content/A2/unit-XX-slug/` — source of truth
2. `/app/public/content/A2/unit-XX-slug/` — served copy

When delivering a zip, Claude must include both locations. The user unzips and merges — they do not need to manually copy files.

### CourseMapPage.jsx — A2 unlock logic
A2 Unit 1 (`unit-01-present-tense`) is gated behind A1 completion:
```jsx
if (levelData.level === 'A2' && index === 0) {
  const lastA1Key = 'A1-unit-10-review'
  const lastA1Progress = getUnitProgress(lastA1Key)
  isAvailable = !!lastA1Progress?.complete
}
```
All subsequent A2 units unlock sequentially as normal. When adding A2 units 5–12, simply add them to the `units` array in `COURSE_STRUCTURE` — the unlock logic handles them automatically.

### useProgress.js — the most dangerous file to modify
Every page depends on this file. The functions it exports and their signatures must not change without updating every caller. See full source below.

---

## Next steps (in priority order)

1. **A2 Units 5–8** — next content batch (preterite irregular, imperfect, preterite vs imperfect, object pronouns)
2. **A2 Units 9–12** — final content batch (expressions, shopping, travel, A2 review)
3. **Fix deprecated meta tag** — one line in `app/index.html`, change `apple-mobile-web-app-capable` to `mobile-web-app-capable`
4. **Audio** — requires user to set up Google Cloud TTS account. Run `tools/generate-audio.py`
5. **Placement test** — planned for end of v1.0

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
  "id": "A2-U01",
  "title": "Present Tense Review & Stem-Changers",
  "level": "A2",
  "unit": 1,
  "slug": "present-tense",
  "estimated_minutes": 25,
  "topics": ["present tense", "stem-changing verbs"],
  "prereqs": ["A1-U10"],
  "cefr_skills": ["speaking", "listening", "reading", "writing"],
  "cultural_note": true,
  "audio_available": false,
  "status": "draft",
  "version": "0.2.0"
}
```

### vocab.json item
```json
{
  "id": "A2-U01-V001",
  "word": "querer",
  "translation": "to want",
  "pronunciation_hint": "keh-REHR",
  "part_of_speech": "verb (e→ie stem-changer)",
  "example_sentence": "Quiero un café, por favor.",
  "example_translation": "I want a coffee, please.",
  "audio_file": "A2/unit-01/querer.mp3",
  "tags": ["verb", "stem-changer", "essential"]
}
```

### exercises.json item
```json
{
  "id": "A2-U01-E001",
  "type": "multiple_choice",
  "prompt": "Question text here",
  "options": ["A", "B", "C", "D"],
  "answer": 0,
  "explanation": "Why this answer is correct"
}
```

**For sentence_assembly type, use `"words"` not `"options"`:**
```json
{
  "id": "A2-U01-E008",
  "type": "sentence_assembly",
  "prompt": "Arrange the words...",
  "words": ["Prefiero", "el", "carro", "rojo."],
  "answer": "Prefiero el carro rojo.",
  "explanation": "..."
}
```

Valid exercise types: `multiple_choice`, `fill_in_blank`, `translation`, `sentence_assembly`

### quiz.json
```json
{
  "id": "A2-U01-Q",
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

4. quiz.json — JSON object with id, title, passing_score: 70, and questions array of
   8 multiple_choice questions testing the lesson content.
```

---

## Changelog summary

| Version | Date | What changed |
|---------|------|-------------|
| v0.2.0 | 2026-03-15 | A2 Units 1–4 content + CourseMapPage updated with A2 unlock logic |
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
  {
    level: 'A2',
    title: 'Building Blocks',
    description: 'Past tenses, reflexive verbs, common expressions, everyday vocabulary',
    color: 'from-purple-500 to-pink-500',
    units: [
      { id: 'unit-01-present-tense',     title: 'Present Tense Review & Stem-Changers' },
      { id: 'unit-02-reflexive-verbs',   title: 'Reflexive Verbs & Daily Routines' },
      { id: 'unit-03-ser-estar',         title: 'Ser vs. Estar — Deep Dive' },
      { id: 'unit-04-preterite-regular', title: 'Preterite Tense — Regular Verbs' },
    ],
    comingSoon: false,
    partialContent: true,
  },
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
                {levelData.partialContent && <span className="text-content-secondary text-sm bg-surface-hover px-3 py-1 rounded-full">More units coming soon</span>}
              </div>
              {!isLevelLocked && levelData.units.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {levelData.units.map((unit, index) => {
                    const unitKey = `${levelData.level}-${unit.id}`
                    const progress = getUnitProgress(unitKey)
                    const isComplete = !!progress?.complete
                    let isAvailable = false
                    if (levelData.level === 'A2' && index === 0) {
                      const lastA1Key = 'A1-unit-10-review'
                      const lastA1Progress = getUnitProgress(lastA1Key)
                      isAvailable = !!lastA1Progress?.complete
                    } else if (index === 0) {
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
2. Upload `Espanol-Course-Handoff-v0.2.0.md` as a file attachment
3. Claude will have full project context and actual source code — no guessing required
4. Add your instructions after uploading

*This document must be updated at the end of every build session.*

# Espanol-Course — Project Handoff Document
## For use at the start of a new chat session
**Handoff version:** v0.6.0 — Current as of 2026-03-16

---

## ⚠️ CRITICAL INSTRUCTIONS FOR CLAUDE — READ BEFORE DOING ANYTHING

This project had serious breakage in a previous session because Claude rewrote files without reading their actual source code first.

**Before writing any code, Claude must:**
1. Read every file listed in the "Critical source files" section below
2. Never rename, restructure, or change the signature of any function in `useProgress.js`
3. Never change the `unitKey` format — always `"LEVEL-unit-XX-slug"` e.g. `"B2-unit-01-subjunctive-past"`
4. Always deliver a zip file — never paste code and ask the user to copy it manually
5. Always put content files in BOTH locations in the zip (see Content serving note)
6. Always run the self-check validator before zipping (see Exercise schema rules below)

---

## ⚠️ EXERCISE AND QUIZ SCHEMA — STRICT RULES

Every exercise in `exercises.json` and every question in `quiz.json` must follow these rules exactly. Claude must self-validate before delivering any zip.

**For `multiple_choice`, `fill_in_blank`, and `translation`:**
- Must have `"options"`: an array of exactly 4 strings
- Must have `"answer"`: an integer in range 0–3 (index into options array)
- Never use a string as the answer value — always an integer index

**For `sentence_assembly`:**
- Must have `"words"`: an array of strings
- Must have `"answer"`: a string containing the correct assembled sentence
- Must NOT have `"options"`

**For `quiz.json`:**
- All questions must be `multiple_choice` — no other types
- `passing_score` must be 70
- Every question must have 4 options and an integer answer in range 0–3

**The common failure mode:** Writing `fill_in_blank` or `translation` exercises with a raw string answer and no options array. These look valid but break the exercise engine silently at runtime. If you cannot think of 4 plausible options, convert to `multiple_choice` instead.

**Claude must run a self-check before zipping** that verifies every answer is an integer, every non-assembly exercise has a 4-item options array, and every assembly exercise has a words array. If any file fails, fix it before delivering the zip.

---

## Project overview

**Mission:** The most complete free Spanish course for English speakers seeking fluency in Mexican Spanish.

**GitHub repo:** `github.com/SoCar37/Espanol-Course`
**Live URL:** `https://SoCar37.github.io/Espanol-Course`
**GitHub username:** SoCar37
**Local working copy:** `D:\Files\Coding\Espanol-Course`
**Current version:** v0.6.0

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

### A1 unit list (complete ✅)
1. unit-01-greetings — Greetings & Introductions
2. unit-02-numbers — Numbers & Counting
3. unit-03-colors — Colors & Descriptions
4. unit-04-time — Days, Months & Time
5. unit-05-family — Family & People
6. unit-06-food — Food & Drink
7. unit-07-places — Places & Directions
8. unit-08-routines — Daily Routines
9. unit-09-weather — Weather & Seasons
10. unit-10-review — A1 Review & Checkpoint

### A2 unit list (complete ✅)
1. unit-01-present-tense — Present Tense Review & Stem-Changers
2. unit-02-reflexive-verbs — Reflexive Verbs & Daily Routines
3. unit-03-ser-estar — Ser vs. Estar — Deep Dive
4. unit-04-preterite-regular — Preterite Tense — Regular Verbs
5. unit-05-preterite-irregular — Preterite Tense — Irregular Verbs
6. unit-06-imperfect — The Imperfect Tense
7. unit-07-preterite-vs-imperfect — Preterite vs. Imperfect
8. unit-08-object-pronouns — Direct & Indirect Object Pronouns
9. unit-09-expressions — Common Expressions & Idioms
10. unit-10-shopping — Shopping & Money
11. unit-11-travel — Travel & Transportation
12. unit-12-review — A2 Review & Checkpoint

### B1 unit list (complete ✅)
1. unit-01-subjunctive-intro — Introduction to the Subjunctive
2. unit-02-future-tense — The Future Tense
3. unit-03-conditional — The Conditional Tense
4. unit-04-por-vs-para — Por vs. Para
5. unit-05-relative-clauses — Relative Clauses
6. unit-06-passive-voice — Passive Voice & Se Constructions
7. unit-07-idiomatic-verbs — Idiomatic Verbs
8. unit-08-opinion-debate — Expressing Opinions & Debate
9. unit-09-formal-writing — Formal Writing & Email
10. unit-10-mexican-culture — Mexican Culture & Traditions
11. unit-11-regional-language — Regional Language & Slang
12. unit-12-review — B1 Review & Checkpoint

### B2 unit list (complete ✅)
1. unit-01-subjunctive-past — Past Subjunctive
2. unit-02-subjunctive-advanced — Advanced Subjunctive Uses
3. unit-03-if-clauses — If-Clauses (Si Clauses)
4. unit-04-complex-sentences — Complex Sentences & Connectors
5. unit-05-vocabulary-expansion — Vocabulary Expansion Strategies
6. unit-06-media-culture — Mexican Media & Pop Culture
7. unit-07-argumentation — Argumentation & Persuasion
8. unit-08-nuanced-expressions — Nuanced Expressions & Register
9. unit-09-literature — Mexican Literature & Poetry
10. unit-10-business-spanish — Business Spanish
11. unit-11-social-issues — Social Issues & Current Events
12. unit-12-review — B2 Review & Checkpoint

### C1 unit list (complete ✅)
1. unit-01-advanced-grammar — Advanced Grammar Consolidation
2. unit-02-stylistics — Stylistics & Written Register
3. unit-03-rhetoric — Rhetoric & Advanced Argumentation
4. unit-04-mexican-history — Mexican History & Politics
5. unit-05-literature-advanced — Advanced Literary Analysis
6. unit-06-media-analysis — Media Analysis & Critical Reading
7. unit-07-professional-writing — Professional & Academic Writing
8. unit-08-translation — Translation & Interpretation Skills
9. unit-09-regional-variation — Regional Variation & Dialects
10. unit-10-review — C1 Review & Final Checkpoint

### Versioning
- **Semver:** v0.6.0 → v0.6.x (pre-launch polish) → v1.0.0 (public launch)
- **Folder structure:** `/content/C1/unit-XX-slug/`
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
│   ├── vite.config.js
│   ├── public/
│   │   ├── manifest.json
│   │   ├── icons/
│   │   │   ├── icon-192.png
│   │   │   └── icon-512.png
│   │   └── content/
│   │       ├── A1/  ← unit-01 through unit-10 (5 files each)
│   │       ├── A2/  ← unit-01 through unit-12 (5 files each)
│   │       ├── B1/  ← unit-01 through unit-12 (5 files each)
│   │       ├── B2/  ← unit-01 through unit-12 (5 files each)
│   │       └── C1/  ← unit-01 through unit-10 (5 files each)
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles/globals.css
│       ├── hooks/useProgress.js
│       ├── utils/sm2.js
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
│           ├── CourseMapPage.jsx   ← A1–C1 fully wired (10+12+12+12+10 units)
│           ├── LessonPage.jsx
│           ├── ExercisesPage.jsx
│           ├── QuizPage.jsx
│           ├── FlashcardsPage.jsx
│           └── ProgressPage.jsx
├── content/
│   ├── A1/  ← unit-01 through unit-10
│   ├── A2/  ← unit-01 through unit-12
│   ├── B1/  ← unit-01 through unit-12
│   ├── B2/  ← unit-01 through unit-12
│   └── C1/  ← unit-01 through unit-10
└── assets/audio/ (empty — TTS not yet generated)
```

---

## What is working in v0.6.0

- ✅ Full learning loop: Lesson → Exercises → Quiz → Unit complete → Next unit unlocks
- ✅ A1 Units 1–10 — all content complete and working
- ✅ A2 Units 1–12 — all content complete and working
- ✅ B1 Units 1–12 — all content complete and working
- ✅ B2 Units 1–12 — all content complete and working
- ✅ C1 Units 1–10 — all content complete and working
- ✅ Sequential unlock across all levels: A1 → A2 → B1 → B2 → C1 gated correctly
- ✅ Exercise engine — 4 types: MCQ, fill-in-blank, translation, sentence assembly
- ✅ Flashcard engine — loads from vocab.json, SM-2 spaced repetition
- ✅ Quiz engine — loads from quiz.json, pass/fail screens, score ring, XP
- ✅ Progress tracking — XP, streak, per-unit completion in localStorage
- ✅ PWA app icons in place
- ✅ GitHub Actions auto-deploy
- ✅ All 56 units of content written (A1–C1)

## Known issues / not yet built

- ❌ Placement test not built (next priority before v1.0.0)
- ❌ README.md still reflects early scaffold — needs full update before launch
- ❌ CONTRIBUTING.md needs pre-launch review
- ❌ Audio files — TTS generation not run yet (needs Google Cloud account setup)
- ❌ Supabase accounts (v2.0)

---

## Critical architecture notes

### unitKey format — DO NOT CHANGE
Always: `"LEVEL-unit-XX-slug"` — e.g. `"C1-unit-09-regional-variation"`

Used by: `useProgress.js`, `LessonPage.jsx`, `ExercisesPage.jsx`, `QuizPage.jsx`, `CourseMapPage.jsx`

### Content serving — IMPORTANT
Content files must exist in TWO places:
1. `/content/C1/unit-XX-slug/` — source of truth
2. `/app/public/content/C1/unit-XX-slug/` — served copy

When delivering a zip, both locations must be included.

### Fetch URL pattern
`LessonPage.jsx` fetches content using:
```
/Espanol-Course/content/${level}/${unit}/lesson.md
/Espanol-Course/content/${level}/${unit}/meta.json
```
Where `level` is uppercase (A1, A2, B1, B2, C1) and `unit` is the full folder name.

**Unit IDs must match folder names exactly** in `CourseMapPage.jsx`.

### CourseMapPage.jsx — level unlock logic
- A1 Unit 1: always available
- A1 Units 2–10: sequential
- A2 Unit 1: gates on `'A1-unit-10-review'`
- A2 Units 2–12: sequential
- B1 Unit 1: gates on `'A2-unit-12-review'`
- B1 Units 2–12: sequential
- B2 Unit 1: gates on `'B1-unit-12-review'`
- B2 Units 2–12: sequential
- C1 Unit 1: gates on `'B2-unit-12-review'`
- C1 Units 2–10: sequential

---

## Next steps — critical path to v1.0.0

### Priority order

1. **Placement test** — determines starting level (A1–B2), unlocks accordingly. Not yet built.
   - **Files that will be touched:**
     - `app/src/App.jsx` — add new `/placement` route ⚠️ Claude needs this file before starting
     - `app/src/hooks/useProgress.js` — add a new `unlockLevel(level)` function (already in handoff; add carefully without breaking existing signatures)
     - `app/src/pages/PlacementTestPage.jsx` — new file to create
     - `app/src/components/layout/Layout.jsx` — may need a link/entry point to the placement test ⚠️ Claude needs this file before starting
   - **Design decisions locked:**
     - 30–40 MCQ questions spanning A1–B2 vocabulary and grammar
     - Places into A1, A2, B1, or B2 (C1 is never a placement target — users earn C1)
     - On first-ever visit (no progress in localStorage), show placement test prompt on Course Map
     - Passing score thresholds: A2 unlock at ~40%, B1 at ~60%, B2 at ~80% (to be confirmed)
     - Result unlocks the first unit of the placed level; all lower levels also unlock
   - **⚠️ Upload `App.jsx` and `Layout.jsx` at the start of the placement test session**

2. **README.md update** — current README reflects early scaffold. Before public launch, update to describe:
   - Full course scope (A1–C1, 56 units)
   - Live URL
   - How to run locally
   - How to contribute content
   - No source files needed; Claude can write this from scratch

3. **CONTRIBUTING.md review** — written for early-stage development. Review and update for public launch.
   - Upload current `CONTRIBUTING.md` at the start of that session

4. **Final QA pass** on live site at `https://SoCar37.github.io/Espanol-Course`

5. **Tag v1.0.0** and announce

### Post-launch (do not block v1.0.0)
- **Audio** — Google Cloud TTS Neural2 es-MX. Generator script at `tools/generate-audio.py`. Blocked on Google Cloud account setup.
- **Analytics** — Plausible, intentionally deferred post-launch
- **Supabase accounts** — v2.0.0

---

## Integrity check prompt

If you ever need to verify the exercise/quiz schema integrity of any level's content, use this prompt:

```
Please run an integrity check on the exercises.json and quiz.json files for all units in this level. For each file, verify:

1. Every exercise has id, type, prompt, answer, explanation
2. Every exercise type except sentence_assembly has an options array of exactly 4 strings
3. Every answer is an integer in range 0–3
4. Every sentence_assembly exercise has a words array and a string answer that contains all the words
5. Every quiz question is multiple_choice with 4 options and an integer answer in range 0–3
6. passing_score is 70 in every quiz

Report every file and exercise that fails any of these checks. If everything passes, say so explicitly. Do not fix anything — just report.
```

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
  "id": "C1-U01",
  "title": "Advanced Grammar Consolidation",
  "level": "C1",
  "unit": 1,
  "slug": "advanced-grammar",
  "estimated_minutes": 45,
  "topics": ["..."],
  "prereqs": ["B2-U12"],
  "cefr_skills": ["speaking", "listening", "reading", "writing"],
  "cultural_note": true,
  "audio_available": false,
  "status": "draft",
  "version": "0.6.0"
}
```

### exercises.json item — MCQ
```json
{
  "id": "C1-U01-E001",
  "type": "multiple_choice",
  "prompt": "Question text here",
  "options": ["A", "B", "C", "D"],
  "answer": 0,
  "explanation": "Why this answer is correct"
}
```

### exercises.json item — sentence_assembly
```json
{
  "id": "C1-U01-E008",
  "type": "sentence_assembly",
  "prompt": "Arrange the words...",
  "words": ["word1", "word2", "word3"],
  "answer": "word1 word2 word3",
  "explanation": "..."
}
```

### quiz.json
```json
{
  "id": "C1-U01-Q",
  "title": "Unit 1 Checkpoint Quiz",
  "passing_score": 70,
  "questions": [ ...8 multiple_choice items only... ]
}
```

---

## Self-check validator script

Claude must run this Python script before zipping any content:

```python
import json, os

BASE = "/home/claude/build/content/LEVEL"  # adjust path
units = sorted(u for u in os.listdir(BASE) if os.path.isdir(os.path.join(BASE, u)))
errors = []

for unit in units:
    upath = os.path.join(BASE, unit)
    for f in ["meta.json", "lesson.md", "vocab.json", "exercises.json", "quiz.json"]:
        if not os.path.exists(os.path.join(upath, f)):
            errors.append(f"{unit}: MISSING {f}")
    exercises = json.load(open(os.path.join(upath, "exercises.json")))
    for i, ex in enumerate(exercises):
        t = ex.get("type")
        if t in ("multiple_choice", "fill_in_blank", "translation"):
            if not ex.get("options"):
                errors.append(f"{unit}/exercises[{i}]: {t} has NO options array")
            ans = ex.get("answer")
            if not isinstance(ans, int):
                errors.append(f"{unit}/exercises[{i}]: answer must be int, got {type(ans).__name__}='{ans}'")
            elif not (0 <= ans <= 3):
                errors.append(f"{unit}/exercises[{i}]: answer {ans} out of range 0-3")
        if t == "sentence_assembly":
            if "words" not in ex:
                errors.append(f"{unit}/exercises[{i}]: assembly missing 'words'")
            if not isinstance(ex.get("answer"), str):
                errors.append(f"{unit}/exercises[{i}]: assembly answer must be string")
            else:
                missing = [w for w in ex.get("words", []) if w not in ex["answer"]]
                if missing: errors.append(f"{unit}/exercises[{i}]: assembly missing words: {missing}")
    quiz = json.load(open(os.path.join(upath, "quiz.json")))
    if quiz.get("passing_score") != 70:
        errors.append(f"{unit}/quiz.json: passing_score must be 70")
    for i, q in enumerate(quiz.get("questions", [])):
        if q.get("type") != "multiple_choice":
            errors.append(f"{unit}/quiz[{i}]: must be multiple_choice")
        ans = q.get("answer")
        if not isinstance(ans, int) or not (0 <= ans <= 3):
            errors.append(f"{unit}/quiz[{i}]: answer {ans} invalid")

print("ERRORS:" if errors else "ALL CLEAN ✅")
for e in errors: print(f"  ❌ {e}")
```

---

## Changelog summary

| Version | Date | What changed |
|---------|------|-------------|
| v0.6.0 | 2026-03-16 | C1 Units 9–10 complete — C1 fully done (10/10 units). All 56 units complete. |
| v0.5.2 | 2026-03-16 | C1 Units 5–8 (literary analysis, media analysis, professional writing, translation) |
| v0.5.1 | 2026-03-16 | C1 Units 1–4 + CourseMapPage.jsx C1 fully wired |
| v0.5.0 | 2026-03-16 | B2 Units 9–12 complete — B2 fully done |
| v0.4.2 | 2026-03-16 | B2 Units 5–8 |
| v0.4.1 | 2026-03-16 | B2 Units 1–4 |
| v0.4.0 | 2026-03-15 | B1 Units 9–12 complete — B1 fully done |
| v0.3.2 | 2026-03-15 | B1 Units 5–8 |
| v0.3.1 | 2026-03-15 | B1 Units 1–4 |
| v0.3.0 | 2026-03-15 | A2 Units 9–12 complete — A2 fully done |
| v0.2.2 | 2026-03-15 | A2 Units 9–12 content |
| v0.2.1 | 2026-03-15 | A2 Units 5–8 content |
| v0.2.0 | 2026-03-15 | A2 Units 1–4 content + A2 unlock logic |
| v0.1.7 | 2026-03-15 | PWA app icons |
| v0.1.6 | 2026-03-15 | A1 Units 2–10 content + sequential unlock |
| v0.1.5 | 2026-03-15 | Full quiz engine |
| v0.1.4 | 2026-03-15 | Exercise engine + flashcard SM-2 engine |
| v0.1.0 | 2026-03-15 | Initial scaffold |

---

## CRITICAL SOURCE FILES — INCLUDE THESE IN FULL

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
      { id: 'unit-01-present-tense',          title: 'Present Tense Review & Stem-Changers' },
      { id: 'unit-02-reflexive-verbs',         title: 'Reflexive Verbs & Daily Routines' },
      { id: 'unit-03-ser-estar',               title: 'Ser vs. Estar — Deep Dive' },
      { id: 'unit-04-preterite-regular',       title: 'Preterite Tense — Regular Verbs' },
      { id: 'unit-05-preterite-irregular',     title: 'Preterite Tense — Irregular Verbs' },
      { id: 'unit-06-imperfect',               title: 'The Imperfect Tense' },
      { id: 'unit-07-preterite-vs-imperfect',  title: 'Preterite vs. Imperfect' },
      { id: 'unit-08-object-pronouns',         title: 'Direct & Indirect Object Pronouns' },
      { id: 'unit-09-expressions',             title: 'Common Expressions & Idioms' },
      { id: 'unit-10-shopping',                title: 'Shopping & Money' },
      { id: 'unit-11-travel',                  title: 'Travel & Transportation' },
      { id: 'unit-12-review',                  title: 'A2 Review & Checkpoint' },
    ],
  },
  {
    level: 'B1',
    title: 'Intermediate Fluency',
    description: 'Subjunctive intro, future & conditional, idioms, Latin American dialects',
    color: 'from-pink-500 to-rose-500',
    units: [
      { id: 'unit-01-subjunctive-intro', title: 'Introduction to the Subjunctive' },
      { id: 'unit-02-future-tense',      title: 'The Future Tense' },
      { id: 'unit-03-conditional',       title: 'The Conditional Tense' },
      { id: 'unit-04-por-vs-para',       title: 'Por vs. Para' },
      { id: 'unit-05-relative-clauses',  title: 'Relative Clauses' },
      { id: 'unit-06-passive-voice',     title: 'Passive Voice & Se Constructions' },
      { id: 'unit-07-idiomatic-verbs',   title: 'Idiomatic Verbs' },
      { id: 'unit-08-opinion-debate',    title: 'Expressing Opinions & Debate' },
      { id: 'unit-09-formal-writing',    title: 'Formal Writing & Email' },
      { id: 'unit-10-mexican-culture',   title: 'Mexican Culture & Traditions' },
      { id: 'unit-11-regional-language', title: 'Regional Language & Slang' },
      { id: 'unit-12-review',            title: 'B1 Review & Checkpoint' },
    ],
  },
  {
    level: 'B2',
    title: 'Advanced Expression',
    description: 'Subjunctive mastery, complex grammar, cultural context, debate & persuasion',
    color: 'from-rose-500 to-orange-500',
    units: [
      { id: 'unit-01-subjunctive-past',     title: 'Past Subjunctive' },
      { id: 'unit-02-subjunctive-advanced', title: 'Advanced Subjunctive Uses' },
      { id: 'unit-03-if-clauses',           title: 'If-Clauses (Si Clauses)' },
      { id: 'unit-04-complex-sentences',    title: 'Complex Sentences & Connectors' },
      { id: 'unit-05-vocabulary-expansion', title: 'Vocabulary Expansion Strategies' },
      { id: 'unit-06-media-culture',        title: 'Mexican Media & Pop Culture' },
      { id: 'unit-07-argumentation',        title: 'Argumentation & Persuasion' },
      { id: 'unit-08-nuanced-expressions',  title: 'Nuanced Expressions & Register' },
      { id: 'unit-09-literature',           title: 'Mexican Literature & Poetry' },
      { id: 'unit-10-business-spanish',     title: 'Business Spanish' },
      { id: 'unit-11-social-issues',        title: 'Social Issues & Current Events' },
      { id: 'unit-12-review',               title: 'B2 Review & Checkpoint' },
    ],
  },
  {
    level: 'C1',
    title: 'Near-Native Proficiency',
    description: 'Nuanced writing, literature & media, regional variation, professional Spanish',
    color: 'from-orange-500 to-amber-500',
    units: [
      { id: 'unit-01-advanced-grammar',    title: 'Advanced Grammar Consolidation' },
      { id: 'unit-02-stylistics',          title: 'Stylistics & Written Register' },
      { id: 'unit-03-rhetoric',            title: 'Rhetoric & Advanced Argumentation' },
      { id: 'unit-04-mexican-history',     title: 'Mexican History & Politics' },
      { id: 'unit-05-literature-advanced', title: 'Advanced Literary Analysis' },
      { id: 'unit-06-media-analysis',      title: 'Media Analysis & Critical Reading' },
      { id: 'unit-07-professional-writing', title: 'Professional & Academic Writing' },
      { id: 'unit-08-translation',         title: 'Translation & Interpretation Skills' },
      { id: 'unit-09-regional-variation',  title: 'Regional Variation & Dialects' },
      { id: 'unit-10-review',              title: 'C1 Review & Final Checkpoint' },
    ],
  },
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
          return (
            <section key={levelData.level} aria-label={`${levelData.level} — ${levelData.title}`} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`bg-gradient-to-r ${levelData.color} text-white font-bold text-sm px-4 py-1.5 rounded-full`}>{levelData.level}</span>
                  <div>
                    <h2 className="font-semibold text-lg text-content-primary">{levelData.title}</h2>
                    <p className="text-content-secondary text-sm">{levelData.description}</p>
                  </div>
                </div>
              </div>
              {levelData.units.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {levelData.units.map((unit, index) => {
                    const unitKey = `${levelData.level}-${unit.id}`
                    const progress = getUnitProgress(unitKey)
                    const isComplete = !!progress?.complete

                    let isAvailable = false
                    if (levelData.level === 'A2' && index === 0) {
                      const lastA1Progress = getUnitProgress('A1-unit-10-review')
                      isAvailable = !!lastA1Progress?.complete
                    } else if (levelData.level === 'B1' && index === 0) {
                      const lastA2Progress = getUnitProgress('A2-unit-12-review')
                      isAvailable = !!lastA2Progress?.complete
                    } else if (levelData.level === 'B2' && index === 0) {
                      const lastB1Progress = getUnitProgress('B1-unit-12-review')
                      isAvailable = !!lastB1Progress?.complete
                    } else if (levelData.level === 'C1' && index === 0) {
                      const lastB2Progress = getUnitProgress('B2-unit-12-review')
                      isAvailable = !!lastB2Progress?.complete
                    } else if (index === 0) {
                      isAvailable = true
                    } else {
                      const prevUnit = levelData.units[index - 1]
                      const prevKey = `${levelData.level}-${prevUnit.id}`
                      const prevProgress = getUnitProgress(prevKey)
                      isAvailable = !!prevProgress?.complete
                    }

                    return (
                      <UnitCard
                        key={unit.id}
                        level={levelData.level}
                        unit={unit}
                        isAvailable={isAvailable}
                        isComplete={isComplete}
                        progress={progress}
                      />
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
2. Upload `Espanol-Course-Handoff-v0.6.0.md` as a file attachment
3. Add your instructions after uploading

*This document must be updated at the end of every build session.*

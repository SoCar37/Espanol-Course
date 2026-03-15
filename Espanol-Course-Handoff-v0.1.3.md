# Espanol-Course — Project Handoff Document
## For use at the start of a new chat session
**Handoff version:** v0.1.3 — Current as of 2026-03-15

---

## Project overview

**Mission:** The most complete free Spanish course for English speakers seeking fluency in Mexican Spanish.

**GitHub repo:** `github.com/SoCar37/Espanol-Course`  
**Live URL:** `https://SoCar37.github.io/Espanol-Course`  
**GitHub username:** SoCar37  
**Local working copy:** `D:\Files\Coding\Espanol-Course`  
**Current version:** v0.1.3 (scaffold + bug fixes, fully working)

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
- **Content creation:** AI-assisted drafting (Claude) → human review → commit

### Versioning and naming
- **Semver:** v0.1.0 → v0.2.0 → v1.0.0
- **Folder structure:** `/content/A1/unit-01-greetings/` (lowercase, hyphenated, zero-padded)
- **Files per unit:** always exactly: `meta.json`, `lesson.md`, `vocab.json`, `exercises.json`, `quiz.json`
- **Branch:** main only (single contributor)
- **Version history:** `CHANGELOG.md` at repo root, Keep a Changelog format

### Design
- **Theme:** Dark (`#0f172a` background, `#1e293b` cards)
- **Palette:** Indigo `#6366f1` / Purple `#8b5cf6` / Pink `#ec4899` / Green `#10b981` / Amber `#f59e0b`
- **Font:** Poppins (Google Fonts)
- **Layout:** Mobile-first, three breakpoints — mobile (single column + bottom tab bar) / tablet (two panel) / desktop (three panel)
- **Reference design:** Dark theme language learning app — pill tabs, 3D flip flashcards, gradient progress bars, left-border example sentences, green/red exercise feedback

### Platform
- **Mobile:** Mobile-first, all devices equally
- **PWA:** Home screen installable via manifest.json — no service worker (always-online v1.0)
- **Accessibility:** WCAG AA standard throughout

### Licensing
- **App code:** MIT License (`/app/LICENSE`)
- **Course content:** CC BY-SA 4.0 (`/content/LICENSE`)

### Version milestones
- v0.1.0 — Initial scaffold
- v0.2.0 — Full exercise engine + A1 content complete
- v0.5.0 — A1+A2 complete + spaced repetition
- v1.0.0 — Public launch (A1+A2 complete, placement test, stable)
- v2.0.0 — Supabase accounts, B1+B2 content

---

## Current file structure

```
D:\Files\Coding\Espanol-Course\
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions CI/CD
├── .gitignore
├── CHANGELOG.md                ← Version history (Keep a Changelog format)
├── CONTRIBUTING.md             ← Contributor guidelines + content schema
├── README.md                   ← Project front page (always current version)
├── app/                        ← React + Vite + Tailwind frontend (MIT license)
│   ├── LICENSE
│   ├── index.html              ← PWA meta tags, Poppins font
│   ├── package.json            ← v0.1.0, all dependencies listed
│   ├── package-lock.json       ← Generated, committed
│   ├── postcss.config.js
│   ├── tailwind.config.js      ← Full design system (colors, animations)
│   ├── vite.config.js          ← base: '/Espanol-Course/', outDir: '../docs'
│   ├── public/
│   │   ├── manifest.json       ← PWA manifest
│   │   └── content/            ← CRITICAL: content files copied here for serving
│   │       ├── A1/
│   │       │   ├── README.md
│   │       │   └── unit-01-greetings/
│   │       │       ├── meta.json
│   │       │       ├── lesson.md
│   │       │       ├── vocab.json
│   │       │       ├── exercises.json
│   │       │       └── quiz.json
│   │       ├── A2/ (empty)
│   │       ├── B1/ (empty)
│   │       ├── B2/ (empty)
│   │       └── C1/ (empty)
│   └── src/
│       ├── App.jsx             ← React Router setup, 5 routes
│       ├── main.jsx            ← Entry point, BrowserRouter basename
│       ├── styles/
│       │   └── globals.css     ← Tailwind directives + component classes
│       ├── hooks/
│       │   └── useProgress.js  ← localStorage progress management
│       ├── components/
│       │   └── layout/
│       │       └── Layout.jsx  ← Header + bottom tab bar (mobile) + top nav (desktop)
│       ├── pages/
│       │   ├── CourseMapPage.jsx   ← A1–C1 overview, unit lock/unlock
│       │   ├── LessonPage.jsx      ← Markdown lesson reader
│       │   ├── FlashcardsPage.jsx  ← 3D flip flashcard drill (placeholder vocab)
│       │   ├── ExercisesPage.jsx   ← Single sample MCQ (placeholder)
│       │   └── ProgressPage.jsx    ← XP, streak, level breakdown
│       └── utils/ hooks/ components/exercises,flashcard,quiz,progress/ (empty, ready)
├── content/                    ← Course content (CC BY-SA 4.0)
│   ├── LICENSE
│   ├── A1/
│   │   ├── README.md
│   │   └── unit-01-greetings/
│   │       ├── meta.json       ← id, title, level, unit, slug, estimated_minutes, status
│   │       ├── lesson.md       ← Full greetings lesson (complete)
│   │       ├── vocab.json      ← 15 vocabulary items with pronunciation hints
│   │       ├── exercises.json  ← 8 exercises (MCQ, fill-in, translation, assembly)
│   │       └── quiz.json       ← 8-question checkpoint quiz, 70% passing score
│   ├── A2/ B1/ B2/ C1/        ← Empty, ready for content
├── assets/
│   ├── audio/                  ← MP3 files go here (none yet — audio in v0.2.0)
│   └── images/icons/
└── tools/
    ├── generate-audio.py       ← Google TTS Neural2 es-MX audio generator
    └── validate-content.py     ← Content schema validator
```

---

## What is working in v0.1.3

- ✅ Course map page — A1 through C1 with unit grid, lock/unlock logic
- ✅ A1 Unit 1 Greetings lesson — full markdown content renders correctly
- ✅ Lesson navigation — breadcrumb, complete button, back to map
- ✅ Flashcard page — 3D flip animation, Missed/Hard/Good/Easy rating buttons
- ✅ Exercises page — sample MCQ with correct/incorrect feedback (1 question placeholder)
- ✅ Progress page — XP, streak, longest streak, level breakdown bars
- ✅ localStorage progress tracking — XP increments on lesson complete
- ✅ Mobile layout — bottom tab bar on phones, tested and working on iPhone
- ✅ Dark theme throughout — correct colors, fonts, and design system
- ✅ GitHub Actions auto-deploy — pushes to main deploy to GitHub Pages automatically
- ✅ Live URL working — https://SoCar37.github.io/Espanol-Course
- ✅ Home screen installable — manifest.json in place

---

## Known issues / not yet built

- ❌ Exercises page only has 1 sample question — full engine not built yet
- ❌ Flashcard page uses hardcoded placeholder vocab — not loading from vocab.json yet
- ❌ No audio files — TTS generation not run yet
- ❌ No spaced repetition engine — SM-2 algorithm not implemented yet
- ❌ Placement test — not built yet (planned for end of v1.0)
- ❌ App icons (icon-192.png, icon-512.png) not created yet — console warning but harmless
- ❌ A1 Units 2–10 content not written yet
- ❌ A2 through C1 content not written

---

## Critical architecture notes

### Content serving — IMPORTANT
Content files must exist in TWO places:
1. `/content/A1/unit-01-greetings/` — the source of truth, edited here
2. `/app/public/content/A1/unit-01-greetings/` — the served copy (Vite serves from public/)

When adding new content units, files must be placed in BOTH locations.
The GitHub Actions workflow does NOT copy automatically — this is a manual step.

**When adding a new unit:**
1. Create files in `/content/A1/unit-XX-slug/`
2. Also copy to `/app/public/content/A1/unit-XX-slug/`
3. Add the unit to the `COURSE_STRUCTURE` array in `CourseMapPage.jsx` with the full folder name as the id (e.g. `id: 'unit-02-numbers'`)
4. Commit both locations together

### Unit IDs must match folder names exactly
In `CourseMapPage.jsx` the unit `id` field must exactly match the folder name:
- ✅ Correct: `id: 'unit-01-greetings'` → folder: `unit-01-greetings`
- ❌ Wrong: `id: 'unit-01'` → folder: `unit-01-greetings` (causes 404)

### Fetch URL pattern
LessonPage.jsx fetches content using:
```
/Espanol-Course/content/${level}/${unit}/lesson.md
/Espanol-Course/content/${level}/${unit}/meta.json
```
Where `level` is uppercase (A1, A2 etc.) and `unit` is the full folder name.

---

## Local development workflow

```
# 1. Open VS Code
# 2. Open folder: D:\Files\Coding\Espanol-Course
# 3. Right-click 'app' folder in sidebar → Open in Integrated Terminal
# 4. Run:
npm run dev
# 5. Browser opens at http://localhost:5173/Espanol-Course/
# 6. Edit files → browser updates instantly
# 7. When done: Ctrl+C to stop server
# 8. GitHub Desktop → commit → push → auto-deploys in ~60 seconds
```

**Important:** npm commands only work from a local drive (D:).
Never run npm from the NAS (\\NAS6C69C9\...) — Windows UNC path limitation.

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

### vocab.json (array of items)
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

### exercises.json (array of items)
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
Valid types: `multiple_choice`, `fill_in_blank`, `translation`, `sentence_assembly`, `error_correction`, `listening`, `matching`

### quiz.json
```json
{
  "id": "A1-U01-Q",
  "passing_score": 70,
  "questions": [ ...same format as exercises... ]
}
```

---

## Claude prompt template for content generation

Use this prompt with Claude to generate new unit content:

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
   for each. Schema: id, type, prompt, options (MCQ only), answer, explanation.

4. quiz.json — JSON object with id, passing_score: 70, and questions array of
   8 multiple_choice questions testing the lesson content.

Ensure all Spanish uses Mexican conventions and natural everyday language.
```

---

## v0.2.0 build plan (next session)

### Priority 1 — Full exercise engine
- Load exercises from `exercises.json` dynamically
- Support all exercise types: MCQ, fill-in-blank, translation, sentence assembly
- Progress through exercises sequentially with a progress bar
- Score tracking — feed results into localStorage progress
- Gate quiz until exercises completed

### Priority 2 — Flashcard engine from vocab.json
- Load vocab from `vocab.json` dynamically instead of hardcoded placeholder
- Implement SM-2 spaced repetition algorithm (~20 lines of JS)
- Store ease factor and next review date per word in localStorage
- Due cards surface automatically

### Priority 3 — A1 remaining units (2–10)
- Generate content for units 2–10 using Claude prompt template above
- Place files in both `/content/A1/` and `/app/public/content/A1/`
- Update `CourseMapPage.jsx` to unlock units sequentially as previous unit quiz is passed

### Priority 4 — Audio
- Set up Google Cloud TTS account
- Run `tools/generate-audio.py` for A1 Unit 1 vocab
- Add audio playback to lesson and flashcard pages

### Priority 5 — App icons
- Create simple icon (🇲🇽 or "ES" on dark background)
- Export as icon-192.png and icon-512.png
- Place in `app/public/icons/`
- Fixes the console warning about missing PWA icons

---

## Tools and software installed

| Tool | Purpose | Location |
|------|---------|---------|
| VS Code | File editing, terminal | Installed |
| GitHub Desktop | Git GUI — commit and push | Installed, pointed at D:\Files\Coding\Espanol-Course |
| Git | Version control engine | Installed (v2.53.0) |
| Node.js | Run app locally | Installed (v24.14.0) |
| npm | Package manager | Installed (v11.9.0) |
| Prettier extension | VS Code formatter | Installed |
| Markdown All in One | VS Code markdown helper | Installed |

---

## Changelog summary

| Version | Date | What changed |
|---------|------|-------------|
| v0.1.0 | 2026-03-15 | Initial scaffold — all files, app shell, A1 Unit 1 content |
| v0.1.1 | 2026-03-15 | Fixed deploy.yml — content copy before build |
| v0.1.2 | 2026-03-15 | Fixed content serving — files committed to app/public/content |
| v0.1.3 | 2026-03-15 | Fixed unit folder path mismatch — unit IDs now match folder names |

---

## How to start a new chat session

1. Start a new Claude chat
2. Paste the entire contents of this document as your first message
3. Add any new instructions or context after it
4. Claude will have full project context and can continue building immediately

*This document should be updated at the end of every major build session.*

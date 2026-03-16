# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.4] - 2026-03-15

### Added
- Full exercise engine — loads exercises dynamically from `exercises.json`
- Four exercise type components: `MultipleChoice`, `FillInBlank`, `Translation`, `SentenceAssembly`
- Segmented progress bar showing one pip per question across the top of the exercise view
- Running score counter (e.g. 3 / 8 correct) displayed during exercises
- Wrong answer behavior: explanation shown, question stays active until answered correctly
- Results summary screen after final question — animated SVG score ring, XP earned badge, Spanish encouragement message
- "Start Quiz" button on summary screen — navigates to `/quiz/:level/:unit`
- Exercise type badge (icon + label) shown above each question card
- Flashcard engine — loads vocab dynamically from `vocab.json` replacing hardcoded placeholder
- SM-2 spaced repetition algorithm — `app/src/utils/sm2.js`
- Per-card scheduling stored in localStorage — Easy cards return in 4+ days, Hard tomorrow, Missed same session
- English → Spanish card direction — English meaning shows first, tap to reveal Spanish
- Pronunciation hint badge shown above each flashcard
- Example sentence and translation shown on Spanish side of card
- "Come back tomorrow" completion screen with session stats and XP earned
- `useProgress.js` expanded: tracks `exercisesComplete`, `quizComplete` per unit, SM-2 vocab data, `getDueVocab`, `rateVocabCard`, `getDueCount`
- Parameterized routes: `/exercises/:level/:unit`, `/quiz/:level/:unit`, `/flashcards/:level/:unit`

### Changed
- `ExercisesPage.jsx` — fully rewritten; replaces single hardcoded MCQ with dynamic engine
- `FlashcardsPage.jsx` — fully rewritten; loads from vocab.json, SM-2 scheduling, English-first direction
- `LessonPage.jsx` — Complete Lesson button now navigates directly to exercises after saving progress
- `App.jsx` — all routes now parameterized; bare routes redirect to A1 Unit 1
- `useProgress.js` — restored original unit-keyed structure, added SM-2 vocab functions on top

### Fixed
- Complete Lesson button was silently failing due to mismatched key format between save and lookup
- Flashcard page crashed on load due to card being read before vocab finished loading
- vocab.json fetch was 404 due to inconsistent level casing (a1 vs A1)
- Word bank empty in sentence assembly exercises — was reading `options` field, exercises.json uses `words`

---

## [0.1.3] - 2026-03-15

### Fixed
- Unit folder path mismatch — unit IDs in `CourseMapPage.jsx` now exactly match folder names

---

## [0.1.2] - 2026-03-15

### Fixed
- Content serving — content files committed to `app/public/content/` so Vite serves them correctly

---

## [0.1.1] - 2026-03-15

### Fixed
- `deploy.yml` — content files now copied before build step so GitHub Pages deployment includes content

---

## [0.1.0] - 2026-03-15

### Added
- Initial scaffold — React + Vite + Tailwind CSS project structure
- Dark theme design system (colors, fonts, animations) in `tailwind.config.js`
- Five pages: `CourseMapPage`, `LessonPage`, `FlashcardsPage`, `ExercisesPage`, `ProgressPage`
- `Layout.jsx` — header, bottom tab bar (mobile), top nav (desktop)
- `useProgress.js` — localStorage progress tracking (XP, streak)
- A1 Unit 1 Greetings — full content: `meta.json`, `lesson.md`, `vocab.json`, `exercises.json`, `quiz.json`
- GitHub Actions CI/CD — auto-deploys to GitHub Pages on push to main
- PWA manifest — home screen installable
- MIT license (app code), CC BY-SA 4.0 (course content)

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.5] - 2026-03-15

### Added
- Full quiz engine — `QuizPage.jsx` loads `quiz.json` dynamically
- Segmented progress bar across the top, running score counter during quiz
- Answer feedback per question — green/correct, red/incorrect with explanation shown
- Pass screen (≥70%) — score ring, +50 XP, unit marked complete, links to course map and flashcards
- Fail screen (<70%) — score ring, "Try again" resets quiz, "Review lesson" link
- Quiz locked behind exercise completion — redirects to exercises if not yet done

### Changed
- `App.jsx` — `/quiz/:level/:unit` now points to `QuizPage` instead of `ExercisesPage`

---

## [0.1.4] - 2026-03-15

### Added
- Full exercise engine — loads exercises dynamically from `exercises.json`
- Four exercise type components: `MultipleChoice`, `FillInBlank`, `Translation`, `SentenceAssembly`
- Segmented progress bar and running score counter during exercises
- Wrong answer behavior: explanation shown, must correct before advancing
- Results summary screen after exercises — score ring, XP earned, "Start Quiz" button
- Flashcard engine — loads vocab dynamically from `vocab.json`
- SM-2 spaced repetition algorithm — `app/src/utils/sm2.js`
- Per-card scheduling in localStorage — Easy 4+ days, Hard tomorrow, Missed same session
- English → Spanish card direction with pronunciation hint badge
- "Come back tomorrow" completion screen with session stats
- Parameterized routes: `/exercises/:level/:unit`, `/quiz/:level/:unit`, `/flashcards/:level/:unit`

### Changed
- `ExercisesPage.jsx` — fully rewritten with dynamic engine
- `FlashcardsPage.jsx` — fully rewritten with vocab.json loading and SM-2
- `LessonPage.jsx` — Complete Lesson button navigates directly to exercises
- `App.jsx` — all routes parameterized
- `useProgress.js` — restored original unit-keyed structure, added SM-2 vocab functions

### Fixed
- Complete Lesson button silently failing due to mismatched key format
- Flashcard crash on load — card read before vocab finished loading
- vocab.json 404 due to inconsistent level casing
- Word bank empty in sentence assembly — was reading `options`, json uses `words`

---

## [0.1.3] - 2026-03-15

### Fixed
- Unit folder path mismatch — unit IDs now match folder names exactly

---

## [0.1.2] - 2026-03-15

### Fixed
- Content serving — files committed to `app/public/content/`

---

## [0.1.1] - 2026-03-15

### Fixed
- `deploy.yml` — content files copied before build step

---

## [0.1.0] - 2026-03-15

### Added
- Initial scaffold — React + Vite + Tailwind CSS
- Five pages, dark theme, Poppins font, mobile layout
- A1 Unit 1 Greetings full content
- GitHub Actions CI/CD, PWA manifest
- MIT license (app), CC BY-SA 4.0 (content)

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
- `ExerciseSummary` component with score-based color ring (green / indigo / amber)
- Exercise type badge (icon + label) shown above each question card
- `useProgress.js` expanded: now tracks `completedExercises`, `completedQuizzes`, `quizScores`, `exerciseScores`
- Quiz unlock gated on exercise completion — stored in localStorage
- Parameterized routes: `/exercises/:level/:unit` and `/quiz/:level/:unit`

### Changed
- `ExercisesPage.jsx` — fully rewritten; replaces single hardcoded MCQ with dynamic engine
- `App.jsx` — routes now parameterized; legacy bare `/exercises` redirects to A1 Unit 1
- `useProgress.js` — expanded schema; fully backwards compatible with v0.1.x localStorage data

---

## [0.1.3] - 2026-03-15

### Fixed
- Unit folder path mismatch — unit IDs in `CourseMapPage.jsx` now exactly match folder names (e.g. `unit-01-greetings`)

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

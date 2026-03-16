# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.6] - 2026-03-15

### Added
- A1 Units 2–10 full content — 45 new files (lesson.md, vocab.json, exercises.json, quiz.json, meta.json per unit)
  - Unit 02: Numbers & Counting
  - Unit 03: Colors & Descriptions
  - Unit 04: Days, Months & Time
  - Unit 05: Family & People
  - Unit 06: Food & Drink
  - Unit 07: Places & Directions
  - Unit 08: Daily Routines
  - Unit 09: Weather & Seasons
  - Unit 10: A1 Review & Checkpoint
- All content files placed in both `/content/A1/` and `/app/public/content/A1/` as required
- Sequential unit unlock logic — each unit unlocks only after the previous unit's quiz is passed
- Unit 1 remains always available as the entry point

### Changed
- `CourseMapPage.jsx` — unlock logic now dynamic based on localStorage progress; removed hardcoded `status: 'locked'` from unit definitions; link now uses correct case for level in URL

---

## [0.1.5] - 2026-03-15

### Added
- Full quiz engine — `QuizPage.jsx` loads `quiz.json` dynamically
- Segmented progress bar and running score counter during quiz
- Pass screen (≥70%) — score ring, +50 XP, unit marked complete
- Fail screen (<70%) — score ring, Try Again, Review Lesson link
- Quiz locked behind exercise completion

### Changed
- `App.jsx` — `/quiz/:level/:unit` now points to `QuizPage`

---

## [0.1.4] - 2026-03-15

### Added
- Full exercise engine with four question types
- SM-2 flashcard engine loading from vocab.json
- Parameterized routes for exercises, quiz, flashcards

### Fixed
- Complete Lesson button, word bank in sentence assembly, flashcard crash on load

---

## [0.1.3] - 2026-03-15
### Fixed
- Unit folder path mismatch

## [0.1.2] - 2026-03-15
### Fixed
- Content serving from app/public/content

## [0.1.1] - 2026-03-15
### Fixed
- deploy.yml content copy before build

## [0.1.0] - 2026-03-15
### Added
- Initial scaffold, A1 Unit 1 content, GitHub Actions CI/CD, PWA manifest

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.7] - 2026-03-15

### Added
- App icons — icon-192.png and icon-512.png in app/public/icons/
- Dark rounded square with white "ES" lettering on #0f172a background with indigo overlay
- Fixes PWA manifest console warning about missing icons
- App is now fully installable to home screen with correct icon

---

## [0.1.6] - 2026-03-15

### Added
- A1 Units 2–10 full content — 45 new files across 9 units
- Sequential unit unlock logic — each unit unlocks after previous quiz is passed

### Changed
- CourseMapPage.jsx — dynamic unlock based on localStorage progress

---

## [0.1.5] - 2026-03-15

### Added
- Full quiz engine — QuizPage.jsx, pass/fail screens, score ring, XP
- Quiz locked behind exercise completion

### Changed
- App.jsx — /quiz/:level/:unit points to QuizPage

---

## [0.1.4] - 2026-03-15

### Added
- Full exercise engine (4 question types), SM-2 flashcard engine
- Parameterized routes for exercises, quiz, flashcards

### Fixed
- Complete Lesson button, word bank in sentence assembly, flashcard crash

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

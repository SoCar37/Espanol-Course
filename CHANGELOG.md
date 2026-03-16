# Changelog

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [Unreleased]

## [0.7.0] - 2026-03-16

### Added
- Placement test — 35 MCQ questions spanning A1–B2 (`PlacementTestPage.jsx`)
  - Scores into A1 (<40%), A2 (40–59%), B1 (60–79%), or B2 (≥80%)
  - Unlocks all units below placed level; user starts fresh at placed level
  - Intro screen, per-question feedback, and result screen with placed level + score
- `useProgress.js` — `unlockLevel(level)` and `setPlacementComplete(level)` functions
- `App.jsx` — `/placement` route
- `Layout.jsx` — placement banner shown on all pages until test is completed
- `CourseMapPage.jsx` — placement prompt card shown at top of course map until test is completed

## [0.6.0] - 2026-03-16

### Added
- C1 Units 9–10 content — C1 now fully complete (10/10 units)
  - Unit 9 — Regional Variation & Dialects (`unit-09-regional-variation`)
  - Unit 10 — C1 Review & Final Checkpoint (`unit-10-review`)

## [0.5.2] - 2026-03-16

### Added
- C1 Units 5–8 content
  - Unit 5 — Advanced Literary Analysis (`unit-05-literature-advanced`)
  - Unit 6 — Media Analysis & Critical Reading (`unit-06-media-analysis`)
  - Unit 7 — Professional & Academic Writing (`unit-07-professional-writing`)
  - Unit 8 — Translation & Interpretation Skills (`unit-08-translation`)

## [0.5.1] - 2026-03-16

### Added
- C1 Units 1–4 content
  - Unit 1 — Advanced Grammar Consolidation (`unit-01-advanced-grammar`)
  - Unit 2 — Stylistics & Written Register (`unit-02-stylistics`)
  - Unit 3 — Rhetoric & Advanced Argumentation (`unit-03-rhetoric`)
  - Unit 4 — Mexican History & Politics (`unit-04-mexican-history`)
- `CourseMapPage.jsx` updated — C1 fully wired (10 units), `comingSoon` removed, C1 unlock gate added (gates on `B2-unit-12-review`)

## [0.5.0] - 2026-03-16

### Added
- B2 Units 9–12 complete — B2 now fully done (12/12 units)
  - Unit 9 — Mexican Literature & Poetry (`unit-09-literature`)
  - Unit 10 — Business Spanish (`unit-10-business-spanish`)
  - Unit 11 — Social Issues & Current Events (`unit-11-social-issues`)
  - Unit 12 — B2 Review & Checkpoint (`unit-12-review`)
- `CourseMapPage.jsx` updated — B2 fully wired, `partialContent` removed, "Coming soon" badge removed from B2, all 12 units active with sequential unlock

## [0.4.2] - 2026-03-16

### Added
- B2 Units 5–8 (vocabulary expansion, media & pop culture, argumentation, nuanced expressions & register)
- `CourseMapPage.jsx` updated — B2 availableUnits bumped to 8

## [0.4.1] - 2026-03-16

### Added
- B2 Units 1–4 (past subjunctive, advanced subjunctive, si clauses, complex sentences & connectors)
- B2 level wired into `CourseMapPage.jsx` — unlock gated on `B1-unit-12-review`

## [0.4.0] - 2026-03-15

### Added
- B1 Units 9–12 complete — B1 now fully done (12/12 units)

## [0.3.2] - 2026-03-15

### Added
- B1 Units 5–8 (relative clauses, passive se, idiomatic verbs, opinions)

## [0.3.1] - 2026-03-15

### Added
- B1 Units 1–4 (subjunctive, future, conditional, por/para)

## [0.3.0] - 2026-03-15

### Added
- A2 Units 9–12 complete — A2 fully done (12/12 units)

## [0.2.2] - 2026-03-15

### Added
- A2 Units 9–12 content

## [0.2.1] - 2026-03-15

### Added
- A2 Units 5–8 content

## [0.2.0] - 2026-03-15

### Added
- A2 Units 1–4 content + A2 unlock logic

## [0.1.7] - 2026-03-15

### Added
- PWA app icons (icon-192.png, icon-512.png)

## [0.1.6] - 2026-03-15

### Added
- A1 Units 2–10 content + sequential unlock

## [0.1.5] - 2026-03-15

### Added
- Full quiz engine

## [0.1.4] - 2026-03-15

### Added
- Exercise engine + flashcard SM-2 engine

## [0.1.0] - 2026-03-15

### Added
- Initial scaffold — all files, app shell, A1 Unit 1 content

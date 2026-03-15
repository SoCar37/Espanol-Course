# Changelog

All notable changes to Espanol-Course are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

---

## [v0.1.0] — 2026-03-15

### Added
- Initial project scaffold
- Full folder structure: `/app`, `/content`, `/assets`, `/tools`
- React + Vite + Tailwind CSS configured and ready
- GitHub Actions CI/CD pipeline (auto-deploy to GitHub Pages on push to main)
- `README.md` — project front page
- `CHANGELOG.md` — version history (this file)
- `CONTRIBUTING.md` — contributor guidelines and conventions
- MIT License for app code (`/app/LICENSE`)
- CC BY-SA 4.0 License for course content (`/content/LICENSE`)
- `manifest.json` — PWA manifest for home screen installability
- App shell with dark theme, Poppins font, and indigo/purple palette
- Course map page (A1–C1 level overview with unit lock/unlock logic)
- Lesson reader component (renders markdown, placeholder audio)
- Bottom tab navigation (mobile) and top nav (desktop)
- Content schema defined: `meta.json`, `lesson.md`, `vocab.json`, `exercises.json`, `quiz.json`
- A1 Unit 1 placeholder content files (greetings — content in progress)
- `tools/generate-audio.py` — Google TTS audio generation script (setup instructions included)
- `tools/validate-content.py` — content schema validation script

---

<!-- Add new versions above this line -->

# 🇲🇽 Espanol-Course
### The most complete free Spanish course for English speakers seeking fluency in Mexican Spanish

**Current version:** v0.1.0 — Project Scaffold  
**Live course:** [SoCar37.github.io/Espanol-Course](https://SoCar37.github.io/Espanol-Course)  
**License:** App — MIT · Content — CC BY-SA 4.0

---

## About

Espanol-Course is a free, open-source, comprehensive Spanish course anchored in Mexican Spanish, covering CEFR levels A1 through C1. It is designed to take English speakers from complete beginner to near-native proficiency through structured lessons, spaced repetition vocabulary drilling, and a full suite of interactive exercises.

This course is built for serious learners who want to reach genuine fluency — not just casual daily streaks.

---

## Course levels

| Level | Description | Units | Status |
|-------|-------------|-------|--------|
| A1 | Foundations | 10 | 🔧 In progress |
| A2 | Building blocks | 12 | 📋 Planned |
| B1 | Intermediate fluency | 12 | 📋 Planned |
| B2 | Advanced expression | 12 | 📋 Planned |
| C1 | Near-native proficiency | 10 | 📋 Planned |

---

## Features (v1.0 roadmap)

- 📖 Structured lessons with grammar explanations and cultural notes
- 🔊 Mexican Spanish audio (Google TTS Neural2 es-MX voice)
- ✏️ Multiple exercise types: multiple choice, fill-in-the-blank, translation, sentence assembly, error correction, word matching, listening
- 🃏 Spaced repetition flashcard drills (SM-2 algorithm)
- 📊 Progress tracking with XP and streaks
- 🎯 Placement test to skip to the right level
- 📱 Mobile-first, installable as a home screen app
- ♿ WCAG AA accessibility compliant

---

## Tech stack

- **Frontend:** React + Vite + Tailwind CSS
- **Content:** Markdown (lessons) + JSON (vocab, exercises, quiz, meta)
- **Progress:** localStorage (v1.0) → Supabase (v2.0)
- **Hosting:** GitHub Pages (free)
- **Audio:** Google Cloud TTS Neural2, es-MX voice
- **CI/CD:** GitHub Actions — auto-deploys on every push to main

---

## Getting started (for contributors)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full setup instructions.

Quick start:
```bash
cd app
npm install
npm run dev
```

---

## Project history

See [CHANGELOG.md](./CHANGELOG.md) for the full version history.

---

## License

- App code: [MIT License](./app/LICENSE)
- Course content: [CC BY-SA 4.0](./content/LICENSE)

---

*Built with ❤️ by SoCar37 — contributions welcome*

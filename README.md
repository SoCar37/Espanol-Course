# Espanol Course

**The most complete free Spanish course for English speakers seeking fluency in Mexican Spanish.**

🌐 **Live:** [SoCar37.github.io/Espanol-Course](https://SoCar37.github.io/Espanol-Course)  
📦 **Version:** v0.7.8  
📄 **License:** App — MIT · Content — CC BY-SA 4.0

---

## What is this?

A full A1–C1 CEFR Spanish course built as a progressive web app. Anchored in Mexican Spanish. Free forever, no accounts required.

---

## Current status

| Feature | Status |
|---|---|
| Course map with sequential unlock | ✅ Working |
| Full learning loop (Lesson → Exercises → Quiz) | ✅ Working |
| Exercise engine (4 types) | ✅ Working |
| Flashcard engine with SM-2 spaced repetition | ✅ Working |
| Quiz engine | ✅ Working |
| PWA — home screen installable | ✅ Working |
| Placement test | ✅ Working |
| A1 Units 1–10 content | ✅ Complete |
| A2 Units 1–12 content | ✅ Complete |
| B1 Units 1–12 content | ✅ Complete |
| B2 Units 1–12 content | ✅ Complete |
| C1 Units 1–10 content | ✅ Complete |
| Audio (Google TTS Neural2) | 🔜 Post-launch |

---

## Tech stack

- **Frontend:** React + Vite + Tailwind CSS
- **Content:** Markdown (lessons) + JSON (vocab, exercises, quiz)
- **Progress:** localStorage → Supabase (v2, planned)
- **Hosting:** GitHub Pages via GitHub Actions
- **Font:** Poppins

---

## Content scope

| Level | Units | Status |
|---|---|---|
| A1 | 10 | ✅ Complete |
| A2 | 12 | ✅ Complete |
| B1 | 12 | ✅ Complete |
| B2 | 12 | ✅ Complete |
| C1 | 10 | ✅ Complete |

---

## Local development

```bash
cd app
npm install
npm run dev
# → http://localhost:5173/Espanol-Course/
```

---

## Version history

| Version | Milestone |
|---|---|
| v0.7.8 | Fix lesson table rendering (remark-gfm) |
| v0.7.7 | Remove Exercises from main nav |
| v0.7.6 | Fix flashcard pronunciation hint visibility |
| v0.7.5 | Fix exercise scoring — first-attempt only |
| v0.7.4 | Flashcards — global due queue across all completed units |
| v0.7.8 | Fix lesson table rendering (remark-gfm) |
| v0.7.7 | Remove Exercises from main nav |
| v0.7.6 | Fix flashcard pronunciation hint visibility |
| v0.7.5 | Fix exercise scoring — first-attempt only |
| v0.7.4 | Flashcards — global due queue across all completed units |
| v0.7.3 | CONTRIBUTING.md rewritten for public launch |
| v0.7.2 | Placement test — remove duplicate prompt from Layout |
| v0.7.1 | Placement test — fix lower-level unlock badges |
| v0.7.0 | Placement test (35 questions, A1–B2) |
| v0.6.0 | C1 content complete (10 units) |
| v0.5.0–v0.5.2 | C1 content build + B2 content complete (12 units) |
| v0.4.0–v0.4.2 | B2 content build (units 1–12 in batches) |
| v0.3.0–v0.4.0 | B1 content complete (12 units) |
| v0.2.0–v0.2.2 | A2 content build (units 1–12 in batches) |
| v0.1.7 | PWA app icons |
| v0.1.6 | A1 Units 2–10 content + sequential unlock |
| v0.1.4 | Exercise engine + flashcard SM-2 engine |
| v0.1.0 | Initial scaffold |
| v1.0.0 | Public launch *(planned)* |

---

## License

- App source code: [MIT](app/LICENSE)
- Course content: [CC BY-SA 4.0](content/LICENSE)

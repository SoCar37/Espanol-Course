# Espanol Course

**The most complete free Spanish course for English speakers seeking fluency in Mexican Spanish.**

🌐 **Live:** [SoCar37.github.io/Espanol-Course](https://SoCar37.github.io/Espanol-Course)  
📦 **Version:** v0.1.7  
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
| Flashcard engine with SM-2 | ✅ Working |
| Quiz engine | ✅ Working |
| A1 Units 1–10 content | ✅ Complete |
| PWA app icons | ✅ Complete |
| Audio (Google TTS Neural2) | 🔜 v0.5.0 |
| A2 content (12 units) | 🔜 v0.2.0+ |
| Placement test | 🔜 v1.0.0 |

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
| A2 | 12 | Not started |
| B1 | 12 | Not started |
| B2 | 12 | Not started |
| C1 | 10 | Not started |

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
| v0.1.7 | PWA app icons |
| v0.1.6 | A1 Units 2–10 content + sequential unlock |
| v0.1.5 | Full quiz engine |
| v0.1.4 | Exercise engine + flashcard SM-2 engine |
| v0.1.0 | Initial scaffold |
| v0.2.0 | A2 content *(planned)* |
| v1.0.0 | Public launch *(planned)* |

---

## License

- App source code: [MIT](app/LICENSE)
- Course content: [CC BY-SA 4.0](content/LICENSE)

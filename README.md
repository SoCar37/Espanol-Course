# Espanol Course

**The most complete free Spanish course for English speakers seeking fluency in Mexican Spanish.**

🌐 **Live:** [SoCar37.github.io/Espanol-Course](https://SoCar37.github.io/Espanol-Course)  
📦 **Version:** v0.1.4  
📄 **License:** App — MIT · Content — CC BY-SA 4.0

---

## What is this?

A full A1–C1 CEFR Spanish course built as a progressive web app. Anchored in Mexican Spanish — all examples use *tú/usted/ustedes*, *computadora*, *carro*, *celular*. Free forever, no accounts required.

---

## Current status

| Feature | Status |
|---|---|
| Course map (A1–C1 overview) | ✅ Working |
| A1 Unit 1 — Greetings lesson | ✅ Complete |
| Exercise engine (all 4 types) | ✅ Working |
| Flashcard engine with SM-2 | ✅ Working |
| Progress tracking (XP, streak) | ✅ Working |
| Quiz engine | 🔜 v0.2.0 |
| A1 Units 2–10 content | 🔜 v0.2.0 |
| Audio (Google TTS Neural2) | 🔜 v0.2.0 |
| A2–C1 content | 🔜 v1.0+ |

---

## Tech stack

- **Frontend:** React + Vite + Tailwind CSS
- **Content:** Markdown (lessons) + JSON (vocab, exercises, quiz)
- **Progress:** localStorage (v1) → Supabase (v2, planned)
- **Hosting:** GitHub Pages — auto-deploys via GitHub Actions
- **Audio:** Google Cloud TTS Neural2, es-MX (planned)
- **Font:** Poppins

---

## Content scope

| Level | Units | Status |
|---|---|---|
| A1 | 10 | Unit 1 complete, Units 2–10 in progress |
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

**Note:** Run npm commands from a local drive only (e.g. `D:\`). UNC/network paths not supported by Node on Windows.

---

## Content structure

Each unit contains exactly five files:

```
content/A1/unit-01-greetings/
├── meta.json        ← id, title, level, estimated_minutes, status
├── lesson.md        ← 400–600 word lesson with dialogues and cultural note
├── vocab.json       ← 12–15 vocabulary items with pronunciation hints
├── exercises.json   ← 8 exercises (MCQ, fill-in, translation, assembly)
└── quiz.json        ← 8-question checkpoint quiz, 70% passing score
```

When adding a new unit, files must be placed in **both** `/content/A1/unit-XX-slug/` and `/app/public/content/A1/unit-XX-slug/`. See `CONTRIBUTING.md` for full schema reference.

---

## Version history

See [CHANGELOG.md](CHANGELOG.md) for full history.

| Version | Milestone |
|---|---|
| v0.1.4 | Exercise engine + flashcard engine with SM-2 |
| v0.1.0 | Initial scaffold |
| v0.2.0 | Quiz engine + A1 content complete *(planned)* |
| v1.0.0 | Public launch — A1+A2 complete, placement test *(planned)* |

---

## License

- App source code: [MIT](app/LICENSE)
- Course content: [CC BY-SA 4.0](content/LICENSE)

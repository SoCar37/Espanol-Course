# Espanol-Course

**The most complete free Spanish course for English speakers seeking fluency in Mexican Spanish.**

🇲🇽 Live at **[SoCar37.github.io/Espanol-Course](https://SoCar37.github.io/Espanol-Course)**

---

## What this is

A full A1–C1 Spanish course built as a progressive web app. 56 units of structured content, anchored entirely in Mexican Spanish. Free, open source, and works on any device.

- **Dialect:** Mexican Spanish throughout — *tú/usted/ustedes*, *computadora*, *carro*, *celular*
- **Standard:** CEFR A1 through C1
- **Content:** 56 units across 5 levels — lesson, vocabulary, exercises, quiz per unit
- **Progress:** Tracks XP, streaks, and unit completion in your browser
- **Placement test:** 35-question quiz that places you at the right level on first visit

---

## Levels

| Level | Name | Units | Focus |
|-------|------|-------|-------|
| A1 | Foundations | 10 | Greetings, numbers, colors, basic present tense |
| A2 | Building Blocks | 12 | Past tenses, reflexive verbs, everyday vocabulary |
| B1 | Intermediate Fluency | 12 | Subjunctive, future & conditional, idioms |
| B2 | Advanced Expression | 12 | Subjunctive mastery, complex grammar, debate |
| C1 | Near-Native Proficiency | 10 | Nuanced writing, literature, professional Spanish |

---

## Running locally

Requires [Node.js](https://nodejs.org/) v18 or later.

```bash
git clone https://github.com/SoCar37/Espanol-Course.git
cd Espanol-Course/app
npm install
npm run dev
```

Opens at `http://localhost:5173/Espanol-Course/`

---

## Project structure

```
Espanol-Course/
├── app/                  # React + Vite + Tailwind frontend (MIT)
│   ├── src/
│   │   ├── pages/        # One file per page/feature
│   │   ├── components/   # Layout, exercise engine, flashcards
│   │   ├── hooks/        # useProgress (localStorage)
│   │   └── utils/        # SM-2 spaced repetition
│   └── public/content/   # Served copy of course content
├── content/              # Course content source of truth (CC BY-SA 4.0)
│   ├── A1/  A2/  B1/  B2/  C1/
│   └── each unit: meta.json, lesson.md, vocab.json, exercises.json, quiz.json
├── tools/
│   ├── generate-audio.py # Google Cloud TTS audio generator
│   └── validate-content.py
└── CHANGELOG.md
```

---

## Contributing content

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full content schema and style guide.

Quick reference — each unit requires exactly five files:

| File | Format | Contents |
|------|--------|----------|
| `meta.json` | JSON | id, title, level, unit, slug, estimated_minutes, topics |
| `lesson.md` | Markdown | 400–600 word lesson, dialogues, grammar tables, cultural note |
| `vocab.json` | JSON array | 12–15 words with translation, pronunciation hint, example sentence |
| `exercises.json` | JSON array | 8 exercises — MCQ, fill-in-blank, translation, sentence assembly |
| `quiz.json` | JSON object | 8 multiple-choice questions, 70% passing score |

When adding a unit, place files in **both**:
1. `/content/LEVEL/unit-XX-slug/` — source of truth
2. `/app/public/content/LEVEL/unit-XX-slug/` — served copy

---

## Tech stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Hosting:** GitHub Pages — auto-deploys on push to `main`
- **Progress:** localStorage (v1.0) → Supabase (planned v2.0)
- **Audio:** Google Cloud TTS Neural2 `es-MX` (planned)

---

## License

- App code: [MIT](app/LICENSE)
- Course content: [CC BY-SA 4.0](content/LICENSE)

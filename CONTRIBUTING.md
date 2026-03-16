# Contributing to Espanol-Course

Thank you for your interest in contributing! This document explains how the project is structured and how to add content or code.

---

## Project structure

```
Espanol-Course/
├── app/                    # React + Vite frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Top-level page components
│   │   ├── hooks/          # Custom React hooks (useProgress)
│   │   ├── utils/          # Helper functions (SM-2 algorithm)
│   │   └── styles/         # Global styles
│   ├── public/content/     # Served copy of course content (see below)
│   └── index.html
├── content/                # Course content source of truth (CC BY-SA 4.0)
│   ├── A1/   # 10 units — complete
│   ├── A2/   # 12 units — complete
│   ├── B1/   # 12 units — complete
│   ├── B2/   # 12 units — complete
│   └── C1/   # 10 units — complete
├── assets/
│   └── audio/              # Generated MP3 files (Google TTS — planned)
├── tools/
│   ├── generate-audio.py   # Google Cloud TTS audio generator
│   └── validate-content.py # Content schema validator
├── README.md
├── CHANGELOG.md
└── CONTRIBUTING.md
```

---

## Naming conventions

### Folders
- All lowercase, hyphen-separated
- Level prefix in caps: `A1`, `A2`, `B1`, `B2`, `C1`
- Units zero-padded: `unit-01`, `unit-02` ... `unit-12`
- Unit folders include a descriptive slug: `unit-01-greetings`

### Files
Every unit contains exactly these five files — always the same names:
- `meta.json`
- `lesson.md`
- `vocab.json`
- `exercises.json`
- `quiz.json`

### Versioning
- Format: `v0.1.0` (major.minor.patch)
- Bump **patch** (0.1.**1**) for content fixes and small corrections
- Bump **minor** (0.**2**.0) for new units or features
- Bump **major** (**1**.0.0) for major milestones (e.g., public launch)
- Every version gets an entry in `CHANGELOG.md`

---

## Adding a new unit

When adding a new unit, files must be placed in **two locations**:

1. `/content/LEVEL/unit-XX-slug/` — source of truth, edit here
2. `/app/public/content/LEVEL/unit-XX-slug/` — served copy (Vite serves from `public/`)

**Both locations must be committed together.** The GitHub Actions workflow does not copy automatically.

After adding files, register the unit in `CourseMapPage.jsx` by adding it to the appropriate level's `units` array. The `id` field must exactly match the folder name:

```js
{ id: 'unit-11-example', title: 'Example Unit Title' }
```

---

## Content schema

### meta.json
```json
{
  "id": "A1-U01",
  "title": "Greetings and Introductions",
  "level": "A1",
  "unit": 1,
  "slug": "greetings",
  "estimated_minutes": 20,
  "topics": ["greetings", "introductions", "farewells"],
  "prereqs": [],
  "cefr_skills": ["speaking", "listening", "reading"],
  "cultural_note": true,
  "audio_available": false,
  "status": "draft",
  "version": "1.0.0"
}
```

### vocab.json
```json
[
  {
    "id": "A1-U01-V001",
    "word": "hola",
    "translation": "hello / hi",
    "pronunciation_hint": "OH-lah",
    "part_of_speech": "interjection",
    "example_sentence": "Hola, ¿cómo estás?",
    "example_translation": "Hello, how are you?",
    "audio_file": "A1/unit-01/hola.mp3",
    "tags": ["greeting", "essential"]
  }
]
```

### exercises.json

> ⚠️ **Read this carefully before writing exercises.** Incorrect schema will cause silent failures in the exercise engine at runtime.

Every exercise must have: `id`, `type`, `prompt`, `answer`, `explanation`.

**Rules by type:**

| Type | `options` | `answer` | `words` |
|------|-----------|----------|---------|
| `multiple_choice` | Array of exactly 4 strings | Integer 0–3 | — |
| `fill_in_blank` | Array of exactly 4 strings | Integer 0–3 | — |
| `translation` | Array of exactly 4 strings | Integer 0–3 | — |
| `sentence_assembly` | — | String (correct sentence) | Array of strings |

**`fill_in_blank` and `translation` exercises require 4 options and an integer answer** — the same format as `multiple_choice`. Never use a raw string as the answer value for these types. If you cannot think of 4 plausible options, convert the exercise to `multiple_choice` instead.

```json
[
  {
    "id": "A1-U01-E001",
    "type": "multiple_choice",
    "prompt": "How do you say 'Good morning' in Spanish?",
    "options": ["Buenas noches", "Buenos días", "Buenas tardes", "Hasta luego"],
    "answer": 1,
    "explanation": "Buenos días is used until around noon."
  },
  {
    "id": "A1-U01-E002",
    "type": "fill_in_blank",
    "prompt": "___ means 'hello' in Spanish.",
    "options": ["Adiós", "Hola", "Gracias", "Por favor"],
    "answer": 1,
    "explanation": "Hola is the standard informal greeting in Mexican Spanish."
  },
  {
    "id": "A1-U01-E003",
    "type": "translation",
    "prompt": "Which is the correct translation of 'What is your name?'",
    "options": ["¿Cómo estás?", "¿De dónde eres?", "¿Cómo te llamas?", "¿Cuántos años tienes?"],
    "answer": 2,
    "explanation": "¿Cómo te llamas? is the most common way to ask someone's name in Mexican Spanish."
  },
  {
    "id": "A1-U01-E004",
    "type": "sentence_assembly",
    "prompt": "Arrange the words to form a correct sentence.",
    "words": ["me", "llamo", "Carlos", "Hola,"],
    "answer": "Hola, me llamo Carlos",
    "explanation": "The standard way to introduce yourself in Spanish."
  }
]
```

Each unit should have **8 exercises** mixing types. Use the validator before committing:

```bash
python3 tools/validate-content.py
```

### quiz.json

Quizzes use `multiple_choice` questions only. Every question must have exactly 4 options and an integer answer in range 0–3. Passing score is always 70.

```json
{
  "id": "A1-U01-Q",
  "title": "Unit 1 Checkpoint Quiz",
  "passing_score": 70,
  "questions": [
    {
      "id": "A1-U01-Q001",
      "type": "multiple_choice",
      "prompt": "Which greeting is used in the afternoon?",
      "options": ["Buenos días", "Buenas noches", "Buenas tardes", "Hola"],
      "answer": 2,
      "explanation": "Buenas tardes is used from noon until evening."
    }
  ]
}
```

Each unit should have **8 quiz questions**.

---

## Mexican Spanish guidelines

All content must follow these conventions:
- Use **tú** as the default second-person singular (informal)
- Use **usted** for formal register
- Use **ustedes** for all plural second-person — never vosotros
- Default vocabulary: **computadora** (not ordenador), **carro** (not coche), **celular** (not móvil)
- Grammar explanations reference Mexican usage first, with regional variations noted separately
- Cultural notes draw from Mexican geography, food, holidays, and traditions

---

## Questions?

Open a GitHub Issue with the label `question`.

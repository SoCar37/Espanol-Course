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
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   └── styles/         # Global styles
│   ├── public/             # Static assets served directly
│   └── index.html
├── content/                # All course content (CC BY-SA 4.0)
│   ├── A1/
│   │   └── unit-01-greetings/
│   │       ├── meta.json        # Unit metadata
│   │       ├── lesson.md        # Lesson prose
│   │       ├── vocab.json       # Vocabulary list
│   │       ├── exercises.json   # Practice exercises
│   │       └── quiz.json        # Checkpoint quiz
│   ├── A2/
│   ├── B1/
│   ├── B2/
│   └── C1/
├── assets/
│   ├── audio/              # Generated MP3 files (Google TTS)
│   └── images/
├── tools/                  # Content generation and validation scripts
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
- Unit folders include a slug: `unit-01-greetings`

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
- Bump **major** (**1**.0.0) for major milestones (e.g., A1 complete, public launch)
- Every version gets an entry in `CHANGELOG.md`

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
  "status": "draft"
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
```json
[
  {
    "id": "A1-U01-E001",
    "type": "fill_in_blank",
    "prompt": "___, me llamo Carlos. (Hello, my name is Carlos.)",
    "answer": "Hola",
    "hint": "The most common Spanish greeting",
    "explanation": "Hola is the standard informal greeting in Mexican Spanish."
  },
  {
    "id": "A1-U01-E002",
    "type": "multiple_choice",
    "prompt": "How do you say 'Good morning' in Spanish?",
    "options": ["Buenas noches", "Buenos días", "Buenas tardes", "Hasta luego"],
    "answer": 1,
    "explanation": "Buenos días is used until around noon."
  },
  {
    "id": "A1-U01-E003",
    "type": "translation",
    "prompt": "Translate to Spanish: 'What is your name?'",
    "answer": "¿Cómo te llamas?",
    "acceptable_answers": ["¿Cuál es tu nombre?"],
    "explanation": "¿Cómo te llamas? is the most common way to ask someone's name in Mexican Spanish."
  }
]
```

### quiz.json
```json
{
  "id": "A1-U01-Q",
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

---

## Mexican Spanish guidelines

All content must follow these conventions:
- Use **tú** as the default second-person singular (informal)
- Use **usted** for formal register
- Use **ustedes** for all plural second-person (never vosotros)
- Default vocabulary: **computadora** (not ordenador), **carro** (not coche), **celular** (not móvil)
- Grammar explanations reference Mexican usage first, with regional variations noted separately
- Cultural notes draw from Mexican geography, food, holidays, and traditions

---

## Branching (for future contributors)

- `main` — always deployable, auto-deploys to GitHub Pages
- `content/A1-unit-02` — content additions
- `feature/flashcard-sr` — app feature development
- `fix/quiz-scoring` — bug fixes

All contributions via pull request to `main`.

---

## Questions?

Open a GitHub Issue with the label `question`.

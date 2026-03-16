// src/pages/PlacementTestPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

// ---------------------------------------------------------------------------
// 35 MCQ questions spanning A1–B2, Mexican Spanish anchored
// Band tags are for documentation only — questions are presented in a single
// linear sequence, shuffled slightly across bands so difficulty ramps up.
// ---------------------------------------------------------------------------
const QUESTIONS = [
  // ── A1 (Q1–10) ────────────────────────────────────────────────────────────
  {
    id: 'PT-001',
    band: 'A1',
    prompt: 'What does "Buenos días" mean?',
    options: ['Good night', 'Good afternoon', 'Good morning', 'Goodbye'],
    answer: 2,
  },
  {
    id: 'PT-002',
    band: 'A1',
    prompt: 'Choose the correct translation: "I am tired."',
    options: ['Tengo hambre.', 'Estoy cansado.', 'Soy feliz.', 'Tengo sed.'],
    answer: 1,
  },
  {
    id: 'PT-003',
    band: 'A1',
    prompt: 'Which word means "car" in Mexican Spanish?',
    options: ['Coche', 'Automóvil', 'Vehículo', 'Carro'],
    answer: 3,
  },
  {
    id: 'PT-004',
    band: 'A1',
    prompt: '"Ella ___ estudiante." — Which verb completes this correctly?',
    options: ['está', 'son', 'es', 'somos'],
    answer: 2,
  },
  {
    id: 'PT-005',
    band: 'A1',
    prompt: 'What number is "cuarenta y cinco"?',
    options: ['54', '35', '45', '40'],
    answer: 2,
  },
  {
    id: 'PT-006',
    band: 'A1',
    prompt: 'How do you say "my family" in Spanish?',
    options: ['su familia', 'mi familia', 'tu familia', 'nuestra famila'],
    answer: 1,
  },
  {
    id: 'PT-007',
    band: 'A1',
    prompt: '"¿Cómo te llamas?" — What is this question asking?',
    options: ['How old are you?', 'Where are you from?', 'What is your name?', 'How are you?'],
    answer: 2,
  },
  {
    id: 'PT-008',
    band: 'A1',
    prompt: 'Which color is "rojo"?',
    options: ['Blue', 'Green', 'Yellow', 'Red'],
    answer: 3,
  },
  {
    id: 'PT-009',
    band: 'A1',
    prompt: '"Yo ___ agua." — Choose the correct verb form.',
    options: ['bebes', 'beben', 'bebo', 'bebe'],
    answer: 2,
  },
  {
    id: 'PT-010',
    band: 'A1',
    prompt: 'What does "¿Dónde está el baño?" mean?',
    options: ['What time is it?', 'Where is the bathroom?', 'How much does it cost?', 'Where are you going?'],
    answer: 1,
  },
  // ── A2 (Q11–21) ───────────────────────────────────────────────────────────
  {
    id: 'PT-011',
    band: 'A2',
    prompt: '"Ayer yo ___ al mercado." — Which preterite form is correct?',
    options: ['voy', 'iba', 'fui', 'iré'],
    answer: 2,
  },
  {
    id: 'PT-012',
    band: 'A2',
    prompt: 'Choose the correct reflexive verb form: "Ella ___ a las siete."',
    options: ['levanta', 'se levanta', 'me levanto', 'te levantas'],
    answer: 1,
  },
  {
    id: 'PT-013',
    band: 'A2',
    prompt: 'Which sentence uses "ser" correctly?',
    options: [
      'La sopa está caliente.',
      'Estoy de México.',
      'Él es médico.',
      'Estamos cansados.',
    ],
    answer: 2,
  },
  {
    id: 'PT-014',
    band: 'A2',
    prompt: '"Lo ___ ayer en el mercado." — Direct object pronoun. Fill in the blank.',
    options: ['vi', 'ver', 'veo', 've'],
    answer: 0,
  },
  {
    id: 'PT-015',
    band: 'A2',
    prompt: '"Cuando era niño, ___ mucho." — Which form fits the imperfect?',
    options: ['jugué', 'jugaré', 'jugaba', 'juego'],
    answer: 2,
  },
  {
    id: 'PT-016',
    band: 'A2',
    prompt: 'What does "Me duele la cabeza" mean?',
    options: ['I have a headache.', 'My head is big.', 'I like my hair.', 'I am dizzy.'],
    answer: 0,
  },
  {
    id: 'PT-017',
    band: 'A2',
    prompt: '"Ellos ___ la película anoche." — Correct preterite?',
    options: ['vieron', 'veían', 'ven', 'verán'],
    answer: 0,
  },
  {
    id: 'PT-018',
    band: 'A2',
    prompt: 'Which sentence uses an indirect object pronoun correctly?',
    options: [
      'Te regalo una flor.',
      'Regalo una flor te.',
      'Te a regalo flor.',
      'Una flor regalo te.',
    ],
    answer: 0,
  },
  {
    id: 'PT-019',
    band: 'A2',
    prompt: '"¿Cuánto cuesta?" — What is being asked?',
    options: ['How far is it?', 'What time is it?', 'How much does it cost?', 'How long does it take?'],
    answer: 2,
  },
  {
    id: 'PT-020',
    band: 'A2',
    prompt: 'Preterite vs imperfect: "While I was cooking, she ___." — Which fits?',
    options: ['llegó', 'llegaba', 'llega', 'llegará'],
    answer: 0,
  },
  {
    id: 'PT-021',
    band: 'A2',
    prompt: '"Él me ___ el libro." — Which verb correctly means "gave" here?',
    options: ['dio', 'doy', 'daba', 'da'],
    answer: 0,
  },
  // ── B1 (Q22–30) ───────────────────────────────────────────────────────────
  {
    id: 'PT-022',
    band: 'B1',
    prompt: '"Quiero que tú ___ conmigo." — Which subjunctive form is correct?',
    options: ['vengas', 'vienes', 'vendrás', 'veniste'],
    answer: 0,
  },
  {
    id: 'PT-023',
    band: 'B1',
    prompt: '"El año que viene, nosotros ___ a Oaxaca." — Future tense?',
    options: ['fuimos', 'vamos', 'iremos', 'íbamos'],
    answer: 2,
  },
  {
    id: 'PT-024',
    band: 'B1',
    prompt: 'Which sentence uses "por" correctly?',
    options: [
      'Estudié por ser médico.',
      'Te llamo para las tres.',
      'Gracias por tu ayuda.',
      'Lo hice para ti mañana.',
    ],
    answer: 2,
  },
  {
    id: 'PT-025',
    band: 'B1',
    prompt: '"Se venden tacos aquí." — What does this construction express?',
    options: [
      'Someone is selling tacos to themselves.',
      'An impersonal/passive statement that tacos are sold here.',
      'A reflexive action about tacos.',
      'A future plan to sell tacos.',
    ],
    answer: 1,
  },
  {
    id: 'PT-026',
    band: 'B1',
    prompt: '"Si tuviera dinero, ___." — Which conditional form completes this correctly?',
    options: ['viajé', 'viajo', 'viajaría', 'viajaré'],
    answer: 2,
  },
  {
    id: 'PT-027',
    band: 'B1',
    prompt: 'What does "No hay mal que por bien no venga" mean?',
    options: [
      'There is nothing good in this world.',
      'Every cloud has a silver lining.',
      'Good things come to those who wait.',
      'You cannot have good without evil.',
    ],
    answer: 1,
  },
  {
    id: 'PT-028',
    band: 'B1',
    prompt: '"El hombre que ___ ayer es mi jefe." — Which relative clause form is correct?',
    options: ['llame', 'llamé', 'llamaba', 'llamó'],
    answer: 3,
  },
  {
    id: 'PT-029',
    band: 'B1',
    prompt: 'Which option correctly expresses a formal written opinion?',
    options: [
      'Pues yo creo que sí, o sea.',
      'En mi opinión, este problema requiere atención urgente.',
      'Me parece que es bueno o algo así.',
      'Obviamente todo está muy mal, ¿no?',
    ],
    answer: 1,
  },
  {
    id: 'PT-030',
    band: 'B1',
    prompt: '"Para" is used to express ___.',
    options: [
      'Duration, cause, or exchange',
      'Purpose, destination, or recipient',
      'Means of transport only',
      'Time and frequency only',
    ],
    answer: 1,
  },
  // ── B2 (Q31–35) ───────────────────────────────────────────────────────────
  {
    id: 'PT-031',
    band: 'B2',
    prompt: '"Si hubiera sabido, no ___." — Past subjunctive + conditional perfect?',
    options: ['habría venido', 'vendría', 'hubiera venido', 'vendré'],
    answer: 0,
  },
  {
    id: 'PT-032',
    band: 'B2',
    prompt: '"Dudo que él ___ la verdad." — Advanced subjunctive: which form?',
    options: ['diga', 'dice', 'dijo', 'dirá'],
    answer: 0,
  },
  {
    id: 'PT-033',
    band: 'B2',
    prompt: 'Which connective best introduces a contrasting argument in a formal essay?',
    options: ['O sea', 'Sin embargo', 'Entonces', 'Pues'],
    answer: 1,
  },
  {
    id: 'PT-034',
    band: 'B2',
    prompt: '"Ojalá que ___ buen tiempo mañana." — Which form is correct?',
    options: ['hace', 'hará', 'hiciera', 'haga'],
    answer: 3,
  },
  {
    id: 'PT-035',
    band: 'B2',
    prompt: 'Which sentence demonstrates correct use of the past subjunctive?',
    options: [
      'Esperaba que llegues a tiempo.',
      'Quería que vinieras conmigo.',
      'Ojalá que vengas mañana.',
      'Es importante que hayas estudiado.',
    ],
    answer: 1,
  },
]

// ---------------------------------------------------------------------------
// Scoring thresholds → placed level
// ---------------------------------------------------------------------------
function getPlacedLevel(score, total) {
  const pct = (score / total) * 100
  if (pct >= 80) return 'B2'
  if (pct >= 60) return 'B1'
  if (pct >= 40) return 'A2'
  return 'A1'
}

// First unit slug per level — used for "Start learning" CTA
const FIRST_UNIT = {
  A1: 'unit-01-greetings',
  A2: 'unit-01-present-tense',
  B1: 'unit-01-subjunctive-intro',
  B2: 'unit-01-subjunctive-past',
}

const LEVEL_DESCRIPTIONS = {
  A1: 'You\'re starting fresh — the perfect place to build a solid foundation in Mexican Spanish.',
  A2: 'You know the basics. We\'ll skip the beginner material and start building real fluency.',
  B1: 'Solid intermediate skills! You\'re placed into the intermediate level — time to tackle the subjunctive and beyond.',
  B2: 'Impressive! You\'re placed into the upper-intermediate level — advanced grammar and nuanced expression await.',
}

const LEVEL_COLORS = {
  A1: 'from-indigo-500 to-purple-500',
  A2: 'from-purple-500 to-pink-500',
  B1: 'from-pink-500 to-rose-500',
  B2: 'from-rose-500 to-orange-500',
}

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------
const SCREEN_INTRO    = 'intro'
const SCREEN_QUESTION = 'question'
const SCREEN_RESULT   = 'result'

export default function PlacementTestPage() {
  const navigate = useNavigate()
  const { unlockLevel, setPlacementComplete } = useProgress()

  const [screen, setScreen]           = useState(SCREEN_INTRO)
  const [current, setCurrent]         = useState(0)
  const [answers, setAnswers]         = useState([])       // array of booleans
  const [selected, setSelected]       = useState(null)     // index or null
  const [revealed, setRevealed]       = useState(false)    // show correct/wrong

  const total     = QUESTIONS.length
  const question  = QUESTIONS[current]
  const score     = answers.filter(Boolean).length

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleStart() {
    setScreen(SCREEN_QUESTION)
  }

  function handleSelect(idx) {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
  }

  function handleNext() {
    const correct = selected === question.answer
    const newAnswers = [...answers, correct]

    if (current + 1 >= total) {
      // Test complete — compute result and persist
      const finalScore = newAnswers.filter(Boolean).length
      const level = getPlacedLevel(finalScore, total)
      unlockLevel(level)
      setPlacementComplete(level)
      setAnswers(newAnswers)
      setScreen(SCREEN_RESULT)
    } else {
      setAnswers(newAnswers)
      setCurrent(current + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  function handleStartLearning() {
    const level = getPlacedLevel(score, total)
    navigate(`/lesson/${level}/${FIRST_UNIT[level]}`)
  }

  function handleGoToCourse() {
    navigate('/')
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (screen === SCREEN_INTRO) {
    return <IntroScreen onStart={handleStart} total={total} />
  }

  if (screen === SCREEN_RESULT) {
    const level = getPlacedLevel(score, total)
    return (
      <ResultScreen
        score={score}
        total={total}
        level={level}
        onStartLearning={handleStartLearning}
        onGoToCourse={handleGoToCourse}
      />
    )
  }

  // SCREEN_QUESTION
  const progress = ((current) / total) * 100

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-content-secondary text-sm font-medium">
            Question {current + 1} of {total}
          </span>
          <span className="text-content-secondary text-sm font-medium">
            <span className="text-green-400 font-bold">{score}</span> correct
          </span>
        </div>
        {/* Progress bar */}
        <div className="progress-bar h-2">
          <div
            className="progress-fill transition-all duration-500"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`Question ${current + 1} of ${total}`}
          />
        </div>
        {/* Band indicator */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-content-secondary">Level</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-content-primary">
            {question.band}
          </span>
        </div>
      </div>

      {/* Question card */}
      <div className="card mb-4">
        <p className="text-lg font-semibold text-content-primary mb-6 leading-relaxed">
          {question.prompt}
        </p>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let style = 'bg-surface-main border-white/10 text-content-primary hover:border-brand-primary cursor-pointer'

            if (revealed) {
              if (idx === question.answer) {
                style = 'bg-green-500/15 border-green-500/60 text-green-300 cursor-default'
              } else if (idx === selected && idx !== question.answer) {
                style = 'bg-red-500/15 border-red-500/60 text-red-300 cursor-default'
              } else {
                style = 'bg-surface-main border-white/5 text-content-secondary cursor-default opacity-60'
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={revealed}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${style}`}
              >
                <span className="inline-block w-6 text-content-secondary mr-2 text-sm">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </button>
            )
          })}
        </div>
      </div>

      {/* Next button — only shown after selection */}
      {revealed && (
        <div className="flex justify-end animate-fade-in">
          <button
            onClick={handleNext}
            className="btn-primary px-8 py-3 text-base font-semibold"
          >
            {current + 1 >= total ? 'See Results →' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function IntroScreen({ onStart, total }) {
  return (
    <div className="animate-fade-in max-w-xl mx-auto text-center">
      <div className="card mb-6">
        <div className="text-5xl mb-4" aria-hidden="true">🎯</div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          Placement Test
        </h1>
        <p className="text-content-secondary text-base mb-6 leading-relaxed">
          Answer {total} multiple-choice questions and we'll place you at the right
          level — A1 through B2. The whole course unlocks from your placed level downward.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6 text-left">
          {[
            { icon: '📝', label: `${total} questions` },
            { icon: '⏱️', label: '~8 minutes' },
            { icon: '🇲🇽', label: 'Mexican Spanish' },
            { icon: '🔓', label: 'Unlocks your level' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-surface-main rounded-lg px-3 py-2">
              <span aria-hidden="true">{icon}</span>
              <span className="text-sm text-content-primary font-medium">{label}</span>
            </div>
          ))}
        </div>

        <button onClick={onStart} className="btn-primary w-full py-3 text-base font-semibold">
          Start Placement Test
        </button>
      </div>

      <p className="text-content-secondary text-sm">
        Already know your level?{' '}
        <a href="/" className="text-brand-primary hover:underline">
          Go straight to A1
        </a>
      </p>
    </div>
  )
}

function ResultScreen({ score, total, level, onStartLearning, onGoToCourse }) {
  const pct = Math.round((score / total) * 100)
  const color = LEVEL_COLORS[level]

  return (
    <div className="animate-fade-in max-w-xl mx-auto text-center">
      <div className="card mb-6">
        <div className="text-5xl mb-4" aria-hidden="true">🎉</div>
        <h1 className="text-2xl md:text-3xl font-bold text-content-primary mb-1">
          You're placed at
        </h1>
        <div className={`inline-block bg-gradient-to-r ${color} text-white font-bold text-3xl px-6 py-2 rounded-full mb-4`}>
          {level}
        </div>

        <p className="text-content-secondary text-base mb-6 leading-relaxed">
          {LEVEL_DESCRIPTIONS[level]}
        </p>

        {/* Score ring — simple stat display */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-content-primary">{score}/{total}</div>
            <div className="text-xs text-content-secondary mt-1">Questions correct</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-content-primary">{pct}%</div>
            <div className="text-xs text-content-secondary mt-1">Score</div>
          </div>
        </div>

        <button
          onClick={onStartLearning}
          className="btn-primary w-full py-3 text-base font-semibold mb-3"
        >
          Start Learning at {level} →
        </button>
        <button
          onClick={onGoToCourse}
          className="w-full py-3 text-sm text-content-secondary hover:text-content-primary transition-colors"
        >
          View full course map
        </button>
      </div>
    </div>
  )
}

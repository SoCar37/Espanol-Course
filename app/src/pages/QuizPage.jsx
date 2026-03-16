// src/pages/QuizPage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

export default function QuizPage() {
  const { level, unit } = useParams()
  const navigate = useNavigate()
  const { isQuizUnlocked, markQuizComplete, getUnitProgress } = useProgress()

  const resolvedLevel = (level || 'A1').toUpperCase()
  const resolvedUnit = unit || 'unit-01-greetings'
  const unitKey = `${resolvedLevel}-${resolvedUnit}`

  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Quiz session state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/Espanol-Course/content/${resolvedLevel}/${resolvedUnit}/quiz.json`)
      .then(r => {
        if (!r.ok) throw new Error(`quiz.json not found (${r.status})`)
        return r.json()
      })
      .then(data => {
        setQuizData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [resolvedLevel, resolvedUnit])

  // Redirect to exercises if quiz is locked
  useEffect(() => {
    if (!loading && !isQuizUnlocked(unitKey)) {
      navigate(`/exercises/${resolvedLevel}/${resolvedUnit}`, { replace: true })
    }
  }, [loading, unitKey])

  function handleSelect(idx) {
    if (submitted) return
    setSelected(idx)
  }

  function handleSubmit() {
    if (selected === null) return
    const correct = selected === question.answer
    if (correct) setScore(s => s + 1)
    setSubmitted(true)
  }

  function handleNext() {
    if (currentIndex + 1 >= quizData.questions.length) {
      // Quiz finished — save result
      const finalScore = submitted && selected === question.answer
        ? score + 1
        : score
      const total = quizData.questions.length
      const pct = Math.round((finalScore / total) * 100)
      markQuizComplete(unitKey, pct)
      setFinished(true)
    } else {
      setCurrentIndex(i => i + 1)
      setSelected(null)
      setSubmitted(false)
    }
  }

  function handleRetry() {
    setCurrentIndex(0)
    setSelected(null)
    setSubmitted(false)
    setScore(0)
    setFinished(false)
  }

  // ── Loading ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Loading quiz…</p>
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-4xl">😕</p>
        <h2 className="text-xl font-bold text-white">Couldn't load quiz</h2>
        <p className="text-slate-400 text-sm font-mono bg-slate-800 rounded-lg px-3 py-2">{error}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">
          Go back
        </button>
      </div>
    )
  }

  const questions = quizData.questions
  const total = questions.length
  const question = questions[currentIndex]
  const passingScore = quizData.passing_score || 70

  // ── Finished screen ──────────────────────────────────────────
  if (finished) {
    const pct = Math.round((score / total) * 100)
    const passed = pct >= passingScore

    return (
      <div className="max-w-md mx-auto px-4 py-8 text-center space-y-8">

        {/* Score ring */}
        <div className="relative w-40 h-40 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke={passed ? '#10b981' : '#ef4444'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{pct}%</span>
            <span className="text-slate-400 text-xs">{score}/{total} correct</span>
          </div>
        </div>

        {/* Pass / Fail message */}
        {passed ? (
          <div className="space-y-2">
            <p className="text-2xl font-bold text-green-400">¡Excelente! Unit complete!</p>
            <p className="text-slate-400 text-sm">You passed with {pct}% — the next unit is now unlocked.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-2xl font-bold text-red-400">Not quite — {pct}%</p>
            <p className="text-slate-400 text-sm">You need {passingScore}% to pass. Review the lesson and try again.</p>
          </div>
        )}

        {/* XP badge — only on pass */}
        {passed && (
          <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 mx-auto w-fit">
            <span className="text-2xl">⭐</span>
            <div className="text-left">
              <p className="text-amber-300 font-bold text-lg">+50 XP</p>
              <p className="text-amber-400/70 text-xs">Unit complete</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {passed ? (
            <>
              <Link
                to="/"
                className="block w-full py-4 rounded-xl font-bold text-white text-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-indigo-500/25"
              >
                Back to course map →
              </Link>
              <Link
                to={`/flashcards/${resolvedLevel}/${resolvedUnit}`}
                className="block w-full py-3 rounded-xl font-medium text-slate-300 text-center bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-colors"
              >
                Review flashcards
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleRetry}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
              >
                Try again
              </button>
              <Link
                to={`/lesson/${resolvedLevel}/${resolvedUnit}`}
                className="block w-full py-3 rounded-xl font-medium text-slate-300 text-center bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-colors"
              >
                Review lesson
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── Question view ────────────────────────────────────────────
  const isCorrect = submitted && selected === question.answer

  const optionStyle = (idx) => {
    if (!submitted) {
      return selected === idx
        ? 'border-indigo-500 bg-indigo-500/10 text-white'
        : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-400 hover:bg-slate-700'
    }
    if (idx === question.answer) return 'border-green-500 bg-green-500/10 text-green-300'
    if (idx === selected && !isCorrect) return 'border-red-500 bg-red-500/10 text-red-300'
    return 'border-slate-700 bg-slate-800/50 text-slate-500'
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          <span>{quizData.title || 'Unit Quiz'}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Checkpoint Quiz</h1>
          <span className="font-semibold text-white text-sm">
            {score}<span className="text-slate-500 font-normal"> / {total} correct</span>
          </span>
        </div>
      </div>

      {/* Segmented progress bar */}
      <div className="flex gap-1">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i < currentIndex
                ? 'bg-indigo-500'
                : i === currentIndex
                ? 'bg-indigo-400 animate-pulse'
                : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Question card */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/60 p-5 shadow-xl space-y-5">

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Question {currentIndex + 1} of {total}
          </span>
        </div>

        <p className="text-lg font-medium text-white leading-relaxed">{question.prompt}</p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${optionStyle(idx)}`}
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </span>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {submitted && (
          <div className={`rounded-xl border p-4 space-y-1 ${
            isCorrect
              ? 'border-green-500/40 bg-green-500/10'
              : 'border-red-500/40 bg-red-500/10'
          }`}>
            <p className={`font-semibold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-slate-300 text-sm">{question.explanation}</p>
          </div>
        )}

        {/* Buttons */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="w-full py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            {currentIndex + 1 >= total ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}

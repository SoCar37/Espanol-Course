import { useState } from 'react'
import { Link } from 'react-router-dom'

// Sample exercise for scaffold — full engine in v0.2.0
const SAMPLE_EXERCISE = {
  id: 'A1-U01-E001',
  type: 'multiple_choice',
  prompt: 'How do you say "Good morning" in Mexican Spanish?',
  options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'],
  answer: 1,
  explanation: 'Buenos días is used from sunrise until around noon. It\'s one of the most common greetings in Mexican Spanish.',
}

export default function ExercisesPage() {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const isCorrect = selected === SAMPLE_EXERCISE.answer

  function handleSelect(index) {
    if (submitted) return
    setSelected(index)
  }

  function handleSubmit() {
    if (selected === null) return
    setSubmitted(true)
  }

  function handleReset() {
    setSelected(null)
    setSubmitted(false)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold gradient-text mb-1">Exercises</h1>
        <p className="text-content-secondary text-sm">
          Practice what you've learned
        </p>
      </div>

      {/* Sample exercise */}
      <div className="card mb-6">

        {/* Question header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
            Multiple choice
          </span>
          <span className="text-content-secondary text-sm">A1 · Unit 1</span>
        </div>

        {/* Question */}
        <p className="text-content-primary text-lg font-medium mb-6" role="heading" aria-level={2}>
          {SAMPLE_EXERCISE.prompt}
        </p>

        {/* Options */}
        <div
          className="space-y-3"
          role="radiogroup"
          aria-label="Answer options"
        >
          {SAMPLE_EXERCISE.options.map((option, index) => {
            let stateClass = 'border-white/10 hover:border-brand-primary bg-surface-main'
            if (submitted) {
              if (index === SAMPLE_EXERCISE.answer) {
                stateClass = 'border-brand-success bg-green-500/10 text-green-400'
              } else if (index === selected && !isCorrect) {
                stateClass = 'border-red-500 bg-red-500/10 text-red-400 animate-shake'
              } else {
                stateClass = 'border-white/5 bg-surface-main opacity-50'
              }
            } else if (selected === index) {
              stateClass = 'border-brand-primary bg-indigo-500/10'
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={submitted}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium ${stateClass}`}
                role="radio"
                aria-checked={selected === index}
                aria-label={`Option ${index + 1}: ${option}`}
              >
                <span className="mr-3 text-content-secondary text-sm">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {submitted && index === SAMPLE_EXERCISE.answer && (
                  <span className="ml-2" aria-hidden="true">✓</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {submitted && (
          <div
            className={`mt-6 p-4 rounded-xl border-l-4 ${isCorrect ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'}`}
            role="alert"
            aria-live="polite"
          >
            <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '🎉 Correct!' : '❌ Not quite'}
            </p>
            <p className="text-content-secondary text-sm">
              {SAMPLE_EXERCISE.explanation}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`btn-primary ${selected === null ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-disabled={selected === null}
            >
              Check answer
            </button>
          ) : (
            <button onClick={handleReset} className="btn-secondary">
              Try again
            </button>
          )}
        </div>

      </div>

      {/* Coming soon notice */}
      <div className="card text-center">
        <p className="text-content-secondary text-sm">
          🔧 <strong className="text-content-primary">Full exercise engine coming in v0.2.0</strong> — 
          fill-in-the-blank, translation, sentence assembly, error correction, and listening exercises
          will all be available once A1 Unit 1 content is complete.
        </p>
      </div>

    </div>
  )
}

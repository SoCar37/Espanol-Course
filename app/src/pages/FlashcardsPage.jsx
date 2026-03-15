import { useState } from 'react'

// Placeholder vocab for scaffold — will load from vocab.json in v0.2.0
const PLACEHOLDER_VOCAB = [
  { id: 'V001', word: 'hola', translation: 'hello / hi', example: 'Hola, ¿cómo estás?' },
  { id: 'V002', word: 'gracias', translation: 'thank you', example: 'Muchas gracias.' },
  { id: 'V003', word: 'por favor', translation: 'please', example: '¿Me ayudas, por favor?' },
  { id: 'V004', word: 'buenos días', translation: 'good morning', example: 'Buenos días, señora.' },
  { id: 'V005', word: 'buenas noches', translation: 'good night', example: 'Buenas noches, hasta mañana.' },
]

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completed, setCompleted] = useState(0)

  const card = PLACEHOLDER_VOCAB[currentIndex]
  const total = PLACEHOLDER_VOCAB.length

  function handleFlip() {
    setIsFlipped(f => !f)
  }

  function handleNext(rating) {
    setCompleted(c => c + 1)
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex(i => (i + 1) % total)
    }, 200)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold gradient-text mb-1">Flashcard Drills</h1>
        <p className="text-content-secondary text-sm">
          Card {currentIndex + 1} of {total} · {completed} reviewed this session
        </p>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-8">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex) / total) * 100}%` }}
          role="progressbar"
          aria-valuenow={currentIndex}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Card ${currentIndex + 1} of ${total}`}
        />
      </div>

      {/* Flashcard */}
      <div
        className="relative cursor-pointer mb-8"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
        onKeyDown={e => e.key === 'Enter' || e.key === ' ' ? handleFlip() : null}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? `Translation: ${card.translation}. Press to flip back.` : `Word: ${card.word}. Press to reveal translation.`}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '280px',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 text-center"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            }}
            aria-hidden={isFlipped}
          >
            <p className="text-white/70 text-sm mb-3 uppercase tracking-wider">Spanish</p>
            <p className="text-white text-4xl font-bold mb-4">{card.word}</p>
            <p className="text-white/80 text-sm italic">"{card.example}"</p>
            <p className="text-white/50 text-xs mt-6">Tap to reveal</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 text-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
            }}
            aria-hidden={!isFlipped}
          >
            <p className="text-white/70 text-sm mb-3 uppercase tracking-wider">English</p>
            <p className="text-white text-3xl font-bold mb-4">{card.translation}</p>
            <p className="text-white/80 text-sm italic">"{card.example}"</p>
          </div>
        </div>
      </div>

      {/* Rating buttons — only shown after flip */}
      {isFlipped && (
        <div className="flex gap-3 justify-center animate-fade-in" role="group" aria-label="How well did you know this?">
          {[
            { label: 'Missed', color: 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30', value: 0 },
            { label: 'Hard',   color: 'bg-orange-500/20 border-orange-500/40 text-orange-400 hover:bg-orange-500/30', value: 1 },
            { label: 'Good',   color: 'bg-blue-500/20 border-blue-500/40 text-blue-400 hover:bg-blue-500/30', value: 2 },
            { label: 'Easy',   color: 'bg-green-500/20 border-green-500/40 text-green-400 hover:bg-green-500/30', value: 3 },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={() => handleNext(btn.value)}
              className={`flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${btn.color}`}
              aria-label={`Rate as ${btn.label}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {!isFlipped && (
        <p className="text-center text-content-secondary text-sm">
          Tap the card to reveal the translation
        </p>
      )}

      {/* Coming soon notice */}
      <div className="mt-10 card text-center">
        <p className="text-content-secondary text-sm">
          🔧 <strong className="text-content-primary">Spaced repetition coming in v0.3.0</strong> — 
          cards will resurface based on how well you know them using the SM-2 algorithm.
        </p>
      </div>

    </div>
  )
}

// src/pages/FlashcardsPage.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { getTodayString } from '../utils/sm2'

export default function FlashcardsPage() {
  const { level, unit } = useParams()
  const navigate = useNavigate()
  const { getDueVocab, rateVocabCard, addXP } = useProgress()

  const resolvedLevel = level || 'A1'
  const resolvedUnit = unit || 'unit-01-greetings'

  const [allVocab, setAllVocab] = useState([])
  const [dueCards, setDueCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [sessionReviewed, setSessionReviewed] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)

  // Load vocab.json
  useEffect(() => {
    setLoading(true)
    fetch(`/Espanol-Course/content/${resolvedLevel}/${resolvedUnit}/vocab.json`)
      .then(r => {
        if (!r.ok) throw new Error(`vocab.json not found (${r.status})`)
        return r.json()
      })
      .then(data => {
        setAllVocab(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [resolvedLevel, resolvedUnit])

  // Once vocab loaded, compute due cards
  useEffect(() => {
    if (allVocab.length === 0) return
    const due = getDueVocab(allVocab)
    setDueCards(due)
    setCurrentIndex(0)
    setDone(due.length === 0)
  }, [allVocab])

  const card = dueCards[currentIndex]
  const total = dueCards.length

  function handleFlip() {
    setIsFlipped(f => !f)
  }

  function handleRate(rating) {
    // Save SM-2 data
    rateVocabCard(card.id, rating)

    // Award XP for reviewing
    addXP(2)

    setSessionReviewed(n => n + 1)
    setIsFlipped(false)

    // If rating was Missed (0), put card at end of queue so it comes back
    if (rating === 0) {
      setDueCards(prev => {
        const remaining = prev.filter((_, i) => i !== currentIndex)
        return [...remaining, card]
      })
      // Don't advance index — next card slides in
    } else {
      if (currentIndex + 1 >= dueCards.length - (rating === 0 ? 0 : 1)) {
        // Last card done
        setTimeout(() => setDone(true), 300)
      } else {
        setTimeout(() => setCurrentIndex(i => i + 1), 200)
      }
    }
  }

  // ── Loading ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Loading flashcards…</p>
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-4xl">😕</p>
        <h2 className="text-xl font-bold text-white">Couldn't load vocab</h2>
        <p className="text-slate-400 text-sm font-mono bg-slate-800 rounded-lg px-3 py-2">{error}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">
          Go back
        </button>
      </div>
    )
  }

  // ── All done for today ───────────────────────────────────────
  if (done) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">You're all caught up!</h2>
          <p className="text-slate-400">
            {sessionReviewed > 0
              ? `You reviewed ${sessionReviewed} card${sessionReviewed !== 1 ? 's' : ''} this session.`
              : 'No cards are due for review today.'}
          </p>
        </div>

        {/* Next review info */}
        <div className="px-5 py-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
          <p className="text-indigo-300 font-semibold text-sm">Come back tomorrow</p>
          <p className="text-slate-400 text-xs">
            Your cards are scheduled — the ones you found hard will appear sooner, easy ones later.
          </p>
        </div>

        {/* Stats */}
        {sessionReviewed > 0 && (
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{sessionReviewed}</p>
              <p className="text-slate-500 text-xs">Cards reviewed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">+{sessionReviewed * 2}</p>
              <p className="text-slate-500 text-xs">XP earned</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/lesson/${resolvedLevel}/${resolvedUnit}`)}
            className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            Back to lesson
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl font-medium text-slate-300 bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-colors"
          >
            Course map
          </button>
        </div>
      </div>
    )
  }

  // ── Main flashcard view ──────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold gradient-text mb-1">Flashcard Drills</h1>
        <p className="text-content-secondary text-sm">
          Card {currentIndex + 1} of {total} · {sessionReviewed} reviewed this session
        </p>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-8">
        <div
          className="progress-fill"
          style={{ width: `${(currentIndex / total) * 100}%` }}
          role="progressbar"
          aria-valuenow={currentIndex}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Card ${currentIndex + 1} of ${total}`}
        />
      </div>

      {/* Pronunciation hint badge */}
      {card.pronunciation_hint && (
        <div className="flex justify-center mb-3">
          <span className="text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
            🔊 {card.pronunciation_hint}
          </span>
        </div>
      )}

      {/* Flashcard — English front, Spanish back */}
      <div
        className="relative cursor-pointer mb-8"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') ? handleFlip() : null}
        role="button"
        tabIndex={0}
        aria-label={isFlipped
          ? `Spanish: ${card.word}. Press to flip back.`
          : `English: ${card.translation}. Press to reveal Spanish.`}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '280px',
          }}
        >
          {/* Front — English */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 text-center"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
            }}
            aria-hidden={isFlipped}
          >
            <p className="text-white/70 text-sm mb-3 uppercase tracking-wider">English</p>
            <p className="text-white text-3xl font-bold mb-4">{card.translation}</p>
            {card.part_of_speech && (
              <p className="text-white/60 text-xs uppercase tracking-widest mb-3">{card.part_of_speech}</p>
            )}
            <p className="text-white/50 text-xs mt-4">Tap to reveal Spanish</p>
          </div>

          {/* Back — Spanish */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 text-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            }}
            aria-hidden={!isFlipped}
          >
            <p className="text-white/70 text-sm mb-3 uppercase tracking-wider">Spanish</p>
            <p className="text-white text-4xl font-bold mb-3">{card.word}</p>
            {card.example_sentence && (
              <p className="text-white/80 text-sm italic mb-1">"{card.example_sentence}"</p>
            )}
            {card.example_translation && (
              <p className="text-white/50 text-xs italic">"{card.example_translation}"</p>
            )}
          </div>
        </div>
      </div>

      {/* Rating buttons */}
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
              onClick={() => handleRate(btn.value)}
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
          Tap the card to reveal the Spanish
        </p>
      )}

    </div>
  )
}

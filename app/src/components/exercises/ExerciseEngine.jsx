// src/components/exercises/ExerciseEngine.jsx
import { useState, useRef } from 'react';
import MultipleChoice from './MultipleChoice';
import FillInBlank from './FillInBlank';
import Translation from './Translation';
import SentenceAssembly from './SentenceAssembly';
import ExerciseSummary from './ExerciseSummary';

const TYPE_LABELS = {
  multiple_choice: 'Multiple Choice',
  fill_in_blank: 'Fill in the Blank',
  translation: 'Translation',
  sentence_assembly: 'Build the Sentence',
  error_correction: 'Error Correction',
  matching: 'Matching',
  listening: 'Listening',
};

const TYPE_ICONS = {
  multiple_choice: '🔘',
  fill_in_blank: '✏️',
  translation: '🔄',
  sentence_assembly: '🧩',
  error_correction: '🔍',
  matching: '🔗',
  listening: '🎧',
};

export default function ExerciseEngine({ exercises, level, unit, onComplete, onStartQuiz }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  // key forces re-mount of exercise component on retry/advance
  const [exerciseKey, setExerciseKey] = useState(0);

  // Tracks whether the current exercise has already received its first answer.
  // Once set, any further onAnswer calls (from retries) are ignored for scoring.
  const firstAnswerReceivedRef = useRef(false);

  const total = exercises.length;
  const current = exercises[currentIdx];
  const progress = ((currentIdx) / total) * 100;

  const XP_PER_CORRECT = 10;

  const handleAnswer = (correct) => {
    // Only score the first attempt — ignore subsequent calls from retries
    if (firstAnswerReceivedRef.current) return;
    firstAnswerReceivedRef.current = true;

    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);

    if (correct) {
      // Advance after correct answer (delay is handled by the component's setTimeout)
      if (currentIdx + 1 >= total) {
        setScore(newScore);
        setDone(true);
        const xpEarned = newScore * XP_PER_CORRECT;
        onComplete(newScore, total, xpEarned);
      } else {
        // Small delay so user sees green feedback before advancing
        setTimeout(() => {
          setCurrentIdx((i) => i + 1);
          setExerciseKey((k) => k + 1);
          firstAnswerReceivedRef.current = false;
        }, 900);
      }
    } else {
      // Wrong first attempt — score is locked (already not incremented).
      // Do NOT advance — let the component show retry UI.
      // When user eventually gets it right, onAnswer(true) will fire but
      // firstAnswerReceivedRef is already true so it won't re-score.
      // We need to advance when the user finally gets it right.
      // So: reset the ref ONLY for advancing purposes via a separate path.
      // Actually: we DO need to advance when correct on retry.
      // Solution: keep ref true for scoring, but still advance on correct retry.
      // We handle this by listening for the advance signal separately below.
    }
  };

  // Called by exercise components when user gets it right on a retry.
  // Does NOT affect score (firstAnswerReceivedRef blocks that) but DOES advance.
  const handleAdvance = () => {
    if (currentIdx + 1 >= total) {
      setDone(true);
      const xpEarned = score * XP_PER_CORRECT;
      onComplete(score, total, xpEarned);
    } else {
      setCurrentIdx((i) => i + 1);
      setExerciseKey((k) => k + 1);
      firstAnswerReceivedRef.current = false;
    }
  };

  const renderExercise = (ex) => {
    const props = {
      exercise: ex,
      onAnswer: handleAnswer,
      onAdvance: handleAdvance,
      key: exerciseKey,
    };
    switch (ex.type) {
      case 'multiple_choice':
        return <MultipleChoice {...props} />;
      case 'fill_in_blank':
        return <FillInBlank {...props} />;
      case 'translation':
        return <Translation {...props} />;
      case 'sentence_assembly':
        return <SentenceAssembly {...props} />;
      default:
        if (ex.options) return <MultipleChoice {...props} />;
        return <Translation {...props} />;
    }
  };

  if (done) {
    const xpEarned = score * XP_PER_CORRECT;
    return (
      <ExerciseSummary
        score={score}
        total={total}
        xpEarned={xpEarned}
        level={level}
        unit={unit}
        onStartQuiz={onStartQuiz}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar + score */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 font-medium">
            Exercise {currentIdx + 1} <span className="text-slate-600">/ {total}</span>
          </span>
          <span className="font-semibold text-white">
            {score}
            <span className="text-slate-500 font-normal"> / {total} correct</span>
          </span>
        </div>
        {/* Segmented progress bar */}
        <div className="flex gap-1">
          {exercises.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i < currentIdx
                  ? 'bg-indigo-500'
                  : i === currentIdx
                  ? 'bg-indigo-400 animate-pulse'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Exercise type badge */}
      <div className="flex items-center gap-2">
        <span className="text-base">{TYPE_ICONS[current.type] || '📝'}</span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          {TYPE_LABELS[current.type] || current.type}
        </span>
      </div>

      {/* Exercise card */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/60 p-5 shadow-xl">
        {renderExercise(current)}
      </div>
    </div>
  );
}

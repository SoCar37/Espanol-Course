// src/components/exercises/ExerciseEngine.jsx
import { useState } from 'react';
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

  const total = exercises.length;
  const current = exercises[currentIdx];
  const progress = ((currentIdx) / total) * 100;

  const XP_PER_CORRECT = 10;

  const handleAnswer = (correct) => {
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);

    if (currentIdx + 1 >= total) {
      // All exercises done
      setScore(newScore);
      setDone(true);
      const xpEarned = newScore * XP_PER_CORRECT;
      onComplete(newScore, total, xpEarned);
    } else {
      setCurrentIdx((i) => i + 1);
      setExerciseKey((k) => k + 1);
    }
  };

  const renderExercise = (ex) => {
    const props = { exercise: ex, onAnswer: handleAnswer, key: exerciseKey };
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
        // Fallback: render as MCQ if options exist, else translation-style
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

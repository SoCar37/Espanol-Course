// src/components/exercises/MultipleChoice.jsx
import { useState } from 'react';

export default function MultipleChoice({ exercise, onAnswer, onAdvance }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [firstAttemptDone, setFirstAttemptDone] = useState(false);

  const isCorrect = selected === exercise.answer;

  const handleSelect = (idx) => {
    if (submitted && isCorrect) return; // locked after correct
    setSelected(idx);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);

    if (selected === exercise.answer) {
      // Correct — report to engine then advance
      if (!firstAttemptDone) {
        onAnswer(true);
      } else {
        // Correct on retry — advance without re-scoring
        setTimeout(() => onAdvance(), 800);
      }
    } else {
      // Wrong — report on first attempt only, then show retry
      if (!firstAttemptDone) {
        setFirstAttemptDone(true);
        onAnswer(false);
      }
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setSubmitted(false);
  };

  const optionStyle = (idx) => {
    if (!submitted) {
      return selected === idx
        ? 'border-indigo-500 bg-indigo-500/10 text-white'
        : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-400 hover:bg-slate-700';
    }
    if (idx === exercise.answer) return 'border-green-500 bg-green-500/10 text-green-300';
    if (idx === selected && selected !== exercise.answer)
      return 'border-red-500 bg-red-500/10 text-red-300';
    return 'border-slate-700 bg-slate-800/50 text-slate-500';
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-white leading-relaxed">{exercise.prompt}</p>

      <div className="space-y-3">
        {exercise.options.map((opt, idx) => (
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
      {submitted && !isCorrect && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 space-y-3">
          <p className="text-red-300 font-semibold flex items-center gap-2">
            <span>✗</span> Not quite — try again
          </p>
          <p className="text-slate-300 text-sm">{exercise.explanation}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-sm font-medium hover:bg-red-500/30 transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {submitted && isCorrect && (
        <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-3">
          <p className="text-green-300 font-semibold flex items-center gap-2">
            <span>✓</span> Correct!
          </p>
        </div>
      )}

      {/* Submit button */}
      {(!submitted || !isCorrect) && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          Check Answer
        </button>
      )}
    </div>
  );
}

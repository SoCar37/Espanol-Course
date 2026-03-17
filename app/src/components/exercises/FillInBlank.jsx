// src/components/exercises/FillInBlank.jsx
import { useState, useRef, useEffect } from 'react';

export default function FillInBlank({ exercise, onAnswer, onAdvance }) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [firstAttemptDone, setFirstAttemptDone] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalize = (str) =>
    str
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const checkCorrect = (input) => {
    const answers = Array.isArray(exercise.answer) ? exercise.answer : [exercise.answer];
    if (typeof answers[0] === 'number') {
      // MCQ-style answer index — check against options array
      return answers.includes(exercise.options?.indexOf(
        exercise.options?.find(o => normalize(o) === normalize(input))
      ));
    }
    return answers.some((a) => normalize(String(a)) === normalize(input));
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    const correct = checkCorrect(value);
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      if (!firstAttemptDone) {
        onAnswer(true);
      } else {
        // Correct on retry — advance without re-scoring
        setTimeout(() => onAdvance(), 800);
      }
    } else {
      if (!firstAttemptDone) {
        setFirstAttemptDone(true);
        onAnswer(false);
      }
    }
  };

  const handleRetry = () => {
    setValue('');
    setSubmitted(false);
    setIsCorrect(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const parts = exercise.prompt.split('___');

  return (
    <div className="space-y-5">
      <div className="text-lg font-medium text-white leading-relaxed">
        {parts.length > 1 ? (
          <span>
            {parts[0]}
            <span className="inline-block mx-1 min-w-[80px] border-b-2 border-indigo-400 text-center text-indigo-300 align-bottom text-base">
              {submitted ? (isCorrect ? value : '?') : value || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
            </span>
            {parts[1]}
          </span>
        ) : (
          <p>{exercise.prompt}</p>
        )}
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitted && isCorrect}
          placeholder="Type your answer..."
          className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-800 text-white placeholder-slate-500 outline-none transition-all duration-200 font-medium
            ${submitted
              ? isCorrect
                ? 'border-green-500 bg-green-500/10'
                : 'border-red-500 bg-red-500/10'
              : 'border-slate-600 focus:border-indigo-500'
            }`}
        />
      </div>

      {submitted && !isCorrect && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 space-y-3">
          <p className="text-red-300 font-semibold flex items-center gap-2">
            <span>✗</span> Not quite
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

      {(!submitted || !isCorrect) && (
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="w-full py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          Check Answer
        </button>
      )}
    </div>
  );
}

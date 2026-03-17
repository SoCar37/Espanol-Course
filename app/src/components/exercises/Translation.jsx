// src/components/exercises/Translation.jsx
import { useState, useRef, useEffect } from 'react';

export default function Translation({ exercise, onAnswer, onAdvance }) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [firstAttemptDone, setFirstAttemptDone] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const normalize = (str) =>
    str
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿¡.,!?]/g, '')
      .replace(/\s+/g, ' ');

  const checkCorrect = (input) => {
    const answers = Array.isArray(exercise.answer) ? exercise.answer : [exercise.answer];
    if (typeof answers[0] === 'number') return false;
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
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isSpanishToEnglish = /[áéíóúüñ¿¡]/i.test(exercise.prompt) ||
    exercise.prompt.toLowerCase().includes('translate') === false;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
        <span className={isSpanishToEnglish ? 'text-indigo-400' : 'text-slate-400'}>Español</span>
        <span className="text-slate-600">→</span>
        <span className={!isSpanishToEnglish ? 'text-indigo-400' : 'text-slate-400'}>English</span>
      </div>

      <div className="border-l-4 border-indigo-500 pl-4 py-1">
        <p className="text-xl font-semibold text-white">{exercise.prompt}</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          Your translation
        </label>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitted && isCorrect}
          placeholder="Type your translation... (Enter to submit)"
          rows={2}
          className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-800 text-white placeholder-slate-500 outline-none resize-none transition-all duration-200 font-medium
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
          <p className="text-red-300 font-semibold">✗ Not quite</p>
          <p className="text-slate-300 text-sm">{exercise.explanation}</p>
          <p className="text-slate-400 text-xs">
            <span className="text-slate-500">Hint:</span> Accept variations of the correct answer — check your spelling and accents.
          </p>
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
          <p className="text-green-300 font-semibold">✓ Correct!</p>
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

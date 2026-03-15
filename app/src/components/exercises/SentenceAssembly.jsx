// src/components/exercises/SentenceAssembly.jsx
import { useState, useEffect } from 'react';

export default function SentenceAssembly({ exercise, onAnswer }) {
  const [available, setAvailable] = useState([]);
  const [assembled, setAssembled] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // exercise.options is the shuffled word bank
    // Shuffle them on mount so they aren't in answer order
    const words = [...(exercise.options || [])];
    setAvailable(shuffle(words.map((w, i) => ({ word: w, id: i }))));
    setAssembled([]);
    setSubmitted(false);
    setIsCorrect(false);
  }, [exercise.id]);

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const addWord = (token) => {
    if (submitted && isCorrect) return;
    setAvailable((prev) => prev.filter((t) => t.id !== token.id));
    setAssembled((prev) => [...prev, token]);
    setSubmitted(false);
  };

  const removeWord = (token) => {
    if (submitted && isCorrect) return;
    setAssembled((prev) => prev.filter((t) => t.id !== token.id));
    setAvailable((prev) => [...prev, token]);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (assembled.length === 0) return;
    const userSentence = assembled.map((t) => t.word).join(' ');
    // answer for sentence_assembly is the correct sentence string
    const correct = normalize(userSentence) === normalize(String(exercise.answer));
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) {
      setTimeout(() => onAnswer(true), 900);
    }
  };

  const handleRetry = () => {
    const allTokens = [...available, ...assembled];
    setAvailable(shuffle(allTokens));
    setAssembled([]);
    setSubmitted(false);
    setIsCorrect(false);
  };

  const normalize = (str) =>
    str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[¿¡.,!?]/g, '').replace(/\s+/g, ' ');

  return (
    <div className="space-y-5">
      <p className="text-lg font-medium text-white leading-relaxed">{exercise.prompt}</p>

      {/* Assembly tray */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Your sentence</p>
        <div
          className={`min-h-[56px] rounded-xl border-2 p-3 flex flex-wrap gap-2 transition-colors duration-200
            ${submitted
              ? isCorrect
                ? 'border-green-500 bg-green-500/10'
                : 'border-red-500 bg-red-500/10'
              : 'border-slate-600 bg-slate-800/50'
            }`}
        >
          {assembled.length === 0 && (
            <span className="text-slate-500 text-sm self-center">Tap words below to build your sentence</span>
          )}
          {assembled.map((token) => (
            <button
              key={token.id}
              onClick={() => removeWord(token)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors active:scale-95"
            >
              {token.word}
            </button>
          ))}
        </div>
      </div>

      {/* Word bank */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Word bank</p>
        <div className="flex flex-wrap gap-2">
          {available.map((token) => (
            <button
              key={token.id}
              onClick={() => addWord(token)}
              className="px-3 py-1.5 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 text-sm font-medium hover:bg-slate-600 hover:border-slate-500 transition-colors active:scale-95"
            >
              {token.word}
            </button>
          ))}
          {available.length === 0 && assembled.length > 0 && (
            <span className="text-slate-500 text-sm italic">All words placed</span>
          )}
        </div>
      </div>

      {/* Feedback */}
      {submitted && !isCorrect && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 space-y-3">
          <p className="text-red-300 font-semibold">✗ Not quite — check the word order</p>
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
          <p className="text-green-300 font-semibold">✓ Perfect sentence!</p>
        </div>
      )}

      {(!submitted || !isCorrect) && (
        <button
          onClick={handleSubmit}
          disabled={assembled.length === 0}
          className="w-full py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          Check Answer
        </button>
      )}
    </div>
  );
}

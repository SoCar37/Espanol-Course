// src/pages/ExercisesPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExerciseEngine from '../components/exercises/ExerciseEngine';
import { useProgress } from '../hooks/useProgress';

export default function ExercisesPage() {
  const { level, unit } = useParams();
  const navigate = useNavigate();
  const { completeExercises, isExercisesComplete } = useProgress();

  const [exercises, setExercises] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resolvedLevel = level || 'A1';
  const resolvedUnit = unit || 'unit-01-greetings';

  // Full key matches original useProgress structure e.g. "A1-unit-01-greetings"
  const unitKey = `${resolvedLevel}-${resolvedUnit}`;

  useEffect(() => {
    setLoading(true);
    setError(null);

    const base = `/Espanol-Course/content/${resolvedLevel}/${resolvedUnit}`;

    Promise.all([
      fetch(`${base}/exercises.json`).then((r) => {
        if (!r.ok) throw new Error(`exercises.json not found (${r.status})`);
        return r.json();
      }),
      fetch(`${base}/meta.json`).then((r) => {
        if (!r.ok) throw new Error(`meta.json not found (${r.status})`);
        return r.json();
      }),
    ])
      .then(([exData, metaData]) => {
        setExercises(exData);
        setMeta(metaData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [resolvedLevel, resolvedUnit]);

  const handleComplete = (score, total, xpEarned) => {
    completeExercises(unitKey, score, total, xpEarned);
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${resolvedLevel}/${resolvedUnit}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Loading exercises…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-4xl">😕</p>
        <h2 className="text-xl font-bold text-white">Couldn't load exercises</h2>
        <p className="text-slate-400 text-sm font-mono bg-slate-800 rounded-lg px-3 py-2">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          <button
            onClick={() => navigate(`/lesson/${resolvedLevel}/${resolvedUnit}`)}
            className="hover:text-slate-300 transition-colors"
          >
            {meta?.title || resolvedUnit}
          </button>
          <span>›</span>
          <span className="text-indigo-400">Exercises</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Practice</h1>
        <p className="text-slate-400 text-sm">
          Answer all {exercises.length} exercises to unlock the quiz. Wrong answers must be corrected before moving on.
        </p>
      </div>

      {/* Already completed notice */}
      {isExercisesComplete(unitKey) && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30">
          <span className="text-green-400">✓</span>
          <div>
            <p className="text-green-300 font-semibold text-sm">Exercises already completed</p>
            <p className="text-green-400/70 text-xs">Quiz is unlocked — you can retake these for practice</p>
          </div>
          <button
            onClick={handleStartQuiz}
            className="ml-auto px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-semibold hover:bg-green-500/30 transition-colors whitespace-nowrap"
          >
            Go to Quiz
          </button>
        </div>
      )}

      {/* Engine */}
      <ExerciseEngine
        exercises={exercises}
        level={resolvedLevel}
        unit={resolvedUnit}
        onComplete={handleComplete}
        onStartQuiz={handleStartQuiz}
      />
    </div>
  );
}

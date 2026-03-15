// src/components/exercises/ExerciseSummary.jsx
import { useNavigate } from 'react-router-dom';

export default function ExerciseSummary({ score, total, xpEarned, level, unit, onStartQuiz }) {
  const navigate = useNavigate();
  const pct = Math.round((score / total) * 100);

  const getMessage = () => {
    if (pct === 100) return { text: '¡Perfecto! Flawless run.', color: 'text-green-400' };
    if (pct >= 75) return { text: '¡Muy bien! Great work.', color: 'text-indigo-400' };
    if (pct >= 50) return { text: '¡Bien hecho! Keep it up.', color: 'text-amber-400' };
    return { text: 'Good effort — practice makes perfect.', color: 'text-slate-300' };
  };

  const msg = getMessage();

  return (
    <div className="flex flex-col items-center text-center space-y-8 py-6">
      {/* Score ring */}
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={pct === 100 ? '#10b981' : pct >= 75 ? '#6366f1' : '#f59e0b'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}/{total}</span>
          <span className="text-slate-400 text-xs font-medium">correct</span>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <p className={`text-xl font-bold ${msg.color}`}>{msg.text}</p>
        <p className="text-slate-400 text-sm">You answered {score} out of {total} correctly</p>
      </div>

      {/* XP badge */}
      <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
        <span className="text-2xl">⭐</span>
        <div className="text-left">
          <p className="text-amber-300 font-bold text-lg">+{xpEarned} XP</p>
          <p className="text-amber-400/70 text-xs">Exercises complete</p>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full space-y-3">
        <button
          onClick={onStartQuiz}
          className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-indigo-500/25 text-lg"
        >
          Start Quiz →
        </button>
        <button
          onClick={() => navigate(`/lesson/${level}/${unit}`)}
          className="w-full py-3 rounded-xl font-medium text-slate-300 bg-slate-700/50 border border-slate-600 hover:bg-slate-700 transition-colors"
        >
          Back to Lesson
        </button>
      </div>
    </div>
  );
}

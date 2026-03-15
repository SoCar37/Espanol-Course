import { useProgress } from '../hooks/useProgress'

const LEVEL_TOTALS = { A1: 10, A2: 12, B1: 12, B2: 12, C1: 10 }

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress()

  const totalUnitsComplete = Object.values(progress.units).filter(u => u?.complete).length
  const totalUnits = Object.values(LEVEL_TOTALS).reduce((a, b) => a + b, 0)
  const overallPercent = Math.round((totalUnitsComplete / totalUnits) * 100)

  function handleReset() {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold gradient-text mb-1">Your Progress</h1>
        <p className="text-content-secondary text-sm">
          Keep going — fluency is a journey, not a destination.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total XP',       value: progress.xp,            icon: '⭐' },
          { label: 'Day streak',     value: progress.streak,        icon: '🔥' },
          { label: 'Best streak',    value: progress.longestStreak, icon: '🏆' },
          { label: 'Units complete', value: totalUnitsComplete,     icon: '✅' },
        ].map(stat => (
          <div key={stat.label} className="card text-center p-4">
            <div className="text-2xl mb-1" aria-hidden="true">{stat.icon}</div>
            <div
              className="text-3xl font-bold gradient-text"
              aria-label={`${stat.label}: ${stat.value}`}
            >
              {stat.value}
            </div>
            <div className="text-content-secondary text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-content-primary">Overall course progress</h2>
          <span className="text-brand-primary font-bold">{overallPercent}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallPercent}%` }}
            role="progressbar"
            aria-valuenow={overallPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${overallPercent}% of course complete`}
          />
        </div>
        <p className="text-content-secondary text-xs mt-2">
          {totalUnitsComplete} of {totalUnits} units complete
        </p>
      </div>

      {/* Level breakdown */}
      <div className="card mb-6">
        <h2 className="font-semibold text-content-primary mb-4">Progress by level</h2>
        <div className="space-y-4">
          {Object.entries(LEVEL_TOTALS).map(([level, total]) => {
            const complete = Object.entries(progress.units)
              .filter(([key, val]) => key.startsWith(level) && val?.complete).length
            const pct = Math.round((complete / total) * 100)

            return (
              <div key={level}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-content-primary">{level}</span>
                  <span className="text-content-secondary">{complete}/{total} units</span>
                </div>
                <div className="progress-bar h-2">
                  <div
                    className="progress-fill"
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${level}: ${pct}% complete`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Version note */}
      <div className="card text-center mb-6">
        <p className="text-content-secondary text-sm">
          🔧 <strong className="text-content-primary">Cross-device sync coming in v2.0</strong> — 
          progress is currently saved locally in your browser. Create an account in a future version
          to sync across all your devices.
        </p>
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={handleReset}
          className="text-content-secondary text-sm hover:text-red-400 transition-colors underline"
          aria-label="Reset all progress — this cannot be undone"
        >
          Reset all progress
        </button>
      </div>

    </div>
  )
}

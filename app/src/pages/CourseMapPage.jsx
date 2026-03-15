import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

const COURSE_STRUCTURE = [
  {
    level: 'A1',
    title: 'Foundations',
    description: 'Pronunciation, greetings, numbers, colors, basic present tense',
    color: 'from-indigo-500 to-purple-500',
    units: [
      { id: 'unit-01', title: 'Greetings & Introductions', slug: 'greetings', status: 'available' },
      { id: 'unit-02', title: 'Numbers & Counting',        slug: 'numbers',   status: 'locked' },
      { id: 'unit-03', title: 'Colors & Descriptions',     slug: 'colors',    status: 'locked' },
      { id: 'unit-04', title: 'Days, Months & Time',       slug: 'time',      status: 'locked' },
      { id: 'unit-05', title: 'Family & People',           slug: 'family',    status: 'locked' },
      { id: 'unit-06', title: 'Food & Drink',              slug: 'food',      status: 'locked' },
      { id: 'unit-07', title: 'Places & Directions',       slug: 'places',    status: 'locked' },
      { id: 'unit-08', title: 'Daily Routines',            slug: 'routines',  status: 'locked' },
      { id: 'unit-09', title: 'Weather & Seasons',         slug: 'weather',   status: 'locked' },
      { id: 'unit-10', title: 'A1 Review & Checkpoint',    slug: 'review',    status: 'locked' },
    ],
  },
  {
    level: 'A2',
    title: 'Building Blocks',
    description: 'Past tenses, reflexive verbs, common expressions, everyday vocabulary',
    color: 'from-purple-500 to-pink-500',
    units: [],
    comingSoon: true,
  },
  {
    level: 'B1',
    title: 'Intermediate Fluency',
    description: 'Subjunctive intro, future & conditional, idioms, Latin American dialects',
    color: 'from-pink-500 to-rose-500',
    units: [],
    comingSoon: true,
  },
  {
    level: 'B2',
    title: 'Advanced Expression',
    description: 'Subjunctive mastery, complex grammar, cultural context, debate & persuasion',
    color: 'from-rose-500 to-orange-500',
    units: [],
    comingSoon: true,
  },
  {
    level: 'C1',
    title: 'Near-Native Proficiency',
    description: 'Nuanced writing, literature & media, regional variation, professional Spanish',
    color: 'from-orange-500 to-amber-500',
    units: [],
    comingSoon: true,
  },
]

export default function CourseMapPage() {
  const { getUnitProgress } = useProgress()

  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Your Spanish Journey
        </h1>
        <p className="text-content-secondary text-lg max-w-xl mx-auto">
          From complete beginner to near-native fluency — anchored in Mexican Spanish.
        </p>
      </div>

      {/* Level cards */}
      <div className="space-y-6">
        {COURSE_STRUCTURE.map((levelData) => {
          const isLocked = levelData.comingSoon
          return (
            <section
              key={levelData.level}
              aria-label={`${levelData.level} — ${levelData.title}`}
              className={`card ${isLocked ? 'opacity-50' : ''}`}
            >
              {/* Level header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`bg-gradient-to-r ${levelData.color} text-white font-bold text-sm px-4 py-1.5 rounded-full`}>
                    {levelData.level}
                  </span>
                  <div>
                    <h2 className="font-semibold text-lg text-content-primary">
                      {levelData.title}
                    </h2>
                    <p className="text-content-secondary text-sm">
                      {levelData.description}
                    </p>
                  </div>
                </div>
                {isLocked && (
                  <span className="text-content-secondary text-sm bg-surface-hover px-3 py-1 rounded-full">
                    Coming soon
                  </span>
                )}
              </div>

              {/* Unit grid */}
              {!isLocked && levelData.units.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {levelData.units.map((unit) => {
                    const progress = getUnitProgress(`${levelData.level}-${unit.id}`)
                    const isAvailable = unit.status === 'available'
                    const isComplete = progress?.complete

                    return (
                      <UnitCard
                        key={unit.id}
                        level={levelData.level}
                        unit={unit}
                        isAvailable={isAvailable}
                        isComplete={isComplete}
                        progress={progress}
                      />
                    )
                  })}
                </div>
              )}
            </section>
          )
        })}
      </div>

    </div>
  )
}

function UnitCard({ level, unit, isAvailable, isComplete, progress }) {
  const CardWrapper = isAvailable ? Link : 'div'
  const linkProps = isAvailable
    ? { to: `/lesson/${level.toLowerCase()}/${unit.id}` }
    : {}

  return (
    <CardWrapper
      {...linkProps}
      className={`
        group relative flex flex-col gap-2 p-4 rounded-xl border-2 transition-all duration-300
        ${isComplete
          ? 'bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-500/60'
          : isAvailable
            ? 'bg-surface-main border-white/10 hover:border-brand-primary hover:-translate-y-0.5 cursor-pointer'
            : 'bg-surface-main border-white/5 cursor-not-allowed'
        }
      `}
      aria-label={`${unit.title}${!isAvailable ? ' — locked' : ''}`}
    >
      {/* Status icon */}
      <span className="text-lg" aria-hidden="true">
        {isComplete ? '✅' : isAvailable ? '📖' : '🔒'}
      </span>

      {/* Title */}
      <span className={`text-sm font-medium leading-tight ${isAvailable ? 'text-content-primary' : 'text-content-secondary'}`}>
        {unit.title}
      </span>

      {/* Progress bar if in progress */}
      {progress?.percent > 0 && !isComplete && (
        <div className="progress-bar h-1.5">
          <div
            className="progress-fill"
            style={{ width: `${progress.percent}%` }}
            role="progressbar"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress.percent}% complete`}
          />
        </div>
      )}
    </CardWrapper>
  )
}

// src/pages/CourseMapPage.jsx
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

const COURSE_STRUCTURE = [
  {
    level: 'A1',
    title: 'Foundations',
    description: 'Pronunciation, greetings, numbers, colors, basic present tense',
    color: 'from-indigo-500 to-purple-500',
    units: [
      { id: 'unit-01-greetings', title: 'Greetings & Introductions' },
      { id: 'unit-02-numbers',   title: 'Numbers & Counting' },
      { id: 'unit-03-colors',    title: 'Colors & Descriptions' },
      { id: 'unit-04-time',      title: 'Days, Months & Time' },
      { id: 'unit-05-family',    title: 'Family & People' },
      { id: 'unit-06-food',      title: 'Food & Drink' },
      { id: 'unit-07-places',    title: 'Places & Directions' },
      { id: 'unit-08-routines',  title: 'Daily Routines' },
      { id: 'unit-09-weather',   title: 'Weather & Seasons' },
      { id: 'unit-10-review',    title: 'A1 Review & Checkpoint' },
    ],
  },
  {
    level: 'A2',
    title: 'Building Blocks',
    description: 'Past tenses, reflexive verbs, common expressions, everyday vocabulary',
    color: 'from-purple-500 to-pink-500',
    units: [
      { id: 'unit-01-present-tense',          title: 'Present Tense Review & Stem-Changers' },
      { id: 'unit-02-reflexive-verbs',         title: 'Reflexive Verbs & Daily Routines' },
      { id: 'unit-03-ser-estar',               title: 'Ser vs. Estar — Deep Dive' },
      { id: 'unit-04-preterite-regular',       title: 'Preterite Tense — Regular Verbs' },
      { id: 'unit-05-preterite-irregular',     title: 'Preterite Tense — Irregular Verbs' },
      { id: 'unit-06-imperfect',               title: 'The Imperfect Tense' },
      { id: 'unit-07-preterite-vs-imperfect',  title: 'Preterite vs. Imperfect' },
      { id: 'unit-08-object-pronouns',         title: 'Direct & Indirect Object Pronouns' },
      { id: 'unit-09-expressions',             title: 'Common Expressions & Idioms' },
      { id: 'unit-10-shopping',                title: 'Shopping & Money' },
      { id: 'unit-11-travel',                  title: 'Travel & Transportation' },
      { id: 'unit-12-review',                  title: 'A2 Review & Checkpoint' },
    ],
  },
  {
    level: 'B1',
    title: 'Intermediate Fluency',
    description: 'Subjunctive intro, future & conditional, idioms, Latin American dialects',
    color: 'from-pink-500 to-rose-500',
    units: [
      { id: 'unit-01-subjunctive-intro', title: 'Introduction to the Subjunctive' },
      { id: 'unit-02-future-tense',      title: 'The Future Tense' },
      { id: 'unit-03-conditional',       title: 'The Conditional Tense' },
      { id: 'unit-04-por-vs-para',       title: 'Por vs. Para' },
      { id: 'unit-05-relative-clauses',  title: 'Relative Clauses' },
      { id: 'unit-06-passive-voice',     title: 'Passive Voice & Se Constructions' },
      { id: 'unit-07-idiomatic-verbs',   title: 'Idiomatic Verbs' },
      { id: 'unit-08-opinion-debate',    title: 'Expressing Opinions & Debate' },
      { id: 'unit-09-formal-writing',    title: 'Formal Writing & Email' },
      { id: 'unit-10-mexican-culture',   title: 'Mexican Culture & Traditions' },
      { id: 'unit-11-regional-language', title: 'Regional Language & Slang' },
      { id: 'unit-12-review',            title: 'B1 Review & Checkpoint' },
    ],
  },
  {
    level: 'B2',
    title: 'Advanced Expression',
    description: 'Subjunctive mastery, complex grammar, cultural context, debate & persuasion',
    color: 'from-rose-500 to-orange-500',
    units: [
      { id: 'unit-01-subjunctive-past',     title: 'Past Subjunctive' },
      { id: 'unit-02-subjunctive-advanced', title: 'Advanced Subjunctive Uses' },
      { id: 'unit-03-if-clauses',           title: 'If-Clauses (Si Clauses)' },
      { id: 'unit-04-complex-sentences',    title: 'Complex Sentences & Connectors' },
      { id: 'unit-05-vocabulary-expansion', title: 'Vocabulary Expansion Strategies' },
      { id: 'unit-06-media-culture',        title: 'Mexican Media & Pop Culture' },
      { id: 'unit-07-argumentation',        title: 'Argumentation & Persuasion' },
      { id: 'unit-08-nuanced-expressions',  title: 'Nuanced Expressions & Register' },
      { id: 'unit-09-literature',           title: 'Mexican Literature & Poetry' },
      { id: 'unit-10-business-spanish',     title: 'Business Spanish' },
      { id: 'unit-11-social-issues',        title: 'Social Issues & Current Events' },
      { id: 'unit-12-review',               title: 'B2 Review & Checkpoint' },
    ],
  },
  {
    level: 'C1',
    title: 'Near-Native Proficiency',
    description: 'Nuanced writing, literature & media, regional variation, professional Spanish',
    color: 'from-orange-500 to-amber-500',
    units: [
      { id: 'unit-01-advanced-grammar',    title: 'Advanced Grammar Consolidation' },
      { id: 'unit-02-stylistics',          title: 'Stylistics & Written Register' },
      { id: 'unit-03-rhetoric',            title: 'Rhetoric & Advanced Argumentation' },
      { id: 'unit-04-mexican-history',     title: 'Mexican History & Politics' },
      { id: 'unit-05-literature-advanced', title: 'Advanced Literary Analysis' },
      { id: 'unit-06-media-analysis',      title: 'Media Analysis & Critical Reading' },
      { id: 'unit-07-professional-writing', title: 'Professional & Academic Writing' },
      { id: 'unit-08-translation',         title: 'Translation & Interpretation Skills' },
      { id: 'unit-09-regional-variation',  title: 'Regional Variation & Dialects' },
      { id: 'unit-10-review',              title: 'C1 Review & Final Checkpoint' },
    ],
  },
]

export default function CourseMapPage() {
  const { getUnitProgress, progress } = useProgress()

  return (
    <div className="animate-fade-in">

      {/* Placement test prompt — shown until placement is completed */}
      {!progress.placementComplete && (
        <div className="card mb-6 flex flex-col sm:flex-row items-center gap-4 border-indigo-500/30 bg-indigo-500/5">
          <div className="text-4xl shrink-0" aria-hidden="true">🎯</div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-bold text-content-primary mb-1">Not sure where to start?</h2>
            <p className="text-content-secondary text-sm">
              Take a 35-question placement test and jump straight to the right level.
              Skips the content you already know.
            </p>
          </div>
          <Link
            to="/placement"
            className="btn-primary shrink-0 px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
          >
            Take placement test →
          </Link>
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Your Spanish Journey</h1>
        <p className="text-content-secondary text-lg max-w-xl mx-auto">From complete beginner to near-native fluency — anchored in Mexican Spanish.</p>
      </div>
      <div className="space-y-6">
        {COURSE_STRUCTURE.map((levelData) => {
          return (
            <section key={levelData.level} aria-label={`${levelData.level} — ${levelData.title}`} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`bg-gradient-to-r ${levelData.color} text-white font-bold text-sm px-4 py-1.5 rounded-full`}>{levelData.level}</span>
                  <div>
                    <h2 className="font-semibold text-lg text-content-primary">{levelData.title}</h2>
                    <p className="text-content-secondary text-sm">{levelData.description}</p>
                  </div>
                </div>
              </div>
              {levelData.units.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {levelData.units.map((unit, index) => {
                    const unitKey = `${levelData.level}-${unit.id}`
                    const progress = getUnitProgress(unitKey)
                    const isComplete = !!progress?.complete

                    let isAvailable = false
                    if (levelData.level === 'A2' && index === 0) {
                      const lastA1Progress = getUnitProgress('A1-unit-10-review')
                      isAvailable = !!(lastA1Progress?.complete || lastA1Progress?.placementUnlocked)
                    } else if (levelData.level === 'B1' && index === 0) {
                      const lastA2Progress = getUnitProgress('A2-unit-12-review')
                      isAvailable = !!(lastA2Progress?.complete || lastA2Progress?.placementUnlocked)
                    } else if (levelData.level === 'B2' && index === 0) {
                      const lastB1Progress = getUnitProgress('B1-unit-12-review')
                      isAvailable = !!(lastB1Progress?.complete || lastB1Progress?.placementUnlocked)
                    } else if (levelData.level === 'C1' && index === 0) {
                      const lastB2Progress = getUnitProgress('B2-unit-12-review')
                      isAvailable = !!(lastB2Progress?.complete || lastB2Progress?.placementUnlocked)
                    } else if (index === 0) {
                      isAvailable = true
                    } else {
                      const prevUnit = levelData.units[index - 1]
                      const prevKey = `${levelData.level}-${prevUnit.id}`
                      const prevProgress = getUnitProgress(prevKey)
                      isAvailable = !!(prevProgress?.complete || prevProgress?.placementUnlocked)
                    }

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
  const linkProps = isAvailable ? { to: `/lesson/${level}/${unit.id}` } : {}
  return (
    <CardWrapper {...linkProps}
      className={`group relative flex flex-col gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${isComplete ? 'bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-500/60' : isAvailable ? 'bg-surface-main border-white/10 hover:border-brand-primary hover:-translate-y-0.5 cursor-pointer' : 'bg-surface-main border-white/5 cursor-not-allowed'}`}
      aria-label={`${unit.title}${!isAvailable ? ' — locked' : ''}`}>
      <span className="text-lg" aria-hidden="true">{isComplete ? '✅' : isAvailable ? '📖' : '🔒'}</span>
      <span className={`text-sm font-medium leading-tight ${isAvailable ? 'text-content-primary' : 'text-content-secondary'}`}>{unit.title}</span>
      {progress?.percent > 0 && !isComplete && (
        <div className="progress-bar h-1.5">
          <div className="progress-fill" style={{ width: `${progress.percent}%` }} role="progressbar" aria-valuenow={progress.percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress.percent}% complete`} />
        </div>
      )}
    </CardWrapper>
  )
}

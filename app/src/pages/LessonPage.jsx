import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useProgress } from '../hooks/useProgress'

export default function LessonPage() {
  const { level, unit } = useParams()
  const [lessonContent, setLessonContent] = useState('')
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { markLessonComplete, getUnitProgress } = useProgress()

  const unitKey = `${level?.toUpperCase()}-${unit}`
  const unitProgress = getUnitProgress(unitKey)

  useEffect(() => {
    async function loadLesson() {
      setLoading(true)
      setError(null)
      try {
        // Load lesson markdown
        const lessonRes = await fetch(
          `/Espanol-Course/content/${level?.toUpperCase()}/${unit}/lesson.md`
        )
        if (!lessonRes.ok) throw new Error('Lesson not found')
        const text = await lessonRes.text()
        setLessonContent(text)

        // Load meta
        const metaRes = await fetch(
          `/Espanol-Course/content/${level?.toUpperCase()}/${unit}/meta.json`
        )
        if (metaRes.ok) {
          const metaData = await metaRes.json()
          setMeta(metaData)
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    loadLesson()
  }, [level, unit])

  function handleLessonComplete() {
    markLessonComplete(unitKey)
  }

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} level={level} unit={unit} />

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-content-secondary">
          <li><Link to="/" className="hover:text-content-primary transition-colors">Course</Link></li>
          <li aria-hidden="true">›</li>
          <li><span className="text-brand-primary font-medium">{level?.toUpperCase()}</span></li>
          <li aria-hidden="true">›</li>
          <li className="text-content-primary">{meta?.title || unit}</li>
        </ol>
      </nav>

      {/* Lesson header */}
      {meta && (
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
              {meta.level} · Unit {meta.unit}
            </span>
            {meta.estimated_minutes && (
              <span className="text-content-secondary text-sm">
                ⏱ ~{meta.estimated_minutes} min
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">
            {meta.title}
          </h1>
        </header>
      )}

      {/* Lesson content */}
      <article
        className="prose-lesson"
        aria-label="Lesson content"
      >
        <ReactMarkdown
          components={{
            h2: ({children}) => (
              <h2 className="text-xl font-semibold text-content-primary mt-8 mb-3">{children}</h2>
            ),
            h3: ({children}) => (
              <h3 className="text-lg font-medium text-brand-primary mt-6 mb-2">{children}</h3>
            ),
            p: ({children}) => (
              <p className="text-content-secondary leading-relaxed mb-4">{children}</p>
            ),
            strong: ({children}) => (
              <strong className="text-content-primary font-semibold">{children}</strong>
            ),
            em: ({children}) => (
              <em className="text-brand-accent not-italic font-medium">{children}</em>
            ),
            blockquote: ({children}) => (
              <blockquote className="example-block">{children}</blockquote>
            ),
            ul: ({children}) => (
              <ul className="list-disc list-inside space-y-1 mb-4 text-content-secondary">{children}</ul>
            ),
            li: ({children}) => (
              <li className="leading-relaxed">{children}</li>
            ),
            table: ({children}) => (
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">{children}</table>
              </div>
            ),
            th: ({children}) => (
              <th className="text-left p-3 bg-surface-hover text-content-primary font-medium border-b border-white/10">{children}</th>
            ),
            td: ({children}) => (
              <td className="p-3 text-content-secondary border-b border-white/5">{children}</td>
            ),
          }}
        >
          {lessonContent}
        </ReactMarkdown>
      </article>

      {/* Lesson complete button */}
      <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="btn-secondary text-sm">
          ← Back to course map
        </Link>
        {!unitProgress?.lessonComplete ? (
          <button
            onClick={handleLessonComplete}
            className="btn-primary"
            aria-label="Mark lesson as complete and continue to exercises"
          >
            Complete lesson → Exercises
          </button>
        ) : (
          <Link
            to={`/exercises`}
            className="btn-primary"
            aria-label="Go to exercises"
          >
            Continue to exercises →
          </Link>
        )}
      </div>

    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-64" role="status" aria-live="polite">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-bounce" aria-hidden="true">📖</div>
        <p className="text-content-secondary">Loading lesson...</p>
      </div>
    </div>
  )
}

function ErrorState({ error, level, unit }) {
  return (
    <div className="max-w-lg mx-auto text-center py-16" role="alert">
      <div className="text-5xl mb-4" aria-hidden="true">🚧</div>
      <h1 className="text-xl font-semibold text-content-primary mb-2">
        Lesson coming soon
      </h1>
      <p className="text-content-secondary mb-6">
        This lesson is still being prepared. Check back soon!
      </p>
      <Link to="/" className="btn-primary">
        ← Back to course map
      </Link>
    </div>
  )
}

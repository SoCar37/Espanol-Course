// src/components/layout/Layout.jsx
import { NavLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/',           label: 'Course',     icon: '📚', ariaLabel: 'Course map' },
  { path: '/flashcards', label: 'Flashcards', icon: '🃏', ariaLabel: 'Flashcard drills' },
  { path: '/progress',   label: 'Progress',   icon: '📊', ariaLabel: 'Your progress' },
]

export default function Layout({ children }) {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-surface-main text-content-primary flex flex-col">

      {/* Top header — desktop */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🇲🇽</span>
          <span className="font-bold text-lg gradient-text">Espanol-Course</span>
          <span className="text-content-secondary text-sm ml-2">Mexican Spanish A1–C1</span>
        </div>

        {/* Desktop nav tabs */}
        <nav aria-label="Main navigation">
          <ul className="flex gap-2" role="list">
            {NAV_ITEMS.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  aria-label={item.ariaLabel}
                  className={({ isActive }) =>
                    `tab-pill flex items-center gap-2 ${isActive ? 'active' : ''}`
                  }
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-center px-4 py-3 border-b border-white/5">
        <span className="text-xl mr-2" aria-hidden="true">🇲🇽</span>
        <span className="font-bold gradient-text">Espanol-Course</span>
      </header>

      {/* Main content */}
      <main
        id="main-content"
        className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6"
        tabIndex="-1"
      >
        {children}
      </main>

      {/* Bottom tab bar — mobile only */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-card border-t border-white/5 safe-area-pb"
        aria-label="Mobile navigation"
      >
        <ul className="flex" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.path} className="flex-1">
              <NavLink
                to={item.path}
                end={item.path === '/'}
                aria-label={item.ariaLabel}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-2 text-xs transition-colors
                  ${isActive
                    ? 'text-brand-primary'
                    : 'text-content-secondary hover:text-content-primary'
                  }`
                }
              >
                <span className="text-xl mb-0.5" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom padding on mobile to clear the tab bar */}
      <div className="md:hidden h-16" aria-hidden="true" />

    </div>
  )
}

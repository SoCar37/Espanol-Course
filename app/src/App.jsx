import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import CourseMapPage from './pages/CourseMapPage'
import LessonPage from './pages/LessonPage'
import FlashcardsPage from './pages/FlashcardsPage'
import ExercisesPage from './pages/ExercisesPage'
import ProgressPage from './pages/ProgressPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CourseMapPage />} />
        <Route path="/lesson/:level/:unit" element={<LessonPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

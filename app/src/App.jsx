// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import CourseMapPage from './pages/CourseMapPage'
import LessonPage from './pages/LessonPage'
import FlashcardsPage from './pages/FlashcardsPage'
import ExercisesPage from './pages/ExercisesPage'
import QuizPage from './pages/QuizPage'
import ProgressPage from './pages/ProgressPage'
import PlacementTestPage from './pages/PlacementTestPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Course map — home */}
        <Route path="/" element={<CourseMapPage />} />

        {/* Placement test */}
        <Route path="/placement" element={<PlacementTestPage />} />

        {/* Lesson */}
        <Route path="/lesson/:level/:unit" element={<LessonPage />} />
        <Route path="/lesson" element={<Navigate to="/lesson/A1/unit-01-greetings" replace />} />

        {/* Exercises */}
        <Route path="/exercises/:level/:unit" element={<ExercisesPage />} />
        <Route path="/exercises" element={<Navigate to="/exercises/A1/unit-01-greetings" replace />} />

        {/* Quiz */}
        <Route path="/quiz/:level/:unit" element={<QuizPage />} />
        <Route path="/quiz" element={<Navigate to="/quiz/A1/unit-01-greetings" replace />} />

        {/* Flashcards */}
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/flashcards/:level/:unit" element={<FlashcardsPage />} />

        {/* Progress */}
        <Route path="/progress" element={<ProgressPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

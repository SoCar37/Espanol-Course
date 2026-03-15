// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CourseMapPage from './pages/CourseMapPage';
import LessonPage from './pages/LessonPage';
import FlashcardsPage from './pages/FlashcardsPage';
import ExercisesPage from './pages/ExercisesPage';
import ProgressPage from './pages/ProgressPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Course map — home */}
        <Route path="/" element={<CourseMapPage />} />

        {/* Lesson: /lesson/A1/unit-01-greetings */}
        <Route path="/lesson/:level/:unit" element={<LessonPage />} />
        {/* Legacy route without params — redirect to A1 Unit 1 */}
        <Route path="/lesson" element={<Navigate to="/lesson/A1/unit-01-greetings" replace />} />

        {/* Exercises: /exercises/A1/unit-01-greetings */}
        <Route path="/exercises/:level/:unit" element={<ExercisesPage />} />
        {/* Legacy route without params */}
        <Route path="/exercises" element={<Navigate to="/exercises/A1/unit-01-greetings" replace />} />

        {/* Quiz: /quiz/A1/unit-01-greetings (stub — will be built in v0.2.0 next) */}
        <Route path="/quiz/:level/:unit" element={<ExercisesPage />} />

        {/* Flashcards */}
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/flashcards/:level/:unit" element={<FlashcardsPage />} />

        {/* Progress */}
        <Route path="/progress" element={<ProgressPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

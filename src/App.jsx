import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { LearningProvider } from './context/LearningContext';
import { QuizProvider } from './context/QuizContext';
import LayoutWrapper from './components/Layout/LayoutWrapper';

// Pages
import Learning from './pages/Learning';
import Quiz from './pages/Quiz';
import Feedback from './pages/Feedback';
import QuizIntroPage from './pages/QuizIntroPage';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <Router>
      <LearningProvider>
        <QuizProvider>
          <Routes>
            {/* Redirect root to material */}
            <Route path="/" element={<Navigate to="/material" replace />} />

            {/* Material / Learning - LANDING PAGE */}
            <Route
              path="/material"
              element={
                <LayoutWrapper showBottomNav={false}>
                  <Learning />
                </LayoutWrapper>
              }
            />

            {/* Quiz Intro */}
            <Route
              path="/quiz-intro"
              element={
                <LayoutWrapper
                  showBottomNav={true}
                  prevLabel="Penerangan AI"
                  prevPath="/material"
                  nextLabel="Mulai Kuis"
                  nextPath="/loading"
                >
                  <QuizIntroPage />
                </LayoutWrapper>
              }
            />

            {/* Loading */}
            <Route
              path="/loading"
              element={
                <LayoutWrapper showBottomNav={false}>
                  <LoadingPage />
                </LayoutWrapper>
              }
            />

            {/* Quiz Running - NO LAYOUT WRAPPER */}
            <Route
              path="/quiz"
              element={<Quiz />}
            />

            {/* Feedback / Results - FULL PAGE */}
            <Route
              path="/results"
              element={<Feedback />}
            />
          </Routes>
        </QuizProvider>
      </LearningProvider>
    </Router>
  );
}

export default App;
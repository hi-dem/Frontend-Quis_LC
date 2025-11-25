import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { LearningProvider } from './context/LearningContext';
import { QuizProvider } from './context/QuizContext';
import LayoutWrapper from './components/Layout/LayoutWrapper';
import mockTopics from './data/mockTopics';

// Pages
import Learning from './pages/Learning';
import Quiz from './pages/Quiz';
import Feedback from './pages/Feedback';
import QuizIntroPage from './pages/QuizIntroPage';
import LoadingPage from './pages/LoadingPage';

function App() {
  const quiz = mockTopics[0]?.modules?.[0]?.submodules?.[0]?.quiz;

  return (
    <Router>
      <LearningProvider>
        <QuizProvider>
          <Routes>
            {/* Test: Results page dengan mock data */}
            <Route 
              path="/results-test" 
              element={<Feedback />}
            />

            {/* Redirect root to material */}
            <Route path="/" element={<Navigate to="/material" replace />} />

            {/* Material / Learning */}
            <Route
              path="/material"
              element={
                <LayoutWrapper 
                  showBottomNav={true}
                  prevLabel="Beranda"
                  prevPath="/"
                  nextLabel="Quiz Submodul"
                  nextPath="/quiz-intro"
                  nextState={{ quiz }}
                  requiresCompletion={true}
                >
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
                  nextState={{ quiz }}
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

            {/* Quiz Running */}
            <Route
              path="/quiz"
              element={
                <LayoutWrapper showBottomNav={false}>
                  <Quiz />
                </LayoutWrapper>
              }
            />

            {/* Results */}
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
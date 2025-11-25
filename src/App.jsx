import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { LearningProvider } from './context/LearningContext';
import { QuizProvider } from './context/QuizContext';
import LayoutWrapper from './components/Layout/LayoutWrapper';

// Pages
import Home from './pages/Home';
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
            {/* Home */}
            <Route
              path="/"
              element={
                <LayoutWrapper showBottomNav={false}>
                  <Home />
                </LayoutWrapper>
              }
            />

            {/* Material / Learning */}
            <Route
              path="/material"
              element={
                <LayoutWrapper
                  showBottomNav={true}
                  prevLabel="Beranda"
                  prevPath="/"
                  nextLabel="Quiz Submodul #1"
                  nextPath="/quiz-intro"
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

            {/* Feedback / Results - TANPA LayoutWrapper */}
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
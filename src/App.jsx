import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LayoutWrapper from './layouts/LayoutWrapper';
import HomeContent from './components/Content/HomeContent';
import MaterialContent from './components/Content/MaterialContent';
import QuizIntroContent from './components/Content/QuizIntroContent';
import LoadingContent from './components/Content/LoadingContent';
import QuizContent from './components/Content/QuizContent';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWrapper showBottomNav={false}>
              <HomeContent />
            </LayoutWrapper>
          }
        />
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
              <MaterialContent />
            </LayoutWrapper>
          }
        />
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
              <QuizIntroContent />
            </LayoutWrapper>
          }
        />
        <Route
          path="/loading"
          element={
            <LayoutWrapper showBottomNav={false}>
              <LoadingContent />
            </LayoutWrapper>
          }
        />
        <Route
          path="/quiz"
          element={
            <LayoutWrapper showBottomNav={false}>
              <QuizContent />
            </LayoutWrapper>
          }
        />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
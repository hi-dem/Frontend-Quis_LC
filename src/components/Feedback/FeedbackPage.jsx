import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, HomeIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import ScoreDisplay from './ScoreDisplay';
import AnswerReview from './AnswerReview';
import Button from '../Common/Button';
import bgPattern from '../../assets/bg-pattern.svg';

// Mock data untuk testing
const MOCK_STATE = {
  score: 3,
  totalQuestions: 3,
  answers: { 0: 'Mengaktifkan perangkat agar mulai memproses perintah pengguna', 1: '31%', 2: 'Dari 20% menjadi 50%' },
  quiz: {
    questions: [
      { 
        id: 1, 
        question: 'Q1', 
        correctAnswer: 'Mengaktifkan perangkat agar mulai memproses perintah pengguna',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
      },
      { 
        id: 2, 
        question: 'Q2', 
        correctAnswer: '31%',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
      },
      { 
        id: 3, 
        question: 'Q3', 
        correctAnswer: 'Dari 20% menjadi 50%',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
      }
    ]
  },
  startTime: new Date(Date.now() - 30000).toISOString()
};

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [durationText, setDurationText] = useState('0m 0s');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Use mock data jika location. state kosong (untuk testing /results-test)
  const state = location.state || (window.location.pathname === '/results-test' ? MOCK_STATE : {});
  const { score = 0, totalQuestions = 0, answers = {}, quiz = null, startTime = null } = state;

  console.log('FeedbackPage location state:', state);
  console.log('Extracted values:', { score, totalQuestions, quizExists: !!quiz, startTime });

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem('quizProgress', JSON.stringify({
      lastCompleted: 'submodule_1',
      score: score,
      timestamp: new Date().toISOString()
    }));

    if (startTime) {
      const endTime = new Date();
      const duration = Math.floor((endTime - new Date(startTime)) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      setDurationText(`${minutes}m ${seconds}s`);
    }
  }, [startTime, score]);

  const hasQuizData = quiz && Array.isArray(quiz.questions) && quiz.questions.length > 0;
  const isValidScore = typeof score === 'number' && score >= 0;

  console.log('Validation check:', {
    isValidScore,
    totalQuestions,
    hasQuizData,
    quizQuestionsLength: quiz?.questions?.length
  });

  if (!isValidScore || totalQuestions === 0 || !hasQuizData) {
    console.log('ERROR: Invalid data - showing error page');
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 relative overflow-hidden">
        <div
          className="fixed inset-0 pointer-events-none opacity-15"
          style={{ backgroundImage: `url(${bgPattern})`, backgroundSize: 'cover' }}
        />
        <div className="relative z-10 text-center max-w-md">
          <div className="bg-white p-12 rounded-2xl shadow-xl">
            <XCircleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Data Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-2">Debug Info:</p>
            <p className="text-gray-600 text-sm mb-8">
              Score: {score} | Total: {totalQuestions} | Quiz: {quiz ?  'OK' : 'NULL'}
            </p>
            <Button onClick={() => navigate('/')} variant="primary" className="w-full">
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = score >= Math.ceil(totalQuestions * 0.6);

  const handleRetakeQuiz = () => {
    navigate('/quiz-intro', { state: { quiz } });
  };

  console.log('SUCCESS: Rendering results page', { score, totalQuestions, percentage, passed });

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8 pb-12">
        <ScoreDisplay
          score={score}
          totalQuestions={totalQuestions}
          percentage={percentage}
          passed={passed}
          durationText={durationText}
        />

        {hasQuizData && (
          <AnswerReview
            quiz={quiz}
            answers={answers}
            expandedQuestion={expandedQuestion}
            onToggleExpand={setExpandedQuestion}
          />
        )}

        <div className="flex gap-4 justify-center pt-8 border-t border-gray-200">
          <Button
            onClick={handleRetakeQuiz}
            variant="primary"
            className="px-8 py-3 text-lg flex items-center gap-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Ulangi Kuis
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            className="px-8 py-3 text-lg flex items-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
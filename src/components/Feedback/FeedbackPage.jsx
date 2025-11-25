import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, HomeIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import ScoreDisplay from './ScoreDisplay';
import AnswerReview from './AnswerReview';
import Button from '../Common/Button';
import bgPattern from '../../assets/bg-pattern.svg';

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [durationText, setDurationText] = useState('0m 0s');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const state = location.state || {};
  const { score = 0, totalQuestions = 0, answers = {}, quiz = null, startTime = null } = state;

  console.log('FeedbackPage rendered');
  console.log('Full location state:', state);
  console.log('Extracted values:', { score, totalQuestions, quizExists: !!quiz, startTime });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (startTime) {
      const endTime = new Date();
      const duration = Math.floor((endTime - new Date(startTime)) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      setDurationText(`${minutes}m ${seconds}s`);
    }
  }, [startTime]);

  const isValidData = typeof score === 'number' && totalQuestions > 0 && quiz && quiz.questions;

  console.log('Data validation:', { scoreIsNumber: typeof score === 'number', totalQuestionsGreaterThanZero: totalQuestions > 0, quizExists: !!quiz, questionsExist: quiz ? !!quiz.questions : false, isValidData });

  if (!isValidData) {
    console.log('Invalid data showing error page');
    const questionCount = quiz && quiz.questions ? quiz.questions. length : 0;
    return (
      <div className="h-screen flex flex-col bg-white relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none opacity-15" style={{ backgroundImage: `url(${bgPattern})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="bg-white p-12 rounded-2xl shadow-xl">
              <XCircleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-3">Data Tidak Ditemukan</h1>
              <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-sm text-red-700">
                <p className="font-semibold mb-2">Debug Info:</p>
                <p>Score: {score} (type: {typeof score})</p>
                <p>Total: {totalQuestions}</p>
                <p>Quiz: {quiz ? 'ada' : 'tidak ada'}</p>
                <p>Questions: {questionCount}</p>
              </div>
              <p className="text-gray-600 mb-8 text-lg">Silakan mulai kuis terlebih dahulu</p>
              <Button onClick={() => navigate('/')} variant="primary" className="px-8 py-3">
                Kembali ke Beranda
              </Button>
            </div>
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

  console.log('Rendering feedback page with:', { score, percentage, passed });

  return (
    <div className="space-y-8 pb-12">
      <ScoreDisplay score={score} totalQuestions={totalQuestions} percentage={percentage} passed={passed} durationText={durationText} />
      {quiz && quiz.questions && quiz.questions.length > 0 && (
        <AnswerReview quiz={quiz} answers={answers} expandedQuestion={expandedQuestion} onToggleExpand={setExpandedQuestion} />
      )}
      <div className="flex gap-4 justify-center pt-8 border-t border-gray-200">
        <Button onClick={handleRetakeQuiz} variant="primary" className="px-8 py-3 text-lg flex items-center gap-2">
          <ArrowPathIcon className="w-5 h-5" />
          Ulangi Kuis
        </Button>
        <Button onClick={() => navigate('/')} variant="secondary" className="px-8 py-3 text-lg flex items-center gap-2">
          <HomeIcon className="w-5 h-5" />
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
};

export default FeedbackPage;
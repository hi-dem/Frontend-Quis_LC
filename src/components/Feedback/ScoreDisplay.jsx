import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ClockIcon, HomeIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import ScoreDisplay from './ScoreDisplay';
import AnswerReview from './AnswerReview';
import Button from '../Common/Button';
import bgPattern from '../../assets/bg-pattern.svg';

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, answers, quiz, startTime } = location.state || {};
  const [durationText, setDurationText] = useState('0m 0s');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

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

  if (score === undefined || score === null) {
    return (
      <div className="h-screen flex flex-col bg-white relative">
        <div
          className="fixed inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `url(${bgPattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white p-12 rounded-2xl shadow-xl">
              <XCircleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-3">Data Tidak Ditemukan</h1>
              <p className="text-gray-600 mb-8 text-lg">Silakan mulai kuis terlebih dahulu</p>
              <Button onClick={() => navigate('/quiz')} variant="primary" className="px-8 py-3">
                Kembali ke Kuis
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = score >= Math.ceil(totalQuestions * 0.6); // 60% pass

  const handleRetakeQuiz = () => {
    navigate('/quiz-intro', { state: { quiz } });
  };

  return (
    <div className="space-y-8">
      {/* Score Display */}
      <ScoreDisplay
        score={score}
        totalQuestions={totalQuestions}
        percentage={percentage}
        passed={passed}
        durationText={durationText}
      />

      {/* Answer Review */}
      <AnswerReview
        quiz={quiz}
        answers={answers}
        expandedQuestion={expandedQuestion}
        onToggleExpand={setExpandedQuestion}
      />

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
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
  );
};

export default FeedbackPage;
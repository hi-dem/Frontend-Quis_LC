import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipboardDocumentCheckIcon, ClockIcon } from '@heroicons/react/24/solid';
import Button from '../components/Common/Button';

const QuizIntroPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz } = location.state || {};

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Quiz data tidak ditemukan</p>
        <Button onClick={() => navigate('/')} variant="primary">
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  const handleStartQuiz = () => {
    navigate('/loading', { state: { quiz } });
  };

  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-500 rounded-3xl p-12 text-white shadow-2xl border-4 border-blue-700">
      
      {/* Window Chrome Effect */}
      <div className="flex gap-3 mb-6">
        <div className="w-4 h-4 rounded-full bg-red-500"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
      </div>

      {/* Quiz Intro Content */}
      <div className="text-center space-y-6">
        {/* Badge */}
        <div className="inline-block bg-white bg-opacity-30 px-6 py-2 rounded-full">
          <p className="text-sm font-semibold">Quiz Submodul</p>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold">LearnCheck!</h1>

        {/* Subtitle */}
        <p className="text-lg italic text-blue-100">
          "Let's have some fun and test your understanding!"
        </p>

        {/* Quiz Info Card */}
        <div className="bg-white text-gray-900 rounded-2xl p-8 mt-8 space-y-6">
          
          {/* Quiz Title */}
          <h2 className="text-2xl font-bold text-center">
            {quiz.title}
          </h2>

          {/* Info Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-600" />
              <div className="text-center">
                <p className="text-gray-600 font-medium">Jumlah Soal</p>
                <p className="text-2xl font-bold text-gray-900">{quiz.totalQuestions} Soal</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <ClockIcon className="w-6 h-6 text-blue-600" />
              <div className="text-center">
                <p className="text-gray-600 font-medium">Durasi</p>
                <p className="text-2xl font-bold text-gray-900">{quiz. durationPerQuestion} detik/soal</p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStartQuiz}
            variant="primary"
            className="w-full py-4 text-lg font-bold rounded-full"
          >
            Mulai Kuis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizIntroPage;
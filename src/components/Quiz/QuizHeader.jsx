import React from 'react';
import { ClockIcon, UserIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';

const QuizHeader = ({ 
  currentQuestion, 
  totalQuestions, 
  timeRemaining,
  isWarning,
  userId,
  tutorialId
}) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardDocumentCheckIcon className="w-6 h-6" />
            Kuis LearnCheck
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Pertanyaan {currentQuestion} dari {totalQuestions}
          </p>
          {userId && (
            <p className="text-blue-100 text-xs mt-1 flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              User: <span className="font-semibold">{userId}</span> | Tutorial: <span className="font-semibold">{tutorialId}</span>
            </p>
          )}
        </div>
        
        <div className={`text-center p-3 rounded-lg ${isWarning ? 'bg-red-500/30' : 'bg-white/20'}`}>
          <p className="text-xs text-blue-100">Waktu Tersisa</p>
          <p className={`text-2xl font-bold flex items-center justify-center gap-2 ${isWarning ? 'text-red-300 animate-pulse' : 'text-white'}`}>
            <ClockIcon className="w-5 h-5" />
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${isWarning ? 'bg-red-400' : 'bg-green-400'}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <p className="text-right text-xs text-blue-100 mt-2">
        {Math.round(progressPercentage)}% Selesai
      </p>
    </div>
  );
};

export default QuizHeader;
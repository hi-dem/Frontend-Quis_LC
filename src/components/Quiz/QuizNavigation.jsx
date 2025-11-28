import React from 'react';
import Button from '../Common/Button';

const QuizNavigation = ({
  onPrevious,
  onNext,
  onSubmit,
  currentQuestion,
  totalQuestions,
  canGoBack,
  canGoForward,
  selectedAnswer,
  showFeedback,
  isTimeUp
}) => {
  const isLastQuestion = currentQuestion === totalQuestions;
  const canSubmit = isLastQuestion && (showFeedback || isTimeUp);

  return (
    <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200">
      <div className="flex gap-2">
        {/* <button
          onClick={onPrevious}
          disabled={!canGoBack}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            !canGoBack
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          ‹ Sebelumnya
        </button> */}
        
          <button
            onClick={onNext}
            disabled={!canGoForward}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              !canGoForward
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Berikutnya ›
          </button>

        {canSubmit && (
          <button
            onClick={onSubmit}
            className="px-6 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Selesai & Lihat Hasil
          </button>
        )}
      </div>

    </div>
  );
};

export default QuizNavigation;
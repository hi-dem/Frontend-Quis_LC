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
  isTimeUp = false
}) => {
  return (
    <div className="mt-10 flex gap-4 justify-between items-center">
      <Button
        onClick={onPrevious}
        variant="secondary"
        disabled={!canGoBack}
        className={`px-6 py-3 ${!canGoBack ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        · Sebelumnya
      </Button>

      <div className="text-center">
        <p className="text-gray-600 font-semibold">
          Soal {currentQuestion} dari {totalQuestions}
        </p>
      </div>

      {currentQuestion === totalQuestions ? (
        <Button
          onClick={onSubmit}
          variant="success"
          disabled={!showFeedback}
          className={`px-6 py-3 ${!showFeedback ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Selesai & Review
        </Button>
      ) : (
        <Button
          onClick={onNext}
          variant="primary"
          disabled={!canGoForward}
          className={`px-6 py-3 ${!canGoForward ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Selanjutnya ·
        </Button>
      )}
    </div>
  );
};

export default QuizNavigation;
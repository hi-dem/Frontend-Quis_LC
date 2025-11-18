import React from 'react';

const AnswerOptions = ({ 
  options, 
  selectedAnswer, 
  correctAnswer, 
  showFeedback, 
  onSelectAnswer,
  disabled = false // BARU: Add disabled prop
}) => {
  return (
    <div className="mt-8 space-y-3">
      {options.map((option, idx) => {
        const isSelected = selectedAnswer === option;
        const isCorrect = option === correctAnswer;
        
        return (
          <button
            key={idx}
            onClick={() => !disabled && onSelectAnswer(option)} // UPDATED: Check disabled
            disabled={disabled || (showFeedback && !isSelected)} // UPDATED: Disable jika waktu habis atau sudah jawab
            className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
              disabled
                ? 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-300'
                : isSelected && showFeedback
                ? isCorrect
                  ? 'bg-green-100 border-green-500 text-green-900'
                  : 'bg-red-100 border-red-500 text-red-900'
                : isCorrect && showFeedback
                ? 'bg-green-100 border-green-500 text-green-900'
                : isSelected
                ? 'bg-blue-100 border-blue-500 text-blue-900'
                : 'bg-white border-gray-300 hover:border-blue-400 text-gray-900'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
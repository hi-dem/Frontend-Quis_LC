import React from 'react';

const AnswerOption = ({ 
  option, 
  isSelected, 
  isCorrect, 
  showFeedback, 
  isCorrectAnswer,
  onClick, 
  disabled 
}) => {
  let borderColor = 'border-2 border-gray-200';
  let bgColor = 'bg-white';
  let icon = '○';
  let hoverStyle = 'hover:bg-gray-50';

  if (isSelected && showFeedback) {
    if (isCorrect) {
      borderColor = 'border-2 border-green-500';
      bgColor = 'bg-green-50';
      icon = '✓';
      hoverStyle = '';
    } else {
      borderColor = 'border-2 border-red-500';
      bgColor = 'bg-red-50';
      icon = '✗';
      hoverStyle = '';
    }
  } else if (isSelected && !showFeedback) {
    borderColor = 'border-2 border-blue-500';
    bgColor = 'bg-blue-50';
    icon = '●';
    hoverStyle = '';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || (showFeedback && !isSelected)}
      className={`w-full p-5 text-left rounded-xl transition-all ${bgColor} ${borderColor} ${hoverStyle} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold">{icon}</span>
        <p className="font-semibold text-base">{option}</p>
      </div>
    </button>
  );
};

export default AnswerOption;
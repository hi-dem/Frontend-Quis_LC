import React from 'react';
import AnswerOption from './AnswerOption';

const AnswerOptions = ({ options, selectedAnswer, correctAnswer, showFeedback, onSelectAnswer }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span className="text-2xl">✓</span>
        Pilih Jawaban yang Paling Benar:
      </h3>
      <div className="space-y-4">
        {options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            isSelected={selectedAnswer === option}
            isCorrect={showFeedback && option === correctAnswer}
            isWrong={showFeedback && selectedAnswer === option && option !== correctAnswer}
            onClick={() => onSelectAnswer(option)}
            disabled={showFeedback}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerOptions;
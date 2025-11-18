import React from 'react';

const QuestionDisplay = ({ question, questionNumber, totalQuestions }) => {
  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
          Pertanyaan {questionNumber}/{totalQuestions}
        </span>
        <span className="text-3xl">❓</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 leading-relaxed">
        {question}
      </h2>
    </div>
  );
};

export default QuestionDisplay;
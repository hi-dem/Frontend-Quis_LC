import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

const QuestionDisplay = ({ question, questionNumber, totalQuestions }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
          Pertanyaan {questionNumber}/{totalQuestions}
        </div>
        <QuestionMarkCircleIcon className="w-6 h-6 text-blue-500" />
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
        {question}
      </h2>
    </div>
  );
};

export default QuestionDisplay;
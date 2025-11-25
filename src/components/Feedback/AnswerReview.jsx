import React from 'react';
import { CheckCircleIcon, XCircleIcon, ChevronDownIcon, ChevronRightIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import Card from '../Common/Card';

const AnswerReview = ({ quiz, answers, expandedQuestion, onToggleExpand }) => {
  if (!quiz || !quiz.questions) {
    return null;
  }

  return (
    <Card title={<span className="flex items-center gap-2"><ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />Detail Jawaban</span>}>
      <div className="space-y-4">
        {quiz. questions.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          const isExpanded = expandedQuestion === index;

          return (
            <div
              key={index}
              className={`rounded-xl border-l-4 overflow-hidden ${
                isCorrect
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              {/* Question Header */}
              <div
                className="p-5 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onToggleExpand(isExpanded ?  null : index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      <XCircleIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">
                      Q{index + 1}: {question.question}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    {isExpanded ?  (
                      <ChevronDownIcon className="w-5 h-5" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-current border-opacity-10 p-5 space-y-4">
                  {/* All Options */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Semua Pilihan Jawaban:
                    </p>
                    <div className="space-y-2">
                      {question.answers.map((option, optIdx) => {
                        const isUserAnswer = userAnswer === option;
                        const isCorrectOption = option === question.correctAnswer;

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded border-l-4 ${
                              isCorrectOption
                                ? 'bg-green-100 border-green-500 text-green-900'
                                : isUserAnswer && !isCorrect
                                  ? 'bg-red-100 border-red-500 text-red-900'
                                  : 'bg-gray-100 border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isCorrectOption ? (
                                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                              ) : isUserAnswer ?  (
                                <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0" />
                              )}
                              <p className="text-sm font-semibold flex-1">{option}</p>
                              {isCorrectOption && (
                                <span className="ml-auto text-xs font-bold">BENAR</span>
                              )}
                              {isUserAnswer && !isCorrect && (
                                <span className="ml-auto text-xs font-bold">JAWABAN ANDA</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback & Explanation */}
                  <div className={`p-4 rounded-lg border-l-4 ${
                    isCorrect
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                  }`}>
                    <p className={`font-bold text-base mb-2 flex items-center gap-2 ${
                      isCorrect ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {isCorrect ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : (
                        <XCircleIcon className="w-5 h-5" />
                      )}
                      {isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah!'}
                    </p>
                    <p className={`text-sm leading-relaxed font-medium ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {question.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AnswerReview;
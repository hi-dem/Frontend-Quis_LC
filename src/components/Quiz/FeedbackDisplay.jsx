import React from 'react';

const FeedbackDisplay = ({ 
  isCorrect, 
  explanation,
  isTimeUp 
}) => {
  if (isTimeUp) {
    return (
      <div className="mt-8 p-6 rounded-xl border-l-4 bg-orange-50 border-orange-500">
        <p className="text-orange-700 font-semibold">
          ⏰ Waktu habis untuk soal ini.  Anda dapat melanjutkan ke soal berikutnya. 
        </p>
      </div>
    );
  }

  if (!isCorrect && !explanation) return null;

  return (
    <div className={`mt-8 p-6 rounded-xl border-l-4 ${
      isCorrect 
        ? 'bg-green-50 border-green-500' 
        : 'bg-red-50 border-red-500'
    }`}>
      <p className={`font-bold text-lg mb-2 flex items-center gap-2 ${
        isCorrect ? 'text-green-700' : 'text-red-700'
      }`}>
        <span>{isCorrect ? '✓' : '✗'}</span>
        {isCorrect ?  'Jawaban Benar!' : 'Jawaban Salah!'}
      </p>
      <p className={`text-base leading-relaxed ${
        isCorrect ? 'text-green-800' : 'text-red-800'
      }`}>
        {explanation}
      </p>
    </div>
  );
};

export default FeedbackDisplay;
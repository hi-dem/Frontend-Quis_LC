import React from 'react';

const FeedbackOverlay = ({ isCorrect, message, explanation, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-slideUp">
        <div className={`p-6 text-white font-bold text-xl flex items-center gap-3 ${
          isCorrect 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
            : 'bg-gradient-to-r from-red-500 to-rose-500'
        }`}>
          <span className="text-2xl">{isCorrect ? '✓' : '✗'}</span>
          {message}
        </div>

        {explanation && (
          <div className="p-6" style={{
            borderTop: `4px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
            backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2'
          }}>
            <p className={`font-semibold mb-3 text-lg ${
              isCorrect ? 'text-green-900' : 'text-red-900'
            }`}>
              {isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah!'}
            </p>
            <p className={`text-base leading-relaxed ${
              isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {explanation}
            </p>
          </div>
        )}

        <div className="p-6 bg-white border-t">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors text-lg"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
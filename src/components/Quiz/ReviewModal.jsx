import React from 'react';
import Button from '../Common/Button';

const ReviewModal = ({ isOpen, onClose, onConfirm, answers, totalQuestions }) => {
  if (!isOpen) return null;

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-slideUp">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-2xl">📋</span>
            Review Jawaban
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-base mb-4">
            Anda telah menjawab <span className="font-bold text-blue-600">{answeredCount}</span> dari <span className="font-bold text-gray-900">{totalQuestions}</span> pertanyaan.
          </p>

          {allAnswered ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-700 font-semibold flex items-center gap-2">
                <span>✓</span> Semua pertanyaan sudah dijawab!
              </p>
            </div>
          ) : (
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
              <p className="text-orange-700 font-semibold flex items-center gap-2">
                <span>⚠️</span> Ada {totalQuestions - answeredCount} pertanyaan yang belum dijawab.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Kembali
          </Button>
          <Button 
            onClick={onConfirm}
            variant="success"
            className="flex-1"
          >
            Konfirmasi & Selesai
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
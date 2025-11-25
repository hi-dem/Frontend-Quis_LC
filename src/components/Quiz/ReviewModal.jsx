import React from 'react';
import Button from '../Common/Button';

const ReviewModal = ({
  isOpen,
  onClose,
  onConfirm,
  answers,
  totalQuestions
}) => {
  if (!isOpen) return null;

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Jawaban</h2>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Soal terjawab:</span>
            <span className="font-semibold text-green-600">{answeredCount}/{totalQuestions}</span>
          </div>
          {unansweredCount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Soal belum dijawab:</span>
              <span className="font-semibold text-red-600">{unansweredCount}</span>
            </div>
          )}
        </div>

        {unansweredCount > 0 && (
          <p className="text-sm text-orange-700 bg-orange-50 p-3 rounded mb-6">
            ⚠️ Ada {unansweredCount} soal yang belum dijawab. Lanjutkan?
          </p>
        )}

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Kembali
          </Button>
          <Button
            onClick={onConfirm}
            variant="primary"
            className="flex-1"
          >
            Selesai
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
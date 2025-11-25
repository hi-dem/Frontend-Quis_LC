import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button';

const ContentReader = ({ containerRef, submodule, isCompleted }) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (submodule.quiz) {
      navigate('/quiz-intro', {
        state: {
          submodule,
          quiz: submodule.quiz
        }
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto pr-4"
    >
      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-blue-600 pb-4 border-b-2 border-blue-200">
          {submodule. title}
        </h1>

        <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
          {submodule.content?. sections?.map((section, idx) => (
            <div key={idx}>
              {section.type === 'text' && (
                <p className="text-base leading-relaxed">{section. content}</p>
              )}
              {section.type === 'diagram' && (
                <div className="my-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex justify-center">
                  <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                    <div className="absolute w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg z-10">
                      AI
                    </div>
                    <div className="relative w-full h-full">
                      {/* AI Diagram - Simplified */}
                      <div className="absolute top-4 right-8 text-center">
                        <div className="text-2xl mb-1">🎮</div>
                        <p className="text-xs font-bold text-gray-600">Game</p>
                      </div>
                      <div className="absolute top-16 right-4 text-center">
                        <div className="text-2xl mb-1">🏥</div>
                        <p className="text-xs font-bold text-gray-600">Kesehatan</p>
                      </div>
                      <div className="absolute bottom-16 right-4 text-center">
                        <div className="text-2xl mb-1">🚗</div>
                        <p className="text-xs font-bold text-gray-600">Transportasi</p>
                      </div>
                      <div className="absolute bottom-4 right-8 text-center">
                        <div className="text-2xl mb-1">🌾</div>
                        <p className="text-xs font-bold text-gray-600">Pertanian</p>
                      </div>
                      <div className="absolute bottom-4 left-8 text-center">
                        <div className="text-2xl mb-1">🛒</div>
                        <p className="text-xs font-bold text-gray-600">Toko Online</p>
                      </div>
                      <div className="absolute bottom-16 left-4 text-center">
                        <div className="text-2xl mb-1">🎬</div>
                        <p className="text-xs font-bold text-gray-600">Hiburan</p>
                      </div>
                      <div className="absolute top-16 left-4 text-center">
                        <div className="text-2xl mb-1">🤖</div>
                        <p className="text-xs font-bold text-gray-600">Robotika</p>
                      </div>
                      <div className="absolute top-4 left-8 text-center">
                        <div className="text-2xl mb-1">🚙</div>
                        <p className="text-xs font-bold text-gray-600">Otomotif</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Button - Unlock setelah scroll selesai */}
      {isCompleted && submodule.quiz && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-800 mb-3">✓ Materi Selesai!</h3>
          <p className="text-green-700 mb-4">Kamu sudah menyelesaikan membaca materi. Yuk lanjut ke quiz untuk menguji pemahamanmu!</p>
          <Button
            onClick={handleStartQuiz}
            variant="success"
            className="w-full"
          >
            Mulai Quiz Submodul →
          </Button>
        </div>
      )}

      {!isCompleted && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-700 text-sm">📖 Silakan baca materi hingga selesai untuk membuka quiz</p>
        </div>
      )}
    </div>
  );
};

export default ContentReader;
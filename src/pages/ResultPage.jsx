import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import bgPattern from '../assets/bg-pattern.svg';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, answers, quiz, startTime, tutorialId, userId } = location.state || {};
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [durationText, setDurationText] = useState('0m 0s');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (startTime) {
      const endTime = new Date();
      const duration = Math.floor((endTime - new Date(startTime)) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      setDurationText(`${minutes}m ${seconds}s`);
    }
  }, [startTime]);

  if (!score && score !== 0) {
    return (
      <div className="h-screen flex flex-col bg-white relative">
        <div 
          className="fixed inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `url(${bgPattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white p-12 rounded-2xl shadow-xl">
              <p className="text-6xl mb-4">⚠️</p>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">Data Tidak Ditemukan</h1>
              <p className="text-gray-600 mb-8 text-lg">Silakan mulai kuis terlebih dahulu</p>
              <Button onClick={() => navigate('/quiz')} variant="primary" className="px-8 py-3">
                Kembali ke Kuis
              </Button>
            </div>
          </div>
        </div>

        {/* FOOTER - SELALU DI BAWAH */}
        <div className="relative z-10 bg-gray-900 text-gray-400 py-6 text-center mt-auto">
          <p className="text-sm">© 2024 LearnCheck. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 70;

  const handleRetakeQuiz = () => {
    const params = new URLSearchParams();
    if (tutorialId) params.append('tutorial_id', tutorialId);
    if (userId) params.append('user_id', userId);
    navigate(`/quiz?${params.toString()}`);
  };

  return (
    <div className="flex flex-col bg-white relative">
      <div 
        className="fixed inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      <div className="relative z-10 flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Hasil Kuis Anda</h1>
            
            <div className="flex justify-center mb-8">
              <div className={`w-48 h-48 rounded-full flex items-center justify-center shadow-lg ${
                percentage === 0
                  ? 'bg-gradient-to-br from-red-100 to-pink-100'
                  : passed 
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100' 
                  : 'bg-gradient-to-br from-yellow-100 to-orange-100'
              }`}>
                <div className="text-center">
                  <p className={`text-6xl font-bold ${
                    percentage === 0
                      ? 'text-red-600'
                      : passed ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {percentage}%
                  </p>
                  <p className="text-gray-600 text-lg mt-2">Nilai Anda</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className={`text-3xl font-bold mb-3 flex items-center justify-center gap-2 ${
                percentage === 0
                  ? 'text-red-600'
                  : passed ? 'text-green-600' : 'text-orange-600'
              }`}>
                {percentage === 0 
                  ? '✗ Tidak Ada Jawaban Benar'
                  : passed ? '✓ Anda Lulus' : '⚠️ Anda Belum Lulus'}
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Skor: <span className="font-bold text-blue-600">{score}</span> dari <span className="font-bold">{totalQuestions}</span>
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {percentage === 0
                  ? '💔 Semua jawaban salah. Pelajari materi lebih dalam dan coba lagi!'
                  : passed 
                  ? '🎉 Selamat! Anda telah menguasai materi dengan baik.' 
                  : '💪 Jangan menyerah! Coba kembali untuk meningkatkan pemahaman Anda.'}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded inline-block">
                <p className="text-blue-700 font-semibold">
                  ⏱️ Durasi Mengerjakan: <span className="font-bold text-lg text-blue-600">{durationText}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">📋</span>
              Detail Jawaban
            </h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quiz && quiz.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const isExpanded = expandedQuestion === index;
                
                return (
                  <div key={index} className={`p-5 rounded-xl border-l-4 cursor-pointer transition-all ${
                    isCorrect 
                      ? 'bg-green-50 border-green-500 hover:shadow-md' 
                      : 'bg-red-50 border-red-500 hover:shadow-md'
                  }`} onClick={() => setExpandedQuestion(isExpanded ? null : index)}>
                    
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`text-2xl flex-shrink-0 ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">
                          Q{index + 1}: {question.question}
                        </p>
                      </div>
                      <span className="text-gray-400 text-xl">
                        {isExpanded ? '▼' : '▶'}
                      </span>
                    </div>

                    {!isExpanded && (
                      <div className="ml-10 space-y-1">
                        <p className="text-gray-700">
                          <span className="font-semibold">Jawaban Anda:</span>
                          <span className={`font-bold ml-2 ${
                            isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {userAnswer || '(Tidak dijawab)'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-gray-700">
                            <span className="font-semibold">Jawaban Benar:</span>
                            <span className="text-green-600 font-bold ml-2">
                              {question.correctAnswer}
                            </span>
                          </p>
                        )}
                      </div>
                    )}

                    {isExpanded && (
                      <div className="ml-10 space-y-3">
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
                                  <span className="font-bold">
                                    {isCorrectOption ? '✓' : isUserAnswer ? '✗' : '○'}
                                  </span>
                                  <p className="text-sm font-semibold flex-1">{option}</p>
                                  {isCorrectOption && <span className="ml-auto text-xs font-bold">BENAR</span>}
                                  {isUserAnswer && !isCorrect && <span className="ml-auto text-xs font-bold">JAWABAN ANDA</span>}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-center mb-8">
            <Button 
              onClick={handleRetakeQuiz} 
              variant="primary"
              className="px-8 py-3 text-lg"
            >
              🔄 Ulangi Kuis
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="secondary"
              className="px-8 py-3 text-lg"
            >
              🏠 Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-gray-900 text-gray-400 py-6 text-center">
        <p className="text-sm">© 2024 LearnCheck. Semua hak cipta dilindungi.</p>
      </div>
    </div>
  );
};

export default ResultPage;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ClockIcon, HomeIcon, ArrowPathIcon, ClipboardDocumentCheckIcon, ExclamationTriangleIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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
              <ExclamationTriangleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-3">Data Tidak Ditemukan</h1>
              <p className="text-gray-600 mb-8 text-lg">Silakan mulai kuis terlebih dahulu</p>
              <Button onClick={() => navigate('/quiz')} variant="primary" className="px-8 py-3">
                Kembali ke Kuis
              </Button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 bg-gray-900 text-gray-400 py-6 text-center mt-auto">
          <p className="text-sm">© 2024 LearnCheck. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = score >= 2; // CHANGED: Cukup 2 dari 3 benar untuk lulus

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
          {/* HASIL SECTION */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Hasil Kuis Anda</h1>
            
            {/* SCORE CIRCLE */}
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

            {/* STATUS & SCORE */}
            <div className="text-center mb-8">
              <div className={`text-3xl font-bold mb-3 flex items-center justify-center gap-3 ${
                percentage === 0
                  ? 'text-red-600'
                  : passed ? 'text-green-600' : 'text-orange-600'
              }`}>
                {percentage === 0 
                  ? <XCircleIcon className="w-8 h-8" />
                  : passed ? <CheckCircleIcon className="w-8 h-8" /> : <ExclamationTriangleIcon className="w-8 h-8" />}
                <span>
                  {percentage === 0 
                    ? 'Tidak Ada Jawaban Benar'
                    : passed ? 'Anda Lulus' : 'Anda Belum Lulus'}
                </span>
              </div>

              <p className="text-gray-700 text-lg mb-4">
                Skor: <span className="font-bold text-blue-600">{score}</span> dari <span className="font-bold">{totalQuestions}</span>
              </p>

              <div className="text-gray-600 text-base leading-relaxed mb-6 flex items-start justify-center gap-3">
                <div className="pt-1">
                  {percentage === 0
                    ? <HeartIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                    : <SparklesIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
                </div>
                <p>
                  {percentage === 0
                    ? 'Semua jawaban salah. Pelajari materi lebih dalam dan coba lagi!'
                    : passed 
                    ? 'Selamat! Anda telah menguasai materi dengan baik.' 
                    : 'Jangan menyerah! Coba kembali untuk meningkatkan pemahaman Anda.'}
                </p>
              </div>

              {/* DURATION */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded inline-block">
                <p className="text-blue-700 font-semibold flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  Durasi Mengerjakan: <span className="font-bold text-lg text-blue-600">{durationText}</span>
                </p>
              </div>
            </div>
          </div>

          {/* DETAIL JAWABAN SECTION */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
              Detail Jawaban
            </h2>
            
            <div className="space-y-4">
              {quiz && quiz.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const isExpanded = expandedQuestion === index;
                
                return (
                  <div key={index} className={`rounded-xl border-l-4 overflow-hidden ${
                    isCorrect 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-red-50 border-red-500'
                  }`}>
                    
                    {/* QUESTION HEADER - CLICKABLE */}
                    <div 
                      className="p-5 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setExpandedQuestion(isExpanded ? null : index)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 ${
                          isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isCorrect ? <CheckCircleIcon className="w-6 h-6" /> : <XCircleIcon className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-lg">
                            Q{index + 1}: {question.question}
                          </p>
                        </div>
                        <div className="text-gray-400">
                          {isExpanded ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>

                    {/* EXPANDED CONTENT */}
                    {isExpanded && (
                      <div className="border-t border-current border-opacity-10 p-5 space-y-4">
                        
                        {/* ALL OPTIONS - LANGSUNG TANPA SUMMARY */}
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-3">
                            Semua Pilihan Jawaban:
                          </p>
                          
                          <div className="space-y-2 mb-4">
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
                                    ) : isUserAnswer ? (
                                      <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    ) : (
                                      <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0"></div>
                                    )}
                                    <p className="text-sm font-semibold flex-1">{option}</p>
                                    {isCorrectOption && <span className="ml-auto text-xs font-bold">BENAR</span>}
                                    {isUserAnswer && !isCorrect && <span className="ml-auto text-xs font-bold">JAWABAN ANDA</span>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* EXPLANATION FEEDBACK BOX */}
                        <div className={`p-4 rounded-lg border-l-4 ${
                          isCorrect
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                        }`}>
                          <p className={`font-bold text-base mb-2 flex items-center gap-2 ${
                            isCorrect ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {isCorrect ? <CheckCircleIcon className="w-5 h-5" /> : <XCircleIcon className="w-5 h-5" />}
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
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 justify-center mb-8">
            <Button 
              onClick={handleRetakeQuiz} 
              variant="primary"
              className="px-8 py-3 text-lg flex items-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Ulangi Kuis
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="secondary"
              className="px-8 py-3 text-lg flex items-center gap-2"
            >
              <HomeIcon className="w-5 h-5" />
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 bg-gray-900 text-gray-400 py-6 text-center">
        <p className="text-sm">© 2024 LearnCheck. Semua hak cipta dilindungi.</p>
      </div>
    </div>
  );
};

export default ResultPage;
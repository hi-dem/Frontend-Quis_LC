import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/quiz', { state: { quiz } });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, quiz]);

  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-500 rounded-3xl p-12 text-white shadow-2xl border-4 border-blue-700">
      
      {/* Window Chrome Effect */}
      <div className="flex gap-3 mb-6">
        <div className="w-4 h-4 rounded-full bg-red-500"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
      </div>

      {/* Loading Content */}
      <div className="text-center space-y-8 py-12">
        
        {/* Hourglass Icon */}
        <div className="flex justify-center">
          <div className="text-7xl animate-bounce">
            ⏳
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Tunggu sebentar!</h2>
          <p className="text-xl text-blue-100">
            Kami sedang mempersiapkan soal untuk Anda... 
          </p>
        </div>

        {/* Loading Animation Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0. 4s' }}></div>
        </div>

        {/* Progress Text */}
        <p className="text-sm text-blue-100 italic">
          Generating soal dengan AI... Jangan ditutup halaman ini!
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
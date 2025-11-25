import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeContent = () => {
  const navigate = useNavigate();

  const handleStartBelajar = () => {
    navigate('/material'); // Navigasi ke material page
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12 px-8 rounded-xl shadow-md">
        <div className="text-center">
          <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-4">
            <p className="text-sm font-semibold">Quiz Submodul</p>
          </div>
          <h1 className="text-5xl font-bold mb-3">LearnCheck!</h1>
          <p className="text-lg italic text-blue-100">"Let's have some fun and test your understanding!"</p>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Penerangan AI dalam Dunia Nyata
        </h2>
        <p className="text-gray-700 text-base leading-relaxed mb-8">
          Pelajari bagaimana AI mengubah cara kita bekerja, belajar, dan hidup setiap hari.
        </p>

        {/* Quiz Card Intro */}
        <div className="bg-white rounded-xl border-l-4 border-blue-500 shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Penerangan AI dalam Dunia Nyata
          </h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="text-blue-600">📋</div>
              <div>
                <p className="text-gray-600 font-medium">Jumlah Soal:</p>
                <p className="text-gray-900 font-bold">3 Soal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-blue-600">⏱️</div>
              <div>
                <p className="text-gray-600 font-medium">Durasi:</p>
                <p className="text-gray-900 font-bold">30 detik/soal</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartBelajar}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Mulai Belajar →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
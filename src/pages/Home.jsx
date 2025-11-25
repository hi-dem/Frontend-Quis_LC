import React, { useState } from 'react';
import QuizCard from '../components/Quiz/QuizCard';

const Home = () => {
  const [selectedModule, setSelectedModule] = useState({
    title: 'Penerangan AI dalam Dunia Nyata',
    totalQuestions: 3,
    durationPerQuestion: 30,
  });

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
          {selectedModule?. title || 'Penerangan AI dalam Dunia Nyata'}
        </h2>
        <p className="text-gray-700 text-base leading-relaxed mb-8">
          Pelajari bagaimana AI mengubah cara kita bekerja, belajar, dan hidup setiap hari.
        </p>

        {/* Quiz Card */}
        <QuizCard quiz={selectedModule} />
      </div>
    </div>
  );
};

export default Home;
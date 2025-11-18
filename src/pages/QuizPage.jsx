import React from 'react';
import QuizContainer from '../components/Quiz/QuizContainer';
import bgPattern from '../assets/bg-pattern.svg';

const QuizPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <QuizContainer />
      </div>
    </div>
  );
};

export default QuizPage;
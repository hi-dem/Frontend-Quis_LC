import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizeClass = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  }[size];

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClass} border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;
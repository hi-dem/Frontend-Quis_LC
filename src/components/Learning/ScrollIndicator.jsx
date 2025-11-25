import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const ScrollIndicator = ({ progress }) => {
  if (progress > 20) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="text-center">
        <p className="text-xs text-gray-600 mb-1">Scroll untuk melanjutkan</p>
        <ChevronDownIcon className="w-5 h-5 text-gray-400 mx-auto" />
      </div>
    </div>
  );
};

export default ScrollIndicator;
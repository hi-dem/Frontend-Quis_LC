import React from 'react';

const BottomBar = ({ prevLabel, nextLabel, onPrev, onNext }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center px-8"
      style={{
        height: 56,
        backgroundColor: '#06111C',
        borderTop: '1px solid #142233'
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        {prevLabel ?  (
          <button
            onClick={onPrev}
            className="group flex items-center gap-1 text-sm font-medium text-[#c9d1d9] hover:text-blue-400 transition-colors"
          >
            <span className="inline-block group-hover:-translate-x-0.5 transition-transform">‹</span>
            <span>{prevLabel}</span>
          </button>
        ) : (
          <span />
        )}

        {nextLabel ? (
          <button
            onClick={onNext}
            className="group flex items-center gap-1 text-sm font-medium text-[#c9d1d9] hover:text-blue-400 transition-colors"
          >
            <span>{nextLabel}</span>
            <span className="inline-block group-hover:translate-x-0.5 transition-transform">›</span>
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};

export default BottomBar;
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Header from '../Common/Header';
import Sidebar from './Sidebar';
import BottomBar from './BottomBar';
import bgPattern from '../../assets/bg-pattern.svg';

const LayoutWrapper = ({
  children,
  showBottomNav = true,
  prevLabel = '',
  nextLabel = '',
  prevPath = '',
  nextPath = '',
  onPrevClick,
  onNextClick
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handlePrev = () => {
    if (prevPath) window.location.href = prevPath;
    else if (onPrevClick) onPrevClick();
  };

  const handleNext = () => {
    if (nextPath) window. location.href = nextPath;
    else if (onNextClick) onNextClick();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Header */}
      <Header />

      {/* Content Row */}
      <div className="flex flex-1 w-full">
        {/* Main Content */}
        <main className="flex-1 px-6 md:px-8 lg:px-10 pt-8 pb-24 max-w-5xl mx-auto">
          {children}
        </main>

        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block relative">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-[80px] right-5 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition"
        aria-label="Toggle Sidebar Mobile"
      >
        {sidebarOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
      </button>

      {/* Mobile Sidebar Sheet */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50 flex items-end">
          <div className="w-full bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Sidebar content on mobile */}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomBar
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default LayoutWrapper;
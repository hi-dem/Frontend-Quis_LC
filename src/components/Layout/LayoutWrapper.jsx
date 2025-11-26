import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  prevState = null,
  nextState = null,
  requiresCompletion = false,
  onPrevClick,
  onNextClick
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen untuk completion event dari SubmoduleContent
    const handleCompletion = (e) => {
      setIsCompleted(e.detail.isCompleted);
      console.log('Material completion event:', e.detail. isCompleted);
    };
    
    window.addEventListener('material-completed', handleCompletion);
    return () => window.removeEventListener('material-completed', handleCompletion);
  }, []);

  const handlePrev = () => {
    if (prevPath) {
      navigate(prevPath, prevState ?  { state: prevState } : {});
    } else if (onPrevClick) {
      onPrevClick();
    }
  };

  const handleNext = () => {
    if (requiresCompletion && !isCompleted) {
      console.log('⚠️ Selesaikan materi terlebih dahulu');
      return;
    }
    
    if (nextPath) {
      navigate(nextPath, nextState ? { state: nextState } : {});
    } else if (onNextClick) {
      onNextClick();
    }
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
      <div className='fixed w-full z-20'>
              <Header />

      </div>

      {/* Content Row */}
      <div className="flex flex-1 w-full">
        {/* Main Content */}
        <main className={`flex-1 max-w-7xl mx-auto pl-8 pt-28 pb-24 lg:pb-32 w-full ${sidebarOpen ? 'lg:pr-[340px]' : 'lg:pr-[100px] '}`}>
          {React.cloneElement(children, {
            onCompletion: (completed) => setIsCompleted(completed)
          })}
        </main>

        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block fixed right-0 top-16 h-full">
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
          nextDisabled={requiresCompletion && !isCompleted}
        />
      )}
    </div>
  );
};

export default LayoutWrapper;
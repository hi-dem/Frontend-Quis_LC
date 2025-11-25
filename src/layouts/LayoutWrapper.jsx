import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Common/Header';
import ModuleList from '../components/Common/ModuleList';
import bgPattern from '../assets/bg-pattern.svg';

const HEADER_HEIGHT = 64;      // match Header sticky height
const BOTTOM_BAR_HEIGHT = 56;  // height bottom nav

const LayoutWrapper = ({
  children,
  onModuleSelect,
  showBottomNav = true,
  prevLabel = '',
  nextLabel = '',
  prevPath = '',
  nextPath = '',
  onPrevClick,
  onNextClick
}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const goPrev = () => {
    if (prevPath) navigate(prevPath); else if (onPrevClick) onPrevClick();
  };
  const goNext = () => {
    if (nextPath) navigate(nextPath); else if (onNextClick) onNextClick();
  };

  const handleModuleSelect = (submodule) => {
    if (onModuleSelect) onModuleSelect(submodule);
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

      {/* Sticky Header */}
      <Header />

      {/* Content Row */}
      <div className="flex flex-1 w-full">
        {/* Main Area (body scroll only) */}
        <main
          className="flex-1 px-6 md:px-8 lg:px-10 pt-8 pb-20 max-w-5xl"
          style={{ margin: '0 auto' }}
        >
          {children}
        </main>

        {/* Sidebar (desktop) */}
        <div className="hidden lg:block relative">
          {/* Expand button when closed */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="absolute top-6 -left-6 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition"
                aria-label="Buka Sidebar"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            )}

          {sidebarOpen && (
            <aside
              className="sticky top-[64px] bg-white border-l border-gray-200 shadow-sm rounded-l-xl flex flex-col"
              style={{
                height: `calc(100vh - ${HEADER_HEIGHT}px - ${showBottomNav ? BOTTOM_BAR_HEIGHT : 0}px)`,
                width: '320px'
              }}
            >
              {/* Collapse button */}
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow transition"
                  aria-label="Tutup Sidebar"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-6">
                <ModuleList onSelectModule={handleModuleSelect} />
              </div>
            </aside>
          )}
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
            <ModuleList onSelectModule={handleModuleSelect} />
          </div>
        </div>
      )}

      {/* Bottom Navigation (Fixed) */}
      {showBottomNav && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 flex items-center px-8"
          style={{
            height: BOTTOM_BAR_HEIGHT,
            backgroundColor: '#06111C',        // Sesuaikan dengan Figma
            borderTop: '1px solid #142233'
          }}
        >
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
            {prevLabel ? (
              <button
                onClick={goPrev}
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
                onClick={goNext}
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
      )}
    </div>
  );
};

export default LayoutWrapper;
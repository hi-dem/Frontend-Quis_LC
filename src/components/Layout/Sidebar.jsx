import React from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import ModuleList from '../Navigation/ModuleList';

const Sidebar = ({ isOpen, onToggle }) => {
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="absolute top-6 -left-6 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition"
        aria-label="Buka Sidebar"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <aside
      className="bg-white border-l border-gray-200 shadow-sm rounded-l-xl flex flex-col"
      style={{
        height: 'calc(100vh - 64px - 56px)',
        width: '320px'
      }}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={onToggle}
          className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow transition"
          aria-label="Tutup Sidebar"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-6">
        <ModuleList />
      </div>
    </aside>
  );
};

export default Sidebar;
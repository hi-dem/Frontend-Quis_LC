import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const ModuleList = ({ onSelectModule }) => {
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState({ 1: true });
  const [expandedSubmodules, setExpandedSubmodules] = useState({ 1.1: true });

  // Data struktur: MODUL → SUB-MODUL → QUIZ ITEM
  const modules = [
    {
      id: 1,
      name: 'Berkenalan dengan AI',
      icon: '🤖',
      isLocked: false,
      submodules: [
        {
          id: 1.1,
          name: 'Penerangan AI dalam Dunia Nyata',
          icon: '🌍',
          isLocked: false,
          isActive: true,
          quiz: {
            id: 'quiz-1',
            title: 'Penerangan AI dalam Dunia Nyata',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
        {
          id: 1.2,
          name: 'Pengenalan AI',
          icon: '🧠',
          isLocked: true,
          quiz: {
            id: 'quiz-2',
            title: 'Pengenalan AI',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
        {
          id: 1.3,
          name: 'Taksonomi AI',
          icon: '📊',
          isLocked: true,
          quiz: {
            id: 'quiz-3',
            title: 'Taksonomi AI',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
        {
          id: 1.4,
          name: 'AI Workflow',
          icon: '⚙️',
          isLocked: true,
          quiz: {
            id: 'quiz-4',
            title: 'AI Workflow',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
        {
          id: 1.5,
          name: '[Story] Belajar Mempermudah Pekerjaan dengan AI',
          icon: '📖',
          isLocked: true,
          quiz: {
            id: 'quiz-5',
            title: '[Story] Belajar Mempermudah Pekerjaan dengan AI',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
      ],
    },
    {
      id: 2,
      name: 'Data untuk AI',
      icon: '📊',
      isLocked: true,
      submodules: [
        {
          id: 2.1,
          name: 'Pengenalan Data',
          icon: '📈',
          isLocked: true,
          quiz: {
            id: 'quiz-6',
            title: 'Pengenalan Data',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
        {
          id: 2.2,
          name: 'Kriteria Data untuk AI',
          icon: '✅',
          isLocked: true,
          quiz: {
            id: 'quiz-7',
            title: 'Kriteria Data untuk AI',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
        {
          id: 2.3,
          name: 'Infrastruktur Data di Industri',
          icon: '🏢',
          isLocked: true,
          quiz: {
            id: 'quiz-8',
            title: 'Infrastruktur Data di Industri',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
        {
          id: 2.4,
          name: '[Story] Apa yang Diperlukan untuk Membuat AI?',
          icon: '📖',
          isLocked: true,
          quiz: {
            id: 'quiz-9',
            title: '[Story] Apa yang Diperlukan untuk Membuat AI?',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
        {
          id: 2.5,
          name: 'Tipe-Tipe Machine Learning',
          icon: '🤖',
          isLocked: true,
          quiz: {
            id: 'quiz-10',
            title: 'Tipe-Tipe Machine Learning',
            totalQuestions: 3,
            durationPerQuestion: 30,
          },
        },
      ],
    },
  ];

  // Toggle expand MODUL
  const toggleModuleExpand = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Toggle expand SUB-MODUL
  const toggleSubmoduleExpand = (submoduleId) => {
    setExpandedSubmodules(prev => ({
      ...prev,
      [submoduleId]: !prev[submoduleId],
    }));
  };

  // Handle Submodule Click - Navigate ke Material
  const handleSubmoduleClick = (submodule) => {
    if (!submodule.isLocked) {
      navigate('/material', { 
        state: { 
          submodule: submodule,
          quiz: submodule.quiz
        } 
      });
    }
  };

  // Render QUIZ ITEM
  const renderQuizItem = (submodule) => {
    const quizNumber = Math.floor(submodule.id * 10) % 10 || 1;

    return (
      <div
        key={`quiz-${submodule.id}`}
        onClick={() => {
          if (!submodule.isLocked && submodule.quiz) {
            navigate('/quiz-intro', { 
              state: { 
                submodule: submodule,
                quiz: submodule.quiz 
              } 
            });
          }
        }}
        className={`py-2 px-3 ml-12 rounded cursor-pointer transition-all border-l-4 flex items-center justify-between ${
          submodule.isActive
            ? 'bg-blue-50 border-blue-500'
            : 'border-transparent hover:bg-gray-50'
        } ${submodule.isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg animate-spin">🔄</span>
          <p
            className={`text-sm leading-snug truncate ${
              submodule.isActive
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700'
            }`}
          >
            Quiz Submodul #{quizNumber}
          </p>
        </div>
      </div>
    );
  };

  // Render SUB-MODUL
  const renderSubmodule = (submodule) => {
    const isSubmoduleExpanded = expandedSubmodules[submodule.id];

    return (
      <div key={submodule.id}>
        {/* SUBMODUL HEADER - CLICKABLE untuk navigate ke material */}
        <div
          onClick={() => {
            toggleSubmoduleExpand(submodule.id);
            // Juga navigate ke material saat click
            handleSubmoduleClick(submodule);
          }}
          className={`py-2 px-3 ml-6 rounded cursor-pointer transition-all border-l-4 flex items-center justify-between ${
            submodule.isActive
              ? 'bg-blue-50 border-blue-500'
              : 'border-transparent hover:bg-gray-50'
          } ${submodule.isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span
              className={`transition-transform duration-200 ${
                isSubmoduleExpanded ? 'rotate-90' : ''
              }`}
            >
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </span>
            <span className="text-lg">{submodule.icon}</span>
            <p
              className={`text-sm leading-snug truncate ${
                submodule.isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700'
              }`}
            >
              {submodule.isActive && '✓ '}
              {submodule.name}
            </p>
          </div>

          <div className="ml-2 flex-shrink-0">
            {submodule.isLocked && <span className="text-sm">🔒</span>}
            {!submodule.isLocked && submodule.isActive && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </div>
        </div>

        {/* QUIZ ITEM - Muncul ketika submodul di-expand */}
        {isSubmoduleExpanded && renderQuizItem(submodule)}
      </div>
    );
  };

  // Render MODUL
  const renderModule = (module) => {
    const isModuleExpanded = expandedModules[module.id];

    return (
      <div key={module.id} className="mb-2">
        {/* MODUL HEADER */}
        <div
          onClick={() => toggleModuleExpand(module.id)}
          className={`py-2 px-3 rounded cursor-pointer transition-all border-l-4 flex items-center justify-between ${
            module.isLocked
              ? 'opacity-60 border-gray-300'
              : 'border-transparent hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2 flex-1">
            <span
              className={`transition-transform duration-200 ${
                isModuleExpanded ? 'rotate-90' : ''
              }`}
            >
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </span>
            <span className="text-lg">{module.icon}</span>
            <p
              className={`text-sm font-semibold ${
                module.isLocked ? 'text-gray-500' : 'text-gray-900'
              }`}
            >
              {module.name}
            </p>
          </div>
        </div>

        {/* SUB-MODUL LIST */}
        {isModuleExpanded && module.submodules.length > 0 && (
          <div className="border-l border-gray-200 ml-2">
            {module.submodules.map(submodule => renderSubmodule(submodule))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit sticky top-20">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold text-lg">›</span>
          <h3 className="text-lg font-bold text-gray-900">Daftar Submodul</h3>
        </div>
      </div>

      {/* Module List */}
      <div className="p-3 max-h-96 overflow-y-auto space-y-2">
        {modules.map(module => renderModule(module))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer">
        <p className="text-sm font-semibold text-blue-600">Pelajari Lebih Lanjut</p>
        <span className="text-blue-600 font-bold">›</span>
      </div>
    </div>
  );
};

export default ModuleList;
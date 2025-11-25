import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import mockTopics from '../../data/mockTopics';

const ModuleList = ({ onSelectModule }) => {
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState({ 1: true });
  const [expandedSubmodules, setExpandedSubmodules] = useState({ '1. 1': true });

  const topic = mockTopics[0];

  const toggleModuleExpand = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const toggleSubmoduleExpand = (submoduleId) => {
    setExpandedSubmodules(prev => ({
      ...prev,
      [submoduleId]: ! prev[submoduleId],
    }));
  };

  const handleSubmoduleClick = (submodule) => {
    if (!submodule.isLocked) {
      navigate('/material', {
        state: {
          submodule,
          quiz: submodule.quiz
        }
      });
    }
  };

  const handleQuizClick = (submodule) => {
    if (!submodule.isLocked) {
      navigate('/quiz-intro', {
        state: {
          submodule,
          quiz: submodule.quiz
        }
      });
    }
  };

  const renderQuizItem = (submodule, quizNumber) => (
    <div
      key={`quiz-${submodule.id}`}
      onClick={() => handleQuizClick(submodule)}
      className={`py-2 px-3 ml-12 rounded cursor-pointer transition-all border-l-4 flex items-center justify-between ${
        submodule.isLocked ? 'opacity-60 cursor-not-allowed' : 'border-transparent hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-lg">📝</span>
        <p className="text-sm leading-snug truncate text-gray-700">
          Quiz Submodul #{quizNumber}
        </p>
      </div>
    </div>
  );

  const renderSubmodule = (submodule, index) => {
    const isSubmoduleExpanded = expandedSubmodules[submodule.id];
    const quizNumber = index + 1;

    return (
      <div key={submodule.id}>
        <div
          onClick={() => {
            toggleSubmoduleExpand(submodule.id);
            handleSubmoduleClick(submodule);
          }}
          className={`py-2 px-3 ml-6 rounded cursor-pointer transition-all border-l-4 flex items-center justify-between ${
            submodule.isLocked ?  'opacity-60 cursor-not-allowed' : 'border-transparent hover:bg-gray-50'
          }`}
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
            <p className="text-sm leading-snug truncate text-gray-700">
              {submodule. title}
            </p>
          </div>
          {submodule.isLocked && <span className="text-sm ml-2">🔒</span>}
        </div>

        {isSubmoduleExpanded && renderQuizItem(submodule, quizNumber)}
      </div>
    );
  };

  const renderModule = (module) => {
    const isModuleExpanded = expandedModules[module.id];

    return (
      <div key={module.id} className="mb-2">
        <div
          onClick={() => toggleModuleExpand(module.id)}
          className="py-2 px-3 rounded cursor-pointer transition-all border-l-4 flex items-center justify-between border-transparent hover:bg-gray-50"
        >
          <div className="flex items-center gap-2 flex-1">
            <span
              className={`transition-transform duration-200 ${
                isModuleExpanded ? 'rotate-90' : ''
              }`}
            >
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </span>
            <span className="text-lg">📚</span>
            <p className="text-sm font-semibold text-gray-900">
              {module.title}
            </p>
          </div>
        </div>

        {isModuleExpanded && module.submodules. length > 0 && (
          <div className="border-l border-gray-200 ml-2">
            {module.submodules.map((sub, idx) => renderSubmodule(sub, idx))}
          </div>
        )}
      </div>
    );
  };

  if (!topic || !topic.modules) {
    return <div className="p-4 text-gray-500">Tidak ada modul tersedia</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit sticky top-20">
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold text-lg">›</span>
          <h3 className="text-lg font-bold text-gray-900">Daftar Modul</h3>
        </div>
      </div>

      <div className="p-3 max-h-96 overflow-y-auto space-y-2">
        {topic.modules.map(module => renderModule(module))}
      </div>

      <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer">
        <p className="text-sm font-semibold text-blue-600">Pelajari Lebih Lanjut</p>
        <span className="text-blue-600 font-bold">›</span>
      </div>
    </div>
  );
};

export default ModuleList;
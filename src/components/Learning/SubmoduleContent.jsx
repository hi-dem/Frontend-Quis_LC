import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useLearning } from '../../hooks/useLearning';
import ContentReader from './ContentReader';
import ProgressBar from './ProgressBar';
import ScrollIndicator from './ScrollIndicator';

const SubmoduleContent = () => {
  const location = useLocation();
  const { updateSubmoduleProgress } = useLearning();
  const { progress, isCompleted, containerRef } = useScrollProgress(95);

  const { submodule } = location.state || {};

  useEffect(() => {
    if (submodule) {
      updateSubmoduleProgress(submodule. id, progress);
    }
  }, [progress, submodule, updateSubmoduleProgress]);

  if (!submodule) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Submodul tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        Belajar / Modul / {submodule.title}
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} isCompleted={isCompleted} />

      {/* Content */}
      <ContentReader 
        containerRef={containerRef}
        submodule={submodule}
        isCompleted={isCompleted}
      />

      {/* Scroll Indicator */}
      <ScrollIndicator progress={progress} />
    </div>
  );
};

export default SubmoduleContent;
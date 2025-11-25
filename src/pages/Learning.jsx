import React, { useEffect } from 'react';
import SubmoduleContent from '../components/Learning/SubmoduleContent';

const Learning = () => {
  // Simple localStorage save saat material dibuka
  useEffect(() => {
    localStorage.setItem('lastPage', 'material');
    console.log('Material page visited');
  }, []);

  return <SubmoduleContent />;
};

export default Learning;
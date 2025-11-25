import React, { useEffect } from 'react';
import SubmoduleContent from '../components/Learning/SubmoduleContent';

const Learning = ({ onCompletion }) => {
  useEffect(() => {
    localStorage.setItem('lastPage', 'material');
    console.log('Material page visited');
  }, []);

  return <SubmoduleContent onCompletion={onCompletion} />;
};

export default Learning;
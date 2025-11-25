import { useEffect, useState, useRef, useCallback } from 'react';

export const useScrollProgress = (threshold = 90) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    
    if (scrollHeight === 0) return;
    
    const scrolled = (element.scrollTop / scrollHeight) * 100;

    setProgress(Math.min(100, scrolled));

    if (scrolled >= threshold) {
      setIsCompleted(true);
    }
  }, [threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { progress, isCompleted, containerRef };
};

export default useScrollProgress;
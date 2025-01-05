import { useState, useEffect } from 'react';

const useMobile = (breakpoint: number = 768): boolean => { // Default breakpoint 768px
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]); // Add breakpoint to dependency array

  return isMobile;
};

export default useMobile;
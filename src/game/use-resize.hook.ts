import { useEffect, useState } from 'react';
import { footerHeight, sideNavWidth, topBarHeight } from '../components/layout';

const getScreenSize = () => ({
  width: window.innerWidth - sideNavWidth,
  height: window.innerHeight - topBarHeight - footerHeight,
});

export const useResize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const onResize = () => setScreenSize(getScreenSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return screenSize;
};

import { useEffect, useState } from 'react';

const getScreenSize = (controlsShowing = false) => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const useResize = (galaxyGen = false) => {
  const [screenSize, setScreenSize] = useState(getScreenSize(galaxyGen));

  useEffect(() => {
    const onResize = () => setScreenSize(getScreenSize(galaxyGen));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [galaxyGen]);

  return screenSize;
};

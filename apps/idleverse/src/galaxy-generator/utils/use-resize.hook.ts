import { useEffect, useState } from 'react';
import { sideNavWidth, topBarHeight } from '../../components/layout';
import { generatorControlsHeight } from '../ui/generator-controls';

const getScreenSize = (controlsShowing = false) => ({
  width: window.innerWidth - sideNavWidth,
  height:
    window.innerHeight -
    topBarHeight -
    (controlsShowing ? generatorControlsHeight : 0),
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

import { useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';
import { sideNavWidth, topBarHeight } from '../../components/layout';
import { layoutVar } from '../../_state/persisted-reactive-variables';
import { generatorControlsHeight } from '../galaxy-generator/ui/generator-controls';

const getScreenSize = (controlsShowing = false, sideNav: boolean) => ({
  width: window.innerWidth - (sideNav ? sideNavWidth : 0),
  height:
    window.innerHeight -
    topBarHeight -
    (controlsShowing ? generatorControlsHeight : 0),
});

export const useResize = (galaxyGen = false) => {
  const { sideNav } = useReactiveVar(layoutVar);

  const [screenSize, setScreenSize] = useState(
    getScreenSize(galaxyGen, sideNav)
  );

  useEffect(() => {
    const onResize = () => setScreenSize(getScreenSize(galaxyGen, sideNav));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galaxyGen]);

  useEffect(() => {
    setScreenSize(getScreenSize(galaxyGen, sideNav));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideNav]);

  return screenSize;
};

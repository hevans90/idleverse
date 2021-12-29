import { useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';
import { sideNavWidth, topBarHeight } from '../../components/layout';
import { layoutVar } from '../../_state/persisted-reactive-variables';
import { generatorControlsHeight } from '../galaxy-generator/ui/generator-controls';
import { solarSystemControlsHeight } from '../solar-system/ui/controls';

type controls = 'galaxy-gen' | 'solar-system' | 'none';

const controlValue = (controls: controls) => {
  const map: { [key in controls]: number } = {
    'galaxy-gen': generatorControlsHeight,
    'solar-system': solarSystemControlsHeight,
    none: 0,
  };

  return map[controls];
};

const getScreenSize = (
  controls: 'galaxy-gen' | 'solar-system' | 'none' = 'none',
  sideNav: boolean
) => ({
  width: window.innerWidth - (sideNav ? sideNavWidth : 0),
  height: window.innerHeight - topBarHeight - controlValue(controls),
});

export const useResize = (
  controls: 'galaxy-gen' | 'solar-system' | 'none' = 'none'
) => {
  const { sideNav } = useReactiveVar(layoutVar);

  const [screenSize, setScreenSize] = useState(
    getScreenSize(controls, sideNav)
  );

  useEffect(() => {
    const onResize = () => setScreenSize(getScreenSize(controls, sideNav));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  useEffect(() => {
    setScreenSize(getScreenSize(controls, sideNav));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideNav]);

  return screenSize;
};

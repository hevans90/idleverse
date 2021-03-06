import { useReactiveVar } from '@apollo/client';
import { useEffect, useState } from 'react';
import { sideNavWidth, topBarHeight } from '../../components/layout';
import { layoutVar } from '../../_state/persisted-reactive-variables';
import { generatorControlsHeight } from '../galaxy-generator/ui/generator-controls';
import { galaxySimControlsHeight } from '../gravity-simulation/ui/gravity-simulation-controls';
import { planetGenerationControlsHeight } from '../planet-generator/ui/sliders';
import { solarSystemControlsHeight } from '../solar-system/ui/controls';

export type controls =
  | 'galaxy-gen'
  | 'solar-system'
  | 'gravity-sim'
  | 'planet-gen'
  | 'none';

const controlValue = (controls: controls) => {
  const map: { [key in controls]: number } = {
    'galaxy-gen': generatorControlsHeight,
    'solar-system': solarSystemControlsHeight,
    'gravity-sim': galaxySimControlsHeight,
    'planet-gen': planetGenerationControlsHeight,
    none: 0,
  };

  return map[controls];
};

const getScreenSize = (controls: controls = 'none', sideNav: boolean) => ({
  width: window.innerWidth - (sideNav ? sideNavWidth : 0),
  height: window.innerHeight - topBarHeight - controlValue(controls),
});

export const useResize = (controls: controls = 'none') => {
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

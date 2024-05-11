import { useReactiveVar } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { sideNavWidth, topBarHeight } from '../../components/layout';

import { generatorControlsHeight } from '../galaxy-generator/ui/generator-controls';

import { layoutVar } from '@idleverse/state';
import { DIALOG_HEIGHT } from '../../game-ui/dialog';
import { galaxySimControlsHeight } from '../../showreel/gravity-simulation/ui/gravity-simulation-controls';
import { planetGenerationControlsHeight } from '../planet-generator/ui/sliders';

export type controls =
  | 'galaxy-gen'
  | 'gravity-sim'
  | 'planet-gen'
  | 'dialog'
  | 'none';

const controlValue = (controls: controls) => {
  const map: { [key in controls]: number } = {
    'galaxy-gen': generatorControlsHeight,
    'gravity-sim': galaxySimControlsHeight,
    'planet-gen': planetGenerationControlsHeight,
    dialog: DIALOG_HEIGHT,
    none: 0,
  };

  return map[controls];
};

const getScreenSize = (controls: controls = 'none', sideNav: boolean) => ({
  width: window.innerWidth - (sideNav ? sideNavWidth : 0),
  height: window.innerHeight - topBarHeight - controlValue(controls),
});

export const useResize = (
  controls: controls = 'none',
  options?: { sidenavOverride: boolean }
) => {
  const { sideNav } = useReactiveVar(layoutVar);

  const screenSizeGetter = useCallback(
    () =>
      options?.sidenavOverride
        ? getScreenSize(controls, false)
        : getScreenSize(controls, sideNav),
    [controls, options?.sidenavOverride, sideNav]
  );

  const [screenSize, setScreenSize] = useState(screenSizeGetter());

  useEffect(() => {
    const onResize = () => setScreenSize(screenSizeGetter());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  useEffect(() => {
    setScreenSize(screenSizeGetter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideNav]);

  return screenSize;
};

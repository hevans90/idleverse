import { useEffect, useState } from 'react';

import { loadPlanets } from '../../asset-loading/load-planets';
import { Loading } from '../../components/loading';
import { PixiWrapper } from '../_utils/pixi-wrapper';

import { SolarSystem } from './solar-system';
import { SolarSystemControls } from './ui/controls';

export const SolarSystemContainer = () => {
  const [celestialSpritesLoading, setCelestialSpritesLoading] = useState(true);

  useEffect(() => {
    loadPlanets().then(() => setCelestialSpritesLoading(false));
  }, []);

  if (celestialSpritesLoading)
    return (
      <Loading width="100%" height="100%" text="Loading sprites"></Loading>
    );

  return (
    <PixiWrapper ui={<SolarSystemControls />}>
      <SolarSystem />
    </PixiWrapper>
  );
};

import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '../game/utils/generate';

type sliderType = {
  name: keyof GalaxyConfig;
  max: number;
  step: number;
};

export const galaxySlidersConfig: sliderType[] = [
  {
    name: 'radius',
    max: 1000,
    step: 10,
  },
  {
    name: 'arms',
    max: 10,
    step: 1,
  },
  {
    name: 'curvature',
    max: 10,
    step: 0.1,
  },
  {
    name: 'armWidth',
    max: 0.2,
    step: 0.005,
  },
  {
    name: 'coreRadiusFactor',
    max: 0.05,
    step: 0.002,
  },
  {
    name: 'coreConcentrationFactor',
    max: 10,
    step: 0.1,
  },
];

const initialGalaxyConfig: GalaxyConfig = {
  radius: 50,
  arms: 3,
  curvature: 2,
  armWidth: 0.05,
  coreRadiusFactor: 0.02,
  coreConcentrationFactor: 1.5,
};

export const galaxyConfig = makeVar(initialGalaxyConfig);

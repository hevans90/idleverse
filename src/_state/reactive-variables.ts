import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '../game/utils/generate';

type sliderType = {
  name: keyof GalaxyConfig;
  min?: number;
  max: number;
  step: number;
};

export const galaxySlidersConfig: sliderType[] = [
  {
    name: 'radius',
    max: 1000,
    step: 5,
  },
  {
    name: 'arms',
    max: 10,
    step: 0.05,
  },
  {
    name: 'curvature',
    min: -5,
    max: 5,
    step: 0.05,
  },
  {
    name: 'armWidth',
    max: 0.2,
    step: 0.005,
  },
  {
    name: 'coreRadiusFactor',
    max: 0.05,
    step: 0.001,
  },
  {
    name: 'coreConcentrationFactor',
    max: 10,
    step: 0.05,
  },
];

const initialGalaxyConfig: GalaxyConfig = {
  radius: 1,
  arms: 1,
  curvature: 1,
  armWidth: 0,
  coreRadiusFactor: 0,
  coreConcentrationFactor: 1,
};

export const galaxyConfig = makeVar(initialGalaxyConfig);
export const galaxyRotation = makeVar(-0.001);
export const time = makeVar(0);

import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '../game/utils/generate';

type sliderType = {
  name: keyof GalaxyConfig;
  defaultValue: number;
  max: number;
  step: number;
};

export const galaxySlidersConfig: sliderType[] = [
  {
    name: 'radius',
    defaultValue: 500,
    max: 1000,
    step: 10,
  },
  {
    name: 'arms',
    defaultValue: 3,
    max: 10,
    step: 1,
  },
  {
    name: 'curvature',
    defaultValue: 3,
    max: 10,
    step: 0.1,
  },
  {
    name: 'armWidth',
    defaultValue: 0.05,
    max: 0.2,
    step: 0.005,
  },
  {
    name: 'coreRadiusFactor',
    defaultValue: 0.02,
    max: 0.05,
    step: 0.002,
  },
  {
    name: 'coreConcentrationFactor',
    defaultValue: 1.5,
    max: 3,
    step: 0.1,
  },
];

const initialGalaxyConfig: GalaxyConfig = {
  radius: 500,
  arms: 3,
  curvature: 3,
  armWidth: 0.05,
  coreRadiusFactor: 1 / 50,
  coreConcentrationFactor: 1.5,
};

export const galaxyConfig = makeVar(initialGalaxyConfig);

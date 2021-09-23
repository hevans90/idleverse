import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '../game/utils/generate';

export type sliderType = {
  name: keyof GalaxyConfig;
  displayName: string;
  min?: number;
  max: number;
  step: number;
};

export const galaxySlidersConfig: sliderType[] = [
  {
    name: 'radius',
    displayName: 'radius',
    max: 1000,
    step: 5,
  },
  {
    name: 'arms',
    displayName: 'no. arms',
    max: 10,
    step: 0.05,
  },
  {
    name: 'curvature',
    displayName: 'curvature',
    min: -5,
    max: 5,
    step: 0.05,
  },
  {
    name: 'armWidth',
    displayName: 'arm width',
    max: 0.2,
    step: 0.005,
  },
  {
    name: 'coreRadiusFactor',
    displayName: 'arm density',
    max: 0.05,
    step: 0.001,
  },
  {
    name: 'coreConcentrationFactor',
    displayName: 'core concentration',
    max: 3,
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
export const rotate = makeVar(false);
export const animate = makeVar(false);

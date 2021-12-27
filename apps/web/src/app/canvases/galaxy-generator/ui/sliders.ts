import { GalaxyConfig } from '@idleverse/galaxy-gen';

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
  {
    name: 'stars',
    displayName: 'No. Stars',
    max: 10000,
    step: 100,
  },
];

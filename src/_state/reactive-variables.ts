import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '../game/utils/generate';

export const curvature = makeVar(3);

export const galaxySlidersConfig = [
  {
    name: 'radius',
    defaultValue: 500,
    max: 1000,
    step: 10,
  },
  {
    name: 'arms',
    defaultValue: 500,
    max: 1000,
    step: 10,
  },
  {
    name: 'curvature',
    defaultValue: 500,
    max: 1000,
    step: 10,
  },
  {
    name: 'armWidth',
    defaultValue: 500,
    max: 1000,
    step: 10,
  },
  {
    name: 'coreRadiusFactor',
    defaultValue: 500,
    max: 1000,
    step: 10,
  },
  {
    name: 'coreConcentrationFactor',
    defaultValue: 500,
    max: 1000,
    step: 10,
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

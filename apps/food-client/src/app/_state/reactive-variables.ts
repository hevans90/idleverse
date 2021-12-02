import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '../canvases/galaxy-generator/utils/generate-galaxy';

export type SolarSystemConfig = {
  viewAngle: number;
  viewDistance: number;
  simulationSpeed: number;
};

export type GalaxySliderType = {
  name: keyof GalaxyConfig;
  displayName: string;
  min?: number;
  max: number;
  step: number;
};

export type SolarSystemSliderType = {
  name: keyof SolarSystemConfig;
  displayName: string;
  min?: number;
  max: number;
  step: number;
};

export const galaxySlidersConfig: GalaxySliderType[] = [
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

export const solarSystemSlidersConfig: SolarSystemSliderType[] = [
  {
    name: 'viewAngle',
    displayName: 'View Angle',
    max: 90,
    step: 1,
  },
  {
    name: 'viewDistance',
    displayName: 'View Distance',
    min: 300,
    max: 5000,
    step: 10,
  },
  {
    name: 'simulationSpeed',
    displayName: 'Simulation Speed',
    min: 1,
    max: 10,
    step: 0.1,
  },
];

const initialSolarSystemConfig: SolarSystemConfig = {
  viewAngle: 0,
  viewDistance: 1000,
  simulationSpeed: 1,
};

const initialGalaxyConfig: GalaxyConfig = {
  radius: 1,
  arms: 2,
  curvature: 1,
  armWidth: 0.1,
  coreRadiusFactor: 0.01,
  coreConcentrationFactor: 1,
};

export const galaxyConfig = makeVar(initialGalaxyConfig);
export const solarSystemConfig = makeVar(initialSolarSystemConfig);
export const galaxyRotation = makeVar(-0.001);
export const time = makeVar(0);
export const rotate = makeVar(false);
export const animate = makeVar(false);

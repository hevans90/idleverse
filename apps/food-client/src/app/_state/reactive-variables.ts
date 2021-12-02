import { makeVar } from '@apollo/client';

export type SolarSystemConfig = {
  viewAngle: number;
  viewDistance: number;
  simulationSpeed: number;
};

export type SolarSystemSliderType = {
  name: keyof SolarSystemConfig;
  displayName: string;
  min?: number;
  max: number;
  step: number;
};

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

export const solarSystemConfig = makeVar(initialSolarSystemConfig);
export const time = makeVar(0);
export const animate = makeVar(false);

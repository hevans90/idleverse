import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '@idleverse/galaxy-gen';
import { SelfQuery } from '@idleverse/graphql';
import { v4 as uuidv4 } from 'uuid';

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

export const galaxyConfigVar = makeVar<GalaxyConfig>({
  seed: uuidv4(),
  name: 'new galaxy',
  radius: 1,
  arms: 2,
  curvature: 1,
  armWidth: 0.1,
  coreRadiusFactor: 0.01,
  coreConcentrationFactor: 1,
  stars: 1000,
});

export const galaxyRotationVar = makeVar(-0.001);
export const timeVar = makeVar(0);
export const rotateVar = makeVar(false);
export const animateVar = makeVar(false);

type Self = SelfQuery['user_me'][0];
export const selfVar = makeVar<Self>(null!);
export const roleVar = makeVar<string>(null);

export const accessTokenVar = makeVar<string>(null);

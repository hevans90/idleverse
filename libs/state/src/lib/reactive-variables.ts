import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '@idleverse/galaxy-gen';
import { CelestialByIdQuery, UserInfoQuery } from '@idleverse/galaxy-gql';
import { BreadCrumb, Self, SolarSystemConfig } from '@idleverse/models';
import { v4 as uuidv4 } from 'uuid';

export const breadCrumbsVar = makeVar<BreadCrumb[]>([]);

export const galaxyConfigVar = makeVar<GalaxyConfig>({
  seed: uuidv4(),
  name: 'new galaxy',
  radius: 200,
  arms: 2,
  curvature: 1,
  armWidth: 0.1,
  coreRadiusFactor: 0.01,
  coreConcentrationFactor: 1,
  stars: 1000,
});

export const celestialVar =
  makeVar<CelestialByIdQuery['celestial_by_pk']>(null);

export const galaxyRotationVar = makeVar(-0.001);
export const timeVar = makeVar(0);
export const rotateVar = makeVar(false);
export const animateVar = makeVar(false);

export const selfVar = makeVar<Self | null>(null);
export const roleVar = makeVar<string | null>(null);
export const accessTokenVar = makeVar<string | null>(null);

export const usersVar = makeVar<UserInfoQuery['user_info']>([]);
export const userById = (desiredId: string) =>
  usersVar().find(({ id }) => id === desiredId);

export const solarSystemConfigVar = makeVar<SolarSystemConfig>({
  simulationSpeed: 1,
});

export const simulationPaused = makeVar(true);

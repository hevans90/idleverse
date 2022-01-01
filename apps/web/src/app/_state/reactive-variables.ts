import { makeVar } from '@apollo/client';
import { GalaxyConfig } from '@idleverse/galaxy-gen';
import { UserInfoQuery } from '@idleverse/galaxy-gql';
import { v4 as uuidv4 } from 'uuid';
import { AssetCollection, BreadCrumb, Self, SolarSystemConfig } from './models';

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

export const galaxyRotationVar = makeVar(-0.001);
export const timeVar = makeVar(0);
export const rotateVar = makeVar(false);
export const animateVar = makeVar(false);

export const selfVar = makeVar<Self>(null);
export const roleVar = makeVar<string>(null);
export const accessTokenVar = makeVar<string>(null);

export const usersVar = makeVar<UserInfoQuery['user_info']>([]);
export const userAvatarResourcesVar = makeVar<AssetCollection>(null);

export const solarSystemConfigVar = makeVar<SolarSystemConfig>({
  viewAngle: 0,
  simulationSpeed: 1,
});

export const planetResourcesVar = makeVar<AssetCollection>(null);

export const simulationPaused = makeVar(true);

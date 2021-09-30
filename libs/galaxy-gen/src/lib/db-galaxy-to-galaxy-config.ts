import { GalaxyConfig } from '@idleverse/galaxy-gen';
import { GalaxyByIdQuery } from '@idleverse/graphql';

export const dbGalaxyToGalaxyConfig = ({
  arm_width,
  arms,
  core_concentration_factor,
  core_radius_factor,
  curvature,
  id,
  radius,
  stars,
  name,
}: GalaxyByIdQuery['galaxy_by_pk']): GalaxyConfig => ({
  seed: id,
  name,
  radius,
  arms,
  curvature,
  armWidth: arm_width,
  coreRadiusFactor: core_radius_factor,
  coreConcentrationFactor: core_concentration_factor,
  stars,
});

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const signedRandom = () => {
  return 2 * Math.random() - 1;
};

export type Celestial = {
  seeds: {
    arm: number;
    theta: number;
    rOffset: number;
    coreRadius: number;
  };
  x?: number;
  y?: number;
};

export type GalaxyConfig = {
  radius: number;
  arms: number;
  curvature: number;
  armWidth: number;
  coreRadius: number;
  coreConcentrationBias: number;
};

export const GenerateCelestials = (count: number) => {
  let celestials = [];
  for (let i = 0; i < count; i++) {
    let celestial = {
      seeds: {
        arm: Math.random(),
        theta: Math.random(),
        rOffset: signedRandom(),
        coreRadius: signedRandom(),
      },
    };

    celestials[i] = celestial;
  }
  return celestials;
};

export const GetCelestialPosition = (
  cel: Celestial,
  config: GalaxyConfig
) => {
  let arm = Math.floor(cel.seeds.arm * config.arms) - 1;
  let theta =
    Math.pow(cel.seeds.theta, config.coreConcentrationBias) *
    Math.PI *
    config.curvature;
  let r =
    (((theta / (Math.PI * 2)) * config.radius) / config.curvature) *
    (1 + cel.seeds.rOffset * config.armWidth);

  theta += (cel.seeds.coreRadius * Math.PI * config.coreRadius) / r;

  // Convert polar coordinates to 2D cartesian coordinates.
  let x = Math.cos(theta + ((2 * Math.PI) / config.arms) * arm) * r;
  let y = Math.sin(theta + ((2 * Math.PI) / config.arms) * arm) * r;

  // Now we can assign xy coords.
  return { x: x, y: y };
};

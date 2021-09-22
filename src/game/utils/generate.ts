// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  coreRadiusFactor: number;
  coreConcentrationFactor: number;
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

export const GetCelestialPosition = (cel: Celestial, config: GalaxyConfig) => {
  // Pick galactic arm for celestial body.
  let arm = Math.floor(cel.seeds.arm * config.arms);

  /* Pick a random value for the azimuth of the celestial body from the core.
     This value can be greater than 2 radians as it is used to calculate distance from core later.
     The value is raised to a power which shifts the distribution towards or away from the core. */
  let theta =
    Math.pow(cel.seeds.theta, config.coreConcentrationFactor) *
    Math.PI *
    2 *
    config.curvature;

  let r =
    (theta / (Math.PI * 2)) *
    (config.radius / config.curvature) *
    (1 + cel.seeds.rOffset * config.armWidth);

  theta +=
    cel.seeds.coreRadius *
    Math.PI *
    2 *
    config.coreRadiusFactor *
    (config.radius / r);

  theta += ((Math.PI * 2) / config.arms) * arm;

  // Convert polar coordinates to 2D cartesian coordinates.
  let x = Math.cos(theta) * r;
  let y = Math.sin(theta) * r;

  // Now we can assign xy coords.
  return { x, y };
};

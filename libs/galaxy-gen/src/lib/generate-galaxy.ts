import objectHash from 'object-hash';
import seedRandom from 'seedrandom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const signedRandom = (number: number) => 2 * number - 1;

export type Celestial = {
  constants: {
    arm: number;
    theta: number;
    rOffset: number;
    coreRadius: number;
  };
  hashedConstants: string;
  x?: number;
  y?: number;
};

export type GalaxyConfig = {
  id?: string;
  seed: string;
  name: string;
  radius: number;
  arms: number;
  curvature: number;
  armWidth: number;
  coreRadiusFactor: number;
  coreConcentrationFactor: number;
  stars: number;
};

export const generateCelestials = (count: number, seed: string) => {
  const pseudoRandomGenerator = seedRandom(seed);

  const celestials: Celestial[] = [];
  for (let i = 0; i < count; i++) {
    let celestial: Partial<Celestial> = {
      constants: {
        arm: pseudoRandomGenerator(),
        theta: pseudoRandomGenerator(),
        rOffset: signedRandom(pseudoRandomGenerator()),
        coreRadius: signedRandom(pseudoRandomGenerator()),
      },
    };

    celestial = {
      ...celestial,
      hashedConstants: objectHash(celestial.constants),
    };

    celestials[i] = celestial as Celestial;
  }
  return celestials;
};

export const getRandomUnclaimedCelestialId = (
  galaxyConfig: Partial<GalaxyConfig>,
  claimedCelestialsId: string[]
) => {
  const celestials = generateCelestials(galaxyConfig.stars, galaxyConfig.id);

  const filteredCelestials = celestials.filter(
    (celestial) => !claimedCelestialsId.includes(celestial.hashedConstants)
  );

  return filteredCelestials[
    Math.floor(Math.random() * filteredCelestials.length)
  ].hashedConstants;
};

export type ClaimedCelestialAttributes = {
  isClaimed: boolean;
};

export const generateCelestialsWithClaimed = (
  count: number,
  seed: string,
  claimedCelestials: string[]
) => {
  const pseudoRandomGenerator = seedRandom(seed);

  const celestials: (Celestial & ClaimedCelestialAttributes)[] = [];
  for (let i = 0; i < count; i++) {
    let celestial: Partial<Celestial & ClaimedCelestialAttributes> = {
      constants: {
        arm: pseudoRandomGenerator(),
        theta: pseudoRandomGenerator(),
        rOffset: signedRandom(pseudoRandomGenerator()),
        coreRadius: signedRandom(pseudoRandomGenerator()),
      },
    };

    const hashedConstants = objectHash(celestial.constants);
    celestial = {
      ...celestial,
      hashedConstants,
      isClaimed: claimedCelestials.find((cc) => cc === hashedConstants)
        ? true
        : false,
    };

    celestials[i] = celestial as Celestial & ClaimedCelestialAttributes;
  }
  return celestials;
};

export const getCelestialPosition = (cel: Celestial, config: GalaxyConfig) => {
  // Pick galactic arm for celestial body.
  const arm = Math.floor(cel.constants.arm * config.arms);

  /* Pick a random value for the azimuth of the celestial body from the core.
     This value can be greater than 2 radians as it is used to calculate distance from core later.
     The value is raised to a power which shifts the distribution towards or away from the core. */
  let theta =
    Math.pow(cel.constants.theta, config.coreConcentrationFactor) *
    Math.PI *
    2 *
    config.curvature;

  const r =
    Math.pow(cel.constants.theta, config.coreConcentrationFactor) *
    config.radius *
    (1 + cel.constants.rOffset * config.armWidth);

  theta +=
    cel.constants.coreRadius *
    Math.PI *
    2 *
    config.coreRadiusFactor *
    (config.radius / r);

  theta += ((Math.PI * 2) / config.arms) * arm;

  // Convert polar coordinates to 2D cartesian coordinates.
  const x = Math.cos(theta) * r;
  const y = Math.sin(theta) * r;

  // Now we can assign xy coords.
  return { x, y };
};

/**
 * **WARNING**: THIS IS EXPENSIVE. DO NOT USE THIS IN TICKER FUNCTIONS
 */
export const getCelestialIdHash = (constants: Celestial['constants']) =>
  objectHash(constants);

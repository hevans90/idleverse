import { generateCelestialName } from '@idleverse/galaxy-gen';
import { planetGeneratorConfigVar } from '@idleverse/state';
import { v4 as uuidv4 } from 'uuid';

export const randomisePlanetSeedAndName = () =>
  planetGeneratorConfigVar({
    ...planetGeneratorConfigVar(),
    name: generateCelestialName(),
    seed: uuidv4(),
  });

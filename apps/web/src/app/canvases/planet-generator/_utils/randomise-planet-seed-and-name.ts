import { generateCelestialName } from '@idleverse/galaxy-gen';
import { v4 as uuidv4 } from 'uuid';
import { planetGeneratorConfigVar } from '../../../_state/planet-generation';

export const randomisePlanetSeedAndName = () =>
  planetGeneratorConfigVar({
    ...planetGeneratorConfigVar(),
    name: generateCelestialName(),
    seed: uuidv4(),
  });

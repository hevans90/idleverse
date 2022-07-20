import { makeVar } from '@apollo/client';
import { PlanetByIdQuery } from '@idleverse/galaxy-gql';

export const planetVar = makeVar<PlanetByIdQuery['planet_by_pk']>(null);

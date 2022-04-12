import {
  Planet,
  TryInsertPlanetMutationVariables,
} from '@idleverse/galaxy-gql';
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { Context } from '../datasources/context';

@ObjectType()
class CelestialManagement {
  @Field()
  createdPlanet: Pick<Planet, '__typename' | 'id' | 'name' | 'owner_id'>;
}

@Resolver((of) => CelestialManagement)
export class CelestialManagementResolver {
  @Mutation((returns) => CelestialManagement, { nullable: true })
  async createPlanet(
    @Ctx() context: Context,
    @Arg('planet_input') variables: TryInsertPlanetMutationVariables
  ) {
    if (!context.id) throw new Error('User id not in token');

    const data = (
      await context.dataSources.hasuraAPI.tryInsertPlanetToCelestial(variables)
    ).data;

    const planet = data?.insert_planet_one;

    if (planet) {
      const celestialManagement = new CelestialManagement();
      celestialManagement.createdPlanet = planet;
      return celestialManagement;
    }
    throw new Error('Failed to insert planet');
  }
}

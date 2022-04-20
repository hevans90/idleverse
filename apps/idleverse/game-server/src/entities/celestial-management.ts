import 'reflect-metadata';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../datasources/context';
import {
  CelestialManagement,
  PartialPlanet,
  PlanetCreationInput,
} from './celestial-types';

@Resolver((of) => CelestialManagement)
export class CelestialManagementResolver {
  @Authorized('user')
  @Mutation((returns) => CelestialManagement, { nullable: true })
  async createPlanet(
    @Ctx() context: Context,
    @Arg('input') input: PlanetCreationInput
  ): Promise<CelestialManagement> {
    if (!context.id) throw new Error('User id not in token');

    const data = (
      await context.dataSources.hasuraAPI.tryInsertPlanetToCelestial({ input })
    ).data;

    const planet: PartialPlanet = data?.insert_planet_one;

    if (!planet) {
      throw new Error('Failed to insert planet');
    }

    const celestialManagement = new CelestialManagement();
    celestialManagement.createdPlanet = planet;
    return celestialManagement;
  }
}

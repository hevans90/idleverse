import 'reflect-metadata';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../datasources/context';
import {
  CelestialManagement,
  PartialPlanet,
  PlanetCreationInput,
} from './celestial-types';
import { planetValidator } from './planet-validator';

@Resolver((of) => CelestialManagement)
export class CelestialManagementResolver {
  @Authorized('user')
  @Mutation((returns) => CelestialManagement, { nullable: true })
  async createPlanet(
    @Ctx() context: Context,
    @Arg('input') input: PlanetCreationInput
  ): Promise<CelestialManagement> {
    if (!context.id) throw new Error('User id not in token');

    const validationIssues = planetValidator(input);

    if (validationIssues.length) {
      throw new Error(
        `Planet input validation failed. ${validationIssues.map(
          ({ issue }, i) => `\n${i + 1}. ${issue}`
        )}`
      );
    }

    const data = (
      await context.dataSources.hasuraAPI.tryInsertPlanetToCelestial({
        input: { ...input, terrain_bias: `{${input.terrain_bias}}` },
      })
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

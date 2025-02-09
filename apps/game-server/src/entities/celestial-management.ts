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

    const rings: PlanetCreationInput['rings'] = { ...input?.rings };

    if (input?.rings?.data?.length) {
      rings.data = input.rings.data.map(
        ({ terrain_bias, rotation, colors, ...rest }) =>
          ({
            ...rest,
            // Inserting arrays into postgres requires a string format
            colors: `{${colors}}`,
            terrain_bias: `{${terrain_bias}}`,
            rotation: `{${rotation}}`,
          } as any) // RingInsertInput
      );
    }

    const data = (
      await context.dataSources.hasuraAPI.tryInsertPlanetToCelestial({
        input: {
          ...input,
          terrain_bias:
            // Inserting arrays into postgres requires a string format
            `{${input.terrain_bias}}` as unknown as number[],
          rings,
        },
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

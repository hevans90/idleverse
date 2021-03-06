import {
  generateCelestialName,
  getRandomUnclaimedCelestialId,
} from '@idleverse/galaxy-gen';
import 'reflect-metadata';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Context } from '../datasources/context';

@ObjectType()
class GalaxyManagement {
  @Field()
  insertedCelestialName: string;

  @Field()
  insertedCelestialId: string;
}

@Resolver((of) => GalaxyManagement)
export class GalaxyManagementResolver {
  @Query((returns) => GalaxyManagement, { nullable: true })
  async returnNothing() {
    return null;
  }

  @Authorized('user')
  @Mutation((returns) => GalaxyManagement, { nullable: true })
  async createEmpireOriginCelestial(
    @Ctx() context: Context,
    @Arg('galaxy_id') galaxyId: string
  ) {
    if (!context.id) throw new Error('User id not in token.');

    const existingEmpires = (
      await context.dataSources.hasuraAPI.getGalacticEmpiresByGalaxyId(galaxyId)
    ).data;

    const userAlreadyHasEmpire = existingEmpires.galactic_empire.find(
      ({ user_id }) => user_id === context.id
    );

    if (userAlreadyHasEmpire)
      throw new Error('This user has an existing empire in this galaxy.');

    const data = (
      await context.dataSources.hasuraAPI.getGalaxyByIdWithUnclaimedCelestials(
        galaxyId
      )
    ).data;

    const claimedCelestials: string[] = data.celestial.map(
      (celestial) => celestial.id
    );

    const randomCelestialId = getRandomUnclaimedCelestialId(
      data.galaxy_by_pk,
      claimedCelestials
    );

    const {
      data: { insert_celestial_one },
    } = await context.dataSources.hasuraAPI.tryInsertClaimedCelestial(
      context.id,
      randomCelestialId,
      galaxyId,
      generateCelestialName()
    );

    const temp = new GalaxyManagement();
    temp.insertedCelestialId = insert_celestial_one.id;
    temp.insertedCelestialName = insert_celestial_one.name;
    return temp;
  }
}

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
  async requestRandomCelestial(
    @Ctx() context: Context,
    @Arg('galaxy_id') galaxyId: string
  ) {
    if (!context.id) throw new Error('User id not in token');

    const data = (
      await context.dataSources.hasuraAPI.getGalaxyByIdWithUnclaimedCelestials(
        context.id,
        galaxyId
      )
    ).data;

    //todo claim query
    const galaxyConfig = data.galaxy_by_pk;
    const claimedCelestials: string[] = data.celestial.map((cData) => cData.id);

    const randomCelestialId = getRandomUnclaimedCelestialId(
      galaxyConfig,
      claimedCelestials
    );

    //todo function to give random galaxy
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

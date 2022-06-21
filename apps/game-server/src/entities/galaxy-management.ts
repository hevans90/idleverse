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
  freeClaimsLeft: number;
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
      await context.dataSources.hasuraAPI.getFreeClaimsByIdAndGalaxyById(
        context.id,
        galaxyId
      )
    ).data;
    const freeClaims = data.user_info_by_pk.free_claims;

    if (freeClaims > 0) {
      //todo claim query
      const galaxyConfig = data.galaxy_by_pk;
      const claimedCelestials: string[] = data.celestial.map(
        (cData) => cData.id
      );

      const randomCelestialId = getRandomUnclaimedCelestialId(
        galaxyConfig,
        claimedCelestials
      );

      //todo function to give random galaxy
      const newFreeClaims = (
        await context.dataSources.hasuraAPI.tryInsertClaimedCelestial(
          context.id,
          randomCelestialId,
          galaxyId,
          generateCelestialName(),
          freeClaims - 1
        )
      ).data.update_user_info_by_pk.free_claims;

      const temp = new GalaxyManagement();
      temp.freeClaimsLeft = newFreeClaims;
      return temp;
    }
    throw new Error('No free claims left');
  }
}

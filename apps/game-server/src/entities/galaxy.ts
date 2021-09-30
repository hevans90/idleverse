import 'reflect-metadata';
import {
  Authorized,
  Ctx,
  Field,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Context } from '../datasources/context';

@ObjectType()
class Galaxy {
  @Field()
  freeClaimsLeft: number;
}

@Resolver((of) => Galaxy)
export class GalaxyResolver {
  @Authorized('user')
  @Query((returns) => Galaxy, { nullable: true })
  async requestRandomGalaxy(@Ctx() context: Context) {
    if (!context.id) throw new Error('User id not in token');

    const freeClaims = (
      await context.dataSources.hasuraAPI.getFreeSystemClaims(context.id)
    ).data.user_info_by_pk.free_claims;
    if (freeClaims > 0) {
      //todo claim query
      const newFreeClaims = (
        await context.dataSources.hasuraAPI.tryUpdateFreeClaims(
          context.id,
          freeClaims - 1
        )
      ).data.update_user_info_by_pk.free_claims;
      const temp = new Galaxy();
      temp.freeClaimsLeft = newFreeClaims;
      return temp;
    }
    throw new Error('No free claims left');
  }
}

import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Context } from '../datasources/context';

@ObjectType()
class Register {
  @Field()
  updatedName: string;
}

@Service()
@Resolver((of) => Register)
export class RegisterResolver {
  @Mutation((returns) => Register, { nullable: true })
  async setDisplayName(
    @Ctx() context: Context,
    @Arg('displayName') displayName: string
  ) {
    if (!context.id) return null;

    const resDisplayName = await context.hasuraApi.trySetDisplayName(
      context.id,
      displayName
    );
    if (resDisplayName) {
      await context.auth0Api.trySetUserRole(context.id, 'user');
      return resDisplayName;
    }
    return null;
  }
}

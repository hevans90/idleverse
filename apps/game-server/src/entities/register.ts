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
    if (!context.id) throw new Error('User id not in token');

    const resDisplayName = (
      await context.dataSources.hasuraAPI.trySetDisplayName(
        context.id,
        displayName
      )
    ).data.update_user_info_by_pk.display_name;
    if (resDisplayName) {
      await context.dataSources.auth0API.trySetUserRole(
        context.id,
        'rol_10vO6MmzARbpP2nL'
      );
      console.log(resDisplayName);
      const shit = new Register();
      shit.updatedName = resDisplayName;
      return shit;
    }
    throw new Error('Failed to insert display name');
  }
}
import { LazyQueryExecFunction, OperationVariables } from '@apollo/client';
import { UserInfoByIdQuery } from '@idleverse/galaxy-gql';
import { Assets, Texture } from 'pixi.js';

export const loadAvatarByUserId = async (
  userId: string,
  getUserQuery: LazyQueryExecFunction<UserInfoByIdQuery, OperationVariables>
): Promise<Texture> => {
  const local = window.location.origin.includes('localhost');

  // localhost has CORS issues with AUTH0's profile picture API :(
  if (!local) {
    try {
      // see if this user is loaded in the initial preloaded bundle
      const loadScreenAssets = await Assets.loadBundle('user-avatars');
      if (loadScreenAssets[userId]) {
        return loadScreenAssets[userId] as Texture;
      } else {
        // otherwise call our async function (graphql query) to get this user's avatar url
        const { avatar_url } = (await getUserQuery({ variables: { userId } }))
          .data.user_info_by_pk;

        return Assets.load(avatar_url);
      }
    } catch (e) {
      console.error(e);
    }
  }
};

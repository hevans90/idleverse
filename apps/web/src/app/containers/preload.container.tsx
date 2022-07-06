import { useQuery } from '@apollo/client';
import {
  PlayableRacesDocument,
  PlayableRacesQuery,
  SelfDocument,
  SelfQuery,
  UserInfoDocument,
  UserInfoQuery,
} from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { loadUserInfo } from '../asset-loading/load-users';
import { Loading } from '../components/loading';
import { playableRacesVar } from '../_state/playable-races';
import { selfVar } from '../_state/reactive-variables';

/**
 * Performs all async loading and blocks any children rendering until complete.
 */
export const PreloadContainer = ({ children }: { children: JSX.Element }) => {
  const [userAvatarsLoading, setUserAvatarsLoading] = useState(true);

  const { loading: profileLoading } = useQuery<SelfQuery>(SelfDocument, {
    onCompleted: (data) => {
      if (data && data.user_me && data.user_me[0]) {
        selfVar(data.user_me[0]);
      }
    },
    fetchPolicy: 'network-only',
  });

  const { data: userInfo, loading: usersLoading } =
    useQuery<UserInfoQuery>(UserInfoDocument);

  const { loading: playableRacesLoading } = useQuery<PlayableRacesQuery>(
    PlayableRacesDocument,
    {
      onCompleted: (data) => playableRacesVar(data.playable_race),
    }
  );

  useEffect(() => {
    if (!usersLoading && userInfo) {
      loadUserInfo(userInfo).then(() => setUserAvatarsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLoading]);

  if (usersLoading) return <Loading text="Loading Users"></Loading>;

  if (profileLoading) return <Loading text="Loading Profile"></Loading>;

  if (playableRacesLoading)
    return <Loading text="Loading Playable Races"></Loading>;

  if (userAvatarsLoading) return <Loading text="Loading Avatars"></Loading>;

  return children;
};

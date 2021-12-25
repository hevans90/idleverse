import { useQuery } from '@apollo/client';
import {
  SelfDocument,
  SelfQuery,
  UserInfoDocument,
  UserInfoQuery,
} from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';
import { loadUserInfo } from '../asset-loading/load-users';
import { Loading } from '../components/loading';
import { selfVar } from '../_state/reactive-variables';

export const SelfContainer = (props: any) => {
  const [userAvatarsLoading, setUserAvatarsLoading] = useState(true);

  const { loading: profileLoading, data } = useQuery<SelfQuery>(SelfDocument, {
    onCompleted: (data) => {
      if (data && data.user_me && data.user_me[0]) {
        selfVar(data.user_me[0]);
      }
    },
    fetchPolicy: 'network-only',
  });

  const { data: userInfo, loading: usersLoading } =
    useQuery<UserInfoQuery>(UserInfoDocument);

  useEffect(() => {
    if (!usersLoading && userInfo) {
      loadUserInfo(userInfo).then(() => setUserAvatarsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersLoading]);

  if (usersLoading) return <Loading text="Loading Users"></Loading>;

  if (userAvatarsLoading) return <Loading text="Loading Avatars"></Loading>;

  if (profileLoading) return <Loading text="Loading Profile"></Loading>;
  return props.children;
};

import {
  ApolloClient,
  ApolloQueryResult,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { MockSubscriptionLink } from '@apollo/client/testing';

export const mockApolloClient = () => {
  const link = new MockSubscriptionLink();

  return {
    client: new ApolloClient({
      link,
      cache: new InMemoryCache(),
    }),
    link,
  };
};

export const mockQuery = <T>(
  mockClient: ApolloClient<NormalizedCacheObject>,
  data: T
) => {
  jest.spyOn(mockClient, 'query').mockImplementation(
    () =>
      new Promise<ApolloQueryResult<T>>((resolve, reject) => {
        resolve({
          data,
          loading: false,
          networkStatus: 1,
        });
      })
  );
};

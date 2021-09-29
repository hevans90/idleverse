import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  SetDisplayNameByUserIdDocument,
  SetDisplayNameByUserIdMutation,
  SetDisplayNameByUserIdMutationVariables,
} from '@idleverse/graphql';
import { DataSource } from 'apollo-datasource';

export class HasuraAPI extends DataSource {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super();

    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;

  trySetDisplayName = async (id: string, display_name: string) =>
    this.client.mutate<
      SetDisplayNameByUserIdMutation,
      SetDisplayNameByUserIdMutationVariables
    >({
      mutation: SetDisplayNameByUserIdDocument,
      variables: { id, display_name },
    });
}

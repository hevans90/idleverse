import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  SetNameByUserIdDocument,
  SetNameByUserIdMutation,
  SetNameByUserIdMutationVariables,
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
      SetNameByUserIdMutation,
      SetNameByUserIdMutationVariables
    >({ mutation: SetNameByUserIdDocument, variables: { id, display_name } });
}

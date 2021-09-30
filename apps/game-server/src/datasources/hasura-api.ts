import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GetUserFreeClaimsDocument,
  GetUserFreeClaimsQuery,
  GetUserFreeClaimsQueryVariables,
  SetDisplayNameByUserIdDocument,
  SetDisplayNameByUserIdMutation,
  SetDisplayNameByUserIdMutationVariables,
  UpdateFreeClaimsDocument,
  UpdateFreeClaimsMutation,
  UpdateFreeClaimsMutationVariables,
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

  getFreeSystemClaims = async (id: string) =>
    this.client.query<GetUserFreeClaimsQuery, GetUserFreeClaimsQueryVariables>({
      query: GetUserFreeClaimsDocument,
      variables: { id },
    });

  tryUpdateFreeClaims = async (id: string, free_claims: number) =>
    this.client.mutate<
      UpdateFreeClaimsMutation,
      UpdateFreeClaimsMutationVariables
    >({
      mutation: UpdateFreeClaimsDocument,
      variables: { id, free_claims },
    });
}

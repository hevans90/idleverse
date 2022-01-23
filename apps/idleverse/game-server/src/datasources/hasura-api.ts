import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsDocument,
  GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery,
  GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables,
  SetDisplayNameByUserIdDocument,
  SetDisplayNameByUserIdMutation,
  SetDisplayNameByUserIdMutationVariables,
  TryInsertClaimedCelestialDocument,
  TryInsertClaimedCelestialMutation,
  TryInsertClaimedCelestialMutationVariables,
  UpdateFreeClaimsDocument,
  UpdateFreeClaimsMutation,
  UpdateFreeClaimsMutationVariables,
} from '@idleverse/galaxy-gql';
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

  tryUpdateFreeClaims = async (id: string, free_claims: number) =>
    this.client.mutate<
      UpdateFreeClaimsMutation,
      UpdateFreeClaimsMutationVariables
    >({
      mutation: UpdateFreeClaimsDocument,
      variables: { id, free_claims },
    });

  getFreeClaimsByIdAndGalaxyById = async (userId: string, galaxyId: string) =>
    this.client.mutate<
      GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery,
      GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables
    >({
      mutation: GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsDocument,
      variables: { userId, galaxyId },
    });

  tryInsertClaimedCelestial = async (
    userId: string,
    celestialId: string,
    galaxyId: string,
    celestialName: string,
    free_claims: number
  ) =>
    this.client.mutate<
      TryInsertClaimedCelestialMutation,
      TryInsertClaimedCelestialMutationVariables
    >({
      mutation: TryInsertClaimedCelestialDocument,
      variables: {
        id: celestialId,
        owner_id: userId,
        name: celestialName,
        galaxy_id: galaxyId,
        free_claims,
      },
    });
}

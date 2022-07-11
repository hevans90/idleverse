import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GetGalaxyByIdAndUnclaimedCelestialsDocument,
  GetGalaxyByIdAndUnclaimedCelestialsQuery,
  GetGalaxyByIdAndUnclaimedCelestialsQueryVariables,
  SetDisplayNameByUserIdDocument,
  SetDisplayNameByUserIdMutation,
  SetDisplayNameByUserIdMutationVariables,
  TryInsertClaimedCelestialDocument,
  TryInsertClaimedCelestialMutation,
  TryInsertClaimedCelestialMutationVariables,
  TryInsertPlanetDocument,
  TryInsertPlanetMutation,
  TryInsertPlanetMutationVariables,
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

  getGalaxyByIdWithUnclaimedCelestials = async (
    userId: string,
    galaxyId: string
  ) =>
    this.client.query<
      GetGalaxyByIdAndUnclaimedCelestialsQuery,
      GetGalaxyByIdAndUnclaimedCelestialsQueryVariables
    >({
      query: GetGalaxyByIdAndUnclaimedCelestialsDocument,
      variables: { userId, galaxyId },
    });

  tryInsertClaimedCelestial = async (
    userId: string,
    celestialId: string,
    galaxyId: string,
    celestialName: string
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
      },
    });

  tryInsertPlanetToCelestial = async (
    variables: TryInsertPlanetMutationVariables
  ) =>
    this.client.mutate<
      TryInsertPlanetMutation,
      TryInsertPlanetMutationVariables
    >({ mutation: TryInsertPlanetDocument, variables });
}

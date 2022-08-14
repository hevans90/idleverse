import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GalacticEmpiresByGalaxyIdDocument,
  GalacticEmpiresByGalaxyIdQuery,
  GalacticEmpiresByGalaxyIdQueryVariables,
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

  getGalacticEmpiresByGalaxyId = async (galaxyId: string) =>
    this.client.query<
      GalacticEmpiresByGalaxyIdQuery,
      GalacticEmpiresByGalaxyIdQueryVariables
    >({
      query: GalacticEmpiresByGalaxyIdDocument,
      variables: { galaxyId },
    });

  getGalaxyByIdWithUnclaimedCelestials = async (galaxyId: string) =>
    this.client.query<
      GetGalaxyByIdAndUnclaimedCelestialsQuery,
      GetGalaxyByIdAndUnclaimedCelestialsQueryVariables
    >({
      query: GetGalaxyByIdAndUnclaimedCelestialsDocument,
      variables: { galaxyId },
    });

  tryInsertClaimedCelestial = async ({
    userId,
    celestialId,
    galaxyId,
    galacticEmpireId,
    celestialName,
  }: {
    userId: string;
    celestialId: string;
    galaxyId: string;
    galacticEmpireId: string;
    celestialName: string;
  }) =>
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
        galactic_empire_id: galacticEmpireId,
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

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NodeGraphqlAPI } from '@idleverse/galaxy-gql';

export class HasuraAPI {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;

  trySetDisplayName = async (id: string, display_name: string) =>
    this.client.mutate<
      NodeGraphqlAPI.SetDisplayNameByUserIdMutation,
      NodeGraphqlAPI.SetDisplayNameByUserIdMutationVariables
    >({
      mutation: NodeGraphqlAPI.SetDisplayNameByUserIdDocument,
      variables: { id, display_name },
    });

  getGalacticEmpiresByGalaxyId = async (galaxyId: string) =>
    this.client.query<
      NodeGraphqlAPI.GalacticEmpiresByGalaxyIdQuery,
      NodeGraphqlAPI.GalacticEmpiresByGalaxyIdQueryVariables
    >({
      query: NodeGraphqlAPI.GalacticEmpiresByGalaxyIdDocument,
      variables: { galaxyId },
    });

  getGalaxyByIdWithUnclaimedCelestials = async (galaxyId: string) =>
    this.client.query<
      NodeGraphqlAPI.GetGalaxyByIdAndUnclaimedCelestialsQuery,
      NodeGraphqlAPI.GetGalaxyByIdAndUnclaimedCelestialsQueryVariables
    >({
      query: NodeGraphqlAPI.GetGalaxyByIdAndUnclaimedCelestialsDocument,
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
      NodeGraphqlAPI.TryInsertClaimedCelestialMutation,
      NodeGraphqlAPI.TryInsertClaimedCelestialMutationVariables
    >({
      mutation: NodeGraphqlAPI.TryInsertClaimedCelestialDocument,
      variables: {
        id: celestialId,
        owner_id: userId,
        name: celestialName,
        galaxy_id: galaxyId,
        galactic_empire_id: galacticEmpireId,
      },
    });

  tryInsertPlanetToCelestial = async (
    variables: NodeGraphqlAPI.TryInsertPlanetMutationVariables
  ) =>
    this.client.mutate<
      NodeGraphqlAPI.TryInsertPlanetMutation,
      NodeGraphqlAPI.TryInsertPlanetMutationVariables
    >({ mutation: NodeGraphqlAPI.TryInsertPlanetDocument, variables });
}

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { NodeGraphqlAPI } from '@idleverse/galaxy-gql';
import { ResourceModification } from '../resource-modification/utils';

export class HasuraEmpireResourceModifiers {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;

  /**
   * pass negatives to decrement
   */
  incrementEmpireResources = ({
    galacticEmpireId,
    galacticCreditsIncrement,
    commonMetalsIncrement,
    rareMetalsIncrement,
    hydrocarbonsIncrement,
    voidMatterIncrement,
  }: ResourceModification) =>
    this.client.mutate<
      NodeGraphqlAPI.IncrementGalacticEmpireResourcesMutation,
      NodeGraphqlAPI.IncrementGalacticEmpireResourcesMutationVariables
    >({
      mutation: NodeGraphqlAPI.IncrementGalacticEmpireResourcesDocument,
      variables: {
        galacticEmpireId,
        galacticCreditsIncrement,
        commonMetalsIncrement,
        hydrocarbonsIncrement,
        rareMetalsIncrement,
        voidMatterIncrement,
      },
    });
}

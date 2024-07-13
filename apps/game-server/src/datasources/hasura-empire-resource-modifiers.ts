import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  IncrementGalacticEmpireResourcesDocument,
  IncrementGalacticEmpireResourcesMutation,
  IncrementGalacticEmpireResourcesMutationVariables,
} from '@idleverse/galaxy-gql';
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
      IncrementGalacticEmpireResourcesMutation,
      IncrementGalacticEmpireResourcesMutationVariables
    >({
      mutation: IncrementGalacticEmpireResourcesDocument,
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

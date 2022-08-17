import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  IncrementGalacticEmpireResourcesDocument,
  IncrementGalacticEmpireResourcesMutation,
  IncrementGalacticEmpireResourcesMutationVariables,
} from '@idleverse/galaxy-gql';
import { DataSource } from 'apollo-datasource';

export type ResourceModification = {
  galacticEmpireId: string;
  galacticCreditsIncrement: number;
  commonMetalsIncrement: number;
  rareMetalsIncrement: number;
  hydrocarbonsIncrement: number;
  voidMatterIncrement: number;
};

export type ResourceModifierKey = keyof Pick<
  ResourceModification,
  | 'galacticCreditsIncrement'
  | 'commonMetalsIncrement'
  | 'hydrocarbonsIncrement'
  | 'rareMetalsIncrement'
  | 'voidMatterIncrement'
>;

export const resourceModificationFactory = (
  initial: ResourceModification,
  key: ResourceModifierKey,
  amount: number
): ResourceModification => ({
  ...initial,
  [key]: amount,
});

export class HasuraEmpireResourceModifiers extends DataSource {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super();

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

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  CreateEmpireResourceGeneratorDocument,
  CreateEmpireResourceGeneratorMutation,
  CreateEmpireResourceGeneratorMutationVariables,
  EmpireResourceGeneratorsByTypeDocument,
  EmpireResourceGeneratorsByTypeQuery,
  EmpireResourceGeneratorsByTypeQueryVariables,
  IncrementResourceGeneratorCountDocument,
  IncrementResourceGeneratorCountMutation,
  IncrementResourceGeneratorCountMutationVariables,
  ResourceGeneratorsDocument,
  ResourceGeneratorsQuery,
} from '@idleverse/galaxy-gql';
import { DataSource } from 'apollo-datasource';

export class HasuraEmpirePurchases extends DataSource {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super();

    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;

  getResourceGenerators = async () =>
    this.client.query<ResourceGeneratorsQuery>({
      query: ResourceGeneratorsDocument,
    });

  getEmpireResourceGenerators = async ({
    galacticEmpireId,
    generatorTypeId,
  }: {
    galacticEmpireId: string;
    generatorTypeId: string;
  }) =>
    this.client.query<
      EmpireResourceGeneratorsByTypeQuery,
      EmpireResourceGeneratorsByTypeQueryVariables
    >({
      query: EmpireResourceGeneratorsByTypeDocument,
      variables: { galacticEmpireId, typeId: generatorTypeId },
    });

  incrementResourceGenerator = async ({
    galacticEmpireId,
    generatorTypeId,
    increment,
  }: {
    galacticEmpireId: string;
    generatorTypeId: string;
    increment: number;
  }) =>
    this.client.mutate<
      IncrementResourceGeneratorCountMutation,
      IncrementResourceGeneratorCountMutationVariables
    >({
      mutation: IncrementResourceGeneratorCountDocument,
      variables: {
        galacticEmpireId,
        increment,
        resourceGeneratorId: generatorTypeId,
      },
    });

  createNewResourceGenerator = async ({
    galacticEmpireId,
    generatorTypeId,
  }: {
    galacticEmpireId: string;
    generatorTypeId: string;
  }) =>
    this.client.mutate<
      CreateEmpireResourceGeneratorMutation,
      CreateEmpireResourceGeneratorMutationVariables
    >({
      mutation: CreateEmpireResourceGeneratorDocument,
      variables: { galacticEmpireId, generatorTypeId },
    });
}

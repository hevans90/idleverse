import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NodeGraphqlAPI } from '@idleverse/galaxy-gql';

export class HasuraEmpirePurchases {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;

  getEmpireResources = async ({
    galacticEmpireId,
  }: {
    galacticEmpireId: string;
  }) =>
    this.client.query<
      NodeGraphqlAPI.CurrentGalacticEmpireResourcesQuery,
      NodeGraphqlAPI.CurrentGalacticEmpireResourcesQueryVariables
    >({
      query: NodeGraphqlAPI.CurrentGalacticEmpireResourcesDocument,
      variables: { empireId: galacticEmpireId },
    });

  getResourceGenerators = async () =>
    this.client.query<NodeGraphqlAPI.ResourceGeneratorsQuery>({
      query: NodeGraphqlAPI.ResourceGeneratorsDocument,
    });

  getEmpireResourceGenerators = async ({
    galacticEmpireId,
    generatorTypeId,
  }: {
    galacticEmpireId: string;
    generatorTypeId: string;
  }) =>
    this.client.query<
      NodeGraphqlAPI.EmpireResourceGeneratorsByTypeQuery,
      NodeGraphqlAPI.EmpireResourceGeneratorsByTypeQueryVariables
    >({
      query: NodeGraphqlAPI.EmpireResourceGeneratorsByTypeDocument,
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
      NodeGraphqlAPI.IncrementResourceGeneratorCountMutation,
      NodeGraphqlAPI.IncrementResourceGeneratorCountMutationVariables
    >({
      mutation: NodeGraphqlAPI.IncrementResourceGeneratorCountDocument,
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
      NodeGraphqlAPI.CreateEmpireResourceGeneratorMutation,
      NodeGraphqlAPI.CreateEmpireResourceGeneratorMutationVariables
    >({
      mutation: NodeGraphqlAPI.CreateEmpireResourceGeneratorDocument,
      variables: { galacticEmpireId, generatorTypeId },
    });
}

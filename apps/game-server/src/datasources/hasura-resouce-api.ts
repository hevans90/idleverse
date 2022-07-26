import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  ResourceGeneratorsDocument,
  ResourceGeneratorsSubscription,
} from '@idleverse/galaxy-gql';
import { DataSource } from 'apollo-datasource';

export class HasuraResourceAPI extends DataSource {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super();

    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;

  resources = async () =>
    this.client.subscribe<ResourceGeneratorsSubscription>({
      query: ResourceGeneratorsDocument,
    });
}

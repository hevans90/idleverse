import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { DataSource } from 'apollo-datasource';

export class FoodAPI extends DataSource {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super();

    this.client = client;
  }

  client: ApolloClient<NormalizedCacheObject>;
}

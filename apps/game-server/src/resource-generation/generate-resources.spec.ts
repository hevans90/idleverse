import {
  ApolloClient,
  FetchResult,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { MockSubscriptionLink } from '@apollo/client/testing';
import { MockedSubscriptionResult } from '@apollo/client/testing/core/mocking/mockSubscriptionLink';
import {
  IncrementGalacticEmpireResourcesDocument,
  ResourceGeneratorsSubscription,
} from '@idleverse/galaxy-gql';
import { v4 as uuidv4 } from 'uuid';
import { generateResources, generationRate } from './generate-resources';

const generatorsSubResults: FetchResult<ResourceGeneratorsSubscription> = {
  data: {
    resource_generator: [
      {
        created_at: new Date().toISOString(),
        galactic_empire_id: uuidv4(),
        resource_generator_type: {
          id: uuidv4(),
          generation_rate: [1],
          name: 'mine',
          resource_type: {
            id: uuidv4(),
            type: 'common metals',
          },
          resource_type_2: null,
        },
      },
    ],
  },
};

const { galactic_empire_id, resource_generator_type } =
  generatorsSubResults.data.resource_generator[0];

const mockedSubResult: MockedSubscriptionResult = {
  result: generatorsSubResults,
};

describe('generateResources', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setInterval');
  jest.spyOn(global.console, 'log');

  let mockClient: ApolloClient<NormalizedCacheObject>;
  let link: MockSubscriptionLink;

  beforeEach(() => {
    link = new MockSubscriptionLink();

    mockClient = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });

    jest.spyOn(mockClient, 'mutate');
  });

  it('should generate resources at the correct rate and interval', async () => {
    generateResources(mockClient);
    link.simulateResult(mockedSubResult);

    expect(setInterval).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(generationRate);
    expect(mockClient.mutate).toHaveBeenCalledTimes(1);
    expect(mockClient.mutate).toHaveBeenCalledWith({
      mutation: IncrementGalacticEmpireResourcesDocument,
      variables: {
        galacticEmpireId: galactic_empire_id,
        galacticCreditsIncrement: 0,
        commonMetalsIncrement: resource_generator_type.generation_rate[0],
        hydrocarbonsIncrement: 0,
        rareMetalsIncrement: 0,
        voidMatterIncrement: 0,
      },
    });

    jest.advanceTimersByTime(generationRate);
    expect(mockClient.mutate).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(generationRate * 8);
    expect(mockClient.mutate).toHaveBeenCalledTimes(10);
  });
});

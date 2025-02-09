import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client';
import { MockSubscriptionLink } from '@apollo/client/testing';
import { MockedSubscriptionResult } from '@apollo/client/testing/core/mocking/mockSubscriptionLink';

import {
  mockApolloClient,
  mockQuery,
} from '../_test-utils/mock-apollo-client.test-util';
import { HasuraQuestProgression } from '../datasources/hasura-quest-progression';

import { NodeGraphqlAPI } from '@idleverse/galaxy-gql';
import { automaticMainQuestAssignment } from './automatic-quest-assignment';

const emptyEmpireSubResults: FetchResult<NodeGraphqlAPI.EmpiresWithoutQuestsSubscription> =
  {
    data: {
      galactic_empire_aggregate: {
        nodes: [],
      },
    },
  };
const empireSubResults: FetchResult<NodeGraphqlAPI.EmpiresWithoutQuestsSubscription> =
  {
    data: {
      galactic_empire_aggregate: {
        nodes: [
          {
            id: 'new-empire-id',
          },
        ],
      },
    },
  };

const emptyMockedSubResult: MockedSubscriptionResult = {
  result: emptyEmpireSubResults,
};

const mockedSubResult: MockedSubscriptionResult = {
  result: empireSubResults,
};

describe('automaticMainQuestAssignment', () => {
  jest.useFakeTimers();

  let mockClient: ApolloClient<NormalizedCacheObject>;
  let link: MockSubscriptionLink;

  beforeEach(() => {
    const mock = mockApolloClient();

    link = mock.link;
    mockClient = mock.client;

    jest.spyOn(mockClient, 'mutate');
  });
  it('should not call any mutations with an empty list of empires', () => {
    automaticMainQuestAssignment(
      mockClient,
      new HasuraQuestProgression(mockClient)
    );
    link.simulateResult(emptyMockedSubResult);
    expect(mockClient.mutate).not.toHaveBeenCalled();
  });
  it('should create the entry level quest for new empires', async () => {
    mockQuery<NodeGraphqlAPI.InitialMainQuestIdQuery>(mockClient, {
      quest: [
        {
          id: 'initial-main-quest-id',
          steps: [
            {
              id: 'first-step',
            },
          ],
        },
      ],
    });

    await automaticMainQuestAssignment(
      mockClient,
      new HasuraQuestProgression(mockClient)
    );

    link.simulateResult(mockedSubResult);

    jest.advanceTimersToNextTimer();

    expect(mockClient.mutate).toHaveBeenCalledTimes(1);
    expect(mockClient.mutate).toHaveBeenCalledWith({
      mutation: NodeGraphqlAPI.AddGalacticEmpireQuestDocument,
      variables: {
        input: {
          galactic_empire_id: 'new-empire-id',
          quest_id: 'initial-main-quest-id',
          quest_step_id: 'first-step',
        },
      },
    });
  });
});

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { MockSubscriptionLink } from '@apollo/client/testing';
import {
  GalacticEmpireQuestByIdQuery,
  Quest_Step_Type_Enum,
} from '@idleverse/galaxy-gql';
import { mockQuery } from '../_test-utils/mock-apollo-client.test-util';
import { mockContext } from '../_test-utils/mock-context';
import { QuestErrorTypes } from './error-enums/quest-errors';
import { QuestManagementResolver } from './quest-management';

describe('QuestManagementResolver', () => {
  let resolver: QuestManagementResolver;

  let mockClient: ApolloClient<NormalizedCacheObject>;
  let link: MockSubscriptionLink;

  beforeEach(() => {
    resolver = new QuestManagementResolver();
    link = new MockSubscriptionLink();

    mockClient = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });

    jest.spyOn(mockClient, 'mutate');
  });

  describe('completeQuest', () => {
    describe('should throw an appropriate error if: ', () => {
      it('there is no provided userID ', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: undefined,
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, undefined), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.NoUserId));
      });

      it('the quest cannot be found', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: undefined,
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, 'user-id'), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.NoQuestToComplete));
      });
      it('the related galactic empire is not found', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: {
            completed: true,
            quest_step_id: undefined,
            galactic_empire: {
              id: undefined,
              resources: [],
            },
            quest: undefined,
          },
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, 'user-id'), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.NoEmpire));
      });

      it('the quest is already completed', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: {
            completed: true,
            quest_step_id: undefined,
            galactic_empire: {
              id: 'empire-id',
              resources: [],
            },
            quest: undefined,
          },
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, 'user-id'), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.AlreadyCompleted));
      });

      it('the quest step cannot be found', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: {
            completed: false,
            quest_step_id: undefined,
            galactic_empire: {
              id: 'empire-id',
              resources: [],
            },
            quest: {
              steps: [],
              quest_type: {
                value: 'main',
              },
              rewards: [],
            },
          },
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, 'user-id'), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.NoStep));
      });
      it('the empire has no unlocked resources', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: {
            completed: false,
            quest_step_id: 'step-id',
            galactic_empire: {
              id: 'empire-id',
              resources: [],
            },
            quest: {
              steps: [
                {
                  id: 'step-id',
                  type: Quest_Step_Type_Enum.ResourceCost,
                },
              ],
              quest_type: {
                value: 'main',
              },
              rewards: [],
            },
          },
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, 'user-id'), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.NoResourcesUnlocked));
      });

      it('the empire has not unlocked the specifically required resource', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: {
            completed: false,
            quest_step_id: 'step-id',
            galactic_empire: {
              id: 'empire-id',
              resources: [
                {
                  resource_type: {
                    id: 'wrong-resource-id',
                    type: 'wrong-type',
                  },
                  value: 0,
                },
              ],
            },
            quest: {
              steps: [
                {
                  id: 'step-id',
                  type: Quest_Step_Type_Enum.ResourceCost,
                  resource_cost_id: 'correct-resource-id',
                },
              ],
              quest_type: {
                value: 'main',
              },
              rewards: [],
            },
          },
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, 'user-id'), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.ResourceNotUnlocked));
      });

      it('the empire does not have enough of the specified resource to spend to complete the quest step', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: {
            completed: false,
            quest_step_id: 'step-id',
            galactic_empire: {
              id: 'empire-id',
              resources: [
                {
                  resource_type: {
                    id: 'correct-resource-id',
                    type: 'galactic credits',
                  },
                  value: 9,
                },
              ],
            },
            quest: {
              steps: [
                {
                  id: 'step-id',
                  type: Quest_Step_Type_Enum.ResourceCost,
                  resource_cost_id: 'correct-resource-id',
                  resource_cost_amount: -10,
                },
              ],
              quest_type: {
                value: 'main',
              },
              rewards: [],
            },
          },
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, 'user-id'), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.NotEnoughResources));
      });

      it('an invalid resource is specified', async () => {
        mockQuery<GalacticEmpireQuestByIdQuery>(mockClient, {
          galactic_empire_quest_by_pk: {
            completed: false,
            quest_step_id: 'step-id',
            galactic_empire: {
              id: 'empire-id',
              resources: [
                {
                  resource_type: {
                    id: 'correct-resource-id',
                    type: 'invalid-resource-type',
                  },
                  value: 9,
                },
              ],
            },
            quest: {
              steps: [
                {
                  id: 'step-id',
                  type: Quest_Step_Type_Enum.ResourceCost,
                  resource_cost_id: 'correct-resource-id',
                  resource_cost_amount: -9,
                },
              ],
              quest_type: {
                value: 'main',
              },
              rewards: [],
            },
          },
        });
        await expect(
          resolver.completeQuest(mockContext(mockClient, 'user-id'), undefined)
        ).rejects.toEqual(new Error(QuestErrorTypes.InvalidResourceType));
      });
    });
  });
});

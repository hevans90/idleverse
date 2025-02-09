import { NodeGraphqlAPI } from '@idleverse/galaxy-gql';
import { QuestErrorTypes } from '../entities/error-enums/quest-errors';

import { ResourceErrorTypes } from '../entities/error-enums/resource-errors';
import {
  ResourceModification,
  resourceModificationFactory,
} from '../resource-modification/utils';
import {
  nullifyEmptyResourceModification,
  validateResourceModification,
} from '../resource-modification/validate-resource-modification';

export const questStepProgressionValidator = ({
  step,
  galactic_empire,
  resourceModification,
}: {
  step: NodeGraphqlAPI.GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['quest']['steps'][0];
  galactic_empire: NodeGraphqlAPI.GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['galactic_empire'];
  resourceModification: ResourceModification;
}): {
  error?: QuestErrorTypes | ResourceErrorTypes;
  resourceModification?: ResourceModification;
} => {
  switch (step.type) {
    case NodeGraphqlAPI.Quest_Step_Type_Enum.Cta:
      // no completion requirements
      break;

    case NodeGraphqlAPI.Quest_Step_Type_Enum.NpcContact:
      // no completion requirements
      break;

    case NodeGraphqlAPI.Quest_Step_Type_Enum.ResourceCost:
      {
        if (!galactic_empire.resources.length) {
          return { error: ResourceErrorTypes.NoResourcesUnlocked };
        }
        const resourceValidation = validateResourceModification({
          resources: galactic_empire.resources,
          resource_amount: -step.resource_cost_amount,
          resource_id: step.resource_cost_id,
        });

        if (resourceValidation.error) {
          return { error: resourceValidation.error };
        }

        if (resourceValidation.modifierKey) {
          resourceModification = resourceModificationFactory(
            resourceModification,
            resourceValidation.modifierKey,
            -step.resource_cost_amount
          );
        }
      }

      break;

    default:
      break;
  }

  resourceModification = nullifyEmptyResourceModification(resourceModification);

  return { resourceModification };
};

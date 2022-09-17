import { QuestErrorTypes } from '../entities/error-enums/quest-errors';

import {
  GalacticEmpireQuestByIdQuery,
  Quest_Step_Type_Enum,
} from '@idleverse/galaxy-gql';
import {
  ResourceModification,
  resourceModificationFactory,
} from '../datasources/hasura-empire-resource-modifiers';
import {
  nullifyEmptyResourceModification,
  validateResourceModification,
} from './validate-resource-modification';

export const questStepProgressionValidator = ({
  step,
  galactic_empire,
  resourceModification,
}: {
  step: GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['quest']['steps'][0];
  galactic_empire: GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['galactic_empire'];
  resourceModification: ResourceModification;
}): {
  error?: QuestErrorTypes;
  resourceModification?: ResourceModification;
} => {
  switch (step.type) {
    case Quest_Step_Type_Enum.Cta:
      // no completion requirements
      break;

    case Quest_Step_Type_Enum.NpcContact:
      // no completion requirements
      break;

    case Quest_Step_Type_Enum.ResourceCost:
      {
        if (!galactic_empire.resources.length) {
          return { error: QuestErrorTypes.NoResourcesUnlocked };
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

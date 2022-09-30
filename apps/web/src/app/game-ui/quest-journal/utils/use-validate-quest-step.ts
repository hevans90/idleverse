import { useReactiveVar } from '@apollo/client';
import { Quest_Step_Type_Enum } from '@idleverse/galaxy-gql';
import { empireResourcesVar } from '../../../_state/galactic-empire';
import { QuestStep } from './quest-step-utils';

export const useValidateQuestStep = (step: QuestStep): boolean => {
  const resources = useReactiveVar(empireResourcesVar);

  switch (step?.type) {
    case Quest_Step_Type_Enum.Cta:
      return true;

    case Quest_Step_Type_Enum.NpcContact:
      return true;

    case Quest_Step_Type_Enum.ResourceCost: {
      if (!resources.length) {
        return false;
      }

      const empireResource = resources.find(
        ({ id }) => id === step.resource_cost_id
      );

      if (empireResource && empireResource.value > step.resource_cost_amount) {
        return true;
      } else {
        return false;
      }
    }

    default:
      return false;
  }
};

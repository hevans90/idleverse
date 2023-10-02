import { GalacticEmpireQuestByIdQuery } from '@idleverse/galaxy-gql';

import { QuestErrorTypes } from '../entities/error-enums/quest-errors';
import { ResourceModification } from '../resource-modification/utils';
import {
  emptyResourceModification,
  nullifyEmptyResourceModification,
} from '../resource-modification/validate-resource-modification';
import { questStepProgressionValidator } from './quest-step-progression-validator';

/**
 * Ensures that the given quest data can proceed to a completion. Includes logic to validate that the final quest step is completable.
 */
export const questCompletionValidator = ({
  questData,
}: {
  questData: GalacticEmpireQuestByIdQuery;
}): {
  error?: QuestErrorTypes;
  resourceModification?: ResourceModification;
  resourceUnlockId?: string;
  npcUnlockId?: string;
} => {
  const {
    galactic_empire_quest_by_pk: {
      completed,
      quest_step_id,
      quest,
      galactic_empire,
    },
  } = questData;

  if (completed) {
    return { error: QuestErrorTypes.AlreadyCompleted };
  }

  const step = quest.steps.find(({ id }) => id === quest_step_id);

  if (!step) {
    return {
      error: QuestErrorTypes.NoStep,
    };
  }

  let resourceModification = emptyResourceModification(galactic_empire.id);

  let npcUnlockId: string;

  let resourceUnlockId: string;

  const stepValidation = questStepProgressionValidator({
    step,
    galactic_empire,
    resourceModification,
  });

  if (stepValidation.error) throw new Error(stepValidation.error);

  if (stepValidation.resourceModification) {
    resourceModification = stepValidation.resourceModification;
  }

  resourceModification = nullifyEmptyResourceModification(resourceModification);

  return { resourceModification, resourceUnlockId, npcUnlockId };
};

import { GalacticEmpireQuestByIdQuery } from '@idleverse/galaxy-gql';
import { ResourceModification } from '../datasources/hasura-empire-resource-modifiers';
import { questStepProgressionValidator } from './quest-step-progression-validator';
import {
  emptyResourceModification,
  nullifyEmptyResourceModification,
} from './validate-resource-modification';

/**
 * Ensures that the given quest data can proceed to a completion. Includes logic to validate that the final quest step is completable.
 */
export const questCompletionValidator = ({
  questData,
}: {
  questData: GalacticEmpireQuestByIdQuery;
}): {
  error?: string;
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
    return { error: 'Quest already completed' };
  }

  const step = quest.steps.find(({ id }) => id === quest_step_id);

  if (!step) {
    return {
      error: 'Could not find the current step to validate before completion.',
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

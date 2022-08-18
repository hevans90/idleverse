import { GalacticEmpireQuestByIdQuery } from '@idleverse/galaxy-gql';
import {
  ResourceModification,
  ResourceModifierKey,
} from '../datasources/hasura-empire-resource-modifiers';
import { QuestErrorTypes } from '../entities/error-enums/quest-errors';

export const emptyResourceModification = (
  galacticEmpireId: string
): ResourceModification => ({
  galacticEmpireId,
  commonMetalsIncrement: 0,
  galacticCreditsIncrement: 0,
  hydrocarbonsIncrement: 0,
  rareMetalsIncrement: 0,
  voidMatterIncrement: 0,
});

export const nullifyEmptyResourceModification = ({
  commonMetalsIncrement,
  galacticCreditsIncrement,
  hydrocarbonsIncrement,
  rareMetalsIncrement,
  voidMatterIncrement,
  ...rest
}: ResourceModification): ResourceModification | undefined => {
  if (
    commonMetalsIncrement === 0 &&
    galacticCreditsIncrement === 0 &&
    hydrocarbonsIncrement === 0 &&
    rareMetalsIncrement === 0 &&
    voidMatterIncrement === 0
  ) {
    return undefined;
  }
  return {
    commonMetalsIncrement,
    galacticCreditsIncrement,
    hydrocarbonsIncrement,
    rareMetalsIncrement,
    voidMatterIncrement,
    ...rest,
  };
};

/**
 * Validates that the empire's resources include the specified resource type to modify, and that (if decrementing), the user has enough to spend.
 */
export const validateResourceModification = ({
  resources,
  resource_amount,
  resource_id,
}: {
  resources: GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['galactic_empire']['resources'];
  resource_amount: number;
  resource_id: string;
}): { error?: QuestErrorTypes; modifierKey?: ResourceModifierKey } => {
  const resourceToModify = resources.find(
    ({ resource_type: { id } }) => id === resource_id
  );

  if (!resourceToModify) {
    return {
      error: QuestErrorTypes.ResourceNotUnlocked,
    };
  }

  // if decrement, and decrement amount is greater than total
  if (resource_amount < 0 && -resource_amount > resourceToModify.value) {
    return { error: QuestErrorTypes.NotEnoughResources };
  }
  let modifierKey: ResourceModifierKey;

  switch (resourceToModify.resource_type.type) {
    case 'galactic credits':
      modifierKey = 'galacticCreditsIncrement';
      break;
    case 'common metals':
      modifierKey = 'commonMetalsIncrement';
      break;
    case 'hydrocarbons':
      modifierKey = 'hydrocarbonsIncrement';
      break;
    case 'rare metals':
      modifierKey = 'rareMetalsIncrement';
      break;
    case 'void matter':
      modifierKey = 'voidMatterIncrement';
      break;

    default: {
      return {
        error: QuestErrorTypes.InvalidResourceType,
      };
    }
  }

  return { modifierKey };
};

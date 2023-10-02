import {
  CurrentGalacticEmpireResourcesQuery,
  GalacticEmpireQuestByIdQuery,
} from '@idleverse/galaxy-gql';

import { ResourceErrorTypes } from '../entities/error-enums/resource-errors';
import { ResourceModification, ResourceModifierKey } from './utils';

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
  resources:
    | GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['galactic_empire']['resources']
    | CurrentGalacticEmpireResourcesQuery['galactic_empire_resources'];
  resource_amount: number;
  resource_id: string;
}): {
  error?: ResourceErrorTypes;
  modifierKey?: ResourceModifierKey;
} => {
  const resourceToModify = resources.find(
    ({ resource_type: { id } }) => id === resource_id
  );

  if (!resourceToModify) {
    return {
      error: ResourceErrorTypes.ResourceNotUnlocked,
    };
  }

  const resourceTypeToModifierKeyMap = {
    'galactic credits': 'galacticCreditsIncrement',
    'common metals': 'commonMetalsIncrement',
    hydrocarbons: 'hydrocarbonsIncrement',
    'rare metals': 'rareMetalsIncrement',
    'void matter': 'voidMatterIncrement',
  };

  const modifierKey =
    resourceTypeToModifierKeyMap[resourceToModify.resource_type.type];

  if (!modifierKey) {
    return {
      error: ResourceErrorTypes.InvalidResourceType,
    };
  }

  if (resource_amount < 0 && -resource_amount > resourceToModify.value) {
    return { error: ResourceErrorTypes.NotEnoughResources };
  }

  return { modifierKey };
};

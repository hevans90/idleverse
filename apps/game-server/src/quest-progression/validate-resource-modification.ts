import { GalacticEmpireQuestByIdQuery } from '@idleverse/galaxy-gql';
import { ResourceModifierKey } from '../datasources/hasura-empire-resource-modifiers';

export const validateResourceModification = ({
  resources,
  resource_cost_amount,
  resource_cost_id,
}: {
  resources: GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['galactic_empire']['resources'];
  resource_cost_amount: number;
  resource_cost_id: string;
}): { error?: string; modifierKey?: ResourceModifierKey } => {
  const resourceToModify = resources.find(
    ({ resource_type: { id } }) => id === resource_cost_id
  );

  if (!resourceToModify) {
    return {
      error:
        'This empire has not yet unlocked the specified resource you tried to modify.',
    };
  }

  if (resourceToModify.value < resource_cost_amount) {
    return { error: "You don't have enough resources to spend!" };
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
        error: `Resource type: ${resourceToModify.resource_type.type} is not valid.`,
      };
    }
  }

  return { modifierKey };
};

import {
  GalacticEmpireQuestByIdQuery,
  Quest_Step_Type_Enum,
} from '@idleverse/galaxy-gql';
import { v4 as uuidv4 } from 'uuid';
import { QuestErrorTypes } from '../entities/error-enums/quest-errors';
import { questStepProgressionValidator } from './quest-step-progression-validator';
import { emptyResourceModification } from './validate-resource-modification';

type Step =
  GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['quest']['steps'][0];

type Empire =
  GalacticEmpireQuestByIdQuery['galactic_empire_quest_by_pk']['galactic_empire'];

const stepFactory = ({
  type,
  resource_cost_amount,
  resource_cost_id,
}: {
  type: Quest_Step_Type_Enum;
  resource_cost_amount?: number;
  resource_cost_id?: string;
}): Step => ({
  id: uuidv4(),
  type,
  resource_cost_amount,
  resource_cost_id,
});

const empireFactory = (
  resources: Empire['resources'],
  id?: string
): Empire => ({
  id: id || uuidv4(),
  resources,
});

describe('questStepProgressionValidator', () => {
  describe('CTA Step', () => {
    it('should return an empty resource modification', () => {
      const empireId = uuidv4();
      expect(
        questStepProgressionValidator({
          step: stepFactory({ type: Quest_Step_Type_Enum.Cta }),
          galactic_empire: empireFactory([], empireId),
          resourceModification: emptyResourceModification(empireId),
        })
      ).toEqual({ resourceModification: undefined });
    });
  });

  describe('NPC Step', () => {
    it('should return an empty resource modification', () => {
      const empireId = uuidv4();
      expect(
        questStepProgressionValidator({
          step: stepFactory({ type: Quest_Step_Type_Enum.NpcContact }),
          galactic_empire: empireFactory([], empireId),
          resourceModification: emptyResourceModification(empireId),
        })
      ).toEqual({ resourceModification: undefined });
    });
  });

  describe('Resource Step', () => {
    it('should throw an appropriate error if the empire has no resources unlocked', () => {
      const empireId = uuidv4();
      expect(
        questStepProgressionValidator({
          step: stepFactory({ type: Quest_Step_Type_Enum.ResourceCost }),
          galactic_empire: empireFactory([], empireId),
          resourceModification: emptyResourceModification(empireId),
        })
      ).toEqual({ error: QuestErrorTypes.NoResourcesUnlocked });
    });
  });

  it('should throw an appropriate error if the empire does not have the specified resource unlocked', () => {
    const resourceId = uuidv4();
    const empireId = uuidv4();
    expect(
      questStepProgressionValidator({
        step: stepFactory({
          type: Quest_Step_Type_Enum.ResourceCost,
          resource_cost_id: 'not-unlocked',
        }),
        galactic_empire: empireFactory(
          [
            {
              resource_type: {
                id: resourceId,
                type: 'galactic credits',
              },
              value: 100,
            },
          ],
          empireId
        ),
        resourceModification: emptyResourceModification(empireId),
      })
    ).toEqual({ error: QuestErrorTypes.ResourceNotUnlocked });
  });
  it('should throw an appropriate error if the empire does not have enough of the specified resource to spend', () => {
    const resourceId = uuidv4();
    const empireId = uuidv4();
    expect(
      questStepProgressionValidator({
        step: stepFactory({
          type: Quest_Step_Type_Enum.ResourceCost,
          resource_cost_id: resourceId,
          resource_cost_amount: 200,
        }),
        galactic_empire: empireFactory(
          [
            {
              resource_type: {
                id: resourceId,
                type: 'galactic credits',
              },
              value: 100,
            },
          ],
          empireId
        ),
        resourceModification: emptyResourceModification(empireId),
      })
    ).toEqual({ error: QuestErrorTypes.NotEnoughResources });
  });
  it('should return a valid resource modification', () => {
    const resourceId = uuidv4();
    const empireId = uuidv4();
    expect(
      questStepProgressionValidator({
        step: stepFactory({
          type: Quest_Step_Type_Enum.ResourceCost,
          resource_cost_id: resourceId,
          resource_cost_amount: 99,
        }),
        galactic_empire: empireFactory(
          [
            {
              resource_type: {
                id: resourceId,
                type: 'galactic credits',
              },
              value: 100,
            },
          ],
          empireId
        ),
        resourceModification: emptyResourceModification(empireId),
      })
    ).toEqual({
      resourceModification: {
        ...emptyResourceModification(empireId),
        galacticCreditsIncrement: -99,
      },
    });
  });
});

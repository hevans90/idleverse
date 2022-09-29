import { Icon, Image } from '@chakra-ui/react';
import {
  ActiveGalacticEmpireQuestsSubscription,
  NpcsQuery,
  Quest_Step_Type_Enum,
  ResourcesQuery,
} from '@idleverse/galaxy-gql';
import { IconType } from 'react-icons/lib';

type Steps =
  ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest'][0]['quest']['steps'];

export type QuestStep = Steps[0];

type OrderedQuestStep = QuestStep & { index: number };

export type OrderedQuestStepWithIcon = OrderedQuestStep & { icon: IconType };

export const orderSteps = (steps: Steps) => {
  const orderedSteps: OrderedQuestStep[] = [];

  const crawl = (step: QuestStep, steps: QuestStep[], index = 0) => {
    if (!step.next_step_in_quest) {
      orderedSteps.push({ ...step, index });
      return;
    }

    const nextStep = steps.find(({ id }) => id === step.next_step_in_quest);

    if (!nextStep) {
      throw new Error('Something went wrong');
    }

    orderedSteps.push({ ...step, index });
    crawl(nextStep, steps, index + 1);
  };

  const initial = steps.find(({ initial }) => !!initial);
  crawl(initial, steps);
  return orderedSteps.sort((a, b) => a.index - b.index);
};

const customIcon =
  (src: string): IconType =>
  () =>
    <Icon as={Image} boxSize="35px" src={src} />;

export const generateStepIcon = (
  step: OrderedQuestStep,
  npcs: NpcsQuery['npc'],
  resources: ResourcesQuery['resource_type']
): OrderedQuestStepWithIcon => {
  const placeholder = '/placeholders/75x75-circle.png';

  switch (step.type) {
    case Quest_Step_Type_Enum.Cta:
      return { ...step, icon: customIcon(placeholder) };
    case Quest_Step_Type_Enum.NpcContact: {
      const npc = npcs.find(({ id }) => id === step?.npc_contact_id);

      if (npc) {
        return { ...step, icon: customIcon(npc.image_url) };
      } else {
        return { ...step, icon: customIcon(placeholder) };
      }
    }
    case Quest_Step_Type_Enum.ResourceCost: {
      const resource = resources.find(
        ({ id }) => id === step?.resource_cost_id
      );

      if (resource) {
        return { ...step, icon: customIcon(resource.image_url) };
      } else {
        return { ...step, icon: customIcon(placeholder) };
      }
    }
    default:
      return { ...step, icon: customIcon(placeholder) };
  }
};

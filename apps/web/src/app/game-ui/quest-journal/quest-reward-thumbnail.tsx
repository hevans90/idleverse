import { useReactiveVar } from '@apollo/client';
import {
  Avatar,
  AvatarGroup,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  ActiveGalacticEmpireQuestsSubscription,
  Quest_Reward_Type_Enum,
} from '@idleverse/galaxy-gql';
import { Fragment } from 'react';
import { useUiBackground } from '../../hooks/use-ui-background';
import { npcsVar } from '../../_state/npcs';
import { resourcesVar } from '../../_state/resources';

export const QuestRewardThumbnails = ({
  rewards,
}: {
  rewards: ActiveGalacticEmpireQuestsSubscription['galactic_empire_quest'][0]['quest']['rewards'];
}) => {
  const thumbnails = (
    type: Quest_Reward_Type_Enum,
    npcId: string,
    resourceId: string,
    resourceAccrualId: string,
    resourceAccrualAmount: number
  ) => {
    const funcs: { [key in Quest_Reward_Type_Enum]: () => JSX.Element } = {
      npc_unlock: () => <NpcUnlockThumbnail npcId={npcId} />,
      resource_unlock: () => (
        <ResourceUnlockThumbnail resourceId={resourceId} />
      ),
      resource_accrual: () => (
        <ResourceAccrualThumbnail
          resourceId={resourceAccrualId}
          amount={resourceAccrualAmount}
        />
      ),
    };

    return funcs[type]();
  };

  return (
    <AvatarGroup>
      {rewards?.map(
        (
          {
            type,
            npc_unlock_id,
            resource_unlock_id,
            resource_accrual_type_id,
            resource_accrual_amount,
          },
          i
        ) => (
          <Fragment key={i}>
            {thumbnails(
              type,
              npc_unlock_id,
              resource_unlock_id,
              resource_accrual_type_id,
              resource_accrual_amount
            )}
          </Fragment>
        )
      )}
    </AvatarGroup>
  );
};

const RewardThumbnail = ({
  type,
  tooltip,
  image_url,
  amount,
}: {
  type: 'stack' | 'solo';
  tooltip: string;
  image_url: string;
  amount?: number;
}) => {
  const { bgLight } = useUiBackground();
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Tooltip fontSize="xs" bg={bgLight} color={color} label={tooltip}>
      {type === 'solo' ? (
        <Avatar src={image_url} name={tooltip} />
      ) : (
        <HStack>
          <Text>{amount}</Text>
          <Avatar src={image_url} name={tooltip} />
        </HStack>
      )}
    </Tooltip>
  );
};

const NpcUnlockThumbnail = ({ npcId }: { npcId: string }) => {
  const npcs = useReactiveVar(npcsVar);

  const npc = npcs?.find(({ id }) => id === npcId);

  return (
    <RewardThumbnail
      type="solo"
      tooltip={`Unlocks NPC: ${npc?.name}`}
      image_url={npc?.image_url}
    />
  );
};

const ResourceUnlockThumbnail = ({ resourceId }: { resourceId: string }) => {
  const resources = useReactiveVar(resourcesVar);

  const resource = resources.find(({ id }) => id === resourceId);

  return (
    <RewardThumbnail
      type="solo"
      tooltip={`Unlocks ${resource?.type}`}
      image_url={resource?.image_url_pixel}
    />
  );
};

const ResourceAccrualThumbnail = ({
  resourceId,
  amount,
}: {
  resourceId: string;
  amount: number;
}) => {
  const resources = useReactiveVar(resourcesVar);

  const resource = resources.find(({ id }) => id === resourceId);

  return (
    <RewardThumbnail
      type="stack"
      amount={amount}
      tooltip={`Grants ${amount} ${resource?.type}`}
      image_url={resource?.image_url_pixel}
    />
  );
};

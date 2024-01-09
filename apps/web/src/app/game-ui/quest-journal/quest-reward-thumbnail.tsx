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
import { npcsVar, resourcesVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { Fragment } from 'react';

export const QuestRewardThumbnails = ({
  rewards,
  detail,
}: {
  detail: boolean;
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
      npc_unlock: () => <NpcUnlockThumbnail detail={detail} npcId={npcId} />,
      resource_unlock: () => (
        <ResourceUnlockThumbnail detail={detail} resourceId={resourceId} />
      ),
      resource_accrual: () => (
        <ResourceAccrualThumbnail
          detail={detail}
          resourceId={resourceAccrualId}
          amount={resourceAccrualAmount}
        />
      ),
    };

    return funcs[type]();
  };

  return (
    <AvatarGroup width="100%">
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
  detail,
}: {
  type: 'stack' | 'solo';
  tooltip: string;
  image_url: string;
  amount?: number;
  detail: boolean;
}) => {
  const { bgLight } = useUiBackground();
  const color = useColorModeValue('gray.800', 'white');

  return detail ? (
    <HStack width="100%" justifyContent="end" padding={2}>
      <Text mr={5}>{tooltip}</Text>
      <Avatar size={['md', 'lg']} src={image_url} name={tooltip} />
    </HStack>
  ) : (
    <Tooltip
      fontSize="2xs"
      bg={bgLight}
      color={color}
      label={tooltip}
      padding={2}
      maxWidth="unset"
    >
      {type === 'solo' ? (
        <Avatar src={image_url} name={tooltip} />
      ) : (
        <HStack>
          <Text fontSize="xs">{amount}</Text>
          <Avatar src={image_url} name={tooltip} />
        </HStack>
      )}
    </Tooltip>
  );
};

const NpcUnlockThumbnail = ({
  npcId,
  detail,
}: {
  detail: boolean;
  npcId: string;
}) => {
  const npcs = useReactiveVar(npcsVar);

  const npc = npcs?.find(({ id }) => id === npcId);

  return (
    <RewardThumbnail
      detail={detail}
      type="solo"
      tooltip={`Unlocks NPC: ${npc?.name}`}
      image_url={npc?.image_url}
    />
  );
};

const ResourceUnlockThumbnail = ({
  resourceId,
  detail,
}: {
  resourceId: string;
  detail: boolean;
}) => {
  const resources = useReactiveVar(resourcesVar);

  const resource = resources.find(({ id }) => id === resourceId);

  return (
    <RewardThumbnail
      detail={detail}
      type="solo"
      tooltip={`Unlocks Resource: ${resource?.type}`}
      image_url={resource?.image_url_pixel}
    />
  );
};

const ResourceAccrualThumbnail = ({
  resourceId,
  amount,
  detail,
}: {
  resourceId: string;
  amount: number;
  detail: boolean;
}) => {
  const resources = useReactiveVar(resourcesVar);

  const resource = resources.find(({ id }) => id === resourceId);

  return (
    <RewardThumbnail
      detail={detail}
      type="stack"
      amount={amount}
      tooltip={`Grants ${amount} ${resource?.type}`}
      image_url={resource?.image_url_pixel}
    />
  );
};

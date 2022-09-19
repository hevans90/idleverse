import { useReactiveVar } from '@apollo/client';
import { Avatar, AvatarGroup, HStack, Text } from '@chakra-ui/react';
import {
  ActiveGalacticEmpireQuestsSubscription,
  Quest_Reward_Type_Enum,
} from '@idleverse/galaxy-gql';
import { Fragment } from 'react';
import { empireResources } from '../../_state/galactic-empire';
import { npcsVar } from '../../_state/npcs';

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

const NpcUnlockThumbnail = ({ npcId }: { npcId: string }) => {
  const npcs = useReactiveVar(npcsVar);

  const npc = npcs?.find(({ id }) => id === npcId);

  return <Avatar src={npc?.image_url} name={`Unlocks ${npc?.name}`} />;
};

const ResourceUnlockThumbnail = ({ resourceId }: { resourceId: string }) => {
  const resources = useReactiveVar(empireResources);

  const resource = resources.find(({ id }) => id === resourceId);

  return <Avatar size="sm" name={`Unlocks ${resource?.resource_type?.type}`} />;
};

const ResourceAccrualThumbnail = ({
  resourceId,
  amount,
}: {
  resourceId: string;
  amount: number;
}) => {
  const resources = useReactiveVar(empireResources);

  const resource = resources.find(({ id }) => id === resourceId);

  return (
    <HStack>
      <Text>{amount}</Text>
      <Avatar
        size="sm"
        name={`Gain ${amount} ${resource?.resource_type?.type}`}
      />
    </HStack>
  );
};

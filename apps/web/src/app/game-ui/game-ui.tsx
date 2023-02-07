/* eslint-disable react/jsx-no-useless-fragment */
import { useReactiveVar } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';
import { dialogVar } from '../_state/dialog';
import { globalUiVar } from '../_state/global-ui';
import { BREADCRUMB_HEIGHT } from '../components/breadcrumb';
import { useKeypress } from '../hooks/use-keypress';
import { useRealtimeEmpireUpdates } from '../hooks/use-realtime-empire-updates';
import { Dialog } from './dialog';
import { InGameMenu } from './in-game-menu';
import { NpcContact } from './npc-contact/npc-contact';
import { QuestJournal } from './quest-journal/quest-journal';
import { QuestOverlay } from './quest-overlay';
import { ResourceBar } from './resource-bar';
import { ResourceOverview } from './resource-overview/resource-overview';

export const GameUI = ({ empireId }: { empireId: string }) => {
  const { entries } = useReactiveVar(dialogVar);

  const { questJournalOpen, npcContactOpen, resourceOverviewOpen } =
    useReactiveVar(globalUiVar);

  useRealtimeEmpireUpdates(empireId);

  useKeypress('KeyJ', () => {
    if (!questJournalOpen) {
      onQuestJournalOpen();
      globalUiVar({ ...globalUiVar(), questJournalOpen: true });
    } else {
      globalUiVar({ ...globalUiVar(), questJournalOpen: false });
    }
  });
  useKeypress('KeyD', () => {
    if (!npcContactOpen) {
      onNpcContactOpen();
      globalUiVar({ ...globalUiVar(), npcContactOpen: true });
    } else {
      globalUiVar({ ...globalUiVar(), npcContactOpen: false });
    }
  });
  useKeypress('KeyR', () => {
    if (!resourceOverviewOpen) {
      onResourceOverviewOpen();
      globalUiVar({ ...globalUiVar(), resourceOverviewOpen: true });
    } else {
      globalUiVar({ ...globalUiVar(), resourceOverviewOpen: false });
    }
  });

  const { onOpen: onQuestJournalOpen, onClose: onQuestJournalClose } =
    useDisclosure();

  const { onOpen: onNpcContactOpen, onClose: onNpcContactClose } =
    useDisclosure();

  const { onOpen: onResourceOverviewOpen, onClose: onResourceOverviewClose } =
    useDisclosure();

  return (
    <>
      {empireId && (
        <>
          <InGameMenu position="absolute" bottom="40vh" left={0} />
          <QuestJournal
            isOpen={questJournalOpen}
            onClose={() => {
              globalUiVar({ ...globalUiVar(), questJournalOpen: false });
              onQuestJournalClose();
            }}
          />
          <NpcContact
            isOpen={npcContactOpen}
            onClose={() => {
              globalUiVar({ ...globalUiVar(), npcContactOpen: false });
              onNpcContactClose();
            }}
          />
          <ResourceOverview
            isOpen={resourceOverviewOpen}
            onClose={() => {
              globalUiVar({ ...globalUiVar(), resourceOverviewOpen: false });
              onResourceOverviewClose();
            }}
          />
          <Dialog entries={entries} position="absolute" bottom={0} left={0} />

          <ResourceBar
            position="absolute"
            top={[0, 0, BREADCRUMB_HEIGHT]}
            left={0}
          />

          <QuestOverlay
            position="absolute"
            top={0}
            right={0}
            borderWidth="1px"
            borderTopWidth={0}
            borderRightWidth={0}
          />
        </>
      )}
    </>
  );
};

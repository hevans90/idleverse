import { useReactiveVar } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';
import { useKeypress } from '../hooks/use-keypress';
import { dialogVar } from '../_state/dialog';
import { globalUiVar } from '../_state/global-ui';
import { Dialog } from './dialog';
import { InGameMenu } from './in-game-menu';
import { NpcContact } from './npc-contact/npc-contact';
import { QuestJournal } from './quest-journal/quest-journal';

export const GameUI = () => {
  const { entries } = useReactiveVar(dialogVar);

  const { questJournalOpen, npcContactOpen } = useReactiveVar(globalUiVar);

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

  const { onOpen: onQuestJournalOpen, onClose: onQuestJournalClose } =
    useDisclosure();

  const { onOpen: onNpcContactOpen, onClose: onNpcContactClose } =
    useDisclosure();

  return (
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
      <Dialog
        entries={entries}
        position="absolute"
        bottom={0}
        left={0}
      ></Dialog>
    </>
  );
};

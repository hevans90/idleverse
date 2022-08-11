import { useReactiveVar } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';
import { useKeypress } from '../hooks/use-keypress';
import { dialogVar } from '../_state/dialog';
import { globalUiVar } from '../_state/global-ui';
import { Dialog } from './dialog';
import { InGameMenu } from './in-game-menu';
import { QuestJournal } from './quest-journal';

export const GameUI = () => {
  const { entries } = useReactiveVar(dialogVar);

  const { questJournalOpen } = useReactiveVar(globalUiVar);

  useKeypress('KeyJ', () => {
    if (!questJournalOpen) {
      onQuestJournalOpen();
      globalUiVar({ ...globalUiVar(), questJournalOpen: true });
    } else {
      globalUiVar({ ...globalUiVar(), questJournalOpen: false });
    }
  });

  const { onOpen: onQuestJournalOpen, onClose: onQuestJournalClose } =
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
      <Dialog
        entries={entries}
        position="absolute"
        bottom={0}
        left={0}
      ></Dialog>
    </>
  );
};

import { useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  HStack,
  Image,
  Kbd,
  keyframes,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { DialogEntry, dialogVar, hotkeyHintsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { useKeypress } from '../hooks/use-keypress';

type DialogProps = StackProps & {
  //
};

const prequelWaitTime = 0.3;
const characterWaitTime = 0.01;

export const Dialog = ({ ...stackProps }: DialogProps) => {
  const { bg, border } = useUiBackground();
  const { open, entries } = useReactiveVar(dialogVar);

  const [activeEntryIndex, setActiveEntryIndex] = useState<number>(0);
  const [activeEntryStepIndex, setActiveEntryStepIndex] = useState<number>(0);
  const [activeEntry, setActiveEntry] = useState<DialogEntry>();

  // milliseconds
  const [currentEntryAnimationLength, setCurrentEntryAnimationLength] =
    useState<number>(0);

  const [animation, setAnimation] = useState<string>('');

  const endOfDialogText = useRef<HTMLDivElement>(null);

  const hotkeyHints = useReactiveVar(hotkeyHintsVar);

  useKeypress('Space', () => continueDialog());

  const continueDialog = () => {
    if (activeEntryStepIndex === activeEntry.steps.length - 1) {
      // end of entry, check if there is a next entry
      if (activeEntryIndex === entries.length - 1) {
        // END OF DIALOG
        dialogVar({ ...dialogVar(), open: false });
      } else {
        setActiveEntryIndex((prev) => prev + 1);
        setActiveEntry(entries[activeEntryIndex + 1]);
        setActiveEntryStepIndex(0);
      }
    } else {
      setActiveEntryStepIndex((prev) => prev + 1);
    }
  };

  const scrollToBottom = () =>
    setTimeout(() =>
      endOfDialogText.current?.scrollIntoView({
        behavior: 'smooth',
      })
    );

  useEffect(() => {
    if (entries?.length) {
      setActiveEntry(entries[0]);
    }
  }, [entries]);

  useEffect(() => {
    if (activeEntry) {
      const topLayer = keyframes`
    from { background-size: 0 200%; }
  `;
      const bottomLayer = keyframes`
    50% { background-position: 0 -100%,0 0; }
  `;
      let duration =
        activeEntry.steps[activeEntryStepIndex].length * characterWaitTime;
      if (activeEntry?.audio) {
        duration = activeEntry.audio.metadata.duration;
      }
      setAnimation(undefined);
      setAnimation(
        `
       ${bottomLayer} ${prequelWaitTime}s infinite steps(1), 
       ${topLayer} calc(${duration}s) steps(${activeEntry.steps[activeEntryStepIndex].length}) forwards
      `
      );

      const animationLength =
        prequelWaitTime +
        activeEntry.steps[activeEntryStepIndex].length *
          characterWaitTime *
          1000;

      setCurrentEntryAnimationLength(animationLength);

      const startTime = new Date().getTime();

      setTimeout(() => {
        const interval = setInterval(function () {
          if (new Date().getTime() - startTime > animationLength + 750) {
            clearInterval(interval);
            return;
          }
          scrollToBottom();
        }, 500);
      }, activeEntry.steps[activeEntryStepIndex].length * 4);
    }
  }, [activeEntry, activeEntryIndex, activeEntryStepIndex]);

  if (open && activeEntry) {
    return (
      <HStack
        {...stackProps}
        bgColor={bg}
        borderWidth="1px"
        borderStyle="solid"
        borderColor={border}
        width="100%"
        alignItems="flex-start"
        divider={
          <StackDivider borderColor={border} margin="unset !important" />
        }
        maxHeight="md"
      >
        <VStack padding={3} maxWidth="175px" minWidth="175px">
          <Image
            boxSize={150}
            src={activeEntry?.imageUrl}
            fallbackSrc="/placeholders/150x150.png"
          />
          <Text textAlign="center">{activeEntry?.speakerName}</Text>
        </VStack>

        <VStack
          divider={
            <StackDivider borderColor={border} margin="unset !important" />
          }
          flexGrow={1}
        >
          <Box
            padding={2}
            maxHeight="200px"
            minHeight="200px"
            overflow="auto"
            width="100%"
          >
            <Text
              key={+new Date()}
              as="span"
              color="#0000"
              background="
            linear-gradient(-90deg,#FFFF 5px,#0000 0) 10px 0,
            linear-gradient(#FFFF 0 0) 0 0"
              backgroundSize={`calc(${activeEntry.steps[activeEntryStepIndex]?.length}*1ch) 200%`}
              backgroundClip="padding-box, text"
              backgroundRepeat="no-repeat"
              animation={animation}
            >
              {activeEntry?.steps[activeEntryStepIndex]}
            </Text>
            <Box ref={endOfDialogText} height="2ch"></Box>
          </Box>
          <HStack width="100%" justifyContent="end" padding={2}>
            <Button onClick={continueDialog}>
              {activeEntryIndex === entries.length - 1 ? 'Done' : 'Continue'}
              {hotkeyHints && (
                <>
                  &nbsp;<Kbd>Space</Kbd>
                </>
              )}
            </Button>
          </HStack>
        </VStack>
      </HStack>
    );
  }
};

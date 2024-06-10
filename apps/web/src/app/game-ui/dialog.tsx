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
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { DialogEntry, dialogVar, hotkeyHintsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import {
  responsiveFontProps,
  smallSubHeaderResponsiveFontProps,
} from '../_responsive-utils/font-props';
import { useKeypress } from '../hooks/use-keypress';

export const DIALOG_HEIGHT = 230;

type DialogProps = StackProps & {
  //
  onDialogEnded?: () => void;
};

const prequelWaitTime = 0.3;
const characterWaitTime = 0.01;

export const Dialog = ({ onDialogEnded, ...stackProps }: DialogProps) => {
  const { bg, bgDark, border } = useUiBackground();
  const { open, entries } = useReactiveVar(dialogVar);

  const bp: 'small' | 'medium' | 'large' = useBreakpointValue({
    base: 'small',
    md: 'medium',
    lg: 'large',
  });

  const isMobile = bp === 'small';

  const [activeEntryIndex, setActiveEntryIndex] = useState<number>(0);
  const [activeEntryStepIndex, setActiveEntryStepIndex] = useState<number>(0);
  const [activeEntry, setActiveEntry] = useState<DialogEntry>();

  // milliseconds
  const [currentEntryAnimationLength, setCurrentEntryAnimationLength] =
    useState<number>(0);

  const [animation, setAnimation] = useState<string>('');

  const endOfDialogText = useRef<HTMLDivElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  const hotkeyHints = useReactiveVar(hotkeyHintsVar);

  useKeypress('Space', () => continueDialog());

  const continueDialog = () => {
    if (activeEntryStepIndex === activeEntry.steps.length - 1) {
      // end of entry, check if there is a next entry
      if (activeEntryIndex === entries.length - 1) {
        // END OF DIALOG
        dialogVar({ ...dialogVar(), open: false });

        if (onDialogEnded) onDialogEnded();
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

  const currentText = useMemo(
    () => activeEntry?.steps[activeEntryStepIndex],
    [activeEntry, activeEntryStepIndex]
  );

  useEffect(() => {
    if (entries?.length) {
      setActiveEntry(entries[0]);
    }
  }, [entries, open]);

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

      const animationLength = prequelWaitTime + duration * 1000;

      setCurrentEntryAnimationLength(animationLength);

      continueButtonRef?.current?.focus();

      // const startTime = new Date().getTime();

      // console.log('nice');

      // setTimeout(() => {
      //   const interval = setInterval(function () {
      //     if (new Date().getTime() - startTime > animationLength + 750) {
      //       clearInterval(interval);
      //       return;
      //     }
      //     scrollToBottom();
      //   }, 500);
      // }, activeEntry.steps[activeEntryStepIndex].length * 4);
    }
  }, [activeEntry, activeEntryIndex, activeEntryStepIndex]);

  if (open && activeEntry) {
    return (
      <HStack
        height={DIALOG_HEIGHT}
        bgColor={bg}
        borderWidth={1}
        borderStyle="solid"
        borderColor={border}
        width={['100vw', '100%']}
        maxWidth={1920}
        alignItems="flex-start"
        divider={
          <StackDivider borderColor={border} margin="unset !important" />
        }
        maxHeight="md"
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        marginLeft="auto"
        marginRight="auto"
        {...stackProps}
      >
        <VStack minWidth={[0, 170]} display={['none', 'flex']}>
          <Image
            bg={bgDark}
            boxSize={[140, 170]}
            objectFit="cover"
            src={activeEntry?.imageUrl}
            fallbackSrc="/placeholders/150x150.png"
          />
          <Text textAlign="center" {...smallSubHeaderResponsiveFontProps}>
            {activeEntry?.speakerName}
          </Text>
        </VStack>

        <VStack
          height="100%"
          divider={
            <StackDivider borderColor={border} margin="unset !important" />
          }
        >
          <Box
            padding={2}
            maxHeight={170}
            overflow="auto"
            width="100%"
            flexGrow={1}
          >
            <Text
              key={activeEntry.steps?.[0]}
              as="span"
              color="#0000"
              background="
            linear-gradient(-90deg,#FFFF 5px,#0000 0) 10px 0,
            linear-gradient(#FFFF 0 0) 0 0"
              backgroundSize={`calc(${activeEntry.steps[activeEntryStepIndex]?.length}*1ch) 200%`}
              backgroundClip="padding-box, text"
              backgroundRepeat="no-repeat"
              animation={animation}
              {...responsiveFontProps}
            >
              {currentText}
            </Text>
            <Box ref={endOfDialogText} height="2ch"></Box>
          </Box>
          <HStack width="100%" justifyContent="end" padding={2}>
            <Button
              autoFocus
              onClick={continueDialog}
              ref={continueButtonRef}
              {...responsiveFontProps}
            >
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

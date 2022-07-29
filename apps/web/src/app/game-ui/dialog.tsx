import {
  Box,
  HStack,
  Image,
  keyframes,
  StackDivider,
  StackProps,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type DialogProps = StackProps & {
  entries: DialogEntry[];
};

export type DialogEntry = {
  speakerName: string;
  imageUrl: string;
  steps: string[];
};

export const Dialog = ({ entries, ...stackProps }: DialogProps) => {
  const bg = useColorModeValue('gray.300', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

  const [activeEntry, setActiveEntry] = useState<DialogEntry>(entries?.[0]);
  const [activeText, setActiveText] = useState<string>(entries?.[0].steps[0]);

  const [animation, setAnimation] = useState<string>('');

  useEffect(() => {
    const topLayer = keyframes`
    from { background-size: 0 200%; }
  `;
    const bottomLayer = keyframes`
    50% { background-position: 0 -100%,0 0; }
  `;
    setAnimation(
      `${bottomLayer} .7s infinite steps(1), ${topLayer} calc(${activeText.length}*.1s) steps(${activeText.length}) forwards`
    );
  }, [activeText]);

  return (
    <HStack
      {...stackProps}
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      width="100%"
      alignItems="flex-start"
      divider={<StackDivider borderColor="gray.600" />}
    >
      <VStack padding={2}>
        <Image
          boxSize={150}
          src={activeEntry?.imageUrl}
          fallbackSrc="/placeholders/150x150.png"
        />
        <Text>{activeEntry?.speakerName}</Text>
      </VStack>

      <Box padding={2}>
        <Text
          as="span"
          color="#0000"
          background="
            linear-gradient(-90deg,#FFFF 5px,#0000 0) 10px 0,
            linear-gradient(#FFFF 0 0) 0 0"
          backgroundSize={`calc(${activeText.length}*1ch) 200%`}
          backgroundClip="padding-box, text"
          backgroundRepeat="no-repeat"
          animation={animation}
        >
          {activeEntry?.steps[0]}
        </Text>
      </Box>
    </HStack>
  );
};

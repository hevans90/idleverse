import { Box, Text, TypographyProps } from '@chakra-ui/react';
import { useUiBackground } from '@idleverse/theme';
import { BlinkingText } from '@idleverse/ui';

type LoadingProps = {
  height?: string;
  width?: string;
  text?: string;
  fontSize?: TypographyProps['fontSize'];
};

export const Loading = ({
  height = '100vh',
  width = '100vw',
  text = 'Loading',
  fontSize = ['md', '2xl', '3xl', '4xl'],
}: LoadingProps | undefined) => {
  const { bgDark } = useUiBackground();

  return (
    <Box
      bg={bgDark}
      height={height}
      width={width}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Text fontSize={fontSize} position="relative">
        {text}
      </Text>
      <BlinkingText fontSize={fontSize} interval={0.5}>
        .
      </BlinkingText>
    </Box>
  );
};

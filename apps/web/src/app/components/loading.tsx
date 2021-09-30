import { Box, Text, TypographyProps } from '@chakra-ui/react';

type LoadingProps = {
  height?: string;
  width?: string;
  text?: string;
  fontSize?: TypographyProps['fontSize'];
};

export const Loading = ({
  height = '100vh',
  width = '100vw',
  text = 'Loading...',
  fontSize = '4xl',
}: LoadingProps | undefined) => (
  <Box
    height={height}
    width={width}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text fontSize={fontSize}>{text}</Text>
  </Box>
);

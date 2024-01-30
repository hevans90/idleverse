import { keyframes, Text, TypographyProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const BlinkingText = ({
  children,
  interval = 1,
  fontSize = ['md', '2xl', '3xl', '4xl'],
}: {
  children?: ReactNode;
  interval?: number;
  fontSize?: TypographyProps['fontSize'];
}) => {
  const blinker = keyframes`
    0%   { opacity: 1; }
    49%  { opacity: 1; }
    50%  { opacity: 0; }
    100% { opacity: 0; }
  `;

  return (
    <Text
      as="span"
      fontSize={fontSize}
      animation={`${interval}s ${blinker} normal infinite`}
    >
      {children}
    </Text>
  );
};

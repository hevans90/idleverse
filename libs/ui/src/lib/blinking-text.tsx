import { keyframes, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const BlinkingText = ({
  children,
  interval = 1,
}: {
  children?: ReactNode;
  interval?: number;
}) => {
  const blinker = keyframes`
    0%   { opacity: 1; }
    49%  { opacity: 1; }
    50%  { opacity: 0; }
    100% { opacity: 0; }
  `;

  return (
    <Text as="span" animation={`${interval}s ${blinker} normal infinite`}>
      {children}
    </Text>
  );
};

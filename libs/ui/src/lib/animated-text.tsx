import { FC } from 'react';

import { Animator } from '@arwes/react-animator';
import { Text as ArwesText } from '@arwes/react-text';

import { useReactiveVar } from '@apollo/client';
import { Text, TextProps, Theme, useColorMode } from '@chakra-ui/react';
import { colorsVar } from '@idleverse/state';
import { colors, defaultShades, fontSizes } from '@idleverse/theme';

export const AnimatedText: FC<TextProps> = ({
  fontSize,
  children,
  ...rest
}: TextProps) => {
  const { primary } = useReactiveVar(colorsVar);
  const { colorMode } = useColorMode();

  const textColor: string =
    colors[primary][
      colorMode === 'dark' ? defaultShades.dark.text : defaultShades.light.text
    ];

  return (
    <Animator active={true}>
      <ArwesText
        manager="decipher"
        easing="outSine"
        fixed
        style={{
          color: textColor,
          fontSize: fontSizes[(fontSize as keyof Theme['fontSizes']) ?? 'md'],
        }}
      >
        <Text fontSize={fontSize} {...rest}>
          {children}
        </Text>
      </ArwesText>
    </Animator>
  );
};

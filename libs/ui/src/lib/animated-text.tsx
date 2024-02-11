import { FC } from 'react';

import { Animator } from '@arwes/react-animator';
import {
  Text as ArwesText,
  TextProps as ArwesTextProps,
} from '@arwes/react-text';

import { useReactiveVar } from '@apollo/client';
import { Text, TextProps, Theme, VStack, useColorMode } from '@chakra-ui/react';
import { colorsVar } from '@idleverse/state';
import { colors, defaultShades, fontSizes } from '@idleverse/theme';

import { AnimatorDuration, TextTransitionManager } from '@arwes/react';

type AnimatedTextProps = TextProps & {
  content: string;
  animationType?: TextTransitionManager;
  duration?: Partial<AnimatorDuration>;
};

export const AnimatedText: FC<AnimatedTextProps> = ({
  fontSize,
  children,
  animationType = 'sequence',
  duration = { enter: 1, exit: 2 },
  content,
  ...rest
}: AnimatedTextProps) => {
  const { primary } = useReactiveVar(colorsVar);
  const { colorMode } = useColorMode();

  const textColor: string =
    colors[primary][
      colorMode === 'dark' ? defaultShades.dark.text : defaultShades.light.text
    ];

  const defaultTextProps: Partial<ArwesTextProps> = {
    manager: animationType,
    fixed: true,
    style: {
      color: textColor,
      fontSize: fontSizes[(fontSize as keyof Theme['fontSizes']) ?? 'md'],
    },
  };

  const paragraphs = content
    .split('<br/> <br/>')
    .map((paragraph) => paragraph.trim());

  const totalContentLength = paragraphs.join(' ').length;

  return paragraphs.length === 1 ? (
    <Animator active duration={duration}>
      <ArwesText {...defaultTextProps}>
        <Text as="span" whiteSpace="pre-line" fontSize={fontSize} {...rest}>
          {content}
          {children}
        </Text>
      </ArwesText>
    </Animator>
  ) : (
    <Animator active manager="sequence">
      <VStack>
        {paragraphs.map((paragraph, i) => (
          <Animator
            key={i}
            duration={{
              enter:
                (paragraph.length / totalContentLength) * (duration.enter ?? 1),
            }}
          >
            <ArwesText {...defaultTextProps}>
              <Text as="span" fontSize={fontSize} {...rest}>
                {paragraph}
              </Text>
            </ArwesText>
          </Animator>
        ))}
      </VStack>
    </Animator>
  );
};

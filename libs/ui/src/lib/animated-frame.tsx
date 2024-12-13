import { FrameSVGOctagonProps } from '@arwes/react';
import { Animator } from '@arwes/react-animator';
import {
  FrameSVGOctagon,
  useFrameSVGAssemblingAnimation,
} from '@arwes/react-frames';
import { Box } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/react';
import { css } from '@emotion/react';

import { useUiBackground } from '@idleverse/theme';
import { ReactNode, useRef } from 'react';

const AnimatedFrameContent = ({
  children,
  bg,
  border,
  borderStrokeWidth = 1,
  show,
  containerProps,
  ...rest
}: {
  children?: ReactNode;
  bg?: string;
  border?: string;
  borderStrokeWidth?: number;
  show: boolean;
  containerProps?: HTMLChakraProps<'div'>;
} & FrameSVGOctagonProps) => {
  const { rawBg, rawBorder } = useUiBackground();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  return (
    <Box
      flexGrow={1}
      position="relative"
      p="1rem"
      width="100%"
      height="100%"
      css={css`
        [data-name='bg'] {
          color: ${bg ?? rawBg};
        }
        [data-name='line'] {
          color: ${border ?? rawBorder};
        }
      `}
      {...containerProps}
    >
      <FrameSVGOctagon
        squareSize={20}
        strokeWidth={borderStrokeWidth}
        elementRef={svgRef}
        onRender={onRender}
        {...rest}
      />
      <Box
        position="relative"
        width="100%"
        height="100%"
        visibility={show ? 'visible' : 'hidden'}
      >
        {children}
      </Box>
    </Box>
  );
};

export const AnimatedFrame = ({
  children,
  bg,
  border,
  show,
  containerProps,
  ...rest
}: {
  children?: ReactNode;
  bg?: string;
  border?: string;
  containerProps?: HTMLChakraProps<'div'>;
  show: boolean;
} & FrameSVGOctagonProps) => (
  <Animator active={show}>
    <AnimatedFrameContent
      show={show}
      bg={bg}
      border={border}
      containerProps={containerProps}
      {...rest}
    >
      {children}
    </AnimatedFrameContent>
  </Animator>
);

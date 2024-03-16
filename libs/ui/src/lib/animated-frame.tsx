import { FrameSVGOctagonProps } from '@arwes/react';
import { Animator } from '@arwes/react-animator';
import {
  FrameSVGOctagon,
  useFrameSVGAssemblingAnimation,
} from '@arwes/react-frames';
import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { useUiBackground } from '@idleverse/theme';
import { ReactNode, useRef } from 'react';

const DataDiv = styled.div<{ bg: string; border: string }>`
  position: relative;
  padding: 1.5rem;

  [data-name='bg'] {
    color: ${(props) => props.bg};
  }
  [data-name='line'] {
    color: ${(props) => props.border};
  }
`;

const AnimatedFrameContent = ({
  children,
  bg,
  border,
  borderStrokeWidth = 1,
  show,
  ...rest
}: {
  children?: ReactNode;
  bg?: string;
  border?: string;
  borderStrokeWidth?: number;
  show: boolean;
} & FrameSVGOctagonProps) => {
  const { rawBg, rawBorder } = useUiBackground();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  return (
    <DataDiv bg={bg ?? rawBg} border={border ?? rawBorder}>
      <FrameSVGOctagon
        squareSize={20}
        strokeWidth={borderStrokeWidth}
        elementRef={svgRef}
        onRender={onRender}
        padding={4}
        {...rest}
      />
      <Box position="relative" visibility={show ? 'visible' : 'hidden'}>
        {children}
      </Box>
    </DataDiv>
  );
};

export const AnimatedFrame = ({
  children,
  bg,
  border,
  show,
  ...rest
}: {
  children?: ReactNode;
  bg?: string;
  border?: string;
  show: boolean;
} & FrameSVGOctagonProps) => (
  <Animator active={show}>
    <AnimatedFrameContent show={show} bg={bg} border={border} {...rest}>
      {children}
    </AnimatedFrameContent>
  </Animator>
);

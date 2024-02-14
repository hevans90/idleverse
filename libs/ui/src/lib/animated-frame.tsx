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
    filter: drop-shadow(0 0 4px ${(props) => props.bg});
  }
  [data-name='line'] {
    color: ${(props) => props.border};
    filter: drop-shadow(0 0 4px ${(props) => props.border});
  }
`;

const AnimatedFrameContent = ({
  children,
  bg,
  border,
  borderStrokeWidth = 1,
  show,
  leftTop = true,
  rightTop = true,
  rightBottom = true,
  leftBottom = true,
}: {
  children?: ReactNode;
  bg?: string;
  border?: string;
  borderStrokeWidth?: number;
  leftTop?: boolean;
  rightTop?: boolean;
  rightBottom?: boolean;
  leftBottom?: boolean;
  show: boolean;
}) => {
  const { rawBg, rawBorder } = useUiBackground();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  return (
    <DataDiv bg={bg ?? rawBg} border={border ?? rawBorder}>
      <FrameSVGOctagon
        squareSize={20}
        strokeWidth={borderStrokeWidth}
        leftTop={leftTop}
        rightTop={rightTop}
        rightBottom={rightBottom}
        leftBottom={leftBottom}
        elementRef={svgRef}
        onRender={onRender}
        padding={4}
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
}: {
  children?: ReactNode;
  bg?: string;
  border?: string;
  show: boolean;
}) => (
  <Animator active={show}>
    <AnimatedFrameContent show={show} bg={bg} border={border}>
      {children}
    </AnimatedFrameContent>
  </Animator>
);

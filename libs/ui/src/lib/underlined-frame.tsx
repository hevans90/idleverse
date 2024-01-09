import { Animator } from '@arwes/react-animator';
import {
  FrameSVGUnderline,
  useFrameSVGAssemblingAnimation,
} from '@arwes/react-frames';
import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { useUiBackground } from '@idleverse/theme';
import { ReactNode, useRef } from 'react';

const DataDiv = styled.div<{ bg: string; border: string }>`
  position: relative;
  width: fit-content;

  [data-name='bg'] {
    color: ${(props) => props.bg};
    filter: drop-shadow(0 0 4px ${(props) => props.bg});
  }
  [data-name='line'] {
    color: ${(props) => props.border};
    filter: drop-shadow(0 0 4px ${(props) => props.border});
  }
`;

const UnderlinedFrameContent = ({
  children,
  show,
}: {
  children?: ReactNode;
  show: boolean;
}) => {
  const { canvasBgDarker, canvasBorder } = useUiBackground();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  return (
    <DataDiv bg={canvasBgDarker} border={canvasBorder}>
      <FrameSVGUnderline elementRef={svgRef} onRender={onRender} z={5} />
      <Box
        position="relative"
        visibility={show ? 'visible' : 'hidden'}
        overflow="hidden"
        zIndex={3}
      >
        {children}
      </Box>
    </DataDiv>
  );
};

export const UnderlinedFrame = ({ children }: { children?: ReactNode }) => (
  <Animator active={true}>
    <UnderlinedFrameContent show={true}>{children}</UnderlinedFrameContent>
  </Animator>
);

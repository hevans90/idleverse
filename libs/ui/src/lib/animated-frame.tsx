import {
  FrameSVGOctagon,
  useFrameSVGAssemblingAnimation,
} from '@arwes/react-frames';
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

export const AnimatedFrame = ({ children }: { children?: ReactNode }) => {
  const { canvasBg, canvasBorder } = useUiBackground();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  return (
    <DataDiv bg={canvasBg} border={canvasBorder}>
      <FrameSVGOctagon
        squareSize={20}
        strokeWidth={2}
        elementRef={svgRef}
        onRender={onRender}
        padding={4}
      />

      {children}
    </DataDiv>
  );
};

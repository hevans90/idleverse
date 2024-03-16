import { FrameSVGCorners } from '@arwes/react';
import { Animator } from '@arwes/react-animator';
import { useFrameSVGAssemblingAnimation } from '@arwes/react-frames';
import { Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { useUiBackground } from '@idleverse/theme';
import { ReactNode, useRef, useState } from 'react';

const DataButton = styled.div<{ bg: string; border: string }>`
  position: relative;
  padding: 2px;
  width: 100%;
  height: 100%;

  [data-name='bg'] {
    color: ${(props) => props.bg};
  }
  [data-name='line'] {
    color: ${(props) => props.border};
    filter: drop-shadow(0 0 1px ${(props) => props.border});
  }
`;

const AnimatedFrameContent = ({
  hovered,
  children,
  bg,
  border,
  onClick,
}: {
  hovered: boolean;
  children?: ReactNode;
  bg?: string;
  border?: string;
  onClick?: () => void;
}) => {
  const { rawBg, rawBgDarker, rawBorder, bgDarker } = useUiBackground();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  return (
    <DataButton
      onClick={onClick}
      bg={hovered ? bg ?? rawBg : bg ?? rawBgDarker}
      border={border ?? rawBorder}
    >
      <FrameSVGCorners
        elementRef={svgRef}
        onRender={onRender}
        strokeWidth={hovered ? 3 : 1}
        cornerLength={hovered ? 20 : 10}
      />

      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        bg={hovered ? bg ?? rawBg : bg ?? rawBgDarker}
        border="unset"
      >
        {children}
      </Box>
    </DataButton>
  );
};

export const AnimatedButton = ({
  children,
  bg,
  border,
  onClick,
}: {
  children?: ReactNode;
  bg?: string;
  border?: string;
  onClick?: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      border="unset"
      as="button"
      width="100%"
      height="100%"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <Animator active={hovered}>
          <AnimatedFrameContent
            onClick={onClick}
            hovered={true}
            bg={bg}
            border={border}
          >
            {children}
          </AnimatedFrameContent>
        </Animator>
      ) : (
        <AnimatedFrameContent
          onClick={onClick}
          hovered={false}
          bg={bg}
          border={border}
        >
          {children}
        </AnimatedFrameContent>
      )}
    </Box>
  );
};

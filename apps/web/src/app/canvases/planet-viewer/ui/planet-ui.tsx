import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useKeypress } from '../../../hooks/use-keypress';
import { useUiBackground } from '../../../hooks/use-ui-background';

import { Animator } from '@arwes/react-animator';
import {
  FrameSVGOctagon,
  useFrameSVGAssemblingAnimation,
} from '@arwes/react-frames';
import { Text } from '@arwes/react-text';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const PlanetUI = () => {
  useKeypress('KeyO', () => {
    if (!planetOverviewOpen) {
      onOpenPlanetOverview();
    } else {
      onClosePlanetOverview();
    }
  });

  const {
    isOpen: planetOverviewOpen,
    onOpen: onOpenPlanetOverview,
    onClose: onClosePlanetOverview,
  } = useDisclosure();

  return (
    <PlanetOverview
      isOpen={planetOverviewOpen}
      onClose={onClosePlanetOverview}
    />
  );
};

const PlanetOverview = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => unknown;
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const tid = setInterval(() => setActive((active) => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);

  const runRender = () => {
    if (svgRef.current) {
      console.log('LETS GO');
      onRender();
    }
  };

  useEffect(() => runRender(), [svgRef.current, active]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={['3xl']} isCentered>
      <ModalOverlay />
      <ModalContent bg="unset" shadow="unset">
        <Animator active={active}>
          <AnimatedFrame />
          {/* </AnimatedFrame> */}
        </Animator>
      </ModalContent>
    </Modal>
  );
};

export const DataDiv = styled.div<{ bg: string; border: string }>`
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
const AnimatedFrame = () => {
  const { canvasBg, canvasBorder } = useUiBackground();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef);
  return (
    <DataDiv bg={canvasBg} border={canvasBorder}>
      <FrameSVGOctagon elementRef={svgRef} onRender={onRender} padding={4} />
      <Text as="p" style={{ color: '#ddd' }}>
        Nemo enim ipsam <b>voluptatem quia voluptas</b> sit aspernatur aut odit
        aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur,{' '}
        <b>
          adipisci velit, <i>sed quia non</i>
        </b>
        numquam eius modi tempora incidunt ut labore et dolore magnam
        <span>
          <a href="#">aliquam quaerat</a>
        </span>{' '}
        voluptatem. Ut enim ad minima veniam, qui nostrum exercitationem ullam
        corporis suscipit.
      </Text>
      {/* {children} */}
    </DataDiv>
  );
};

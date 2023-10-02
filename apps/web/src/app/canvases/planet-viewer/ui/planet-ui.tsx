import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useKeypress } from '../../../hooks/use-keypress';

import { Animator } from '@arwes/react-animator';
import { Text } from '@arwes/react-text';
import { AnimatedFrame } from '@idleverse/ui';
import { useEffect, useState } from 'react';

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
    if (isOpen) {
      setTimeout(() => setActive(true), 150);
    }
    return () => setActive(false);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={['3xl']} isCentered>
      <ModalOverlay />
      <ModalContent bg="unset" shadow="unset">
        <Animator active={active}>
          <AnimatedFrame>
            <Text as="p" style={{ color: '#ddd' }}>
              Nemo enim ipsam <b>voluptatem quia voluptas</b> sit aspernatur aut
              odit aut fugit, sed quia consequuntur magni dolores eos qui
              ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur,{' '}
              <b>
                adipisci velit, <i>sed quia non</i>
              </b>
              numquam eius modi tempora incidunt ut labore et dolore magnam
              <span>
                <a href="#">aliquam quaerat</a>
              </span>{' '}
              voluptatem. Ut enim ad minima veniam, qui nostrum exercitationem
              ullam corporis suscipit.
            </Text>
          </AnimatedFrame>
        </Animator>
      </ModalContent>
    </Modal>
  );
};

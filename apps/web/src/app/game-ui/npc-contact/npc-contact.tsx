import { useReactiveVar } from '@apollo/client';
import {
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useUiBackground } from '../../hooks/use-ui-background';
import { colorsVar } from '../../_state/colors';
import { dialogVar } from '../../_state/dialog';
import { empireNpcsVar } from '../../_state/galactic-empire';

export const NpcContact = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => unknown;
}) => {
  const { bg, border, bgDark } = useUiBackground();

  const { secondary } = useReactiveVar(colorsVar);

  const factionColor = useColorModeValue(
    `${secondary}.900`,
    `${secondary}.300`
  );
  const npcs = useReactiveVar(empireNpcsVar);
  const { open } = useReactiveVar(dialogVar);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
      <ModalContent>
        <ModalHeader
          bg={bgDark}
          borderTopRightRadius={6}
          borderTopLeftRadius={6}
          borderBottom="1px solid"
          borderBottomColor={border}
        >
          <Text>NPCs</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          height="30vh"
          minHeight="30vh"
          bg={bg}
          padding={0}
          borderRight="1px solid"
          borderRightColor={border}
        >
          <>
            {npcs.length > 0 && (
              <SimpleGrid padding={5} minChildWidth="150px">
                {npcs.map(({ name, image_url, playable_race, faction }, i) => (
                  <VStack key={i}>
                    <Image
                      float="left"
                      width={['112px', '112px', '168px']}
                      height={['150px', '150px', '225px']}
                      src={image_url}
                      fallbackSrc="/placeholders/150x150.png"
                      marginRight={4}
                      marginBottom={1}
                      marginLeft={1}
                    />
                    <Text>{name}</Text>
                    <Text color={factionColor}>
                      {playable_race?.name || faction?.name}
                    </Text>
                    <Button
                      onClick={() => dialogVar({ ...dialogVar(), open: true })}
                    >
                      Talk
                    </Button>
                  </VStack>
                ))}
              </SimpleGrid>
            )}
            {npcs.length === 0 && (
              <HStack padding={5} justifyContent="center" alignItems="center">
                <Text>
                  You are all alone... try doing some quests to find some
                  friends.
                </Text>
              </HStack>
            )}
          </>
        </ModalBody>

        <ModalFooter
          bg={bgDark}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={6}
          borderTop="1px solid"
          borderTopColor={border}
        ></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

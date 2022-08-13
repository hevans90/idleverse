import { useQuery, useReactiveVar } from '@apollo/client';
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
  VStack,
} from '@chakra-ui/react';
import {
  NpcsByEmpireIdDocument,
  NpcsByEmpireIdQuery,
  NpcsByEmpireIdQueryVariables,
} from '../../../../../../libs/galaxy-gql/src/lib/galaxy-api';
import { Loading } from '../../components/loading';
import { useUiBackground } from '../../hooks/use-ui-background';
import { colorsVar } from '../../_state/colors';
import { dialogVar } from '../../_state/dialog';
import { galacticEmpireVar } from '../../_state/galactic-empire';

export const NpcContact = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => unknown;
}) => {
  const { bg, border, bgDark, bgLight } = useUiBackground();

  const { secondary } = useReactiveVar(colorsVar);
  const { id: galacticEmpireId } = useReactiveVar(galacticEmpireVar);
  const { open } = useReactiveVar(dialogVar);

  const { data, loading } = useQuery<
    NpcsByEmpireIdQuery,
    NpcsByEmpireIdQueryVariables
  >(NpcsByEmpireIdDocument, {
    variables: { id: galacticEmpireId },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      isCentered
      closeOnOverlayClick={false}
    >
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
            {loading && <Loading text="NPCs loading"></Loading>}
            {data?.galactic_empire_npc.length && (
              <SimpleGrid padding={5} minChildWidth="150px">
                {data.galactic_empire_npc.map(({ npc }, i) => (
                  <VStack key={i}>
                    <Image
                      float="left"
                      width={['112px', '112px', '168px']}
                      height={['150px', '150px', '225px']}
                      src={npc.image_url}
                      fallbackSrc="/placeholders/150x150.png"
                      marginRight={4}
                      marginBottom={1}
                      marginLeft={1}
                    />
                    <Text>{npc.name}</Text>
                    <Text>{npc?.playable_race.name || npc?.faction.name}</Text>
                    <Button
                      onClick={() => dialogVar({ ...dialogVar(), open: true })}
                    >
                      Talk
                    </Button>
                  </VStack>
                ))}
              </SimpleGrid>
            )}
            {!data?.galactic_empire_npc.length && (
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

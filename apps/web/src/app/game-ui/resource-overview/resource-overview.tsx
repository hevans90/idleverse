import { useReactiveVar } from '@apollo/client';
import {
  Code,
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
import { empireResourcesVar } from '../../_state/galactic-empire';
import { useUiBackground } from '../../hooks/use-ui-background';

export const ResourceOverview = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => unknown;
}) => {
  const { bg, border, bgDark } = useUiBackground();

  const empireResources = useReactiveVar(empireResourcesVar);

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
          <Text>Resources</Text>
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
            {empireResources?.length > 0 && (
              <SimpleGrid padding={5} minChildWidth="150px">
                {empireResources.map(
                  (
                    { name, value, imageUrl, generationRate, generators },
                    i
                  ) => (
                    <VStack key={i}>
                      <Image
                        float="left"
                        width={['75px', '100px']}
                        height={['75px', '100px']}
                        src={imageUrl}
                        fallbackSrc="/placeholders/150x150.png"
                      />
                      <Text>{name}</Text>
                      <Text>{value}</Text>
                      <Text>(+{generationRate})</Text>
                      <Code>{JSON.stringify(generators)}</Code>
                    </VStack>
                  )
                )}
              </SimpleGrid>
            )}
            {empireResources?.length === 0 && (
              <HStack padding={5} justifyContent="center" alignItems="center">
                <Text>No resources unlocked.</Text>
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

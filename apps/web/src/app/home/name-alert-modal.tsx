import { useMutation, useReactiveVar } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import {
  SetNameByUserIdDocument,
  SetNameByUserIdMutation,
  SetNameByUserIdMutationVariables,
} from '@idleverse/galaxy-gql';
import { useLayoutEffect, useRef, useState } from 'react';
import { selfVar } from '../_state/reactive-variables';

export const NameAlertModal = () => {
  const { isOpen, onOpen, onClose, isControlled } = useDisclosure();
  const self = useReactiveVar(selfVar);
  const [name, setName] = useState('');

  //omega lazy
  const initialRef = useRef<any>(null!);
  const finalRef = useRef();

  useLayoutEffect(() => {
    if (!self?.display_name) {
      onOpen();
    } else onClose();
  }, [self]);

  const onClick = () => {
    if (
      !initialRef.current &&
      initialRef.current.value &&
      initialRef.current.value.length > 0
    )
      //show error
      return;

    setName(name);
    setDisplayName({
      variables: { display_name: initialRef.current.value },
    });
    //todo if success close window
  };

  const [setDisplayName, { data, loading, error }] = useMutation<
    SetNameByUserIdMutation,
    SetNameByUserIdMutationVariables
  >(SetNameByUserIdDocument, {
    onCompleted: (data) => {
      selfVar({
        ...self,
        display_name: data.setDisplayName.updatedName,
      });
      onClose();
    },
  });

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter your name</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Display name</FormLabel>
            <Input ref={initialRef} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClick} colorScheme="blue" mr={3}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

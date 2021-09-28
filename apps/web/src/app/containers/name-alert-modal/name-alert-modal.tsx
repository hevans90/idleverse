import { useMutation, useQuery } from '@apollo/client';
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
  SelfDocument,
  SelfQuery,
  SetDisplayNameDocument,
  SetDisplayNameMutation,
} from '@idleverse/graphql';
import { useEffect, useRef, useState } from 'react';

export const NameAlertModal = () => {
  const { loading, error, data } = useQuery<SelfQuery>(SelfDocument);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState('');
  const [id, setId] = useState('');

  //omega lazy
  const initialRef = useRef<any>(null!);
  const finalRef = useRef();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (data && data.user_me && data.user_me[0]) {
      setId(data.user_me[0].id);

      console.log(data.user_me[0].id);
    }
  }, [data, loading]);

  const onClick = () => {
    if (
      !initialRef.current &&
      initialRef.current.value &&
      initialRef.current.value.length > 0
    )
      return;

    console.log(initialRef);

    tempFunc(initialRef.current.value, id);
    //todo if success close window
    onClose();
  };

  const [
    setDisplayName,
    { data: resData, loading: resLoading, error: resError },
  ] = useMutation<SetDisplayNameMutation>(SetDisplayNameDocument);

  useEffect(() => {
    console.log('res:');
    console.log(resData);
    console.log(resLoading);
    console.log(resError);
  }, [resData, resLoading, resError]);

  //todo make parent element not render if has name
  if (loading || !data || data.user_me[0].display_name) return <></>;

  const tempFunc = (name: string, id: string) => {
    console.log('id:');
    console.log(id);
    console.log(name);
    setName(name);
    setDisplayName({ variables: { id, display_name: name } });
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
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

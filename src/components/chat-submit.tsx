import { useMutation } from '@apollo/client';
import { Box, Button, Input, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import {
  SendNewMessageDocument,
  SendNewMessageMutation,
} from '../_graphql/api';
import { sideNavWidth } from './layout';

export const ChatSubmit = () => {
  const [message, setMessage] = React.useState('');

  const [sendNewMessage] = useMutation<SendNewMessageMutation>(
    SendNewMessageDocument,
    {
      variables: { message },
    }
  );

  const submit = () => {
    sendNewMessage();
    setMessage('');
  };

  const bg = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      marginTop="auto"
      display="flex"
      position="absolute"
      bottom="0"
      padding="1"
      width={sideNavWidth}
      bgColor={bg}
    >
      <Input
        placeholder="Type to chat..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />
      <Button
        colorScheme="teal"
        size="xs"
        height="40px"
        marginLeft="0.5rem"
        paddingLeft="1rem"
        paddingRight="1rem"
        onClick={(e) => {
          submit();
        }}
      >
        Send
      </Button>
    </Box>
  );
};

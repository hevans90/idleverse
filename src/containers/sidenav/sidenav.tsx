import { useMutation, useSubscription } from '@apollo/client';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { GetChatMessagesDocument, GetChatMessagesSubscription } from "../../_graphql/api"
import { ListItem, OrderedList } from '@chakra-ui/react';
import { Text } from "@chakra-ui/react"
import { ChatSubmit } from '../../components/chat-submit';
import { useEffect, useState } from 'react';


export const SideNav = () => {
  const color = useColorModeValue('gray.200', 'gray.700');

  const [messages, setMessages] = useState(new Array<any>())

  const { data, loading } =
    useSubscription<GetChatMessagesSubscription>(
      GetChatMessagesDocument
    );

  useEffect(() => {
    if (data)
      setMessages(data?.chat_messages.reverse());
  }, [data]);

  return (
    <Box
      className="sidenav"
      padding={2}
      display="flex"
      flexDirection="column"
      bgColor={color}
    >
      {
        loading && data ?
          <div>Loading...</div>
          :
          <OrderedList>
            {messages?.map((item, i) => (
              <>
                <ListItem key={item.id}>
                  <Text fontSize="xs">
                    {item.user_info.nickname}: {item.message}
                  </Text>
                </ListItem>
              </>
            ))}
          </OrderedList>
      }
      <ChatSubmit></ChatSubmit>
    </Box>
  );
};

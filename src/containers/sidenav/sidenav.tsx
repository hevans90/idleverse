import { useSubscription } from '@apollo/client';
import {
  Box,
  ListItem,
  OrderedList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChatSubmit } from '../../components/chat-submit';
import {
  Chat_Messages,
  GetChatMessagesDocument,
  GetChatMessagesSubscription,
} from '../../_graphql/api';

export const SideNav = () => {
  const color = useColorModeValue('gray.200', 'gray.700');

  const [messages, setMessages] = useState<Chat_Messages[]>([]);

  const { data, loading } = useSubscription<GetChatMessagesSubscription>(
    GetChatMessagesDocument
  );

  useEffect(() => {
    if (data) setMessages(data?.chat_messages.reverse());
  }, [data]);

  const chatUserColor = useColorModeValue('gray.500', 'gray.500');

  return (
    <Box
      className="sidenav"
      padding={2}
      display="flex"
      flexDirection="column"
      bgColor={color}
    >
      {loading && data ? (
        <div>Loading...</div>
      ) : (
        <OrderedList marginInlineStart="unset">
          {messages?.map((item, i) => (
            <ListItem key={item.id} display="flex" marginBottom="0.25rem">
              <Text fontSize="xxs" color={chatUserColor}>
                {item.user_info.nickname}:
              </Text>
              <Text fontSize="xxs">{item.message}</Text>
            </ListItem>
          ))}
        </OrderedList>
      )}
      <ChatSubmit></ChatSubmit>
    </Box>
  );
};

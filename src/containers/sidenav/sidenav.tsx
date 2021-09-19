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
  GetChatMessagesDocument,
  GetChatMessagesSubscription,
} from '../../_graphql/api';

export const SideNav = () => {
  const color = useColorModeValue('gray.200', 'gray.700');

  const [messages, setMessages] = useState<GetChatMessagesSubscription['chat_messages']>([]);

  const { data, loading } = useSubscription<GetChatMessagesSubscription>(
    GetChatMessagesDocument
  );

  let test = data?.chat_messages.reverse();
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
            <ListItem key={item.id}>
              <Box fontSize="xxs">
                <Text fontSize="xxs" color={chatUserColor} display="contents">
                  {item.user_info.nickname}:
                </Text>

                {item.message}
              </Box>
            </ListItem>
          ))}
        </OrderedList>
      )}
      <ChatSubmit></ChatSubmit>
    </Box>
  );
};

import { useSubscription } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  ListItem,
  OrderedList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  GetChatMessagesDocument,
  GetChatMessagesSubscription,
} from '@idleverse/galaxy-gql';
import { useEffect, useRef, useState } from 'react';

import { useUiBackground } from '@idleverse/theme';
import { ChatSubmit } from '../../components/chat-submit';
import { Loading } from '../../components/loading';

export const SideNav = () => {
  const { bgDark, border } = useUiBackground();

  const endOfChat = useRef<HTMLDivElement>(null);

  const { user } = useAuth0();

  const [messages, setMessages] = useState<
    GetChatMessagesSubscription['chat_message']
  >([]);

  const { data, loading } = useSubscription<GetChatMessagesSubscription>(
    GetChatMessagesDocument
  );

  const scrollToBottom = () =>
    setTimeout(() => {
      endOfChat.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

  useEffect(() => {
    if (data) {
      setMessages(data?.chat_message.reverse());
      scrollToBottom();
    }
  }, [data]);

  const chatUserColor = useColorModeValue('pink.800', 'pink.400');
  const myUserColor = useColorModeValue('teal.800', 'teal.500');

  const chatMessageColor = useColorModeValue('gray.800', 'gray.300');

  return (
    <>
      <Box
        className="sidenav"
        padding={2}
        display="flex"
        flexDirection="column"
        overflowY="auto"
        maxHeight="100vh"
        position="relative"
        bgColor={bgDark}
        borderColor={border}
        borderRightStyle="solid"
        borderRightWidth="1px"
      >
        {loading && data ? (
          <Loading
            fontSize="md"
            height="100%"
            width="100%"
            text="Loading chat..."
          ></Loading>
        ) : (
          <OrderedList marginInlineStart="unset">
            {messages?.map((item, i) => (
              <ListItem key={item.id}>
                <Box fontSize="2xs" color={chatMessageColor}>
                  <Text
                    fontSize="2xs"
                    color={
                      item.user_info.nickname === user?.nickname
                        ? myUserColor
                        : chatUserColor
                    }
                    display="contents"
                    lineHeight="1.25rem"
                  >
                    {item.user_info.display_name}:
                  </Text>

                  {item.message}
                </Box>
              </ListItem>
            ))}
            <Box ref={endOfChat} height="50px"></Box>
          </OrderedList>
        )}
      </Box>
      <ChatSubmit></ChatSubmit>
    </>
  );
};

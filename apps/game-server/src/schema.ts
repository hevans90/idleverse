import { gql } from 'apollo-server';

export const typeDefs = gql`
  mutation SendMessage(
    $objects: [chat_message_insert_input!] = { message: "" }
  ) {
    insert_chat_message(objects: $objects) {
      returning {
        message
      }
    }
  }
`;

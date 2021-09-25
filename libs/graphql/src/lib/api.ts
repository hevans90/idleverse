import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamp: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "chat_message" */
export type Chat_Message = {
  __typename?: 'chat_message';
  id: Scalars['uuid'];
  message: Scalars['String'];
  poster_id: Scalars['String'];
  timestamp: Scalars['timestamp'];
  /** An object relationship */
  user_info: User_Info;
};

/** order by aggregate values of table "chat_message" */
export type Chat_Message_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Chat_Message_Max_Order_By>;
  min?: Maybe<Chat_Message_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "chat_message". All fields are combined with a logical 'AND'. */
export type Chat_Message_Bool_Exp = {
  _and?: Maybe<Array<Chat_Message_Bool_Exp>>;
  _not?: Maybe<Chat_Message_Bool_Exp>;
  _or?: Maybe<Array<Chat_Message_Bool_Exp>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  message?: Maybe<String_Comparison_Exp>;
  poster_id?: Maybe<String_Comparison_Exp>;
  timestamp?: Maybe<Timestamp_Comparison_Exp>;
  user_info?: Maybe<User_Info_Bool_Exp>;
};

/** input type for inserting data into table "chat_message" */
export type Chat_Message_Insert_Input = {
  message?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "chat_message" */
export type Chat_Message_Max_Order_By = {
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  poster_id?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
};

/** order by min() on columns of table "chat_message" */
export type Chat_Message_Min_Order_By = {
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  poster_id?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
};

/** response of any mutation on the table "chat_message" */
export type Chat_Message_Mutation_Response = {
  __typename?: 'chat_message_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat_Message>;
};

/** Ordering options when selecting data from "chat_message". */
export type Chat_Message_Order_By = {
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  poster_id?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
  user_info?: Maybe<User_Info_Order_By>;
};

/** select columns of table "chat_message" */
export enum Chat_Message_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  PosterId = 'poster_id',
  /** column name */
  Timestamp = 'timestamp',
}

/** columns and relationships of "galaxy" */
export type Galaxy = {
  __typename?: 'galaxy';
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  systems: Array<System>;
};

/** columns and relationships of "galaxy" */
export type GalaxySystemsArgs = {
  distinct_on?: Maybe<Array<System_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<System_Order_By>>;
  where?: Maybe<System_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "galaxy". All fields are combined with a logical 'AND'. */
export type Galaxy_Bool_Exp = {
  _and?: Maybe<Array<Galaxy_Bool_Exp>>;
  _not?: Maybe<Galaxy_Bool_Exp>;
  _or?: Maybe<Array<Galaxy_Bool_Exp>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  systems?: Maybe<System_Bool_Exp>;
};

/** Ordering options when selecting data from "galaxy". */
export type Galaxy_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  systems_aggregate?: Maybe<System_Aggregate_Order_By>;
};

/** select columns of table "galaxy" */
export enum Galaxy_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "user_private" */
  delete_user_private?: Maybe<User_Private_Mutation_Response>;
  /** insert data into the table: "chat_message" */
  insert_chat_message?: Maybe<Chat_Message_Mutation_Response>;
  /** insert a single row into the table: "chat_message" */
  insert_chat_message_one?: Maybe<Chat_Message>;
  /** insert data into the table: "user_private" */
  insert_user_private?: Maybe<User_Private_Mutation_Response>;
  /** insert a single row into the table: "user_private" */
  insert_user_private_one?: Maybe<User_Private>;
  /** update data of the table: "user_private" */
  update_user_private?: Maybe<User_Private_Mutation_Response>;
};

/** mutation root */
export type Mutation_RootDelete_User_PrivateArgs = {
  where: User_Private_Bool_Exp;
};

/** mutation root */
export type Mutation_RootInsert_Chat_MessageArgs = {
  objects: Array<Chat_Message_Insert_Input>;
};

/** mutation root */
export type Mutation_RootInsert_Chat_Message_OneArgs = {
  object: Chat_Message_Insert_Input;
};

/** mutation root */
export type Mutation_RootInsert_User_PrivateArgs = {
  objects: Array<User_Private_Insert_Input>;
};

/** mutation root */
export type Mutation_RootInsert_User_Private_OneArgs = {
  object: User_Private_Insert_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_PrivateArgs = {
  _set?: Maybe<User_Private_Set_Input>;
  where: User_Private_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "chat_message" */
  chat_message: Array<Chat_Message>;
  /** fetch data from the table: "chat_message" using primary key columns */
  chat_message_by_pk?: Maybe<Chat_Message>;
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
  /** fetch data from the table: "system" */
  system: Array<System>;
  /** fetch data from the table: "system" using primary key columns */
  system_by_pk?: Maybe<System>;
  /** fetch data from the table: "user_action" */
  user_action: Array<User_Action>;
  /** fetch data from the table: "user_action" using primary key columns */
  user_action_by_pk?: Maybe<User_Action>;
  /** fetch data from the table: "user_info" */
  user_info: Array<User_Info>;
  /** fetch data from the table: "user_info" using primary key columns */
  user_info_by_pk?: Maybe<User_Info>;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
};

export type Query_RootChat_MessageArgs = {
  distinct_on?: Maybe<Array<Chat_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Message_Order_By>>;
  where?: Maybe<Chat_Message_Bool_Exp>;
};

export type Query_RootChat_Message_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootGalaxyArgs = {
  distinct_on?: Maybe<Array<Galaxy_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Galaxy_Order_By>>;
  where?: Maybe<Galaxy_Bool_Exp>;
};

export type Query_RootGalaxy_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootSystemArgs = {
  distinct_on?: Maybe<Array<System_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<System_Order_By>>;
  where?: Maybe<System_Bool_Exp>;
};

export type Query_RootSystem_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootUser_ActionArgs = {
  distinct_on?: Maybe<Array<User_Action_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Action_Order_By>>;
  where?: Maybe<User_Action_Bool_Exp>;
};

export type Query_RootUser_Action_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootUser_InfoArgs = {
  distinct_on?: Maybe<Array<User_Info_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Info_Order_By>>;
  where?: Maybe<User_Info_Bool_Exp>;
};

export type Query_RootUser_Info_By_PkArgs = {
  id: Scalars['String'];
};

export type Query_RootUser_PrivateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "chat_message" */
  chat_message: Array<Chat_Message>;
  /** fetch data from the table: "chat_message" using primary key columns */
  chat_message_by_pk?: Maybe<Chat_Message>;
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
  /** fetch data from the table: "system" */
  system: Array<System>;
  /** fetch data from the table: "system" using primary key columns */
  system_by_pk?: Maybe<System>;
  /** fetch data from the table: "user_action" */
  user_action: Array<User_Action>;
  /** fetch data from the table: "user_action" using primary key columns */
  user_action_by_pk?: Maybe<User_Action>;
  /** fetch data from the table: "user_info" */
  user_info: Array<User_Info>;
  /** fetch data from the table: "user_info" using primary key columns */
  user_info_by_pk?: Maybe<User_Info>;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
};

export type Subscription_RootChat_MessageArgs = {
  distinct_on?: Maybe<Array<Chat_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Message_Order_By>>;
  where?: Maybe<Chat_Message_Bool_Exp>;
};

export type Subscription_RootChat_Message_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootGalaxyArgs = {
  distinct_on?: Maybe<Array<Galaxy_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Galaxy_Order_By>>;
  where?: Maybe<Galaxy_Bool_Exp>;
};

export type Subscription_RootGalaxy_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootSystemArgs = {
  distinct_on?: Maybe<Array<System_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<System_Order_By>>;
  where?: Maybe<System_Bool_Exp>;
};

export type Subscription_RootSystem_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootUser_ActionArgs = {
  distinct_on?: Maybe<Array<User_Action_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Action_Order_By>>;
  where?: Maybe<User_Action_Bool_Exp>;
};

export type Subscription_RootUser_Action_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootUser_InfoArgs = {
  distinct_on?: Maybe<Array<User_Info_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Info_Order_By>>;
  where?: Maybe<User_Info_Bool_Exp>;
};

export type Subscription_RootUser_Info_By_PkArgs = {
  id: Scalars['String'];
};

export type Subscription_RootUser_PrivateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};

/** columns and relationships of "system" */
export type System = {
  __typename?: 'system';
  /** An object relationship */
  galaxy: Galaxy;
  galaxy_id: Scalars['uuid'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
};

/** order by aggregate values of table "system" */
export type System_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<System_Max_Order_By>;
  min?: Maybe<System_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "system". All fields are combined with a logical 'AND'. */
export type System_Bool_Exp = {
  _and?: Maybe<Array<System_Bool_Exp>>;
  _not?: Maybe<System_Bool_Exp>;
  _or?: Maybe<Array<System_Bool_Exp>>;
  galaxy?: Maybe<Galaxy_Bool_Exp>;
  galaxy_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "system" */
export type System_Max_Order_By = {
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** order by min() on columns of table "system" */
export type System_Min_Order_By = {
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "system". */
export type System_Order_By = {
  galaxy?: Maybe<Galaxy_Order_By>;
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "system" */
export enum System_Select_Column {
  /** column name */
  GalaxyId = 'galaxy_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamp']>;
  _gt?: Maybe<Scalars['timestamp']>;
  _gte?: Maybe<Scalars['timestamp']>;
  _in?: Maybe<Array<Scalars['timestamp']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamp']>;
  _lte?: Maybe<Scalars['timestamp']>;
  _neq?: Maybe<Scalars['timestamp']>;
  _nin?: Maybe<Array<Scalars['timestamp']>>;
};

/** columns and relationships of "user_action" */
export type User_Action = {
  __typename?: 'user_action';
  id: Scalars['uuid'];
  user_id: Scalars['String'];
  /** An object relationship */
  user_info: User_Info;
};

/** Boolean expression to filter rows from the table "user_action". All fields are combined with a logical 'AND'. */
export type User_Action_Bool_Exp = {
  _and?: Maybe<Array<User_Action_Bool_Exp>>;
  _not?: Maybe<User_Action_Bool_Exp>;
  _or?: Maybe<Array<User_Action_Bool_Exp>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
  user_info?: Maybe<User_Info_Bool_Exp>;
};

/** Ordering options when selecting data from "user_action". */
export type User_Action_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
  user_info?: Maybe<User_Info_Order_By>;
};

/** select columns of table "user_action" */
export enum User_Action_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id',
}

/** columns and relationships of "user_info" */
export type User_Info = {
  __typename?: 'user_info';
  /** An array relationship */
  chat_messages: Array<Chat_Message>;
  id: Scalars['String'];
  nickname: Scalars['String'];
  /** An object relationship */
  user_action: User_Action;
};

/** columns and relationships of "user_info" */
export type User_InfoChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Message_Order_By>>;
  where?: Maybe<Chat_Message_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "user_info". All fields are combined with a logical 'AND'. */
export type User_Info_Bool_Exp = {
  _and?: Maybe<Array<User_Info_Bool_Exp>>;
  _not?: Maybe<User_Info_Bool_Exp>;
  _or?: Maybe<Array<User_Info_Bool_Exp>>;
  chat_messages?: Maybe<Chat_Message_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  nickname?: Maybe<String_Comparison_Exp>;
  user_action?: Maybe<User_Action_Bool_Exp>;
};

/** Ordering options when selecting data from "user_info". */
export type User_Info_Order_By = {
  chat_messages_aggregate?: Maybe<Chat_Message_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  user_action?: Maybe<User_Action_Order_By>;
};

/** select columns of table "user_info" */
export enum User_Info_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
}

/** columns and relationships of "user_private" */
export type User_Private = {
  __typename?: 'user_private';
  secret_setting_test?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "user_private". All fields are combined with a logical 'AND'. */
export type User_Private_Bool_Exp = {
  _and?: Maybe<Array<User_Private_Bool_Exp>>;
  _not?: Maybe<User_Private_Bool_Exp>;
  _or?: Maybe<Array<User_Private_Bool_Exp>>;
  secret_setting_test?: Maybe<String_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "user_private" */
export type User_Private_Insert_Input = {
  secret_setting_test?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_private" */
export type User_Private_Mutation_Response = {
  __typename?: 'user_private_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Private>;
};

/** Ordering options when selecting data from "user_private". */
export type User_Private_Order_By = {
  secret_setting_test?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "user_private" */
export enum User_Private_Select_Column {
  /** column name */
  SecretSettingTest = 'secret_setting_test',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "user_private" */
export type User_Private_Set_Input = {
  secret_setting_test?: Maybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type GetChatMessagesSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type GetChatMessagesSubscription = {
  __typename?: 'subscription_root';
  chat_message: Array<{
    __typename?: 'chat_message';
    timestamp: any;
    id: any;
    message: string;
    poster_id: string;
    user_info: { __typename?: 'user_info'; nickname: string; id: string };
  }>;
};

export type GalaxiesSubscriptionVariables = Exact<{ [key: string]: never }>;

export type GalaxiesSubscription = {
  __typename?: 'subscription_root';
  galaxy: Array<{
    __typename?: 'galaxy';
    id: any;
    name?: Maybe<string>;
    systems: Array<{ __typename?: 'system'; id: any; name?: Maybe<string> }>;
  }>;
};

export type LatestMessageSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type LatestMessageSubscription = {
  __typename?: 'subscription_root';
  chat_message: Array<{
    __typename?: 'chat_message';
    id: any;
    message: string;
  }>;
};

export type SendNewMessageMutationVariables = Exact<{
  message?: Maybe<Scalars['String']>;
}>;

export type SendNewMessageMutation = {
  __typename?: 'mutation_root';
  insert_chat_message_one?: Maybe<{
    __typename?: 'chat_message';
    message: string;
  }>;
};

export const GetChatMessagesDocument = gql`
  subscription GetChatMessages {
    chat_message(order_by: { timestamp: desc }, limit: 200) {
      timestamp
      id
      message
      poster_id
      user_info {
        nickname
        id
      }
    }
  }
`;

/**
 * __useGetChatMessagesSubscription__
 *
 * To run a query within a React component, call `useGetChatMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetChatMessagesSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    GetChatMessagesSubscription,
    GetChatMessagesSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    GetChatMessagesSubscription,
    GetChatMessagesSubscriptionVariables
  >(GetChatMessagesDocument, options);
}
export type GetChatMessagesSubscriptionHookResult = ReturnType<
  typeof useGetChatMessagesSubscription
>;
export type GetChatMessagesSubscriptionResult =
  Apollo.SubscriptionResult<GetChatMessagesSubscription>;
export const GalaxiesDocument = gql`
  subscription Galaxies {
    galaxy {
      id
      name
      systems {
        id
        name
      }
    }
  }
`;

/**
 * __useGalaxiesSubscription__
 *
 * To run a query within a React component, call `useGalaxiesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGalaxiesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGalaxiesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGalaxiesSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    GalaxiesSubscription,
    GalaxiesSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    GalaxiesSubscription,
    GalaxiesSubscriptionVariables
  >(GalaxiesDocument, options);
}
export type GalaxiesSubscriptionHookResult = ReturnType<
  typeof useGalaxiesSubscription
>;
export type GalaxiesSubscriptionResult =
  Apollo.SubscriptionResult<GalaxiesSubscription>;
export const LatestMessageDocument = gql`
  subscription LatestMessage {
    chat_message(limit: 1, order_by: { timestamp: desc }) {
      id
      message
    }
  }
`;

/**
 * __useLatestMessageSubscription__
 *
 * To run a query within a React component, call `useLatestMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLatestMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useLatestMessageSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    LatestMessageSubscription,
    LatestMessageSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    LatestMessageSubscription,
    LatestMessageSubscriptionVariables
  >(LatestMessageDocument, options);
}
export type LatestMessageSubscriptionHookResult = ReturnType<
  typeof useLatestMessageSubscription
>;
export type LatestMessageSubscriptionResult =
  Apollo.SubscriptionResult<LatestMessageSubscription>;
export const SendNewMessageDocument = gql`
  mutation SendNewMessage($message: String) {
    insert_chat_message_one(object: { message: $message }) {
      message
    }
  }
`;
export type SendNewMessageMutationFn = Apollo.MutationFunction<
  SendNewMessageMutation,
  SendNewMessageMutationVariables
>;

/**
 * __useSendNewMessageMutation__
 *
 * To run a mutation, you first call `useSendNewMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNewMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNewMessageMutation, { data, loading, error }] = useSendNewMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendNewMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendNewMessageMutation,
    SendNewMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendNewMessageMutation,
    SendNewMessageMutationVariables
  >(SendNewMessageDocument, options);
}
export type SendNewMessageMutationHookResult = ReturnType<
  typeof useSendNewMessageMutation
>;
export type SendNewMessageMutationResult =
  Apollo.MutationResult<SendNewMessageMutation>;
export type SendNewMessageMutationOptions = Apollo.BaseMutationOptions<
  SendNewMessageMutation,
  SendNewMessageMutationVariables
>;

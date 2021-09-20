import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
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

/** columns and relationships of "chat_messages" */
export type Chat_Messages = {
  __typename?: 'chat_messages';
  id: Scalars['uuid'];
  message: Scalars['String'];
  poster_id: Scalars['String'];
  timestamp: Scalars['timestamp'];
  /** An object relationship */
  user_info: User_Info;
};

/** order by aggregate values of table "chat_messages" */
export type Chat_Messages_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Chat_Messages_Max_Order_By>;
  min?: Maybe<Chat_Messages_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "chat_messages". All fields are combined with a logical 'AND'. */
export type Chat_Messages_Bool_Exp = {
  _and?: Maybe<Array<Chat_Messages_Bool_Exp>>;
  _not?: Maybe<Chat_Messages_Bool_Exp>;
  _or?: Maybe<Array<Chat_Messages_Bool_Exp>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  message?: Maybe<String_Comparison_Exp>;
  poster_id?: Maybe<String_Comparison_Exp>;
  timestamp?: Maybe<Timestamp_Comparison_Exp>;
  user_info?: Maybe<User_Info_Bool_Exp>;
};

/** input type for inserting data into table "chat_messages" */
export type Chat_Messages_Insert_Input = {
  message?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "chat_messages" */
export type Chat_Messages_Max_Order_By = {
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  poster_id?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
};

/** order by min() on columns of table "chat_messages" */
export type Chat_Messages_Min_Order_By = {
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  poster_id?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
};

/** response of any mutation on the table "chat_messages" */
export type Chat_Messages_Mutation_Response = {
  __typename?: 'chat_messages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat_Messages>;
};

/** Ordering options when selecting data from "chat_messages". */
export type Chat_Messages_Order_By = {
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  poster_id?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
  user_info?: Maybe<User_Info_Order_By>;
};

/** select columns of table "chat_messages" */
export enum Chat_Messages_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  PosterId = 'poster_id',
  /** column name */
  Timestamp = 'timestamp'
}

/** columns and relationships of "cluster" */
export type Cluster = {
  __typename?: 'cluster';
  /** An object relationship */
  galaxy: Galaxy;
  galaxy_id: Scalars['uuid'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  systems: Array<System>;
};


/** columns and relationships of "cluster" */
export type ClusterSystemsArgs = {
  distinct_on?: Maybe<Array<System_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<System_Order_By>>;
  where?: Maybe<System_Bool_Exp>;
};

/** order by aggregate values of table "cluster" */
export type Cluster_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Cluster_Max_Order_By>;
  min?: Maybe<Cluster_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "cluster". All fields are combined with a logical 'AND'. */
export type Cluster_Bool_Exp = {
  _and?: Maybe<Array<Cluster_Bool_Exp>>;
  _not?: Maybe<Cluster_Bool_Exp>;
  _or?: Maybe<Array<Cluster_Bool_Exp>>;
  galaxy?: Maybe<Galaxy_Bool_Exp>;
  galaxy_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  systems?: Maybe<System_Bool_Exp>;
};

/** order by max() on columns of table "cluster" */
export type Cluster_Max_Order_By = {
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** order by min() on columns of table "cluster" */
export type Cluster_Min_Order_By = {
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "cluster". */
export type Cluster_Order_By = {
  galaxy?: Maybe<Galaxy_Order_By>;
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  systems_aggregate?: Maybe<System_Aggregate_Order_By>;
};

/** select columns of table "cluster" */
export enum Cluster_Select_Column {
  /** column name */
  GalaxyId = 'galaxy_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** columns and relationships of "galaxy" */
export type Galaxy = {
  __typename?: 'galaxy';
  /** An array relationship */
  clusters: Array<Cluster>;
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
};


/** columns and relationships of "galaxy" */
export type GalaxyClustersArgs = {
  distinct_on?: Maybe<Array<Cluster_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Cluster_Order_By>>;
  where?: Maybe<Cluster_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "galaxy". All fields are combined with a logical 'AND'. */
export type Galaxy_Bool_Exp = {
  _and?: Maybe<Array<Galaxy_Bool_Exp>>;
  _not?: Maybe<Galaxy_Bool_Exp>;
  _or?: Maybe<Array<Galaxy_Bool_Exp>>;
  clusters?: Maybe<Cluster_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "galaxy". */
export type Galaxy_Order_By = {
  clusters_aggregate?: Maybe<Cluster_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "galaxy" */
export enum Galaxy_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** columns and relationships of "idle_test" */
export type Idle_Test = {
  __typename?: 'idle_test';
  counter: Scalars['Int'];
  id: Scalars['uuid'];
  owner_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<User_Info>;
};

/** Boolean expression to filter rows from the table "idle_test". All fields are combined with a logical 'AND'. */
export type Idle_Test_Bool_Exp = {
  _and?: Maybe<Array<Idle_Test_Bool_Exp>>;
  _not?: Maybe<Idle_Test_Bool_Exp>;
  _or?: Maybe<Array<Idle_Test_Bool_Exp>>;
  counter?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  user?: Maybe<User_Info_Bool_Exp>;
};

/** unique or primary key constraints on table "idle_test" */
export enum Idle_Test_Constraint {
  /** unique or primary key constraint */
  IdleTestOwnerIdKey = 'idle_test_owner_id_key',
  /** unique or primary key constraint */
  IdleTestPkey = 'idle_test_pkey'
}

/** input type for incrementing numeric columns in table "idle_test" */
export type Idle_Test_Inc_Input = {
  counter?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "idle_test" */
export type Idle_Test_Insert_Input = {
  counter?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "idle_test" */
export type Idle_Test_Mutation_Response = {
  __typename?: 'idle_test_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Idle_Test>;
};

/** on conflict condition type for table "idle_test" */
export type Idle_Test_On_Conflict = {
  constraint: Idle_Test_Constraint;
  update_columns?: Array<Idle_Test_Update_Column>;
  where?: Maybe<Idle_Test_Bool_Exp>;
};

/** Ordering options when selecting data from "idle_test". */
export type Idle_Test_Order_By = {
  counter?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  user?: Maybe<User_Info_Order_By>;
};

/** primary key columns input for table: idle_test */
export type Idle_Test_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "idle_test" */
export enum Idle_Test_Select_Column {
  /** column name */
  Counter = 'counter',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id'
}

/** input type for updating data in table "idle_test" */
export type Idle_Test_Set_Input = {
  counter?: Maybe<Scalars['Int']>;
};

/** update columns of table "idle_test" */
export enum Idle_Test_Update_Column {
  /** column name */
  Counter = 'counter'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "idle_test" */
  delete_idle_test?: Maybe<Idle_Test_Mutation_Response>;
  /** delete single row from the table: "idle_test" */
  delete_idle_test_by_pk?: Maybe<Idle_Test>;
  /** delete data from the table: "user_private" */
  delete_user_private?: Maybe<User_Private_Mutation_Response>;
  /** insert data into the table: "chat_messages" */
  insert_chat_messages?: Maybe<Chat_Messages_Mutation_Response>;
  /** insert a single row into the table: "chat_messages" */
  insert_chat_messages_one?: Maybe<Chat_Messages>;
  /** insert data into the table: "idle_test" */
  insert_idle_test?: Maybe<Idle_Test_Mutation_Response>;
  /** insert a single row into the table: "idle_test" */
  insert_idle_test_one?: Maybe<Idle_Test>;
  /** insert data into the table: "user_private" */
  insert_user_private?: Maybe<User_Private_Mutation_Response>;
  /** insert a single row into the table: "user_private" */
  insert_user_private_one?: Maybe<User_Private>;
  /** update data of the table: "idle_test" */
  update_idle_test?: Maybe<Idle_Test_Mutation_Response>;
  /** update single row of the table: "idle_test" */
  update_idle_test_by_pk?: Maybe<Idle_Test>;
  /** update data of the table: "user_private" */
  update_user_private?: Maybe<User_Private_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootDelete_Idle_TestArgs = {
  where: Idle_Test_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Idle_Test_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_User_PrivateArgs = {
  where: User_Private_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_Chat_MessagesArgs = {
  objects: Array<Chat_Messages_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_Messages_OneArgs = {
  object: Chat_Messages_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Idle_TestArgs = {
  objects: Array<Idle_Test_Insert_Input>;
  on_conflict?: Maybe<Idle_Test_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Idle_Test_OneArgs = {
  object: Idle_Test_Insert_Input;
  on_conflict?: Maybe<Idle_Test_On_Conflict>;
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
export type Mutation_RootUpdate_Idle_TestArgs = {
  _inc?: Maybe<Idle_Test_Inc_Input>;
  _set?: Maybe<Idle_Test_Set_Input>;
  where: Idle_Test_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Idle_Test_By_PkArgs = {
  _inc?: Maybe<Idle_Test_Inc_Input>;
  _set?: Maybe<Idle_Test_Set_Input>;
  pk_columns: Idle_Test_Pk_Columns_Input;
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
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  chat_messages: Array<Chat_Messages>;
  /** fetch data from the table: "chat_messages" using primary key columns */
  chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** fetch data from the table: "cluster" */
  cluster: Array<Cluster>;
  /** fetch data from the table: "cluster" using primary key columns */
  cluster_by_pk?: Maybe<Cluster>;
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
  /** fetch data from the table: "idle_test" */
  idle_test: Array<Idle_Test>;
  /** fetch data from the table: "idle_test" using primary key columns */
  idle_test_by_pk?: Maybe<Idle_Test>;
  /** fetch data from the table: "system" */
  system: Array<System>;
  /** fetch data from the table: "system" using primary key columns */
  system_by_pk?: Maybe<System>;
  /** fetch data from the table: "user_info" */
  user_info: Array<User_Info>;
  /** fetch data from the table: "user_info" using primary key columns */
  user_info_by_pk?: Maybe<User_Info>;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
};


export type Query_RootChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


export type Query_RootChat_Messages_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootClusterArgs = {
  distinct_on?: Maybe<Array<Cluster_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Cluster_Order_By>>;
  where?: Maybe<Cluster_Bool_Exp>;
};


export type Query_RootCluster_By_PkArgs = {
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


export type Query_RootIdle_TestArgs = {
  distinct_on?: Maybe<Array<Idle_Test_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Idle_Test_Order_By>>;
  where?: Maybe<Idle_Test_Bool_Exp>;
};


export type Query_RootIdle_Test_By_PkArgs = {
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
  /** An array relationship */
  chat_messages: Array<Chat_Messages>;
  /** fetch data from the table: "chat_messages" using primary key columns */
  chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** fetch data from the table: "cluster" */
  cluster: Array<Cluster>;
  /** fetch data from the table: "cluster" using primary key columns */
  cluster_by_pk?: Maybe<Cluster>;
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
  /** fetch data from the table: "idle_test" */
  idle_test: Array<Idle_Test>;
  /** fetch data from the table: "idle_test" using primary key columns */
  idle_test_by_pk?: Maybe<Idle_Test>;
  /** fetch data from the table: "system" */
  system: Array<System>;
  /** fetch data from the table: "system" using primary key columns */
  system_by_pk?: Maybe<System>;
  /** fetch data from the table: "user_info" */
  user_info: Array<User_Info>;
  /** fetch data from the table: "user_info" using primary key columns */
  user_info_by_pk?: Maybe<User_Info>;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
};


export type Subscription_RootChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


export type Subscription_RootChat_Messages_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootClusterArgs = {
  distinct_on?: Maybe<Array<Cluster_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Cluster_Order_By>>;
  where?: Maybe<Cluster_Bool_Exp>;
};


export type Subscription_RootCluster_By_PkArgs = {
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


export type Subscription_RootIdle_TestArgs = {
  distinct_on?: Maybe<Array<Idle_Test_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Idle_Test_Order_By>>;
  where?: Maybe<Idle_Test_Bool_Exp>;
};


export type Subscription_RootIdle_Test_By_PkArgs = {
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
  cluster: Cluster;
  cluster_id: Scalars['uuid'];
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
  cluster?: Maybe<Cluster_Bool_Exp>;
  cluster_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "system" */
export type System_Max_Order_By = {
  cluster_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** order by min() on columns of table "system" */
export type System_Min_Order_By = {
  cluster_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "system". */
export type System_Order_By = {
  cluster?: Maybe<Cluster_Order_By>;
  cluster_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "system" */
export enum System_Select_Column {
  /** column name */
  ClusterId = 'cluster_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
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

/** columns and relationships of "user_info" */
export type User_Info = {
  __typename?: 'user_info';
  /** An array relationship */
  chat_messages: Array<Chat_Messages>;
  id: Scalars['String'];
  /** An object relationship */
  idle_test?: Maybe<Idle_Test>;
  nickname: Scalars['String'];
};


/** columns and relationships of "user_info" */
export type User_InfoChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "user_info". All fields are combined with a logical 'AND'. */
export type User_Info_Bool_Exp = {
  _and?: Maybe<Array<User_Info_Bool_Exp>>;
  _not?: Maybe<User_Info_Bool_Exp>;
  _or?: Maybe<Array<User_Info_Bool_Exp>>;
  chat_messages?: Maybe<Chat_Messages_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  idle_test?: Maybe<Idle_Test_Bool_Exp>;
  nickname?: Maybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "user_info". */
export type User_Info_Order_By = {
  chat_messages_aggregate?: Maybe<Chat_Messages_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  idle_test?: Maybe<Idle_Test_Order_By>;
  nickname?: Maybe<Order_By>;
};

/** select columns of table "user_info" */
export enum User_Info_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname'
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
  UserId = 'user_id'
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

export type GetChatMessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetChatMessagesSubscription = { __typename?: 'subscription_root', chat_messages: Array<{ __typename?: 'chat_messages', timestamp: any, id: any, message: string, poster_id: string, user_info: { __typename?: 'user_info', nickname: string, id: string } }> };

export type SendNewMessageMutationVariables = Exact<{
  message?: Maybe<Scalars['String']>;
}>;


export type SendNewMessageMutation = { __typename?: 'mutation_root', insert_chat_messages_one?: Maybe<{ __typename?: 'chat_messages', message: string }> };

export type IdleGameCountersRealTimeDescSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IdleGameCountersRealTimeDescSubscription = { __typename?: 'subscription_root', idle_test: Array<{ __typename?: 'idle_test', counter: number, id: any, user?: Maybe<{ __typename?: 'user_info', nickname: string }> }> };

export type IdleGameCountersQueryVariables = Exact<{ [key: string]: never; }>;


export type IdleGameCountersQuery = { __typename?: 'query_root', idle_test: Array<{ __typename?: 'idle_test', id: any, counter: number }> };

export type IdleGameCounterRealTimeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IdleGameCounterRealTimeSubscription = { __typename?: 'subscription_root', idle_test: Array<{ __typename?: 'idle_test', id: any, counter: number }> };


export const GetChatMessagesDocument = gql`
    subscription GetChatMessages {
  chat_messages(order_by: {timestamp: desc}, limit: 200) {
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
export function useGetChatMessagesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetChatMessagesSubscription, GetChatMessagesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetChatMessagesSubscription, GetChatMessagesSubscriptionVariables>(GetChatMessagesDocument, options);
      }
export type GetChatMessagesSubscriptionHookResult = ReturnType<typeof useGetChatMessagesSubscription>;
export type GetChatMessagesSubscriptionResult = Apollo.SubscriptionResult<GetChatMessagesSubscription>;
export const SendNewMessageDocument = gql`
    mutation SendNewMessage($message: String) {
  insert_chat_messages_one(object: {message: $message}) {
    message
  }
}
    `;
export type SendNewMessageMutationFn = Apollo.MutationFunction<SendNewMessageMutation, SendNewMessageMutationVariables>;

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
export function useSendNewMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendNewMessageMutation, SendNewMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNewMessageMutation, SendNewMessageMutationVariables>(SendNewMessageDocument, options);
      }
export type SendNewMessageMutationHookResult = ReturnType<typeof useSendNewMessageMutation>;
export type SendNewMessageMutationResult = Apollo.MutationResult<SendNewMessageMutation>;
export type SendNewMessageMutationOptions = Apollo.BaseMutationOptions<SendNewMessageMutation, SendNewMessageMutationVariables>;
export const IdleGameCountersRealTimeDescDocument = gql`
    subscription IdleGameCountersRealTimeDesc {
  idle_test(order_by: {counter: desc}) {
    user {
      nickname
    }
    counter
    id
  }
}
    `;

/**
 * __useIdleGameCountersRealTimeDescSubscription__
 *
 * To run a query within a React component, call `useIdleGameCountersRealTimeDescSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIdleGameCountersRealTimeDescSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdleGameCountersRealTimeDescSubscription({
 *   variables: {
 *   },
 * });
 */
export function useIdleGameCountersRealTimeDescSubscription(baseOptions?: Apollo.SubscriptionHookOptions<IdleGameCountersRealTimeDescSubscription, IdleGameCountersRealTimeDescSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<IdleGameCountersRealTimeDescSubscription, IdleGameCountersRealTimeDescSubscriptionVariables>(IdleGameCountersRealTimeDescDocument, options);
      }
export type IdleGameCountersRealTimeDescSubscriptionHookResult = ReturnType<typeof useIdleGameCountersRealTimeDescSubscription>;
export type IdleGameCountersRealTimeDescSubscriptionResult = Apollo.SubscriptionResult<IdleGameCountersRealTimeDescSubscription>;
export const IdleGameCountersDocument = gql`
    query IdleGameCounters {
  idle_test {
    id
    counter
  }
}
    `;

/**
 * __useIdleGameCountersQuery__
 *
 * To run a query within a React component, call `useIdleGameCountersQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdleGameCountersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdleGameCountersQuery({
 *   variables: {
 *   },
 * });
 */
export function useIdleGameCountersQuery(baseOptions?: Apollo.QueryHookOptions<IdleGameCountersQuery, IdleGameCountersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IdleGameCountersQuery, IdleGameCountersQueryVariables>(IdleGameCountersDocument, options);
      }
export function useIdleGameCountersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IdleGameCountersQuery, IdleGameCountersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IdleGameCountersQuery, IdleGameCountersQueryVariables>(IdleGameCountersDocument, options);
        }
export type IdleGameCountersQueryHookResult = ReturnType<typeof useIdleGameCountersQuery>;
export type IdleGameCountersLazyQueryHookResult = ReturnType<typeof useIdleGameCountersLazyQuery>;
export type IdleGameCountersQueryResult = Apollo.QueryResult<IdleGameCountersQuery, IdleGameCountersQueryVariables>;
export const IdleGameCounterRealTimeDocument = gql`
    subscription IdleGameCounterRealTime {
  idle_test {
    id
    counter
  }
}
    `;

/**
 * __useIdleGameCounterRealTimeSubscription__
 *
 * To run a query within a React component, call `useIdleGameCounterRealTimeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIdleGameCounterRealTimeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdleGameCounterRealTimeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useIdleGameCounterRealTimeSubscription(baseOptions?: Apollo.SubscriptionHookOptions<IdleGameCounterRealTimeSubscription, IdleGameCounterRealTimeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<IdleGameCounterRealTimeSubscription, IdleGameCounterRealTimeSubscriptionVariables>(IdleGameCounterRealTimeDocument, options);
      }
export type IdleGameCounterRealTimeSubscriptionHookResult = ReturnType<typeof useIdleGameCounterRealTimeSubscription>;
export type IdleGameCounterRealTimeSubscriptionResult = Apollo.SubscriptionResult<IdleGameCounterRealTimeSubscription>;
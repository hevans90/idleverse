import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _numeric: number[];
  _text: string[];
  numeric: number;
  timestamp: string;
  timestamptz: string;
  uuid: string;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type CelestialManagement = {
  __typename?: 'CelestialManagement';
  createdPlanet: PartialPlanet;
};

export type GalaxyManagement = {
  __typename?: 'GalaxyManagement';
  insertedCelestialId: Scalars['String'];
  insertedCelestialName: Scalars['String'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type PartialPlanet = {
  __typename?: 'PartialPlanet';
  id: Scalars['String'];
  name: Scalars['String'];
  owner_id: Scalars['String'];
};

export type PlanetCreationInput = {
  atmospheric_distance: Scalars['Float'];
  celestial_id: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner_id: Scalars['String'];
  radius: Scalars['Float'];
  rings: RingInsertInputWrapper;
  terrain_bias: Array<Scalars['Float']>;
  terrain_hex_palette_id: Scalars['String'];
  texture_resolution: Scalars['Float'];
};

export type QuestCompletion = {
  __typename?: 'QuestCompletion';
  next_quest_in_chain_added?: Maybe<Scalars['String']>;
  quest_id: Scalars['String'];
  rewards: Array<QuestReward>;
};

export type QuestReward = {
  __typename?: 'QuestReward';
  npc_unlock_id: Scalars['String'];
  resource_accrual_amount: Scalars['Float'];
  resource_accrual_type_id: Scalars['String'];
  resource_unlock_id: Scalars['String'];
  type: Scalars['String'];
};

export type QuestStepProgression = {
  __typename?: 'QuestStepProgression';
  next_step_in_quest_added?: Maybe<Scalars['String']>;
  quest_id: Scalars['String'];
};

export type Register = {
  __typename?: 'Register';
  updatedName: Scalars['String'];
};

export type RingInsertInput = {
  colors: Array<Scalars['String']>;
  inner_radius: Scalars['Float'];
  outer_radius: Scalars['Float'];
  resolution: Scalars['Float'];
  rotation: Array<Scalars['Float']>;
  terrain_bias: Array<Scalars['Float']>;
  type: Scalars['String'];
};

export type RingInsertInputWrapper = {
  data: Array<RingInsertInput>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "_numeric". All fields are combined with logical 'AND'. */
export type _Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_numeric']>;
  _gt?: InputMaybe<Scalars['_numeric']>;
  _gte?: InputMaybe<Scalars['_numeric']>;
  _in?: InputMaybe<Array<Scalars['_numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_numeric']>;
  _lte?: InputMaybe<Scalars['_numeric']>;
  _neq?: InputMaybe<Scalars['_numeric']>;
  _nin?: InputMaybe<Array<Scalars['_numeric']>>;
};

/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_text']>;
  _gt?: InputMaybe<Scalars['_text']>;
  _gte?: InputMaybe<Scalars['_text']>;
  _in?: InputMaybe<Array<Scalars['_text']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_text']>;
  _lte?: InputMaybe<Scalars['_text']>;
  _neq?: InputMaybe<Scalars['_text']>;
  _nin?: InputMaybe<Array<Scalars['_text']>>;
};

/** Playable backgrounds */
export type Background = {
  __typename?: 'background';
  description: Scalars['String'];
  id: Scalars['uuid'];
  image_url?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** aggregated selection of "background" */
export type Background_Aggregate = {
  __typename?: 'background_aggregate';
  aggregate?: Maybe<Background_Aggregate_Fields>;
  nodes: Array<Background>;
};

/** aggregate fields of "background" */
export type Background_Aggregate_Fields = {
  __typename?: 'background_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Background_Max_Fields>;
  min?: Maybe<Background_Min_Fields>;
};


/** aggregate fields of "background" */
export type Background_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Background_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "background". All fields are combined with a logical 'AND'. */
export type Background_Bool_Exp = {
  _and?: InputMaybe<Array<Background_Bool_Exp>>;
  _not?: InputMaybe<Background_Bool_Exp>;
  _or?: InputMaybe<Array<Background_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "background" */
export enum Background_Constraint {
  /** unique or primary key constraint on columns "name" */
  BackgroundNameKey = 'background_name_key',
  /** unique or primary key constraint on columns "id" */
  BackgroundPkey = 'background_pkey'
}

/** input type for inserting data into table "background" */
export type Background_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Background_Max_Fields = {
  __typename?: 'background_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Background_Min_Fields = {
  __typename?: 'background_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "background" */
export type Background_Mutation_Response = {
  __typename?: 'background_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Background>;
};

/** input type for inserting object relation for remote table "background" */
export type Background_Obj_Rel_Insert_Input = {
  data: Background_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Background_On_Conflict>;
};

/** on_conflict condition type for table "background" */
export type Background_On_Conflict = {
  constraint: Background_Constraint;
  update_columns?: Array<Background_Update_Column>;
  where?: InputMaybe<Background_Bool_Exp>;
};

/** Ordering options when selecting data from "background". */
export type Background_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: background */
export type Background_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "background" */
export enum Background_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "background" */
export type Background_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "background" */
export type Background_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Background_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Background_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "background" */
export enum Background_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name'
}

export type Background_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Background_Set_Input>;
  where: Background_Bool_Exp;
};

/** columns and relationships of "celestial" */
export type Celestial = {
  __typename?: 'celestial';
  /** An object relationship */
  galactic_empire?: Maybe<Galactic_Empire>;
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  galaxy: Galaxy;
  galaxy_id: Scalars['uuid'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  /** An array relationship */
  planets: Array<Planet>;
  /** An aggregate relationship */
  planets_aggregate: Planet_Aggregate;
  /** An object relationship */
  user_info?: Maybe<User_Info>;
};


/** columns and relationships of "celestial" */
export type CelestialPlanetsArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


/** columns and relationships of "celestial" */
export type CelestialPlanets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};

/** aggregated selection of "celestial" */
export type Celestial_Aggregate = {
  __typename?: 'celestial_aggregate';
  aggregate?: Maybe<Celestial_Aggregate_Fields>;
  nodes: Array<Celestial>;
};

/** aggregate fields of "celestial" */
export type Celestial_Aggregate_Fields = {
  __typename?: 'celestial_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Celestial_Max_Fields>;
  min?: Maybe<Celestial_Min_Fields>;
};


/** aggregate fields of "celestial" */
export type Celestial_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Celestial_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "celestial" */
export type Celestial_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Celestial_Max_Order_By>;
  min?: InputMaybe<Celestial_Min_Order_By>;
};

/** input type for inserting array relation for remote table "celestial" */
export type Celestial_Arr_Rel_Insert_Input = {
  data: Array<Celestial_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Celestial_On_Conflict>;
};

/** Boolean expression to filter rows from the table "celestial". All fields are combined with a logical 'AND'. */
export type Celestial_Bool_Exp = {
  _and?: InputMaybe<Array<Celestial_Bool_Exp>>;
  _not?: InputMaybe<Celestial_Bool_Exp>;
  _or?: InputMaybe<Array<Celestial_Bool_Exp>>;
  galactic_empire?: InputMaybe<Galactic_Empire_Bool_Exp>;
  galactic_empire_id?: InputMaybe<Uuid_Comparison_Exp>;
  galaxy?: InputMaybe<Galaxy_Bool_Exp>;
  galaxy_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  planets?: InputMaybe<Planet_Bool_Exp>;
  user_info?: InputMaybe<User_Info_Bool_Exp>;
};

/** unique or primary key constraints on table "celestial" */
export enum Celestial_Constraint {
  /** unique or primary key constraint on columns "id" */
  SystemPkey = 'system_pkey'
}

/** input type for inserting data into table "celestial" */
export type Celestial_Insert_Input = {
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  galaxy?: InputMaybe<Galaxy_Obj_Rel_Insert_Input>;
  galaxy_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  planets?: InputMaybe<Planet_Arr_Rel_Insert_Input>;
  user_info?: InputMaybe<User_Info_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Celestial_Max_Fields = {
  __typename?: 'celestial_max_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  galaxy_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "celestial" */
export type Celestial_Max_Order_By = {
  galactic_empire_id?: InputMaybe<Order_By>;
  galaxy_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Celestial_Min_Fields = {
  __typename?: 'celestial_min_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  galaxy_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "celestial" */
export type Celestial_Min_Order_By = {
  galactic_empire_id?: InputMaybe<Order_By>;
  galaxy_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "celestial" */
export type Celestial_Mutation_Response = {
  __typename?: 'celestial_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Celestial>;
};

/** input type for inserting object relation for remote table "celestial" */
export type Celestial_Obj_Rel_Insert_Input = {
  data: Celestial_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Celestial_On_Conflict>;
};

/** on_conflict condition type for table "celestial" */
export type Celestial_On_Conflict = {
  constraint: Celestial_Constraint;
  update_columns?: Array<Celestial_Update_Column>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};

/** Ordering options when selecting data from "celestial". */
export type Celestial_Order_By = {
  galactic_empire?: InputMaybe<Galactic_Empire_Order_By>;
  galactic_empire_id?: InputMaybe<Order_By>;
  galaxy?: InputMaybe<Galaxy_Order_By>;
  galaxy_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  planets_aggregate?: InputMaybe<Planet_Aggregate_Order_By>;
  user_info?: InputMaybe<User_Info_Order_By>;
};

/** primary key columns input for table: celestial */
export type Celestial_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "celestial" */
export enum Celestial_Select_Column {
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  GalaxyId = 'galaxy_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id'
}

/** input type for updating data in table "celestial" */
export type Celestial_Set_Input = {
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  galaxy_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "celestial" */
export type Celestial_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Celestial_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Celestial_Stream_Cursor_Value_Input = {
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  galaxy_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "celestial" */
export enum Celestial_Update_Column {
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  GalaxyId = 'galaxy_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id'
}

export type Celestial_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Celestial_Set_Input>;
  where: Celestial_Bool_Exp;
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

/** aggregated selection of "chat_message" */
export type Chat_Message_Aggregate = {
  __typename?: 'chat_message_aggregate';
  aggregate?: Maybe<Chat_Message_Aggregate_Fields>;
  nodes: Array<Chat_Message>;
};

/** aggregate fields of "chat_message" */
export type Chat_Message_Aggregate_Fields = {
  __typename?: 'chat_message_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Chat_Message_Max_Fields>;
  min?: Maybe<Chat_Message_Min_Fields>;
};


/** aggregate fields of "chat_message" */
export type Chat_Message_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Chat_Message_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "chat_message" */
export type Chat_Message_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Chat_Message_Max_Order_By>;
  min?: InputMaybe<Chat_Message_Min_Order_By>;
};

/** input type for inserting array relation for remote table "chat_message" */
export type Chat_Message_Arr_Rel_Insert_Input = {
  data: Array<Chat_Message_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Chat_Message_On_Conflict>;
};

/** Boolean expression to filter rows from the table "chat_message". All fields are combined with a logical 'AND'. */
export type Chat_Message_Bool_Exp = {
  _and?: InputMaybe<Array<Chat_Message_Bool_Exp>>;
  _not?: InputMaybe<Chat_Message_Bool_Exp>;
  _or?: InputMaybe<Array<Chat_Message_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  poster_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  user_info?: InputMaybe<User_Info_Bool_Exp>;
};

/** unique or primary key constraints on table "chat_message" */
export enum Chat_Message_Constraint {
  /** unique or primary key constraint on columns "id" */
  ChatMessagesPkey = 'chat_messages_pkey'
}

/** input type for inserting data into table "chat_message" */
export type Chat_Message_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  message?: InputMaybe<Scalars['String']>;
  poster_id?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamp']>;
  user_info?: InputMaybe<User_Info_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Chat_Message_Max_Fields = {
  __typename?: 'chat_message_max_fields';
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  poster_id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "chat_message" */
export type Chat_Message_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  poster_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Message_Min_Fields = {
  __typename?: 'chat_message_min_fields';
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  poster_id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "chat_message" */
export type Chat_Message_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  poster_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "chat_message" */
export type Chat_Message_Mutation_Response = {
  __typename?: 'chat_message_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Chat_Message>;
};

/** on_conflict condition type for table "chat_message" */
export type Chat_Message_On_Conflict = {
  constraint: Chat_Message_Constraint;
  update_columns?: Array<Chat_Message_Update_Column>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};

/** Ordering options when selecting data from "chat_message". */
export type Chat_Message_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  poster_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  user_info?: InputMaybe<User_Info_Order_By>;
};

/** primary key columns input for table: chat_message */
export type Chat_Message_Pk_Columns_Input = {
  id: Scalars['uuid'];
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
  Timestamp = 'timestamp'
}

/** input type for updating data in table "chat_message" */
export type Chat_Message_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  message?: InputMaybe<Scalars['String']>;
  poster_id?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamp']>;
};

/** Streaming cursor of the table "chat_message" */
export type Chat_Message_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chat_Message_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chat_Message_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  message?: InputMaybe<Scalars['String']>;
  poster_id?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "chat_message" */
export enum Chat_Message_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  PosterId = 'poster_id',
  /** column name */
  Timestamp = 'timestamp'
}

export type Chat_Message_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Chat_Message_Set_Input>;
  where: Chat_Message_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** NPC factions */
export type Faction = {
  __typename?: 'faction';
  description: Scalars['String'];
  id: Scalars['uuid'];
  image_url?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** aggregated selection of "faction" */
export type Faction_Aggregate = {
  __typename?: 'faction_aggregate';
  aggregate?: Maybe<Faction_Aggregate_Fields>;
  nodes: Array<Faction>;
};

/** aggregate fields of "faction" */
export type Faction_Aggregate_Fields = {
  __typename?: 'faction_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Faction_Max_Fields>;
  min?: Maybe<Faction_Min_Fields>;
};


/** aggregate fields of "faction" */
export type Faction_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Faction_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "faction". All fields are combined with a logical 'AND'. */
export type Faction_Bool_Exp = {
  _and?: InputMaybe<Array<Faction_Bool_Exp>>;
  _not?: InputMaybe<Faction_Bool_Exp>;
  _or?: InputMaybe<Array<Faction_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "faction" */
export enum Faction_Constraint {
  /** unique or primary key constraint on columns "name" */
  FactionNameKey = 'faction_name_key',
  /** unique or primary key constraint on columns "id" */
  FactionPkey = 'faction_pkey'
}

/** input type for inserting data into table "faction" */
export type Faction_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Faction_Max_Fields = {
  __typename?: 'faction_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Faction_Min_Fields = {
  __typename?: 'faction_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "faction" */
export type Faction_Mutation_Response = {
  __typename?: 'faction_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Faction>;
};

/** input type for inserting object relation for remote table "faction" */
export type Faction_Obj_Rel_Insert_Input = {
  data: Faction_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Faction_On_Conflict>;
};

/** on_conflict condition type for table "faction" */
export type Faction_On_Conflict = {
  constraint: Faction_Constraint;
  update_columns?: Array<Faction_Update_Column>;
  where?: InputMaybe<Faction_Bool_Exp>;
};

/** Ordering options when selecting data from "faction". */
export type Faction_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: faction */
export type Faction_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "faction" */
export enum Faction_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "faction" */
export type Faction_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "faction" */
export type Faction_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Faction_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Faction_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "faction" */
export enum Faction_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name'
}

export type Faction_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Faction_Set_Input>;
  where: Faction_Bool_Exp;
};

/** columns and relationships of "galactic_empire" */
export type Galactic_Empire = {
  __typename?: 'galactic_empire';
  /** An object relationship */
  background: Background;
  background_id: Scalars['uuid'];
  celestial_claims: Scalars['Int'];
  /** An array relationship */
  celestials: Array<Celestial>;
  /** An aggregate relationship */
  celestials_aggregate: Celestial_Aggregate;
  /** An object relationship */
  faction: Faction;
  faction_id: Scalars['uuid'];
  /** An object relationship */
  galaxy: Galaxy;
  galaxy_id: Scalars['uuid'];
  /** An object relationship */
  homeworld?: Maybe<Planet>;
  homeworld_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  /** An array relationship */
  npcs: Array<Galactic_Empire_Npc>;
  /** An aggregate relationship */
  npcs_aggregate: Galactic_Empire_Npc_Aggregate;
  /** An object relationship */
  playable_race: Playable_Race;
  playable_race_id: Scalars['uuid'];
  /** An array relationship */
  quests: Array<Galactic_Empire_Quest>;
  /** An aggregate relationship */
  quests_aggregate: Galactic_Empire_Quest_Aggregate;
  /** An array relationship */
  resources: Array<Galactic_Empire_Resources>;
  /** An aggregate relationship */
  resources_aggregate: Galactic_Empire_Resources_Aggregate;
  user_id: Scalars['String'];
  /** An object relationship */
  user_info: User_Info;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireCelestialsArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireCelestials_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireNpcsArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireNpcs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireQuestsArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireQuests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireResourcesArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireResources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};

/** aggregated selection of "galactic_empire" */
export type Galactic_Empire_Aggregate = {
  __typename?: 'galactic_empire_aggregate';
  aggregate?: Maybe<Galactic_Empire_Aggregate_Fields>;
  nodes: Array<Galactic_Empire>;
};

/** aggregate fields of "galactic_empire" */
export type Galactic_Empire_Aggregate_Fields = {
  __typename?: 'galactic_empire_aggregate_fields';
  avg?: Maybe<Galactic_Empire_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Galactic_Empire_Max_Fields>;
  min?: Maybe<Galactic_Empire_Min_Fields>;
  stddev?: Maybe<Galactic_Empire_Stddev_Fields>;
  stddev_pop?: Maybe<Galactic_Empire_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Galactic_Empire_Stddev_Samp_Fields>;
  sum?: Maybe<Galactic_Empire_Sum_Fields>;
  var_pop?: Maybe<Galactic_Empire_Var_Pop_Fields>;
  var_samp?: Maybe<Galactic_Empire_Var_Samp_Fields>;
  variance?: Maybe<Galactic_Empire_Variance_Fields>;
};


/** aggregate fields of "galactic_empire" */
export type Galactic_Empire_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "galactic_empire" */
export type Galactic_Empire_Aggregate_Order_By = {
  avg?: InputMaybe<Galactic_Empire_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Galactic_Empire_Max_Order_By>;
  min?: InputMaybe<Galactic_Empire_Min_Order_By>;
  stddev?: InputMaybe<Galactic_Empire_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Galactic_Empire_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Galactic_Empire_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Galactic_Empire_Sum_Order_By>;
  var_pop?: InputMaybe<Galactic_Empire_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Galactic_Empire_Var_Samp_Order_By>;
  variance?: InputMaybe<Galactic_Empire_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "galactic_empire" */
export type Galactic_Empire_Arr_Rel_Insert_Input = {
  data: Array<Galactic_Empire_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Galactic_Empire_On_Conflict>;
};

/** aggregate avg on columns */
export type Galactic_Empire_Avg_Fields = {
  __typename?: 'galactic_empire_avg_fields';
  celestial_claims?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "galactic_empire" */
export type Galactic_Empire_Avg_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "galactic_empire". All fields are combined with a logical 'AND'. */
export type Galactic_Empire_Bool_Exp = {
  _and?: InputMaybe<Array<Galactic_Empire_Bool_Exp>>;
  _not?: InputMaybe<Galactic_Empire_Bool_Exp>;
  _or?: InputMaybe<Array<Galactic_Empire_Bool_Exp>>;
  background?: InputMaybe<Background_Bool_Exp>;
  background_id?: InputMaybe<Uuid_Comparison_Exp>;
  celestial_claims?: InputMaybe<Int_Comparison_Exp>;
  celestials?: InputMaybe<Celestial_Bool_Exp>;
  faction?: InputMaybe<Faction_Bool_Exp>;
  faction_id?: InputMaybe<Uuid_Comparison_Exp>;
  galaxy?: InputMaybe<Galaxy_Bool_Exp>;
  galaxy_id?: InputMaybe<Uuid_Comparison_Exp>;
  homeworld?: InputMaybe<Planet_Bool_Exp>;
  homeworld_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  npcs?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
  playable_race?: InputMaybe<Playable_Race_Bool_Exp>;
  playable_race_id?: InputMaybe<Uuid_Comparison_Exp>;
  quests?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
  resources?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
  user_info?: InputMaybe<User_Info_Bool_Exp>;
};

/** unique or primary key constraints on table "galactic_empire" */
export enum Galactic_Empire_Constraint {
  /** unique or primary key constraint on columns "id" */
  GalacticEmpirePkey = 'galactic_empire_pkey',
  /** unique or primary key constraint on columns "user_id", "galaxy_id" */
  GalacticEmpireUserIdGalaxyIdKey = 'galactic_empire_user_id_galaxy_id_key'
}

/** input type for incrementing numeric columns in table "galactic_empire" */
export type Galactic_Empire_Inc_Input = {
  celestial_claims?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "galactic_empire" */
export type Galactic_Empire_Insert_Input = {
  background?: InputMaybe<Background_Obj_Rel_Insert_Input>;
  background_id?: InputMaybe<Scalars['uuid']>;
  celestial_claims?: InputMaybe<Scalars['Int']>;
  celestials?: InputMaybe<Celestial_Arr_Rel_Insert_Input>;
  faction?: InputMaybe<Faction_Obj_Rel_Insert_Input>;
  faction_id?: InputMaybe<Scalars['uuid']>;
  galaxy?: InputMaybe<Galaxy_Obj_Rel_Insert_Input>;
  galaxy_id?: InputMaybe<Scalars['uuid']>;
  homeworld?: InputMaybe<Planet_Obj_Rel_Insert_Input>;
  homeworld_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  npcs?: InputMaybe<Galactic_Empire_Npc_Arr_Rel_Insert_Input>;
  playable_race?: InputMaybe<Playable_Race_Obj_Rel_Insert_Input>;
  playable_race_id?: InputMaybe<Scalars['uuid']>;
  quests?: InputMaybe<Galactic_Empire_Quest_Arr_Rel_Insert_Input>;
  resources?: InputMaybe<Galactic_Empire_Resources_Arr_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']>;
  user_info?: InputMaybe<User_Info_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Galactic_Empire_Max_Fields = {
  __typename?: 'galactic_empire_max_fields';
  background_id?: Maybe<Scalars['uuid']>;
  celestial_claims?: Maybe<Scalars['Int']>;
  faction_id?: Maybe<Scalars['uuid']>;
  galaxy_id?: Maybe<Scalars['uuid']>;
  homeworld_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  playable_race_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "galactic_empire" */
export type Galactic_Empire_Max_Order_By = {
  background_id?: InputMaybe<Order_By>;
  celestial_claims?: InputMaybe<Order_By>;
  faction_id?: InputMaybe<Order_By>;
  galaxy_id?: InputMaybe<Order_By>;
  homeworld_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  playable_race_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Galactic_Empire_Min_Fields = {
  __typename?: 'galactic_empire_min_fields';
  background_id?: Maybe<Scalars['uuid']>;
  celestial_claims?: Maybe<Scalars['Int']>;
  faction_id?: Maybe<Scalars['uuid']>;
  galaxy_id?: Maybe<Scalars['uuid']>;
  homeworld_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  playable_race_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "galactic_empire" */
export type Galactic_Empire_Min_Order_By = {
  background_id?: InputMaybe<Order_By>;
  celestial_claims?: InputMaybe<Order_By>;
  faction_id?: InputMaybe<Order_By>;
  galaxy_id?: InputMaybe<Order_By>;
  homeworld_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  playable_race_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "galactic_empire" */
export type Galactic_Empire_Mutation_Response = {
  __typename?: 'galactic_empire_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Galactic_Empire>;
};

/** NPCs unlocked for this empire */
export type Galactic_Empire_Npc = {
  __typename?: 'galactic_empire_npc';
  /** An object relationship */
  galactic_empire: Galactic_Empire;
  galactic_empire_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  npc: Npc;
  npc_id: Scalars['uuid'];
};

/** aggregated selection of "galactic_empire_npc" */
export type Galactic_Empire_Npc_Aggregate = {
  __typename?: 'galactic_empire_npc_aggregate';
  aggregate?: Maybe<Galactic_Empire_Npc_Aggregate_Fields>;
  nodes: Array<Galactic_Empire_Npc>;
};

/** aggregate fields of "galactic_empire_npc" */
export type Galactic_Empire_Npc_Aggregate_Fields = {
  __typename?: 'galactic_empire_npc_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Galactic_Empire_Npc_Max_Fields>;
  min?: Maybe<Galactic_Empire_Npc_Min_Fields>;
};


/** aggregate fields of "galactic_empire_npc" */
export type Galactic_Empire_Npc_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "galactic_empire_npc" */
export type Galactic_Empire_Npc_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Galactic_Empire_Npc_Max_Order_By>;
  min?: InputMaybe<Galactic_Empire_Npc_Min_Order_By>;
};

/** input type for inserting array relation for remote table "galactic_empire_npc" */
export type Galactic_Empire_Npc_Arr_Rel_Insert_Input = {
  data: Array<Galactic_Empire_Npc_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Galactic_Empire_Npc_On_Conflict>;
};

/** Boolean expression to filter rows from the table "galactic_empire_npc". All fields are combined with a logical 'AND'. */
export type Galactic_Empire_Npc_Bool_Exp = {
  _and?: InputMaybe<Array<Galactic_Empire_Npc_Bool_Exp>>;
  _not?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
  _or?: InputMaybe<Array<Galactic_Empire_Npc_Bool_Exp>>;
  galactic_empire?: InputMaybe<Galactic_Empire_Bool_Exp>;
  galactic_empire_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  npc?: InputMaybe<Npc_Bool_Exp>;
  npc_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "galactic_empire_npc" */
export enum Galactic_Empire_Npc_Constraint {
  /** unique or primary key constraint on columns "npc_id", "galactic_empire_id" */
  GalacticEmpireNpcNpcIdGalacticEmpireIdKey = 'galactic_empire_npc_npc_id_galactic_empire_id_key',
  /** unique or primary key constraint on columns "id" */
  GalacticEmpireNpcPkey = 'galactic_empire_npc_pkey'
}

/** input type for inserting data into table "galactic_empire_npc" */
export type Galactic_Empire_Npc_Insert_Input = {
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  npc?: InputMaybe<Npc_Obj_Rel_Insert_Input>;
  npc_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Galactic_Empire_Npc_Max_Fields = {
  __typename?: 'galactic_empire_npc_max_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  npc_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "galactic_empire_npc" */
export type Galactic_Empire_Npc_Max_Order_By = {
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  npc_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Galactic_Empire_Npc_Min_Fields = {
  __typename?: 'galactic_empire_npc_min_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  npc_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "galactic_empire_npc" */
export type Galactic_Empire_Npc_Min_Order_By = {
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  npc_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "galactic_empire_npc" */
export type Galactic_Empire_Npc_Mutation_Response = {
  __typename?: 'galactic_empire_npc_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Galactic_Empire_Npc>;
};

/** on_conflict condition type for table "galactic_empire_npc" */
export type Galactic_Empire_Npc_On_Conflict = {
  constraint: Galactic_Empire_Npc_Constraint;
  update_columns?: Array<Galactic_Empire_Npc_Update_Column>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};

/** Ordering options when selecting data from "galactic_empire_npc". */
export type Galactic_Empire_Npc_Order_By = {
  galactic_empire?: InputMaybe<Galactic_Empire_Order_By>;
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  npc?: InputMaybe<Npc_Order_By>;
  npc_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: galactic_empire_npc */
export type Galactic_Empire_Npc_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "galactic_empire_npc" */
export enum Galactic_Empire_Npc_Select_Column {
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  Id = 'id',
  /** column name */
  NpcId = 'npc_id'
}

/** input type for updating data in table "galactic_empire_npc" */
export type Galactic_Empire_Npc_Set_Input = {
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  npc_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "galactic_empire_npc" */
export type Galactic_Empire_Npc_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Galactic_Empire_Npc_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Galactic_Empire_Npc_Stream_Cursor_Value_Input = {
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  npc_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "galactic_empire_npc" */
export enum Galactic_Empire_Npc_Update_Column {
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  Id = 'id',
  /** column name */
  NpcId = 'npc_id'
}

export type Galactic_Empire_Npc_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Galactic_Empire_Npc_Set_Input>;
  where: Galactic_Empire_Npc_Bool_Exp;
};

/** input type for inserting object relation for remote table "galactic_empire" */
export type Galactic_Empire_Obj_Rel_Insert_Input = {
  data: Galactic_Empire_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Galactic_Empire_On_Conflict>;
};

/** on_conflict condition type for table "galactic_empire" */
export type Galactic_Empire_On_Conflict = {
  constraint: Galactic_Empire_Constraint;
  update_columns?: Array<Galactic_Empire_Update_Column>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};

/** Ordering options when selecting data from "galactic_empire". */
export type Galactic_Empire_Order_By = {
  background?: InputMaybe<Background_Order_By>;
  background_id?: InputMaybe<Order_By>;
  celestial_claims?: InputMaybe<Order_By>;
  celestials_aggregate?: InputMaybe<Celestial_Aggregate_Order_By>;
  faction?: InputMaybe<Faction_Order_By>;
  faction_id?: InputMaybe<Order_By>;
  galaxy?: InputMaybe<Galaxy_Order_By>;
  galaxy_id?: InputMaybe<Order_By>;
  homeworld?: InputMaybe<Planet_Order_By>;
  homeworld_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  npcs_aggregate?: InputMaybe<Galactic_Empire_Npc_Aggregate_Order_By>;
  playable_race?: InputMaybe<Playable_Race_Order_By>;
  playable_race_id?: InputMaybe<Order_By>;
  quests_aggregate?: InputMaybe<Galactic_Empire_Quest_Aggregate_Order_By>;
  resources_aggregate?: InputMaybe<Galactic_Empire_Resources_Aggregate_Order_By>;
  user_id?: InputMaybe<Order_By>;
  user_info?: InputMaybe<User_Info_Order_By>;
};

/** primary key columns input for table: galactic_empire */
export type Galactic_Empire_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "galactic_empire_quest" */
export type Galactic_Empire_Quest = {
  __typename?: 'galactic_empire_quest';
  completed: Scalars['Boolean'];
  /** An object relationship */
  galactic_empire: Galactic_Empire;
  galactic_empire_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  quest: Quest;
  quest_id: Scalars['uuid'];
  quest_step_id: Scalars['uuid'];
};

/** aggregated selection of "galactic_empire_quest" */
export type Galactic_Empire_Quest_Aggregate = {
  __typename?: 'galactic_empire_quest_aggregate';
  aggregate?: Maybe<Galactic_Empire_Quest_Aggregate_Fields>;
  nodes: Array<Galactic_Empire_Quest>;
};

/** aggregate fields of "galactic_empire_quest" */
export type Galactic_Empire_Quest_Aggregate_Fields = {
  __typename?: 'galactic_empire_quest_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Galactic_Empire_Quest_Max_Fields>;
  min?: Maybe<Galactic_Empire_Quest_Min_Fields>;
};


/** aggregate fields of "galactic_empire_quest" */
export type Galactic_Empire_Quest_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Galactic_Empire_Quest_Max_Order_By>;
  min?: InputMaybe<Galactic_Empire_Quest_Min_Order_By>;
};

/** input type for inserting array relation for remote table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Arr_Rel_Insert_Input = {
  data: Array<Galactic_Empire_Quest_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Galactic_Empire_Quest_On_Conflict>;
};

/** Boolean expression to filter rows from the table "galactic_empire_quest". All fields are combined with a logical 'AND'. */
export type Galactic_Empire_Quest_Bool_Exp = {
  _and?: InputMaybe<Array<Galactic_Empire_Quest_Bool_Exp>>;
  _not?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
  _or?: InputMaybe<Array<Galactic_Empire_Quest_Bool_Exp>>;
  completed?: InputMaybe<Boolean_Comparison_Exp>;
  galactic_empire?: InputMaybe<Galactic_Empire_Bool_Exp>;
  galactic_empire_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  quest?: InputMaybe<Quest_Bool_Exp>;
  quest_id?: InputMaybe<Uuid_Comparison_Exp>;
  quest_step_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "galactic_empire_quest" */
export enum Galactic_Empire_Quest_Constraint {
  /** unique or primary key constraint on columns "id" */
  GalacticEmpireQuestPkey = 'galactic_empire_quest_pkey'
}

/** input type for inserting data into table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Insert_Input = {
  completed?: InputMaybe<Scalars['Boolean']>;
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  quest_step_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Galactic_Empire_Quest_Max_Fields = {
  __typename?: 'galactic_empire_quest_max_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  quest_id?: Maybe<Scalars['uuid']>;
  quest_step_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Max_Order_By = {
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quest_id?: InputMaybe<Order_By>;
  quest_step_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Galactic_Empire_Quest_Min_Fields = {
  __typename?: 'galactic_empire_quest_min_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  quest_id?: Maybe<Scalars['uuid']>;
  quest_step_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Min_Order_By = {
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quest_id?: InputMaybe<Order_By>;
  quest_step_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Mutation_Response = {
  __typename?: 'galactic_empire_quest_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Galactic_Empire_Quest>;
};

/** on_conflict condition type for table "galactic_empire_quest" */
export type Galactic_Empire_Quest_On_Conflict = {
  constraint: Galactic_Empire_Quest_Constraint;
  update_columns?: Array<Galactic_Empire_Quest_Update_Column>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};

/** Ordering options when selecting data from "galactic_empire_quest". */
export type Galactic_Empire_Quest_Order_By = {
  completed?: InputMaybe<Order_By>;
  galactic_empire?: InputMaybe<Galactic_Empire_Order_By>;
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  quest?: InputMaybe<Quest_Order_By>;
  quest_id?: InputMaybe<Order_By>;
  quest_step_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: galactic_empire_quest */
export type Galactic_Empire_Quest_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "galactic_empire_quest" */
export enum Galactic_Empire_Quest_Select_Column {
  /** column name */
  Completed = 'completed',
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  Id = 'id',
  /** column name */
  QuestId = 'quest_id',
  /** column name */
  QuestStepId = 'quest_step_id'
}

/** input type for updating data in table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Set_Input = {
  completed?: InputMaybe<Scalars['Boolean']>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  quest_step_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Galactic_Empire_Quest_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Galactic_Empire_Quest_Stream_Cursor_Value_Input = {
  completed?: InputMaybe<Scalars['Boolean']>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  quest_step_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "galactic_empire_quest" */
export enum Galactic_Empire_Quest_Update_Column {
  /** column name */
  Completed = 'completed',
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  Id = 'id',
  /** column name */
  QuestId = 'quest_id',
  /** column name */
  QuestStepId = 'quest_step_id'
}

export type Galactic_Empire_Quest_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Galactic_Empire_Quest_Set_Input>;
  where: Galactic_Empire_Quest_Bool_Exp;
};

/** columns and relationships of "galactic_empire_resources" */
export type Galactic_Empire_Resources = {
  __typename?: 'galactic_empire_resources';
  /** An object relationship */
  galactic_empire: Galactic_Empire;
  galactic_empire_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  resource_type: Resource_Type;
  resource_type_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  value: Scalars['Int'];
};

/** aggregated selection of "galactic_empire_resources" */
export type Galactic_Empire_Resources_Aggregate = {
  __typename?: 'galactic_empire_resources_aggregate';
  aggregate?: Maybe<Galactic_Empire_Resources_Aggregate_Fields>;
  nodes: Array<Galactic_Empire_Resources>;
};

/** aggregate fields of "galactic_empire_resources" */
export type Galactic_Empire_Resources_Aggregate_Fields = {
  __typename?: 'galactic_empire_resources_aggregate_fields';
  avg?: Maybe<Galactic_Empire_Resources_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Galactic_Empire_Resources_Max_Fields>;
  min?: Maybe<Galactic_Empire_Resources_Min_Fields>;
  stddev?: Maybe<Galactic_Empire_Resources_Stddev_Fields>;
  stddev_pop?: Maybe<Galactic_Empire_Resources_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Galactic_Empire_Resources_Stddev_Samp_Fields>;
  sum?: Maybe<Galactic_Empire_Resources_Sum_Fields>;
  var_pop?: Maybe<Galactic_Empire_Resources_Var_Pop_Fields>;
  var_samp?: Maybe<Galactic_Empire_Resources_Var_Samp_Fields>;
  variance?: Maybe<Galactic_Empire_Resources_Variance_Fields>;
};


/** aggregate fields of "galactic_empire_resources" */
export type Galactic_Empire_Resources_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Aggregate_Order_By = {
  avg?: InputMaybe<Galactic_Empire_Resources_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Galactic_Empire_Resources_Max_Order_By>;
  min?: InputMaybe<Galactic_Empire_Resources_Min_Order_By>;
  stddev?: InputMaybe<Galactic_Empire_Resources_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Galactic_Empire_Resources_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Galactic_Empire_Resources_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Galactic_Empire_Resources_Sum_Order_By>;
  var_pop?: InputMaybe<Galactic_Empire_Resources_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Galactic_Empire_Resources_Var_Samp_Order_By>;
  variance?: InputMaybe<Galactic_Empire_Resources_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Arr_Rel_Insert_Input = {
  data: Array<Galactic_Empire_Resources_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Galactic_Empire_Resources_On_Conflict>;
};

/** aggregate avg on columns */
export type Galactic_Empire_Resources_Avg_Fields = {
  __typename?: 'galactic_empire_resources_avg_fields';
  value?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Avg_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "galactic_empire_resources". All fields are combined with a logical 'AND'. */
export type Galactic_Empire_Resources_Bool_Exp = {
  _and?: InputMaybe<Array<Galactic_Empire_Resources_Bool_Exp>>;
  _not?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
  _or?: InputMaybe<Array<Galactic_Empire_Resources_Bool_Exp>>;
  galactic_empire?: InputMaybe<Galactic_Empire_Bool_Exp>;
  galactic_empire_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  resource_type?: InputMaybe<Resource_Type_Bool_Exp>;
  resource_type_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  value?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "galactic_empire_resources" */
export enum Galactic_Empire_Resources_Constraint {
  /** unique or primary key constraint on columns "id" */
  GalacticEmpireResourcesPkey = 'galactic_empire_resources_pkey',
  /** unique or primary key constraint on columns "galactic_empire_id", "resource_type_id" */
  GalacticEmpireResourcesResourceTypeIdGalacticEmpireIdK = 'galactic_empire_resources_resource_type_id_galactic_empire_id_k'
}

/** input type for incrementing numeric columns in table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Inc_Input = {
  value?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Insert_Input = {
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  resource_type?: InputMaybe<Resource_Type_Obj_Rel_Insert_Input>;
  resource_type_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  value?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Galactic_Empire_Resources_Max_Fields = {
  __typename?: 'galactic_empire_resources_max_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  resource_type_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Max_Order_By = {
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  resource_type_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Galactic_Empire_Resources_Min_Fields = {
  __typename?: 'galactic_empire_resources_min_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  resource_type_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Min_Order_By = {
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  resource_type_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Mutation_Response = {
  __typename?: 'galactic_empire_resources_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Galactic_Empire_Resources>;
};

/** on_conflict condition type for table "galactic_empire_resources" */
export type Galactic_Empire_Resources_On_Conflict = {
  constraint: Galactic_Empire_Resources_Constraint;
  update_columns?: Array<Galactic_Empire_Resources_Update_Column>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};

/** Ordering options when selecting data from "galactic_empire_resources". */
export type Galactic_Empire_Resources_Order_By = {
  galactic_empire?: InputMaybe<Galactic_Empire_Order_By>;
  galactic_empire_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  resource_type?: InputMaybe<Resource_Type_Order_By>;
  resource_type_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: galactic_empire_resources */
export type Galactic_Empire_Resources_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "galactic_empire_resources" */
export enum Galactic_Empire_Resources_Select_Column {
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  Id = 'id',
  /** column name */
  ResourceTypeId = 'resource_type_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Set_Input = {
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  resource_type_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  value?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Galactic_Empire_Resources_Stddev_Fields = {
  __typename?: 'galactic_empire_resources_stddev_fields';
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Stddev_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Galactic_Empire_Resources_Stddev_Pop_Fields = {
  __typename?: 'galactic_empire_resources_stddev_pop_fields';
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Stddev_Pop_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Galactic_Empire_Resources_Stddev_Samp_Fields = {
  __typename?: 'galactic_empire_resources_stddev_samp_fields';
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Stddev_Samp_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Galactic_Empire_Resources_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Galactic_Empire_Resources_Stream_Cursor_Value_Input = {
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  resource_type_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  value?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Galactic_Empire_Resources_Sum_Fields = {
  __typename?: 'galactic_empire_resources_sum_fields';
  value?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Sum_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** update columns of table "galactic_empire_resources" */
export enum Galactic_Empire_Resources_Update_Column {
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  Id = 'id',
  /** column name */
  ResourceTypeId = 'resource_type_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

export type Galactic_Empire_Resources_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Galactic_Empire_Resources_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Galactic_Empire_Resources_Set_Input>;
  where: Galactic_Empire_Resources_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Galactic_Empire_Resources_Var_Pop_Fields = {
  __typename?: 'galactic_empire_resources_var_pop_fields';
  value?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Var_Pop_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Galactic_Empire_Resources_Var_Samp_Fields = {
  __typename?: 'galactic_empire_resources_var_samp_fields';
  value?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Var_Samp_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Galactic_Empire_Resources_Variance_Fields = {
  __typename?: 'galactic_empire_resources_variance_fields';
  value?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Variance_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** select columns of table "galactic_empire" */
export enum Galactic_Empire_Select_Column {
  /** column name */
  BackgroundId = 'background_id',
  /** column name */
  CelestialClaims = 'celestial_claims',
  /** column name */
  FactionId = 'faction_id',
  /** column name */
  GalaxyId = 'galaxy_id',
  /** column name */
  HomeworldId = 'homeworld_id',
  /** column name */
  Id = 'id',
  /** column name */
  PlayableRaceId = 'playable_race_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "galactic_empire" */
export type Galactic_Empire_Set_Input = {
  background_id?: InputMaybe<Scalars['uuid']>;
  celestial_claims?: InputMaybe<Scalars['Int']>;
  faction_id?: InputMaybe<Scalars['uuid']>;
  galaxy_id?: InputMaybe<Scalars['uuid']>;
  homeworld_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  playable_race_id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Galactic_Empire_Stddev_Fields = {
  __typename?: 'galactic_empire_stddev_fields';
  celestial_claims?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "galactic_empire" */
export type Galactic_Empire_Stddev_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Galactic_Empire_Stddev_Pop_Fields = {
  __typename?: 'galactic_empire_stddev_pop_fields';
  celestial_claims?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "galactic_empire" */
export type Galactic_Empire_Stddev_Pop_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Galactic_Empire_Stddev_Samp_Fields = {
  __typename?: 'galactic_empire_stddev_samp_fields';
  celestial_claims?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "galactic_empire" */
export type Galactic_Empire_Stddev_Samp_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "galactic_empire" */
export type Galactic_Empire_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Galactic_Empire_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Galactic_Empire_Stream_Cursor_Value_Input = {
  background_id?: InputMaybe<Scalars['uuid']>;
  celestial_claims?: InputMaybe<Scalars['Int']>;
  faction_id?: InputMaybe<Scalars['uuid']>;
  galaxy_id?: InputMaybe<Scalars['uuid']>;
  homeworld_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  playable_race_id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Galactic_Empire_Sum_Fields = {
  __typename?: 'galactic_empire_sum_fields';
  celestial_claims?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "galactic_empire" */
export type Galactic_Empire_Sum_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** update columns of table "galactic_empire" */
export enum Galactic_Empire_Update_Column {
  /** column name */
  BackgroundId = 'background_id',
  /** column name */
  CelestialClaims = 'celestial_claims',
  /** column name */
  FactionId = 'faction_id',
  /** column name */
  GalaxyId = 'galaxy_id',
  /** column name */
  HomeworldId = 'homeworld_id',
  /** column name */
  Id = 'id',
  /** column name */
  PlayableRaceId = 'playable_race_id',
  /** column name */
  UserId = 'user_id'
}

export type Galactic_Empire_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Galactic_Empire_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Galactic_Empire_Set_Input>;
  where: Galactic_Empire_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Galactic_Empire_Var_Pop_Fields = {
  __typename?: 'galactic_empire_var_pop_fields';
  celestial_claims?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "galactic_empire" */
export type Galactic_Empire_Var_Pop_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Galactic_Empire_Var_Samp_Fields = {
  __typename?: 'galactic_empire_var_samp_fields';
  celestial_claims?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "galactic_empire" */
export type Galactic_Empire_Var_Samp_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Galactic_Empire_Variance_Fields = {
  __typename?: 'galactic_empire_variance_fields';
  celestial_claims?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "galactic_empire" */
export type Galactic_Empire_Variance_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** columns and relationships of "galaxy" */
export type Galaxy = {
  __typename?: 'galaxy';
  arm_width: Scalars['numeric'];
  arms: Scalars['numeric'];
  /** An array relationship */
  celestials: Array<Celestial>;
  /** An aggregate relationship */
  celestials_aggregate: Celestial_Aggregate;
  core_concentration_factor: Scalars['numeric'];
  core_radius_factor: Scalars['numeric'];
  curvature: Scalars['numeric'];
  /** An array relationship */
  galactic_empires: Array<Galactic_Empire>;
  /** An aggregate relationship */
  galactic_empires_aggregate: Galactic_Empire_Aggregate;
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  radius: Scalars['Int'];
  stars: Scalars['Int'];
};


/** columns and relationships of "galaxy" */
export type GalaxyCelestialsArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "galaxy" */
export type GalaxyCelestials_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "galaxy" */
export type GalaxyGalactic_EmpiresArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


/** columns and relationships of "galaxy" */
export type GalaxyGalactic_Empires_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};

/** aggregated selection of "galaxy" */
export type Galaxy_Aggregate = {
  __typename?: 'galaxy_aggregate';
  aggregate?: Maybe<Galaxy_Aggregate_Fields>;
  nodes: Array<Galaxy>;
};

/** aggregate fields of "galaxy" */
export type Galaxy_Aggregate_Fields = {
  __typename?: 'galaxy_aggregate_fields';
  avg?: Maybe<Galaxy_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Galaxy_Max_Fields>;
  min?: Maybe<Galaxy_Min_Fields>;
  stddev?: Maybe<Galaxy_Stddev_Fields>;
  stddev_pop?: Maybe<Galaxy_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Galaxy_Stddev_Samp_Fields>;
  sum?: Maybe<Galaxy_Sum_Fields>;
  var_pop?: Maybe<Galaxy_Var_Pop_Fields>;
  var_samp?: Maybe<Galaxy_Var_Samp_Fields>;
  variance?: Maybe<Galaxy_Variance_Fields>;
};


/** aggregate fields of "galaxy" */
export type Galaxy_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Galaxy_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Galaxy_Avg_Fields = {
  __typename?: 'galaxy_avg_fields';
  arm_width?: Maybe<Scalars['Float']>;
  arms?: Maybe<Scalars['Float']>;
  core_concentration_factor?: Maybe<Scalars['Float']>;
  core_radius_factor?: Maybe<Scalars['Float']>;
  curvature?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  stars?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "galaxy". All fields are combined with a logical 'AND'. */
export type Galaxy_Bool_Exp = {
  _and?: InputMaybe<Array<Galaxy_Bool_Exp>>;
  _not?: InputMaybe<Galaxy_Bool_Exp>;
  _or?: InputMaybe<Array<Galaxy_Bool_Exp>>;
  arm_width?: InputMaybe<Numeric_Comparison_Exp>;
  arms?: InputMaybe<Numeric_Comparison_Exp>;
  celestials?: InputMaybe<Celestial_Bool_Exp>;
  core_concentration_factor?: InputMaybe<Numeric_Comparison_Exp>;
  core_radius_factor?: InputMaybe<Numeric_Comparison_Exp>;
  curvature?: InputMaybe<Numeric_Comparison_Exp>;
  galactic_empires?: InputMaybe<Galactic_Empire_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  radius?: InputMaybe<Int_Comparison_Exp>;
  stars?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "galaxy" */
export enum Galaxy_Constraint {
  /** unique or primary key constraint on columns "id" */
  GalaxyPkey = 'galaxy_pkey'
}

/** input type for incrementing numeric columns in table "galaxy" */
export type Galaxy_Inc_Input = {
  arm_width?: InputMaybe<Scalars['numeric']>;
  arms?: InputMaybe<Scalars['numeric']>;
  core_concentration_factor?: InputMaybe<Scalars['numeric']>;
  core_radius_factor?: InputMaybe<Scalars['numeric']>;
  curvature?: InputMaybe<Scalars['numeric']>;
  radius?: InputMaybe<Scalars['Int']>;
  stars?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "galaxy" */
export type Galaxy_Insert_Input = {
  arm_width?: InputMaybe<Scalars['numeric']>;
  arms?: InputMaybe<Scalars['numeric']>;
  celestials?: InputMaybe<Celestial_Arr_Rel_Insert_Input>;
  core_concentration_factor?: InputMaybe<Scalars['numeric']>;
  core_radius_factor?: InputMaybe<Scalars['numeric']>;
  curvature?: InputMaybe<Scalars['numeric']>;
  galactic_empires?: InputMaybe<Galactic_Empire_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['Int']>;
  stars?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Galaxy_Max_Fields = {
  __typename?: 'galaxy_max_fields';
  arm_width?: Maybe<Scalars['numeric']>;
  arms?: Maybe<Scalars['numeric']>;
  core_concentration_factor?: Maybe<Scalars['numeric']>;
  core_radius_factor?: Maybe<Scalars['numeric']>;
  curvature?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Galaxy_Min_Fields = {
  __typename?: 'galaxy_min_fields';
  arm_width?: Maybe<Scalars['numeric']>;
  arms?: Maybe<Scalars['numeric']>;
  core_concentration_factor?: Maybe<Scalars['numeric']>;
  core_radius_factor?: Maybe<Scalars['numeric']>;
  curvature?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "galaxy" */
export type Galaxy_Mutation_Response = {
  __typename?: 'galaxy_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Galaxy>;
};

/** input type for inserting object relation for remote table "galaxy" */
export type Galaxy_Obj_Rel_Insert_Input = {
  data: Galaxy_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Galaxy_On_Conflict>;
};

/** on_conflict condition type for table "galaxy" */
export type Galaxy_On_Conflict = {
  constraint: Galaxy_Constraint;
  update_columns?: Array<Galaxy_Update_Column>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};

/** Ordering options when selecting data from "galaxy". */
export type Galaxy_Order_By = {
  arm_width?: InputMaybe<Order_By>;
  arms?: InputMaybe<Order_By>;
  celestials_aggregate?: InputMaybe<Celestial_Aggregate_Order_By>;
  core_concentration_factor?: InputMaybe<Order_By>;
  core_radius_factor?: InputMaybe<Order_By>;
  curvature?: InputMaybe<Order_By>;
  galactic_empires_aggregate?: InputMaybe<Galactic_Empire_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  stars?: InputMaybe<Order_By>;
};

/** primary key columns input for table: galaxy */
export type Galaxy_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "galaxy" */
export enum Galaxy_Select_Column {
  /** column name */
  ArmWidth = 'arm_width',
  /** column name */
  Arms = 'arms',
  /** column name */
  CoreConcentrationFactor = 'core_concentration_factor',
  /** column name */
  CoreRadiusFactor = 'core_radius_factor',
  /** column name */
  Curvature = 'curvature',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Radius = 'radius',
  /** column name */
  Stars = 'stars'
}

/** input type for updating data in table "galaxy" */
export type Galaxy_Set_Input = {
  arm_width?: InputMaybe<Scalars['numeric']>;
  arms?: InputMaybe<Scalars['numeric']>;
  core_concentration_factor?: InputMaybe<Scalars['numeric']>;
  core_radius_factor?: InputMaybe<Scalars['numeric']>;
  curvature?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['Int']>;
  stars?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Galaxy_Stddev_Fields = {
  __typename?: 'galaxy_stddev_fields';
  arm_width?: Maybe<Scalars['Float']>;
  arms?: Maybe<Scalars['Float']>;
  core_concentration_factor?: Maybe<Scalars['Float']>;
  core_radius_factor?: Maybe<Scalars['Float']>;
  curvature?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  stars?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Galaxy_Stddev_Pop_Fields = {
  __typename?: 'galaxy_stddev_pop_fields';
  arm_width?: Maybe<Scalars['Float']>;
  arms?: Maybe<Scalars['Float']>;
  core_concentration_factor?: Maybe<Scalars['Float']>;
  core_radius_factor?: Maybe<Scalars['Float']>;
  curvature?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  stars?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Galaxy_Stddev_Samp_Fields = {
  __typename?: 'galaxy_stddev_samp_fields';
  arm_width?: Maybe<Scalars['Float']>;
  arms?: Maybe<Scalars['Float']>;
  core_concentration_factor?: Maybe<Scalars['Float']>;
  core_radius_factor?: Maybe<Scalars['Float']>;
  curvature?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  stars?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "galaxy" */
export type Galaxy_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Galaxy_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Galaxy_Stream_Cursor_Value_Input = {
  arm_width?: InputMaybe<Scalars['numeric']>;
  arms?: InputMaybe<Scalars['numeric']>;
  core_concentration_factor?: InputMaybe<Scalars['numeric']>;
  core_radius_factor?: InputMaybe<Scalars['numeric']>;
  curvature?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['Int']>;
  stars?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Galaxy_Sum_Fields = {
  __typename?: 'galaxy_sum_fields';
  arm_width?: Maybe<Scalars['numeric']>;
  arms?: Maybe<Scalars['numeric']>;
  core_concentration_factor?: Maybe<Scalars['numeric']>;
  core_radius_factor?: Maybe<Scalars['numeric']>;
  curvature?: Maybe<Scalars['numeric']>;
  radius?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
};

/** update columns of table "galaxy" */
export enum Galaxy_Update_Column {
  /** column name */
  ArmWidth = 'arm_width',
  /** column name */
  Arms = 'arms',
  /** column name */
  CoreConcentrationFactor = 'core_concentration_factor',
  /** column name */
  CoreRadiusFactor = 'core_radius_factor',
  /** column name */
  Curvature = 'curvature',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Radius = 'radius',
  /** column name */
  Stars = 'stars'
}

export type Galaxy_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Galaxy_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Galaxy_Set_Input>;
  where: Galaxy_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Galaxy_Var_Pop_Fields = {
  __typename?: 'galaxy_var_pop_fields';
  arm_width?: Maybe<Scalars['Float']>;
  arms?: Maybe<Scalars['Float']>;
  core_concentration_factor?: Maybe<Scalars['Float']>;
  core_radius_factor?: Maybe<Scalars['Float']>;
  curvature?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  stars?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Galaxy_Var_Samp_Fields = {
  __typename?: 'galaxy_var_samp_fields';
  arm_width?: Maybe<Scalars['Float']>;
  arms?: Maybe<Scalars['Float']>;
  core_concentration_factor?: Maybe<Scalars['Float']>;
  core_radius_factor?: Maybe<Scalars['Float']>;
  curvature?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  stars?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Galaxy_Variance_Fields = {
  __typename?: 'galaxy_variance_fields';
  arm_width?: Maybe<Scalars['Float']>;
  arms?: Maybe<Scalars['Float']>;
  core_concentration_factor?: Maybe<Scalars['Float']>;
  core_radius_factor?: Maybe<Scalars['Float']>;
  curvature?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  stars?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  completeQuest?: Maybe<QuestCompletion>;
  createEmpireOriginCelestial?: Maybe<GalaxyManagement>;
  createPlanet?: Maybe<CelestialManagement>;
  /** delete data from the table: "background" */
  delete_background?: Maybe<Background_Mutation_Response>;
  /** delete single row from the table: "background" */
  delete_background_by_pk?: Maybe<Background>;
  /** delete data from the table: "celestial" */
  delete_celestial?: Maybe<Celestial_Mutation_Response>;
  /** delete single row from the table: "celestial" */
  delete_celestial_by_pk?: Maybe<Celestial>;
  /** delete data from the table: "chat_message" */
  delete_chat_message?: Maybe<Chat_Message_Mutation_Response>;
  /** delete single row from the table: "chat_message" */
  delete_chat_message_by_pk?: Maybe<Chat_Message>;
  /** delete data from the table: "faction" */
  delete_faction?: Maybe<Faction_Mutation_Response>;
  /** delete single row from the table: "faction" */
  delete_faction_by_pk?: Maybe<Faction>;
  /** delete data from the table: "galactic_empire" */
  delete_galactic_empire?: Maybe<Galactic_Empire_Mutation_Response>;
  /** delete single row from the table: "galactic_empire" */
  delete_galactic_empire_by_pk?: Maybe<Galactic_Empire>;
  /** delete data from the table: "galactic_empire_npc" */
  delete_galactic_empire_npc?: Maybe<Galactic_Empire_Npc_Mutation_Response>;
  /** delete single row from the table: "galactic_empire_npc" */
  delete_galactic_empire_npc_by_pk?: Maybe<Galactic_Empire_Npc>;
  /** delete data from the table: "galactic_empire_quest" */
  delete_galactic_empire_quest?: Maybe<Galactic_Empire_Quest_Mutation_Response>;
  /** delete single row from the table: "galactic_empire_quest" */
  delete_galactic_empire_quest_by_pk?: Maybe<Galactic_Empire_Quest>;
  /** delete data from the table: "galactic_empire_resources" */
  delete_galactic_empire_resources?: Maybe<Galactic_Empire_Resources_Mutation_Response>;
  /** delete single row from the table: "galactic_empire_resources" */
  delete_galactic_empire_resources_by_pk?: Maybe<Galactic_Empire_Resources>;
  /** delete data from the table: "galaxy" */
  delete_galaxy?: Maybe<Galaxy_Mutation_Response>;
  /** delete single row from the table: "galaxy" */
  delete_galaxy_by_pk?: Maybe<Galaxy>;
  /** delete data from the table: "npc" */
  delete_npc?: Maybe<Npc_Mutation_Response>;
  /** delete single row from the table: "npc" */
  delete_npc_by_pk?: Maybe<Npc>;
  /** delete data from the table: "planet" */
  delete_planet?: Maybe<Planet_Mutation_Response>;
  /** delete single row from the table: "planet" */
  delete_planet_by_pk?: Maybe<Planet>;
  /** delete data from the table: "planetary_ring" */
  delete_planetary_ring?: Maybe<Planetary_Ring_Mutation_Response>;
  /** delete single row from the table: "planetary_ring" */
  delete_planetary_ring_by_pk?: Maybe<Planetary_Ring>;
  /** delete data from the table: "playable_race" */
  delete_playable_race?: Maybe<Playable_Race_Mutation_Response>;
  /** delete single row from the table: "playable_race" */
  delete_playable_race_by_pk?: Maybe<Playable_Race>;
  /** delete data from the table: "quest" */
  delete_quest?: Maybe<Quest_Mutation_Response>;
  /** delete single row from the table: "quest" */
  delete_quest_by_pk?: Maybe<Quest>;
  /** delete data from the table: "quest_reward" */
  delete_quest_reward?: Maybe<Quest_Reward_Mutation_Response>;
  /** delete single row from the table: "quest_reward" */
  delete_quest_reward_by_pk?: Maybe<Quest_Reward>;
  /** delete data from the table: "quest_reward_type" */
  delete_quest_reward_type?: Maybe<Quest_Reward_Type_Mutation_Response>;
  /** delete single row from the table: "quest_reward_type" */
  delete_quest_reward_type_by_pk?: Maybe<Quest_Reward_Type>;
  /** delete data from the table: "quest_step" */
  delete_quest_step?: Maybe<Quest_Step_Mutation_Response>;
  /** delete single row from the table: "quest_step" */
  delete_quest_step_by_pk?: Maybe<Quest_Step>;
  /** delete data from the table: "quest_step_type" */
  delete_quest_step_type?: Maybe<Quest_Step_Type_Mutation_Response>;
  /** delete single row from the table: "quest_step_type" */
  delete_quest_step_type_by_pk?: Maybe<Quest_Step_Type>;
  /** delete data from the table: "quest_type" */
  delete_quest_type?: Maybe<Quest_Type_Mutation_Response>;
  /** delete single row from the table: "quest_type" */
  delete_quest_type_by_pk?: Maybe<Quest_Type>;
  /** delete data from the table: "resource_generator" */
  delete_resource_generator?: Maybe<Resource_Generator_Mutation_Response>;
  /** delete single row from the table: "resource_generator" */
  delete_resource_generator_by_pk?: Maybe<Resource_Generator>;
  /** delete data from the table: "resource_generator_type" */
  delete_resource_generator_type?: Maybe<Resource_Generator_Type_Mutation_Response>;
  /** delete single row from the table: "resource_generator_type" */
  delete_resource_generator_type_by_pk?: Maybe<Resource_Generator_Type>;
  /** delete data from the table: "resource_type" */
  delete_resource_type?: Maybe<Resource_Type_Mutation_Response>;
  /** delete single row from the table: "resource_type" */
  delete_resource_type_by_pk?: Maybe<Resource_Type>;
  /** delete data from the table: "terrain_hex_palette" */
  delete_terrain_hex_palette?: Maybe<Terrain_Hex_Palette_Mutation_Response>;
  /** delete single row from the table: "terrain_hex_palette" */
  delete_terrain_hex_palette_by_pk?: Maybe<Terrain_Hex_Palette>;
  /** delete data from the table: "user_info" */
  delete_user_info?: Maybe<User_Info_Mutation_Response>;
  /** delete single row from the table: "user_info" */
  delete_user_info_by_pk?: Maybe<User_Info>;
  /** delete data from the table: "user_me" */
  delete_user_me?: Maybe<User_Me_Mutation_Response>;
  /** delete data from the table: "user_private" */
  delete_user_private?: Maybe<User_Private_Mutation_Response>;
  /** insert data into the table: "background" */
  insert_background?: Maybe<Background_Mutation_Response>;
  /** insert a single row into the table: "background" */
  insert_background_one?: Maybe<Background>;
  /** insert data into the table: "celestial" */
  insert_celestial?: Maybe<Celestial_Mutation_Response>;
  /** insert a single row into the table: "celestial" */
  insert_celestial_one?: Maybe<Celestial>;
  /** insert data into the table: "chat_message" */
  insert_chat_message?: Maybe<Chat_Message_Mutation_Response>;
  /** insert a single row into the table: "chat_message" */
  insert_chat_message_one?: Maybe<Chat_Message>;
  /** insert data into the table: "faction" */
  insert_faction?: Maybe<Faction_Mutation_Response>;
  /** insert a single row into the table: "faction" */
  insert_faction_one?: Maybe<Faction>;
  /** insert data into the table: "galactic_empire" */
  insert_galactic_empire?: Maybe<Galactic_Empire_Mutation_Response>;
  /** insert data into the table: "galactic_empire_npc" */
  insert_galactic_empire_npc?: Maybe<Galactic_Empire_Npc_Mutation_Response>;
  /** insert a single row into the table: "galactic_empire_npc" */
  insert_galactic_empire_npc_one?: Maybe<Galactic_Empire_Npc>;
  /** insert a single row into the table: "galactic_empire" */
  insert_galactic_empire_one?: Maybe<Galactic_Empire>;
  /** insert data into the table: "galactic_empire_quest" */
  insert_galactic_empire_quest?: Maybe<Galactic_Empire_Quest_Mutation_Response>;
  /** insert a single row into the table: "galactic_empire_quest" */
  insert_galactic_empire_quest_one?: Maybe<Galactic_Empire_Quest>;
  /** insert data into the table: "galactic_empire_resources" */
  insert_galactic_empire_resources?: Maybe<Galactic_Empire_Resources_Mutation_Response>;
  /** insert a single row into the table: "galactic_empire_resources" */
  insert_galactic_empire_resources_one?: Maybe<Galactic_Empire_Resources>;
  /** insert data into the table: "galaxy" */
  insert_galaxy?: Maybe<Galaxy_Mutation_Response>;
  /** insert a single row into the table: "galaxy" */
  insert_galaxy_one?: Maybe<Galaxy>;
  /** insert data into the table: "npc" */
  insert_npc?: Maybe<Npc_Mutation_Response>;
  /** insert a single row into the table: "npc" */
  insert_npc_one?: Maybe<Npc>;
  /** insert data into the table: "planet" */
  insert_planet?: Maybe<Planet_Mutation_Response>;
  /** insert a single row into the table: "planet" */
  insert_planet_one?: Maybe<Planet>;
  /** insert data into the table: "planetary_ring" */
  insert_planetary_ring?: Maybe<Planetary_Ring_Mutation_Response>;
  /** insert a single row into the table: "planetary_ring" */
  insert_planetary_ring_one?: Maybe<Planetary_Ring>;
  /** insert data into the table: "playable_race" */
  insert_playable_race?: Maybe<Playable_Race_Mutation_Response>;
  /** insert a single row into the table: "playable_race" */
  insert_playable_race_one?: Maybe<Playable_Race>;
  /** insert data into the table: "quest" */
  insert_quest?: Maybe<Quest_Mutation_Response>;
  /** insert a single row into the table: "quest" */
  insert_quest_one?: Maybe<Quest>;
  /** insert data into the table: "quest_reward" */
  insert_quest_reward?: Maybe<Quest_Reward_Mutation_Response>;
  /** insert a single row into the table: "quest_reward" */
  insert_quest_reward_one?: Maybe<Quest_Reward>;
  /** insert data into the table: "quest_reward_type" */
  insert_quest_reward_type?: Maybe<Quest_Reward_Type_Mutation_Response>;
  /** insert a single row into the table: "quest_reward_type" */
  insert_quest_reward_type_one?: Maybe<Quest_Reward_Type>;
  /** insert data into the table: "quest_step" */
  insert_quest_step?: Maybe<Quest_Step_Mutation_Response>;
  /** insert a single row into the table: "quest_step" */
  insert_quest_step_one?: Maybe<Quest_Step>;
  /** insert data into the table: "quest_step_type" */
  insert_quest_step_type?: Maybe<Quest_Step_Type_Mutation_Response>;
  /** insert a single row into the table: "quest_step_type" */
  insert_quest_step_type_one?: Maybe<Quest_Step_Type>;
  /** insert data into the table: "quest_type" */
  insert_quest_type?: Maybe<Quest_Type_Mutation_Response>;
  /** insert a single row into the table: "quest_type" */
  insert_quest_type_one?: Maybe<Quest_Type>;
  /** insert data into the table: "resource_generator" */
  insert_resource_generator?: Maybe<Resource_Generator_Mutation_Response>;
  /** insert a single row into the table: "resource_generator" */
  insert_resource_generator_one?: Maybe<Resource_Generator>;
  /** insert data into the table: "resource_generator_type" */
  insert_resource_generator_type?: Maybe<Resource_Generator_Type_Mutation_Response>;
  /** insert a single row into the table: "resource_generator_type" */
  insert_resource_generator_type_one?: Maybe<Resource_Generator_Type>;
  /** insert data into the table: "resource_type" */
  insert_resource_type?: Maybe<Resource_Type_Mutation_Response>;
  /** insert a single row into the table: "resource_type" */
  insert_resource_type_one?: Maybe<Resource_Type>;
  /** insert data into the table: "terrain_hex_palette" */
  insert_terrain_hex_palette?: Maybe<Terrain_Hex_Palette_Mutation_Response>;
  /** insert a single row into the table: "terrain_hex_palette" */
  insert_terrain_hex_palette_one?: Maybe<Terrain_Hex_Palette>;
  /** insert data into the table: "user_info" */
  insert_user_info?: Maybe<User_Info_Mutation_Response>;
  /** insert a single row into the table: "user_info" */
  insert_user_info_one?: Maybe<User_Info>;
  /** insert data into the table: "user_me" */
  insert_user_me?: Maybe<User_Me_Mutation_Response>;
  /** insert a single row into the table: "user_me" */
  insert_user_me_one?: Maybe<User_Me>;
  /** insert data into the table: "user_private" */
  insert_user_private?: Maybe<User_Private_Mutation_Response>;
  /** insert a single row into the table: "user_private" */
  insert_user_private_one?: Maybe<User_Private>;
  progressQuestStep?: Maybe<QuestStepProgression>;
  setDisplayName?: Maybe<Register>;
  /** update data of the table: "background" */
  update_background?: Maybe<Background_Mutation_Response>;
  /** update single row of the table: "background" */
  update_background_by_pk?: Maybe<Background>;
  /** update multiples rows of table: "background" */
  update_background_many?: Maybe<Array<Maybe<Background_Mutation_Response>>>;
  /** update data of the table: "celestial" */
  update_celestial?: Maybe<Celestial_Mutation_Response>;
  /** update single row of the table: "celestial" */
  update_celestial_by_pk?: Maybe<Celestial>;
  /** update multiples rows of table: "celestial" */
  update_celestial_many?: Maybe<Array<Maybe<Celestial_Mutation_Response>>>;
  /** update data of the table: "chat_message" */
  update_chat_message?: Maybe<Chat_Message_Mutation_Response>;
  /** update single row of the table: "chat_message" */
  update_chat_message_by_pk?: Maybe<Chat_Message>;
  /** update multiples rows of table: "chat_message" */
  update_chat_message_many?: Maybe<Array<Maybe<Chat_Message_Mutation_Response>>>;
  /** update data of the table: "faction" */
  update_faction?: Maybe<Faction_Mutation_Response>;
  /** update single row of the table: "faction" */
  update_faction_by_pk?: Maybe<Faction>;
  /** update multiples rows of table: "faction" */
  update_faction_many?: Maybe<Array<Maybe<Faction_Mutation_Response>>>;
  /** update data of the table: "galactic_empire" */
  update_galactic_empire?: Maybe<Galactic_Empire_Mutation_Response>;
  /** update single row of the table: "galactic_empire" */
  update_galactic_empire_by_pk?: Maybe<Galactic_Empire>;
  /** update multiples rows of table: "galactic_empire" */
  update_galactic_empire_many?: Maybe<Array<Maybe<Galactic_Empire_Mutation_Response>>>;
  /** update data of the table: "galactic_empire_npc" */
  update_galactic_empire_npc?: Maybe<Galactic_Empire_Npc_Mutation_Response>;
  /** update single row of the table: "galactic_empire_npc" */
  update_galactic_empire_npc_by_pk?: Maybe<Galactic_Empire_Npc>;
  /** update multiples rows of table: "galactic_empire_npc" */
  update_galactic_empire_npc_many?: Maybe<Array<Maybe<Galactic_Empire_Npc_Mutation_Response>>>;
  /** update data of the table: "galactic_empire_quest" */
  update_galactic_empire_quest?: Maybe<Galactic_Empire_Quest_Mutation_Response>;
  /** update single row of the table: "galactic_empire_quest" */
  update_galactic_empire_quest_by_pk?: Maybe<Galactic_Empire_Quest>;
  /** update multiples rows of table: "galactic_empire_quest" */
  update_galactic_empire_quest_many?: Maybe<Array<Maybe<Galactic_Empire_Quest_Mutation_Response>>>;
  /** update data of the table: "galactic_empire_resources" */
  update_galactic_empire_resources?: Maybe<Galactic_Empire_Resources_Mutation_Response>;
  /** update single row of the table: "galactic_empire_resources" */
  update_galactic_empire_resources_by_pk?: Maybe<Galactic_Empire_Resources>;
  /** update multiples rows of table: "galactic_empire_resources" */
  update_galactic_empire_resources_many?: Maybe<Array<Maybe<Galactic_Empire_Resources_Mutation_Response>>>;
  /** update data of the table: "galaxy" */
  update_galaxy?: Maybe<Galaxy_Mutation_Response>;
  /** update single row of the table: "galaxy" */
  update_galaxy_by_pk?: Maybe<Galaxy>;
  /** update multiples rows of table: "galaxy" */
  update_galaxy_many?: Maybe<Array<Maybe<Galaxy_Mutation_Response>>>;
  /** update data of the table: "npc" */
  update_npc?: Maybe<Npc_Mutation_Response>;
  /** update single row of the table: "npc" */
  update_npc_by_pk?: Maybe<Npc>;
  /** update multiples rows of table: "npc" */
  update_npc_many?: Maybe<Array<Maybe<Npc_Mutation_Response>>>;
  /** update data of the table: "planet" */
  update_planet?: Maybe<Planet_Mutation_Response>;
  /** update single row of the table: "planet" */
  update_planet_by_pk?: Maybe<Planet>;
  /** update multiples rows of table: "planet" */
  update_planet_many?: Maybe<Array<Maybe<Planet_Mutation_Response>>>;
  /** update data of the table: "planetary_ring" */
  update_planetary_ring?: Maybe<Planetary_Ring_Mutation_Response>;
  /** update single row of the table: "planetary_ring" */
  update_planetary_ring_by_pk?: Maybe<Planetary_Ring>;
  /** update multiples rows of table: "planetary_ring" */
  update_planetary_ring_many?: Maybe<Array<Maybe<Planetary_Ring_Mutation_Response>>>;
  /** update data of the table: "playable_race" */
  update_playable_race?: Maybe<Playable_Race_Mutation_Response>;
  /** update single row of the table: "playable_race" */
  update_playable_race_by_pk?: Maybe<Playable_Race>;
  /** update multiples rows of table: "playable_race" */
  update_playable_race_many?: Maybe<Array<Maybe<Playable_Race_Mutation_Response>>>;
  /** update data of the table: "quest" */
  update_quest?: Maybe<Quest_Mutation_Response>;
  /** update single row of the table: "quest" */
  update_quest_by_pk?: Maybe<Quest>;
  /** update multiples rows of table: "quest" */
  update_quest_many?: Maybe<Array<Maybe<Quest_Mutation_Response>>>;
  /** update data of the table: "quest_reward" */
  update_quest_reward?: Maybe<Quest_Reward_Mutation_Response>;
  /** update single row of the table: "quest_reward" */
  update_quest_reward_by_pk?: Maybe<Quest_Reward>;
  /** update multiples rows of table: "quest_reward" */
  update_quest_reward_many?: Maybe<Array<Maybe<Quest_Reward_Mutation_Response>>>;
  /** update data of the table: "quest_reward_type" */
  update_quest_reward_type?: Maybe<Quest_Reward_Type_Mutation_Response>;
  /** update single row of the table: "quest_reward_type" */
  update_quest_reward_type_by_pk?: Maybe<Quest_Reward_Type>;
  /** update multiples rows of table: "quest_reward_type" */
  update_quest_reward_type_many?: Maybe<Array<Maybe<Quest_Reward_Type_Mutation_Response>>>;
  /** update data of the table: "quest_step" */
  update_quest_step?: Maybe<Quest_Step_Mutation_Response>;
  /** update single row of the table: "quest_step" */
  update_quest_step_by_pk?: Maybe<Quest_Step>;
  /** update multiples rows of table: "quest_step" */
  update_quest_step_many?: Maybe<Array<Maybe<Quest_Step_Mutation_Response>>>;
  /** update data of the table: "quest_step_type" */
  update_quest_step_type?: Maybe<Quest_Step_Type_Mutation_Response>;
  /** update single row of the table: "quest_step_type" */
  update_quest_step_type_by_pk?: Maybe<Quest_Step_Type>;
  /** update multiples rows of table: "quest_step_type" */
  update_quest_step_type_many?: Maybe<Array<Maybe<Quest_Step_Type_Mutation_Response>>>;
  /** update data of the table: "quest_type" */
  update_quest_type?: Maybe<Quest_Type_Mutation_Response>;
  /** update single row of the table: "quest_type" */
  update_quest_type_by_pk?: Maybe<Quest_Type>;
  /** update multiples rows of table: "quest_type" */
  update_quest_type_many?: Maybe<Array<Maybe<Quest_Type_Mutation_Response>>>;
  /** update data of the table: "resource_generator" */
  update_resource_generator?: Maybe<Resource_Generator_Mutation_Response>;
  /** update single row of the table: "resource_generator" */
  update_resource_generator_by_pk?: Maybe<Resource_Generator>;
  /** update multiples rows of table: "resource_generator" */
  update_resource_generator_many?: Maybe<Array<Maybe<Resource_Generator_Mutation_Response>>>;
  /** update data of the table: "resource_generator_type" */
  update_resource_generator_type?: Maybe<Resource_Generator_Type_Mutation_Response>;
  /** update single row of the table: "resource_generator_type" */
  update_resource_generator_type_by_pk?: Maybe<Resource_Generator_Type>;
  /** update multiples rows of table: "resource_generator_type" */
  update_resource_generator_type_many?: Maybe<Array<Maybe<Resource_Generator_Type_Mutation_Response>>>;
  /** update data of the table: "resource_type" */
  update_resource_type?: Maybe<Resource_Type_Mutation_Response>;
  /** update single row of the table: "resource_type" */
  update_resource_type_by_pk?: Maybe<Resource_Type>;
  /** update multiples rows of table: "resource_type" */
  update_resource_type_many?: Maybe<Array<Maybe<Resource_Type_Mutation_Response>>>;
  /** update data of the table: "terrain_hex_palette" */
  update_terrain_hex_palette?: Maybe<Terrain_Hex_Palette_Mutation_Response>;
  /** update single row of the table: "terrain_hex_palette" */
  update_terrain_hex_palette_by_pk?: Maybe<Terrain_Hex_Palette>;
  /** update multiples rows of table: "terrain_hex_palette" */
  update_terrain_hex_palette_many?: Maybe<Array<Maybe<Terrain_Hex_Palette_Mutation_Response>>>;
  /** update data of the table: "user_info" */
  update_user_info?: Maybe<User_Info_Mutation_Response>;
  /** update single row of the table: "user_info" */
  update_user_info_by_pk?: Maybe<User_Info>;
  /** update multiples rows of table: "user_info" */
  update_user_info_many?: Maybe<Array<Maybe<User_Info_Mutation_Response>>>;
  /** update data of the table: "user_me" */
  update_user_me?: Maybe<User_Me_Mutation_Response>;
  /** update multiples rows of table: "user_me" */
  update_user_me_many?: Maybe<Array<Maybe<User_Me_Mutation_Response>>>;
  /** update data of the table: "user_private" */
  update_user_private?: Maybe<User_Private_Mutation_Response>;
  /** update multiples rows of table: "user_private" */
  update_user_private_many?: Maybe<Array<Maybe<User_Private_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootCompleteQuestArgs = {
  empire_quest_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCreateEmpireOriginCelestialArgs = {
  galactic_empire_id: Scalars['String'];
  galaxy_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCreatePlanetArgs = {
  input: PlanetCreationInput;
};


/** mutation root */
export type Mutation_RootDelete_BackgroundArgs = {
  where: Background_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Background_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CelestialArgs = {
  where: Celestial_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Celestial_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Chat_MessageArgs = {
  where: Chat_Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_Message_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_FactionArgs = {
  where: Faction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Faction_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_EmpireArgs = {
  where: Galactic_Empire_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_NpcArgs = {
  where: Galactic_Empire_Npc_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_Npc_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_QuestArgs = {
  where: Galactic_Empire_Quest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_Quest_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_ResourcesArgs = {
  where: Galactic_Empire_Resources_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_Resources_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GalaxyArgs = {
  where: Galaxy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galaxy_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_NpcArgs = {
  where: Npc_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Npc_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_PlanetArgs = {
  where: Planet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Planet_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Planetary_RingArgs = {
  where: Planetary_Ring_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Planetary_Ring_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Playable_RaceArgs = {
  where: Playable_Race_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Playable_Race_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_QuestArgs = {
  where: Quest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_RewardArgs = {
  where: Quest_Reward_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Reward_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_Reward_TypeArgs = {
  where: Quest_Reward_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Reward_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_StepArgs = {
  where: Quest_Step_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Step_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_Step_TypeArgs = {
  where: Quest_Step_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Step_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_TypeArgs = {
  where: Quest_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Type_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Resource_GeneratorArgs = {
  where: Resource_Generator_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Resource_Generator_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Resource_Generator_TypeArgs = {
  where: Resource_Generator_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Resource_Generator_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Resource_TypeArgs = {
  where: Resource_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Resource_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Terrain_Hex_PaletteArgs = {
  where: Terrain_Hex_Palette_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Terrain_Hex_Palette_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_User_InfoArgs = {
  where: User_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Info_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_User_MeArgs = {
  where: User_Me_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_PrivateArgs = {
  where: User_Private_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_BackgroundArgs = {
  objects: Array<Background_Insert_Input>;
  on_conflict?: InputMaybe<Background_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Background_OneArgs = {
  object: Background_Insert_Input;
  on_conflict?: InputMaybe<Background_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CelestialArgs = {
  objects: Array<Celestial_Insert_Input>;
  on_conflict?: InputMaybe<Celestial_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Celestial_OneArgs = {
  object: Celestial_Insert_Input;
  on_conflict?: InputMaybe<Celestial_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_MessageArgs = {
  objects: Array<Chat_Message_Insert_Input>;
  on_conflict?: InputMaybe<Chat_Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_Message_OneArgs = {
  object: Chat_Message_Insert_Input;
  on_conflict?: InputMaybe<Chat_Message_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FactionArgs = {
  objects: Array<Faction_Insert_Input>;
  on_conflict?: InputMaybe<Faction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Faction_OneArgs = {
  object: Faction_Insert_Input;
  on_conflict?: InputMaybe<Faction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_EmpireArgs = {
  objects: Array<Galactic_Empire_Insert_Input>;
  on_conflict?: InputMaybe<Galactic_Empire_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_Empire_NpcArgs = {
  objects: Array<Galactic_Empire_Npc_Insert_Input>;
  on_conflict?: InputMaybe<Galactic_Empire_Npc_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_Empire_Npc_OneArgs = {
  object: Galactic_Empire_Npc_Insert_Input;
  on_conflict?: InputMaybe<Galactic_Empire_Npc_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_Empire_OneArgs = {
  object: Galactic_Empire_Insert_Input;
  on_conflict?: InputMaybe<Galactic_Empire_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_Empire_QuestArgs = {
  objects: Array<Galactic_Empire_Quest_Insert_Input>;
  on_conflict?: InputMaybe<Galactic_Empire_Quest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_Empire_Quest_OneArgs = {
  object: Galactic_Empire_Quest_Insert_Input;
  on_conflict?: InputMaybe<Galactic_Empire_Quest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_Empire_ResourcesArgs = {
  objects: Array<Galactic_Empire_Resources_Insert_Input>;
  on_conflict?: InputMaybe<Galactic_Empire_Resources_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_Empire_Resources_OneArgs = {
  object: Galactic_Empire_Resources_Insert_Input;
  on_conflict?: InputMaybe<Galactic_Empire_Resources_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GalaxyArgs = {
  objects: Array<Galaxy_Insert_Input>;
  on_conflict?: InputMaybe<Galaxy_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galaxy_OneArgs = {
  object: Galaxy_Insert_Input;
  on_conflict?: InputMaybe<Galaxy_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NpcArgs = {
  objects: Array<Npc_Insert_Input>;
  on_conflict?: InputMaybe<Npc_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Npc_OneArgs = {
  object: Npc_Insert_Input;
  on_conflict?: InputMaybe<Npc_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlanetArgs = {
  objects: Array<Planet_Insert_Input>;
  on_conflict?: InputMaybe<Planet_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Planet_OneArgs = {
  object: Planet_Insert_Input;
  on_conflict?: InputMaybe<Planet_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Planetary_RingArgs = {
  objects: Array<Planetary_Ring_Insert_Input>;
  on_conflict?: InputMaybe<Planetary_Ring_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Planetary_Ring_OneArgs = {
  object: Planetary_Ring_Insert_Input;
  on_conflict?: InputMaybe<Planetary_Ring_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Playable_RaceArgs = {
  objects: Array<Playable_Race_Insert_Input>;
  on_conflict?: InputMaybe<Playable_Race_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Playable_Race_OneArgs = {
  object: Playable_Race_Insert_Input;
  on_conflict?: InputMaybe<Playable_Race_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestArgs = {
  objects: Array<Quest_Insert_Input>;
  on_conflict?: InputMaybe<Quest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_OneArgs = {
  object: Quest_Insert_Input;
  on_conflict?: InputMaybe<Quest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_RewardArgs = {
  objects: Array<Quest_Reward_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Reward_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Reward_OneArgs = {
  object: Quest_Reward_Insert_Input;
  on_conflict?: InputMaybe<Quest_Reward_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Reward_TypeArgs = {
  objects: Array<Quest_Reward_Type_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Reward_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Reward_Type_OneArgs = {
  object: Quest_Reward_Type_Insert_Input;
  on_conflict?: InputMaybe<Quest_Reward_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_StepArgs = {
  objects: Array<Quest_Step_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Step_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Step_OneArgs = {
  object: Quest_Step_Insert_Input;
  on_conflict?: InputMaybe<Quest_Step_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Step_TypeArgs = {
  objects: Array<Quest_Step_Type_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Step_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Step_Type_OneArgs = {
  object: Quest_Step_Type_Insert_Input;
  on_conflict?: InputMaybe<Quest_Step_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_TypeArgs = {
  objects: Array<Quest_Type_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Type_OneArgs = {
  object: Quest_Type_Insert_Input;
  on_conflict?: InputMaybe<Quest_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_GeneratorArgs = {
  objects: Array<Resource_Generator_Insert_Input>;
  on_conflict?: InputMaybe<Resource_Generator_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_Generator_OneArgs = {
  object: Resource_Generator_Insert_Input;
  on_conflict?: InputMaybe<Resource_Generator_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_Generator_TypeArgs = {
  objects: Array<Resource_Generator_Type_Insert_Input>;
  on_conflict?: InputMaybe<Resource_Generator_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_Generator_Type_OneArgs = {
  object: Resource_Generator_Type_Insert_Input;
  on_conflict?: InputMaybe<Resource_Generator_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_TypeArgs = {
  objects: Array<Resource_Type_Insert_Input>;
  on_conflict?: InputMaybe<Resource_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_Type_OneArgs = {
  object: Resource_Type_Insert_Input;
  on_conflict?: InputMaybe<Resource_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Terrain_Hex_PaletteArgs = {
  objects: Array<Terrain_Hex_Palette_Insert_Input>;
  on_conflict?: InputMaybe<Terrain_Hex_Palette_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Terrain_Hex_Palette_OneArgs = {
  object: Terrain_Hex_Palette_Insert_Input;
  on_conflict?: InputMaybe<Terrain_Hex_Palette_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_InfoArgs = {
  objects: Array<User_Info_Insert_Input>;
  on_conflict?: InputMaybe<User_Info_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Info_OneArgs = {
  object: User_Info_Insert_Input;
  on_conflict?: InputMaybe<User_Info_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_MeArgs = {
  objects: Array<User_Me_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_User_Me_OneArgs = {
  object: User_Me_Insert_Input;
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
export type Mutation_RootProgressQuestStepArgs = {
  empire_quest_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSetDisplayNameArgs = {
  display_name: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUpdate_BackgroundArgs = {
  _set?: InputMaybe<Background_Set_Input>;
  where: Background_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Background_By_PkArgs = {
  _set?: InputMaybe<Background_Set_Input>;
  pk_columns: Background_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Background_ManyArgs = {
  updates: Array<Background_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CelestialArgs = {
  _set?: InputMaybe<Celestial_Set_Input>;
  where: Celestial_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Celestial_By_PkArgs = {
  _set?: InputMaybe<Celestial_Set_Input>;
  pk_columns: Celestial_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Celestial_ManyArgs = {
  updates: Array<Celestial_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_MessageArgs = {
  _set?: InputMaybe<Chat_Message_Set_Input>;
  where: Chat_Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Message_By_PkArgs = {
  _set?: InputMaybe<Chat_Message_Set_Input>;
  pk_columns: Chat_Message_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Message_ManyArgs = {
  updates: Array<Chat_Message_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FactionArgs = {
  _set?: InputMaybe<Faction_Set_Input>;
  where: Faction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Faction_By_PkArgs = {
  _set?: InputMaybe<Faction_Set_Input>;
  pk_columns: Faction_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Faction_ManyArgs = {
  updates: Array<Faction_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_EmpireArgs = {
  _inc?: InputMaybe<Galactic_Empire_Inc_Input>;
  _set?: InputMaybe<Galactic_Empire_Set_Input>;
  where: Galactic_Empire_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_By_PkArgs = {
  _inc?: InputMaybe<Galactic_Empire_Inc_Input>;
  _set?: InputMaybe<Galactic_Empire_Set_Input>;
  pk_columns: Galactic_Empire_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_ManyArgs = {
  updates: Array<Galactic_Empire_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_NpcArgs = {
  _set?: InputMaybe<Galactic_Empire_Npc_Set_Input>;
  where: Galactic_Empire_Npc_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_Npc_By_PkArgs = {
  _set?: InputMaybe<Galactic_Empire_Npc_Set_Input>;
  pk_columns: Galactic_Empire_Npc_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_Npc_ManyArgs = {
  updates: Array<Galactic_Empire_Npc_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_QuestArgs = {
  _set?: InputMaybe<Galactic_Empire_Quest_Set_Input>;
  where: Galactic_Empire_Quest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_Quest_By_PkArgs = {
  _set?: InputMaybe<Galactic_Empire_Quest_Set_Input>;
  pk_columns: Galactic_Empire_Quest_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_Quest_ManyArgs = {
  updates: Array<Galactic_Empire_Quest_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_ResourcesArgs = {
  _inc?: InputMaybe<Galactic_Empire_Resources_Inc_Input>;
  _set?: InputMaybe<Galactic_Empire_Resources_Set_Input>;
  where: Galactic_Empire_Resources_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_Resources_By_PkArgs = {
  _inc?: InputMaybe<Galactic_Empire_Resources_Inc_Input>;
  _set?: InputMaybe<Galactic_Empire_Resources_Set_Input>;
  pk_columns: Galactic_Empire_Resources_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_Resources_ManyArgs = {
  updates: Array<Galactic_Empire_Resources_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_GalaxyArgs = {
  _inc?: InputMaybe<Galaxy_Inc_Input>;
  _set?: InputMaybe<Galaxy_Set_Input>;
  where: Galaxy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Galaxy_By_PkArgs = {
  _inc?: InputMaybe<Galaxy_Inc_Input>;
  _set?: InputMaybe<Galaxy_Set_Input>;
  pk_columns: Galaxy_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Galaxy_ManyArgs = {
  updates: Array<Galaxy_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_NpcArgs = {
  _set?: InputMaybe<Npc_Set_Input>;
  where: Npc_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Npc_By_PkArgs = {
  _set?: InputMaybe<Npc_Set_Input>;
  pk_columns: Npc_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Npc_ManyArgs = {
  updates: Array<Npc_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PlanetArgs = {
  _inc?: InputMaybe<Planet_Inc_Input>;
  _set?: InputMaybe<Planet_Set_Input>;
  where: Planet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Planet_By_PkArgs = {
  _inc?: InputMaybe<Planet_Inc_Input>;
  _set?: InputMaybe<Planet_Set_Input>;
  pk_columns: Planet_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Planet_ManyArgs = {
  updates: Array<Planet_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Planetary_RingArgs = {
  _inc?: InputMaybe<Planetary_Ring_Inc_Input>;
  _set?: InputMaybe<Planetary_Ring_Set_Input>;
  where: Planetary_Ring_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Planetary_Ring_By_PkArgs = {
  _inc?: InputMaybe<Planetary_Ring_Inc_Input>;
  _set?: InputMaybe<Planetary_Ring_Set_Input>;
  pk_columns: Planetary_Ring_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Planetary_Ring_ManyArgs = {
  updates: Array<Planetary_Ring_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Playable_RaceArgs = {
  _set?: InputMaybe<Playable_Race_Set_Input>;
  where: Playable_Race_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Playable_Race_By_PkArgs = {
  _set?: InputMaybe<Playable_Race_Set_Input>;
  pk_columns: Playable_Race_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Playable_Race_ManyArgs = {
  updates: Array<Playable_Race_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_QuestArgs = {
  _set?: InputMaybe<Quest_Set_Input>;
  where: Quest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_By_PkArgs = {
  _set?: InputMaybe<Quest_Set_Input>;
  pk_columns: Quest_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_ManyArgs = {
  updates: Array<Quest_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_RewardArgs = {
  _inc?: InputMaybe<Quest_Reward_Inc_Input>;
  _set?: InputMaybe<Quest_Reward_Set_Input>;
  where: Quest_Reward_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Reward_By_PkArgs = {
  _inc?: InputMaybe<Quest_Reward_Inc_Input>;
  _set?: InputMaybe<Quest_Reward_Set_Input>;
  pk_columns: Quest_Reward_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Reward_ManyArgs = {
  updates: Array<Quest_Reward_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Reward_TypeArgs = {
  _set?: InputMaybe<Quest_Reward_Type_Set_Input>;
  where: Quest_Reward_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Reward_Type_By_PkArgs = {
  _set?: InputMaybe<Quest_Reward_Type_Set_Input>;
  pk_columns: Quest_Reward_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Reward_Type_ManyArgs = {
  updates: Array<Quest_Reward_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_StepArgs = {
  _inc?: InputMaybe<Quest_Step_Inc_Input>;
  _set?: InputMaybe<Quest_Step_Set_Input>;
  where: Quest_Step_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Step_By_PkArgs = {
  _inc?: InputMaybe<Quest_Step_Inc_Input>;
  _set?: InputMaybe<Quest_Step_Set_Input>;
  pk_columns: Quest_Step_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Step_ManyArgs = {
  updates: Array<Quest_Step_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Step_TypeArgs = {
  _set?: InputMaybe<Quest_Step_Type_Set_Input>;
  where: Quest_Step_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Step_Type_By_PkArgs = {
  _set?: InputMaybe<Quest_Step_Type_Set_Input>;
  pk_columns: Quest_Step_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Step_Type_ManyArgs = {
  updates: Array<Quest_Step_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_TypeArgs = {
  _set?: InputMaybe<Quest_Type_Set_Input>;
  where: Quest_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Type_By_PkArgs = {
  _set?: InputMaybe<Quest_Type_Set_Input>;
  pk_columns: Quest_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Quest_Type_ManyArgs = {
  updates: Array<Quest_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_GeneratorArgs = {
  _set?: InputMaybe<Resource_Generator_Set_Input>;
  where: Resource_Generator_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Generator_By_PkArgs = {
  _set?: InputMaybe<Resource_Generator_Set_Input>;
  pk_columns: Resource_Generator_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Generator_ManyArgs = {
  updates: Array<Resource_Generator_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Generator_TypeArgs = {
  _set?: InputMaybe<Resource_Generator_Type_Set_Input>;
  where: Resource_Generator_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Generator_Type_By_PkArgs = {
  _set?: InputMaybe<Resource_Generator_Type_Set_Input>;
  pk_columns: Resource_Generator_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Generator_Type_ManyArgs = {
  updates: Array<Resource_Generator_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_TypeArgs = {
  _set?: InputMaybe<Resource_Type_Set_Input>;
  where: Resource_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Type_By_PkArgs = {
  _set?: InputMaybe<Resource_Type_Set_Input>;
  pk_columns: Resource_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Type_ManyArgs = {
  updates: Array<Resource_Type_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Terrain_Hex_PaletteArgs = {
  _set?: InputMaybe<Terrain_Hex_Palette_Set_Input>;
  where: Terrain_Hex_Palette_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Terrain_Hex_Palette_By_PkArgs = {
  _set?: InputMaybe<Terrain_Hex_Palette_Set_Input>;
  pk_columns: Terrain_Hex_Palette_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Terrain_Hex_Palette_ManyArgs = {
  updates: Array<Terrain_Hex_Palette_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_InfoArgs = {
  _inc?: InputMaybe<User_Info_Inc_Input>;
  _set?: InputMaybe<User_Info_Set_Input>;
  where: User_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Info_By_PkArgs = {
  _inc?: InputMaybe<User_Info_Inc_Input>;
  _set?: InputMaybe<User_Info_Set_Input>;
  pk_columns: User_Info_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Info_ManyArgs = {
  updates: Array<User_Info_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_MeArgs = {
  _inc?: InputMaybe<User_Me_Inc_Input>;
  _set?: InputMaybe<User_Me_Set_Input>;
  where: User_Me_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Me_ManyArgs = {
  updates: Array<User_Me_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_PrivateArgs = {
  _set?: InputMaybe<User_Private_Set_Input>;
  where: User_Private_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Private_ManyArgs = {
  updates: Array<User_Private_Updates>;
};

/** non-playable characters */
export type Npc = {
  __typename?: 'npc';
  /** An object relationship */
  faction?: Maybe<Faction>;
  faction_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  image_url: Scalars['String'];
  name: Scalars['String'];
  /** An object relationship */
  playable_race?: Maybe<Playable_Race>;
  race_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "npc" */
export type Npc_Aggregate = {
  __typename?: 'npc_aggregate';
  aggregate?: Maybe<Npc_Aggregate_Fields>;
  nodes: Array<Npc>;
};

/** aggregate fields of "npc" */
export type Npc_Aggregate_Fields = {
  __typename?: 'npc_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Npc_Max_Fields>;
  min?: Maybe<Npc_Min_Fields>;
};


/** aggregate fields of "npc" */
export type Npc_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Npc_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "npc". All fields are combined with a logical 'AND'. */
export type Npc_Bool_Exp = {
  _and?: InputMaybe<Array<Npc_Bool_Exp>>;
  _not?: InputMaybe<Npc_Bool_Exp>;
  _or?: InputMaybe<Array<Npc_Bool_Exp>>;
  faction?: InputMaybe<Faction_Bool_Exp>;
  faction_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  playable_race?: InputMaybe<Playable_Race_Bool_Exp>;
  race_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "npc" */
export enum Npc_Constraint {
  /** unique or primary key constraint on columns "id" */
  NpcPkey = 'npc_pkey'
}

/** input type for inserting data into table "npc" */
export type Npc_Insert_Input = {
  faction?: InputMaybe<Faction_Obj_Rel_Insert_Input>;
  faction_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  playable_race?: InputMaybe<Playable_Race_Obj_Rel_Insert_Input>;
  race_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Npc_Max_Fields = {
  __typename?: 'npc_max_fields';
  faction_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  race_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Npc_Min_Fields = {
  __typename?: 'npc_min_fields';
  faction_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  race_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "npc" */
export type Npc_Mutation_Response = {
  __typename?: 'npc_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Npc>;
};

/** input type for inserting object relation for remote table "npc" */
export type Npc_Obj_Rel_Insert_Input = {
  data: Npc_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Npc_On_Conflict>;
};

/** on_conflict condition type for table "npc" */
export type Npc_On_Conflict = {
  constraint: Npc_Constraint;
  update_columns?: Array<Npc_Update_Column>;
  where?: InputMaybe<Npc_Bool_Exp>;
};

/** Ordering options when selecting data from "npc". */
export type Npc_Order_By = {
  faction?: InputMaybe<Faction_Order_By>;
  faction_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  playable_race?: InputMaybe<Playable_Race_Order_By>;
  race_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: npc */
export type Npc_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "npc" */
export enum Npc_Select_Column {
  /** column name */
  FactionId = 'faction_id',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name',
  /** column name */
  RaceId = 'race_id'
}

/** input type for updating data in table "npc" */
export type Npc_Set_Input = {
  faction_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  race_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "npc" */
export type Npc_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Npc_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Npc_Stream_Cursor_Value_Input = {
  faction_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  race_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "npc" */
export enum Npc_Update_Column {
  /** column name */
  FactionId = 'faction_id',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name',
  /** column name */
  RaceId = 'race_id'
}

export type Npc_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Npc_Set_Input>;
  where: Npc_Bool_Exp;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
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

/** columns and relationships of "planet" */
export type Planet = {
  __typename?: 'planet';
  atmospheric_distance: Scalars['numeric'];
  /** An object relationship */
  celestial: Celestial;
  celestial_id: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  owner_id: Scalars['String'];
  radius: Scalars['numeric'];
  /** An array relationship */
  rings: Array<Planetary_Ring>;
  /** An aggregate relationship */
  rings_aggregate: Planetary_Ring_Aggregate;
  terrain_bias: Scalars['_numeric'];
  /** An object relationship */
  terrain_hex_palette: Terrain_Hex_Palette;
  terrain_hex_palette_id: Scalars['uuid'];
  texture_resolution: Scalars['Int'];
  /** An object relationship */
  user_info?: Maybe<User_Info>;
};


/** columns and relationships of "planet" */
export type PlanetRingsArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


/** columns and relationships of "planet" */
export type PlanetRings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};

/** aggregated selection of "planet" */
export type Planet_Aggregate = {
  __typename?: 'planet_aggregate';
  aggregate?: Maybe<Planet_Aggregate_Fields>;
  nodes: Array<Planet>;
};

/** aggregate fields of "planet" */
export type Planet_Aggregate_Fields = {
  __typename?: 'planet_aggregate_fields';
  avg?: Maybe<Planet_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Planet_Max_Fields>;
  min?: Maybe<Planet_Min_Fields>;
  stddev?: Maybe<Planet_Stddev_Fields>;
  stddev_pop?: Maybe<Planet_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Planet_Stddev_Samp_Fields>;
  sum?: Maybe<Planet_Sum_Fields>;
  var_pop?: Maybe<Planet_Var_Pop_Fields>;
  var_samp?: Maybe<Planet_Var_Samp_Fields>;
  variance?: Maybe<Planet_Variance_Fields>;
};


/** aggregate fields of "planet" */
export type Planet_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Planet_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "planet" */
export type Planet_Aggregate_Order_By = {
  avg?: InputMaybe<Planet_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Planet_Max_Order_By>;
  min?: InputMaybe<Planet_Min_Order_By>;
  stddev?: InputMaybe<Planet_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Planet_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Planet_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Planet_Sum_Order_By>;
  var_pop?: InputMaybe<Planet_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Planet_Var_Samp_Order_By>;
  variance?: InputMaybe<Planet_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "planet" */
export type Planet_Arr_Rel_Insert_Input = {
  data: Array<Planet_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Planet_On_Conflict>;
};

/** aggregate avg on columns */
export type Planet_Avg_Fields = {
  __typename?: 'planet_avg_fields';
  atmospheric_distance?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "planet" */
export type Planet_Avg_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "planet". All fields are combined with a logical 'AND'. */
export type Planet_Bool_Exp = {
  _and?: InputMaybe<Array<Planet_Bool_Exp>>;
  _not?: InputMaybe<Planet_Bool_Exp>;
  _or?: InputMaybe<Array<Planet_Bool_Exp>>;
  atmospheric_distance?: InputMaybe<Numeric_Comparison_Exp>;
  celestial?: InputMaybe<Celestial_Bool_Exp>;
  celestial_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  owner_id?: InputMaybe<String_Comparison_Exp>;
  radius?: InputMaybe<Numeric_Comparison_Exp>;
  rings?: InputMaybe<Planetary_Ring_Bool_Exp>;
  terrain_bias?: InputMaybe<_Numeric_Comparison_Exp>;
  terrain_hex_palette?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
  terrain_hex_palette_id?: InputMaybe<Uuid_Comparison_Exp>;
  texture_resolution?: InputMaybe<Int_Comparison_Exp>;
  user_info?: InputMaybe<User_Info_Bool_Exp>;
};

/** unique or primary key constraints on table "planet" */
export enum Planet_Constraint {
  /** unique or primary key constraint on columns "name" */
  PlanetNameKey = 'planet_name_key',
  /** unique or primary key constraint on columns "id" */
  PlanetPkey = 'planet_pkey'
}

/** input type for incrementing numeric columns in table "planet" */
export type Planet_Inc_Input = {
  atmospheric_distance?: InputMaybe<Scalars['numeric']>;
  radius?: InputMaybe<Scalars['numeric']>;
  texture_resolution?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "planet" */
export type Planet_Insert_Input = {
  atmospheric_distance?: InputMaybe<Scalars['numeric']>;
  celestial?: InputMaybe<Celestial_Obj_Rel_Insert_Input>;
  celestial_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['numeric']>;
  rings?: InputMaybe<Planetary_Ring_Arr_Rel_Insert_Input>;
  terrain_bias?: InputMaybe<Scalars['_numeric']>;
  terrain_hex_palette?: InputMaybe<Terrain_Hex_Palette_Obj_Rel_Insert_Input>;
  terrain_hex_palette_id?: InputMaybe<Scalars['uuid']>;
  texture_resolution?: InputMaybe<Scalars['Int']>;
  user_info?: InputMaybe<User_Info_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Planet_Max_Fields = {
  __typename?: 'planet_max_fields';
  atmospheric_distance?: Maybe<Scalars['numeric']>;
  celestial_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['numeric']>;
  terrain_hex_palette_id?: Maybe<Scalars['uuid']>;
  texture_resolution?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "planet" */
export type Planet_Max_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  celestial_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  terrain_hex_palette_id?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Planet_Min_Fields = {
  __typename?: 'planet_min_fields';
  atmospheric_distance?: Maybe<Scalars['numeric']>;
  celestial_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['numeric']>;
  terrain_hex_palette_id?: Maybe<Scalars['uuid']>;
  texture_resolution?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "planet" */
export type Planet_Min_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  celestial_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  terrain_hex_palette_id?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "planet" */
export type Planet_Mutation_Response = {
  __typename?: 'planet_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Planet>;
};

/** input type for inserting object relation for remote table "planet" */
export type Planet_Obj_Rel_Insert_Input = {
  data: Planet_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Planet_On_Conflict>;
};

/** on_conflict condition type for table "planet" */
export type Planet_On_Conflict = {
  constraint: Planet_Constraint;
  update_columns?: Array<Planet_Update_Column>;
  where?: InputMaybe<Planet_Bool_Exp>;
};

/** Ordering options when selecting data from "planet". */
export type Planet_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  celestial?: InputMaybe<Celestial_Order_By>;
  celestial_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  rings_aggregate?: InputMaybe<Planetary_Ring_Aggregate_Order_By>;
  terrain_bias?: InputMaybe<Order_By>;
  terrain_hex_palette?: InputMaybe<Terrain_Hex_Palette_Order_By>;
  terrain_hex_palette_id?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
  user_info?: InputMaybe<User_Info_Order_By>;
};

/** primary key columns input for table: planet */
export type Planet_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "planet" */
export enum Planet_Select_Column {
  /** column name */
  AtmosphericDistance = 'atmospheric_distance',
  /** column name */
  CelestialId = 'celestial_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Radius = 'radius',
  /** column name */
  TerrainBias = 'terrain_bias',
  /** column name */
  TerrainHexPaletteId = 'terrain_hex_palette_id',
  /** column name */
  TextureResolution = 'texture_resolution'
}

/** input type for updating data in table "planet" */
export type Planet_Set_Input = {
  atmospheric_distance?: InputMaybe<Scalars['numeric']>;
  celestial_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['numeric']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']>;
  terrain_hex_palette_id?: InputMaybe<Scalars['uuid']>;
  texture_resolution?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Planet_Stddev_Fields = {
  __typename?: 'planet_stddev_fields';
  atmospheric_distance?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "planet" */
export type Planet_Stddev_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Planet_Stddev_Pop_Fields = {
  __typename?: 'planet_stddev_pop_fields';
  atmospheric_distance?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "planet" */
export type Planet_Stddev_Pop_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Planet_Stddev_Samp_Fields = {
  __typename?: 'planet_stddev_samp_fields';
  atmospheric_distance?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "planet" */
export type Planet_Stddev_Samp_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "planet" */
export type Planet_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Planet_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Planet_Stream_Cursor_Value_Input = {
  atmospheric_distance?: InputMaybe<Scalars['numeric']>;
  celestial_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['numeric']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']>;
  terrain_hex_palette_id?: InputMaybe<Scalars['uuid']>;
  texture_resolution?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Planet_Sum_Fields = {
  __typename?: 'planet_sum_fields';
  atmospheric_distance?: Maybe<Scalars['numeric']>;
  radius?: Maybe<Scalars['numeric']>;
  texture_resolution?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "planet" */
export type Planet_Sum_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** update columns of table "planet" */
export enum Planet_Update_Column {
  /** column name */
  AtmosphericDistance = 'atmospheric_distance',
  /** column name */
  CelestialId = 'celestial_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Radius = 'radius',
  /** column name */
  TerrainBias = 'terrain_bias',
  /** column name */
  TerrainHexPaletteId = 'terrain_hex_palette_id',
  /** column name */
  TextureResolution = 'texture_resolution'
}

export type Planet_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Planet_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Planet_Set_Input>;
  where: Planet_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Planet_Var_Pop_Fields = {
  __typename?: 'planet_var_pop_fields';
  atmospheric_distance?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "planet" */
export type Planet_Var_Pop_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Planet_Var_Samp_Fields = {
  __typename?: 'planet_var_samp_fields';
  atmospheric_distance?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "planet" */
export type Planet_Var_Samp_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Planet_Variance_Fields = {
  __typename?: 'planet_variance_fields';
  atmospheric_distance?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "planet" */
export type Planet_Variance_Order_By = {
  atmospheric_distance?: InputMaybe<Order_By>;
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** columns and relationships of "planetary_ring" */
export type Planetary_Ring = {
  __typename?: 'planetary_ring';
  colors: Scalars['_text'];
  id: Scalars['uuid'];
  inner_radius: Scalars['numeric'];
  outer_radius: Scalars['numeric'];
  resolution: Scalars['Int'];
  rotation: Scalars['_numeric'];
  terrain_bias: Scalars['_numeric'];
  type: Scalars['String'];
};

/** aggregated selection of "planetary_ring" */
export type Planetary_Ring_Aggregate = {
  __typename?: 'planetary_ring_aggregate';
  aggregate?: Maybe<Planetary_Ring_Aggregate_Fields>;
  nodes: Array<Planetary_Ring>;
};

/** aggregate fields of "planetary_ring" */
export type Planetary_Ring_Aggregate_Fields = {
  __typename?: 'planetary_ring_aggregate_fields';
  avg?: Maybe<Planetary_Ring_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Planetary_Ring_Max_Fields>;
  min?: Maybe<Planetary_Ring_Min_Fields>;
  stddev?: Maybe<Planetary_Ring_Stddev_Fields>;
  stddev_pop?: Maybe<Planetary_Ring_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Planetary_Ring_Stddev_Samp_Fields>;
  sum?: Maybe<Planetary_Ring_Sum_Fields>;
  var_pop?: Maybe<Planetary_Ring_Var_Pop_Fields>;
  var_samp?: Maybe<Planetary_Ring_Var_Samp_Fields>;
  variance?: Maybe<Planetary_Ring_Variance_Fields>;
};


/** aggregate fields of "planetary_ring" */
export type Planetary_Ring_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "planetary_ring" */
export type Planetary_Ring_Aggregate_Order_By = {
  avg?: InputMaybe<Planetary_Ring_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Planetary_Ring_Max_Order_By>;
  min?: InputMaybe<Planetary_Ring_Min_Order_By>;
  stddev?: InputMaybe<Planetary_Ring_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Planetary_Ring_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Planetary_Ring_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Planetary_Ring_Sum_Order_By>;
  var_pop?: InputMaybe<Planetary_Ring_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Planetary_Ring_Var_Samp_Order_By>;
  variance?: InputMaybe<Planetary_Ring_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "planetary_ring" */
export type Planetary_Ring_Arr_Rel_Insert_Input = {
  data: Array<Planetary_Ring_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Planetary_Ring_On_Conflict>;
};

/** aggregate avg on columns */
export type Planetary_Ring_Avg_Fields = {
  __typename?: 'planetary_ring_avg_fields';
  inner_radius?: Maybe<Scalars['Float']>;
  outer_radius?: Maybe<Scalars['Float']>;
  resolution?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "planetary_ring" */
export type Planetary_Ring_Avg_Order_By = {
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "planetary_ring". All fields are combined with a logical 'AND'. */
export type Planetary_Ring_Bool_Exp = {
  _and?: InputMaybe<Array<Planetary_Ring_Bool_Exp>>;
  _not?: InputMaybe<Planetary_Ring_Bool_Exp>;
  _or?: InputMaybe<Array<Planetary_Ring_Bool_Exp>>;
  colors?: InputMaybe<_Text_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  inner_radius?: InputMaybe<Numeric_Comparison_Exp>;
  outer_radius?: InputMaybe<Numeric_Comparison_Exp>;
  resolution?: InputMaybe<Int_Comparison_Exp>;
  rotation?: InputMaybe<_Numeric_Comparison_Exp>;
  terrain_bias?: InputMaybe<_Numeric_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "planetary_ring" */
export enum Planetary_Ring_Constraint {
  /** unique or primary key constraint on columns "id" */
  PlanetaryRingPkey = 'planetary_ring_pkey'
}

/** input type for incrementing numeric columns in table "planetary_ring" */
export type Planetary_Ring_Inc_Input = {
  inner_radius?: InputMaybe<Scalars['numeric']>;
  outer_radius?: InputMaybe<Scalars['numeric']>;
  resolution?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "planetary_ring" */
export type Planetary_Ring_Insert_Input = {
  colors?: InputMaybe<Scalars['_text']>;
  id?: InputMaybe<Scalars['uuid']>;
  inner_radius?: InputMaybe<Scalars['numeric']>;
  outer_radius?: InputMaybe<Scalars['numeric']>;
  resolution?: InputMaybe<Scalars['Int']>;
  rotation?: InputMaybe<Scalars['_numeric']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Planetary_Ring_Max_Fields = {
  __typename?: 'planetary_ring_max_fields';
  id?: Maybe<Scalars['uuid']>;
  inner_radius?: Maybe<Scalars['numeric']>;
  outer_radius?: Maybe<Scalars['numeric']>;
  resolution?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "planetary_ring" */
export type Planetary_Ring_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Planetary_Ring_Min_Fields = {
  __typename?: 'planetary_ring_min_fields';
  id?: Maybe<Scalars['uuid']>;
  inner_radius?: Maybe<Scalars['numeric']>;
  outer_radius?: Maybe<Scalars['numeric']>;
  resolution?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "planetary_ring" */
export type Planetary_Ring_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "planetary_ring" */
export type Planetary_Ring_Mutation_Response = {
  __typename?: 'planetary_ring_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Planetary_Ring>;
};

/** on_conflict condition type for table "planetary_ring" */
export type Planetary_Ring_On_Conflict = {
  constraint: Planetary_Ring_Constraint;
  update_columns?: Array<Planetary_Ring_Update_Column>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};

/** Ordering options when selecting data from "planetary_ring". */
export type Planetary_Ring_Order_By = {
  colors?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
  rotation?: InputMaybe<Order_By>;
  terrain_bias?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: planetary_ring */
export type Planetary_Ring_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "planetary_ring" */
export enum Planetary_Ring_Select_Column {
  /** column name */
  Colors = 'colors',
  /** column name */
  Id = 'id',
  /** column name */
  InnerRadius = 'inner_radius',
  /** column name */
  OuterRadius = 'outer_radius',
  /** column name */
  Resolution = 'resolution',
  /** column name */
  Rotation = 'rotation',
  /** column name */
  TerrainBias = 'terrain_bias',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "planetary_ring" */
export type Planetary_Ring_Set_Input = {
  colors?: InputMaybe<Scalars['_text']>;
  id?: InputMaybe<Scalars['uuid']>;
  inner_radius?: InputMaybe<Scalars['numeric']>;
  outer_radius?: InputMaybe<Scalars['numeric']>;
  resolution?: InputMaybe<Scalars['Int']>;
  rotation?: InputMaybe<Scalars['_numeric']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Planetary_Ring_Stddev_Fields = {
  __typename?: 'planetary_ring_stddev_fields';
  inner_radius?: Maybe<Scalars['Float']>;
  outer_radius?: Maybe<Scalars['Float']>;
  resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "planetary_ring" */
export type Planetary_Ring_Stddev_Order_By = {
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Planetary_Ring_Stddev_Pop_Fields = {
  __typename?: 'planetary_ring_stddev_pop_fields';
  inner_radius?: Maybe<Scalars['Float']>;
  outer_radius?: Maybe<Scalars['Float']>;
  resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "planetary_ring" */
export type Planetary_Ring_Stddev_Pop_Order_By = {
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Planetary_Ring_Stddev_Samp_Fields = {
  __typename?: 'planetary_ring_stddev_samp_fields';
  inner_radius?: Maybe<Scalars['Float']>;
  outer_radius?: Maybe<Scalars['Float']>;
  resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "planetary_ring" */
export type Planetary_Ring_Stddev_Samp_Order_By = {
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "planetary_ring" */
export type Planetary_Ring_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Planetary_Ring_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Planetary_Ring_Stream_Cursor_Value_Input = {
  colors?: InputMaybe<Scalars['_text']>;
  id?: InputMaybe<Scalars['uuid']>;
  inner_radius?: InputMaybe<Scalars['numeric']>;
  outer_radius?: InputMaybe<Scalars['numeric']>;
  resolution?: InputMaybe<Scalars['Int']>;
  rotation?: InputMaybe<Scalars['_numeric']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Planetary_Ring_Sum_Fields = {
  __typename?: 'planetary_ring_sum_fields';
  inner_radius?: Maybe<Scalars['numeric']>;
  outer_radius?: Maybe<Scalars['numeric']>;
  resolution?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "planetary_ring" */
export type Planetary_Ring_Sum_Order_By = {
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
};

/** update columns of table "planetary_ring" */
export enum Planetary_Ring_Update_Column {
  /** column name */
  Colors = 'colors',
  /** column name */
  Id = 'id',
  /** column name */
  InnerRadius = 'inner_radius',
  /** column name */
  OuterRadius = 'outer_radius',
  /** column name */
  Resolution = 'resolution',
  /** column name */
  Rotation = 'rotation',
  /** column name */
  TerrainBias = 'terrain_bias',
  /** column name */
  Type = 'type'
}

export type Planetary_Ring_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Planetary_Ring_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Planetary_Ring_Set_Input>;
  where: Planetary_Ring_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Planetary_Ring_Var_Pop_Fields = {
  __typename?: 'planetary_ring_var_pop_fields';
  inner_radius?: Maybe<Scalars['Float']>;
  outer_radius?: Maybe<Scalars['Float']>;
  resolution?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "planetary_ring" */
export type Planetary_Ring_Var_Pop_Order_By = {
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Planetary_Ring_Var_Samp_Fields = {
  __typename?: 'planetary_ring_var_samp_fields';
  inner_radius?: Maybe<Scalars['Float']>;
  outer_radius?: Maybe<Scalars['Float']>;
  resolution?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "planetary_ring" */
export type Planetary_Ring_Var_Samp_Order_By = {
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Planetary_Ring_Variance_Fields = {
  __typename?: 'planetary_ring_variance_fields';
  inner_radius?: Maybe<Scalars['Float']>;
  outer_radius?: Maybe<Scalars['Float']>;
  resolution?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "planetary_ring" */
export type Planetary_Ring_Variance_Order_By = {
  inner_radius?: InputMaybe<Order_By>;
  outer_radius?: InputMaybe<Order_By>;
  resolution?: InputMaybe<Order_By>;
};

/** Playable races */
export type Playable_Race = {
  __typename?: 'playable_race';
  description: Scalars['String'];
  id: Scalars['uuid'];
  image_url?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** aggregated selection of "playable_race" */
export type Playable_Race_Aggregate = {
  __typename?: 'playable_race_aggregate';
  aggregate?: Maybe<Playable_Race_Aggregate_Fields>;
  nodes: Array<Playable_Race>;
};

/** aggregate fields of "playable_race" */
export type Playable_Race_Aggregate_Fields = {
  __typename?: 'playable_race_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Playable_Race_Max_Fields>;
  min?: Maybe<Playable_Race_Min_Fields>;
};


/** aggregate fields of "playable_race" */
export type Playable_Race_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Playable_Race_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "playable_race". All fields are combined with a logical 'AND'. */
export type Playable_Race_Bool_Exp = {
  _and?: InputMaybe<Array<Playable_Race_Bool_Exp>>;
  _not?: InputMaybe<Playable_Race_Bool_Exp>;
  _or?: InputMaybe<Array<Playable_Race_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "playable_race" */
export enum Playable_Race_Constraint {
  /** unique or primary key constraint on columns "id" */
  PlayableRacePkey = 'playable_race_pkey'
}

/** input type for inserting data into table "playable_race" */
export type Playable_Race_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Playable_Race_Max_Fields = {
  __typename?: 'playable_race_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Playable_Race_Min_Fields = {
  __typename?: 'playable_race_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "playable_race" */
export type Playable_Race_Mutation_Response = {
  __typename?: 'playable_race_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Playable_Race>;
};

/** input type for inserting object relation for remote table "playable_race" */
export type Playable_Race_Obj_Rel_Insert_Input = {
  data: Playable_Race_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Playable_Race_On_Conflict>;
};

/** on_conflict condition type for table "playable_race" */
export type Playable_Race_On_Conflict = {
  constraint: Playable_Race_Constraint;
  update_columns?: Array<Playable_Race_Update_Column>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};

/** Ordering options when selecting data from "playable_race". */
export type Playable_Race_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: playable_race */
export type Playable_Race_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "playable_race" */
export enum Playable_Race_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "playable_race" */
export type Playable_Race_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "playable_race" */
export type Playable_Race_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Playable_Race_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Playable_Race_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "playable_race" */
export enum Playable_Race_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name'
}

export type Playable_Race_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Playable_Race_Set_Input>;
  where: Playable_Race_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "background" */
  background: Array<Background>;
  /** fetch aggregated fields from the table: "background" */
  background_aggregate: Background_Aggregate;
  /** fetch data from the table: "background" using primary key columns */
  background_by_pk?: Maybe<Background>;
  /** fetch data from the table: "celestial" */
  celestial: Array<Celestial>;
  /** fetch aggregated fields from the table: "celestial" */
  celestial_aggregate: Celestial_Aggregate;
  /** fetch data from the table: "celestial" using primary key columns */
  celestial_by_pk?: Maybe<Celestial>;
  /** fetch data from the table: "chat_message" */
  chat_message: Array<Chat_Message>;
  /** fetch aggregated fields from the table: "chat_message" */
  chat_message_aggregate: Chat_Message_Aggregate;
  /** fetch data from the table: "chat_message" using primary key columns */
  chat_message_by_pk?: Maybe<Chat_Message>;
  /** fetch data from the table: "faction" */
  faction: Array<Faction>;
  /** fetch aggregated fields from the table: "faction" */
  faction_aggregate: Faction_Aggregate;
  /** fetch data from the table: "faction" using primary key columns */
  faction_by_pk?: Maybe<Faction>;
  /** fetch data from the table: "galactic_empire" */
  galactic_empire: Array<Galactic_Empire>;
  /** fetch aggregated fields from the table: "galactic_empire" */
  galactic_empire_aggregate: Galactic_Empire_Aggregate;
  /** fetch data from the table: "galactic_empire" using primary key columns */
  galactic_empire_by_pk?: Maybe<Galactic_Empire>;
  /** fetch data from the table: "galactic_empire_npc" */
  galactic_empire_npc: Array<Galactic_Empire_Npc>;
  /** fetch aggregated fields from the table: "galactic_empire_npc" */
  galactic_empire_npc_aggregate: Galactic_Empire_Npc_Aggregate;
  /** fetch data from the table: "galactic_empire_npc" using primary key columns */
  galactic_empire_npc_by_pk?: Maybe<Galactic_Empire_Npc>;
  /** fetch data from the table: "galactic_empire_quest" */
  galactic_empire_quest: Array<Galactic_Empire_Quest>;
  /** fetch aggregated fields from the table: "galactic_empire_quest" */
  galactic_empire_quest_aggregate: Galactic_Empire_Quest_Aggregate;
  /** fetch data from the table: "galactic_empire_quest" using primary key columns */
  galactic_empire_quest_by_pk?: Maybe<Galactic_Empire_Quest>;
  /** fetch data from the table: "galactic_empire_resources" */
  galactic_empire_resources: Array<Galactic_Empire_Resources>;
  /** fetch aggregated fields from the table: "galactic_empire_resources" */
  galactic_empire_resources_aggregate: Galactic_Empire_Resources_Aggregate;
  /** fetch data from the table: "galactic_empire_resources" using primary key columns */
  galactic_empire_resources_by_pk?: Maybe<Galactic_Empire_Resources>;
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch aggregated fields from the table: "galaxy" */
  galaxy_aggregate: Galaxy_Aggregate;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
  /** fetch data from the table: "npc" */
  npc: Array<Npc>;
  /** fetch aggregated fields from the table: "npc" */
  npc_aggregate: Npc_Aggregate;
  /** fetch data from the table: "npc" using primary key columns */
  npc_by_pk?: Maybe<Npc>;
  /** fetch data from the table: "planet" */
  planet: Array<Planet>;
  /** fetch aggregated fields from the table: "planet" */
  planet_aggregate: Planet_Aggregate;
  /** fetch data from the table: "planet" using primary key columns */
  planet_by_pk?: Maybe<Planet>;
  /** fetch data from the table: "planetary_ring" */
  planetary_ring: Array<Planetary_Ring>;
  /** fetch aggregated fields from the table: "planetary_ring" */
  planetary_ring_aggregate: Planetary_Ring_Aggregate;
  /** fetch data from the table: "planetary_ring" using primary key columns */
  planetary_ring_by_pk?: Maybe<Planetary_Ring>;
  /** fetch data from the table: "playable_race" */
  playable_race: Array<Playable_Race>;
  /** fetch aggregated fields from the table: "playable_race" */
  playable_race_aggregate: Playable_Race_Aggregate;
  /** fetch data from the table: "playable_race" using primary key columns */
  playable_race_by_pk?: Maybe<Playable_Race>;
  /** fetch data from the table: "quest" */
  quest: Array<Quest>;
  /** fetch aggregated fields from the table: "quest" */
  quest_aggregate: Quest_Aggregate;
  /** fetch data from the table: "quest" using primary key columns */
  quest_by_pk?: Maybe<Quest>;
  /** fetch data from the table: "quest_reward" */
  quest_reward: Array<Quest_Reward>;
  /** fetch aggregated fields from the table: "quest_reward" */
  quest_reward_aggregate: Quest_Reward_Aggregate;
  /** fetch data from the table: "quest_reward" using primary key columns */
  quest_reward_by_pk?: Maybe<Quest_Reward>;
  /** fetch data from the table: "quest_reward_type" */
  quest_reward_type: Array<Quest_Reward_Type>;
  /** fetch aggregated fields from the table: "quest_reward_type" */
  quest_reward_type_aggregate: Quest_Reward_Type_Aggregate;
  /** fetch data from the table: "quest_reward_type" using primary key columns */
  quest_reward_type_by_pk?: Maybe<Quest_Reward_Type>;
  /** fetch data from the table: "quest_step" */
  quest_step: Array<Quest_Step>;
  /** fetch aggregated fields from the table: "quest_step" */
  quest_step_aggregate: Quest_Step_Aggregate;
  /** fetch data from the table: "quest_step" using primary key columns */
  quest_step_by_pk?: Maybe<Quest_Step>;
  /** fetch data from the table: "quest_step_type" */
  quest_step_type: Array<Quest_Step_Type>;
  /** fetch aggregated fields from the table: "quest_step_type" */
  quest_step_type_aggregate: Quest_Step_Type_Aggregate;
  /** fetch data from the table: "quest_step_type" using primary key columns */
  quest_step_type_by_pk?: Maybe<Quest_Step_Type>;
  /** fetch data from the table: "quest_type" */
  quest_type: Array<Quest_Type>;
  /** fetch aggregated fields from the table: "quest_type" */
  quest_type_aggregate: Quest_Type_Aggregate;
  /** fetch data from the table: "quest_type" using primary key columns */
  quest_type_by_pk?: Maybe<Quest_Type>;
  /** fetch data from the table: "resource_generator" */
  resource_generator: Array<Resource_Generator>;
  /** fetch aggregated fields from the table: "resource_generator" */
  resource_generator_aggregate: Resource_Generator_Aggregate;
  /** fetch data from the table: "resource_generator" using primary key columns */
  resource_generator_by_pk?: Maybe<Resource_Generator>;
  /** fetch data from the table: "resource_generator_type" */
  resource_generator_type: Array<Resource_Generator_Type>;
  /** fetch aggregated fields from the table: "resource_generator_type" */
  resource_generator_type_aggregate: Resource_Generator_Type_Aggregate;
  /** fetch data from the table: "resource_generator_type" using primary key columns */
  resource_generator_type_by_pk?: Maybe<Resource_Generator_Type>;
  /** fetch data from the table: "resource_type" */
  resource_type: Array<Resource_Type>;
  /** fetch aggregated fields from the table: "resource_type" */
  resource_type_aggregate: Resource_Type_Aggregate;
  /** fetch data from the table: "resource_type" using primary key columns */
  resource_type_by_pk?: Maybe<Resource_Type>;
  returnNothing?: Maybe<GalaxyManagement>;
  /** fetch data from the table: "terrain_hex_palette" */
  terrain_hex_palette: Array<Terrain_Hex_Palette>;
  /** fetch aggregated fields from the table: "terrain_hex_palette" */
  terrain_hex_palette_aggregate: Terrain_Hex_Palette_Aggregate;
  /** fetch data from the table: "terrain_hex_palette" using primary key columns */
  terrain_hex_palette_by_pk?: Maybe<Terrain_Hex_Palette>;
  /** fetch data from the table: "user_info" */
  user_info: Array<User_Info>;
  /** fetch aggregated fields from the table: "user_info" */
  user_info_aggregate: User_Info_Aggregate;
  /** fetch data from the table: "user_info" using primary key columns */
  user_info_by_pk?: Maybe<User_Info>;
  /** fetch data from the table: "user_me" */
  user_me: Array<User_Me>;
  /** fetch aggregated fields from the table: "user_me" */
  user_me_aggregate: User_Me_Aggregate;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
  /** fetch aggregated fields from the table: "user_private" */
  user_private_aggregate: User_Private_Aggregate;
};


export type Query_RootBackgroundArgs = {
  distinct_on?: InputMaybe<Array<Background_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Background_Order_By>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Query_RootBackground_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Background_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Background_Order_By>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Query_RootBackground_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCelestialArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Query_RootCelestial_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Query_RootCelestial_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootChat_MessageArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Query_RootChat_Message_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Query_RootChat_Message_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootFactionArgs = {
  distinct_on?: InputMaybe<Array<Faction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Faction_Order_By>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Query_RootFaction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Faction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Faction_Order_By>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Query_RootFaction_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGalactic_EmpireArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Query_RootGalactic_Empire_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Query_RootGalactic_Empire_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGalactic_Empire_NpcArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Npc_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Npc_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGalactic_Empire_QuestArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Quest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Quest_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGalactic_Empire_ResourcesArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Resources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Resources_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGalaxyArgs = {
  distinct_on?: InputMaybe<Array<Galaxy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galaxy_Order_By>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Query_RootGalaxy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galaxy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galaxy_Order_By>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Query_RootGalaxy_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootNpcArgs = {
  distinct_on?: InputMaybe<Array<Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Npc_Order_By>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Query_RootNpc_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Npc_Order_By>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Query_RootNpc_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPlanetArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Query_RootPlanet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Query_RootPlanet_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPlanetary_RingArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Query_RootPlanetary_Ring_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Query_RootPlanetary_Ring_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPlayable_RaceArgs = {
  distinct_on?: InputMaybe<Array<Playable_Race_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Playable_Race_Order_By>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Query_RootPlayable_Race_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Playable_Race_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Playable_Race_Order_By>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Query_RootPlayable_Race_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootQuestArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Query_RootQuest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Query_RootQuest_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootQuest_RewardArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Query_RootQuest_Reward_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Query_RootQuest_Reward_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootQuest_Reward_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Type_Order_By>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Query_RootQuest_Reward_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Type_Order_By>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Query_RootQuest_Reward_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootQuest_StepArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Query_RootQuest_Step_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Query_RootQuest_Step_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootQuest_Step_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Type_Order_By>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Query_RootQuest_Step_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Type_Order_By>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Query_RootQuest_Step_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootQuest_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Type_Order_By>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Query_RootQuest_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Type_Order_By>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Query_RootQuest_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootResource_GeneratorArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Generator_Order_By>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Query_RootResource_Generator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Generator_Order_By>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Query_RootResource_Generator_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootResource_Generator_TypeArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Generator_Type_Order_By>>;
  where?: InputMaybe<Resource_Generator_Type_Bool_Exp>;
};


export type Query_RootResource_Generator_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Generator_Type_Order_By>>;
  where?: InputMaybe<Resource_Generator_Type_Bool_Exp>;
};


export type Query_RootResource_Generator_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootResource_TypeArgs = {
  distinct_on?: InputMaybe<Array<Resource_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Type_Order_By>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Query_RootResource_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Type_Order_By>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Query_RootResource_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTerrain_Hex_PaletteArgs = {
  distinct_on?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Terrain_Hex_Palette_Order_By>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Query_RootTerrain_Hex_Palette_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Terrain_Hex_Palette_Order_By>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Query_RootTerrain_Hex_Palette_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUser_InfoArgs = {
  distinct_on?: InputMaybe<Array<User_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Info_Order_By>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Query_RootUser_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Info_Order_By>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Query_RootUser_Info_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootUser_MeArgs = {
  distinct_on?: InputMaybe<Array<User_Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Me_Order_By>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Query_RootUser_Me_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Me_Order_By>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Query_RootUser_PrivateArgs = {
  distinct_on?: InputMaybe<Array<User_Private_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Private_Order_By>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};


export type Query_RootUser_Private_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Private_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Private_Order_By>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};

/** columns and relationships of "quest" */
export type Quest = {
  __typename?: 'quest';
  description: Scalars['String'];
  id: Scalars['uuid'];
  initial?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  /** An object relationship */
  next_quest?: Maybe<Quest>;
  next_quest_in_chain?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  quest_type: Quest_Type;
  /** An array relationship */
  rewards: Array<Quest_Reward>;
  /** An aggregate relationship */
  rewards_aggregate: Quest_Reward_Aggregate;
  /** An array relationship */
  steps: Array<Quest_Step>;
  /** An aggregate relationship */
  steps_aggregate: Quest_Step_Aggregate;
  type: Quest_Type_Enum;
};


/** columns and relationships of "quest" */
export type QuestRewardsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestRewards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestStepsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestSteps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};

/** aggregated selection of "quest" */
export type Quest_Aggregate = {
  __typename?: 'quest_aggregate';
  aggregate?: Maybe<Quest_Aggregate_Fields>;
  nodes: Array<Quest>;
};

/** aggregate fields of "quest" */
export type Quest_Aggregate_Fields = {
  __typename?: 'quest_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Quest_Max_Fields>;
  min?: Maybe<Quest_Min_Fields>;
};


/** aggregate fields of "quest" */
export type Quest_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "quest". All fields are combined with a logical 'AND'. */
export type Quest_Bool_Exp = {
  _and?: InputMaybe<Array<Quest_Bool_Exp>>;
  _not?: InputMaybe<Quest_Bool_Exp>;
  _or?: InputMaybe<Array<Quest_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  initial?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  next_quest?: InputMaybe<Quest_Bool_Exp>;
  next_quest_in_chain?: InputMaybe<Uuid_Comparison_Exp>;
  quest_type?: InputMaybe<Quest_Type_Bool_Exp>;
  rewards?: InputMaybe<Quest_Reward_Bool_Exp>;
  steps?: InputMaybe<Quest_Step_Bool_Exp>;
  type?: InputMaybe<Quest_Type_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest" */
export enum Quest_Constraint {
  /** unique or primary key constraint on columns "name" */
  QuestNameKey = 'quest_name_key',
  /** unique or primary key constraint on columns "id" */
  QuestPkey = 'quest_pkey'
}

/** input type for inserting data into table "quest" */
export type Quest_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  initial?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  next_quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  next_quest_in_chain?: InputMaybe<Scalars['uuid']>;
  quest_type?: InputMaybe<Quest_Type_Obj_Rel_Insert_Input>;
  rewards?: InputMaybe<Quest_Reward_Arr_Rel_Insert_Input>;
  steps?: InputMaybe<Quest_Step_Arr_Rel_Insert_Input>;
  type?: InputMaybe<Quest_Type_Enum>;
};

/** aggregate max on columns */
export type Quest_Max_Fields = {
  __typename?: 'quest_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  next_quest_in_chain?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Quest_Min_Fields = {
  __typename?: 'quest_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  next_quest_in_chain?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "quest" */
export type Quest_Mutation_Response = {
  __typename?: 'quest_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Quest>;
};

/** input type for inserting object relation for remote table "quest" */
export type Quest_Obj_Rel_Insert_Input = {
  data: Quest_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Quest_On_Conflict>;
};

/** on_conflict condition type for table "quest" */
export type Quest_On_Conflict = {
  constraint: Quest_Constraint;
  update_columns?: Array<Quest_Update_Column>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** Ordering options when selecting data from "quest". */
export type Quest_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initial?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  next_quest?: InputMaybe<Quest_Order_By>;
  next_quest_in_chain?: InputMaybe<Order_By>;
  quest_type?: InputMaybe<Quest_Type_Order_By>;
  rewards_aggregate?: InputMaybe<Quest_Reward_Aggregate_Order_By>;
  steps_aggregate?: InputMaybe<Quest_Step_Aggregate_Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: quest */
export type Quest_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "quest_reward" */
export type Quest_Reward = {
  __typename?: 'quest_reward';
  id: Scalars['uuid'];
  npc_unlock_id?: Maybe<Scalars['uuid']>;
  quest_id: Scalars['uuid'];
  resource_accrual_amount?: Maybe<Scalars['Int']>;
  resource_accrual_type_id?: Maybe<Scalars['uuid']>;
  resource_unlock_id?: Maybe<Scalars['uuid']>;
  type: Quest_Reward_Type_Enum;
};

/** aggregated selection of "quest_reward" */
export type Quest_Reward_Aggregate = {
  __typename?: 'quest_reward_aggregate';
  aggregate?: Maybe<Quest_Reward_Aggregate_Fields>;
  nodes: Array<Quest_Reward>;
};

/** aggregate fields of "quest_reward" */
export type Quest_Reward_Aggregate_Fields = {
  __typename?: 'quest_reward_aggregate_fields';
  avg?: Maybe<Quest_Reward_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Quest_Reward_Max_Fields>;
  min?: Maybe<Quest_Reward_Min_Fields>;
  stddev?: Maybe<Quest_Reward_Stddev_Fields>;
  stddev_pop?: Maybe<Quest_Reward_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Quest_Reward_Stddev_Samp_Fields>;
  sum?: Maybe<Quest_Reward_Sum_Fields>;
  var_pop?: Maybe<Quest_Reward_Var_Pop_Fields>;
  var_samp?: Maybe<Quest_Reward_Var_Samp_Fields>;
  variance?: Maybe<Quest_Reward_Variance_Fields>;
};


/** aggregate fields of "quest_reward" */
export type Quest_Reward_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest_reward" */
export type Quest_Reward_Aggregate_Order_By = {
  avg?: InputMaybe<Quest_Reward_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quest_Reward_Max_Order_By>;
  min?: InputMaybe<Quest_Reward_Min_Order_By>;
  stddev?: InputMaybe<Quest_Reward_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Quest_Reward_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Quest_Reward_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Quest_Reward_Sum_Order_By>;
  var_pop?: InputMaybe<Quest_Reward_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Quest_Reward_Var_Samp_Order_By>;
  variance?: InputMaybe<Quest_Reward_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "quest_reward" */
export type Quest_Reward_Arr_Rel_Insert_Input = {
  data: Array<Quest_Reward_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Quest_Reward_On_Conflict>;
};

/** aggregate avg on columns */
export type Quest_Reward_Avg_Fields = {
  __typename?: 'quest_reward_avg_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "quest_reward" */
export type Quest_Reward_Avg_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "quest_reward". All fields are combined with a logical 'AND'. */
export type Quest_Reward_Bool_Exp = {
  _and?: InputMaybe<Array<Quest_Reward_Bool_Exp>>;
  _not?: InputMaybe<Quest_Reward_Bool_Exp>;
  _or?: InputMaybe<Array<Quest_Reward_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  npc_unlock_id?: InputMaybe<Uuid_Comparison_Exp>;
  quest_id?: InputMaybe<Uuid_Comparison_Exp>;
  resource_accrual_amount?: InputMaybe<Int_Comparison_Exp>;
  resource_accrual_type_id?: InputMaybe<Uuid_Comparison_Exp>;
  resource_unlock_id?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Quest_Reward_Type_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_reward" */
export enum Quest_Reward_Constraint {
  /** unique or primary key constraint on columns "id" */
  QuestRewardPkey = 'quest_reward_pkey'
}

/** input type for incrementing numeric columns in table "quest_reward" */
export type Quest_Reward_Inc_Input = {
  resource_accrual_amount?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "quest_reward" */
export type Quest_Reward_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  npc_unlock_id?: InputMaybe<Scalars['uuid']>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  resource_accrual_amount?: InputMaybe<Scalars['Int']>;
  resource_accrual_type_id?: InputMaybe<Scalars['uuid']>;
  resource_unlock_id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Quest_Reward_Type_Enum>;
};

/** aggregate max on columns */
export type Quest_Reward_Max_Fields = {
  __typename?: 'quest_reward_max_fields';
  id?: Maybe<Scalars['uuid']>;
  npc_unlock_id?: Maybe<Scalars['uuid']>;
  quest_id?: Maybe<Scalars['uuid']>;
  resource_accrual_amount?: Maybe<Scalars['Int']>;
  resource_accrual_type_id?: Maybe<Scalars['uuid']>;
  resource_unlock_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "quest_reward" */
export type Quest_Reward_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  npc_unlock_id?: InputMaybe<Order_By>;
  quest_id?: InputMaybe<Order_By>;
  resource_accrual_amount?: InputMaybe<Order_By>;
  resource_accrual_type_id?: InputMaybe<Order_By>;
  resource_unlock_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Reward_Min_Fields = {
  __typename?: 'quest_reward_min_fields';
  id?: Maybe<Scalars['uuid']>;
  npc_unlock_id?: Maybe<Scalars['uuid']>;
  quest_id?: Maybe<Scalars['uuid']>;
  resource_accrual_amount?: Maybe<Scalars['Int']>;
  resource_accrual_type_id?: Maybe<Scalars['uuid']>;
  resource_unlock_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "quest_reward" */
export type Quest_Reward_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  npc_unlock_id?: InputMaybe<Order_By>;
  quest_id?: InputMaybe<Order_By>;
  resource_accrual_amount?: InputMaybe<Order_By>;
  resource_accrual_type_id?: InputMaybe<Order_By>;
  resource_unlock_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest_reward" */
export type Quest_Reward_Mutation_Response = {
  __typename?: 'quest_reward_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Quest_Reward>;
};

/** on_conflict condition type for table "quest_reward" */
export type Quest_Reward_On_Conflict = {
  constraint: Quest_Reward_Constraint;
  update_columns?: Array<Quest_Reward_Update_Column>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};

/** Ordering options when selecting data from "quest_reward". */
export type Quest_Reward_Order_By = {
  id?: InputMaybe<Order_By>;
  npc_unlock_id?: InputMaybe<Order_By>;
  quest_id?: InputMaybe<Order_By>;
  resource_accrual_amount?: InputMaybe<Order_By>;
  resource_accrual_type_id?: InputMaybe<Order_By>;
  resource_unlock_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: quest_reward */
export type Quest_Reward_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "quest_reward" */
export enum Quest_Reward_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  NpcUnlockId = 'npc_unlock_id',
  /** column name */
  QuestId = 'quest_id',
  /** column name */
  ResourceAccrualAmount = 'resource_accrual_amount',
  /** column name */
  ResourceAccrualTypeId = 'resource_accrual_type_id',
  /** column name */
  ResourceUnlockId = 'resource_unlock_id',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "quest_reward" */
export type Quest_Reward_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  npc_unlock_id?: InputMaybe<Scalars['uuid']>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  resource_accrual_amount?: InputMaybe<Scalars['Int']>;
  resource_accrual_type_id?: InputMaybe<Scalars['uuid']>;
  resource_unlock_id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Quest_Reward_Type_Enum>;
};

/** aggregate stddev on columns */
export type Quest_Reward_Stddev_Fields = {
  __typename?: 'quest_reward_stddev_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "quest_reward" */
export type Quest_Reward_Stddev_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quest_Reward_Stddev_Pop_Fields = {
  __typename?: 'quest_reward_stddev_pop_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "quest_reward" */
export type Quest_Reward_Stddev_Pop_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quest_Reward_Stddev_Samp_Fields = {
  __typename?: 'quest_reward_stddev_samp_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "quest_reward" */
export type Quest_Reward_Stddev_Samp_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "quest_reward" */
export type Quest_Reward_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Quest_Reward_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Quest_Reward_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  npc_unlock_id?: InputMaybe<Scalars['uuid']>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  resource_accrual_amount?: InputMaybe<Scalars['Int']>;
  resource_accrual_type_id?: InputMaybe<Scalars['uuid']>;
  resource_unlock_id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Quest_Reward_Type_Enum>;
};

/** aggregate sum on columns */
export type Quest_Reward_Sum_Fields = {
  __typename?: 'quest_reward_sum_fields';
  resource_accrual_amount?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "quest_reward" */
export type Quest_Reward_Sum_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "quest_reward_type" */
export type Quest_Reward_Type = {
  __typename?: 'quest_reward_type';
  description: Scalars['String'];
  value: Scalars['String'];
};

/** aggregated selection of "quest_reward_type" */
export type Quest_Reward_Type_Aggregate = {
  __typename?: 'quest_reward_type_aggregate';
  aggregate?: Maybe<Quest_Reward_Type_Aggregate_Fields>;
  nodes: Array<Quest_Reward_Type>;
};

/** aggregate fields of "quest_reward_type" */
export type Quest_Reward_Type_Aggregate_Fields = {
  __typename?: 'quest_reward_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Quest_Reward_Type_Max_Fields>;
  min?: Maybe<Quest_Reward_Type_Min_Fields>;
};


/** aggregate fields of "quest_reward_type" */
export type Quest_Reward_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "quest_reward_type". All fields are combined with a logical 'AND'. */
export type Quest_Reward_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Quest_Reward_Type_Bool_Exp>>;
  _not?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Quest_Reward_Type_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_reward_type" */
export enum Quest_Reward_Type_Constraint {
  /** unique or primary key constraint on columns "value" */
  QuestRewardTypePkey = 'quest_reward_type_pkey'
}

export enum Quest_Reward_Type_Enum {
  /** A quest reward that unlocks a specific NPC for the player's empire. */
  NpcUnlock = 'npc_unlock',
  /** A quest reward that gives the player an amount of a specific resource. */
  ResourceAccrual = 'resource_accrual',
  /** A quest reward that unlocks a specific resource type for the player's empire. */
  ResourceUnlock = 'resource_unlock'
}

/** Boolean expression to compare columns of type "quest_reward_type_enum". All fields are combined with logical 'AND'. */
export type Quest_Reward_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Quest_Reward_Type_Enum>;
  _in?: InputMaybe<Array<Quest_Reward_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Quest_Reward_Type_Enum>;
  _nin?: InputMaybe<Array<Quest_Reward_Type_Enum>>;
};

/** input type for inserting data into table "quest_reward_type" */
export type Quest_Reward_Type_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Quest_Reward_Type_Max_Fields = {
  __typename?: 'quest_reward_type_max_fields';
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Quest_Reward_Type_Min_Fields = {
  __typename?: 'quest_reward_type_min_fields';
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "quest_reward_type" */
export type Quest_Reward_Type_Mutation_Response = {
  __typename?: 'quest_reward_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Quest_Reward_Type>;
};

/** on_conflict condition type for table "quest_reward_type" */
export type Quest_Reward_Type_On_Conflict = {
  constraint: Quest_Reward_Type_Constraint;
  update_columns?: Array<Quest_Reward_Type_Update_Column>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "quest_reward_type". */
export type Quest_Reward_Type_Order_By = {
  description?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: quest_reward_type */
export type Quest_Reward_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "quest_reward_type" */
export enum Quest_Reward_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "quest_reward_type" */
export type Quest_Reward_Type_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "quest_reward_type" */
export type Quest_Reward_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Quest_Reward_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Quest_Reward_Type_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "quest_reward_type" */
export enum Quest_Reward_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type Quest_Reward_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Quest_Reward_Type_Set_Input>;
  where: Quest_Reward_Type_Bool_Exp;
};

/** update columns of table "quest_reward" */
export enum Quest_Reward_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  NpcUnlockId = 'npc_unlock_id',
  /** column name */
  QuestId = 'quest_id',
  /** column name */
  ResourceAccrualAmount = 'resource_accrual_amount',
  /** column name */
  ResourceAccrualTypeId = 'resource_accrual_type_id',
  /** column name */
  ResourceUnlockId = 'resource_unlock_id',
  /** column name */
  Type = 'type'
}

export type Quest_Reward_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Quest_Reward_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Quest_Reward_Set_Input>;
  where: Quest_Reward_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Quest_Reward_Var_Pop_Fields = {
  __typename?: 'quest_reward_var_pop_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "quest_reward" */
export type Quest_Reward_Var_Pop_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quest_Reward_Var_Samp_Fields = {
  __typename?: 'quest_reward_var_samp_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "quest_reward" */
export type Quest_Reward_Var_Samp_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quest_Reward_Variance_Fields = {
  __typename?: 'quest_reward_variance_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "quest_reward" */
export type Quest_Reward_Variance_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** select columns of table "quest" */
export enum Quest_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Initial = 'initial',
  /** column name */
  Name = 'name',
  /** column name */
  NextQuestInChain = 'next_quest_in_chain',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "quest" */
export type Quest_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  initial?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  next_quest_in_chain?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Quest_Type_Enum>;
};

/** columns and relationships of "quest_step" */
export type Quest_Step = {
  __typename?: 'quest_step';
  description: Scalars['String'];
  id: Scalars['uuid'];
  initial: Scalars['Boolean'];
  next_step_in_quest?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  npc?: Maybe<Npc>;
  npc_contact_id?: Maybe<Scalars['uuid']>;
  quest_id: Scalars['uuid'];
  resource_cost_amount?: Maybe<Scalars['Int']>;
  resource_cost_id?: Maybe<Scalars['uuid']>;
  type: Quest_Step_Type_Enum;
};

/** aggregated selection of "quest_step" */
export type Quest_Step_Aggregate = {
  __typename?: 'quest_step_aggregate';
  aggregate?: Maybe<Quest_Step_Aggregate_Fields>;
  nodes: Array<Quest_Step>;
};

/** aggregate fields of "quest_step" */
export type Quest_Step_Aggregate_Fields = {
  __typename?: 'quest_step_aggregate_fields';
  avg?: Maybe<Quest_Step_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Quest_Step_Max_Fields>;
  min?: Maybe<Quest_Step_Min_Fields>;
  stddev?: Maybe<Quest_Step_Stddev_Fields>;
  stddev_pop?: Maybe<Quest_Step_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Quest_Step_Stddev_Samp_Fields>;
  sum?: Maybe<Quest_Step_Sum_Fields>;
  var_pop?: Maybe<Quest_Step_Var_Pop_Fields>;
  var_samp?: Maybe<Quest_Step_Var_Samp_Fields>;
  variance?: Maybe<Quest_Step_Variance_Fields>;
};


/** aggregate fields of "quest_step" */
export type Quest_Step_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Step_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest_step" */
export type Quest_Step_Aggregate_Order_By = {
  avg?: InputMaybe<Quest_Step_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quest_Step_Max_Order_By>;
  min?: InputMaybe<Quest_Step_Min_Order_By>;
  stddev?: InputMaybe<Quest_Step_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Quest_Step_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Quest_Step_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Quest_Step_Sum_Order_By>;
  var_pop?: InputMaybe<Quest_Step_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Quest_Step_Var_Samp_Order_By>;
  variance?: InputMaybe<Quest_Step_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "quest_step" */
export type Quest_Step_Arr_Rel_Insert_Input = {
  data: Array<Quest_Step_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Quest_Step_On_Conflict>;
};

/** aggregate avg on columns */
export type Quest_Step_Avg_Fields = {
  __typename?: 'quest_step_avg_fields';
  resource_cost_amount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "quest_step" */
export type Quest_Step_Avg_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "quest_step". All fields are combined with a logical 'AND'. */
export type Quest_Step_Bool_Exp = {
  _and?: InputMaybe<Array<Quest_Step_Bool_Exp>>;
  _not?: InputMaybe<Quest_Step_Bool_Exp>;
  _or?: InputMaybe<Array<Quest_Step_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  initial?: InputMaybe<Boolean_Comparison_Exp>;
  next_step_in_quest?: InputMaybe<Uuid_Comparison_Exp>;
  npc?: InputMaybe<Npc_Bool_Exp>;
  npc_contact_id?: InputMaybe<Uuid_Comparison_Exp>;
  quest_id?: InputMaybe<Uuid_Comparison_Exp>;
  resource_cost_amount?: InputMaybe<Int_Comparison_Exp>;
  resource_cost_id?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<Quest_Step_Type_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_step" */
export enum Quest_Step_Constraint {
  /** unique or primary key constraint on columns "id" */
  QuestStepPkey = 'quest_step_pkey'
}

/** input type for incrementing numeric columns in table "quest_step" */
export type Quest_Step_Inc_Input = {
  resource_cost_amount?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "quest_step" */
export type Quest_Step_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  initial?: InputMaybe<Scalars['Boolean']>;
  next_step_in_quest?: InputMaybe<Scalars['uuid']>;
  npc?: InputMaybe<Npc_Obj_Rel_Insert_Input>;
  npc_contact_id?: InputMaybe<Scalars['uuid']>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  resource_cost_amount?: InputMaybe<Scalars['Int']>;
  resource_cost_id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Quest_Step_Type_Enum>;
};

/** aggregate max on columns */
export type Quest_Step_Max_Fields = {
  __typename?: 'quest_step_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  next_step_in_quest?: Maybe<Scalars['uuid']>;
  npc_contact_id?: Maybe<Scalars['uuid']>;
  quest_id?: Maybe<Scalars['uuid']>;
  resource_cost_amount?: Maybe<Scalars['Int']>;
  resource_cost_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "quest_step" */
export type Quest_Step_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_step_in_quest?: InputMaybe<Order_By>;
  npc_contact_id?: InputMaybe<Order_By>;
  quest_id?: InputMaybe<Order_By>;
  resource_cost_amount?: InputMaybe<Order_By>;
  resource_cost_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Step_Min_Fields = {
  __typename?: 'quest_step_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  next_step_in_quest?: Maybe<Scalars['uuid']>;
  npc_contact_id?: Maybe<Scalars['uuid']>;
  quest_id?: Maybe<Scalars['uuid']>;
  resource_cost_amount?: Maybe<Scalars['Int']>;
  resource_cost_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "quest_step" */
export type Quest_Step_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  next_step_in_quest?: InputMaybe<Order_By>;
  npc_contact_id?: InputMaybe<Order_By>;
  quest_id?: InputMaybe<Order_By>;
  resource_cost_amount?: InputMaybe<Order_By>;
  resource_cost_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest_step" */
export type Quest_Step_Mutation_Response = {
  __typename?: 'quest_step_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Quest_Step>;
};

/** on_conflict condition type for table "quest_step" */
export type Quest_Step_On_Conflict = {
  constraint: Quest_Step_Constraint;
  update_columns?: Array<Quest_Step_Update_Column>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};

/** Ordering options when selecting data from "quest_step". */
export type Quest_Step_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  initial?: InputMaybe<Order_By>;
  next_step_in_quest?: InputMaybe<Order_By>;
  npc?: InputMaybe<Npc_Order_By>;
  npc_contact_id?: InputMaybe<Order_By>;
  quest_id?: InputMaybe<Order_By>;
  resource_cost_amount?: InputMaybe<Order_By>;
  resource_cost_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: quest_step */
export type Quest_Step_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "quest_step" */
export enum Quest_Step_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Initial = 'initial',
  /** column name */
  NextStepInQuest = 'next_step_in_quest',
  /** column name */
  NpcContactId = 'npc_contact_id',
  /** column name */
  QuestId = 'quest_id',
  /** column name */
  ResourceCostAmount = 'resource_cost_amount',
  /** column name */
  ResourceCostId = 'resource_cost_id',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "quest_step" */
export type Quest_Step_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  initial?: InputMaybe<Scalars['Boolean']>;
  next_step_in_quest?: InputMaybe<Scalars['uuid']>;
  npc_contact_id?: InputMaybe<Scalars['uuid']>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  resource_cost_amount?: InputMaybe<Scalars['Int']>;
  resource_cost_id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Quest_Step_Type_Enum>;
};

/** aggregate stddev on columns */
export type Quest_Step_Stddev_Fields = {
  __typename?: 'quest_step_stddev_fields';
  resource_cost_amount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "quest_step" */
export type Quest_Step_Stddev_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quest_Step_Stddev_Pop_Fields = {
  __typename?: 'quest_step_stddev_pop_fields';
  resource_cost_amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "quest_step" */
export type Quest_Step_Stddev_Pop_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quest_Step_Stddev_Samp_Fields = {
  __typename?: 'quest_step_stddev_samp_fields';
  resource_cost_amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "quest_step" */
export type Quest_Step_Stddev_Samp_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "quest_step" */
export type Quest_Step_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Quest_Step_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Quest_Step_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  initial?: InputMaybe<Scalars['Boolean']>;
  next_step_in_quest?: InputMaybe<Scalars['uuid']>;
  npc_contact_id?: InputMaybe<Scalars['uuid']>;
  quest_id?: InputMaybe<Scalars['uuid']>;
  resource_cost_amount?: InputMaybe<Scalars['Int']>;
  resource_cost_id?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Quest_Step_Type_Enum>;
};

/** aggregate sum on columns */
export type Quest_Step_Sum_Fields = {
  __typename?: 'quest_step_sum_fields';
  resource_cost_amount?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "quest_step" */
export type Quest_Step_Sum_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "quest_step_type" */
export type Quest_Step_Type = {
  __typename?: 'quest_step_type';
  description: Scalars['String'];
  value: Scalars['String'];
};

/** aggregated selection of "quest_step_type" */
export type Quest_Step_Type_Aggregate = {
  __typename?: 'quest_step_type_aggregate';
  aggregate?: Maybe<Quest_Step_Type_Aggregate_Fields>;
  nodes: Array<Quest_Step_Type>;
};

/** aggregate fields of "quest_step_type" */
export type Quest_Step_Type_Aggregate_Fields = {
  __typename?: 'quest_step_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Quest_Step_Type_Max_Fields>;
  min?: Maybe<Quest_Step_Type_Min_Fields>;
};


/** aggregate fields of "quest_step_type" */
export type Quest_Step_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "quest_step_type". All fields are combined with a logical 'AND'. */
export type Quest_Step_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Quest_Step_Type_Bool_Exp>>;
  _not?: InputMaybe<Quest_Step_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Quest_Step_Type_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_step_type" */
export enum Quest_Step_Type_Constraint {
  /** unique or primary key constraint on columns "value" */
  QuestStepTypePkey = 'quest_step_type_pkey'
}

export enum Quest_Step_Type_Enum {
  /** An arbitrary user-action like opening a modal or clicking an accept button. */
  Cta = 'cta',
  /** A quest step requiring completing dialog with a given npc. */
  NpcContact = 'npc_contact',
  /** A quest step requiring payment of resources. */
  ResourceCost = 'resource_cost'
}

/** Boolean expression to compare columns of type "quest_step_type_enum". All fields are combined with logical 'AND'. */
export type Quest_Step_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Quest_Step_Type_Enum>;
  _in?: InputMaybe<Array<Quest_Step_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Quest_Step_Type_Enum>;
  _nin?: InputMaybe<Array<Quest_Step_Type_Enum>>;
};

/** input type for inserting data into table "quest_step_type" */
export type Quest_Step_Type_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Quest_Step_Type_Max_Fields = {
  __typename?: 'quest_step_type_max_fields';
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Quest_Step_Type_Min_Fields = {
  __typename?: 'quest_step_type_min_fields';
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "quest_step_type" */
export type Quest_Step_Type_Mutation_Response = {
  __typename?: 'quest_step_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Quest_Step_Type>;
};

/** on_conflict condition type for table "quest_step_type" */
export type Quest_Step_Type_On_Conflict = {
  constraint: Quest_Step_Type_Constraint;
  update_columns?: Array<Quest_Step_Type_Update_Column>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "quest_step_type". */
export type Quest_Step_Type_Order_By = {
  description?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: quest_step_type */
export type Quest_Step_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "quest_step_type" */
export enum Quest_Step_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "quest_step_type" */
export type Quest_Step_Type_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "quest_step_type" */
export type Quest_Step_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Quest_Step_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Quest_Step_Type_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "quest_step_type" */
export enum Quest_Step_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value'
}

export type Quest_Step_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Quest_Step_Type_Set_Input>;
  where: Quest_Step_Type_Bool_Exp;
};

/** update columns of table "quest_step" */
export enum Quest_Step_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Initial = 'initial',
  /** column name */
  NextStepInQuest = 'next_step_in_quest',
  /** column name */
  NpcContactId = 'npc_contact_id',
  /** column name */
  QuestId = 'quest_id',
  /** column name */
  ResourceCostAmount = 'resource_cost_amount',
  /** column name */
  ResourceCostId = 'resource_cost_id',
  /** column name */
  Type = 'type'
}

export type Quest_Step_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Quest_Step_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Quest_Step_Set_Input>;
  where: Quest_Step_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Quest_Step_Var_Pop_Fields = {
  __typename?: 'quest_step_var_pop_fields';
  resource_cost_amount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "quest_step" */
export type Quest_Step_Var_Pop_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quest_Step_Var_Samp_Fields = {
  __typename?: 'quest_step_var_samp_fields';
  resource_cost_amount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "quest_step" */
export type Quest_Step_Var_Samp_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quest_Step_Variance_Fields = {
  __typename?: 'quest_step_variance_fields';
  resource_cost_amount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "quest_step" */
export type Quest_Step_Variance_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "quest" */
export type Quest_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Quest_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Quest_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  initial?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  next_quest_in_chain?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<Quest_Type_Enum>;
};

/** columns and relationships of "quest_type" */
export type Quest_Type = {
  __typename?: 'quest_type';
  value: Scalars['String'];
};

/** aggregated selection of "quest_type" */
export type Quest_Type_Aggregate = {
  __typename?: 'quest_type_aggregate';
  aggregate?: Maybe<Quest_Type_Aggregate_Fields>;
  nodes: Array<Quest_Type>;
};

/** aggregate fields of "quest_type" */
export type Quest_Type_Aggregate_Fields = {
  __typename?: 'quest_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Quest_Type_Max_Fields>;
  min?: Maybe<Quest_Type_Min_Fields>;
};


/** aggregate fields of "quest_type" */
export type Quest_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "quest_type". All fields are combined with a logical 'AND'. */
export type Quest_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Quest_Type_Bool_Exp>>;
  _not?: InputMaybe<Quest_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Quest_Type_Bool_Exp>>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_type" */
export enum Quest_Type_Constraint {
  /** unique or primary key constraint on columns "value" */
  QuestTypePkey = 'quest_type_pkey'
}

export enum Quest_Type_Enum {
  Main = 'main',
  Race = 'race',
  Side = 'side'
}

/** Boolean expression to compare columns of type "quest_type_enum". All fields are combined with logical 'AND'. */
export type Quest_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Quest_Type_Enum>;
  _in?: InputMaybe<Array<Quest_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Quest_Type_Enum>;
  _nin?: InputMaybe<Array<Quest_Type_Enum>>;
};

/** input type for inserting data into table "quest_type" */
export type Quest_Type_Insert_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Quest_Type_Max_Fields = {
  __typename?: 'quest_type_max_fields';
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Quest_Type_Min_Fields = {
  __typename?: 'quest_type_min_fields';
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "quest_type" */
export type Quest_Type_Mutation_Response = {
  __typename?: 'quest_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Quest_Type>;
};

/** input type for inserting object relation for remote table "quest_type" */
export type Quest_Type_Obj_Rel_Insert_Input = {
  data: Quest_Type_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Quest_Type_On_Conflict>;
};

/** on_conflict condition type for table "quest_type" */
export type Quest_Type_On_Conflict = {
  constraint: Quest_Type_Constraint;
  update_columns?: Array<Quest_Type_Update_Column>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "quest_type". */
export type Quest_Type_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: quest_type */
export type Quest_Type_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "quest_type" */
export enum Quest_Type_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "quest_type" */
export type Quest_Type_Set_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "quest_type" */
export type Quest_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Quest_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Quest_Type_Stream_Cursor_Value_Input = {
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "quest_type" */
export enum Quest_Type_Update_Column {
  /** column name */
  Value = 'value'
}

export type Quest_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Quest_Type_Set_Input>;
  where: Quest_Type_Bool_Exp;
};

/** update columns of table "quest" */
export enum Quest_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Initial = 'initial',
  /** column name */
  Name = 'name',
  /** column name */
  NextQuestInChain = 'next_quest_in_chain',
  /** column name */
  Type = 'type'
}

export type Quest_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Quest_Set_Input>;
  where: Quest_Bool_Exp;
};

/** columns and relationships of "resource_generator" */
export type Resource_Generator = {
  __typename?: 'resource_generator';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  galactic_empire: Galactic_Empire;
  galactic_empire_id: Scalars['uuid'];
  generator_type_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  resource_generator_type: Resource_Generator_Type;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "resource_generator" */
export type Resource_Generator_Aggregate = {
  __typename?: 'resource_generator_aggregate';
  aggregate?: Maybe<Resource_Generator_Aggregate_Fields>;
  nodes: Array<Resource_Generator>;
};

/** aggregate fields of "resource_generator" */
export type Resource_Generator_Aggregate_Fields = {
  __typename?: 'resource_generator_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Resource_Generator_Max_Fields>;
  min?: Maybe<Resource_Generator_Min_Fields>;
};


/** aggregate fields of "resource_generator" */
export type Resource_Generator_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "resource_generator". All fields are combined with a logical 'AND'. */
export type Resource_Generator_Bool_Exp = {
  _and?: InputMaybe<Array<Resource_Generator_Bool_Exp>>;
  _not?: InputMaybe<Resource_Generator_Bool_Exp>;
  _or?: InputMaybe<Array<Resource_Generator_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  galactic_empire?: InputMaybe<Galactic_Empire_Bool_Exp>;
  galactic_empire_id?: InputMaybe<Uuid_Comparison_Exp>;
  generator_type_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  resource_generator_type?: InputMaybe<Resource_Generator_Type_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "resource_generator" */
export enum Resource_Generator_Constraint {
  /** unique or primary key constraint on columns "id" */
  ResourceGeneratorPkey = 'resource_generator_pkey'
}

/** input type for inserting data into table "resource_generator" */
export type Resource_Generator_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  generator_type_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  resource_generator_type?: InputMaybe<Resource_Generator_Type_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Resource_Generator_Max_Fields = {
  __typename?: 'resource_generator_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  generator_type_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Resource_Generator_Min_Fields = {
  __typename?: 'resource_generator_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  galactic_empire_id?: Maybe<Scalars['uuid']>;
  generator_type_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "resource_generator" */
export type Resource_Generator_Mutation_Response = {
  __typename?: 'resource_generator_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Resource_Generator>;
};

/** on_conflict condition type for table "resource_generator" */
export type Resource_Generator_On_Conflict = {
  constraint: Resource_Generator_Constraint;
  update_columns?: Array<Resource_Generator_Update_Column>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};

/** Ordering options when selecting data from "resource_generator". */
export type Resource_Generator_Order_By = {
  created_at?: InputMaybe<Order_By>;
  galactic_empire?: InputMaybe<Galactic_Empire_Order_By>;
  galactic_empire_id?: InputMaybe<Order_By>;
  generator_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  resource_generator_type?: InputMaybe<Resource_Generator_Type_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: resource_generator */
export type Resource_Generator_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "resource_generator" */
export enum Resource_Generator_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  GeneratorTypeId = 'generator_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "resource_generator" */
export type Resource_Generator_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  generator_type_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "resource_generator" */
export type Resource_Generator_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Resource_Generator_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Resource_Generator_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']>;
  generator_type_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "resource_generator_type" */
export type Resource_Generator_Type = {
  __typename?: 'resource_generator_type';
  description: Scalars['String'];
  generation_rate: Scalars['_numeric'];
  id: Scalars['uuid'];
  image_url?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** An object relationship */
  resource_type: Resource_Type;
  resource_type_1_id: Scalars['uuid'];
  /** An object relationship */
  resource_type_2?: Maybe<Resource_Type>;
  resource_type_2_id?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "resource_generator_type" */
export type Resource_Generator_Type_Aggregate = {
  __typename?: 'resource_generator_type_aggregate';
  aggregate?: Maybe<Resource_Generator_Type_Aggregate_Fields>;
  nodes: Array<Resource_Generator_Type>;
};

/** aggregate fields of "resource_generator_type" */
export type Resource_Generator_Type_Aggregate_Fields = {
  __typename?: 'resource_generator_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Resource_Generator_Type_Max_Fields>;
  min?: Maybe<Resource_Generator_Type_Min_Fields>;
};


/** aggregate fields of "resource_generator_type" */
export type Resource_Generator_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Resource_Generator_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "resource_generator_type". All fields are combined with a logical 'AND'. */
export type Resource_Generator_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Resource_Generator_Type_Bool_Exp>>;
  _not?: InputMaybe<Resource_Generator_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Resource_Generator_Type_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  generation_rate?: InputMaybe<_Numeric_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  resource_type?: InputMaybe<Resource_Type_Bool_Exp>;
  resource_type_1_id?: InputMaybe<Uuid_Comparison_Exp>;
  resource_type_2?: InputMaybe<Resource_Type_Bool_Exp>;
  resource_type_2_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "resource_generator_type" */
export enum Resource_Generator_Type_Constraint {
  /** unique or primary key constraint on columns "id" */
  ResourceGeneratorTypePkey = 'resource_generator_type_pkey'
}

/** input type for inserting data into table "resource_generator_type" */
export type Resource_Generator_Type_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  generation_rate?: InputMaybe<Scalars['_numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_type?: InputMaybe<Resource_Type_Obj_Rel_Insert_Input>;
  resource_type_1_id?: InputMaybe<Scalars['uuid']>;
  resource_type_2?: InputMaybe<Resource_Type_Obj_Rel_Insert_Input>;
  resource_type_2_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Resource_Generator_Type_Max_Fields = {
  __typename?: 'resource_generator_type_max_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_type_1_id?: Maybe<Scalars['uuid']>;
  resource_type_2_id?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Resource_Generator_Type_Min_Fields = {
  __typename?: 'resource_generator_type_min_fields';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource_type_1_id?: Maybe<Scalars['uuid']>;
  resource_type_2_id?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "resource_generator_type" */
export type Resource_Generator_Type_Mutation_Response = {
  __typename?: 'resource_generator_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Resource_Generator_Type>;
};

/** input type for inserting object relation for remote table "resource_generator_type" */
export type Resource_Generator_Type_Obj_Rel_Insert_Input = {
  data: Resource_Generator_Type_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Resource_Generator_Type_On_Conflict>;
};

/** on_conflict condition type for table "resource_generator_type" */
export type Resource_Generator_Type_On_Conflict = {
  constraint: Resource_Generator_Type_Constraint;
  update_columns?: Array<Resource_Generator_Type_Update_Column>;
  where?: InputMaybe<Resource_Generator_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "resource_generator_type". */
export type Resource_Generator_Type_Order_By = {
  description?: InputMaybe<Order_By>;
  generation_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_type?: InputMaybe<Resource_Type_Order_By>;
  resource_type_1_id?: InputMaybe<Order_By>;
  resource_type_2?: InputMaybe<Resource_Type_Order_By>;
  resource_type_2_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: resource_generator_type */
export type Resource_Generator_Type_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "resource_generator_type" */
export enum Resource_Generator_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  GenerationRate = 'generation_rate',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name',
  /** column name */
  ResourceType_1Id = 'resource_type_1_id',
  /** column name */
  ResourceType_2Id = 'resource_type_2_id'
}

/** input type for updating data in table "resource_generator_type" */
export type Resource_Generator_Type_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  generation_rate?: InputMaybe<Scalars['_numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_type_1_id?: InputMaybe<Scalars['uuid']>;
  resource_type_2_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "resource_generator_type" */
export type Resource_Generator_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Resource_Generator_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Resource_Generator_Type_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  generation_rate?: InputMaybe<Scalars['_numeric']>;
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  resource_type_1_id?: InputMaybe<Scalars['uuid']>;
  resource_type_2_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "resource_generator_type" */
export enum Resource_Generator_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  GenerationRate = 'generation_rate',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name',
  /** column name */
  ResourceType_1Id = 'resource_type_1_id',
  /** column name */
  ResourceType_2Id = 'resource_type_2_id'
}

export type Resource_Generator_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Resource_Generator_Type_Set_Input>;
  where: Resource_Generator_Type_Bool_Exp;
};

/** update columns of table "resource_generator" */
export enum Resource_Generator_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  GeneratorTypeId = 'generator_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Resource_Generator_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Resource_Generator_Set_Input>;
  where: Resource_Generator_Bool_Exp;
};

/** columns and relationships of "resource_type" */
export type Resource_Type = {
  __typename?: 'resource_type';
  id: Scalars['uuid'];
  image_url?: Maybe<Scalars['String']>;
  image_url_pixel?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

/** aggregated selection of "resource_type" */
export type Resource_Type_Aggregate = {
  __typename?: 'resource_type_aggregate';
  aggregate?: Maybe<Resource_Type_Aggregate_Fields>;
  nodes: Array<Resource_Type>;
};

/** aggregate fields of "resource_type" */
export type Resource_Type_Aggregate_Fields = {
  __typename?: 'resource_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Resource_Type_Max_Fields>;
  min?: Maybe<Resource_Type_Min_Fields>;
};


/** aggregate fields of "resource_type" */
export type Resource_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Resource_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "resource_type". All fields are combined with a logical 'AND'. */
export type Resource_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Resource_Type_Bool_Exp>>;
  _not?: InputMaybe<Resource_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Resource_Type_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  image_url_pixel?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "resource_type" */
export enum Resource_Type_Constraint {
  /** unique or primary key constraint on columns "id" */
  ResourceTypesPkey = 'resource_types_pkey',
  /** unique or primary key constraint on columns "type" */
  ResourceTypesTypeKey = 'resource_types_type_key'
}

/** input type for inserting data into table "resource_type" */
export type Resource_Type_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  image_url_pixel?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Resource_Type_Max_Fields = {
  __typename?: 'resource_type_max_fields';
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  image_url_pixel?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Resource_Type_Min_Fields = {
  __typename?: 'resource_type_min_fields';
  id?: Maybe<Scalars['uuid']>;
  image_url?: Maybe<Scalars['String']>;
  image_url_pixel?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "resource_type" */
export type Resource_Type_Mutation_Response = {
  __typename?: 'resource_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Resource_Type>;
};

/** input type for inserting object relation for remote table "resource_type" */
export type Resource_Type_Obj_Rel_Insert_Input = {
  data: Resource_Type_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Resource_Type_On_Conflict>;
};

/** on_conflict condition type for table "resource_type" */
export type Resource_Type_On_Conflict = {
  constraint: Resource_Type_Constraint;
  update_columns?: Array<Resource_Type_Update_Column>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "resource_type". */
export type Resource_Type_Order_By = {
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  image_url_pixel?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: resource_type */
export type Resource_Type_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "resource_type" */
export enum Resource_Type_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  ImageUrlPixel = 'image_url_pixel',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "resource_type" */
export type Resource_Type_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  image_url_pixel?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "resource_type" */
export type Resource_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Resource_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Resource_Type_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  image_url?: InputMaybe<Scalars['String']>;
  image_url_pixel?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** update columns of table "resource_type" */
export enum Resource_Type_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  ImageUrlPixel = 'image_url_pixel',
  /** column name */
  Type = 'type'
}

export type Resource_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Resource_Type_Set_Input>;
  where: Resource_Type_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "background" */
  background: Array<Background>;
  /** fetch aggregated fields from the table: "background" */
  background_aggregate: Background_Aggregate;
  /** fetch data from the table: "background" using primary key columns */
  background_by_pk?: Maybe<Background>;
  /** fetch data from the table in a streaming manner : "background" */
  background_stream: Array<Background>;
  /** fetch data from the table: "celestial" */
  celestial: Array<Celestial>;
  /** fetch aggregated fields from the table: "celestial" */
  celestial_aggregate: Celestial_Aggregate;
  /** fetch data from the table: "celestial" using primary key columns */
  celestial_by_pk?: Maybe<Celestial>;
  /** fetch data from the table in a streaming manner : "celestial" */
  celestial_stream: Array<Celestial>;
  /** fetch data from the table: "chat_message" */
  chat_message: Array<Chat_Message>;
  /** fetch aggregated fields from the table: "chat_message" */
  chat_message_aggregate: Chat_Message_Aggregate;
  /** fetch data from the table: "chat_message" using primary key columns */
  chat_message_by_pk?: Maybe<Chat_Message>;
  /** fetch data from the table in a streaming manner : "chat_message" */
  chat_message_stream: Array<Chat_Message>;
  /** fetch data from the table: "faction" */
  faction: Array<Faction>;
  /** fetch aggregated fields from the table: "faction" */
  faction_aggregate: Faction_Aggregate;
  /** fetch data from the table: "faction" using primary key columns */
  faction_by_pk?: Maybe<Faction>;
  /** fetch data from the table in a streaming manner : "faction" */
  faction_stream: Array<Faction>;
  /** fetch data from the table: "galactic_empire" */
  galactic_empire: Array<Galactic_Empire>;
  /** fetch aggregated fields from the table: "galactic_empire" */
  galactic_empire_aggregate: Galactic_Empire_Aggregate;
  /** fetch data from the table: "galactic_empire" using primary key columns */
  galactic_empire_by_pk?: Maybe<Galactic_Empire>;
  /** fetch data from the table: "galactic_empire_npc" */
  galactic_empire_npc: Array<Galactic_Empire_Npc>;
  /** fetch aggregated fields from the table: "galactic_empire_npc" */
  galactic_empire_npc_aggregate: Galactic_Empire_Npc_Aggregate;
  /** fetch data from the table: "galactic_empire_npc" using primary key columns */
  galactic_empire_npc_by_pk?: Maybe<Galactic_Empire_Npc>;
  /** fetch data from the table in a streaming manner : "galactic_empire_npc" */
  galactic_empire_npc_stream: Array<Galactic_Empire_Npc>;
  /** fetch data from the table: "galactic_empire_quest" */
  galactic_empire_quest: Array<Galactic_Empire_Quest>;
  /** fetch aggregated fields from the table: "galactic_empire_quest" */
  galactic_empire_quest_aggregate: Galactic_Empire_Quest_Aggregate;
  /** fetch data from the table: "galactic_empire_quest" using primary key columns */
  galactic_empire_quest_by_pk?: Maybe<Galactic_Empire_Quest>;
  /** fetch data from the table in a streaming manner : "galactic_empire_quest" */
  galactic_empire_quest_stream: Array<Galactic_Empire_Quest>;
  /** fetch data from the table: "galactic_empire_resources" */
  galactic_empire_resources: Array<Galactic_Empire_Resources>;
  /** fetch aggregated fields from the table: "galactic_empire_resources" */
  galactic_empire_resources_aggregate: Galactic_Empire_Resources_Aggregate;
  /** fetch data from the table: "galactic_empire_resources" using primary key columns */
  galactic_empire_resources_by_pk?: Maybe<Galactic_Empire_Resources>;
  /** fetch data from the table in a streaming manner : "galactic_empire_resources" */
  galactic_empire_resources_stream: Array<Galactic_Empire_Resources>;
  /** fetch data from the table in a streaming manner : "galactic_empire" */
  galactic_empire_stream: Array<Galactic_Empire>;
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch aggregated fields from the table: "galaxy" */
  galaxy_aggregate: Galaxy_Aggregate;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
  /** fetch data from the table in a streaming manner : "galaxy" */
  galaxy_stream: Array<Galaxy>;
  /** fetch data from the table: "npc" */
  npc: Array<Npc>;
  /** fetch aggregated fields from the table: "npc" */
  npc_aggregate: Npc_Aggregate;
  /** fetch data from the table: "npc" using primary key columns */
  npc_by_pk?: Maybe<Npc>;
  /** fetch data from the table in a streaming manner : "npc" */
  npc_stream: Array<Npc>;
  /** fetch data from the table: "planet" */
  planet: Array<Planet>;
  /** fetch aggregated fields from the table: "planet" */
  planet_aggregate: Planet_Aggregate;
  /** fetch data from the table: "planet" using primary key columns */
  planet_by_pk?: Maybe<Planet>;
  /** fetch data from the table in a streaming manner : "planet" */
  planet_stream: Array<Planet>;
  /** fetch data from the table: "planetary_ring" */
  planetary_ring: Array<Planetary_Ring>;
  /** fetch aggregated fields from the table: "planetary_ring" */
  planetary_ring_aggregate: Planetary_Ring_Aggregate;
  /** fetch data from the table: "planetary_ring" using primary key columns */
  planetary_ring_by_pk?: Maybe<Planetary_Ring>;
  /** fetch data from the table in a streaming manner : "planetary_ring" */
  planetary_ring_stream: Array<Planetary_Ring>;
  /** fetch data from the table: "playable_race" */
  playable_race: Array<Playable_Race>;
  /** fetch aggregated fields from the table: "playable_race" */
  playable_race_aggregate: Playable_Race_Aggregate;
  /** fetch data from the table: "playable_race" using primary key columns */
  playable_race_by_pk?: Maybe<Playable_Race>;
  /** fetch data from the table in a streaming manner : "playable_race" */
  playable_race_stream: Array<Playable_Race>;
  /** fetch data from the table: "quest" */
  quest: Array<Quest>;
  /** fetch aggregated fields from the table: "quest" */
  quest_aggregate: Quest_Aggregate;
  /** fetch data from the table: "quest" using primary key columns */
  quest_by_pk?: Maybe<Quest>;
  /** fetch data from the table: "quest_reward" */
  quest_reward: Array<Quest_Reward>;
  /** fetch aggregated fields from the table: "quest_reward" */
  quest_reward_aggregate: Quest_Reward_Aggregate;
  /** fetch data from the table: "quest_reward" using primary key columns */
  quest_reward_by_pk?: Maybe<Quest_Reward>;
  /** fetch data from the table in a streaming manner : "quest_reward" */
  quest_reward_stream: Array<Quest_Reward>;
  /** fetch data from the table: "quest_reward_type" */
  quest_reward_type: Array<Quest_Reward_Type>;
  /** fetch aggregated fields from the table: "quest_reward_type" */
  quest_reward_type_aggregate: Quest_Reward_Type_Aggregate;
  /** fetch data from the table: "quest_reward_type" using primary key columns */
  quest_reward_type_by_pk?: Maybe<Quest_Reward_Type>;
  /** fetch data from the table in a streaming manner : "quest_reward_type" */
  quest_reward_type_stream: Array<Quest_Reward_Type>;
  /** fetch data from the table: "quest_step" */
  quest_step: Array<Quest_Step>;
  /** fetch aggregated fields from the table: "quest_step" */
  quest_step_aggregate: Quest_Step_Aggregate;
  /** fetch data from the table: "quest_step" using primary key columns */
  quest_step_by_pk?: Maybe<Quest_Step>;
  /** fetch data from the table in a streaming manner : "quest_step" */
  quest_step_stream: Array<Quest_Step>;
  /** fetch data from the table: "quest_step_type" */
  quest_step_type: Array<Quest_Step_Type>;
  /** fetch aggregated fields from the table: "quest_step_type" */
  quest_step_type_aggregate: Quest_Step_Type_Aggregate;
  /** fetch data from the table: "quest_step_type" using primary key columns */
  quest_step_type_by_pk?: Maybe<Quest_Step_Type>;
  /** fetch data from the table in a streaming manner : "quest_step_type" */
  quest_step_type_stream: Array<Quest_Step_Type>;
  /** fetch data from the table in a streaming manner : "quest" */
  quest_stream: Array<Quest>;
  /** fetch data from the table: "quest_type" */
  quest_type: Array<Quest_Type>;
  /** fetch aggregated fields from the table: "quest_type" */
  quest_type_aggregate: Quest_Type_Aggregate;
  /** fetch data from the table: "quest_type" using primary key columns */
  quest_type_by_pk?: Maybe<Quest_Type>;
  /** fetch data from the table in a streaming manner : "quest_type" */
  quest_type_stream: Array<Quest_Type>;
  /** fetch data from the table: "resource_generator" */
  resource_generator: Array<Resource_Generator>;
  /** fetch aggregated fields from the table: "resource_generator" */
  resource_generator_aggregate: Resource_Generator_Aggregate;
  /** fetch data from the table: "resource_generator" using primary key columns */
  resource_generator_by_pk?: Maybe<Resource_Generator>;
  /** fetch data from the table in a streaming manner : "resource_generator" */
  resource_generator_stream: Array<Resource_Generator>;
  /** fetch data from the table: "resource_generator_type" */
  resource_generator_type: Array<Resource_Generator_Type>;
  /** fetch aggregated fields from the table: "resource_generator_type" */
  resource_generator_type_aggregate: Resource_Generator_Type_Aggregate;
  /** fetch data from the table: "resource_generator_type" using primary key columns */
  resource_generator_type_by_pk?: Maybe<Resource_Generator_Type>;
  /** fetch data from the table in a streaming manner : "resource_generator_type" */
  resource_generator_type_stream: Array<Resource_Generator_Type>;
  /** fetch data from the table: "resource_type" */
  resource_type: Array<Resource_Type>;
  /** fetch aggregated fields from the table: "resource_type" */
  resource_type_aggregate: Resource_Type_Aggregate;
  /** fetch data from the table: "resource_type" using primary key columns */
  resource_type_by_pk?: Maybe<Resource_Type>;
  /** fetch data from the table in a streaming manner : "resource_type" */
  resource_type_stream: Array<Resource_Type>;
  /** fetch data from the table: "terrain_hex_palette" */
  terrain_hex_palette: Array<Terrain_Hex_Palette>;
  /** fetch aggregated fields from the table: "terrain_hex_palette" */
  terrain_hex_palette_aggregate: Terrain_Hex_Palette_Aggregate;
  /** fetch data from the table: "terrain_hex_palette" using primary key columns */
  terrain_hex_palette_by_pk?: Maybe<Terrain_Hex_Palette>;
  /** fetch data from the table in a streaming manner : "terrain_hex_palette" */
  terrain_hex_palette_stream: Array<Terrain_Hex_Palette>;
  /** fetch data from the table: "user_info" */
  user_info: Array<User_Info>;
  /** fetch aggregated fields from the table: "user_info" */
  user_info_aggregate: User_Info_Aggregate;
  /** fetch data from the table: "user_info" using primary key columns */
  user_info_by_pk?: Maybe<User_Info>;
  /** fetch data from the table in a streaming manner : "user_info" */
  user_info_stream: Array<User_Info>;
  /** fetch data from the table: "user_me" */
  user_me: Array<User_Me>;
  /** fetch aggregated fields from the table: "user_me" */
  user_me_aggregate: User_Me_Aggregate;
  /** fetch data from the table in a streaming manner : "user_me" */
  user_me_stream: Array<User_Me>;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
  /** fetch aggregated fields from the table: "user_private" */
  user_private_aggregate: User_Private_Aggregate;
  /** fetch data from the table in a streaming manner : "user_private" */
  user_private_stream: Array<User_Private>;
};


export type Subscription_RootBackgroundArgs = {
  distinct_on?: InputMaybe<Array<Background_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Background_Order_By>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Subscription_RootBackground_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Background_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Background_Order_By>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Subscription_RootBackground_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBackground_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Background_Stream_Cursor_Input>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Subscription_RootCelestialArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Subscription_RootCelestial_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Subscription_RootCelestial_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootCelestial_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Celestial_Stream_Cursor_Input>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Subscription_RootChat_MessageArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Subscription_RootChat_Message_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Subscription_RootChat_Message_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootChat_Message_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Chat_Message_Stream_Cursor_Input>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Subscription_RootFactionArgs = {
  distinct_on?: InputMaybe<Array<Faction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Faction_Order_By>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Subscription_RootFaction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Faction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Faction_Order_By>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Subscription_RootFaction_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootFaction_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Faction_Stream_Cursor_Input>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Subscription_RootGalactic_EmpireArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGalactic_Empire_NpcArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Npc_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Npc_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGalactic_Empire_Npc_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Galactic_Empire_Npc_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_QuestArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Quest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Quest_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGalactic_Empire_Quest_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Galactic_Empire_Quest_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_ResourcesArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Resources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Resources_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGalactic_Empire_Resources_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Galactic_Empire_Resources_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Galactic_Empire_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Subscription_RootGalaxyArgs = {
  distinct_on?: InputMaybe<Array<Galaxy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galaxy_Order_By>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Subscription_RootGalaxy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galaxy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galaxy_Order_By>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Subscription_RootGalaxy_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGalaxy_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Galaxy_Stream_Cursor_Input>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Subscription_RootNpcArgs = {
  distinct_on?: InputMaybe<Array<Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Npc_Order_By>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Subscription_RootNpc_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Npc_Order_By>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Subscription_RootNpc_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootNpc_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Npc_Stream_Cursor_Input>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Subscription_RootPlanetArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Subscription_RootPlanet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Subscription_RootPlanet_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPlanet_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Planet_Stream_Cursor_Input>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Subscription_RootPlanetary_RingArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Subscription_RootPlanetary_Ring_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Subscription_RootPlanetary_Ring_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPlanetary_Ring_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Planetary_Ring_Stream_Cursor_Input>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Subscription_RootPlayable_RaceArgs = {
  distinct_on?: InputMaybe<Array<Playable_Race_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Playable_Race_Order_By>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Subscription_RootPlayable_Race_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Playable_Race_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Playable_Race_Order_By>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Subscription_RootPlayable_Race_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPlayable_Race_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Playable_Race_Stream_Cursor_Input>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Subscription_RootQuestArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Subscription_RootQuest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Subscription_RootQuest_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootQuest_RewardArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootQuest_Reward_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Quest_Reward_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Type_Order_By>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Reward_Type_Order_By>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootQuest_Reward_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Quest_Reward_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Subscription_RootQuest_StepArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Subscription_RootQuest_Step_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Subscription_RootQuest_Step_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootQuest_Step_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Quest_Step_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Subscription_RootQuest_Step_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Type_Order_By>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Step_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Step_Type_Order_By>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Step_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootQuest_Step_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Quest_Step_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Subscription_RootQuest_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Quest_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Subscription_RootQuest_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Type_Order_By>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Type_Order_By>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Type_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootQuest_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Quest_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Subscription_RootResource_GeneratorArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Generator_Order_By>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Subscription_RootResource_Generator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Generator_Order_By>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Subscription_RootResource_Generator_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootResource_Generator_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Resource_Generator_Stream_Cursor_Input>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Subscription_RootResource_Generator_TypeArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Generator_Type_Order_By>>;
  where?: InputMaybe<Resource_Generator_Type_Bool_Exp>;
};


export type Subscription_RootResource_Generator_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Generator_Type_Order_By>>;
  where?: InputMaybe<Resource_Generator_Type_Bool_Exp>;
};


export type Subscription_RootResource_Generator_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootResource_Generator_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Resource_Generator_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Resource_Generator_Type_Bool_Exp>;
};


export type Subscription_RootResource_TypeArgs = {
  distinct_on?: InputMaybe<Array<Resource_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Type_Order_By>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Subscription_RootResource_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Resource_Type_Order_By>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Subscription_RootResource_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootResource_Type_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Resource_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Subscription_RootTerrain_Hex_PaletteArgs = {
  distinct_on?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Terrain_Hex_Palette_Order_By>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Subscription_RootTerrain_Hex_Palette_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Terrain_Hex_Palette_Order_By>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Subscription_RootTerrain_Hex_Palette_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTerrain_Hex_Palette_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Terrain_Hex_Palette_Stream_Cursor_Input>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Subscription_RootUser_InfoArgs = {
  distinct_on?: InputMaybe<Array<User_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Info_Order_By>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Subscription_RootUser_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Info_Order_By>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Subscription_RootUser_Info_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootUser_Info_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Info_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Subscription_RootUser_MeArgs = {
  distinct_on?: InputMaybe<Array<User_Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Me_Order_By>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Subscription_RootUser_Me_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Me_Order_By>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Subscription_RootUser_Me_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Me_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Subscription_RootUser_PrivateArgs = {
  distinct_on?: InputMaybe<Array<User_Private_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Private_Order_By>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};


export type Subscription_RootUser_Private_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Private_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Private_Order_By>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};


export type Subscription_RootUser_Private_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Private_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};

/** columns and relationships of "terrain_hex_palette" */
export type Terrain_Hex_Palette = {
  __typename?: 'terrain_hex_palette';
  forest: Scalars['String'];
  grass: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  sand: Scalars['String'];
  water: Scalars['String'];
};

/** aggregated selection of "terrain_hex_palette" */
export type Terrain_Hex_Palette_Aggregate = {
  __typename?: 'terrain_hex_palette_aggregate';
  aggregate?: Maybe<Terrain_Hex_Palette_Aggregate_Fields>;
  nodes: Array<Terrain_Hex_Palette>;
};

/** aggregate fields of "terrain_hex_palette" */
export type Terrain_Hex_Palette_Aggregate_Fields = {
  __typename?: 'terrain_hex_palette_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Terrain_Hex_Palette_Max_Fields>;
  min?: Maybe<Terrain_Hex_Palette_Min_Fields>;
};


/** aggregate fields of "terrain_hex_palette" */
export type Terrain_Hex_Palette_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "terrain_hex_palette". All fields are combined with a logical 'AND'. */
export type Terrain_Hex_Palette_Bool_Exp = {
  _and?: InputMaybe<Array<Terrain_Hex_Palette_Bool_Exp>>;
  _not?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
  _or?: InputMaybe<Array<Terrain_Hex_Palette_Bool_Exp>>;
  forest?: InputMaybe<String_Comparison_Exp>;
  grass?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sand?: InputMaybe<String_Comparison_Exp>;
  water?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "terrain_hex_palette" */
export enum Terrain_Hex_Palette_Constraint {
  /** unique or primary key constraint on columns "name" */
  TerrainHexPaletteNameKey = 'terrain_hex_palette_name_key',
  /** unique or primary key constraint on columns "id" */
  TerrainHexPalettePkey = 'terrain_hex_palette_pkey'
}

/** input type for inserting data into table "terrain_hex_palette" */
export type Terrain_Hex_Palette_Insert_Input = {
  forest?: InputMaybe<Scalars['String']>;
  grass?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  sand?: InputMaybe<Scalars['String']>;
  water?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Terrain_Hex_Palette_Max_Fields = {
  __typename?: 'terrain_hex_palette_max_fields';
  forest?: Maybe<Scalars['String']>;
  grass?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  sand?: Maybe<Scalars['String']>;
  water?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Terrain_Hex_Palette_Min_Fields = {
  __typename?: 'terrain_hex_palette_min_fields';
  forest?: Maybe<Scalars['String']>;
  grass?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  sand?: Maybe<Scalars['String']>;
  water?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "terrain_hex_palette" */
export type Terrain_Hex_Palette_Mutation_Response = {
  __typename?: 'terrain_hex_palette_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Terrain_Hex_Palette>;
};

/** input type for inserting object relation for remote table "terrain_hex_palette" */
export type Terrain_Hex_Palette_Obj_Rel_Insert_Input = {
  data: Terrain_Hex_Palette_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Terrain_Hex_Palette_On_Conflict>;
};

/** on_conflict condition type for table "terrain_hex_palette" */
export type Terrain_Hex_Palette_On_Conflict = {
  constraint: Terrain_Hex_Palette_Constraint;
  update_columns?: Array<Terrain_Hex_Palette_Update_Column>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};

/** Ordering options when selecting data from "terrain_hex_palette". */
export type Terrain_Hex_Palette_Order_By = {
  forest?: InputMaybe<Order_By>;
  grass?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sand?: InputMaybe<Order_By>;
  water?: InputMaybe<Order_By>;
};

/** primary key columns input for table: terrain_hex_palette */
export type Terrain_Hex_Palette_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "terrain_hex_palette" */
export enum Terrain_Hex_Palette_Select_Column {
  /** column name */
  Forest = 'forest',
  /** column name */
  Grass = 'grass',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Sand = 'sand',
  /** column name */
  Water = 'water'
}

/** input type for updating data in table "terrain_hex_palette" */
export type Terrain_Hex_Palette_Set_Input = {
  forest?: InputMaybe<Scalars['String']>;
  grass?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  sand?: InputMaybe<Scalars['String']>;
  water?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "terrain_hex_palette" */
export type Terrain_Hex_Palette_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Terrain_Hex_Palette_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Terrain_Hex_Palette_Stream_Cursor_Value_Input = {
  forest?: InputMaybe<Scalars['String']>;
  grass?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  sand?: InputMaybe<Scalars['String']>;
  water?: InputMaybe<Scalars['String']>;
};

/** update columns of table "terrain_hex_palette" */
export enum Terrain_Hex_Palette_Update_Column {
  /** column name */
  Forest = 'forest',
  /** column name */
  Grass = 'grass',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Sand = 'sand',
  /** column name */
  Water = 'water'
}

export type Terrain_Hex_Palette_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Terrain_Hex_Palette_Set_Input>;
  where: Terrain_Hex_Palette_Bool_Exp;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user_info" */
export type User_Info = {
  __typename?: 'user_info';
  avatar_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  celestials: Array<Celestial>;
  /** An aggregate relationship */
  celestials_aggregate: Celestial_Aggregate;
  /** An array relationship */
  chat_messages: Array<Chat_Message>;
  /** An aggregate relationship */
  chat_messages_aggregate: Chat_Message_Aggregate;
  display_name?: Maybe<Scalars['String']>;
  free_claims: Scalars['Int'];
  /** An array relationship */
  galactic_empires: Array<Galactic_Empire>;
  /** An aggregate relationship */
  galactic_empires_aggregate: Galactic_Empire_Aggregate;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
  secret_setting_test?: Maybe<Scalars['String']>;
};


/** columns and relationships of "user_info" */
export type User_InfoCelestialsArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoCelestials_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoChat_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoChat_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoGalactic_EmpiresArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoGalactic_Empires_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};

/** aggregated selection of "user_info" */
export type User_Info_Aggregate = {
  __typename?: 'user_info_aggregate';
  aggregate?: Maybe<User_Info_Aggregate_Fields>;
  nodes: Array<User_Info>;
};

/** aggregate fields of "user_info" */
export type User_Info_Aggregate_Fields = {
  __typename?: 'user_info_aggregate_fields';
  avg?: Maybe<User_Info_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Info_Max_Fields>;
  min?: Maybe<User_Info_Min_Fields>;
  stddev?: Maybe<User_Info_Stddev_Fields>;
  stddev_pop?: Maybe<User_Info_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Info_Stddev_Samp_Fields>;
  sum?: Maybe<User_Info_Sum_Fields>;
  var_pop?: Maybe<User_Info_Var_Pop_Fields>;
  var_samp?: Maybe<User_Info_Var_Samp_Fields>;
  variance?: Maybe<User_Info_Variance_Fields>;
};


/** aggregate fields of "user_info" */
export type User_Info_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Info_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Info_Avg_Fields = {
  __typename?: 'user_info_avg_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_info". All fields are combined with a logical 'AND'. */
export type User_Info_Bool_Exp = {
  _and?: InputMaybe<Array<User_Info_Bool_Exp>>;
  _not?: InputMaybe<User_Info_Bool_Exp>;
  _or?: InputMaybe<Array<User_Info_Bool_Exp>>;
  avatar_url?: InputMaybe<String_Comparison_Exp>;
  celestials?: InputMaybe<Celestial_Bool_Exp>;
  chat_messages?: InputMaybe<Chat_Message_Bool_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  free_claims?: InputMaybe<Int_Comparison_Exp>;
  galactic_empires?: InputMaybe<Galactic_Empire_Bool_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  secret_setting_test?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_info" */
export enum User_Info_Constraint {
  /** unique or primary key constraint on columns "display_name" */
  UserInfoDisplayNameKey = 'user_info_display_name_key',
  /** unique or primary key constraint on columns "id" */
  UserPkey = 'user_pkey'
}

/** input type for incrementing numeric columns in table "user_info" */
export type User_Info_Inc_Input = {
  free_claims?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_info" */
export type User_Info_Insert_Input = {
  avatar_url?: InputMaybe<Scalars['String']>;
  celestials?: InputMaybe<Celestial_Arr_Rel_Insert_Input>;
  chat_messages?: InputMaybe<Chat_Message_Arr_Rel_Insert_Input>;
  display_name?: InputMaybe<Scalars['String']>;
  free_claims?: InputMaybe<Scalars['Int']>;
  galactic_empires?: InputMaybe<Galactic_Empire_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  secret_setting_test?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Info_Max_Fields = {
  __typename?: 'user_info_max_fields';
  avatar_url?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Info_Min_Fields = {
  __typename?: 'user_info_min_fields';
  avatar_url?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_info" */
export type User_Info_Mutation_Response = {
  __typename?: 'user_info_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Info>;
};

/** input type for inserting object relation for remote table "user_info" */
export type User_Info_Obj_Rel_Insert_Input = {
  data: User_Info_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Info_On_Conflict>;
};

/** on_conflict condition type for table "user_info" */
export type User_Info_On_Conflict = {
  constraint: User_Info_Constraint;
  update_columns?: Array<User_Info_Update_Column>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};

/** Ordering options when selecting data from "user_info". */
export type User_Info_Order_By = {
  avatar_url?: InputMaybe<Order_By>;
  celestials_aggregate?: InputMaybe<Celestial_Aggregate_Order_By>;
  chat_messages_aggregate?: InputMaybe<Chat_Message_Aggregate_Order_By>;
  display_name?: InputMaybe<Order_By>;
  free_claims?: InputMaybe<Order_By>;
  galactic_empires_aggregate?: InputMaybe<Galactic_Empire_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  secret_setting_test?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_info */
export type User_Info_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "user_info" */
export enum User_Info_Select_Column {
  /** column name */
  AvatarUrl = 'avatar_url',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  FreeClaims = 'free_claims',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  SecretSettingTest = 'secret_setting_test'
}

/** input type for updating data in table "user_info" */
export type User_Info_Set_Input = {
  avatar_url?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  free_claims?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  secret_setting_test?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Info_Stddev_Fields = {
  __typename?: 'user_info_stddev_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Info_Stddev_Pop_Fields = {
  __typename?: 'user_info_stddev_pop_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Info_Stddev_Samp_Fields = {
  __typename?: 'user_info_stddev_samp_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "user_info" */
export type User_Info_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Info_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Info_Stream_Cursor_Value_Input = {
  avatar_url?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  free_claims?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  secret_setting_test?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type User_Info_Sum_Fields = {
  __typename?: 'user_info_sum_fields';
  free_claims?: Maybe<Scalars['Int']>;
};

/** update columns of table "user_info" */
export enum User_Info_Update_Column {
  /** column name */
  AvatarUrl = 'avatar_url',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  FreeClaims = 'free_claims',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  SecretSettingTest = 'secret_setting_test'
}

export type User_Info_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Info_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Info_Set_Input>;
  where: User_Info_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Info_Var_Pop_Fields = {
  __typename?: 'user_info_var_pop_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Info_Var_Samp_Fields = {
  __typename?: 'user_info_var_samp_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Info_Variance_Fields = {
  __typename?: 'user_info_variance_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "user_me" */
export type User_Me = {
  __typename?: 'user_me';
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
};

/** aggregated selection of "user_me" */
export type User_Me_Aggregate = {
  __typename?: 'user_me_aggregate';
  aggregate?: Maybe<User_Me_Aggregate_Fields>;
  nodes: Array<User_Me>;
};

/** aggregate fields of "user_me" */
export type User_Me_Aggregate_Fields = {
  __typename?: 'user_me_aggregate_fields';
  avg?: Maybe<User_Me_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Me_Max_Fields>;
  min?: Maybe<User_Me_Min_Fields>;
  stddev?: Maybe<User_Me_Stddev_Fields>;
  stddev_pop?: Maybe<User_Me_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Me_Stddev_Samp_Fields>;
  sum?: Maybe<User_Me_Sum_Fields>;
  var_pop?: Maybe<User_Me_Var_Pop_Fields>;
  var_samp?: Maybe<User_Me_Var_Samp_Fields>;
  variance?: Maybe<User_Me_Variance_Fields>;
};


/** aggregate fields of "user_me" */
export type User_Me_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Me_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Me_Avg_Fields = {
  __typename?: 'user_me_avg_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_me". All fields are combined with a logical 'AND'. */
export type User_Me_Bool_Exp = {
  _and?: InputMaybe<Array<User_Me_Bool_Exp>>;
  _not?: InputMaybe<User_Me_Bool_Exp>;
  _or?: InputMaybe<Array<User_Me_Bool_Exp>>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  free_claims?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  secret_setting_test?: InputMaybe<String_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "user_me" */
export type User_Me_Inc_Input = {
  free_claims?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_me" */
export type User_Me_Insert_Input = {
  display_name?: InputMaybe<Scalars['String']>;
  free_claims?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  secret_setting_test?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Me_Max_Fields = {
  __typename?: 'user_me_max_fields';
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Me_Min_Fields = {
  __typename?: 'user_me_min_fields';
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_me" */
export type User_Me_Mutation_Response = {
  __typename?: 'user_me_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Me>;
};

/** Ordering options when selecting data from "user_me". */
export type User_Me_Order_By = {
  display_name?: InputMaybe<Order_By>;
  free_claims?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
  secret_setting_test?: InputMaybe<Order_By>;
};

/** select columns of table "user_me" */
export enum User_Me_Select_Column {
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  FreeClaims = 'free_claims',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  SecretSettingTest = 'secret_setting_test'
}

/** input type for updating data in table "user_me" */
export type User_Me_Set_Input = {
  display_name?: InputMaybe<Scalars['String']>;
  free_claims?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  secret_setting_test?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Me_Stddev_Fields = {
  __typename?: 'user_me_stddev_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Me_Stddev_Pop_Fields = {
  __typename?: 'user_me_stddev_pop_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Me_Stddev_Samp_Fields = {
  __typename?: 'user_me_stddev_samp_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "user_me" */
export type User_Me_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Me_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Me_Stream_Cursor_Value_Input = {
  display_name?: InputMaybe<Scalars['String']>;
  free_claims?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  secret_setting_test?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type User_Me_Sum_Fields = {
  __typename?: 'user_me_sum_fields';
  free_claims?: Maybe<Scalars['Int']>;
};

export type User_Me_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Me_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Me_Set_Input>;
  where: User_Me_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Me_Var_Pop_Fields = {
  __typename?: 'user_me_var_pop_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Me_Var_Samp_Fields = {
  __typename?: 'user_me_var_samp_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Me_Variance_Fields = {
  __typename?: 'user_me_variance_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "user_private" */
export type User_Private = {
  __typename?: 'user_private';
  secret_setting_test?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "user_private" */
export type User_Private_Aggregate = {
  __typename?: 'user_private_aggregate';
  aggregate?: Maybe<User_Private_Aggregate_Fields>;
  nodes: Array<User_Private>;
};

/** aggregate fields of "user_private" */
export type User_Private_Aggregate_Fields = {
  __typename?: 'user_private_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Private_Max_Fields>;
  min?: Maybe<User_Private_Min_Fields>;
};


/** aggregate fields of "user_private" */
export type User_Private_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Private_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user_private". All fields are combined with a logical 'AND'. */
export type User_Private_Bool_Exp = {
  _and?: InputMaybe<Array<User_Private_Bool_Exp>>;
  _not?: InputMaybe<User_Private_Bool_Exp>;
  _or?: InputMaybe<Array<User_Private_Bool_Exp>>;
  secret_setting_test?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "user_private" */
export type User_Private_Insert_Input = {
  secret_setting_test?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Private_Max_Fields = {
  __typename?: 'user_private_max_fields';
  secret_setting_test?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Private_Min_Fields = {
  __typename?: 'user_private_min_fields';
  secret_setting_test?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
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
  secret_setting_test?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
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
  secret_setting_test?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "user_private" */
export type User_Private_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Private_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Private_Stream_Cursor_Value_Input = {
  secret_setting_test?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
};

export type User_Private_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Private_Set_Input>;
  where: User_Private_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type CelestialFieldsFragment = { __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null };

export type GalacticEmpireFieldsFragment = { __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> };

export type GalaxyFieldsFragment = { __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> };

export type CelestialByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CelestialByIdQuery = { __typename?: 'query_root', celestial_by_pk?: { __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, id: string, avatar_url?: string | null } | null, planets: Array<{ __typename?: 'planet', id: string, name: string, radius: number, terrain_bias: number[], texture_resolution: number, atmospheric_distance: number, rings: Array<{ __typename?: 'planetary_ring', id: string, type: string, colors: string[] }>, terrain_hex_palette: { __typename?: 'terrain_hex_palette', forest: string, grass: string, name: string, sand: string, water: string } }>, galactic_empire?: { __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> } | null } | null };

export type CelestialsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CelestialsSubscription = { __typename?: 'subscription_root', celestial: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> };

export type CelestialsByGalaxyIdSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type CelestialsByGalaxyIdSubscription = { __typename?: 'subscription_root', galaxy_by_pk?: { __typename?: 'galaxy', celestials: Array<{ __typename?: 'celestial', name?: string | null, id: string, owner_id?: string | null }>, celestials_aggregate: { __typename?: 'celestial_aggregate', nodes: Array<{ __typename?: 'celestial', owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, avatar_url?: string | null } | null }> } } | null };

export type CreateEmpireOriginCelestialMutationVariables = Exact<{
  galaxy_id: Scalars['String'];
  galacticEmpireId: Scalars['String'];
}>;


export type CreateEmpireOriginCelestialMutation = { __typename?: 'mutation_root', createEmpireOriginCelestial?: { __typename?: 'GalaxyManagement', insertedCelestialId: string, insertedCelestialName: string } | null };

export type TryInsertClaimedCelestialMutationVariables = Exact<{
  galaxy_id: Scalars['uuid'];
  galactic_empire_id: Scalars['uuid'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner_id: Scalars['String'];
}>;


export type TryInsertClaimedCelestialMutation = { __typename?: 'mutation_root', insert_celestial_one?: { __typename?: 'celestial', galaxy_id: string, id: string, name?: string | null, owner_id?: string | null, galactic_empire_id?: string | null } | null };

export type CharacterDataQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterDataQuery = { __typename?: 'query_root', playable_race: Array<{ __typename?: 'playable_race', id: string, name: string, description: string, image_url?: string | null }>, faction: Array<{ __typename?: 'faction', id: string, name: string, description: string, image_url?: string | null }>, background: Array<{ __typename?: 'background', id: string, name: string, description: string, image_url?: string | null }> };

export type GetChatMessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetChatMessagesSubscription = { __typename?: 'subscription_root', chat_message: Array<{ __typename?: 'chat_message', timestamp: string, id: string, message: string, poster_id: string, user_info: { __typename?: 'user_info', nickname: string, id: string, display_name?: string | null } }> };

export type LatestMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LatestMessageSubscription = { __typename?: 'subscription_root', chat_message: Array<{ __typename?: 'chat_message', id: string, message: string }> };

export type SendNewMessageMutationVariables = Exact<{
  message?: InputMaybe<Scalars['String']>;
}>;


export type SendNewMessageMutation = { __typename?: 'mutation_root', insert_chat_message_one?: { __typename?: 'chat_message', message: string } | null };

export type CreateGalacticEmpireMutationVariables = Exact<{
  input: Galactic_Empire_Insert_Input;
}>;


export type CreateGalacticEmpireMutation = { __typename?: 'mutation_root', insert_galactic_empire_one?: { __typename?: 'galactic_empire', id: string } | null };

export type GalacticEmpiresByGalaxyIdQueryVariables = Exact<{
  galaxyId: Scalars['uuid'];
}>;


export type GalacticEmpiresByGalaxyIdQuery = { __typename?: 'query_root', galactic_empire: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }> };

export type GalacticEmpiresByUserIdSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GalacticEmpiresByUserIdSubscription = { __typename?: 'subscription_root', galactic_empire: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }> };

export type IncrementGalacticEmpireResourcesMutationVariables = Exact<{
  galacticEmpireId: Scalars['uuid'];
  galacticCreditsIncrement: Scalars['Int'];
  commonMetalsIncrement: Scalars['Int'];
  rareMetalsIncrement: Scalars['Int'];
  hydrocarbonsIncrement: Scalars['Int'];
  voidMatterIncrement: Scalars['Int'];
}>;


export type IncrementGalacticEmpireResourcesMutation = { __typename?: 'mutation_root', common_metals?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null, galactic_credits?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null, hydrocarbons?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null, rare_metals?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null, void_matter?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null };

export type IncrementResourceMutationVariables = Exact<{
  galacticEmpireId: Scalars['uuid'];
  resourceType: Scalars['String'];
  increment: Scalars['Int'];
}>;


export type IncrementResourceMutation = { __typename?: 'mutation_root', update_galactic_empire_resources?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null };

export type GalacticEmpireNpcsSubscriptionVariables = Exact<{
  empireId: Scalars['uuid'];
}>;


export type GalacticEmpireNpcsSubscription = { __typename?: 'subscription_root', galactic_empire_npc: Array<{ __typename?: 'galactic_empire_npc', npc: { __typename?: 'npc', id: string, name: string, image_url: string, playable_race?: { __typename?: 'playable_race', name: string, id: string } | null, faction?: { __typename?: 'faction', name: string, id: string } | null } }> };

export type UnlockGalacticEmpireNpcMutationVariables = Exact<{
  empireId: Scalars['uuid'];
  npcId: Scalars['uuid'];
}>;


export type UnlockGalacticEmpireNpcMutation = { __typename?: 'mutation_root', insert_galactic_empire_npc_one?: { __typename?: 'galactic_empire_npc', npc_id: string, galactic_empire_id: string } | null };

export type ActiveGalacticEmpireQuestsByEmpireIdSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ActiveGalacticEmpireQuestsByEmpireIdSubscription = { __typename?: 'subscription_root', galactic_empire_quest: Array<{ __typename?: 'galactic_empire_quest', quest_step_id: string, id: string, quest: { __typename?: 'quest', next_quest_in_chain?: string | null, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, type: Quest_Reward_Type_Enum, resource_unlock_id?: string | null, resource_accrual_type_id?: string | null, resource_accrual_amount?: number | null }>, steps: Array<{ __typename?: 'quest_step', next_step_in_quest?: string | null, npc_contact_id?: string | null, type: Quest_Step_Type_Enum, resource_cost_amount?: number | null, resource_cost_id?: string | null }>, quest_type: { __typename?: 'quest_type', value: string } } }> };

export type AddGalacticEmpireQuestMutationVariables = Exact<{
  input: Galactic_Empire_Quest_Insert_Input;
}>;


export type AddGalacticEmpireQuestMutation = { __typename?: 'mutation_root', insert_galactic_empire_quest_one?: { __typename?: 'galactic_empire_quest', quest_id: string, galactic_empire_id: string } | null };

export type CompleteGalacticEmpireQuestByIdMutationVariables = Exact<{
  questId: Scalars['uuid'];
}>;


export type CompleteGalacticEmpireQuestByIdMutation = { __typename?: 'mutation_root', update_galactic_empire_quest_by_pk?: { __typename?: 'galactic_empire_quest', completed: boolean, quest_id: string } | null };

export type CompleteQuestStepMutationVariables = Exact<{
  empireQuestId: Scalars['String'];
}>;


export type CompleteQuestStepMutation = { __typename?: 'mutation_root', progressQuestStep?: { __typename?: 'QuestStepProgression', next_step_in_quest_added?: string | null, quest_id: string } | null };

export type CompleteQuestMutationVariables = Exact<{
  empireQuestId: Scalars['String'];
}>;


export type CompleteQuestMutation = { __typename?: 'mutation_root', completeQuest?: { __typename?: 'QuestCompletion', next_quest_in_chain_added?: string | null, quest_id: string } | null };

export type EmpiresWithoutQuestsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EmpiresWithoutQuestsSubscription = { __typename?: 'subscription_root', galactic_empire_aggregate: { __typename?: 'galactic_empire_aggregate', nodes: Array<{ __typename?: 'galactic_empire', id: string }> } };

export type GalacticEmpireQuestByIdQueryVariables = Exact<{
  empireQuestId: Scalars['uuid'];
}>;


export type GalacticEmpireQuestByIdQuery = { __typename?: 'query_root', galactic_empire_quest_by_pk?: { __typename?: 'galactic_empire_quest', completed: boolean, quest_step_id: string, quest: { __typename?: 'quest', steps: Array<{ __typename?: 'quest_step', next_step_in_quest?: string | null, id: string, npc_contact_id?: string | null, resource_cost_amount?: number | null, resource_cost_id?: string | null, type: Quest_Step_Type_Enum }>, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: Quest_Reward_Type_Enum }>, quest_type: { __typename?: 'quest_type', value: string }, next_quest?: { __typename?: 'quest', id: string, steps: Array<{ __typename?: 'quest_step', id: string }> } | null }, galactic_empire: { __typename?: 'galactic_empire', id: string, resources: Array<{ __typename?: 'galactic_empire_resources', value: number, resource_type: { __typename?: 'resource_type', type: string, id: string } }> } } | null };

export type GalacticEmpireQuestFieldsFragment = { __typename?: 'galactic_empire_quest', id: string, completed: boolean, quest_step_id: string, quest: { __typename?: 'quest', id: string, type: Quest_Type_Enum, description: string, name: string, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: Quest_Reward_Type_Enum }>, next_quest?: { __typename?: 'quest', name: string } | null, steps: Array<{ __typename?: 'quest_step', id: string, type: Quest_Step_Type_Enum, description: string, initial: boolean, resource_cost_id?: string | null, resource_cost_amount?: number | null, npc_contact_id?: string | null, next_step_in_quest?: string | null }> } };

export type CompletedGalacticEmpireQuestsSubscriptionVariables = Exact<{
  empireId: Scalars['uuid'];
}>;


export type CompletedGalacticEmpireQuestsSubscription = { __typename?: 'subscription_root', galactic_empire_quest: Array<{ __typename?: 'galactic_empire_quest', id: string, completed: boolean, quest_step_id: string, quest: { __typename?: 'quest', id: string, type: Quest_Type_Enum, description: string, name: string, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: Quest_Reward_Type_Enum }>, next_quest?: { __typename?: 'quest', name: string } | null, steps: Array<{ __typename?: 'quest_step', id: string, type: Quest_Step_Type_Enum, description: string, initial: boolean, resource_cost_id?: string | null, resource_cost_amount?: number | null, npc_contact_id?: string | null, next_step_in_quest?: string | null }> } }> };

export type ActiveGalacticEmpireQuestsSubscriptionVariables = Exact<{
  empireId: Scalars['uuid'];
}>;


export type ActiveGalacticEmpireQuestsSubscription = { __typename?: 'subscription_root', galactic_empire_quest: Array<{ __typename?: 'galactic_empire_quest', id: string, completed: boolean, quest_step_id: string, quest: { __typename?: 'quest', id: string, type: Quest_Type_Enum, description: string, name: string, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: Quest_Reward_Type_Enum }>, next_quest?: { __typename?: 'quest', name: string } | null, steps: Array<{ __typename?: 'quest_step', id: string, type: Quest_Step_Type_Enum, description: string, initial: boolean, resource_cost_id?: string | null, resource_cost_amount?: number | null, npc_contact_id?: string | null, next_step_in_quest?: string | null }> } }> };

export type InitialMainQuestIdQueryVariables = Exact<{ [key: string]: never; }>;


export type InitialMainQuestIdQuery = { __typename?: 'query_root', quest: Array<{ __typename?: 'quest', id: string, steps: Array<{ __typename?: 'quest_step', id: string }> }> };

export type ProgressGalacticEmpireQuestStepByIdMutationVariables = Exact<{
  questId: Scalars['uuid'];
  stepId: Scalars['uuid'];
}>;


export type ProgressGalacticEmpireQuestStepByIdMutation = { __typename?: 'mutation_root', update_galactic_empire_quest_by_pk?: { __typename?: 'galactic_empire_quest', completed: boolean, quest_id: string } | null };

export type SubmitEmpireQuestCompletionRequestMutationVariables = Exact<{
  empireQuestId: Scalars['String'];
}>;


export type SubmitEmpireQuestCompletionRequestMutation = { __typename?: 'mutation_root', completeQuest?: { __typename?: 'QuestCompletion', quest_id: string, next_quest_in_chain_added?: string | null } | null };

export type ResourceGeneratorsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ResourceGeneratorsSubscription = { __typename?: 'subscription_root', resource_generator: Array<{ __typename?: 'resource_generator', created_at: string, galactic_empire_id: string, resource_generator_type: { __typename?: 'resource_generator_type', generation_rate: number[], name: string, id: string, resource_type: { __typename?: 'resource_type', id: string, type: string }, resource_type_2?: { __typename?: 'resource_type', id: string, type: string } | null } }> };

export type GalacticEmpireResourcesSubscriptionVariables = Exact<{
  empireId: Scalars['uuid'];
}>;


export type GalacticEmpireResourcesSubscription = { __typename?: 'subscription_root', galactic_empire_resources: Array<{ __typename?: 'galactic_empire_resources', value: number, id: string, resource_type: { __typename?: 'resource_type', id: string, type: string } }> };

export type UnlockGalacticEmpireResourceMutationVariables = Exact<{
  empireId: Scalars['uuid'];
  resourceTypeId: Scalars['uuid'];
}>;


export type UnlockGalacticEmpireResourceMutation = { __typename?: 'mutation_root', insert_galactic_empire_resources_one?: { __typename?: 'galactic_empire_resources', galactic_empire_id: string, resource_type_id: string } | null };

export type CreateGalaxyMutationVariables = Exact<{
  input: Galaxy_Insert_Input;
}>;


export type CreateGalaxyMutation = { __typename?: 'mutation_root', insert_galaxy_one?: { __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> } | null };

export type DeleteGalaxyByIdMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteGalaxyByIdMutation = { __typename?: 'mutation_root', delete_galaxy_by_pk?: { __typename?: 'galaxy', id: string, name?: string | null } | null };

export type GalaxiesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GalaxiesSubscription = { __typename?: 'subscription_root', galaxy: Array<{ __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> }> };

export type GalaxiesWithOwnedCelestialsSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GalaxiesWithOwnedCelestialsSubscription = { __typename?: 'subscription_root', galaxy_aggregate: { __typename?: 'galaxy_aggregate', nodes: Array<{ __typename?: 'galaxy', id: string }> } };

export type GalaxyByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GalaxyByIdQuery = { __typename?: 'query_root', galaxy_by_pk?: { __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> } | null };

export type GetGalaxyByIdAndUnclaimedCelestialsQueryVariables = Exact<{
  galaxyId: Scalars['uuid'];
}>;


export type GetGalaxyByIdAndUnclaimedCelestialsQuery = { __typename?: 'query_root', galaxy_by_pk?: { __typename?: 'galaxy', id: string, stars: number } | null, celestial: Array<{ __typename?: 'celestial', id: string }> };

export type NpcsQueryVariables = Exact<{ [key: string]: never; }>;


export type NpcsQuery = { __typename?: 'query_root', npc: Array<{ __typename?: 'npc', id: string, image_url: string, name: string }> };

export type CreatePlanetMutationVariables = Exact<{
  input: PlanetCreationInput;
}>;


export type CreatePlanetMutation = { __typename?: 'mutation_root', createPlanet?: { __typename?: 'CelestialManagement', createdPlanet: { __typename?: 'PartialPlanet', id: string, name: string, owner_id: string } } | null };

export type PlanetByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type PlanetByIdQuery = { __typename?: 'query_root', planet_by_pk?: { __typename?: 'planet', atmospheric_distance: number, id: string, name: string, owner_id: string, radius: number, terrain_bias: number[], texture_resolution: number, terrain_hex_palette: { __typename?: 'terrain_hex_palette', forest: string, grass: string, name: string, sand: string, water: string, id: string }, rings: Array<{ __typename?: 'planetary_ring', colors: string[], id: string, inner_radius: number, outer_radius: number, resolution: number, rotation: number[], terrain_bias: number[], type: string }>, user_info?: { __typename?: 'user_info', avatar_url?: string | null, name?: string | null, nickname: string, id: string } | null, celestial: { __typename?: 'celestial', name?: string | null, planets_aggregate: { __typename?: 'planet_aggregate', aggregate?: { __typename?: 'planet_aggregate_fields', count: number } | null }, galactic_empire?: { __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> } | null } } | null };

export type PlanetsByCelestialIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PlanetsByCelestialIdQuery = { __typename?: 'query_root', celestial_by_pk?: { __typename?: 'celestial', planets: Array<{ __typename?: 'planet', name: string, id: string, radius: number, owner_id: string, terrain_bias: number[], terrain_hex_palette_id: string, texture_resolution: number, rings: Array<{ __typename?: 'planetary_ring', colors: string[], id: string, inner_radius: number, outer_radius: number, resolution: number, rotation: number[], terrain_bias: number[], type: string }> }> } | null };

export type TerrainHexPalettesQueryVariables = Exact<{ [key: string]: never; }>;


export type TerrainHexPalettesQuery = { __typename?: 'query_root', terrain_hex_palette: Array<{ __typename?: 'terrain_hex_palette', forest: string, grass: string, id: string, name: string, sand: string, water: string }> };

export type TryInsertPlanetMutationVariables = Exact<{
  input: Planet_Insert_Input;
}>;


export type TryInsertPlanetMutation = { __typename?: 'mutation_root', insert_planet_one?: { __typename?: 'planet', id: string, name: string, owner_id: string } | null };

export type ResourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type ResourcesQuery = { __typename?: 'query_root', resource_type: Array<{ __typename?: 'resource_type', type: string, id: string, image_url?: string | null, image_url_pixel?: string | null }> };

export type SelfQueryVariables = Exact<{ [key: string]: never; }>;


export type SelfQuery = { __typename?: 'query_root', user_me: Array<{ __typename?: 'user_me', display_name?: string | null, id?: string | null, name?: string | null, nickname?: string | null, secret_setting_test?: string | null }> };

export type SetDisplayNameByUserIdMutationVariables = Exact<{
  id: Scalars['String'];
  display_name: Scalars['String'];
}>;


export type SetDisplayNameByUserIdMutation = { __typename?: 'mutation_root', update_user_info_by_pk?: { __typename?: 'user_info', display_name?: string | null } | null };

export type SetNameByUserIdMutationVariables = Exact<{
  display_name?: InputMaybe<Scalars['String']>;
}>;


export type SetNameByUserIdMutation = { __typename?: 'mutation_root', setDisplayName?: { __typename?: 'Register', updatedName: string } | null };

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'query_root', user_info: Array<{ __typename?: 'user_info', avatar_url?: string | null, id: string, name?: string | null, display_name?: string | null }> };

export const GalacticEmpireFieldsFragmentDoc = gql`
    fragment GalacticEmpireFields on galactic_empire {
  id
  user_id
  background {
    name
    image_url
    id
    description
  }
  faction {
    description
    id
    image_url
    name
  }
  playable_race {
    description
    id
    image_url
    name
  }
  galaxy {
    name
    id
  }
  celestials {
    id
    name
    planets {
      name
    }
  }
}
    `;
export const CelestialFieldsFragmentDoc = gql`
    fragment CelestialFields on celestial {
  id
  name
  owner_id
  user_info {
    display_name
    name
  }
}
    `;
export const GalaxyFieldsFragmentDoc = gql`
    fragment GalaxyFields on galaxy {
  id
  name
  curvature
  core_radius_factor
  core_concentration_factor
  arms
  arm_width
  radius
  stars
  galactic_empires {
    ...GalacticEmpireFields
  }
  celestials {
    ...CelestialFields
  }
}
    ${GalacticEmpireFieldsFragmentDoc}
${CelestialFieldsFragmentDoc}`;
export const GalacticEmpireQuestFieldsFragmentDoc = gql`
    fragment GalacticEmpireQuestFields on galactic_empire_quest {
  id
  completed
  quest {
    id
    type
    description
    name
    rewards {
      npc_unlock_id
      resource_accrual_amount
      resource_accrual_type_id
      resource_unlock_id
      type
    }
    next_quest {
      name
    }
    steps {
      id
      type
      description
      initial
      resource_cost_id
      resource_cost_amount
      npc_contact_id
      next_step_in_quest
    }
  }
  quest_step_id
}
    `;
export const CelestialByIdDocument = gql`
    query CelestialById($id: String!) {
  celestial_by_pk(id: $id) {
    id
    name
    owner_id
    user_info {
      display_name
      id
      avatar_url
    }
    planets {
      id
      name
      radius
      rings {
        id
        type
        colors
      }
      terrain_bias
      texture_resolution
      atmospheric_distance
      terrain_hex_palette {
        forest
        grass
        name
        sand
        water
      }
    }
    galactic_empire {
      ...GalacticEmpireFields
    }
  }
}
    ${GalacticEmpireFieldsFragmentDoc}`;
export type CelestialByIdQueryResult = Apollo.QueryResult<CelestialByIdQuery, CelestialByIdQueryVariables>;
export const CelestialsDocument = gql`
    subscription Celestials {
  celestial {
    ...CelestialFields
  }
}
    ${CelestialFieldsFragmentDoc}`;
export type CelestialsSubscriptionResult = Apollo.SubscriptionResult<CelestialsSubscription>;
export const CelestialsByGalaxyIdDocument = gql`
    subscription CelestialsByGalaxyId($id: uuid!) {
  galaxy_by_pk(id: $id) {
    celestials {
      name
      id
      owner_id
    }
    celestials_aggregate(distinct_on: owner_id) {
      nodes {
        owner_id
        user_info {
          display_name
          avatar_url
        }
      }
    }
  }
}
    `;
export type CelestialsByGalaxyIdSubscriptionResult = Apollo.SubscriptionResult<CelestialsByGalaxyIdSubscription>;
export const CreateEmpireOriginCelestialDocument = gql`
    mutation CreateEmpireOriginCelestial($galaxy_id: String!, $galacticEmpireId: String!) {
  createEmpireOriginCelestial(
    galaxy_id: $galaxy_id
    galactic_empire_id: $galacticEmpireId
  ) {
    insertedCelestialId
    insertedCelestialName
  }
}
    `;
export type CreateEmpireOriginCelestialMutationFn = Apollo.MutationFunction<CreateEmpireOriginCelestialMutation, CreateEmpireOriginCelestialMutationVariables>;
export type CreateEmpireOriginCelestialMutationResult = Apollo.MutationResult<CreateEmpireOriginCelestialMutation>;
export type CreateEmpireOriginCelestialMutationOptions = Apollo.BaseMutationOptions<CreateEmpireOriginCelestialMutation, CreateEmpireOriginCelestialMutationVariables>;
export const TryInsertClaimedCelestialDocument = gql`
    mutation TryInsertClaimedCelestial($galaxy_id: uuid!, $galactic_empire_id: uuid!, $id: String!, $name: String!, $owner_id: String!) {
  insert_celestial_one(
    object: {galaxy_id: $galaxy_id, id: $id, name: $name, owner_id: $owner_id, galactic_empire_id: $galactic_empire_id}
    on_conflict: {constraint: system_pkey, update_columns: owner_id}
  ) {
    galaxy_id
    id
    name
    owner_id
    galactic_empire_id
  }
}
    `;
export type TryInsertClaimedCelestialMutationFn = Apollo.MutationFunction<TryInsertClaimedCelestialMutation, TryInsertClaimedCelestialMutationVariables>;
export type TryInsertClaimedCelestialMutationResult = Apollo.MutationResult<TryInsertClaimedCelestialMutation>;
export type TryInsertClaimedCelestialMutationOptions = Apollo.BaseMutationOptions<TryInsertClaimedCelestialMutation, TryInsertClaimedCelestialMutationVariables>;
export const CharacterDataDocument = gql`
    query CharacterData {
  playable_race {
    id
    name
    description
    image_url
  }
  faction {
    id
    name
    description
    image_url
  }
  background {
    id
    name
    description
    image_url
  }
}
    `;
export type CharacterDataQueryResult = Apollo.QueryResult<CharacterDataQuery, CharacterDataQueryVariables>;
export const GetChatMessagesDocument = gql`
    subscription GetChatMessages {
  chat_message(order_by: {timestamp: desc}, limit: 200) {
    timestamp
    id
    message
    poster_id
    user_info {
      nickname
      id
      display_name
    }
  }
}
    `;
export type GetChatMessagesSubscriptionResult = Apollo.SubscriptionResult<GetChatMessagesSubscription>;
export const LatestMessageDocument = gql`
    subscription LatestMessage {
  chat_message(limit: 1, order_by: {timestamp: desc}) {
    id
    message
  }
}
    `;
export type LatestMessageSubscriptionResult = Apollo.SubscriptionResult<LatestMessageSubscription>;
export const SendNewMessageDocument = gql`
    mutation SendNewMessage($message: String) {
  insert_chat_message_one(object: {message: $message}) {
    message
  }
}
    `;
export type SendNewMessageMutationFn = Apollo.MutationFunction<SendNewMessageMutation, SendNewMessageMutationVariables>;
export type SendNewMessageMutationResult = Apollo.MutationResult<SendNewMessageMutation>;
export type SendNewMessageMutationOptions = Apollo.BaseMutationOptions<SendNewMessageMutation, SendNewMessageMutationVariables>;
export const CreateGalacticEmpireDocument = gql`
    mutation CreateGalacticEmpire($input: galactic_empire_insert_input!) {
  insert_galactic_empire_one(object: $input) {
    id
  }
}
    `;
export type CreateGalacticEmpireMutationFn = Apollo.MutationFunction<CreateGalacticEmpireMutation, CreateGalacticEmpireMutationVariables>;
export type CreateGalacticEmpireMutationResult = Apollo.MutationResult<CreateGalacticEmpireMutation>;
export type CreateGalacticEmpireMutationOptions = Apollo.BaseMutationOptions<CreateGalacticEmpireMutation, CreateGalacticEmpireMutationVariables>;
export const GalacticEmpiresByGalaxyIdDocument = gql`
    query GalacticEmpiresByGalaxyId($galaxyId: uuid!) {
  galactic_empire(where: {galaxy_id: {_eq: $galaxyId}}) {
    ...GalacticEmpireFields
  }
}
    ${GalacticEmpireFieldsFragmentDoc}`;
export type GalacticEmpiresByGalaxyIdQueryResult = Apollo.QueryResult<GalacticEmpiresByGalaxyIdQuery, GalacticEmpiresByGalaxyIdQueryVariables>;
export const GalacticEmpiresByUserIdDocument = gql`
    subscription GalacticEmpiresByUserId($userId: String!) {
  galactic_empire(where: {user_id: {_eq: $userId}}) {
    ...GalacticEmpireFields
  }
}
    ${GalacticEmpireFieldsFragmentDoc}`;
export type GalacticEmpiresByUserIdSubscriptionResult = Apollo.SubscriptionResult<GalacticEmpiresByUserIdSubscription>;
export const IncrementGalacticEmpireResourcesDocument = gql`
    mutation IncrementGalacticEmpireResources($galacticEmpireId: uuid!, $galacticCreditsIncrement: Int!, $commonMetalsIncrement: Int!, $rareMetalsIncrement: Int!, $hydrocarbonsIncrement: Int!, $voidMatterIncrement: Int!) {
  common_metals: update_galactic_empire_resources(
    _inc: {value: $commonMetalsIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "common metals"}}}
  ) {
    affected_rows
  }
  galactic_credits: update_galactic_empire_resources(
    _inc: {value: $galacticCreditsIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "galactic credits"}}}
  ) {
    affected_rows
  }
  hydrocarbons: update_galactic_empire_resources(
    _inc: {value: $hydrocarbonsIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "hydrocarbons"}}}
  ) {
    affected_rows
  }
  rare_metals: update_galactic_empire_resources(
    _inc: {value: $rareMetalsIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "rare metals"}}}
  ) {
    affected_rows
  }
  void_matter: update_galactic_empire_resources(
    _inc: {value: $voidMatterIncrement}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: "void matter"}}}
  ) {
    affected_rows
  }
}
    `;
export type IncrementGalacticEmpireResourcesMutationFn = Apollo.MutationFunction<IncrementGalacticEmpireResourcesMutation, IncrementGalacticEmpireResourcesMutationVariables>;
export type IncrementGalacticEmpireResourcesMutationResult = Apollo.MutationResult<IncrementGalacticEmpireResourcesMutation>;
export type IncrementGalacticEmpireResourcesMutationOptions = Apollo.BaseMutationOptions<IncrementGalacticEmpireResourcesMutation, IncrementGalacticEmpireResourcesMutationVariables>;
export const IncrementResourceDocument = gql`
    mutation IncrementResource($galacticEmpireId: uuid!, $resourceType: String!, $increment: Int!) {
  update_galactic_empire_resources(
    _inc: {value: $increment}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, resource_type: {type: {_eq: $resourceType}}}
  ) {
    affected_rows
  }
}
    `;
export type IncrementResourceMutationFn = Apollo.MutationFunction<IncrementResourceMutation, IncrementResourceMutationVariables>;
export type IncrementResourceMutationResult = Apollo.MutationResult<IncrementResourceMutation>;
export type IncrementResourceMutationOptions = Apollo.BaseMutationOptions<IncrementResourceMutation, IncrementResourceMutationVariables>;
export const GalacticEmpireNpcsDocument = gql`
    subscription GalacticEmpireNpcs($empireId: uuid!) {
  galactic_empire_npc(where: {galactic_empire_id: {_eq: $empireId}}) {
    npc {
      id
      name
      image_url
      playable_race {
        name
        id
      }
      faction {
        name
        id
      }
    }
  }
}
    `;
export type GalacticEmpireNpcsSubscriptionResult = Apollo.SubscriptionResult<GalacticEmpireNpcsSubscription>;
export const UnlockGalacticEmpireNpcDocument = gql`
    mutation UnlockGalacticEmpireNpc($empireId: uuid!, $npcId: uuid!) {
  insert_galactic_empire_npc_one(
    object: {galactic_empire_id: $empireId, npc_id: $npcId}
  ) {
    npc_id
    galactic_empire_id
  }
}
    `;
export type UnlockGalacticEmpireNpcMutationFn = Apollo.MutationFunction<UnlockGalacticEmpireNpcMutation, UnlockGalacticEmpireNpcMutationVariables>;
export type UnlockGalacticEmpireNpcMutationResult = Apollo.MutationResult<UnlockGalacticEmpireNpcMutation>;
export type UnlockGalacticEmpireNpcMutationOptions = Apollo.BaseMutationOptions<UnlockGalacticEmpireNpcMutation, UnlockGalacticEmpireNpcMutationVariables>;
export const ActiveGalacticEmpireQuestsByEmpireIdDocument = gql`
    subscription ActiveGalacticEmpireQuestsByEmpireId($id: uuid!) {
  galactic_empire_quest(where: {galactic_empire_id: {_eq: $id}}) {
    quest_step_id
    id
    quest {
      rewards {
        npc_unlock_id
        type
        resource_unlock_id
        resource_accrual_type_id
        resource_accrual_amount
      }
      steps {
        next_step_in_quest
        npc_contact_id
        type
        resource_cost_amount
        resource_cost_id
      }
      next_quest_in_chain
      quest_type {
        value
      }
    }
  }
}
    `;
export type ActiveGalacticEmpireQuestsByEmpireIdSubscriptionResult = Apollo.SubscriptionResult<ActiveGalacticEmpireQuestsByEmpireIdSubscription>;
export const AddGalacticEmpireQuestDocument = gql`
    mutation AddGalacticEmpireQuest($input: galactic_empire_quest_insert_input!) {
  insert_galactic_empire_quest_one(object: $input) {
    quest_id
    galactic_empire_id
  }
}
    `;
export type AddGalacticEmpireQuestMutationFn = Apollo.MutationFunction<AddGalacticEmpireQuestMutation, AddGalacticEmpireQuestMutationVariables>;
export type AddGalacticEmpireQuestMutationResult = Apollo.MutationResult<AddGalacticEmpireQuestMutation>;
export type AddGalacticEmpireQuestMutationOptions = Apollo.BaseMutationOptions<AddGalacticEmpireQuestMutation, AddGalacticEmpireQuestMutationVariables>;
export const CompleteGalacticEmpireQuestByIdDocument = gql`
    mutation CompleteGalacticEmpireQuestById($questId: uuid!) {
  update_galactic_empire_quest_by_pk(
    pk_columns: {id: $questId}
    _set: {completed: true}
  ) {
    completed
    quest_id
  }
}
    `;
export type CompleteGalacticEmpireQuestByIdMutationFn = Apollo.MutationFunction<CompleteGalacticEmpireQuestByIdMutation, CompleteGalacticEmpireQuestByIdMutationVariables>;
export type CompleteGalacticEmpireQuestByIdMutationResult = Apollo.MutationResult<CompleteGalacticEmpireQuestByIdMutation>;
export type CompleteGalacticEmpireQuestByIdMutationOptions = Apollo.BaseMutationOptions<CompleteGalacticEmpireQuestByIdMutation, CompleteGalacticEmpireQuestByIdMutationVariables>;
export const CompleteQuestStepDocument = gql`
    mutation CompleteQuestStep($empireQuestId: String!) {
  progressQuestStep(empire_quest_id: $empireQuestId) {
    next_step_in_quest_added
    quest_id
  }
}
    `;
export type CompleteQuestStepMutationFn = Apollo.MutationFunction<CompleteQuestStepMutation, CompleteQuestStepMutationVariables>;
export type CompleteQuestStepMutationResult = Apollo.MutationResult<CompleteQuestStepMutation>;
export type CompleteQuestStepMutationOptions = Apollo.BaseMutationOptions<CompleteQuestStepMutation, CompleteQuestStepMutationVariables>;
export const CompleteQuestDocument = gql`
    mutation CompleteQuest($empireQuestId: String!) {
  completeQuest(empire_quest_id: $empireQuestId) {
    next_quest_in_chain_added
    quest_id
  }
}
    `;
export type CompleteQuestMutationFn = Apollo.MutationFunction<CompleteQuestMutation, CompleteQuestMutationVariables>;
export type CompleteQuestMutationResult = Apollo.MutationResult<CompleteQuestMutation>;
export type CompleteQuestMutationOptions = Apollo.BaseMutationOptions<CompleteQuestMutation, CompleteQuestMutationVariables>;
export const EmpiresWithoutQuestsDocument = gql`
    subscription EmpiresWithoutQuests {
  galactic_empire_aggregate(where: {_not: {quests: {}}}) {
    nodes {
      id
    }
  }
}
    `;
export type EmpiresWithoutQuestsSubscriptionResult = Apollo.SubscriptionResult<EmpiresWithoutQuestsSubscription>;
export const GalacticEmpireQuestByIdDocument = gql`
    query GalacticEmpireQuestById($empireQuestId: uuid!) {
  galactic_empire_quest_by_pk(id: $empireQuestId) {
    completed
    quest_step_id
    quest {
      steps {
        next_step_in_quest
        id
        npc_contact_id
        resource_cost_amount
        resource_cost_id
        type
      }
      rewards {
        npc_unlock_id
        resource_accrual_amount
        resource_accrual_type_id
        resource_unlock_id
        type
      }
      quest_type {
        value
      }
      next_quest {
        id
        steps(where: {initial: {_eq: true}}) {
          id
        }
      }
    }
    galactic_empire {
      id
      resources {
        value
        resource_type {
          type
          id
        }
      }
    }
  }
}
    `;
export type GalacticEmpireQuestByIdQueryResult = Apollo.QueryResult<GalacticEmpireQuestByIdQuery, GalacticEmpireQuestByIdQueryVariables>;
export const CompletedGalacticEmpireQuestsDocument = gql`
    subscription CompletedGalacticEmpireQuests($empireId: uuid!) {
  galactic_empire_quest(
    where: {galactic_empire_id: {_eq: $empireId}, completed: {_eq: true}}
  ) {
    ...GalacticEmpireQuestFields
  }
}
    ${GalacticEmpireQuestFieldsFragmentDoc}`;
export type CompletedGalacticEmpireQuestsSubscriptionResult = Apollo.SubscriptionResult<CompletedGalacticEmpireQuestsSubscription>;
export const ActiveGalacticEmpireQuestsDocument = gql`
    subscription ActiveGalacticEmpireQuests($empireId: uuid!) {
  galactic_empire_quest(
    where: {galactic_empire_id: {_eq: $empireId}, completed: {_eq: false}}
  ) {
    ...GalacticEmpireQuestFields
  }
}
    ${GalacticEmpireQuestFieldsFragmentDoc}`;
export type ActiveGalacticEmpireQuestsSubscriptionResult = Apollo.SubscriptionResult<ActiveGalacticEmpireQuestsSubscription>;
export const InitialMainQuestIdDocument = gql`
    query InitialMainQuestId {
  quest(where: {type: {_eq: main}, initial: {_eq: true}}) {
    id
    steps(where: {initial: {_eq: true}}) {
      id
    }
  }
}
    `;
export type InitialMainQuestIdQueryResult = Apollo.QueryResult<InitialMainQuestIdQuery, InitialMainQuestIdQueryVariables>;
export const ProgressGalacticEmpireQuestStepByIdDocument = gql`
    mutation ProgressGalacticEmpireQuestStepById($questId: uuid!, $stepId: uuid!) {
  update_galactic_empire_quest_by_pk(
    pk_columns: {id: $questId}
    _set: {quest_step_id: $stepId}
  ) {
    completed
    quest_id
  }
}
    `;
export type ProgressGalacticEmpireQuestStepByIdMutationFn = Apollo.MutationFunction<ProgressGalacticEmpireQuestStepByIdMutation, ProgressGalacticEmpireQuestStepByIdMutationVariables>;
export type ProgressGalacticEmpireQuestStepByIdMutationResult = Apollo.MutationResult<ProgressGalacticEmpireQuestStepByIdMutation>;
export type ProgressGalacticEmpireQuestStepByIdMutationOptions = Apollo.BaseMutationOptions<ProgressGalacticEmpireQuestStepByIdMutation, ProgressGalacticEmpireQuestStepByIdMutationVariables>;
export const SubmitEmpireQuestCompletionRequestDocument = gql`
    mutation SubmitEmpireQuestCompletionRequest($empireQuestId: String!) {
  completeQuest(empire_quest_id: $empireQuestId) {
    quest_id
    next_quest_in_chain_added
  }
}
    `;
export type SubmitEmpireQuestCompletionRequestMutationFn = Apollo.MutationFunction<SubmitEmpireQuestCompletionRequestMutation, SubmitEmpireQuestCompletionRequestMutationVariables>;
export type SubmitEmpireQuestCompletionRequestMutationResult = Apollo.MutationResult<SubmitEmpireQuestCompletionRequestMutation>;
export type SubmitEmpireQuestCompletionRequestMutationOptions = Apollo.BaseMutationOptions<SubmitEmpireQuestCompletionRequestMutation, SubmitEmpireQuestCompletionRequestMutationVariables>;
export const ResourceGeneratorsDocument = gql`
    subscription ResourceGenerators {
  resource_generator {
    created_at
    resource_generator_type {
      generation_rate
      resource_type {
        id
        type
      }
      name
      id
      resource_type_2 {
        id
        type
      }
    }
    galactic_empire_id
  }
}
    `;
export type ResourceGeneratorsSubscriptionResult = Apollo.SubscriptionResult<ResourceGeneratorsSubscription>;
export const GalacticEmpireResourcesDocument = gql`
    subscription GalacticEmpireResources($empireId: uuid!) {
  galactic_empire_resources(where: {galactic_empire_id: {_eq: $empireId}}) {
    value
    resource_type {
      id
      type
    }
    id
  }
}
    `;
export type GalacticEmpireResourcesSubscriptionResult = Apollo.SubscriptionResult<GalacticEmpireResourcesSubscription>;
export const UnlockGalacticEmpireResourceDocument = gql`
    mutation UnlockGalacticEmpireResource($empireId: uuid!, $resourceTypeId: uuid!) {
  insert_galactic_empire_resources_one(
    object: {galactic_empire_id: $empireId, resource_type_id: $resourceTypeId, value: 0}
  ) {
    galactic_empire_id
    resource_type_id
  }
}
    `;
export type UnlockGalacticEmpireResourceMutationFn = Apollo.MutationFunction<UnlockGalacticEmpireResourceMutation, UnlockGalacticEmpireResourceMutationVariables>;
export type UnlockGalacticEmpireResourceMutationResult = Apollo.MutationResult<UnlockGalacticEmpireResourceMutation>;
export type UnlockGalacticEmpireResourceMutationOptions = Apollo.BaseMutationOptions<UnlockGalacticEmpireResourceMutation, UnlockGalacticEmpireResourceMutationVariables>;
export const CreateGalaxyDocument = gql`
    mutation CreateGalaxy($input: galaxy_insert_input!) {
  insert_galaxy_one(object: $input) {
    ...GalaxyFields
  }
}
    ${GalaxyFieldsFragmentDoc}`;
export type CreateGalaxyMutationFn = Apollo.MutationFunction<CreateGalaxyMutation, CreateGalaxyMutationVariables>;
export type CreateGalaxyMutationResult = Apollo.MutationResult<CreateGalaxyMutation>;
export type CreateGalaxyMutationOptions = Apollo.BaseMutationOptions<CreateGalaxyMutation, CreateGalaxyMutationVariables>;
export const DeleteGalaxyByIdDocument = gql`
    mutation DeleteGalaxyById($id: uuid!) {
  delete_galaxy_by_pk(id: $id) {
    id
    name
  }
}
    `;
export type DeleteGalaxyByIdMutationFn = Apollo.MutationFunction<DeleteGalaxyByIdMutation, DeleteGalaxyByIdMutationVariables>;
export type DeleteGalaxyByIdMutationResult = Apollo.MutationResult<DeleteGalaxyByIdMutation>;
export type DeleteGalaxyByIdMutationOptions = Apollo.BaseMutationOptions<DeleteGalaxyByIdMutation, DeleteGalaxyByIdMutationVariables>;
export const GalaxiesDocument = gql`
    subscription Galaxies {
  galaxy {
    ...GalaxyFields
  }
}
    ${GalaxyFieldsFragmentDoc}`;
export type GalaxiesSubscriptionResult = Apollo.SubscriptionResult<GalaxiesSubscription>;
export const GalaxiesWithOwnedCelestialsDocument = gql`
    subscription GalaxiesWithOwnedCelestials($userId: String!) {
  galaxy_aggregate(where: {celestials: {owner_id: {_eq: $userId}}}) {
    nodes {
      id
    }
  }
}
    `;
export type GalaxiesWithOwnedCelestialsSubscriptionResult = Apollo.SubscriptionResult<GalaxiesWithOwnedCelestialsSubscription>;
export const GalaxyByIdDocument = gql`
    query GalaxyById($id: uuid!) {
  galaxy_by_pk(id: $id) {
    ...GalaxyFields
  }
}
    ${GalaxyFieldsFragmentDoc}`;
export type GalaxyByIdQueryResult = Apollo.QueryResult<GalaxyByIdQuery, GalaxyByIdQueryVariables>;
export const GetGalaxyByIdAndUnclaimedCelestialsDocument = gql`
    query GetGalaxyByIdAndUnclaimedCelestials($galaxyId: uuid!) {
  galaxy_by_pk(id: $galaxyId) {
    id
    stars
  }
  celestial(
    where: {galaxy_id: {_eq: $galaxyId}, _and: {owner_id: {_is_null: true}}}
  ) {
    id
  }
}
    `;
export type GetGalaxyByIdAndUnclaimedCelestialsQueryResult = Apollo.QueryResult<GetGalaxyByIdAndUnclaimedCelestialsQuery, GetGalaxyByIdAndUnclaimedCelestialsQueryVariables>;
export const NpcsDocument = gql`
    query Npcs {
  npc {
    id
    image_url
    name
  }
}
    `;
export type NpcsQueryResult = Apollo.QueryResult<NpcsQuery, NpcsQueryVariables>;
export const CreatePlanetDocument = gql`
    mutation CreatePlanet($input: PlanetCreationInput!) {
  createPlanet(input: $input) {
    createdPlanet {
      id
      name
      owner_id
    }
  }
}
    `;
export type CreatePlanetMutationFn = Apollo.MutationFunction<CreatePlanetMutation, CreatePlanetMutationVariables>;
export type CreatePlanetMutationResult = Apollo.MutationResult<CreatePlanetMutation>;
export type CreatePlanetMutationOptions = Apollo.BaseMutationOptions<CreatePlanetMutation, CreatePlanetMutationVariables>;
export const PlanetByIdDocument = gql`
    query PlanetById($id: uuid!) {
  planet_by_pk(id: $id) {
    atmospheric_distance
    id
    name
    owner_id
    radius
    terrain_bias
    terrain_hex_palette {
      forest
      grass
      name
      sand
      water
      id
    }
    texture_resolution
    rings {
      colors
      id
      inner_radius
      outer_radius
      resolution
      rotation
      terrain_bias
      type
    }
    user_info {
      avatar_url
      name
      nickname
      id
    }
    celestial {
      name
      planets_aggregate {
        aggregate {
          count
        }
      }
      galactic_empire {
        ...GalacticEmpireFields
      }
    }
  }
}
    ${GalacticEmpireFieldsFragmentDoc}`;
export type PlanetByIdQueryResult = Apollo.QueryResult<PlanetByIdQuery, PlanetByIdQueryVariables>;
export const PlanetsByCelestialIdDocument = gql`
    query PlanetsByCelestialId($id: String!) {
  celestial_by_pk(id: $id) {
    planets {
      name
      id
      radius
      rings {
        colors
        id
        inner_radius
        outer_radius
        resolution
        rotation
        terrain_bias
        type
      }
      owner_id
      terrain_bias
      terrain_hex_palette_id
      texture_resolution
    }
  }
}
    `;
export type PlanetsByCelestialIdQueryResult = Apollo.QueryResult<PlanetsByCelestialIdQuery, PlanetsByCelestialIdQueryVariables>;
export const TerrainHexPalettesDocument = gql`
    query TerrainHexPalettes {
  terrain_hex_palette {
    forest
    grass
    id
    name
    sand
    water
  }
}
    `;
export type TerrainHexPalettesQueryResult = Apollo.QueryResult<TerrainHexPalettesQuery, TerrainHexPalettesQueryVariables>;
export const TryInsertPlanetDocument = gql`
    mutation TryInsertPlanet($input: planet_insert_input!) {
  insert_planet_one(object: $input) {
    id
    name
    owner_id
  }
}
    `;
export type TryInsertPlanetMutationFn = Apollo.MutationFunction<TryInsertPlanetMutation, TryInsertPlanetMutationVariables>;
export type TryInsertPlanetMutationResult = Apollo.MutationResult<TryInsertPlanetMutation>;
export type TryInsertPlanetMutationOptions = Apollo.BaseMutationOptions<TryInsertPlanetMutation, TryInsertPlanetMutationVariables>;
export const ResourcesDocument = gql`
    query Resources {
  resource_type {
    type
    id
    image_url
    image_url_pixel
  }
}
    `;
export type ResourcesQueryResult = Apollo.QueryResult<ResourcesQuery, ResourcesQueryVariables>;
export const SelfDocument = gql`
    query Self {
  user_me {
    display_name
    id
    name
    nickname
    secret_setting_test
  }
}
    `;
export type SelfQueryResult = Apollo.QueryResult<SelfQuery, SelfQueryVariables>;
export const SetDisplayNameByUserIdDocument = gql`
    mutation SetDisplayNameByUserID($id: String!, $display_name: String!) {
  update_user_info_by_pk(
    pk_columns: {id: $id}
    _set: {display_name: $display_name}
  ) {
    display_name
  }
}
    `;
export type SetDisplayNameByUserIdMutationFn = Apollo.MutationFunction<SetDisplayNameByUserIdMutation, SetDisplayNameByUserIdMutationVariables>;
export type SetDisplayNameByUserIdMutationResult = Apollo.MutationResult<SetDisplayNameByUserIdMutation>;
export type SetDisplayNameByUserIdMutationOptions = Apollo.BaseMutationOptions<SetDisplayNameByUserIdMutation, SetDisplayNameByUserIdMutationVariables>;
export const SetNameByUserIdDocument = gql`
    mutation SetNameByUserID($display_name: String = "") {
  setDisplayName(display_name: $display_name) {
    updatedName
  }
}
    `;
export type SetNameByUserIdMutationFn = Apollo.MutationFunction<SetNameByUserIdMutation, SetNameByUserIdMutationVariables>;
export type SetNameByUserIdMutationResult = Apollo.MutationResult<SetNameByUserIdMutation>;
export type SetNameByUserIdMutationOptions = Apollo.BaseMutationOptions<SetNameByUserIdMutation, SetNameByUserIdMutationVariables>;
export const UserInfoDocument = gql`
    query UserInfo {
  user_info {
    avatar_url
    id
    name
    display_name
  }
}
    `;
export type UserInfoQueryResult = Apollo.QueryResult<UserInfoQuery, UserInfoQueryVariables>;
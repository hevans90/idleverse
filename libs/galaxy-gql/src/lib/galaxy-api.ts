import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _numeric: { input: number[]; output: number[]; }
  _text: { input: string[]; output: string[]; }
  _uuid: { input: string[]; output: string[]; }
  numeric: { input: number; output: number; }
  timestamp: { input: string; output: string; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type CelestialManagement = {
  __typename?: 'CelestialManagement';
  createdPlanet: PartialPlanet;
};

export type GalaxyManagement = {
  __typename?: 'GalaxyManagement';
  insertedCelestialId: Scalars['String']['output'];
  insertedCelestialName: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MediaMetadata = {
  __typename?: 'MediaMetadata';
  Key: Scalars['String']['output'];
  Value: Scalars['String']['output'];
};

export type MediaResult = {
  __typename?: 'MediaResult';
  etag: Scalars['String']['output'];
  metadata?: Maybe<Array<MediaMetadata>>;
  name: Scalars['String']['output'];
};

export type PartialPlanet = {
  __typename?: 'PartialPlanet';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner_id: Scalars['String']['output'];
};

export type PlanetCreationInput = {
  atmospheric_distance: Scalars['Float']['input'];
  celestial_id: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  owner_id: Scalars['String']['input'];
  radius: Scalars['Float']['input'];
  rings: RingInsertInputWrapper;
  terrain_bias: Array<Scalars['Float']['input']>;
  terrain_hex_palette_id: Scalars['String']['input'];
  texture_resolution: Scalars['Float']['input'];
};

export type PurchaseCompletion = {
  __typename?: 'PurchaseCompletion';
  spent: Scalars['Float']['output'];
};

export type QuestCompletion = {
  __typename?: 'QuestCompletion';
  next_quest_in_chain_added?: Maybe<Scalars['String']['output']>;
  quest_id: Scalars['String']['output'];
  rewards: Array<QuestReward>;
};

export type QuestReward = {
  __typename?: 'QuestReward';
  npc_unlock_id?: Maybe<Scalars['String']['output']>;
  resource_accrual_amount?: Maybe<Scalars['Float']['output']>;
  resource_accrual_type_id?: Maybe<Scalars['String']['output']>;
  resource_unlock_id?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type QuestStepProgression = {
  __typename?: 'QuestStepProgression';
  next_step_in_quest_added?: Maybe<Scalars['String']['output']>;
  quest_id: Scalars['String']['output'];
};

export type Register = {
  __typename?: 'Register';
  updatedName: Scalars['String']['output'];
};

export type RingInsertInput = {
  colors: Array<Scalars['String']['input']>;
  inner_radius: Scalars['Float']['input'];
  outer_radius: Scalars['Float']['input'];
  resolution: Scalars['Float']['input'];
  rotation: Array<Scalars['Float']['input']>;
  terrain_bias: Array<Scalars['Float']['input']>;
  type: Scalars['String']['input'];
};

export type RingInsertInputWrapper = {
  data: Array<RingInsertInput>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "_numeric". All fields are combined with logical 'AND'. */
export type _Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_numeric']['input']>;
  _gt?: InputMaybe<Scalars['_numeric']['input']>;
  _gte?: InputMaybe<Scalars['_numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['_numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['_numeric']['input']>;
  _lte?: InputMaybe<Scalars['_numeric']['input']>;
  _neq?: InputMaybe<Scalars['_numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['_numeric']['input']>>;
};

/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_text']['input']>;
  _gt?: InputMaybe<Scalars['_text']['input']>;
  _gte?: InputMaybe<Scalars['_text']['input']>;
  _in?: InputMaybe<Array<Scalars['_text']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['_text']['input']>;
  _lte?: InputMaybe<Scalars['_text']['input']>;
  _neq?: InputMaybe<Scalars['_text']['input']>;
  _nin?: InputMaybe<Array<Scalars['_text']['input']>>;
};

/** Boolean expression to compare columns of type "_uuid". All fields are combined with logical 'AND'. */
export type _Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_uuid']['input']>;
  _gt?: InputMaybe<Scalars['_uuid']['input']>;
  _gte?: InputMaybe<Scalars['_uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['_uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['_uuid']['input']>;
  _lte?: InputMaybe<Scalars['_uuid']['input']>;
  _neq?: InputMaybe<Scalars['_uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['_uuid']['input']>>;
};

/** Playable backgrounds */
export type Background = {
  __typename?: 'background';
  description: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
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
  count: Scalars['Int']['output'];
  max?: Maybe<Background_Max_Fields>;
  min?: Maybe<Background_Min_Fields>;
};


/** aggregate fields of "background" */
export type Background_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Background_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Background_Max_Fields = {
  __typename?: 'background_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Background_Min_Fields = {
  __typename?: 'background_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "background" */
export type Background_Mutation_Response = {
  __typename?: 'background_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  /** filter the rows which have to be updated */
  where: Background_Bool_Exp;
};

/** columns and relationships of "celestial" */
export type Celestial = {
  __typename?: 'celestial';
  /** An object relationship */
  galactic_empire?: Maybe<Galactic_Empire>;
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  galaxy: Galaxy;
  galaxy_id: Scalars['uuid']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


/** columns and relationships of "celestial" */
export type CelestialPlanets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};

/** aggregated selection of "celestial" */
export type Celestial_Aggregate = {
  __typename?: 'celestial_aggregate';
  aggregate?: Maybe<Celestial_Aggregate_Fields>;
  nodes: Array<Celestial>;
};

export type Celestial_Aggregate_Bool_Exp = {
  count?: InputMaybe<Celestial_Aggregate_Bool_Exp_Count>;
};

export type Celestial_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Celestial_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Celestial_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "celestial" */
export type Celestial_Aggregate_Fields = {
  __typename?: 'celestial_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Celestial_Max_Fields>;
  min?: Maybe<Celestial_Min_Fields>;
};


/** aggregate fields of "celestial" */
export type Celestial_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Celestial_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  planets_aggregate?: InputMaybe<Planet_Aggregate_Bool_Exp>;
  user_info?: InputMaybe<User_Info_Bool_Exp>;
};

/** unique or primary key constraints on table "celestial" */
export enum Celestial_Constraint {
  /** unique or primary key constraint on columns "name" */
  CelestialNameKey = 'celestial_name_key',
  /** unique or primary key constraint on columns "id" */
  SystemPkey = 'system_pkey'
}

/** input type for inserting data into table "celestial" */
export type Celestial_Insert_Input = {
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  galaxy?: InputMaybe<Galaxy_Obj_Rel_Insert_Input>;
  galaxy_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  planets?: InputMaybe<Planet_Arr_Rel_Insert_Input>;
  user_info?: InputMaybe<User_Info_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Celestial_Max_Fields = {
  __typename?: 'celestial_max_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  galaxy_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
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
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  galaxy_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['String']['input'];
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
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  galaxy_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
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
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  galaxy_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
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
  /** filter the rows which have to be updated */
  where: Celestial_Bool_Exp;
};

/** columns and relationships of "chat_message" */
export type Chat_Message = {
  __typename?: 'chat_message';
  id: Scalars['uuid']['output'];
  message: Scalars['String']['output'];
  poster_id: Scalars['String']['output'];
  timestamp: Scalars['timestamp']['output'];
  /** An object relationship */
  user_info: User_Info;
};

/** aggregated selection of "chat_message" */
export type Chat_Message_Aggregate = {
  __typename?: 'chat_message_aggregate';
  aggregate?: Maybe<Chat_Message_Aggregate_Fields>;
  nodes: Array<Chat_Message>;
};

export type Chat_Message_Aggregate_Bool_Exp = {
  count?: InputMaybe<Chat_Message_Aggregate_Bool_Exp_Count>;
};

export type Chat_Message_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Chat_Message_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Chat_Message_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "chat_message" */
export type Chat_Message_Aggregate_Fields = {
  __typename?: 'chat_message_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Chat_Message_Max_Fields>;
  min?: Maybe<Chat_Message_Min_Fields>;
};


/** aggregate fields of "chat_message" */
export type Chat_Message_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Chat_Message_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  poster_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  user_info?: InputMaybe<User_Info_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Chat_Message_Max_Fields = {
  __typename?: 'chat_message_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  poster_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
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
  id?: Maybe<Scalars['uuid']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  poster_id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamp']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  poster_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
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
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  poster_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['timestamp']['input']>;
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
  /** filter the rows which have to be updated */
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
  description: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
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
  count: Scalars['Int']['output'];
  max?: Maybe<Faction_Max_Fields>;
  min?: Maybe<Faction_Min_Fields>;
};


/** aggregate fields of "faction" */
export type Faction_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Faction_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Faction_Max_Fields = {
  __typename?: 'faction_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Faction_Min_Fields = {
  __typename?: 'faction_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "faction" */
export type Faction_Mutation_Response = {
  __typename?: 'faction_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  /** filter the rows which have to be updated */
  where: Faction_Bool_Exp;
};

/** columns and relationships of "galactic_empire" */
export type Galactic_Empire = {
  __typename?: 'galactic_empire';
  /** An object relationship */
  background: Background;
  background_id: Scalars['uuid']['output'];
  celestial_claims: Scalars['Int']['output'];
  /** An array relationship */
  celestials: Array<Celestial>;
  /** An aggregate relationship */
  celestials_aggregate: Celestial_Aggregate;
  /** An object relationship */
  faction: Faction;
  faction_id: Scalars['uuid']['output'];
  /** An object relationship */
  galaxy: Galaxy;
  galaxy_id: Scalars['uuid']['output'];
  /** An object relationship */
  homeworld?: Maybe<Planet>;
  homeworld_id?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  npcs: Array<Galactic_Empire_Npc>;
  /** An aggregate relationship */
  npcs_aggregate: Galactic_Empire_Npc_Aggregate;
  /** An object relationship */
  playable_race: Playable_Race;
  playable_race_id: Scalars['uuid']['output'];
  /** An array relationship */
  quests: Array<Galactic_Empire_Quest>;
  /** An aggregate relationship */
  quests_aggregate: Galactic_Empire_Quest_Aggregate;
  /** An array relationship */
  resources: Array<Galactic_Empire_Resources>;
  /** An aggregate relationship */
  resources_aggregate: Galactic_Empire_Resources_Aggregate;
  user_id: Scalars['String']['output'];
  /** An object relationship */
  user_info: User_Info;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireCelestialsArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireCelestials_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireNpcsArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireNpcs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireQuestsArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireQuests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireResourcesArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


/** columns and relationships of "galactic_empire" */
export type Galactic_EmpireResources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};

/** aggregated selection of "galactic_empire" */
export type Galactic_Empire_Aggregate = {
  __typename?: 'galactic_empire_aggregate';
  aggregate?: Maybe<Galactic_Empire_Aggregate_Fields>;
  nodes: Array<Galactic_Empire>;
};

export type Galactic_Empire_Aggregate_Bool_Exp = {
  count?: InputMaybe<Galactic_Empire_Aggregate_Bool_Exp_Count>;
};

export type Galactic_Empire_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Galactic_Empire_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "galactic_empire" */
export type Galactic_Empire_Aggregate_Fields = {
  __typename?: 'galactic_empire_aggregate_fields';
  avg?: Maybe<Galactic_Empire_Avg_Fields>;
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  celestial_claims?: Maybe<Scalars['Float']['output']>;
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
  celestials_aggregate?: InputMaybe<Celestial_Aggregate_Bool_Exp>;
  faction?: InputMaybe<Faction_Bool_Exp>;
  faction_id?: InputMaybe<Uuid_Comparison_Exp>;
  galaxy?: InputMaybe<Galaxy_Bool_Exp>;
  galaxy_id?: InputMaybe<Uuid_Comparison_Exp>;
  homeworld?: InputMaybe<Planet_Bool_Exp>;
  homeworld_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  npcs?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
  npcs_aggregate?: InputMaybe<Galactic_Empire_Npc_Aggregate_Bool_Exp>;
  playable_race?: InputMaybe<Playable_Race_Bool_Exp>;
  playable_race_id?: InputMaybe<Uuid_Comparison_Exp>;
  quests?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
  quests_aggregate?: InputMaybe<Galactic_Empire_Quest_Aggregate_Bool_Exp>;
  resources?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
  resources_aggregate?: InputMaybe<Galactic_Empire_Resources_Aggregate_Bool_Exp>;
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
  celestial_claims?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "galactic_empire" */
export type Galactic_Empire_Insert_Input = {
  background?: InputMaybe<Background_Obj_Rel_Insert_Input>;
  background_id?: InputMaybe<Scalars['uuid']['input']>;
  celestial_claims?: InputMaybe<Scalars['Int']['input']>;
  celestials?: InputMaybe<Celestial_Arr_Rel_Insert_Input>;
  faction?: InputMaybe<Faction_Obj_Rel_Insert_Input>;
  faction_id?: InputMaybe<Scalars['uuid']['input']>;
  galaxy?: InputMaybe<Galaxy_Obj_Rel_Insert_Input>;
  galaxy_id?: InputMaybe<Scalars['uuid']['input']>;
  homeworld?: InputMaybe<Planet_Obj_Rel_Insert_Input>;
  homeworld_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  npcs?: InputMaybe<Galactic_Empire_Npc_Arr_Rel_Insert_Input>;
  playable_race?: InputMaybe<Playable_Race_Obj_Rel_Insert_Input>;
  playable_race_id?: InputMaybe<Scalars['uuid']['input']>;
  quests?: InputMaybe<Galactic_Empire_Quest_Arr_Rel_Insert_Input>;
  resources?: InputMaybe<Galactic_Empire_Resources_Arr_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
  user_info?: InputMaybe<User_Info_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Galactic_Empire_Max_Fields = {
  __typename?: 'galactic_empire_max_fields';
  background_id?: Maybe<Scalars['uuid']['output']>;
  celestial_claims?: Maybe<Scalars['Int']['output']>;
  faction_id?: Maybe<Scalars['uuid']['output']>;
  galaxy_id?: Maybe<Scalars['uuid']['output']>;
  homeworld_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  playable_race_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
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
  background_id?: Maybe<Scalars['uuid']['output']>;
  celestial_claims?: Maybe<Scalars['Int']['output']>;
  faction_id?: Maybe<Scalars['uuid']['output']>;
  galaxy_id?: Maybe<Scalars['uuid']['output']>;
  homeworld_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  playable_race_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
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
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Galactic_Empire>;
};

/** NPCs unlocked for this empire */
export type Galactic_Empire_Npc = {
  __typename?: 'galactic_empire_npc';
  /** An object relationship */
  galactic_empire: Galactic_Empire;
  galactic_empire_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  npc: Npc;
  npc_id: Scalars['uuid']['output'];
};

/** aggregated selection of "galactic_empire_npc" */
export type Galactic_Empire_Npc_Aggregate = {
  __typename?: 'galactic_empire_npc_aggregate';
  aggregate?: Maybe<Galactic_Empire_Npc_Aggregate_Fields>;
  nodes: Array<Galactic_Empire_Npc>;
};

export type Galactic_Empire_Npc_Aggregate_Bool_Exp = {
  count?: InputMaybe<Galactic_Empire_Npc_Aggregate_Bool_Exp_Count>;
};

export type Galactic_Empire_Npc_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "galactic_empire_npc" */
export type Galactic_Empire_Npc_Aggregate_Fields = {
  __typename?: 'galactic_empire_npc_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Galactic_Empire_Npc_Max_Fields>;
  min?: Maybe<Galactic_Empire_Npc_Min_Fields>;
};


/** aggregate fields of "galactic_empire_npc" */
export type Galactic_Empire_Npc_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  npc?: InputMaybe<Npc_Obj_Rel_Insert_Input>;
  npc_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Galactic_Empire_Npc_Max_Fields = {
  __typename?: 'galactic_empire_npc_max_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  npc_id?: Maybe<Scalars['uuid']['output']>;
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
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  npc_id?: Maybe<Scalars['uuid']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  npc_id?: InputMaybe<Scalars['uuid']['input']>;
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
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  npc_id?: InputMaybe<Scalars['uuid']['input']>;
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
  /** filter the rows which have to be updated */
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
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "galactic_empire_quest" */
export type Galactic_Empire_Quest = {
  __typename?: 'galactic_empire_quest';
  completed: Scalars['Boolean']['output'];
  /** An object relationship */
  galactic_empire: Galactic_Empire;
  galactic_empire_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  quest: Quest;
  quest_id: Scalars['uuid']['output'];
  quest_step_id: Scalars['uuid']['output'];
};

/** aggregated selection of "galactic_empire_quest" */
export type Galactic_Empire_Quest_Aggregate = {
  __typename?: 'galactic_empire_quest_aggregate';
  aggregate?: Maybe<Galactic_Empire_Quest_Aggregate_Fields>;
  nodes: Array<Galactic_Empire_Quest>;
};

export type Galactic_Empire_Quest_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Galactic_Empire_Quest_Aggregate_Bool_Exp_Count>;
};

export type Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_And = {
  arguments: Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Galactic_Empire_Quest_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "galactic_empire_quest" */
export type Galactic_Empire_Quest_Aggregate_Fields = {
  __typename?: 'galactic_empire_quest_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Galactic_Empire_Quest_Max_Fields>;
  min?: Maybe<Galactic_Empire_Quest_Min_Fields>;
};


/** aggregate fields of "galactic_empire_quest" */
export type Galactic_Empire_Quest_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_step_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Galactic_Empire_Quest_Max_Fields = {
  __typename?: 'galactic_empire_quest_max_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  quest_id?: Maybe<Scalars['uuid']['output']>;
  quest_step_id?: Maybe<Scalars['uuid']['output']>;
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
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  quest_id?: Maybe<Scalars['uuid']['output']>;
  quest_step_id?: Maybe<Scalars['uuid']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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

/** select "galactic_empire_quest_aggregate_bool_exp_bool_and_arguments_columns" columns of table "galactic_empire_quest" */
export enum Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Completed = 'completed'
}

/** select "galactic_empire_quest_aggregate_bool_exp_bool_or_arguments_columns" columns of table "galactic_empire_quest" */
export enum Galactic_Empire_Quest_Select_Column_Galactic_Empire_Quest_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Completed = 'completed'
}

/** input type for updating data in table "galactic_empire_quest" */
export type Galactic_Empire_Quest_Set_Input = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_step_id?: InputMaybe<Scalars['uuid']['input']>;
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
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_step_id?: InputMaybe<Scalars['uuid']['input']>;
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
  /** filter the rows which have to be updated */
  where: Galactic_Empire_Quest_Bool_Exp;
};

/** columns and relationships of "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator = {
  __typename?: 'galactic_empire_resource_generator';
  count: Scalars['numeric']['output'];
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  galactic_empire: Galactic_Empire;
  galactic_empire_id: Scalars['uuid']['output'];
  generator_type_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  planet_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  resource_generator: Resource_Generator;
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_Aggregate = {
  __typename?: 'galactic_empire_resource_generator_aggregate';
  aggregate?: Maybe<Galactic_Empire_Resource_Generator_Aggregate_Fields>;
  nodes: Array<Galactic_Empire_Resource_Generator>;
};

/** aggregate fields of "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_Aggregate_Fields = {
  __typename?: 'galactic_empire_resource_generator_aggregate_fields';
  avg?: Maybe<Galactic_Empire_Resource_Generator_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Galactic_Empire_Resource_Generator_Max_Fields>;
  min?: Maybe<Galactic_Empire_Resource_Generator_Min_Fields>;
  stddev?: Maybe<Galactic_Empire_Resource_Generator_Stddev_Fields>;
  stddev_pop?: Maybe<Galactic_Empire_Resource_Generator_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Galactic_Empire_Resource_Generator_Stddev_Samp_Fields>;
  sum?: Maybe<Galactic_Empire_Resource_Generator_Sum_Fields>;
  var_pop?: Maybe<Galactic_Empire_Resource_Generator_Var_Pop_Fields>;
  var_samp?: Maybe<Galactic_Empire_Resource_Generator_Var_Samp_Fields>;
  variance?: Maybe<Galactic_Empire_Resource_Generator_Variance_Fields>;
};


/** aggregate fields of "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Galactic_Empire_Resource_Generator_Avg_Fields = {
  __typename?: 'galactic_empire_resource_generator_avg_fields';
  count?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "galactic_empire_resource_generator". All fields are combined with a logical 'AND'. */
export type Galactic_Empire_Resource_Generator_Bool_Exp = {
  _and?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Bool_Exp>>;
  _not?: InputMaybe<Galactic_Empire_Resource_Generator_Bool_Exp>;
  _or?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Bool_Exp>>;
  count?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  galactic_empire?: InputMaybe<Galactic_Empire_Bool_Exp>;
  galactic_empire_id?: InputMaybe<Uuid_Comparison_Exp>;
  generator_type_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  planet_id?: InputMaybe<Uuid_Comparison_Exp>;
  resource_generator?: InputMaybe<Resource_Generator_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "galactic_empire_resource_generator" */
export enum Galactic_Empire_Resource_Generator_Constraint {
  /** unique or primary key constraint on columns "id" */
  ResourceGeneratorPkey = 'resource_generator_pkey'
}

/** input type for incrementing numeric columns in table "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_Inc_Input = {
  count?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_Insert_Input = {
  count?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  generator_type_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  planet_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_generator?: InputMaybe<Resource_Generator_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Galactic_Empire_Resource_Generator_Max_Fields = {
  __typename?: 'galactic_empire_resource_generator_max_fields';
  count?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  generator_type_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  planet_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Galactic_Empire_Resource_Generator_Min_Fields = {
  __typename?: 'galactic_empire_resource_generator_min_fields';
  count?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  generator_type_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  planet_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_Mutation_Response = {
  __typename?: 'galactic_empire_resource_generator_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Galactic_Empire_Resource_Generator>;
};

/** on_conflict condition type for table "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_On_Conflict = {
  constraint: Galactic_Empire_Resource_Generator_Constraint;
  update_columns?: Array<Galactic_Empire_Resource_Generator_Update_Column>;
  where?: InputMaybe<Galactic_Empire_Resource_Generator_Bool_Exp>;
};

/** Ordering options when selecting data from "galactic_empire_resource_generator". */
export type Galactic_Empire_Resource_Generator_Order_By = {
  count?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  galactic_empire?: InputMaybe<Galactic_Empire_Order_By>;
  galactic_empire_id?: InputMaybe<Order_By>;
  generator_type_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  planet_id?: InputMaybe<Order_By>;
  resource_generator?: InputMaybe<Resource_Generator_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: galactic_empire_resource_generator */
export type Galactic_Empire_Resource_Generator_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "galactic_empire_resource_generator" */
export enum Galactic_Empire_Resource_Generator_Select_Column {
  /** column name */
  Count = 'count',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  GeneratorTypeId = 'generator_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  PlanetId = 'planet_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_Set_Input = {
  count?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  generator_type_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  planet_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Galactic_Empire_Resource_Generator_Stddev_Fields = {
  __typename?: 'galactic_empire_resource_generator_stddev_fields';
  count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Galactic_Empire_Resource_Generator_Stddev_Pop_Fields = {
  __typename?: 'galactic_empire_resource_generator_stddev_pop_fields';
  count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Galactic_Empire_Resource_Generator_Stddev_Samp_Fields = {
  __typename?: 'galactic_empire_resource_generator_stddev_samp_fields';
  count?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "galactic_empire_resource_generator" */
export type Galactic_Empire_Resource_Generator_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Galactic_Empire_Resource_Generator_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Galactic_Empire_Resource_Generator_Stream_Cursor_Value_Input = {
  count?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  generator_type_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  planet_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Galactic_Empire_Resource_Generator_Sum_Fields = {
  __typename?: 'galactic_empire_resource_generator_sum_fields';
  count?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "galactic_empire_resource_generator" */
export enum Galactic_Empire_Resource_Generator_Update_Column {
  /** column name */
  Count = 'count',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GalacticEmpireId = 'galactic_empire_id',
  /** column name */
  GeneratorTypeId = 'generator_type_id',
  /** column name */
  Id = 'id',
  /** column name */
  PlanetId = 'planet_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Galactic_Empire_Resource_Generator_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Galactic_Empire_Resource_Generator_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Galactic_Empire_Resource_Generator_Set_Input>;
  /** filter the rows which have to be updated */
  where: Galactic_Empire_Resource_Generator_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Galactic_Empire_Resource_Generator_Var_Pop_Fields = {
  __typename?: 'galactic_empire_resource_generator_var_pop_fields';
  count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Galactic_Empire_Resource_Generator_Var_Samp_Fields = {
  __typename?: 'galactic_empire_resource_generator_var_samp_fields';
  count?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Galactic_Empire_Resource_Generator_Variance_Fields = {
  __typename?: 'galactic_empire_resource_generator_variance_fields';
  count?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "galactic_empire_resources" */
export type Galactic_Empire_Resources = {
  __typename?: 'galactic_empire_resources';
  /** An object relationship */
  galactic_empire: Galactic_Empire;
  galactic_empire_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  resource_type: Resource_Type;
  resource_type_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
  value: Scalars['Int']['output'];
};

/** aggregated selection of "galactic_empire_resources" */
export type Galactic_Empire_Resources_Aggregate = {
  __typename?: 'galactic_empire_resources_aggregate';
  aggregate?: Maybe<Galactic_Empire_Resources_Aggregate_Fields>;
  nodes: Array<Galactic_Empire_Resources>;
};

export type Galactic_Empire_Resources_Aggregate_Bool_Exp = {
  count?: InputMaybe<Galactic_Empire_Resources_Aggregate_Bool_Exp_Count>;
};

export type Galactic_Empire_Resources_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "galactic_empire_resources" */
export type Galactic_Empire_Resources_Aggregate_Fields = {
  __typename?: 'galactic_empire_resources_aggregate_fields';
  avg?: Maybe<Galactic_Empire_Resources_Avg_Fields>;
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  value?: Maybe<Scalars['Float']['output']>;
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
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Insert_Input = {
  galactic_empire?: InputMaybe<Galactic_Empire_Obj_Rel_Insert_Input>;
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  resource_type?: InputMaybe<Resource_Type_Obj_Rel_Insert_Input>;
  resource_type_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Galactic_Empire_Resources_Max_Fields = {
  __typename?: 'galactic_empire_resources_max_fields';
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  resource_type_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
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
  galactic_empire_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  resource_type_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  value?: Maybe<Scalars['Int']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  resource_type_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Galactic_Empire_Resources_Stddev_Fields = {
  __typename?: 'galactic_empire_resources_stddev_fields';
  value?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Stddev_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Galactic_Empire_Resources_Stddev_Pop_Fields = {
  __typename?: 'galactic_empire_resources_stddev_pop_fields';
  value?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Stddev_Pop_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Galactic_Empire_Resources_Stddev_Samp_Fields = {
  __typename?: 'galactic_empire_resources_stddev_samp_fields';
  value?: Maybe<Scalars['Float']['output']>;
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
  galactic_empire_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  resource_type_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Galactic_Empire_Resources_Sum_Fields = {
  __typename?: 'galactic_empire_resources_sum_fields';
  value?: Maybe<Scalars['Int']['output']>;
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
  /** filter the rows which have to be updated */
  where: Galactic_Empire_Resources_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Galactic_Empire_Resources_Var_Pop_Fields = {
  __typename?: 'galactic_empire_resources_var_pop_fields';
  value?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Var_Pop_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Galactic_Empire_Resources_Var_Samp_Fields = {
  __typename?: 'galactic_empire_resources_var_samp_fields';
  value?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "galactic_empire_resources" */
export type Galactic_Empire_Resources_Var_Samp_Order_By = {
  value?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Galactic_Empire_Resources_Variance_Fields = {
  __typename?: 'galactic_empire_resources_variance_fields';
  value?: Maybe<Scalars['Float']['output']>;
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
  background_id?: InputMaybe<Scalars['uuid']['input']>;
  celestial_claims?: InputMaybe<Scalars['Int']['input']>;
  faction_id?: InputMaybe<Scalars['uuid']['input']>;
  galaxy_id?: InputMaybe<Scalars['uuid']['input']>;
  homeworld_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  playable_race_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Galactic_Empire_Stddev_Fields = {
  __typename?: 'galactic_empire_stddev_fields';
  celestial_claims?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "galactic_empire" */
export type Galactic_Empire_Stddev_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Galactic_Empire_Stddev_Pop_Fields = {
  __typename?: 'galactic_empire_stddev_pop_fields';
  celestial_claims?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "galactic_empire" */
export type Galactic_Empire_Stddev_Pop_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Galactic_Empire_Stddev_Samp_Fields = {
  __typename?: 'galactic_empire_stddev_samp_fields';
  celestial_claims?: Maybe<Scalars['Float']['output']>;
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
  background_id?: InputMaybe<Scalars['uuid']['input']>;
  celestial_claims?: InputMaybe<Scalars['Int']['input']>;
  faction_id?: InputMaybe<Scalars['uuid']['input']>;
  galaxy_id?: InputMaybe<Scalars['uuid']['input']>;
  homeworld_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  playable_race_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Galactic_Empire_Sum_Fields = {
  __typename?: 'galactic_empire_sum_fields';
  celestial_claims?: Maybe<Scalars['Int']['output']>;
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
  /** filter the rows which have to be updated */
  where: Galactic_Empire_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Galactic_Empire_Var_Pop_Fields = {
  __typename?: 'galactic_empire_var_pop_fields';
  celestial_claims?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "galactic_empire" */
export type Galactic_Empire_Var_Pop_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Galactic_Empire_Var_Samp_Fields = {
  __typename?: 'galactic_empire_var_samp_fields';
  celestial_claims?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "galactic_empire" */
export type Galactic_Empire_Var_Samp_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Galactic_Empire_Variance_Fields = {
  __typename?: 'galactic_empire_variance_fields';
  celestial_claims?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "galactic_empire" */
export type Galactic_Empire_Variance_Order_By = {
  celestial_claims?: InputMaybe<Order_By>;
};

/** columns and relationships of "galaxy" */
export type Galaxy = {
  __typename?: 'galaxy';
  arm_width: Scalars['numeric']['output'];
  arms: Scalars['numeric']['output'];
  /** An array relationship */
  celestials: Array<Celestial>;
  /** An aggregate relationship */
  celestials_aggregate: Celestial_Aggregate;
  core_concentration_factor: Scalars['numeric']['output'];
  core_radius_factor: Scalars['numeric']['output'];
  curvature: Scalars['numeric']['output'];
  /** An array relationship */
  galactic_empires: Array<Galactic_Empire>;
  /** An aggregate relationship */
  galactic_empires_aggregate: Galactic_Empire_Aggregate;
  id: Scalars['uuid']['output'];
  name?: Maybe<Scalars['String']['output']>;
  radius: Scalars['Int']['output'];
  stars: Scalars['Int']['output'];
};


/** columns and relationships of "galaxy" */
export type GalaxyCelestialsArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "galaxy" */
export type GalaxyCelestials_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "galaxy" */
export type GalaxyGalactic_EmpiresArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


/** columns and relationships of "galaxy" */
export type GalaxyGalactic_Empires_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Galaxy_Avg_Fields = {
  __typename?: 'galaxy_avg_fields';
  arm_width?: Maybe<Scalars['Float']['output']>;
  arms?: Maybe<Scalars['Float']['output']>;
  core_concentration_factor?: Maybe<Scalars['Float']['output']>;
  core_radius_factor?: Maybe<Scalars['Float']['output']>;
  curvature?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  stars?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "galaxy". All fields are combined with a logical 'AND'. */
export type Galaxy_Bool_Exp = {
  _and?: InputMaybe<Array<Galaxy_Bool_Exp>>;
  _not?: InputMaybe<Galaxy_Bool_Exp>;
  _or?: InputMaybe<Array<Galaxy_Bool_Exp>>;
  arm_width?: InputMaybe<Numeric_Comparison_Exp>;
  arms?: InputMaybe<Numeric_Comparison_Exp>;
  celestials?: InputMaybe<Celestial_Bool_Exp>;
  celestials_aggregate?: InputMaybe<Celestial_Aggregate_Bool_Exp>;
  core_concentration_factor?: InputMaybe<Numeric_Comparison_Exp>;
  core_radius_factor?: InputMaybe<Numeric_Comparison_Exp>;
  curvature?: InputMaybe<Numeric_Comparison_Exp>;
  galactic_empires?: InputMaybe<Galactic_Empire_Bool_Exp>;
  galactic_empires_aggregate?: InputMaybe<Galactic_Empire_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  radius?: InputMaybe<Int_Comparison_Exp>;
  stars?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "galaxy" */
export enum Galaxy_Constraint {
  /** unique or primary key constraint on columns "name" */
  GalaxyNameKey = 'galaxy_name_key',
  /** unique or primary key constraint on columns "id" */
  GalaxyPkey = 'galaxy_pkey'
}

/** input type for incrementing numeric columns in table "galaxy" */
export type Galaxy_Inc_Input = {
  arm_width?: InputMaybe<Scalars['numeric']['input']>;
  arms?: InputMaybe<Scalars['numeric']['input']>;
  core_concentration_factor?: InputMaybe<Scalars['numeric']['input']>;
  core_radius_factor?: InputMaybe<Scalars['numeric']['input']>;
  curvature?: InputMaybe<Scalars['numeric']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "galaxy" */
export type Galaxy_Insert_Input = {
  arm_width?: InputMaybe<Scalars['numeric']['input']>;
  arms?: InputMaybe<Scalars['numeric']['input']>;
  celestials?: InputMaybe<Celestial_Arr_Rel_Insert_Input>;
  core_concentration_factor?: InputMaybe<Scalars['numeric']['input']>;
  core_radius_factor?: InputMaybe<Scalars['numeric']['input']>;
  curvature?: InputMaybe<Scalars['numeric']['input']>;
  galactic_empires?: InputMaybe<Galactic_Empire_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Galaxy_Max_Fields = {
  __typename?: 'galaxy_max_fields';
  arm_width?: Maybe<Scalars['numeric']['output']>;
  arms?: Maybe<Scalars['numeric']['output']>;
  core_concentration_factor?: Maybe<Scalars['numeric']['output']>;
  core_radius_factor?: Maybe<Scalars['numeric']['output']>;
  curvature?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  stars?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Galaxy_Min_Fields = {
  __typename?: 'galaxy_min_fields';
  arm_width?: Maybe<Scalars['numeric']['output']>;
  arms?: Maybe<Scalars['numeric']['output']>;
  core_concentration_factor?: Maybe<Scalars['numeric']['output']>;
  core_radius_factor?: Maybe<Scalars['numeric']['output']>;
  curvature?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  stars?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "galaxy" */
export type Galaxy_Mutation_Response = {
  __typename?: 'galaxy_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  arm_width?: InputMaybe<Scalars['numeric']['input']>;
  arms?: InputMaybe<Scalars['numeric']['input']>;
  core_concentration_factor?: InputMaybe<Scalars['numeric']['input']>;
  core_radius_factor?: InputMaybe<Scalars['numeric']['input']>;
  curvature?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Galaxy_Stddev_Fields = {
  __typename?: 'galaxy_stddev_fields';
  arm_width?: Maybe<Scalars['Float']['output']>;
  arms?: Maybe<Scalars['Float']['output']>;
  core_concentration_factor?: Maybe<Scalars['Float']['output']>;
  core_radius_factor?: Maybe<Scalars['Float']['output']>;
  curvature?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  stars?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Galaxy_Stddev_Pop_Fields = {
  __typename?: 'galaxy_stddev_pop_fields';
  arm_width?: Maybe<Scalars['Float']['output']>;
  arms?: Maybe<Scalars['Float']['output']>;
  core_concentration_factor?: Maybe<Scalars['Float']['output']>;
  core_radius_factor?: Maybe<Scalars['Float']['output']>;
  curvature?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  stars?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Galaxy_Stddev_Samp_Fields = {
  __typename?: 'galaxy_stddev_samp_fields';
  arm_width?: Maybe<Scalars['Float']['output']>;
  arms?: Maybe<Scalars['Float']['output']>;
  core_concentration_factor?: Maybe<Scalars['Float']['output']>;
  core_radius_factor?: Maybe<Scalars['Float']['output']>;
  curvature?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  stars?: Maybe<Scalars['Float']['output']>;
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
  arm_width?: InputMaybe<Scalars['numeric']['input']>;
  arms?: InputMaybe<Scalars['numeric']['input']>;
  core_concentration_factor?: InputMaybe<Scalars['numeric']['input']>;
  core_radius_factor?: InputMaybe<Scalars['numeric']['input']>;
  curvature?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  stars?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Galaxy_Sum_Fields = {
  __typename?: 'galaxy_sum_fields';
  arm_width?: Maybe<Scalars['numeric']['output']>;
  arms?: Maybe<Scalars['numeric']['output']>;
  core_concentration_factor?: Maybe<Scalars['numeric']['output']>;
  core_radius_factor?: Maybe<Scalars['numeric']['output']>;
  curvature?: Maybe<Scalars['numeric']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  stars?: Maybe<Scalars['Int']['output']>;
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
  /** filter the rows which have to be updated */
  where: Galaxy_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Galaxy_Var_Pop_Fields = {
  __typename?: 'galaxy_var_pop_fields';
  arm_width?: Maybe<Scalars['Float']['output']>;
  arms?: Maybe<Scalars['Float']['output']>;
  core_concentration_factor?: Maybe<Scalars['Float']['output']>;
  core_radius_factor?: Maybe<Scalars['Float']['output']>;
  curvature?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  stars?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Galaxy_Var_Samp_Fields = {
  __typename?: 'galaxy_var_samp_fields';
  arm_width?: Maybe<Scalars['Float']['output']>;
  arms?: Maybe<Scalars['Float']['output']>;
  core_concentration_factor?: Maybe<Scalars['Float']['output']>;
  core_radius_factor?: Maybe<Scalars['Float']['output']>;
  curvature?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  stars?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Galaxy_Variance_Fields = {
  __typename?: 'galaxy_variance_fields';
  arm_width?: Maybe<Scalars['Float']['output']>;
  arms?: Maybe<Scalars['Float']['output']>;
  core_concentration_factor?: Maybe<Scalars['Float']['output']>;
  core_radius_factor?: Maybe<Scalars['Float']['output']>;
  curvature?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  stars?: Maybe<Scalars['Float']['output']>;
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
  /** delete data from the table: "galactic_empire_resource_generator" */
  delete_galactic_empire_resource_generator?: Maybe<Galactic_Empire_Resource_Generator_Mutation_Response>;
  /** delete single row from the table: "galactic_empire_resource_generator" */
  delete_galactic_empire_resource_generator_by_pk?: Maybe<Galactic_Empire_Resource_Generator>;
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
  /** delete data from the table: "resource_type" */
  delete_resource_type?: Maybe<Resource_Type_Mutation_Response>;
  /** delete single row from the table: "resource_type" */
  delete_resource_type_by_pk?: Maybe<Resource_Type>;
  /** delete data from the table: "technology" */
  delete_technology?: Maybe<Technology_Mutation_Response>;
  /** delete single row from the table: "technology" */
  delete_technology_by_pk?: Maybe<Technology>;
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
  /** insert data into the table: "galactic_empire_resource_generator" */
  insert_galactic_empire_resource_generator?: Maybe<Galactic_Empire_Resource_Generator_Mutation_Response>;
  /** insert a single row into the table: "galactic_empire_resource_generator" */
  insert_galactic_empire_resource_generator_one?: Maybe<Galactic_Empire_Resource_Generator>;
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
  /** insert data into the table: "resource_type" */
  insert_resource_type?: Maybe<Resource_Type_Mutation_Response>;
  /** insert a single row into the table: "resource_type" */
  insert_resource_type_one?: Maybe<Resource_Type>;
  /** insert data into the table: "technology" */
  insert_technology?: Maybe<Technology_Mutation_Response>;
  /** insert a single row into the table: "technology" */
  insert_technology_one?: Maybe<Technology>;
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
  purchaseResourceGenerator?: Maybe<PurchaseCompletion>;
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
  /** update data of the table: "galactic_empire_resource_generator" */
  update_galactic_empire_resource_generator?: Maybe<Galactic_Empire_Resource_Generator_Mutation_Response>;
  /** update single row of the table: "galactic_empire_resource_generator" */
  update_galactic_empire_resource_generator_by_pk?: Maybe<Galactic_Empire_Resource_Generator>;
  /** update multiples rows of table: "galactic_empire_resource_generator" */
  update_galactic_empire_resource_generator_many?: Maybe<Array<Maybe<Galactic_Empire_Resource_Generator_Mutation_Response>>>;
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
  /** update data of the table: "resource_type" */
  update_resource_type?: Maybe<Resource_Type_Mutation_Response>;
  /** update single row of the table: "resource_type" */
  update_resource_type_by_pk?: Maybe<Resource_Type>;
  /** update multiples rows of table: "resource_type" */
  update_resource_type_many?: Maybe<Array<Maybe<Resource_Type_Mutation_Response>>>;
  /** update data of the table: "technology" */
  update_technology?: Maybe<Technology_Mutation_Response>;
  /** update single row of the table: "technology" */
  update_technology_by_pk?: Maybe<Technology>;
  /** update multiples rows of table: "technology" */
  update_technology_many?: Maybe<Array<Maybe<Technology_Mutation_Response>>>;
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
  empire_quest_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootCreateEmpireOriginCelestialArgs = {
  galactic_empire_id: Scalars['String']['input'];
  galaxy_id: Scalars['String']['input'];
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
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_CelestialArgs = {
  where: Celestial_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Celestial_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Chat_MessageArgs = {
  where: Chat_Message_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_Message_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FactionArgs = {
  where: Faction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Faction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_EmpireArgs = {
  where: Galactic_Empire_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_NpcArgs = {
  where: Galactic_Empire_Npc_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_Npc_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_QuestArgs = {
  where: Galactic_Empire_Quest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_Quest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_Resource_GeneratorArgs = {
  where: Galactic_Empire_Resource_Generator_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_Resource_Generator_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_ResourcesArgs = {
  where: Galactic_Empire_Resources_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galactic_Empire_Resources_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_GalaxyArgs = {
  where: Galaxy_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Galaxy_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_NpcArgs = {
  where: Npc_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Npc_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PlanetArgs = {
  where: Planet_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Planet_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Planetary_RingArgs = {
  where: Planetary_Ring_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Planetary_Ring_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Playable_RaceArgs = {
  where: Playable_Race_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Playable_Race_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_QuestArgs = {
  where: Quest_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_RewardArgs = {
  where: Quest_Reward_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Reward_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_Reward_TypeArgs = {
  where: Quest_Reward_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Reward_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_StepArgs = {
  where: Quest_Step_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Step_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_Step_TypeArgs = {
  where: Quest_Step_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Step_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Quest_TypeArgs = {
  where: Quest_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Quest_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Resource_GeneratorArgs = {
  where: Resource_Generator_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Resource_Generator_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Resource_TypeArgs = {
  where: Resource_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Resource_Type_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TechnologyArgs = {
  where: Technology_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Technology_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Terrain_Hex_PaletteArgs = {
  where: Terrain_Hex_Palette_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Terrain_Hex_Palette_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_InfoArgs = {
  where: User_Info_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Info_By_PkArgs = {
  id: Scalars['String']['input'];
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
export type Mutation_RootInsert_Galactic_Empire_Resource_GeneratorArgs = {
  objects: Array<Galactic_Empire_Resource_Generator_Insert_Input>;
  on_conflict?: InputMaybe<Galactic_Empire_Resource_Generator_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Galactic_Empire_Resource_Generator_OneArgs = {
  object: Galactic_Empire_Resource_Generator_Insert_Input;
  on_conflict?: InputMaybe<Galactic_Empire_Resource_Generator_On_Conflict>;
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
export type Mutation_RootInsert_TechnologyArgs = {
  objects: Array<Technology_Insert_Input>;
  on_conflict?: InputMaybe<Technology_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Technology_OneArgs = {
  object: Technology_Insert_Input;
  on_conflict?: InputMaybe<Technology_On_Conflict>;
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
  empire_quest_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootPurchaseResourceGeneratorArgs = {
  galactic_empire_id: Scalars['String']['input'];
  generator_type_id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootSetDisplayNameArgs = {
  display_name: Scalars['String']['input'];
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
export type Mutation_RootUpdate_Galactic_Empire_Resource_GeneratorArgs = {
  _inc?: InputMaybe<Galactic_Empire_Resource_Generator_Inc_Input>;
  _set?: InputMaybe<Galactic_Empire_Resource_Generator_Set_Input>;
  where: Galactic_Empire_Resource_Generator_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_Resource_Generator_By_PkArgs = {
  _inc?: InputMaybe<Galactic_Empire_Resource_Generator_Inc_Input>;
  _set?: InputMaybe<Galactic_Empire_Resource_Generator_Set_Input>;
  pk_columns: Galactic_Empire_Resource_Generator_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Galactic_Empire_Resource_Generator_ManyArgs = {
  updates: Array<Galactic_Empire_Resource_Generator_Updates>;
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
  _inc?: InputMaybe<Resource_Generator_Inc_Input>;
  _set?: InputMaybe<Resource_Generator_Set_Input>;
  where: Resource_Generator_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Generator_By_PkArgs = {
  _inc?: InputMaybe<Resource_Generator_Inc_Input>;
  _set?: InputMaybe<Resource_Generator_Set_Input>;
  pk_columns: Resource_Generator_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Generator_ManyArgs = {
  updates: Array<Resource_Generator_Updates>;
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
export type Mutation_RootUpdate_TechnologyArgs = {
  _inc?: InputMaybe<Technology_Inc_Input>;
  _set?: InputMaybe<Technology_Set_Input>;
  where: Technology_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Technology_By_PkArgs = {
  _inc?: InputMaybe<Technology_Inc_Input>;
  _set?: InputMaybe<Technology_Set_Input>;
  pk_columns: Technology_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Technology_ManyArgs = {
  updates: Array<Technology_Updates>;
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
  faction_id?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  image_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  playable_race?: Maybe<Playable_Race>;
  race_id?: Maybe<Scalars['uuid']['output']>;
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
  count: Scalars['Int']['output'];
  max?: Maybe<Npc_Max_Fields>;
  min?: Maybe<Npc_Min_Fields>;
};


/** aggregate fields of "npc" */
export type Npc_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Npc_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  faction_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  playable_race?: InputMaybe<Playable_Race_Obj_Rel_Insert_Input>;
  race_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Npc_Max_Fields = {
  __typename?: 'npc_max_fields';
  faction_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  race_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Npc_Min_Fields = {
  __typename?: 'npc_min_fields';
  faction_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  race_id?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "npc" */
export type Npc_Mutation_Response = {
  __typename?: 'npc_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  faction_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  race_id?: InputMaybe<Scalars['uuid']['input']>;
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
  faction_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  race_id?: InputMaybe<Scalars['uuid']['input']>;
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
  /** filter the rows which have to be updated */
  where: Npc_Bool_Exp;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
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
  atmospheric_distance: Scalars['numeric']['output'];
  /** An object relationship */
  celestial: Celestial;
  celestial_id: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  owner_id: Scalars['String']['output'];
  radius: Scalars['numeric']['output'];
  /** An array relationship */
  rings: Array<Planetary_Ring>;
  /** An aggregate relationship */
  rings_aggregate: Planetary_Ring_Aggregate;
  terrain_bias: Scalars['_numeric']['output'];
  /** An object relationship */
  terrain_hex_palette: Terrain_Hex_Palette;
  terrain_hex_palette_id: Scalars['uuid']['output'];
  texture_resolution: Scalars['Int']['output'];
  /** An object relationship */
  user_info?: Maybe<User_Info>;
};


/** columns and relationships of "planet" */
export type PlanetRingsArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


/** columns and relationships of "planet" */
export type PlanetRings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};

/** aggregated selection of "planet" */
export type Planet_Aggregate = {
  __typename?: 'planet_aggregate';
  aggregate?: Maybe<Planet_Aggregate_Fields>;
  nodes: Array<Planet>;
};

export type Planet_Aggregate_Bool_Exp = {
  count?: InputMaybe<Planet_Aggregate_Bool_Exp_Count>;
};

export type Planet_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Planet_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Planet_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "planet" */
export type Planet_Aggregate_Fields = {
  __typename?: 'planet_aggregate_fields';
  avg?: Maybe<Planet_Avg_Fields>;
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  atmospheric_distance?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  texture_resolution?: Maybe<Scalars['Float']['output']>;
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
  rings_aggregate?: InputMaybe<Planetary_Ring_Aggregate_Bool_Exp>;
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
  atmospheric_distance?: InputMaybe<Scalars['numeric']['input']>;
  radius?: InputMaybe<Scalars['numeric']['input']>;
  texture_resolution?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "planet" */
export type Planet_Insert_Input = {
  atmospheric_distance?: InputMaybe<Scalars['numeric']['input']>;
  celestial?: InputMaybe<Celestial_Obj_Rel_Insert_Input>;
  celestial_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['numeric']['input']>;
  rings?: InputMaybe<Planetary_Ring_Arr_Rel_Insert_Input>;
  terrain_bias?: InputMaybe<Scalars['_numeric']['input']>;
  terrain_hex_palette?: InputMaybe<Terrain_Hex_Palette_Obj_Rel_Insert_Input>;
  terrain_hex_palette_id?: InputMaybe<Scalars['uuid']['input']>;
  texture_resolution?: InputMaybe<Scalars['Int']['input']>;
  user_info?: InputMaybe<User_Info_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Planet_Max_Fields = {
  __typename?: 'planet_max_fields';
  atmospheric_distance?: Maybe<Scalars['numeric']['output']>;
  celestial_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
  radius?: Maybe<Scalars['numeric']['output']>;
  terrain_hex_palette_id?: Maybe<Scalars['uuid']['output']>;
  texture_resolution?: Maybe<Scalars['Int']['output']>;
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
  atmospheric_distance?: Maybe<Scalars['numeric']['output']>;
  celestial_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner_id?: Maybe<Scalars['String']['output']>;
  radius?: Maybe<Scalars['numeric']['output']>;
  terrain_hex_palette_id?: Maybe<Scalars['uuid']['output']>;
  texture_resolution?: Maybe<Scalars['Int']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  atmospheric_distance?: InputMaybe<Scalars['numeric']['input']>;
  celestial_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['numeric']['input']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']['input']>;
  terrain_hex_palette_id?: InputMaybe<Scalars['uuid']['input']>;
  texture_resolution?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Planet_Stddev_Fields = {
  __typename?: 'planet_stddev_fields';
  atmospheric_distance?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  texture_resolution?: Maybe<Scalars['Float']['output']>;
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
  atmospheric_distance?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  texture_resolution?: Maybe<Scalars['Float']['output']>;
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
  atmospheric_distance?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  texture_resolution?: Maybe<Scalars['Float']['output']>;
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
  atmospheric_distance?: InputMaybe<Scalars['numeric']['input']>;
  celestial_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner_id?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['numeric']['input']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']['input']>;
  terrain_hex_palette_id?: InputMaybe<Scalars['uuid']['input']>;
  texture_resolution?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Planet_Sum_Fields = {
  __typename?: 'planet_sum_fields';
  atmospheric_distance?: Maybe<Scalars['numeric']['output']>;
  radius?: Maybe<Scalars['numeric']['output']>;
  texture_resolution?: Maybe<Scalars['Int']['output']>;
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
  /** filter the rows which have to be updated */
  where: Planet_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Planet_Var_Pop_Fields = {
  __typename?: 'planet_var_pop_fields';
  atmospheric_distance?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  texture_resolution?: Maybe<Scalars['Float']['output']>;
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
  atmospheric_distance?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  texture_resolution?: Maybe<Scalars['Float']['output']>;
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
  atmospheric_distance?: Maybe<Scalars['Float']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  texture_resolution?: Maybe<Scalars['Float']['output']>;
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
  colors: Scalars['_text']['output'];
  id: Scalars['uuid']['output'];
  inner_radius: Scalars['numeric']['output'];
  outer_radius: Scalars['numeric']['output'];
  resolution: Scalars['Int']['output'];
  rotation: Scalars['_numeric']['output'];
  terrain_bias: Scalars['_numeric']['output'];
  type: Scalars['String']['output'];
};

/** aggregated selection of "planetary_ring" */
export type Planetary_Ring_Aggregate = {
  __typename?: 'planetary_ring_aggregate';
  aggregate?: Maybe<Planetary_Ring_Aggregate_Fields>;
  nodes: Array<Planetary_Ring>;
};

export type Planetary_Ring_Aggregate_Bool_Exp = {
  count?: InputMaybe<Planetary_Ring_Aggregate_Bool_Exp_Count>;
};

export type Planetary_Ring_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Planetary_Ring_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "planetary_ring" */
export type Planetary_Ring_Aggregate_Fields = {
  __typename?: 'planetary_ring_aggregate_fields';
  avg?: Maybe<Planetary_Ring_Avg_Fields>;
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  inner_radius?: Maybe<Scalars['Float']['output']>;
  outer_radius?: Maybe<Scalars['Float']['output']>;
  resolution?: Maybe<Scalars['Float']['output']>;
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
  inner_radius?: InputMaybe<Scalars['numeric']['input']>;
  outer_radius?: InputMaybe<Scalars['numeric']['input']>;
  resolution?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "planetary_ring" */
export type Planetary_Ring_Insert_Input = {
  colors?: InputMaybe<Scalars['_text']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  inner_radius?: InputMaybe<Scalars['numeric']['input']>;
  outer_radius?: InputMaybe<Scalars['numeric']['input']>;
  resolution?: InputMaybe<Scalars['Int']['input']>;
  rotation?: InputMaybe<Scalars['_numeric']['input']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Planetary_Ring_Max_Fields = {
  __typename?: 'planetary_ring_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  inner_radius?: Maybe<Scalars['numeric']['output']>;
  outer_radius?: Maybe<Scalars['numeric']['output']>;
  resolution?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
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
  id?: Maybe<Scalars['uuid']['output']>;
  inner_radius?: Maybe<Scalars['numeric']['output']>;
  outer_radius?: Maybe<Scalars['numeric']['output']>;
  resolution?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  colors?: InputMaybe<Scalars['_text']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  inner_radius?: InputMaybe<Scalars['numeric']['input']>;
  outer_radius?: InputMaybe<Scalars['numeric']['input']>;
  resolution?: InputMaybe<Scalars['Int']['input']>;
  rotation?: InputMaybe<Scalars['_numeric']['input']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Planetary_Ring_Stddev_Fields = {
  __typename?: 'planetary_ring_stddev_fields';
  inner_radius?: Maybe<Scalars['Float']['output']>;
  outer_radius?: Maybe<Scalars['Float']['output']>;
  resolution?: Maybe<Scalars['Float']['output']>;
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
  inner_radius?: Maybe<Scalars['Float']['output']>;
  outer_radius?: Maybe<Scalars['Float']['output']>;
  resolution?: Maybe<Scalars['Float']['output']>;
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
  inner_radius?: Maybe<Scalars['Float']['output']>;
  outer_radius?: Maybe<Scalars['Float']['output']>;
  resolution?: Maybe<Scalars['Float']['output']>;
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
  colors?: InputMaybe<Scalars['_text']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  inner_radius?: InputMaybe<Scalars['numeric']['input']>;
  outer_radius?: InputMaybe<Scalars['numeric']['input']>;
  resolution?: InputMaybe<Scalars['Int']['input']>;
  rotation?: InputMaybe<Scalars['_numeric']['input']>;
  terrain_bias?: InputMaybe<Scalars['_numeric']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Planetary_Ring_Sum_Fields = {
  __typename?: 'planetary_ring_sum_fields';
  inner_radius?: Maybe<Scalars['numeric']['output']>;
  outer_radius?: Maybe<Scalars['numeric']['output']>;
  resolution?: Maybe<Scalars['Int']['output']>;
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
  /** filter the rows which have to be updated */
  where: Planetary_Ring_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Planetary_Ring_Var_Pop_Fields = {
  __typename?: 'planetary_ring_var_pop_fields';
  inner_radius?: Maybe<Scalars['Float']['output']>;
  outer_radius?: Maybe<Scalars['Float']['output']>;
  resolution?: Maybe<Scalars['Float']['output']>;
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
  inner_radius?: Maybe<Scalars['Float']['output']>;
  outer_radius?: Maybe<Scalars['Float']['output']>;
  resolution?: Maybe<Scalars['Float']['output']>;
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
  inner_radius?: Maybe<Scalars['Float']['output']>;
  outer_radius?: Maybe<Scalars['Float']['output']>;
  resolution?: Maybe<Scalars['Float']['output']>;
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
  description: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
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
  count: Scalars['Int']['output'];
  max?: Maybe<Playable_Race_Max_Fields>;
  min?: Maybe<Playable_Race_Min_Fields>;
};


/** aggregate fields of "playable_race" */
export type Playable_Race_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Playable_Race_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Playable_Race_Max_Fields = {
  __typename?: 'playable_race_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Playable_Race_Min_Fields = {
  __typename?: 'playable_race_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "playable_race" */
export type Playable_Race_Mutation_Response = {
  __typename?: 'playable_race_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  /** filter the rows which have to be updated */
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
  /** fetch data from the table: "galactic_empire_resource_generator" */
  galactic_empire_resource_generator: Array<Galactic_Empire_Resource_Generator>;
  /** fetch aggregated fields from the table: "galactic_empire_resource_generator" */
  galactic_empire_resource_generator_aggregate: Galactic_Empire_Resource_Generator_Aggregate;
  /** fetch data from the table: "galactic_empire_resource_generator" using primary key columns */
  galactic_empire_resource_generator_by_pk?: Maybe<Galactic_Empire_Resource_Generator>;
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
  music?: Maybe<Array<MediaResult>>;
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
  /** fetch data from the table: "resource_type" */
  resource_type: Array<Resource_Type>;
  /** fetch aggregated fields from the table: "resource_type" */
  resource_type_aggregate: Resource_Type_Aggregate;
  /** fetch data from the table: "resource_type" using primary key columns */
  resource_type_by_pk?: Maybe<Resource_Type>;
  returnNothing?: Maybe<GalaxyManagement>;
  /** fetch data from the table: "technology" */
  technology: Array<Technology>;
  /** fetch aggregated fields from the table: "technology" */
  technology_aggregate: Technology_Aggregate;
  /** fetch data from the table: "technology" using primary key columns */
  technology_by_pk?: Maybe<Technology>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Background_Order_By>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Query_RootBackground_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Background_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Background_Order_By>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Query_RootBackground_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCelestialArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Query_RootCelestial_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Query_RootCelestial_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootChat_MessageArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Query_RootChat_Message_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Query_RootChat_Message_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFactionArgs = {
  distinct_on?: InputMaybe<Array<Faction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Faction_Order_By>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Query_RootFaction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Faction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Faction_Order_By>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Query_RootFaction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootGalactic_EmpireArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Query_RootGalactic_Empire_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Query_RootGalactic_Empire_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootGalactic_Empire_NpcArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Npc_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Npc_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootGalactic_Empire_QuestArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Quest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Quest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootGalactic_Empire_Resource_GeneratorArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resource_Generator_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Resource_Generator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resource_Generator_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Resource_Generator_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootGalactic_Empire_ResourcesArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Resources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Query_RootGalactic_Empire_Resources_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootGalaxyArgs = {
  distinct_on?: InputMaybe<Array<Galaxy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galaxy_Order_By>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Query_RootGalaxy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galaxy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galaxy_Order_By>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Query_RootGalaxy_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootNpcArgs = {
  distinct_on?: InputMaybe<Array<Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Npc_Order_By>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Query_RootNpc_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Npc_Order_By>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Query_RootNpc_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPlanetArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Query_RootPlanet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Query_RootPlanet_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPlanetary_RingArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Query_RootPlanetary_Ring_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Query_RootPlanetary_Ring_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootPlayable_RaceArgs = {
  distinct_on?: InputMaybe<Array<Playable_Race_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Playable_Race_Order_By>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Query_RootPlayable_Race_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Playable_Race_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Playable_Race_Order_By>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Query_RootPlayable_Race_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootQuestArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Query_RootQuest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Query_RootQuest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootQuest_RewardArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Query_RootQuest_Reward_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Query_RootQuest_Reward_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootQuest_Reward_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Type_Order_By>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Query_RootQuest_Reward_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Type_Order_By>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Query_RootQuest_Reward_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootQuest_StepArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Query_RootQuest_Step_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Query_RootQuest_Step_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootQuest_Step_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Type_Order_By>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Query_RootQuest_Step_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Type_Order_By>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Query_RootQuest_Step_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootQuest_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Type_Order_By>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Query_RootQuest_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Type_Order_By>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Query_RootQuest_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Query_RootResource_GeneratorArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Resource_Generator_Order_By>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Query_RootResource_Generator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Resource_Generator_Order_By>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Query_RootResource_Generator_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootResource_TypeArgs = {
  distinct_on?: InputMaybe<Array<Resource_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Resource_Type_Order_By>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Query_RootResource_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Resource_Type_Order_By>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Query_RootResource_Type_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTechnologyArgs = {
  distinct_on?: InputMaybe<Array<Technology_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Order_By>>;
  where?: InputMaybe<Technology_Bool_Exp>;
};


export type Query_RootTechnology_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Order_By>>;
  where?: InputMaybe<Technology_Bool_Exp>;
};


export type Query_RootTechnology_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTerrain_Hex_PaletteArgs = {
  distinct_on?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Terrain_Hex_Palette_Order_By>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Query_RootTerrain_Hex_Palette_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Terrain_Hex_Palette_Order_By>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Query_RootTerrain_Hex_Palette_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUser_InfoArgs = {
  distinct_on?: InputMaybe<Array<User_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Info_Order_By>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Query_RootUser_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Info_Order_By>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Query_RootUser_Info_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootUser_MeArgs = {
  distinct_on?: InputMaybe<Array<User_Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Me_Order_By>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Query_RootUser_Me_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Me_Order_By>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Query_RootUser_PrivateArgs = {
  distinct_on?: InputMaybe<Array<User_Private_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Private_Order_By>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};


export type Query_RootUser_Private_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Private_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Private_Order_By>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};

/** columns and relationships of "quest" */
export type Quest = {
  __typename?: 'quest';
  description: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  initial?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  /** An object relationship */
  next_quest?: Maybe<Quest>;
  next_quest_in_chain?: Maybe<Scalars['uuid']['output']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestRewards_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestStepsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestSteps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  count: Scalars['Int']['output'];
  max?: Maybe<Quest_Max_Fields>;
  min?: Maybe<Quest_Min_Fields>;
};


/** aggregate fields of "quest" */
export type Quest_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "quest". All fields are combined with a logical 'AND'. */
export type Quest_Bool_Exp = {
  _and?: InputMaybe<Array<Quest_Bool_Exp>>;
  _not?: InputMaybe<Quest_Bool_Exp>;
  _or?: InputMaybe<Array<Quest_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  initial?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  next_quest?: InputMaybe<Quest_Bool_Exp>;
  next_quest_in_chain?: InputMaybe<Uuid_Comparison_Exp>;
  quest_type?: InputMaybe<Quest_Type_Bool_Exp>;
  rewards?: InputMaybe<Quest_Reward_Bool_Exp>;
  rewards_aggregate?: InputMaybe<Quest_Reward_Aggregate_Bool_Exp>;
  steps?: InputMaybe<Quest_Step_Bool_Exp>;
  steps_aggregate?: InputMaybe<Quest_Step_Aggregate_Bool_Exp>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  initial?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  next_quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  next_quest_in_chain?: InputMaybe<Scalars['uuid']['input']>;
  quest_type?: InputMaybe<Quest_Type_Obj_Rel_Insert_Input>;
  rewards?: InputMaybe<Quest_Reward_Arr_Rel_Insert_Input>;
  steps?: InputMaybe<Quest_Step_Arr_Rel_Insert_Input>;
  type?: InputMaybe<Quest_Type_Enum>;
};

/** aggregate max on columns */
export type Quest_Max_Fields = {
  __typename?: 'quest_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  next_quest_in_chain?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Quest_Min_Fields = {
  __typename?: 'quest_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  next_quest_in_chain?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "quest" */
export type Quest_Mutation_Response = {
  __typename?: 'quest_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  image_url?: InputMaybe<Order_By>;
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
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "quest_reward" */
export type Quest_Reward = {
  __typename?: 'quest_reward';
  id: Scalars['uuid']['output'];
  npc_unlock_id?: Maybe<Scalars['uuid']['output']>;
  quest_id: Scalars['uuid']['output'];
  resource_accrual_amount?: Maybe<Scalars['Int']['output']>;
  resource_accrual_type_id?: Maybe<Scalars['uuid']['output']>;
  resource_unlock_id?: Maybe<Scalars['uuid']['output']>;
  type: Quest_Reward_Type_Enum;
};

/** aggregated selection of "quest_reward" */
export type Quest_Reward_Aggregate = {
  __typename?: 'quest_reward_aggregate';
  aggregate?: Maybe<Quest_Reward_Aggregate_Fields>;
  nodes: Array<Quest_Reward>;
};

export type Quest_Reward_Aggregate_Bool_Exp = {
  count?: InputMaybe<Quest_Reward_Aggregate_Bool_Exp_Count>;
};

export type Quest_Reward_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Quest_Reward_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "quest_reward" */
export type Quest_Reward_Aggregate_Fields = {
  __typename?: 'quest_reward_aggregate_fields';
  avg?: Maybe<Quest_Reward_Avg_Fields>;
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  resource_accrual_amount?: Maybe<Scalars['Float']['output']>;
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
  resource_accrual_amount?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "quest_reward" */
export type Quest_Reward_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  npc_unlock_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_accrual_amount?: InputMaybe<Scalars['Int']['input']>;
  resource_accrual_type_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_unlock_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Quest_Reward_Type_Enum>;
};

/** aggregate max on columns */
export type Quest_Reward_Max_Fields = {
  __typename?: 'quest_reward_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  npc_unlock_id?: Maybe<Scalars['uuid']['output']>;
  quest_id?: Maybe<Scalars['uuid']['output']>;
  resource_accrual_amount?: Maybe<Scalars['Int']['output']>;
  resource_accrual_type_id?: Maybe<Scalars['uuid']['output']>;
  resource_unlock_id?: Maybe<Scalars['uuid']['output']>;
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
  id?: Maybe<Scalars['uuid']['output']>;
  npc_unlock_id?: Maybe<Scalars['uuid']['output']>;
  quest_id?: Maybe<Scalars['uuid']['output']>;
  resource_accrual_amount?: Maybe<Scalars['Int']['output']>;
  resource_accrual_type_id?: Maybe<Scalars['uuid']['output']>;
  resource_unlock_id?: Maybe<Scalars['uuid']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  id?: InputMaybe<Scalars['uuid']['input']>;
  npc_unlock_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_accrual_amount?: InputMaybe<Scalars['Int']['input']>;
  resource_accrual_type_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_unlock_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Quest_Reward_Type_Enum>;
};

/** aggregate stddev on columns */
export type Quest_Reward_Stddev_Fields = {
  __typename?: 'quest_reward_stddev_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "quest_reward" */
export type Quest_Reward_Stddev_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quest_Reward_Stddev_Pop_Fields = {
  __typename?: 'quest_reward_stddev_pop_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "quest_reward" */
export type Quest_Reward_Stddev_Pop_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quest_Reward_Stddev_Samp_Fields = {
  __typename?: 'quest_reward_stddev_samp_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']['output']>;
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
  id?: InputMaybe<Scalars['uuid']['input']>;
  npc_unlock_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_accrual_amount?: InputMaybe<Scalars['Int']['input']>;
  resource_accrual_type_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_unlock_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Quest_Reward_Type_Enum>;
};

/** aggregate sum on columns */
export type Quest_Reward_Sum_Fields = {
  __typename?: 'quest_reward_sum_fields';
  resource_accrual_amount?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "quest_reward" */
export type Quest_Reward_Sum_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "quest_reward_type" */
export type Quest_Reward_Type = {
  __typename?: 'quest_reward_type';
  description: Scalars['String']['output'];
  value: Scalars['String']['output'];
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
  count: Scalars['Int']['output'];
  max?: Maybe<Quest_Reward_Type_Max_Fields>;
  min?: Maybe<Quest_Reward_Type_Min_Fields>;
};


/** aggregate fields of "quest_reward_type" */
export type Quest_Reward_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Quest_Reward_Type_Enum>;
  _nin?: InputMaybe<Array<Quest_Reward_Type_Enum>>;
};

/** input type for inserting data into table "quest_reward_type" */
export type Quest_Reward_Type_Insert_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Quest_Reward_Type_Max_Fields = {
  __typename?: 'quest_reward_type_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Quest_Reward_Type_Min_Fields = {
  __typename?: 'quest_reward_type_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "quest_reward_type" */
export type Quest_Reward_Type_Mutation_Response = {
  __typename?: 'quest_reward_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  value: Scalars['String']['input'];
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
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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
  /** filter the rows which have to be updated */
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
  /** filter the rows which have to be updated */
  where: Quest_Reward_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Quest_Reward_Var_Pop_Fields = {
  __typename?: 'quest_reward_var_pop_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "quest_reward" */
export type Quest_Reward_Var_Pop_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quest_Reward_Var_Samp_Fields = {
  __typename?: 'quest_reward_var_samp_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "quest_reward" */
export type Quest_Reward_Var_Samp_Order_By = {
  resource_accrual_amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quest_Reward_Variance_Fields = {
  __typename?: 'quest_reward_variance_fields';
  resource_accrual_amount?: Maybe<Scalars['Float']['output']>;
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
  ImageUrl = 'image_url',
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  initial?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  next_quest_in_chain?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Quest_Type_Enum>;
};

/** columns and relationships of "quest_step" */
export type Quest_Step = {
  __typename?: 'quest_step';
  description: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  initial: Scalars['Boolean']['output'];
  next_step_in_quest?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  npc?: Maybe<Npc>;
  npc_contact_id?: Maybe<Scalars['uuid']['output']>;
  quest_id: Scalars['uuid']['output'];
  resource_cost_amount?: Maybe<Scalars['Int']['output']>;
  resource_cost_id?: Maybe<Scalars['uuid']['output']>;
  type: Quest_Step_Type_Enum;
};

/** aggregated selection of "quest_step" */
export type Quest_Step_Aggregate = {
  __typename?: 'quest_step_aggregate';
  aggregate?: Maybe<Quest_Step_Aggregate_Fields>;
  nodes: Array<Quest_Step>;
};

export type Quest_Step_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Quest_Step_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Quest_Step_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Quest_Step_Aggregate_Bool_Exp_Count>;
};

export type Quest_Step_Aggregate_Bool_Exp_Bool_And = {
  arguments: Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Quest_Step_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Quest_Step_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Quest_Step_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Quest_Step_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Quest_Step_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Quest_Step_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "quest_step" */
export type Quest_Step_Aggregate_Fields = {
  __typename?: 'quest_step_aggregate_fields';
  avg?: Maybe<Quest_Step_Avg_Fields>;
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  resource_cost_amount?: Maybe<Scalars['Float']['output']>;
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
  resource_cost_amount?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "quest_step" */
export type Quest_Step_Insert_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  initial?: InputMaybe<Scalars['Boolean']['input']>;
  next_step_in_quest?: InputMaybe<Scalars['uuid']['input']>;
  npc?: InputMaybe<Npc_Obj_Rel_Insert_Input>;
  npc_contact_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_cost_amount?: InputMaybe<Scalars['Int']['input']>;
  resource_cost_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Quest_Step_Type_Enum>;
};

/** aggregate max on columns */
export type Quest_Step_Max_Fields = {
  __typename?: 'quest_step_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  next_step_in_quest?: Maybe<Scalars['uuid']['output']>;
  npc_contact_id?: Maybe<Scalars['uuid']['output']>;
  quest_id?: Maybe<Scalars['uuid']['output']>;
  resource_cost_amount?: Maybe<Scalars['Int']['output']>;
  resource_cost_id?: Maybe<Scalars['uuid']['output']>;
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
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  next_step_in_quest?: Maybe<Scalars['uuid']['output']>;
  npc_contact_id?: Maybe<Scalars['uuid']['output']>;
  quest_id?: Maybe<Scalars['uuid']['output']>;
  resource_cost_amount?: Maybe<Scalars['Int']['output']>;
  resource_cost_id?: Maybe<Scalars['uuid']['output']>;
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
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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

/** select "quest_step_aggregate_bool_exp_bool_and_arguments_columns" columns of table "quest_step" */
export enum Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Initial = 'initial'
}

/** select "quest_step_aggregate_bool_exp_bool_or_arguments_columns" columns of table "quest_step" */
export enum Quest_Step_Select_Column_Quest_Step_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Initial = 'initial'
}

/** input type for updating data in table "quest_step" */
export type Quest_Step_Set_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  initial?: InputMaybe<Scalars['Boolean']['input']>;
  next_step_in_quest?: InputMaybe<Scalars['uuid']['input']>;
  npc_contact_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_cost_amount?: InputMaybe<Scalars['Int']['input']>;
  resource_cost_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Quest_Step_Type_Enum>;
};

/** aggregate stddev on columns */
export type Quest_Step_Stddev_Fields = {
  __typename?: 'quest_step_stddev_fields';
  resource_cost_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "quest_step" */
export type Quest_Step_Stddev_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quest_Step_Stddev_Pop_Fields = {
  __typename?: 'quest_step_stddev_pop_fields';
  resource_cost_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "quest_step" */
export type Quest_Step_Stddev_Pop_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quest_Step_Stddev_Samp_Fields = {
  __typename?: 'quest_step_stddev_samp_fields';
  resource_cost_amount?: Maybe<Scalars['Float']['output']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  initial?: InputMaybe<Scalars['Boolean']['input']>;
  next_step_in_quest?: InputMaybe<Scalars['uuid']['input']>;
  npc_contact_id?: InputMaybe<Scalars['uuid']['input']>;
  quest_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_cost_amount?: InputMaybe<Scalars['Int']['input']>;
  resource_cost_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Quest_Step_Type_Enum>;
};

/** aggregate sum on columns */
export type Quest_Step_Sum_Fields = {
  __typename?: 'quest_step_sum_fields';
  resource_cost_amount?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "quest_step" */
export type Quest_Step_Sum_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "quest_step_type" */
export type Quest_Step_Type = {
  __typename?: 'quest_step_type';
  description: Scalars['String']['output'];
  value: Scalars['String']['output'];
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
  count: Scalars['Int']['output'];
  max?: Maybe<Quest_Step_Type_Max_Fields>;
  min?: Maybe<Quest_Step_Type_Min_Fields>;
};


/** aggregate fields of "quest_step_type" */
export type Quest_Step_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Quest_Step_Type_Enum>;
  _nin?: InputMaybe<Array<Quest_Step_Type_Enum>>;
};

/** input type for inserting data into table "quest_step_type" */
export type Quest_Step_Type_Insert_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Quest_Step_Type_Max_Fields = {
  __typename?: 'quest_step_type_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Quest_Step_Type_Min_Fields = {
  __typename?: 'quest_step_type_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "quest_step_type" */
export type Quest_Step_Type_Mutation_Response = {
  __typename?: 'quest_step_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  value: Scalars['String']['input'];
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
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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
  /** filter the rows which have to be updated */
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
  /** filter the rows which have to be updated */
  where: Quest_Step_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Quest_Step_Var_Pop_Fields = {
  __typename?: 'quest_step_var_pop_fields';
  resource_cost_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "quest_step" */
export type Quest_Step_Var_Pop_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quest_Step_Var_Samp_Fields = {
  __typename?: 'quest_step_var_samp_fields';
  resource_cost_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "quest_step" */
export type Quest_Step_Var_Samp_Order_By = {
  resource_cost_amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quest_Step_Variance_Fields = {
  __typename?: 'quest_step_variance_fields';
  resource_cost_amount?: Maybe<Scalars['Float']['output']>;
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
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  initial?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  next_quest_in_chain?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Quest_Type_Enum>;
};

/** columns and relationships of "quest_type" */
export type Quest_Type = {
  __typename?: 'quest_type';
  value: Scalars['String']['output'];
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
  count: Scalars['Int']['output'];
  max?: Maybe<Quest_Type_Max_Fields>;
  min?: Maybe<Quest_Type_Min_Fields>;
};


/** aggregate fields of "quest_type" */
export type Quest_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Quest_Type_Enum>;
  _nin?: InputMaybe<Array<Quest_Type_Enum>>;
};

/** input type for inserting data into table "quest_type" */
export type Quest_Type_Insert_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Quest_Type_Max_Fields = {
  __typename?: 'quest_type_max_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Quest_Type_Min_Fields = {
  __typename?: 'quest_type_min_fields';
  value?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "quest_type" */
export type Quest_Type_Mutation_Response = {
  __typename?: 'quest_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  value: Scalars['String']['input'];
};

/** select columns of table "quest_type" */
export enum Quest_Type_Select_Column {
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "quest_type" */
export type Quest_Type_Set_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
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
  value?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "quest_type" */
export enum Quest_Type_Update_Column {
  /** column name */
  Value = 'value'
}

export type Quest_Type_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Quest_Type_Set_Input>;
  /** filter the rows which have to be updated */
  where: Quest_Type_Bool_Exp;
};

/** update columns of table "quest" */
export enum Quest_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
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
  /** filter the rows which have to be updated */
  where: Quest_Bool_Exp;
};

/** columns and relationships of "resource_generator" */
export type Resource_Generator = {
  __typename?: 'resource_generator';
  cost_amount_1: Scalars['numeric']['output'];
  cost_growth_exponent: Scalars['numeric']['output'];
  /** An object relationship */
  cost_resource_1?: Maybe<Resource_Type>;
  cost_resource_type_id_1: Scalars['uuid']['output'];
  description: Scalars['String']['output'];
  generation_rate: Scalars['_numeric']['output'];
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** An object relationship */
  resource_type: Resource_Type;
  resource_type_1_id: Scalars['uuid']['output'];
  /** An object relationship */
  resource_type_2?: Maybe<Resource_Type>;
  resource_type_2_id?: Maybe<Scalars['uuid']['output']>;
  unlocked_by_technology_id?: Maybe<Scalars['uuid']['output']>;
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
  avg?: Maybe<Resource_Generator_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Resource_Generator_Max_Fields>;
  min?: Maybe<Resource_Generator_Min_Fields>;
  stddev?: Maybe<Resource_Generator_Stddev_Fields>;
  stddev_pop?: Maybe<Resource_Generator_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Resource_Generator_Stddev_Samp_Fields>;
  sum?: Maybe<Resource_Generator_Sum_Fields>;
  var_pop?: Maybe<Resource_Generator_Var_Pop_Fields>;
  var_samp?: Maybe<Resource_Generator_Var_Samp_Fields>;
  variance?: Maybe<Resource_Generator_Variance_Fields>;
};


/** aggregate fields of "resource_generator" */
export type Resource_Generator_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Resource_Generator_Avg_Fields = {
  __typename?: 'resource_generator_avg_fields';
  cost_amount_1?: Maybe<Scalars['Float']['output']>;
  cost_growth_exponent?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "resource_generator". All fields are combined with a logical 'AND'. */
export type Resource_Generator_Bool_Exp = {
  _and?: InputMaybe<Array<Resource_Generator_Bool_Exp>>;
  _not?: InputMaybe<Resource_Generator_Bool_Exp>;
  _or?: InputMaybe<Array<Resource_Generator_Bool_Exp>>;
  cost_amount_1?: InputMaybe<Numeric_Comparison_Exp>;
  cost_growth_exponent?: InputMaybe<Numeric_Comparison_Exp>;
  cost_resource_1?: InputMaybe<Resource_Type_Bool_Exp>;
  cost_resource_type_id_1?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  generation_rate?: InputMaybe<_Numeric_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  resource_type?: InputMaybe<Resource_Type_Bool_Exp>;
  resource_type_1_id?: InputMaybe<Uuid_Comparison_Exp>;
  resource_type_2?: InputMaybe<Resource_Type_Bool_Exp>;
  resource_type_2_id?: InputMaybe<Uuid_Comparison_Exp>;
  unlocked_by_technology_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "resource_generator" */
export enum Resource_Generator_Constraint {
  /** unique or primary key constraint on columns "id" */
  ResourceGeneratorTypePkey = 'resource_generator_type_pkey'
}

/** input type for incrementing numeric columns in table "resource_generator" */
export type Resource_Generator_Inc_Input = {
  cost_amount_1?: InputMaybe<Scalars['numeric']['input']>;
  cost_growth_exponent?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "resource_generator" */
export type Resource_Generator_Insert_Input = {
  cost_amount_1?: InputMaybe<Scalars['numeric']['input']>;
  cost_growth_exponent?: InputMaybe<Scalars['numeric']['input']>;
  cost_resource_1?: InputMaybe<Resource_Type_Obj_Rel_Insert_Input>;
  cost_resource_type_id_1?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  generation_rate?: InputMaybe<Scalars['_numeric']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  resource_type?: InputMaybe<Resource_Type_Obj_Rel_Insert_Input>;
  resource_type_1_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_type_2?: InputMaybe<Resource_Type_Obj_Rel_Insert_Input>;
  resource_type_2_id?: InputMaybe<Scalars['uuid']['input']>;
  unlocked_by_technology_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Resource_Generator_Max_Fields = {
  __typename?: 'resource_generator_max_fields';
  cost_amount_1?: Maybe<Scalars['numeric']['output']>;
  cost_growth_exponent?: Maybe<Scalars['numeric']['output']>;
  cost_resource_type_id_1?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  resource_type_1_id?: Maybe<Scalars['uuid']['output']>;
  resource_type_2_id?: Maybe<Scalars['uuid']['output']>;
  unlocked_by_technology_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Resource_Generator_Min_Fields = {
  __typename?: 'resource_generator_min_fields';
  cost_amount_1?: Maybe<Scalars['numeric']['output']>;
  cost_growth_exponent?: Maybe<Scalars['numeric']['output']>;
  cost_resource_type_id_1?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  resource_type_1_id?: Maybe<Scalars['uuid']['output']>;
  resource_type_2_id?: Maybe<Scalars['uuid']['output']>;
  unlocked_by_technology_id?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "resource_generator" */
export type Resource_Generator_Mutation_Response = {
  __typename?: 'resource_generator_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Resource_Generator>;
};

/** input type for inserting object relation for remote table "resource_generator" */
export type Resource_Generator_Obj_Rel_Insert_Input = {
  data: Resource_Generator_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Resource_Generator_On_Conflict>;
};

/** on_conflict condition type for table "resource_generator" */
export type Resource_Generator_On_Conflict = {
  constraint: Resource_Generator_Constraint;
  update_columns?: Array<Resource_Generator_Update_Column>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};

/** Ordering options when selecting data from "resource_generator". */
export type Resource_Generator_Order_By = {
  cost_amount_1?: InputMaybe<Order_By>;
  cost_growth_exponent?: InputMaybe<Order_By>;
  cost_resource_1?: InputMaybe<Resource_Type_Order_By>;
  cost_resource_type_id_1?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  generation_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  resource_type?: InputMaybe<Resource_Type_Order_By>;
  resource_type_1_id?: InputMaybe<Order_By>;
  resource_type_2?: InputMaybe<Resource_Type_Order_By>;
  resource_type_2_id?: InputMaybe<Order_By>;
  unlocked_by_technology_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: resource_generator */
export type Resource_Generator_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "resource_generator" */
export enum Resource_Generator_Select_Column {
  /** column name */
  CostAmount_1 = 'cost_amount_1',
  /** column name */
  CostGrowthExponent = 'cost_growth_exponent',
  /** column name */
  CostResourceTypeId_1 = 'cost_resource_type_id_1',
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
  ResourceType_2Id = 'resource_type_2_id',
  /** column name */
  UnlockedByTechnologyId = 'unlocked_by_technology_id'
}

/** input type for updating data in table "resource_generator" */
export type Resource_Generator_Set_Input = {
  cost_amount_1?: InputMaybe<Scalars['numeric']['input']>;
  cost_growth_exponent?: InputMaybe<Scalars['numeric']['input']>;
  cost_resource_type_id_1?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  generation_rate?: InputMaybe<Scalars['_numeric']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  resource_type_1_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_type_2_id?: InputMaybe<Scalars['uuid']['input']>;
  unlocked_by_technology_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Resource_Generator_Stddev_Fields = {
  __typename?: 'resource_generator_stddev_fields';
  cost_amount_1?: Maybe<Scalars['Float']['output']>;
  cost_growth_exponent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Resource_Generator_Stddev_Pop_Fields = {
  __typename?: 'resource_generator_stddev_pop_fields';
  cost_amount_1?: Maybe<Scalars['Float']['output']>;
  cost_growth_exponent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Resource_Generator_Stddev_Samp_Fields = {
  __typename?: 'resource_generator_stddev_samp_fields';
  cost_amount_1?: Maybe<Scalars['Float']['output']>;
  cost_growth_exponent?: Maybe<Scalars['Float']['output']>;
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
  cost_amount_1?: InputMaybe<Scalars['numeric']['input']>;
  cost_growth_exponent?: InputMaybe<Scalars['numeric']['input']>;
  cost_resource_type_id_1?: InputMaybe<Scalars['uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  generation_rate?: InputMaybe<Scalars['_numeric']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  resource_type_1_id?: InputMaybe<Scalars['uuid']['input']>;
  resource_type_2_id?: InputMaybe<Scalars['uuid']['input']>;
  unlocked_by_technology_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Resource_Generator_Sum_Fields = {
  __typename?: 'resource_generator_sum_fields';
  cost_amount_1?: Maybe<Scalars['numeric']['output']>;
  cost_growth_exponent?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "resource_generator" */
export enum Resource_Generator_Update_Column {
  /** column name */
  CostAmount_1 = 'cost_amount_1',
  /** column name */
  CostGrowthExponent = 'cost_growth_exponent',
  /** column name */
  CostResourceTypeId_1 = 'cost_resource_type_id_1',
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
  ResourceType_2Id = 'resource_type_2_id',
  /** column name */
  UnlockedByTechnologyId = 'unlocked_by_technology_id'
}

export type Resource_Generator_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Resource_Generator_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Resource_Generator_Set_Input>;
  /** filter the rows which have to be updated */
  where: Resource_Generator_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Resource_Generator_Var_Pop_Fields = {
  __typename?: 'resource_generator_var_pop_fields';
  cost_amount_1?: Maybe<Scalars['Float']['output']>;
  cost_growth_exponent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Resource_Generator_Var_Samp_Fields = {
  __typename?: 'resource_generator_var_samp_fields';
  cost_amount_1?: Maybe<Scalars['Float']['output']>;
  cost_growth_exponent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Resource_Generator_Variance_Fields = {
  __typename?: 'resource_generator_variance_fields';
  cost_amount_1?: Maybe<Scalars['Float']['output']>;
  cost_growth_exponent?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "resource_type" */
export type Resource_Type = {
  __typename?: 'resource_type';
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  image_url_pixel?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
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
  count: Scalars['Int']['output'];
  max?: Maybe<Resource_Type_Max_Fields>;
  min?: Maybe<Resource_Type_Min_Fields>;
};


/** aggregate fields of "resource_type" */
export type Resource_Type_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Resource_Type_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  image_url_pixel?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Resource_Type_Max_Fields = {
  __typename?: 'resource_type_max_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  image_url_pixel?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Resource_Type_Min_Fields = {
  __typename?: 'resource_type_min_fields';
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  image_url_pixel?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "resource_type" */
export type Resource_Type_Mutation_Response = {
  __typename?: 'resource_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  image_url_pixel?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
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
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  image_url_pixel?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
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
  /** filter the rows which have to be updated */
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
  /** fetch data from the table in a streaming manner: "background" */
  background_stream: Array<Background>;
  /** fetch data from the table: "celestial" */
  celestial: Array<Celestial>;
  /** fetch aggregated fields from the table: "celestial" */
  celestial_aggregate: Celestial_Aggregate;
  /** fetch data from the table: "celestial" using primary key columns */
  celestial_by_pk?: Maybe<Celestial>;
  /** fetch data from the table in a streaming manner: "celestial" */
  celestial_stream: Array<Celestial>;
  /** fetch data from the table: "chat_message" */
  chat_message: Array<Chat_Message>;
  /** fetch aggregated fields from the table: "chat_message" */
  chat_message_aggregate: Chat_Message_Aggregate;
  /** fetch data from the table: "chat_message" using primary key columns */
  chat_message_by_pk?: Maybe<Chat_Message>;
  /** fetch data from the table in a streaming manner: "chat_message" */
  chat_message_stream: Array<Chat_Message>;
  /** fetch data from the table: "faction" */
  faction: Array<Faction>;
  /** fetch aggregated fields from the table: "faction" */
  faction_aggregate: Faction_Aggregate;
  /** fetch data from the table: "faction" using primary key columns */
  faction_by_pk?: Maybe<Faction>;
  /** fetch data from the table in a streaming manner: "faction" */
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
  /** fetch data from the table in a streaming manner: "galactic_empire_npc" */
  galactic_empire_npc_stream: Array<Galactic_Empire_Npc>;
  /** fetch data from the table: "galactic_empire_quest" */
  galactic_empire_quest: Array<Galactic_Empire_Quest>;
  /** fetch aggregated fields from the table: "galactic_empire_quest" */
  galactic_empire_quest_aggregate: Galactic_Empire_Quest_Aggregate;
  /** fetch data from the table: "galactic_empire_quest" using primary key columns */
  galactic_empire_quest_by_pk?: Maybe<Galactic_Empire_Quest>;
  /** fetch data from the table in a streaming manner: "galactic_empire_quest" */
  galactic_empire_quest_stream: Array<Galactic_Empire_Quest>;
  /** fetch data from the table: "galactic_empire_resource_generator" */
  galactic_empire_resource_generator: Array<Galactic_Empire_Resource_Generator>;
  /** fetch aggregated fields from the table: "galactic_empire_resource_generator" */
  galactic_empire_resource_generator_aggregate: Galactic_Empire_Resource_Generator_Aggregate;
  /** fetch data from the table: "galactic_empire_resource_generator" using primary key columns */
  galactic_empire_resource_generator_by_pk?: Maybe<Galactic_Empire_Resource_Generator>;
  /** fetch data from the table in a streaming manner: "galactic_empire_resource_generator" */
  galactic_empire_resource_generator_stream: Array<Galactic_Empire_Resource_Generator>;
  /** fetch data from the table: "galactic_empire_resources" */
  galactic_empire_resources: Array<Galactic_Empire_Resources>;
  /** fetch aggregated fields from the table: "galactic_empire_resources" */
  galactic_empire_resources_aggregate: Galactic_Empire_Resources_Aggregate;
  /** fetch data from the table: "galactic_empire_resources" using primary key columns */
  galactic_empire_resources_by_pk?: Maybe<Galactic_Empire_Resources>;
  /** fetch data from the table in a streaming manner: "galactic_empire_resources" */
  galactic_empire_resources_stream: Array<Galactic_Empire_Resources>;
  /** fetch data from the table in a streaming manner: "galactic_empire" */
  galactic_empire_stream: Array<Galactic_Empire>;
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch aggregated fields from the table: "galaxy" */
  galaxy_aggregate: Galaxy_Aggregate;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
  /** fetch data from the table in a streaming manner: "galaxy" */
  galaxy_stream: Array<Galaxy>;
  /** fetch data from the table: "npc" */
  npc: Array<Npc>;
  /** fetch aggregated fields from the table: "npc" */
  npc_aggregate: Npc_Aggregate;
  /** fetch data from the table: "npc" using primary key columns */
  npc_by_pk?: Maybe<Npc>;
  /** fetch data from the table in a streaming manner: "npc" */
  npc_stream: Array<Npc>;
  /** fetch data from the table: "planet" */
  planet: Array<Planet>;
  /** fetch aggregated fields from the table: "planet" */
  planet_aggregate: Planet_Aggregate;
  /** fetch data from the table: "planet" using primary key columns */
  planet_by_pk?: Maybe<Planet>;
  /** fetch data from the table in a streaming manner: "planet" */
  planet_stream: Array<Planet>;
  /** fetch data from the table: "planetary_ring" */
  planetary_ring: Array<Planetary_Ring>;
  /** fetch aggregated fields from the table: "planetary_ring" */
  planetary_ring_aggregate: Planetary_Ring_Aggregate;
  /** fetch data from the table: "planetary_ring" using primary key columns */
  planetary_ring_by_pk?: Maybe<Planetary_Ring>;
  /** fetch data from the table in a streaming manner: "planetary_ring" */
  planetary_ring_stream: Array<Planetary_Ring>;
  /** fetch data from the table: "playable_race" */
  playable_race: Array<Playable_Race>;
  /** fetch aggregated fields from the table: "playable_race" */
  playable_race_aggregate: Playable_Race_Aggregate;
  /** fetch data from the table: "playable_race" using primary key columns */
  playable_race_by_pk?: Maybe<Playable_Race>;
  /** fetch data from the table in a streaming manner: "playable_race" */
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
  /** fetch data from the table in a streaming manner: "quest_reward" */
  quest_reward_stream: Array<Quest_Reward>;
  /** fetch data from the table: "quest_reward_type" */
  quest_reward_type: Array<Quest_Reward_Type>;
  /** fetch aggregated fields from the table: "quest_reward_type" */
  quest_reward_type_aggregate: Quest_Reward_Type_Aggregate;
  /** fetch data from the table: "quest_reward_type" using primary key columns */
  quest_reward_type_by_pk?: Maybe<Quest_Reward_Type>;
  /** fetch data from the table in a streaming manner: "quest_reward_type" */
  quest_reward_type_stream: Array<Quest_Reward_Type>;
  /** fetch data from the table: "quest_step" */
  quest_step: Array<Quest_Step>;
  /** fetch aggregated fields from the table: "quest_step" */
  quest_step_aggregate: Quest_Step_Aggregate;
  /** fetch data from the table: "quest_step" using primary key columns */
  quest_step_by_pk?: Maybe<Quest_Step>;
  /** fetch data from the table in a streaming manner: "quest_step" */
  quest_step_stream: Array<Quest_Step>;
  /** fetch data from the table: "quest_step_type" */
  quest_step_type: Array<Quest_Step_Type>;
  /** fetch aggregated fields from the table: "quest_step_type" */
  quest_step_type_aggregate: Quest_Step_Type_Aggregate;
  /** fetch data from the table: "quest_step_type" using primary key columns */
  quest_step_type_by_pk?: Maybe<Quest_Step_Type>;
  /** fetch data from the table in a streaming manner: "quest_step_type" */
  quest_step_type_stream: Array<Quest_Step_Type>;
  /** fetch data from the table in a streaming manner: "quest" */
  quest_stream: Array<Quest>;
  /** fetch data from the table: "quest_type" */
  quest_type: Array<Quest_Type>;
  /** fetch aggregated fields from the table: "quest_type" */
  quest_type_aggregate: Quest_Type_Aggregate;
  /** fetch data from the table: "quest_type" using primary key columns */
  quest_type_by_pk?: Maybe<Quest_Type>;
  /** fetch data from the table in a streaming manner: "quest_type" */
  quest_type_stream: Array<Quest_Type>;
  /** fetch data from the table: "resource_generator" */
  resource_generator: Array<Resource_Generator>;
  /** fetch aggregated fields from the table: "resource_generator" */
  resource_generator_aggregate: Resource_Generator_Aggregate;
  /** fetch data from the table: "resource_generator" using primary key columns */
  resource_generator_by_pk?: Maybe<Resource_Generator>;
  /** fetch data from the table in a streaming manner: "resource_generator" */
  resource_generator_stream: Array<Resource_Generator>;
  /** fetch data from the table: "resource_type" */
  resource_type: Array<Resource_Type>;
  /** fetch aggregated fields from the table: "resource_type" */
  resource_type_aggregate: Resource_Type_Aggregate;
  /** fetch data from the table: "resource_type" using primary key columns */
  resource_type_by_pk?: Maybe<Resource_Type>;
  /** fetch data from the table in a streaming manner: "resource_type" */
  resource_type_stream: Array<Resource_Type>;
  /** fetch data from the table: "technology" */
  technology: Array<Technology>;
  /** fetch aggregated fields from the table: "technology" */
  technology_aggregate: Technology_Aggregate;
  /** fetch data from the table: "technology" using primary key columns */
  technology_by_pk?: Maybe<Technology>;
  /** fetch data from the table in a streaming manner: "technology" */
  technology_stream: Array<Technology>;
  /** fetch data from the table: "terrain_hex_palette" */
  terrain_hex_palette: Array<Terrain_Hex_Palette>;
  /** fetch aggregated fields from the table: "terrain_hex_palette" */
  terrain_hex_palette_aggregate: Terrain_Hex_Palette_Aggregate;
  /** fetch data from the table: "terrain_hex_palette" using primary key columns */
  terrain_hex_palette_by_pk?: Maybe<Terrain_Hex_Palette>;
  /** fetch data from the table in a streaming manner: "terrain_hex_palette" */
  terrain_hex_palette_stream: Array<Terrain_Hex_Palette>;
  /** fetch data from the table: "user_info" */
  user_info: Array<User_Info>;
  /** fetch aggregated fields from the table: "user_info" */
  user_info_aggregate: User_Info_Aggregate;
  /** fetch data from the table: "user_info" using primary key columns */
  user_info_by_pk?: Maybe<User_Info>;
  /** fetch data from the table in a streaming manner: "user_info" */
  user_info_stream: Array<User_Info>;
  /** fetch data from the table: "user_me" */
  user_me: Array<User_Me>;
  /** fetch aggregated fields from the table: "user_me" */
  user_me_aggregate: User_Me_Aggregate;
  /** fetch data from the table in a streaming manner: "user_me" */
  user_me_stream: Array<User_Me>;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
  /** fetch aggregated fields from the table: "user_private" */
  user_private_aggregate: User_Private_Aggregate;
  /** fetch data from the table in a streaming manner: "user_private" */
  user_private_stream: Array<User_Private>;
};


export type Subscription_RootBackgroundArgs = {
  distinct_on?: InputMaybe<Array<Background_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Background_Order_By>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Subscription_RootBackground_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Background_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Background_Order_By>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Subscription_RootBackground_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootBackground_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Background_Stream_Cursor_Input>>;
  where?: InputMaybe<Background_Bool_Exp>;
};


export type Subscription_RootCelestialArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Subscription_RootCelestial_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Subscription_RootCelestial_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootCelestial_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Celestial_Stream_Cursor_Input>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


export type Subscription_RootChat_MessageArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Subscription_RootChat_Message_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Subscription_RootChat_Message_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootChat_Message_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chat_Message_Stream_Cursor_Input>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


export type Subscription_RootFactionArgs = {
  distinct_on?: InputMaybe<Array<Faction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Faction_Order_By>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Subscription_RootFaction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Faction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Faction_Order_By>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Subscription_RootFaction_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFaction_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Faction_Stream_Cursor_Input>>;
  where?: InputMaybe<Faction_Bool_Exp>;
};


export type Subscription_RootGalactic_EmpireArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootGalactic_Empire_NpcArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Npc_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Npc_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Npc_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootGalactic_Empire_Npc_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Galactic_Empire_Npc_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Npc_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_QuestArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Quest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Quest_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Quest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootGalactic_Empire_Quest_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Galactic_Empire_Quest_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Quest_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Resource_GeneratorArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resource_Generator_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Resource_Generator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resource_Generator_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resource_Generator_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Resource_Generator_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootGalactic_Empire_Resource_Generator_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Galactic_Empire_Resource_Generator_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Resource_Generator_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_ResourcesArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Resources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Resources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Resources_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_Resources_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootGalactic_Empire_Resources_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Galactic_Empire_Resources_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Resources_Bool_Exp>;
};


export type Subscription_RootGalactic_Empire_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Galactic_Empire_Stream_Cursor_Input>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


export type Subscription_RootGalaxyArgs = {
  distinct_on?: InputMaybe<Array<Galaxy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galaxy_Order_By>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Subscription_RootGalaxy_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galaxy_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galaxy_Order_By>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Subscription_RootGalaxy_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootGalaxy_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Galaxy_Stream_Cursor_Input>>;
  where?: InputMaybe<Galaxy_Bool_Exp>;
};


export type Subscription_RootNpcArgs = {
  distinct_on?: InputMaybe<Array<Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Npc_Order_By>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Subscription_RootNpc_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Npc_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Npc_Order_By>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Subscription_RootNpc_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootNpc_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Npc_Stream_Cursor_Input>>;
  where?: InputMaybe<Npc_Bool_Exp>;
};


export type Subscription_RootPlanetArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Subscription_RootPlanet_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planet_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planet_Order_By>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Subscription_RootPlanet_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPlanet_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Planet_Stream_Cursor_Input>>;
  where?: InputMaybe<Planet_Bool_Exp>;
};


export type Subscription_RootPlanetary_RingArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Subscription_RootPlanetary_Ring_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Planetary_Ring_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Planetary_Ring_Order_By>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Subscription_RootPlanetary_Ring_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPlanetary_Ring_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Planetary_Ring_Stream_Cursor_Input>>;
  where?: InputMaybe<Planetary_Ring_Bool_Exp>;
};


export type Subscription_RootPlayable_RaceArgs = {
  distinct_on?: InputMaybe<Array<Playable_Race_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Playable_Race_Order_By>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Subscription_RootPlayable_Race_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Playable_Race_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Playable_Race_Order_By>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Subscription_RootPlayable_Race_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPlayable_Race_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Playable_Race_Stream_Cursor_Input>>;
  where?: InputMaybe<Playable_Race_Bool_Exp>;
};


export type Subscription_RootQuestArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Subscription_RootQuest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Subscription_RootQuest_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootQuest_RewardArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Order_By>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootQuest_Reward_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Quest_Reward_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Reward_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Type_Order_By>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Reward_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Reward_Type_Order_By>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Reward_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootQuest_Reward_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Quest_Reward_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Reward_Type_Bool_Exp>;
};


export type Subscription_RootQuest_StepArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Subscription_RootQuest_Step_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Order_By>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Subscription_RootQuest_Step_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootQuest_Step_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Quest_Step_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Step_Bool_Exp>;
};


export type Subscription_RootQuest_Step_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Type_Order_By>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Step_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Step_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Step_Type_Order_By>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Step_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootQuest_Step_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Quest_Step_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Step_Type_Bool_Exp>;
};


export type Subscription_RootQuest_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Quest_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


export type Subscription_RootQuest_TypeArgs = {
  distinct_on?: InputMaybe<Array<Quest_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Type_Order_By>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Quest_Type_Order_By>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Subscription_RootQuest_Type_By_PkArgs = {
  value: Scalars['String']['input'];
};


export type Subscription_RootQuest_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Quest_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Quest_Type_Bool_Exp>;
};


export type Subscription_RootResource_GeneratorArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Resource_Generator_Order_By>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Subscription_RootResource_Generator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Generator_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Resource_Generator_Order_By>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Subscription_RootResource_Generator_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootResource_Generator_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Resource_Generator_Stream_Cursor_Input>>;
  where?: InputMaybe<Resource_Generator_Bool_Exp>;
};


export type Subscription_RootResource_TypeArgs = {
  distinct_on?: InputMaybe<Array<Resource_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Resource_Type_Order_By>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Subscription_RootResource_Type_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Resource_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Resource_Type_Order_By>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Subscription_RootResource_Type_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootResource_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Resource_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Resource_Type_Bool_Exp>;
};


export type Subscription_RootTechnologyArgs = {
  distinct_on?: InputMaybe<Array<Technology_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Order_By>>;
  where?: InputMaybe<Technology_Bool_Exp>;
};


export type Subscription_RootTechnology_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Technology_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Technology_Order_By>>;
  where?: InputMaybe<Technology_Bool_Exp>;
};


export type Subscription_RootTechnology_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTechnology_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Technology_Stream_Cursor_Input>>;
  where?: InputMaybe<Technology_Bool_Exp>;
};


export type Subscription_RootTerrain_Hex_PaletteArgs = {
  distinct_on?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Terrain_Hex_Palette_Order_By>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Subscription_RootTerrain_Hex_Palette_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Terrain_Hex_Palette_Order_By>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Subscription_RootTerrain_Hex_Palette_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTerrain_Hex_Palette_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Terrain_Hex_Palette_Stream_Cursor_Input>>;
  where?: InputMaybe<Terrain_Hex_Palette_Bool_Exp>;
};


export type Subscription_RootUser_InfoArgs = {
  distinct_on?: InputMaybe<Array<User_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Info_Order_By>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Subscription_RootUser_Info_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Info_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Info_Order_By>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Subscription_RootUser_Info_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUser_Info_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Info_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Info_Bool_Exp>;
};


export type Subscription_RootUser_MeArgs = {
  distinct_on?: InputMaybe<Array<User_Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Me_Order_By>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Subscription_RootUser_Me_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Me_Order_By>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Subscription_RootUser_Me_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Me_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Me_Bool_Exp>;
};


export type Subscription_RootUser_PrivateArgs = {
  distinct_on?: InputMaybe<Array<User_Private_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Private_Order_By>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};


export type Subscription_RootUser_Private_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Private_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Private_Order_By>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};


export type Subscription_RootUser_Private_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Private_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Private_Bool_Exp>;
};

/** columns and relationships of "technology" */
export type Technology = {
  __typename?: 'technology';
  children: Scalars['_uuid']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  research_cost: Scalars['Int']['output'];
  root?: Maybe<Scalars['Boolean']['output']>;
};

/** aggregated selection of "technology" */
export type Technology_Aggregate = {
  __typename?: 'technology_aggregate';
  aggregate?: Maybe<Technology_Aggregate_Fields>;
  nodes: Array<Technology>;
};

/** aggregate fields of "technology" */
export type Technology_Aggregate_Fields = {
  __typename?: 'technology_aggregate_fields';
  avg?: Maybe<Technology_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Technology_Max_Fields>;
  min?: Maybe<Technology_Min_Fields>;
  stddev?: Maybe<Technology_Stddev_Fields>;
  stddev_pop?: Maybe<Technology_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Technology_Stddev_Samp_Fields>;
  sum?: Maybe<Technology_Sum_Fields>;
  var_pop?: Maybe<Technology_Var_Pop_Fields>;
  var_samp?: Maybe<Technology_Var_Samp_Fields>;
  variance?: Maybe<Technology_Variance_Fields>;
};


/** aggregate fields of "technology" */
export type Technology_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Technology_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Technology_Avg_Fields = {
  __typename?: 'technology_avg_fields';
  research_cost?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "technology". All fields are combined with a logical 'AND'. */
export type Technology_Bool_Exp = {
  _and?: InputMaybe<Array<Technology_Bool_Exp>>;
  _not?: InputMaybe<Technology_Bool_Exp>;
  _or?: InputMaybe<Array<Technology_Bool_Exp>>;
  children?: InputMaybe<_Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  research_cost?: InputMaybe<Int_Comparison_Exp>;
  root?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "technology" */
export enum Technology_Constraint {
  /** unique or primary key constraint on columns "name" */
  TechnologyNameKey = 'technology_name_key',
  /** unique or primary key constraint on columns "id" */
  TechnologyPkey = 'technology_pkey'
}

/** input type for incrementing numeric columns in table "technology" */
export type Technology_Inc_Input = {
  research_cost?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "technology" */
export type Technology_Insert_Input = {
  children?: InputMaybe<Scalars['_uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  research_cost?: InputMaybe<Scalars['Int']['input']>;
  root?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Technology_Max_Fields = {
  __typename?: 'technology_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  research_cost?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Technology_Min_Fields = {
  __typename?: 'technology_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  research_cost?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "technology" */
export type Technology_Mutation_Response = {
  __typename?: 'technology_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Technology>;
};

/** on_conflict condition type for table "technology" */
export type Technology_On_Conflict = {
  constraint: Technology_Constraint;
  update_columns?: Array<Technology_Update_Column>;
  where?: InputMaybe<Technology_Bool_Exp>;
};

/** Ordering options when selecting data from "technology". */
export type Technology_Order_By = {
  children?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  research_cost?: InputMaybe<Order_By>;
  root?: InputMaybe<Order_By>;
};

/** primary key columns input for table: technology */
export type Technology_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "technology" */
export enum Technology_Select_Column {
  /** column name */
  Children = 'children',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name',
  /** column name */
  ResearchCost = 'research_cost',
  /** column name */
  Root = 'root'
}

/** input type for updating data in table "technology" */
export type Technology_Set_Input = {
  children?: InputMaybe<Scalars['_uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  research_cost?: InputMaybe<Scalars['Int']['input']>;
  root?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type Technology_Stddev_Fields = {
  __typename?: 'technology_stddev_fields';
  research_cost?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Technology_Stddev_Pop_Fields = {
  __typename?: 'technology_stddev_pop_fields';
  research_cost?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Technology_Stddev_Samp_Fields = {
  __typename?: 'technology_stddev_samp_fields';
  research_cost?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "technology" */
export type Technology_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Technology_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Technology_Stream_Cursor_Value_Input = {
  children?: InputMaybe<Scalars['_uuid']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  research_cost?: InputMaybe<Scalars['Int']['input']>;
  root?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type Technology_Sum_Fields = {
  __typename?: 'technology_sum_fields';
  research_cost?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "technology" */
export enum Technology_Update_Column {
  /** column name */
  Children = 'children',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name',
  /** column name */
  ResearchCost = 'research_cost',
  /** column name */
  Root = 'root'
}

export type Technology_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Technology_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Technology_Set_Input>;
  /** filter the rows which have to be updated */
  where: Technology_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Technology_Var_Pop_Fields = {
  __typename?: 'technology_var_pop_fields';
  research_cost?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Technology_Var_Samp_Fields = {
  __typename?: 'technology_var_samp_fields';
  research_cost?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Technology_Variance_Fields = {
  __typename?: 'technology_variance_fields';
  research_cost?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "terrain_hex_palette" */
export type Terrain_Hex_Palette = {
  __typename?: 'terrain_hex_palette';
  forest: Scalars['String']['output'];
  grass: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  sand: Scalars['String']['output'];
  water: Scalars['String']['output'];
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
  count: Scalars['Int']['output'];
  max?: Maybe<Terrain_Hex_Palette_Max_Fields>;
  min?: Maybe<Terrain_Hex_Palette_Min_Fields>;
};


/** aggregate fields of "terrain_hex_palette" */
export type Terrain_Hex_Palette_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Terrain_Hex_Palette_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  forest?: InputMaybe<Scalars['String']['input']>;
  grass?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sand?: InputMaybe<Scalars['String']['input']>;
  water?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Terrain_Hex_Palette_Max_Fields = {
  __typename?: 'terrain_hex_palette_max_fields';
  forest?: Maybe<Scalars['String']['output']>;
  grass?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sand?: Maybe<Scalars['String']['output']>;
  water?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Terrain_Hex_Palette_Min_Fields = {
  __typename?: 'terrain_hex_palette_min_fields';
  forest?: Maybe<Scalars['String']['output']>;
  grass?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sand?: Maybe<Scalars['String']['output']>;
  water?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "terrain_hex_palette" */
export type Terrain_Hex_Palette_Mutation_Response = {
  __typename?: 'terrain_hex_palette_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['uuid']['input'];
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
  forest?: InputMaybe<Scalars['String']['input']>;
  grass?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sand?: InputMaybe<Scalars['String']['input']>;
  water?: InputMaybe<Scalars['String']['input']>;
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
  forest?: InputMaybe<Scalars['String']['input']>;
  grass?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sand?: InputMaybe<Scalars['String']['input']>;
  water?: InputMaybe<Scalars['String']['input']>;
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
  /** filter the rows which have to be updated */
  where: Terrain_Hex_Palette_Bool_Exp;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_info" */
export type User_Info = {
  __typename?: 'user_info';
  avatar_url?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  celestials: Array<Celestial>;
  /** An aggregate relationship */
  celestials_aggregate: Celestial_Aggregate;
  /** An array relationship */
  chat_messages: Array<Chat_Message>;
  /** An aggregate relationship */
  chat_messages_aggregate: Chat_Message_Aggregate;
  display_name?: Maybe<Scalars['String']['output']>;
  free_claims: Scalars['Int']['output'];
  /** An array relationship */
  galactic_empires: Array<Galactic_Empire>;
  /** An aggregate relationship */
  galactic_empires_aggregate: Galactic_Empire_Aggregate;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nickname: Scalars['String']['output'];
  secret_setting_test?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "user_info" */
export type User_InfoCelestialsArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoCelestials_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Celestial_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Celestial_Order_By>>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoChat_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoChat_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Chat_Message_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chat_Message_Order_By>>;
  where?: InputMaybe<Chat_Message_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoGalactic_EmpiresArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Galactic_Empire_Order_By>>;
  where?: InputMaybe<Galactic_Empire_Bool_Exp>;
};


/** columns and relationships of "user_info" */
export type User_InfoGalactic_Empires_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Galactic_Empire_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type User_Info_Avg_Fields = {
  __typename?: 'user_info_avg_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "user_info". All fields are combined with a logical 'AND'. */
export type User_Info_Bool_Exp = {
  _and?: InputMaybe<Array<User_Info_Bool_Exp>>;
  _not?: InputMaybe<User_Info_Bool_Exp>;
  _or?: InputMaybe<Array<User_Info_Bool_Exp>>;
  avatar_url?: InputMaybe<String_Comparison_Exp>;
  celestials?: InputMaybe<Celestial_Bool_Exp>;
  celestials_aggregate?: InputMaybe<Celestial_Aggregate_Bool_Exp>;
  chat_messages?: InputMaybe<Chat_Message_Bool_Exp>;
  chat_messages_aggregate?: InputMaybe<Chat_Message_Aggregate_Bool_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  free_claims?: InputMaybe<Int_Comparison_Exp>;
  galactic_empires?: InputMaybe<Galactic_Empire_Bool_Exp>;
  galactic_empires_aggregate?: InputMaybe<Galactic_Empire_Aggregate_Bool_Exp>;
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
  free_claims?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "user_info" */
export type User_Info_Insert_Input = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  celestials?: InputMaybe<Celestial_Arr_Rel_Insert_Input>;
  chat_messages?: InputMaybe<Chat_Message_Arr_Rel_Insert_Input>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  free_claims?: InputMaybe<Scalars['Int']['input']>;
  galactic_empires?: InputMaybe<Galactic_Empire_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type User_Info_Max_Fields = {
  __typename?: 'user_info_max_fields';
  avatar_url?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  free_claims?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  secret_setting_test?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type User_Info_Min_Fields = {
  __typename?: 'user_info_min_fields';
  avatar_url?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  free_claims?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  secret_setting_test?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "user_info" */
export type User_Info_Mutation_Response = {
  __typename?: 'user_info_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  id: Scalars['String']['input'];
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
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  free_claims?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type User_Info_Stddev_Fields = {
  __typename?: 'user_info_stddev_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type User_Info_Stddev_Pop_Fields = {
  __typename?: 'user_info_stddev_pop_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type User_Info_Stddev_Samp_Fields = {
  __typename?: 'user_info_stddev_samp_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
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
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  free_claims?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type User_Info_Sum_Fields = {
  __typename?: 'user_info_sum_fields';
  free_claims?: Maybe<Scalars['Int']['output']>;
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
  /** filter the rows which have to be updated */
  where: User_Info_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Info_Var_Pop_Fields = {
  __typename?: 'user_info_var_pop_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type User_Info_Var_Samp_Fields = {
  __typename?: 'user_info_var_samp_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type User_Info_Variance_Fields = {
  __typename?: 'user_info_variance_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "user_me" */
export type User_Me = {
  __typename?: 'user_me';
  avatar_url?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  free_claims?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  secret_setting_test?: Maybe<Scalars['String']['output']>;
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
  count: Scalars['Int']['output'];
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
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type User_Me_Avg_Fields = {
  __typename?: 'user_me_avg_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "user_me". All fields are combined with a logical 'AND'. */
export type User_Me_Bool_Exp = {
  _and?: InputMaybe<Array<User_Me_Bool_Exp>>;
  _not?: InputMaybe<User_Me_Bool_Exp>;
  _or?: InputMaybe<Array<User_Me_Bool_Exp>>;
  avatar_url?: InputMaybe<String_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  free_claims?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  secret_setting_test?: InputMaybe<String_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "user_me" */
export type User_Me_Inc_Input = {
  free_claims?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "user_me" */
export type User_Me_Insert_Input = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  free_claims?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type User_Me_Max_Fields = {
  __typename?: 'user_me_max_fields';
  avatar_url?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  free_claims?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  secret_setting_test?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type User_Me_Min_Fields = {
  __typename?: 'user_me_min_fields';
  avatar_url?: Maybe<Scalars['String']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  free_claims?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  secret_setting_test?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "user_me" */
export type User_Me_Mutation_Response = {
  __typename?: 'user_me_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Me>;
};

/** Ordering options when selecting data from "user_me". */
export type User_Me_Order_By = {
  avatar_url?: InputMaybe<Order_By>;
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

/** input type for updating data in table "user_me" */
export type User_Me_Set_Input = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  free_claims?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type User_Me_Stddev_Fields = {
  __typename?: 'user_me_stddev_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type User_Me_Stddev_Pop_Fields = {
  __typename?: 'user_me_stddev_pop_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type User_Me_Stddev_Samp_Fields = {
  __typename?: 'user_me_stddev_samp_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
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
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  free_claims?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type User_Me_Sum_Fields = {
  __typename?: 'user_me_sum_fields';
  free_claims?: Maybe<Scalars['Int']['output']>;
};

export type User_Me_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Me_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Me_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Me_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Me_Var_Pop_Fields = {
  __typename?: 'user_me_var_pop_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type User_Me_Var_Samp_Fields = {
  __typename?: 'user_me_var_samp_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type User_Me_Variance_Fields = {
  __typename?: 'user_me_variance_fields';
  free_claims?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "user_private" */
export type User_Private = {
  __typename?: 'user_private';
  secret_setting_test?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
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
  count: Scalars['Int']['output'];
  max?: Maybe<User_Private_Max_Fields>;
  min?: Maybe<User_Private_Min_Fields>;
};


/** aggregate fields of "user_private" */
export type User_Private_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Private_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type User_Private_Max_Fields = {
  __typename?: 'user_private_max_fields';
  secret_setting_test?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type User_Private_Min_Fields = {
  __typename?: 'user_private_min_fields';
  secret_setting_test?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "user_private" */
export type User_Private_Mutation_Response = {
  __typename?: 'user_private_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
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
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
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
  secret_setting_test?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

export type User_Private_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Private_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Private_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type CelestialFieldsFragment = { __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null };

export type GalacticEmpireFieldsFragment = { __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> };

export type GalaxyFieldsFragment = { __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> };

export type CelestialByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CelestialByIdQuery = { __typename?: 'query_root', celestial_by_pk?: { __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, id: string, avatar_url?: string | null } | null, planets: Array<{ __typename?: 'planet', id: string, name: string, radius: number, terrain_bias: number[], texture_resolution: number, atmospheric_distance: number, rings: Array<{ __typename?: 'planetary_ring', id: string, type: string, colors: string[] }>, terrain_hex_palette: { __typename?: 'terrain_hex_palette', forest: string, grass: string, name: string, sand: string, water: string } }>, galactic_empire?: { __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> } | null } | null };

export type CelestialsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CelestialsSubscription = { __typename?: 'subscription_root', celestial: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> };

export type CelestialsByGalaxyIdSubscriptionVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type CelestialsByGalaxyIdSubscription = { __typename?: 'subscription_root', galaxy_by_pk?: { __typename?: 'galaxy', celestials: Array<{ __typename?: 'celestial', name?: string | null, id: string, owner_id?: string | null }>, celestials_aggregate: { __typename?: 'celestial_aggregate', nodes: Array<{ __typename?: 'celestial', owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, avatar_url?: string | null } | null }> } } | null };

export type CreateEmpireOriginCelestialMutationVariables = Exact<{
  galaxy_id: Scalars['String']['input'];
  galacticEmpireId: Scalars['String']['input'];
}>;


export type CreateEmpireOriginCelestialMutation = { __typename?: 'mutation_root', createEmpireOriginCelestial?: { __typename?: 'GalaxyManagement', insertedCelestialId: string, insertedCelestialName: string } | null };

export type TryInsertClaimedCelestialMutationVariables = Exact<{
  galaxy_id: Scalars['uuid']['input'];
  galactic_empire_id: Scalars['uuid']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  owner_id: Scalars['String']['input'];
}>;


export type TryInsertClaimedCelestialMutation = { __typename?: 'mutation_root', insert_celestial_one?: { __typename?: 'celestial', galaxy_id: string, id: string, name?: string | null, owner_id?: string | null, galactic_empire_id?: string | null } | null };

export type CharacterDataQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterDataQuery = { __typename?: 'query_root', playable_race: Array<{ __typename?: 'playable_race', id: string, name: string, description: string, image_url?: string | null }>, faction: Array<{ __typename?: 'faction', id: string, name: string, description: string, image_url?: string | null }>, background: Array<{ __typename?: 'background', id: string, name: string, description: string, image_url?: string | null }> };

export type GetChatMessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetChatMessagesSubscription = { __typename?: 'subscription_root', chat_message: Array<{ __typename?: 'chat_message', timestamp: string, id: string, message: string, poster_id: string, user_info: { __typename?: 'user_info', nickname: string, id: string, display_name?: string | null } }> };

export type LatestMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type LatestMessageSubscription = { __typename?: 'subscription_root', chat_message: Array<{ __typename?: 'chat_message', id: string, message: string }> };

export type SendNewMessageMutationVariables = Exact<{
  message?: InputMaybe<Scalars['String']['input']>;
}>;


export type SendNewMessageMutation = { __typename?: 'mutation_root', insert_chat_message_one?: { __typename?: 'chat_message', message: string } | null };

export type CreateGalacticEmpireMutationVariables = Exact<{
  input: Galactic_Empire_Insert_Input;
}>;


export type CreateGalacticEmpireMutation = { __typename?: 'mutation_root', insert_galactic_empire_one?: { __typename?: 'galactic_empire', id: string } | null };

export type GalacticEmpiresByGalaxyIdQueryVariables = Exact<{
  galaxyId: Scalars['uuid']['input'];
}>;


export type GalacticEmpiresByGalaxyIdQuery = { __typename?: 'query_root', galactic_empire: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }> };

export type GalacticEmpiresByUserIdSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GalacticEmpiresByUserIdSubscription = { __typename?: 'subscription_root', galactic_empire: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }> };

export type IncrementGalacticEmpireResourcesMutationVariables = Exact<{
  galacticEmpireId: Scalars['uuid']['input'];
  galacticCreditsIncrement: Scalars['Int']['input'];
  commonMetalsIncrement: Scalars['Int']['input'];
  rareMetalsIncrement: Scalars['Int']['input'];
  hydrocarbonsIncrement: Scalars['Int']['input'];
  voidMatterIncrement: Scalars['Int']['input'];
}>;


export type IncrementGalacticEmpireResourcesMutation = { __typename?: 'mutation_root', common_metals?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null, galactic_credits?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null, hydrocarbons?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null, rare_metals?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null, void_matter?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null };

export type IncrementResourceMutationVariables = Exact<{
  galacticEmpireId: Scalars['uuid']['input'];
  resourceType: Scalars['String']['input'];
  increment: Scalars['Int']['input'];
}>;


export type IncrementResourceMutation = { __typename?: 'mutation_root', update_galactic_empire_resources?: { __typename?: 'galactic_empire_resources_mutation_response', affected_rows: number } | null };

export type GalacticEmpireNpcsSubscriptionVariables = Exact<{
  empireId: Scalars['uuid']['input'];
}>;


export type GalacticEmpireNpcsSubscription = { __typename?: 'subscription_root', galactic_empire_npc: Array<{ __typename?: 'galactic_empire_npc', npc: { __typename?: 'npc', id: string, name: string, image_url: string, playable_race?: { __typename?: 'playable_race', name: string, id: string } | null, faction?: { __typename?: 'faction', name: string, id: string } | null } }> };

export type UnlockGalacticEmpireNpcMutationVariables = Exact<{
  empireId: Scalars['uuid']['input'];
  npcId: Scalars['uuid']['input'];
}>;


export type UnlockGalacticEmpireNpcMutation = { __typename?: 'mutation_root', insert_galactic_empire_npc_one?: { __typename?: 'galactic_empire_npc', npc_id: string, galactic_empire_id: string } | null };

export type ActiveGalacticEmpireQuestsByEmpireIdSubscriptionVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type ActiveGalacticEmpireQuestsByEmpireIdSubscription = { __typename?: 'subscription_root', galactic_empire_quest: Array<{ __typename?: 'galactic_empire_quest', quest_step_id: string, id: string, quest: { __typename?: 'quest', next_quest_in_chain?: string | null, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, type: Quest_Reward_Type_Enum, resource_unlock_id?: string | null, resource_accrual_type_id?: string | null, resource_accrual_amount?: number | null }>, steps: Array<{ __typename?: 'quest_step', next_step_in_quest?: string | null, npc_contact_id?: string | null, type: Quest_Step_Type_Enum, resource_cost_amount?: number | null, resource_cost_id?: string | null }>, quest_type: { __typename?: 'quest_type', value: string } } }> };

export type AddGalacticEmpireQuestMutationVariables = Exact<{
  input: Galactic_Empire_Quest_Insert_Input;
}>;


export type AddGalacticEmpireQuestMutation = { __typename?: 'mutation_root', insert_galactic_empire_quest_one?: { __typename?: 'galactic_empire_quest', quest_id: string, galactic_empire_id: string } | null };

export type CompleteGalacticEmpireQuestByIdMutationVariables = Exact<{
  questId: Scalars['uuid']['input'];
}>;


export type CompleteGalacticEmpireQuestByIdMutation = { __typename?: 'mutation_root', update_galactic_empire_quest_by_pk?: { __typename?: 'galactic_empire_quest', completed: boolean, quest_id: string } | null };

export type CompleteQuestStepMutationVariables = Exact<{
  empireQuestId: Scalars['String']['input'];
}>;


export type CompleteQuestStepMutation = { __typename?: 'mutation_root', progressQuestStep?: { __typename?: 'QuestStepProgression', next_step_in_quest_added?: string | null, quest_id: string } | null };

export type CompleteQuestMutationVariables = Exact<{
  empireQuestId: Scalars['String']['input'];
}>;


export type CompleteQuestMutation = { __typename?: 'mutation_root', completeQuest?: { __typename?: 'QuestCompletion', next_quest_in_chain_added?: string | null, quest_id: string, rewards: Array<{ __typename?: 'QuestReward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: string }> } | null };

export type EmpiresWithoutQuestsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EmpiresWithoutQuestsSubscription = { __typename?: 'subscription_root', galactic_empire_aggregate: { __typename?: 'galactic_empire_aggregate', nodes: Array<{ __typename?: 'galactic_empire', id: string }> } };

export type GalacticEmpireQuestByIdQueryVariables = Exact<{
  empireQuestId: Scalars['uuid']['input'];
}>;


export type GalacticEmpireQuestByIdQuery = { __typename?: 'query_root', galactic_empire_quest_by_pk?: { __typename?: 'galactic_empire_quest', completed: boolean, quest_step_id: string, quest: { __typename?: 'quest', steps: Array<{ __typename?: 'quest_step', next_step_in_quest?: string | null, id: string, npc_contact_id?: string | null, resource_cost_amount?: number | null, resource_cost_id?: string | null, type: Quest_Step_Type_Enum }>, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: Quest_Reward_Type_Enum }>, quest_type: { __typename?: 'quest_type', value: string }, next_quest?: { __typename?: 'quest', id: string, steps: Array<{ __typename?: 'quest_step', id: string }> } | null }, galactic_empire: { __typename?: 'galactic_empire', id: string, resources: Array<{ __typename?: 'galactic_empire_resources', value: number, resource_type: { __typename?: 'resource_type', type: string, id: string } }> } } | null };

export type GalacticEmpireQuestFieldsFragment = { __typename?: 'galactic_empire_quest', id: string, completed: boolean, quest_step_id: string, quest: { __typename?: 'quest', id: string, type: Quest_Type_Enum, description: string, name: string, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: Quest_Reward_Type_Enum }>, next_quest?: { __typename?: 'quest', name: string } | null, steps: Array<{ __typename?: 'quest_step', id: string, type: Quest_Step_Type_Enum, description: string, initial: boolean, resource_cost_id?: string | null, resource_cost_amount?: number | null, npc_contact_id?: string | null, next_step_in_quest?: string | null }> } };

export type CompletedGalacticEmpireQuestsSubscriptionVariables = Exact<{
  empireId: Scalars['uuid']['input'];
}>;


export type CompletedGalacticEmpireQuestsSubscription = { __typename?: 'subscription_root', galactic_empire_quest: Array<{ __typename?: 'galactic_empire_quest', id: string, completed: boolean, quest_step_id: string, quest: { __typename?: 'quest', id: string, type: Quest_Type_Enum, description: string, name: string, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: Quest_Reward_Type_Enum }>, next_quest?: { __typename?: 'quest', name: string } | null, steps: Array<{ __typename?: 'quest_step', id: string, type: Quest_Step_Type_Enum, description: string, initial: boolean, resource_cost_id?: string | null, resource_cost_amount?: number | null, npc_contact_id?: string | null, next_step_in_quest?: string | null }> } }> };

export type ActiveGalacticEmpireQuestsSubscriptionVariables = Exact<{
  empireId: Scalars['uuid']['input'];
}>;


export type ActiveGalacticEmpireQuestsSubscription = { __typename?: 'subscription_root', galactic_empire_quest: Array<{ __typename?: 'galactic_empire_quest', id: string, completed: boolean, quest_step_id: string, quest: { __typename?: 'quest', id: string, type: Quest_Type_Enum, description: string, name: string, rewards: Array<{ __typename?: 'quest_reward', npc_unlock_id?: string | null, resource_accrual_amount?: number | null, resource_accrual_type_id?: string | null, resource_unlock_id?: string | null, type: Quest_Reward_Type_Enum }>, next_quest?: { __typename?: 'quest', name: string } | null, steps: Array<{ __typename?: 'quest_step', id: string, type: Quest_Step_Type_Enum, description: string, initial: boolean, resource_cost_id?: string | null, resource_cost_amount?: number | null, npc_contact_id?: string | null, next_step_in_quest?: string | null }> } }> };

export type InitialMainQuestIdQueryVariables = Exact<{ [key: string]: never; }>;


export type InitialMainQuestIdQuery = { __typename?: 'query_root', quest: Array<{ __typename?: 'quest', id: string, steps: Array<{ __typename?: 'quest_step', id: string }> }> };

export type ProgressGalacticEmpireQuestStepByIdMutationVariables = Exact<{
  questId: Scalars['uuid']['input'];
  stepId: Scalars['uuid']['input'];
}>;


export type ProgressGalacticEmpireQuestStepByIdMutation = { __typename?: 'mutation_root', update_galactic_empire_quest_by_pk?: { __typename?: 'galactic_empire_quest', completed: boolean, quest_id: string } | null };

export type SubmitEmpireQuestCompletionRequestMutationVariables = Exact<{
  empireQuestId: Scalars['String']['input'];
}>;


export type SubmitEmpireQuestCompletionRequestMutation = { __typename?: 'mutation_root', completeQuest?: { __typename?: 'QuestCompletion', quest_id: string, next_quest_in_chain_added?: string | null } | null };

export type IncrementResourceGeneratorCountMutationVariables = Exact<{
  galacticEmpireId: Scalars['uuid']['input'];
  resourceGeneratorId: Scalars['uuid']['input'];
  increment: Scalars['numeric']['input'];
}>;


export type IncrementResourceGeneratorCountMutation = { __typename?: 'mutation_root', update_galactic_empire_resource_generator?: { __typename?: 'galactic_empire_resource_generator_mutation_response', affected_rows: number } | null };

export type CreateEmpireResourceGeneratorMutationVariables = Exact<{
  galacticEmpireId: Scalars['uuid']['input'];
  generatorTypeId: Scalars['uuid']['input'];
}>;


export type CreateEmpireResourceGeneratorMutation = { __typename?: 'mutation_root', insert_galactic_empire_resource_generator_one?: { __typename?: 'galactic_empire_resource_generator', id: string } | null };

export type PurchaseResourceGeneratorMutationVariables = Exact<{
  galacticEmpireId: Scalars['String']['input'];
  resourceGeneratorId: Scalars['String']['input'];
}>;


export type PurchaseResourceGeneratorMutation = { __typename?: 'mutation_root', purchaseResourceGenerator?: { __typename?: 'PurchaseCompletion', spent: number } | null };

export type EmpireResourceGeneratorsByTypeQueryVariables = Exact<{
  galacticEmpireId: Scalars['uuid']['input'];
  typeId: Scalars['uuid']['input'];
}>;


export type EmpireResourceGeneratorsByTypeQuery = { __typename?: 'query_root', galactic_empire_resource_generator: Array<{ __typename?: 'galactic_empire_resource_generator', planet_id?: string | null, count: number, resource_generator: { __typename?: 'resource_generator', id: string, cost_growth_exponent: number, cost_amount_1: number, cost_resource_type_id_1: string }, galactic_empire: { __typename?: 'galactic_empire', id: string, resources: Array<{ __typename?: 'galactic_empire_resources', value: number, resource_type: { __typename?: 'resource_type', type: string, id: string } }> } }> };

export type GalacticEmpireResourceGeneratorFieldsFragment = { __typename?: 'galactic_empire_resource_generator', created_at: string, planet_id?: string | null, count: number, galactic_empire_id: string, resource_generator: { __typename?: 'resource_generator', generation_rate: number[], name: string, id: string, cost_growth_exponent: number, cost_amount_1: number, cost_resource_type_id_1: string, resource_type: { __typename?: 'resource_type', id: string, type: string }, resource_type_2?: { __typename?: 'resource_type', id: string, type: string } | null } };

export type EmpireResourceGeneratorsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EmpireResourceGeneratorsSubscription = { __typename?: 'subscription_root', galactic_empire_resource_generator: Array<{ __typename?: 'galactic_empire_resource_generator', created_at: string, planet_id?: string | null, count: number, galactic_empire_id: string, resource_generator: { __typename?: 'resource_generator', generation_rate: number[], name: string, id: string, cost_growth_exponent: number, cost_amount_1: number, cost_resource_type_id_1: string, resource_type: { __typename?: 'resource_type', id: string, type: string }, resource_type_2?: { __typename?: 'resource_type', id: string, type: string } | null } }> };

export type EmpireResourceGeneratorsByEmpireIdSubscriptionVariables = Exact<{
  empireId: Scalars['uuid']['input'];
}>;


export type EmpireResourceGeneratorsByEmpireIdSubscription = { __typename?: 'subscription_root', galactic_empire_resource_generator: Array<{ __typename?: 'galactic_empire_resource_generator', created_at: string, planet_id?: string | null, count: number, galactic_empire_id: string, resource_generator: { __typename?: 'resource_generator', generation_rate: number[], name: string, id: string, cost_growth_exponent: number, cost_amount_1: number, cost_resource_type_id_1: string, resource_type: { __typename?: 'resource_type', id: string, type: string }, resource_type_2?: { __typename?: 'resource_type', id: string, type: string } | null } }> };

export type EmpireResourceFieldsFragment = { __typename?: 'galactic_empire_resources', value: number, id: string, resource_type: { __typename?: 'resource_type', id: string, type: string } };

export type GalacticEmpireResourcesSubscriptionVariables = Exact<{
  empireId: Scalars['uuid']['input'];
}>;


export type GalacticEmpireResourcesSubscription = { __typename?: 'subscription_root', galactic_empire_resources: Array<{ __typename?: 'galactic_empire_resources', value: number, id: string, resource_type: { __typename?: 'resource_type', id: string, type: string } }> };

export type CurrentGalacticEmpireResourcesQueryVariables = Exact<{
  empireId: Scalars['uuid']['input'];
}>;


export type CurrentGalacticEmpireResourcesQuery = { __typename?: 'query_root', galactic_empire_resources: Array<{ __typename?: 'galactic_empire_resources', value: number, id: string, resource_type: { __typename?: 'resource_type', id: string, type: string } }> };

export type UnlockGalacticEmpireResourceMutationVariables = Exact<{
  empireId: Scalars['uuid']['input'];
  resourceTypeId: Scalars['uuid']['input'];
}>;


export type UnlockGalacticEmpireResourceMutation = { __typename?: 'mutation_root', insert_galactic_empire_resources_one?: { __typename?: 'galactic_empire_resources', galactic_empire_id: string, resource_type_id: string } | null };

export type CreateGalaxyMutationVariables = Exact<{
  input: Galaxy_Insert_Input;
}>;


export type CreateGalaxyMutation = { __typename?: 'mutation_root', insert_galaxy_one?: { __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> } | null };

export type DeleteGalaxyByIdMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteGalaxyByIdMutation = { __typename?: 'mutation_root', delete_galaxy_by_pk?: { __typename?: 'galaxy', id: string, name?: string | null } | null };

export type GalaxiesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GalaxiesSubscription = { __typename?: 'subscription_root', galaxy: Array<{ __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> }> };

export type GalaxyByIdQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GalaxyByIdQuery = { __typename?: 'query_root', galaxy_by_pk?: { __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> } | null };

export type GalaxyByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GalaxyByNameQuery = { __typename?: 'query_root', galaxy: Array<{ __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> }> };

export type GalaxyByNameSubSubscriptionVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GalaxyByNameSubSubscription = { __typename?: 'subscription_root', galaxy: Array<{ __typename?: 'galaxy', id: string, name?: string | null, curvature: number, core_radius_factor: number, core_concentration_factor: number, arms: number, arm_width: number, radius: number, stars: number, galactic_empires: Array<{ __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> }>, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, owner_id?: string | null, user_info?: { __typename?: 'user_info', display_name?: string | null, name?: string | null } | null }> }> };

export type GetGalaxyByIdAndUnclaimedCelestialsQueryVariables = Exact<{
  galaxyId: Scalars['uuid']['input'];
}>;


export type GetGalaxyByIdAndUnclaimedCelestialsQuery = { __typename?: 'query_root', galaxy_by_pk?: { __typename?: 'galaxy', id: string, stars: number } | null, celestial: Array<{ __typename?: 'celestial', id: string }> };

export type MusicQueryVariables = Exact<{ [key: string]: never; }>;


export type MusicQuery = { __typename?: 'query_root', music?: Array<{ __typename?: 'MediaResult', etag: string, name: string, metadata?: Array<{ __typename?: 'MediaMetadata', Key: string, Value: string }> | null }> | null };

export type NpcsQueryVariables = Exact<{ [key: string]: never; }>;


export type NpcsQuery = { __typename?: 'query_root', npc: Array<{ __typename?: 'npc', id: string, image_url: string, name: string }> };

export type CreatePlanetMutationVariables = Exact<{
  input: PlanetCreationInput;
}>;


export type CreatePlanetMutation = { __typename?: 'mutation_root', createPlanet?: { __typename?: 'CelestialManagement', createdPlanet: { __typename?: 'PartialPlanet', id: string, name: string, owner_id: string } } | null };

export type PlanetByIdQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type PlanetByIdQuery = { __typename?: 'query_root', planet_by_pk?: { __typename?: 'planet', atmospheric_distance: number, id: string, name: string, owner_id: string, radius: number, terrain_bias: number[], texture_resolution: number, terrain_hex_palette: { __typename?: 'terrain_hex_palette', forest: string, grass: string, name: string, sand: string, water: string, id: string }, rings: Array<{ __typename?: 'planetary_ring', colors: string[], id: string, inner_radius: number, outer_radius: number, resolution: number, rotation: number[], terrain_bias: number[], type: string }>, user_info?: { __typename?: 'user_info', avatar_url?: string | null, name?: string | null, nickname: string, id: string } | null, celestial: { __typename?: 'celestial', name?: string | null, planets_aggregate: { __typename?: 'planet_aggregate', aggregate?: { __typename?: 'planet_aggregate_fields', count: number } | null }, galactic_empire?: { __typename?: 'galactic_empire', id: string, user_id: string, background: { __typename?: 'background', name: string, image_url?: string | null, id: string, description: string }, faction: { __typename?: 'faction', description: string, id: string, image_url?: string | null, name: string }, playable_race: { __typename?: 'playable_race', description: string, id: string, image_url?: string | null, name: string }, galaxy: { __typename?: 'galaxy', name?: string | null, id: string }, celestials: Array<{ __typename?: 'celestial', id: string, name?: string | null, planets: Array<{ __typename?: 'planet', name: string }> }> } | null } } | null };

export type PlanetsByCelestialIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PlanetsByCelestialIdQuery = { __typename?: 'query_root', celestial_by_pk?: { __typename?: 'celestial', planets: Array<{ __typename?: 'planet', name: string, id: string, radius: number, owner_id: string, terrain_bias: number[], terrain_hex_palette_id: string, texture_resolution: number, rings: Array<{ __typename?: 'planetary_ring', colors: string[], id: string, inner_radius: number, outer_radius: number, resolution: number, rotation: number[], terrain_bias: number[], type: string }> }> } | null };

export type TerrainHexPalettesQueryVariables = Exact<{ [key: string]: never; }>;


export type TerrainHexPalettesQuery = { __typename?: 'query_root', terrain_hex_palette: Array<{ __typename?: 'terrain_hex_palette', forest: string, grass: string, id: string, name: string, sand: string, water: string }> };

export type TryInsertPlanetMutationVariables = Exact<{
  input: Planet_Insert_Input;
}>;


export type TryInsertPlanetMutation = { __typename?: 'mutation_root', insert_planet_one?: { __typename?: 'planet', id: string, name: string, owner_id: string } | null };

export type CreateQuestMutationVariables = Exact<{
  input: Quest_Insert_Input;
}>;


export type CreateQuestMutation = { __typename?: 'mutation_root', insert_quest_one?: { __typename?: 'quest', name: string, initial?: boolean | null, id: string, description: string, next_quest_in_chain?: string | null, type: Quest_Type_Enum, image_url?: string | null, steps_aggregate: { __typename?: 'quest_step_aggregate', aggregate?: { __typename?: 'quest_step_aggregate_fields', count: number } | null }, rewards: Array<{ __typename?: 'quest_reward', resource_unlock_id?: string | null, resource_accrual_type_id?: string | null, resource_accrual_amount?: number | null, npc_unlock_id?: string | null, type: Quest_Reward_Type_Enum }> } | null };

export type QuestFieldsFragment = { __typename?: 'quest', name: string, initial?: boolean | null, id: string, description: string, next_quest_in_chain?: string | null, type: Quest_Type_Enum, image_url?: string | null, steps_aggregate: { __typename?: 'quest_step_aggregate', aggregate?: { __typename?: 'quest_step_aggregate_fields', count: number } | null }, rewards: Array<{ __typename?: 'quest_reward', resource_unlock_id?: string | null, resource_accrual_type_id?: string | null, resource_accrual_amount?: number | null, npc_unlock_id?: string | null, type: Quest_Reward_Type_Enum }> };

export type QuestsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestsQuery = { __typename?: 'query_root', quest: Array<{ __typename?: 'quest', name: string, initial?: boolean | null, id: string, description: string, next_quest_in_chain?: string | null, type: Quest_Type_Enum, image_url?: string | null, steps_aggregate: { __typename?: 'quest_step_aggregate', aggregate?: { __typename?: 'quest_step_aggregate_fields', count: number } | null }, rewards: Array<{ __typename?: 'quest_reward', resource_unlock_id?: string | null, resource_accrual_type_id?: string | null, resource_accrual_amount?: number | null, npc_unlock_id?: string | null, type: Quest_Reward_Type_Enum }> }> };

export type UpdateQuestByIdMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  input: Quest_Set_Input;
}>;


export type UpdateQuestByIdMutation = { __typename?: 'mutation_root', update_quest_by_pk?: { __typename?: 'quest', name: string, initial?: boolean | null, id: string, description: string, next_quest_in_chain?: string | null, type: Quest_Type_Enum, image_url?: string | null, steps_aggregate: { __typename?: 'quest_step_aggregate', aggregate?: { __typename?: 'quest_step_aggregate_fields', count: number } | null }, rewards: Array<{ __typename?: 'quest_reward', resource_unlock_id?: string | null, resource_accrual_type_id?: string | null, resource_accrual_amount?: number | null, npc_unlock_id?: string | null, type: Quest_Reward_Type_Enum }> } | null };

export type ResourceGeneratorsQueryVariables = Exact<{ [key: string]: never; }>;


export type ResourceGeneratorsQuery = { __typename?: 'query_root', resource_generator: Array<{ __typename?: 'resource_generator', id: string, name: string, image_url?: string | null, description: string, generation_rate: number[], resource_type_1_id: string, resource_type_2_id?: string | null, unlocked_by_technology_id?: string | null, cost_amount_1: number, cost_growth_exponent: number, cost_resource_type_id_1: string, resource_type: { __typename?: 'resource_type', id: string, type: string, image_url?: string | null }, resource_type_2?: { __typename?: 'resource_type', id: string, type: string, image_url?: string | null } | null }> };

export type ResourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type ResourcesQuery = { __typename?: 'query_root', resource_type: Array<{ __typename?: 'resource_type', type: string, id: string, image_url?: string | null, image_url_pixel?: string | null }> };

export type SelfQueryVariables = Exact<{ [key: string]: never; }>;


export type SelfQuery = { __typename?: 'query_root', user_me: Array<{ __typename?: 'user_me', display_name?: string | null, id?: string | null, name?: string | null, nickname?: string | null, secret_setting_test?: string | null, avatar_url?: string | null }> };

export type SetDisplayNameByUserIdMutationVariables = Exact<{
  id: Scalars['String']['input'];
  display_name: Scalars['String']['input'];
}>;


export type SetDisplayNameByUserIdMutation = { __typename?: 'mutation_root', update_user_info_by_pk?: { __typename?: 'user_info', display_name?: string | null } | null };

export type SetNameByUserIdMutationVariables = Exact<{
  display_name?: InputMaybe<Scalars['String']['input']>;
}>;


export type SetNameByUserIdMutation = { __typename?: 'mutation_root', setDisplayName?: { __typename?: 'Register', updatedName: string } | null };

export type CreateTechnologyMutationVariables = Exact<{
  input: Technology_Insert_Input;
}>;


export type CreateTechnologyMutation = { __typename?: 'mutation_root', insert_technology_one?: { __typename?: 'technology', id: string, root?: boolean | null, name: string, description?: string | null, children: string[], research_cost: number, image_url?: string | null } | null };

export type TechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type TechnologiesQuery = { __typename?: 'query_root', technology: Array<{ __typename?: 'technology', id: string, root?: boolean | null, name: string, description?: string | null, children: string[], research_cost: number, image_url?: string | null }> };

export type TechFieldsFragment = { __typename?: 'technology', id: string, root?: boolean | null, name: string, description?: string | null, children: string[], research_cost: number, image_url?: string | null };

export type UpdateTechnologyByIdMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  input: Technology_Set_Input;
}>;


export type UpdateTechnologyByIdMutation = { __typename?: 'mutation_root', update_technology_by_pk?: { __typename?: 'technology', id: string, root?: boolean | null, name: string, description?: string | null, children: string[], research_cost: number, image_url?: string | null } | null };

export type UserInfoByIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserInfoByIdQuery = { __typename?: 'query_root', user_info_by_pk?: { __typename?: 'user_info', avatar_url?: string | null, name?: string | null } | null };

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
export const GalacticEmpireResourceGeneratorFieldsFragmentDoc = gql`
    fragment GalacticEmpireResourceGeneratorFields on galactic_empire_resource_generator {
  created_at
  planet_id
  count
  resource_generator {
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
    cost_growth_exponent
    cost_amount_1
    cost_resource_type_id_1
  }
  galactic_empire_id
}
    `;
export const EmpireResourceFieldsFragmentDoc = gql`
    fragment EmpireResourceFields on galactic_empire_resources {
  value
  resource_type {
    id
    type
  }
  id
}
    `;
export const QuestFieldsFragmentDoc = gql`
    fragment QuestFields on quest {
  name
  initial
  id
  description
  next_quest_in_chain
  type
  image_url
  steps_aggregate {
    aggregate {
      count
    }
  }
  rewards {
    resource_unlock_id
    resource_accrual_type_id
    resource_accrual_amount
    npc_unlock_id
    type
  }
}
    `;
export const TechFieldsFragmentDoc = gql`
    fragment TechFields on technology {
  id
  root
  name
  description
  children
  research_cost
  image_url
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
    rewards {
      npc_unlock_id
      resource_accrual_amount
      resource_accrual_type_id
      resource_unlock_id
      type
    }
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
export const IncrementResourceGeneratorCountDocument = gql`
    mutation IncrementResourceGeneratorCount($galacticEmpireId: uuid!, $resourceGeneratorId: uuid!, $increment: numeric!) {
  update_galactic_empire_resource_generator(
    _inc: {count: $increment}
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, generator_type_id: {_eq: $resourceGeneratorId}}
  ) {
    affected_rows
  }
}
    `;
export type IncrementResourceGeneratorCountMutationFn = Apollo.MutationFunction<IncrementResourceGeneratorCountMutation, IncrementResourceGeneratorCountMutationVariables>;
export type IncrementResourceGeneratorCountMutationResult = Apollo.MutationResult<IncrementResourceGeneratorCountMutation>;
export type IncrementResourceGeneratorCountMutationOptions = Apollo.BaseMutationOptions<IncrementResourceGeneratorCountMutation, IncrementResourceGeneratorCountMutationVariables>;
export const CreateEmpireResourceGeneratorDocument = gql`
    mutation CreateEmpireResourceGenerator($galacticEmpireId: uuid!, $generatorTypeId: uuid!) {
  insert_galactic_empire_resource_generator_one(
    object: {generator_type_id: $generatorTypeId, galactic_empire_id: $galacticEmpireId}
  ) {
    id
  }
}
    `;
export type CreateEmpireResourceGeneratorMutationFn = Apollo.MutationFunction<CreateEmpireResourceGeneratorMutation, CreateEmpireResourceGeneratorMutationVariables>;
export type CreateEmpireResourceGeneratorMutationResult = Apollo.MutationResult<CreateEmpireResourceGeneratorMutation>;
export type CreateEmpireResourceGeneratorMutationOptions = Apollo.BaseMutationOptions<CreateEmpireResourceGeneratorMutation, CreateEmpireResourceGeneratorMutationVariables>;
export const PurchaseResourceGeneratorDocument = gql`
    mutation PurchaseResourceGenerator($galacticEmpireId: String!, $resourceGeneratorId: String!) {
  purchaseResourceGenerator(
    galactic_empire_id: $galacticEmpireId
    generator_type_id: $resourceGeneratorId
  ) {
    spent
  }
}
    `;
export type PurchaseResourceGeneratorMutationFn = Apollo.MutationFunction<PurchaseResourceGeneratorMutation, PurchaseResourceGeneratorMutationVariables>;
export type PurchaseResourceGeneratorMutationResult = Apollo.MutationResult<PurchaseResourceGeneratorMutation>;
export type PurchaseResourceGeneratorMutationOptions = Apollo.BaseMutationOptions<PurchaseResourceGeneratorMutation, PurchaseResourceGeneratorMutationVariables>;
export const EmpireResourceGeneratorsByTypeDocument = gql`
    query EmpireResourceGeneratorsByType($galacticEmpireId: uuid!, $typeId: uuid!) {
  galactic_empire_resource_generator(
    where: {galactic_empire_id: {_eq: $galacticEmpireId}, generator_type_id: {_eq: $typeId}}
  ) {
    planet_id
    count
    resource_generator {
      id
      cost_growth_exponent
      cost_amount_1
      cost_resource_type_id_1
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
export type EmpireResourceGeneratorsByTypeQueryResult = Apollo.QueryResult<EmpireResourceGeneratorsByTypeQuery, EmpireResourceGeneratorsByTypeQueryVariables>;
export const EmpireResourceGeneratorsDocument = gql`
    subscription EmpireResourceGenerators {
  galactic_empire_resource_generator {
    ...GalacticEmpireResourceGeneratorFields
  }
}
    ${GalacticEmpireResourceGeneratorFieldsFragmentDoc}`;
export type EmpireResourceGeneratorsSubscriptionResult = Apollo.SubscriptionResult<EmpireResourceGeneratorsSubscription>;
export const EmpireResourceGeneratorsByEmpireIdDocument = gql`
    subscription EmpireResourceGeneratorsByEmpireId($empireId: uuid!) {
  galactic_empire_resource_generator(
    where: {galactic_empire_id: {_eq: $empireId}}
  ) {
    ...GalacticEmpireResourceGeneratorFields
  }
}
    ${GalacticEmpireResourceGeneratorFieldsFragmentDoc}`;
export type EmpireResourceGeneratorsByEmpireIdSubscriptionResult = Apollo.SubscriptionResult<EmpireResourceGeneratorsByEmpireIdSubscription>;
export const GalacticEmpireResourcesDocument = gql`
    subscription GalacticEmpireResources($empireId: uuid!) {
  galactic_empire_resources(where: {galactic_empire_id: {_eq: $empireId}}) {
    ...EmpireResourceFields
  }
}
    ${EmpireResourceFieldsFragmentDoc}`;
export type GalacticEmpireResourcesSubscriptionResult = Apollo.SubscriptionResult<GalacticEmpireResourcesSubscription>;
export const CurrentGalacticEmpireResourcesDocument = gql`
    query CurrentGalacticEmpireResources($empireId: uuid!) {
  galactic_empire_resources(where: {galactic_empire_id: {_eq: $empireId}}) {
    ...EmpireResourceFields
  }
}
    ${EmpireResourceFieldsFragmentDoc}`;
export type CurrentGalacticEmpireResourcesQueryResult = Apollo.QueryResult<CurrentGalacticEmpireResourcesQuery, CurrentGalacticEmpireResourcesQueryVariables>;
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
export const GalaxyByIdDocument = gql`
    query GalaxyById($id: uuid!) {
  galaxy_by_pk(id: $id) {
    ...GalaxyFields
  }
}
    ${GalaxyFieldsFragmentDoc}`;
export type GalaxyByIdQueryResult = Apollo.QueryResult<GalaxyByIdQuery, GalaxyByIdQueryVariables>;
export const GalaxyByNameDocument = gql`
    query GalaxyByName($name: String!) {
  galaxy(where: {name: {_eq: $name}}) {
    ...GalaxyFields
  }
}
    ${GalaxyFieldsFragmentDoc}`;
export type GalaxyByNameQueryResult = Apollo.QueryResult<GalaxyByNameQuery, GalaxyByNameQueryVariables>;
export const GalaxyByNameSubDocument = gql`
    subscription GalaxyByNameSub($name: String!) {
  galaxy(where: {name: {_eq: $name}}) {
    ...GalaxyFields
  }
}
    ${GalaxyFieldsFragmentDoc}`;
export type GalaxyByNameSubSubscriptionResult = Apollo.SubscriptionResult<GalaxyByNameSubSubscription>;
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
export const MusicDocument = gql`
    query Music {
  music {
    etag
    name
    metadata {
      Key
      Value
    }
  }
}
    `;
export type MusicQueryResult = Apollo.QueryResult<MusicQuery, MusicQueryVariables>;
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
export const CreateQuestDocument = gql`
    mutation CreateQuest($input: quest_insert_input!) {
  insert_quest_one(object: $input) {
    ...QuestFields
  }
}
    ${QuestFieldsFragmentDoc}`;
export type CreateQuestMutationFn = Apollo.MutationFunction<CreateQuestMutation, CreateQuestMutationVariables>;
export type CreateQuestMutationResult = Apollo.MutationResult<CreateQuestMutation>;
export type CreateQuestMutationOptions = Apollo.BaseMutationOptions<CreateQuestMutation, CreateQuestMutationVariables>;
export const QuestsDocument = gql`
    query Quests {
  quest {
    ...QuestFields
  }
}
    ${QuestFieldsFragmentDoc}`;
export type QuestsQueryResult = Apollo.QueryResult<QuestsQuery, QuestsQueryVariables>;
export const UpdateQuestByIdDocument = gql`
    mutation UpdateQuestById($id: uuid!, $input: quest_set_input!) {
  update_quest_by_pk(pk_columns: {id: $id}, _set: $input) {
    ...QuestFields
  }
}
    ${QuestFieldsFragmentDoc}`;
export type UpdateQuestByIdMutationFn = Apollo.MutationFunction<UpdateQuestByIdMutation, UpdateQuestByIdMutationVariables>;
export type UpdateQuestByIdMutationResult = Apollo.MutationResult<UpdateQuestByIdMutation>;
export type UpdateQuestByIdMutationOptions = Apollo.BaseMutationOptions<UpdateQuestByIdMutation, UpdateQuestByIdMutationVariables>;
export const ResourceGeneratorsDocument = gql`
    query ResourceGenerators {
  resource_generator {
    id
    name
    image_url
    description
    generation_rate
    resource_type {
      id
      type
      image_url
    }
    resource_type_1_id
    resource_type_2 {
      id
      type
      image_url
    }
    resource_type_2_id
    unlocked_by_technology_id
    cost_amount_1
    cost_growth_exponent
    cost_resource_type_id_1
  }
}
    `;
export type ResourceGeneratorsQueryResult = Apollo.QueryResult<ResourceGeneratorsQuery, ResourceGeneratorsQueryVariables>;
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
    avatar_url
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
export const CreateTechnologyDocument = gql`
    mutation CreateTechnology($input: technology_insert_input!) {
  insert_technology_one(object: $input) {
    ...TechFields
  }
}
    ${TechFieldsFragmentDoc}`;
export type CreateTechnologyMutationFn = Apollo.MutationFunction<CreateTechnologyMutation, CreateTechnologyMutationVariables>;
export type CreateTechnologyMutationResult = Apollo.MutationResult<CreateTechnologyMutation>;
export type CreateTechnologyMutationOptions = Apollo.BaseMutationOptions<CreateTechnologyMutation, CreateTechnologyMutationVariables>;
export const TechnologiesDocument = gql`
    query Technologies {
  technology {
    ...TechFields
  }
}
    ${TechFieldsFragmentDoc}`;
export type TechnologiesQueryResult = Apollo.QueryResult<TechnologiesQuery, TechnologiesQueryVariables>;
export const UpdateTechnologyByIdDocument = gql`
    mutation UpdateTechnologyById($id: uuid!, $input: technology_set_input!) {
  update_technology_by_pk(pk_columns: {id: $id}, _set: $input) {
    ...TechFields
  }
}
    ${TechFieldsFragmentDoc}`;
export type UpdateTechnologyByIdMutationFn = Apollo.MutationFunction<UpdateTechnologyByIdMutation, UpdateTechnologyByIdMutationVariables>;
export type UpdateTechnologyByIdMutationResult = Apollo.MutationResult<UpdateTechnologyByIdMutation>;
export type UpdateTechnologyByIdMutationOptions = Apollo.BaseMutationOptions<UpdateTechnologyByIdMutation, UpdateTechnologyByIdMutationVariables>;
export const UserInfoByIdDocument = gql`
    query UserInfoById($userId: String!) {
  user_info_by_pk(id: $userId) {
    avatar_url
    name
  }
}
    `;
export type UserInfoByIdQueryResult = Apollo.QueryResult<UserInfoByIdQuery, UserInfoByIdQueryVariables>;
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
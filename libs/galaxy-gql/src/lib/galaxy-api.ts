import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _numeric: any;
  _text: any;
  numeric: any;
  timestamp: any;
  uuid: any;
};

export type GalaxyManagement = {
  __typename?: 'GalaxyManagement';
  freeClaimsLeft: Scalars['Float'];
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

export type Register = {
  __typename?: 'Register';
  updatedName: Scalars['String'];
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

/** columns and relationships of "celestial" */
export type Celestial = {
  __typename?: 'celestial';
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
  /** on conflict condition */
  on_conflict?: InputMaybe<Celestial_On_Conflict>;
};

/** Boolean expression to filter rows from the table "celestial". All fields are combined with a logical 'AND'. */
export type Celestial_Bool_Exp = {
  _and?: InputMaybe<Array<Celestial_Bool_Exp>>;
  _not?: InputMaybe<Celestial_Bool_Exp>;
  _or?: InputMaybe<Array<Celestial_Bool_Exp>>;
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
  /** unique or primary key constraint */
  SystemPkey = 'system_pkey',
}

/** input type for inserting data into table "celestial" */
export type Celestial_Insert_Input = {
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
  galaxy_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "celestial" */
export type Celestial_Max_Order_By = {
  galaxy_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Celestial_Min_Fields = {
  __typename?: 'celestial_min_fields';
  galaxy_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "celestial" */
export type Celestial_Min_Order_By = {
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

/** on conflict condition type for table "celestial" */
export type Celestial_On_Conflict = {
  constraint: Celestial_Constraint;
  update_columns?: Array<Celestial_Update_Column>;
  where?: InputMaybe<Celestial_Bool_Exp>;
};

/** Ordering options when selecting data from "celestial". */
export type Celestial_Order_By = {
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
  GalaxyId = 'galaxy_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
}

/** input type for updating data in table "celestial" */
export type Celestial_Set_Input = {
  galaxy_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner_id?: InputMaybe<Scalars['String']>;
};

/** update columns of table "celestial" */
export enum Celestial_Update_Column {
  /** column name */
  GalaxyId = 'galaxy_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
}

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
  /** on conflict condition */
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
  /** unique or primary key constraint */
  ChatMessagesPkey = 'chat_messages_pkey',
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

/** on conflict condition type for table "chat_message" */
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
  Timestamp = 'timestamp',
}

/** input type for updating data in table "chat_message" */
export type Chat_Message_Set_Input = {
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
  Timestamp = 'timestamp',
}

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
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  radius?: InputMaybe<Int_Comparison_Exp>;
  stars?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "galaxy" */
export enum Galaxy_Constraint {
  /** unique or primary key constraint */
  GalaxyPkey = 'galaxy_pkey',
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
  /** on conflict condition */
  on_conflict?: InputMaybe<Galaxy_On_Conflict>;
};

/** on conflict condition type for table "galaxy" */
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
  Stars = 'stars',
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
  Stars = 'stars',
}

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
  /** delete data from the table: "celestial" */
  delete_celestial?: Maybe<Celestial_Mutation_Response>;
  /** delete single row from the table: "celestial" */
  delete_celestial_by_pk?: Maybe<Celestial>;
  /** delete data from the table: "chat_message" */
  delete_chat_message?: Maybe<Chat_Message_Mutation_Response>;
  /** delete single row from the table: "chat_message" */
  delete_chat_message_by_pk?: Maybe<Chat_Message>;
  /** delete data from the table: "galaxy" */
  delete_galaxy?: Maybe<Galaxy_Mutation_Response>;
  /** delete single row from the table: "galaxy" */
  delete_galaxy_by_pk?: Maybe<Galaxy>;
  /** delete data from the table: "planet" */
  delete_planet?: Maybe<Planet_Mutation_Response>;
  /** delete single row from the table: "planet" */
  delete_planet_by_pk?: Maybe<Planet>;
  /** delete data from the table: "planetary_ring" */
  delete_planetary_ring?: Maybe<Planetary_Ring_Mutation_Response>;
  /** delete single row from the table: "planetary_ring" */
  delete_planetary_ring_by_pk?: Maybe<Planetary_Ring>;
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
  /** insert data into the table: "celestial" */
  insert_celestial?: Maybe<Celestial_Mutation_Response>;
  /** insert a single row into the table: "celestial" */
  insert_celestial_one?: Maybe<Celestial>;
  /** insert data into the table: "chat_message" */
  insert_chat_message?: Maybe<Chat_Message_Mutation_Response>;
  /** insert a single row into the table: "chat_message" */
  insert_chat_message_one?: Maybe<Chat_Message>;
  /** insert data into the table: "galaxy" */
  insert_galaxy?: Maybe<Galaxy_Mutation_Response>;
  /** insert a single row into the table: "galaxy" */
  insert_galaxy_one?: Maybe<Galaxy>;
  /** insert data into the table: "planet" */
  insert_planet?: Maybe<Planet_Mutation_Response>;
  /** insert a single row into the table: "planet" */
  insert_planet_one?: Maybe<Planet>;
  /** insert data into the table: "planetary_ring" */
  insert_planetary_ring?: Maybe<Planetary_Ring_Mutation_Response>;
  /** insert a single row into the table: "planetary_ring" */
  insert_planetary_ring_one?: Maybe<Planetary_Ring>;
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
  requestRandomCelestial?: Maybe<GalaxyManagement>;
  setDisplayName?: Maybe<Register>;
  /** update data of the table: "celestial" */
  update_celestial?: Maybe<Celestial_Mutation_Response>;
  /** update single row of the table: "celestial" */
  update_celestial_by_pk?: Maybe<Celestial>;
  /** update data of the table: "chat_message" */
  update_chat_message?: Maybe<Chat_Message_Mutation_Response>;
  /** update single row of the table: "chat_message" */
  update_chat_message_by_pk?: Maybe<Chat_Message>;
  /** update data of the table: "galaxy" */
  update_galaxy?: Maybe<Galaxy_Mutation_Response>;
  /** update single row of the table: "galaxy" */
  update_galaxy_by_pk?: Maybe<Galaxy>;
  /** update data of the table: "planet" */
  update_planet?: Maybe<Planet_Mutation_Response>;
  /** update single row of the table: "planet" */
  update_planet_by_pk?: Maybe<Planet>;
  /** update data of the table: "planetary_ring" */
  update_planetary_ring?: Maybe<Planetary_Ring_Mutation_Response>;
  /** update single row of the table: "planetary_ring" */
  update_planetary_ring_by_pk?: Maybe<Planetary_Ring>;
  /** update data of the table: "terrain_hex_palette" */
  update_terrain_hex_palette?: Maybe<Terrain_Hex_Palette_Mutation_Response>;
  /** update single row of the table: "terrain_hex_palette" */
  update_terrain_hex_palette_by_pk?: Maybe<Terrain_Hex_Palette>;
  /** update data of the table: "user_info" */
  update_user_info?: Maybe<User_Info_Mutation_Response>;
  /** update single row of the table: "user_info" */
  update_user_info_by_pk?: Maybe<User_Info>;
  /** update data of the table: "user_me" */
  update_user_me?: Maybe<User_Me_Mutation_Response>;
  /** update data of the table: "user_private" */
  update_user_private?: Maybe<User_Private_Mutation_Response>;
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
export type Mutation_RootDelete_GalaxyArgs = {
  where: Galaxy_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Galaxy_By_PkArgs = {
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
export type Mutation_RootRequestRandomCelestialArgs = {
  galaxy_id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootSetDisplayNameArgs = {
  display_name: Scalars['String'];
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
export type Mutation_RootUpdate_User_MeArgs = {
  _inc?: InputMaybe<User_Me_Inc_Input>;
  _set?: InputMaybe<User_Me_Set_Input>;
  where: User_Me_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_PrivateArgs = {
  _set?: InputMaybe<User_Private_Set_Input>;
  where: User_Private_Bool_Exp;
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
  DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "planet" */
export type Planet = {
  __typename?: 'planet';
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
  /** on conflict condition */
  on_conflict?: InputMaybe<Planet_On_Conflict>;
};

/** aggregate avg on columns */
export type Planet_Avg_Fields = {
  __typename?: 'planet_avg_fields';
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "planet" */
export type Planet_Avg_Order_By = {
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "planet". All fields are combined with a logical 'AND'. */
export type Planet_Bool_Exp = {
  _and?: InputMaybe<Array<Planet_Bool_Exp>>;
  _not?: InputMaybe<Planet_Bool_Exp>;
  _or?: InputMaybe<Array<Planet_Bool_Exp>>;
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
  /** unique or primary key constraint */
  PlanetNameKey = 'planet_name_key',
  /** unique or primary key constraint */
  PlanetPkey = 'planet_pkey',
}

/** input type for incrementing numeric columns in table "planet" */
export type Planet_Inc_Input = {
  radius?: InputMaybe<Scalars['numeric']>;
  texture_resolution?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "planet" */
export type Planet_Insert_Input = {
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

/** on conflict condition type for table "planet" */
export type Planet_On_Conflict = {
  constraint: Planet_Constraint;
  update_columns?: Array<Planet_Update_Column>;
  where?: InputMaybe<Planet_Bool_Exp>;
};

/** Ordering options when selecting data from "planet". */
export type Planet_Order_By = {
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
  TextureResolution = 'texture_resolution',
}

/** input type for updating data in table "planet" */
export type Planet_Set_Input = {
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
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "planet" */
export type Planet_Stddev_Order_By = {
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Planet_Stddev_Pop_Fields = {
  __typename?: 'planet_stddev_pop_fields';
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "planet" */
export type Planet_Stddev_Pop_Order_By = {
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Planet_Stddev_Samp_Fields = {
  __typename?: 'planet_stddev_samp_fields';
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "planet" */
export type Planet_Stddev_Samp_Order_By = {
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Planet_Sum_Fields = {
  __typename?: 'planet_sum_fields';
  radius?: Maybe<Scalars['numeric']>;
  texture_resolution?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "planet" */
export type Planet_Sum_Order_By = {
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** update columns of table "planet" */
export enum Planet_Update_Column {
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
  TextureResolution = 'texture_resolution',
}

/** aggregate var_pop on columns */
export type Planet_Var_Pop_Fields = {
  __typename?: 'planet_var_pop_fields';
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "planet" */
export type Planet_Var_Pop_Order_By = {
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Planet_Var_Samp_Fields = {
  __typename?: 'planet_var_samp_fields';
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "planet" */
export type Planet_Var_Samp_Order_By = {
  radius?: InputMaybe<Order_By>;
  texture_resolution?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Planet_Variance_Fields = {
  __typename?: 'planet_variance_fields';
  radius?: Maybe<Scalars['Float']>;
  texture_resolution?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "planet" */
export type Planet_Variance_Order_By = {
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
  /** on conflict condition */
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
  /** unique or primary key constraint */
  PlanetaryRingPkey = 'planetary_ring_pkey',
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

/** on conflict condition type for table "planetary_ring" */
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
  Type = 'type',
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
  Type = 'type',
}

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

export type Query_Root = {
  __typename?: 'query_root';
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
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch aggregated fields from the table: "galaxy" */
  galaxy_aggregate: Galaxy_Aggregate;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
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

export type Subscription_Root = {
  __typename?: 'subscription_root';
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
  /** fetch data from the table: "galaxy" */
  galaxy: Array<Galaxy>;
  /** fetch aggregated fields from the table: "galaxy" */
  galaxy_aggregate: Galaxy_Aggregate;
  /** fetch data from the table: "galaxy" using primary key columns */
  galaxy_by_pk?: Maybe<Galaxy>;
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
  /** unique or primary key constraint */
  TerrainHexPaletteNameKey = 'terrain_hex_palette_name_key',
  /** unique or primary key constraint */
  TerrainHexPalettePkey = 'terrain_hex_palette_pkey',
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
  /** on conflict condition */
  on_conflict?: InputMaybe<Terrain_Hex_Palette_On_Conflict>;
};

/** on conflict condition type for table "terrain_hex_palette" */
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
  Water = 'water',
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
  Water = 'water',
}

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
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
  secret_setting_test?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_info" */
export enum User_Info_Constraint {
  /** unique or primary key constraint */
  UserInfoDisplayNameKey = 'user_info_display_name_key',
  /** unique or primary key constraint */
  UserPkey = 'user_pkey',
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
  /** on conflict condition */
  on_conflict?: InputMaybe<User_Info_On_Conflict>;
};

/** on conflict condition type for table "user_info" */
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
  SecretSettingTest = 'secret_setting_test',
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
  SecretSettingTest = 'secret_setting_test',
}

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
  SecretSettingTest = 'secret_setting_test',
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

/** aggregate sum on columns */
export type User_Me_Sum_Fields = {
  __typename?: 'user_me_sum_fields';
  free_claims?: Maybe<Scalars['Int']>;
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
  UserId = 'user_id',
}

/** input type for updating data in table "user_private" */
export type User_Private_Set_Input = {
  secret_setting_test?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['String']>;
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

export type CelestialFieldsFragment = {
  __typename?: 'celestial';
  id: string;
  name?: string | null;
  owner_id?: string | null;
  user_info?: {
    __typename?: 'user_info';
    display_name?: string | null;
    name?: string | null;
  } | null;
};

export type GalaxyFieldsFragment = {
  __typename?: 'galaxy';
  id: any;
  name?: string | null;
  curvature: any;
  core_radius_factor: any;
  core_concentration_factor: any;
  arms: any;
  arm_width: any;
  radius: number;
  stars: number;
  celestials: Array<{
    __typename?: 'celestial';
    id: string;
    name?: string | null;
    owner_id?: string | null;
    user_info?: {
      __typename?: 'user_info';
      display_name?: string | null;
      name?: string | null;
    } | null;
  }>;
};

export type CelestialByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type CelestialByIdQuery = {
  __typename?: 'query_root';
  celestial_by_pk?: {
    __typename?: 'celestial';
    id: string;
    name?: string | null;
    owner_id?: string | null;
    galaxy: {
      __typename?: 'galaxy';
      name?: string | null;
      stars: number;
      id: any;
    };
    user_info?: {
      __typename?: 'user_info';
      display_name?: string | null;
      id: string;
    } | null;
  } | null;
};

export type EdNewGalaxyQueryQueryVariables = Exact<{ [key: string]: never }>;

export type EdNewGalaxyQueryQuery = {
  __typename?: 'query_root';
  galaxy: Array<{
    __typename?: 'galaxy';
    id: any;
    arms: any;
    celestials: Array<{
      __typename?: 'celestial';
      id: string;
      name?: string | null;
      user_info?: {
        __typename?: 'user_info';
        avatar_url?: string | null;
        id: string;
        name?: string | null;
        nickname: string;
      } | null;
    }>;
  }>;
};

export type CelestialsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type CelestialsSubscription = {
  __typename?: 'subscription_root';
  celestial: Array<{
    __typename?: 'celestial';
    id: string;
    name?: string | null;
    owner_id?: string | null;
    user_info?: {
      __typename?: 'user_info';
      display_name?: string | null;
      name?: string | null;
    } | null;
  }>;
};

export type CelestialsByGalaxyIdSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type CelestialsByGalaxyIdSubscription = {
  __typename?: 'subscription_root';
  galaxy_by_pk?: {
    __typename?: 'galaxy';
    celestials: Array<{
      __typename?: 'celestial';
      name?: string | null;
      id: string;
      owner_id?: string | null;
    }>;
    celestials_aggregate: {
      __typename?: 'celestial_aggregate';
      nodes: Array<{
        __typename?: 'celestial';
        owner_id?: string | null;
        user_info?: {
          __typename?: 'user_info';
          display_name?: string | null;
          avatar_url?: string | null;
        } | null;
      }>;
    };
  } | null;
};

export type RequestRandomCelestialByGalaxyIdMutationVariables = Exact<{
  galaxy_id: Scalars['String'];
}>;

export type RequestRandomCelestialByGalaxyIdMutation = {
  __typename?: 'mutation_root';
  requestRandomCelestial?: {
    __typename?: 'GalaxyManagement';
    freeClaimsLeft: number;
  } | null;
};

export type TryInsertClaimedCelestialMutationVariables = Exact<{
  galaxy_id: Scalars['uuid'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner_id: Scalars['String'];
  free_claims: Scalars['Int'];
}>;

export type TryInsertClaimedCelestialMutation = {
  __typename?: 'mutation_root';
  insert_celestial_one?: {
    __typename?: 'celestial';
    galaxy_id: any;
    id: string;
    name?: string | null;
    owner_id?: string | null;
  } | null;
  update_user_info_by_pk?: {
    __typename?: 'user_info';
    free_claims: number;
  } | null;
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
    user_info: {
      __typename?: 'user_info';
      nickname: string;
      id: string;
      display_name?: string | null;
    };
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
  message?: InputMaybe<Scalars['String']>;
}>;

export type SendNewMessageMutation = {
  __typename?: 'mutation_root';
  insert_chat_message_one?: {
    __typename?: 'chat_message';
    message: string;
  } | null;
};

export type CreateGalaxyMutationVariables = Exact<{
  input: Galaxy_Insert_Input;
}>;

export type CreateGalaxyMutation = {
  __typename?: 'mutation_root';
  insert_galaxy_one?: {
    __typename?: 'galaxy';
    id: any;
    name?: string | null;
    curvature: any;
    core_radius_factor: any;
    core_concentration_factor: any;
    arms: any;
    arm_width: any;
    radius: number;
    stars: number;
    celestials: Array<{
      __typename?: 'celestial';
      id: string;
      name?: string | null;
      owner_id?: string | null;
      user_info?: {
        __typename?: 'user_info';
        display_name?: string | null;
        name?: string | null;
      } | null;
    }>;
  } | null;
};

export type DeleteGalaxyByIdMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type DeleteGalaxyByIdMutation = {
  __typename?: 'mutation_root';
  delete_galaxy_by_pk?: {
    __typename?: 'galaxy';
    id: any;
    name?: string | null;
  } | null;
};

export type GalaxiesSubscriptionVariables = Exact<{ [key: string]: never }>;

export type GalaxiesSubscription = {
  __typename?: 'subscription_root';
  galaxy: Array<{
    __typename?: 'galaxy';
    id: any;
    name?: string | null;
    curvature: any;
    core_radius_factor: any;
    core_concentration_factor: any;
    arms: any;
    arm_width: any;
    radius: number;
    stars: number;
    celestials: Array<{
      __typename?: 'celestial';
      id: string;
      name?: string | null;
      owner_id?: string | null;
      user_info?: {
        __typename?: 'user_info';
        display_name?: string | null;
        name?: string | null;
      } | null;
    }>;
  }>;
};

export type GalaxyByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type GalaxyByIdQuery = {
  __typename?: 'query_root';
  galaxy_by_pk?: {
    __typename?: 'galaxy';
    arm_width: any;
    arms: any;
    core_concentration_factor: any;
    core_radius_factor: any;
    curvature: any;
    id: any;
    name?: string | null;
    radius: number;
    stars: number;
  } | null;
};

export type GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables =
  Exact<{
    userId: Scalars['String'];
    galaxyId: Scalars['uuid'];
  }>;

export type GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery = {
  __typename?: 'query_root';
  user_info_by_pk?: { __typename?: 'user_info'; free_claims: number } | null;
  galaxy_by_pk?: { __typename?: 'galaxy'; id: any; stars: number } | null;
  celestial: Array<{ __typename?: 'celestial'; id: string }>;
};

export type SelfQueryVariables = Exact<{ [key: string]: never }>;

export type SelfQuery = {
  __typename?: 'query_root';
  user_me: Array<{
    __typename?: 'user_me';
    display_name?: string | null;
    id?: string | null;
    name?: string | null;
    nickname?: string | null;
    secret_setting_test?: string | null;
    free_claims?: number | null;
  }>;
};

export type SetDisplayNameByUserIdMutationVariables = Exact<{
  id: Scalars['String'];
  display_name: Scalars['String'];
}>;

export type SetDisplayNameByUserIdMutation = {
  __typename?: 'mutation_root';
  update_user_info_by_pk?: {
    __typename?: 'user_info';
    display_name?: string | null;
  } | null;
};

export type SetNameByUserIdMutationVariables = Exact<{
  display_name?: InputMaybe<Scalars['String']>;
}>;

export type SetNameByUserIdMutation = {
  __typename?: 'mutation_root';
  setDisplayName?: { __typename?: 'Register'; updatedName: string } | null;
};

export type UpdateFreeClaimsMutationVariables = Exact<{
  id: Scalars['String'];
  free_claims: Scalars['Int'];
}>;

export type UpdateFreeClaimsMutation = {
  __typename?: 'mutation_root';
  update_user_info_by_pk?: {
    __typename?: 'user_info';
    free_claims: number;
  } | null;
};

export type UserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type UserInfoQuery = {
  __typename?: 'query_root';
  user_info: Array<{
    __typename?: 'user_info';
    avatar_url?: string | null;
    id: string;
    name?: string | null;
    display_name?: string | null;
  }>;
};

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
    celestials {
      ...CelestialFields
    }
  }
  ${CelestialFieldsFragmentDoc}
`;
export const CelestialByIdDocument = gql`
  query CelestialById($id: String!) {
    celestial_by_pk(id: $id) {
      id
      name
      owner_id
      galaxy {
        name
        stars
        id
      }
      user_info {
        display_name
        id
      }
    }
  }
`;
export type CelestialByIdQueryResult = Apollo.QueryResult<
  CelestialByIdQuery,
  CelestialByIdQueryVariables
>;
export const EdNewGalaxyQueryDocument = gql`
  query EdNewGalaxyQuery {
    galaxy {
      id
      arms
      celestials {
        id
        name
        user_info {
          avatar_url
          id
          name
          nickname
        }
      }
    }
  }
`;
export type EdNewGalaxyQueryQueryResult = Apollo.QueryResult<
  EdNewGalaxyQueryQuery,
  EdNewGalaxyQueryQueryVariables
>;
export const CelestialsDocument = gql`
  subscription Celestials {
    celestial {
      ...CelestialFields
    }
  }
  ${CelestialFieldsFragmentDoc}
`;
export type CelestialsSubscriptionResult =
  Apollo.SubscriptionResult<CelestialsSubscription>;
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
export type CelestialsByGalaxyIdSubscriptionResult =
  Apollo.SubscriptionResult<CelestialsByGalaxyIdSubscription>;
export const RequestRandomCelestialByGalaxyIdDocument = gql`
  mutation RequestRandomCelestialByGalaxyId($galaxy_id: String!) {
    requestRandomCelestial(galaxy_id: $galaxy_id) {
      freeClaimsLeft
    }
  }
`;
export type RequestRandomCelestialByGalaxyIdMutationFn =
  Apollo.MutationFunction<
    RequestRandomCelestialByGalaxyIdMutation,
    RequestRandomCelestialByGalaxyIdMutationVariables
  >;
export type RequestRandomCelestialByGalaxyIdMutationResult =
  Apollo.MutationResult<RequestRandomCelestialByGalaxyIdMutation>;
export type RequestRandomCelestialByGalaxyIdMutationOptions =
  Apollo.BaseMutationOptions<
    RequestRandomCelestialByGalaxyIdMutation,
    RequestRandomCelestialByGalaxyIdMutationVariables
  >;
export const TryInsertClaimedCelestialDocument = gql`
  mutation TryInsertClaimedCelestial(
    $galaxy_id: uuid!
    $id: String!
    $name: String!
    $owner_id: String!
    $free_claims: Int!
  ) {
    insert_celestial_one(
      object: {
        galaxy_id: $galaxy_id
        id: $id
        name: $name
        owner_id: $owner_id
      }
      on_conflict: { constraint: system_pkey, update_columns: owner_id }
    ) {
      galaxy_id
      id
      name
      owner_id
    }
    update_user_info_by_pk(
      pk_columns: { id: $owner_id }
      _set: { free_claims: $free_claims }
    ) {
      free_claims
    }
  }
`;
export type TryInsertClaimedCelestialMutationFn = Apollo.MutationFunction<
  TryInsertClaimedCelestialMutation,
  TryInsertClaimedCelestialMutationVariables
>;
export type TryInsertClaimedCelestialMutationResult =
  Apollo.MutationResult<TryInsertClaimedCelestialMutation>;
export type TryInsertClaimedCelestialMutationOptions =
  Apollo.BaseMutationOptions<
    TryInsertClaimedCelestialMutation,
    TryInsertClaimedCelestialMutationVariables
  >;
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
        display_name
      }
    }
  }
`;
export type GetChatMessagesSubscriptionResult =
  Apollo.SubscriptionResult<GetChatMessagesSubscription>;
export const LatestMessageDocument = gql`
  subscription LatestMessage {
    chat_message(limit: 1, order_by: { timestamp: desc }) {
      id
      message
    }
  }
`;
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
export type SendNewMessageMutationResult =
  Apollo.MutationResult<SendNewMessageMutation>;
export type SendNewMessageMutationOptions = Apollo.BaseMutationOptions<
  SendNewMessageMutation,
  SendNewMessageMutationVariables
>;
export const CreateGalaxyDocument = gql`
  mutation CreateGalaxy($input: galaxy_insert_input!) {
    insert_galaxy_one(object: $input) {
      ...GalaxyFields
    }
  }
  ${GalaxyFieldsFragmentDoc}
`;
export type CreateGalaxyMutationFn = Apollo.MutationFunction<
  CreateGalaxyMutation,
  CreateGalaxyMutationVariables
>;
export type CreateGalaxyMutationResult =
  Apollo.MutationResult<CreateGalaxyMutation>;
export type CreateGalaxyMutationOptions = Apollo.BaseMutationOptions<
  CreateGalaxyMutation,
  CreateGalaxyMutationVariables
>;
export const DeleteGalaxyByIdDocument = gql`
  mutation DeleteGalaxyById($id: uuid!) {
    delete_galaxy_by_pk(id: $id) {
      id
      name
    }
  }
`;
export type DeleteGalaxyByIdMutationFn = Apollo.MutationFunction<
  DeleteGalaxyByIdMutation,
  DeleteGalaxyByIdMutationVariables
>;
export type DeleteGalaxyByIdMutationResult =
  Apollo.MutationResult<DeleteGalaxyByIdMutation>;
export type DeleteGalaxyByIdMutationOptions = Apollo.BaseMutationOptions<
  DeleteGalaxyByIdMutation,
  DeleteGalaxyByIdMutationVariables
>;
export const GalaxiesDocument = gql`
  subscription Galaxies {
    galaxy {
      ...GalaxyFields
    }
  }
  ${GalaxyFieldsFragmentDoc}
`;
export type GalaxiesSubscriptionResult =
  Apollo.SubscriptionResult<GalaxiesSubscription>;
export const GalaxyByIdDocument = gql`
  query GalaxyById($id: uuid!) {
    galaxy_by_pk(id: $id) {
      arm_width
      arms
      core_concentration_factor
      core_radius_factor
      curvature
      id
      name
      radius
      stars
    }
  }
`;
export type GalaxyByIdQueryResult = Apollo.QueryResult<
  GalaxyByIdQuery,
  GalaxyByIdQueryVariables
>;
export const GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsDocument = gql`
  query GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestials(
    $userId: String!
    $galaxyId: uuid!
  ) {
    user_info_by_pk(id: $userId) {
      free_claims
    }
    galaxy_by_pk(id: $galaxyId) {
      id
      stars
    }
    celestial(
      where: {
        galaxy_id: { _eq: $galaxyId }
        _and: { owner_id: { _is_null: true } }
      }
    ) {
      id
    }
  }
`;
export type GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryResult =
  Apollo.QueryResult<
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery,
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables
  >;
export const SelfDocument = gql`
  query Self {
    user_me {
      display_name
      id
      name
      nickname
      secret_setting_test
      free_claims
    }
  }
`;
export type SelfQueryResult = Apollo.QueryResult<SelfQuery, SelfQueryVariables>;
export const SetDisplayNameByUserIdDocument = gql`
  mutation SetDisplayNameByUserID($id: String!, $display_name: String!) {
    update_user_info_by_pk(
      pk_columns: { id: $id }
      _set: { display_name: $display_name }
    ) {
      display_name
    }
  }
`;
export type SetDisplayNameByUserIdMutationFn = Apollo.MutationFunction<
  SetDisplayNameByUserIdMutation,
  SetDisplayNameByUserIdMutationVariables
>;
export type SetDisplayNameByUserIdMutationResult =
  Apollo.MutationResult<SetDisplayNameByUserIdMutation>;
export type SetDisplayNameByUserIdMutationOptions = Apollo.BaseMutationOptions<
  SetDisplayNameByUserIdMutation,
  SetDisplayNameByUserIdMutationVariables
>;
export const SetNameByUserIdDocument = gql`
  mutation SetNameByUserID($display_name: String = "") {
    setDisplayName(display_name: $display_name) {
      updatedName
    }
  }
`;
export type SetNameByUserIdMutationFn = Apollo.MutationFunction<
  SetNameByUserIdMutation,
  SetNameByUserIdMutationVariables
>;
export type SetNameByUserIdMutationResult =
  Apollo.MutationResult<SetNameByUserIdMutation>;
export type SetNameByUserIdMutationOptions = Apollo.BaseMutationOptions<
  SetNameByUserIdMutation,
  SetNameByUserIdMutationVariables
>;
export const UpdateFreeClaimsDocument = gql`
  mutation UpdateFreeClaims($id: String!, $free_claims: Int!) {
    update_user_info_by_pk(
      pk_columns: { id: $id }
      _set: { free_claims: $free_claims }
    ) {
      free_claims
    }
  }
`;
export type UpdateFreeClaimsMutationFn = Apollo.MutationFunction<
  UpdateFreeClaimsMutation,
  UpdateFreeClaimsMutationVariables
>;
export type UpdateFreeClaimsMutationResult =
  Apollo.MutationResult<UpdateFreeClaimsMutation>;
export type UpdateFreeClaimsMutationOptions = Apollo.BaseMutationOptions<
  UpdateFreeClaimsMutation,
  UpdateFreeClaimsMutationVariables
>;
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
export type UserInfoQueryResult = Apollo.QueryResult<
  UserInfoQuery,
  UserInfoQueryVariables
>;

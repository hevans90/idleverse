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

export type Register = {
  __typename?: 'Register';
  updatedName: Scalars['String'];
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

/** columns and relationships of "celestial" */
export type Celestial = {
  __typename?: 'celestial';
  /** An object relationship */
  galaxy: Galaxy;
  galaxy_id: Scalars['uuid'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  user_info?: Maybe<User_Info>;
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
  columns?: Maybe<Array<Celestial_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "celestial" */
export type Celestial_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Celestial_Max_Order_By>;
  min?: Maybe<Celestial_Min_Order_By>;
};

/** input type for inserting array relation for remote table "celestial" */
export type Celestial_Arr_Rel_Insert_Input = {
  data: Array<Celestial_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Celestial_On_Conflict>;
};

/** Boolean expression to filter rows from the table "celestial". All fields are combined with a logical 'AND'. */
export type Celestial_Bool_Exp = {
  _and?: Maybe<Array<Celestial_Bool_Exp>>;
  _not?: Maybe<Celestial_Bool_Exp>;
  _or?: Maybe<Array<Celestial_Bool_Exp>>;
  galaxy?: Maybe<Galaxy_Bool_Exp>;
  galaxy_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  user_info?: Maybe<User_Info_Bool_Exp>;
};

/** unique or primary key constraints on table "celestial" */
export enum Celestial_Constraint {
  /** unique or primary key constraint */
  SystemPkey = 'system_pkey',
}

/** input type for inserting data into table "celestial" */
export type Celestial_Insert_Input = {
  galaxy?: Maybe<Galaxy_Obj_Rel_Insert_Input>;
  galaxy_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  user_info?: Maybe<User_Info_Obj_Rel_Insert_Input>;
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
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
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
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
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
  where?: Maybe<Celestial_Bool_Exp>;
};

/** Ordering options when selecting data from "celestial". */
export type Celestial_Order_By = {
  galaxy?: Maybe<Galaxy_Order_By>;
  galaxy_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  user_info?: Maybe<User_Info_Order_By>;
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
  galaxy_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
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
  columns?: Maybe<Array<Chat_Message_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "chat_message" */
export type Chat_Message_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Chat_Message_Max_Order_By>;
  min?: Maybe<Chat_Message_Min_Order_By>;
};

/** input type for inserting array relation for remote table "chat_message" */
export type Chat_Message_Arr_Rel_Insert_Input = {
  data: Array<Chat_Message_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Chat_Message_On_Conflict>;
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

/** unique or primary key constraints on table "chat_message" */
export enum Chat_Message_Constraint {
  /** unique or primary key constraint */
  ChatMessagesPkey = 'chat_messages_pkey',
}

/** input type for inserting data into table "chat_message" */
export type Chat_Message_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  poster_id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
  user_info?: Maybe<User_Info_Obj_Rel_Insert_Input>;
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
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  poster_id?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
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

/** on conflict condition type for table "chat_message" */
export type Chat_Message_On_Conflict = {
  constraint: Chat_Message_Constraint;
  update_columns?: Array<Chat_Message_Update_Column>;
  where?: Maybe<Chat_Message_Bool_Exp>;
};

/** Ordering options when selecting data from "chat_message". */
export type Chat_Message_Order_By = {
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  poster_id?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
  user_info?: Maybe<User_Info_Order_By>;
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
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  poster_id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamp']>;
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
  distinct_on?: Maybe<Array<Celestial_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Celestial_Order_By>>;
  where?: Maybe<Celestial_Bool_Exp>;
};

/** columns and relationships of "galaxy" */
export type GalaxyCelestials_AggregateArgs = {
  distinct_on?: Maybe<Array<Celestial_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Celestial_Order_By>>;
  where?: Maybe<Celestial_Bool_Exp>;
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
  columns?: Maybe<Array<Galaxy_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
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
  _and?: Maybe<Array<Galaxy_Bool_Exp>>;
  _not?: Maybe<Galaxy_Bool_Exp>;
  _or?: Maybe<Array<Galaxy_Bool_Exp>>;
  arm_width?: Maybe<Numeric_Comparison_Exp>;
  arms?: Maybe<Numeric_Comparison_Exp>;
  celestials?: Maybe<Celestial_Bool_Exp>;
  core_concentration_factor?: Maybe<Numeric_Comparison_Exp>;
  core_radius_factor?: Maybe<Numeric_Comparison_Exp>;
  curvature?: Maybe<Numeric_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  radius?: Maybe<Int_Comparison_Exp>;
  stars?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "galaxy" */
export enum Galaxy_Constraint {
  /** unique or primary key constraint */
  GalaxyPkey = 'galaxy_pkey',
}

/** input type for incrementing numeric columns in table "galaxy" */
export type Galaxy_Inc_Input = {
  arm_width?: Maybe<Scalars['numeric']>;
  arms?: Maybe<Scalars['numeric']>;
  core_concentration_factor?: Maybe<Scalars['numeric']>;
  core_radius_factor?: Maybe<Scalars['numeric']>;
  curvature?: Maybe<Scalars['numeric']>;
  radius?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "galaxy" */
export type Galaxy_Insert_Input = {
  arm_width?: Maybe<Scalars['numeric']>;
  arms?: Maybe<Scalars['numeric']>;
  celestials?: Maybe<Celestial_Arr_Rel_Insert_Input>;
  core_concentration_factor?: Maybe<Scalars['numeric']>;
  core_radius_factor?: Maybe<Scalars['numeric']>;
  curvature?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['Int']>;
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
  on_conflict?: Maybe<Galaxy_On_Conflict>;
};

/** on conflict condition type for table "galaxy" */
export type Galaxy_On_Conflict = {
  constraint: Galaxy_Constraint;
  update_columns?: Array<Galaxy_Update_Column>;
  where?: Maybe<Galaxy_Bool_Exp>;
};

/** Ordering options when selecting data from "galaxy". */
export type Galaxy_Order_By = {
  arm_width?: Maybe<Order_By>;
  arms?: Maybe<Order_By>;
  celestials_aggregate?: Maybe<Celestial_Aggregate_Order_By>;
  core_concentration_factor?: Maybe<Order_By>;
  core_radius_factor?: Maybe<Order_By>;
  curvature?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
  stars?: Maybe<Order_By>;
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
  on_conflict?: Maybe<Celestial_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Celestial_OneArgs = {
  object: Celestial_Insert_Input;
  on_conflict?: Maybe<Celestial_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Chat_MessageArgs = {
  objects: Array<Chat_Message_Insert_Input>;
  on_conflict?: Maybe<Chat_Message_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Chat_Message_OneArgs = {
  object: Chat_Message_Insert_Input;
  on_conflict?: Maybe<Chat_Message_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GalaxyArgs = {
  objects: Array<Galaxy_Insert_Input>;
  on_conflict?: Maybe<Galaxy_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Galaxy_OneArgs = {
  object: Galaxy_Insert_Input;
  on_conflict?: Maybe<Galaxy_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_InfoArgs = {
  objects: Array<User_Info_Insert_Input>;
  on_conflict?: Maybe<User_Info_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Info_OneArgs = {
  object: User_Info_Insert_Input;
  on_conflict?: Maybe<User_Info_On_Conflict>;
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
  _set?: Maybe<Celestial_Set_Input>;
  where: Celestial_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Celestial_By_PkArgs = {
  _set?: Maybe<Celestial_Set_Input>;
  pk_columns: Celestial_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Chat_MessageArgs = {
  _set?: Maybe<Chat_Message_Set_Input>;
  where: Chat_Message_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Chat_Message_By_PkArgs = {
  _set?: Maybe<Chat_Message_Set_Input>;
  pk_columns: Chat_Message_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_GalaxyArgs = {
  _inc?: Maybe<Galaxy_Inc_Input>;
  _set?: Maybe<Galaxy_Set_Input>;
  where: Galaxy_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Galaxy_By_PkArgs = {
  _inc?: Maybe<Galaxy_Inc_Input>;
  _set?: Maybe<Galaxy_Set_Input>;
  pk_columns: Galaxy_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_InfoArgs = {
  _inc?: Maybe<User_Info_Inc_Input>;
  _set?: Maybe<User_Info_Set_Input>;
  where: User_Info_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_Info_By_PkArgs = {
  _inc?: Maybe<User_Info_Inc_Input>;
  _set?: Maybe<User_Info_Set_Input>;
  pk_columns: User_Info_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_MeArgs = {
  _inc?: Maybe<User_Me_Inc_Input>;
  _set?: Maybe<User_Me_Set_Input>;
  where: User_Me_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_PrivateArgs = {
  _set?: Maybe<User_Private_Set_Input>;
  where: User_Private_Bool_Exp;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
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
  returnNothing?: Maybe<GalaxyManagement>;
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
  distinct_on?: Maybe<Array<Celestial_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Celestial_Order_By>>;
  where?: Maybe<Celestial_Bool_Exp>;
};

export type Query_RootCelestial_AggregateArgs = {
  distinct_on?: Maybe<Array<Celestial_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Celestial_Order_By>>;
  where?: Maybe<Celestial_Bool_Exp>;
};

export type Query_RootCelestial_By_PkArgs = {
  id: Scalars['String'];
};

export type Query_RootChat_MessageArgs = {
  distinct_on?: Maybe<Array<Chat_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Message_Order_By>>;
  where?: Maybe<Chat_Message_Bool_Exp>;
};

export type Query_RootChat_Message_AggregateArgs = {
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

export type Query_RootGalaxy_AggregateArgs = {
  distinct_on?: Maybe<Array<Galaxy_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Galaxy_Order_By>>;
  where?: Maybe<Galaxy_Bool_Exp>;
};

export type Query_RootGalaxy_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootUser_InfoArgs = {
  distinct_on?: Maybe<Array<User_Info_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Info_Order_By>>;
  where?: Maybe<User_Info_Bool_Exp>;
};

export type Query_RootUser_Info_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Info_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Info_Order_By>>;
  where?: Maybe<User_Info_Bool_Exp>;
};

export type Query_RootUser_Info_By_PkArgs = {
  id: Scalars['String'];
};

export type Query_RootUser_MeArgs = {
  distinct_on?: Maybe<Array<User_Me_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Me_Order_By>>;
  where?: Maybe<User_Me_Bool_Exp>;
};

export type Query_RootUser_Me_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Me_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Me_Order_By>>;
  where?: Maybe<User_Me_Bool_Exp>;
};

export type Query_RootUser_PrivateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};

export type Query_RootUser_Private_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
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
  distinct_on?: Maybe<Array<Celestial_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Celestial_Order_By>>;
  where?: Maybe<Celestial_Bool_Exp>;
};

export type Subscription_RootCelestial_AggregateArgs = {
  distinct_on?: Maybe<Array<Celestial_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Celestial_Order_By>>;
  where?: Maybe<Celestial_Bool_Exp>;
};

export type Subscription_RootCelestial_By_PkArgs = {
  id: Scalars['String'];
};

export type Subscription_RootChat_MessageArgs = {
  distinct_on?: Maybe<Array<Chat_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Message_Order_By>>;
  where?: Maybe<Chat_Message_Bool_Exp>;
};

export type Subscription_RootChat_Message_AggregateArgs = {
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

export type Subscription_RootGalaxy_AggregateArgs = {
  distinct_on?: Maybe<Array<Galaxy_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Galaxy_Order_By>>;
  where?: Maybe<Galaxy_Bool_Exp>;
};

export type Subscription_RootGalaxy_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootUser_InfoArgs = {
  distinct_on?: Maybe<Array<User_Info_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Info_Order_By>>;
  where?: Maybe<User_Info_Bool_Exp>;
};

export type Subscription_RootUser_Info_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Info_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Info_Order_By>>;
  where?: Maybe<User_Info_Bool_Exp>;
};

export type Subscription_RootUser_Info_By_PkArgs = {
  id: Scalars['String'];
};

export type Subscription_RootUser_MeArgs = {
  distinct_on?: Maybe<Array<User_Me_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Me_Order_By>>;
  where?: Maybe<User_Me_Bool_Exp>;
};

export type Subscription_RootUser_Me_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Me_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Me_Order_By>>;
  where?: Maybe<User_Me_Bool_Exp>;
};

export type Subscription_RootUser_PrivateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};

export type Subscription_RootUser_Private_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};

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
  avatar_url?: Maybe<Scalars['String']>;
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
  /** An array relationship */
  systems: Array<Celestial>;
  /** An aggregate relationship */
  systems_aggregate: Celestial_Aggregate;
};

/** columns and relationships of "user_info" */
export type User_InfoChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Message_Order_By>>;
  where?: Maybe<Chat_Message_Bool_Exp>;
};

/** columns and relationships of "user_info" */
export type User_InfoChat_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Message_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Message_Order_By>>;
  where?: Maybe<Chat_Message_Bool_Exp>;
};

/** columns and relationships of "user_info" */
export type User_InfoSystemsArgs = {
  distinct_on?: Maybe<Array<Celestial_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Celestial_Order_By>>;
  where?: Maybe<Celestial_Bool_Exp>;
};

/** columns and relationships of "user_info" */
export type User_InfoSystems_AggregateArgs = {
  distinct_on?: Maybe<Array<Celestial_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Celestial_Order_By>>;
  where?: Maybe<Celestial_Bool_Exp>;
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
  columns?: Maybe<Array<User_Info_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Info_Avg_Fields = {
  __typename?: 'user_info_avg_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_info". All fields are combined with a logical 'AND'. */
export type User_Info_Bool_Exp = {
  _and?: Maybe<Array<User_Info_Bool_Exp>>;
  _not?: Maybe<User_Info_Bool_Exp>;
  _or?: Maybe<Array<User_Info_Bool_Exp>>;
  avatar_url?: Maybe<String_Comparison_Exp>;
  chat_messages?: Maybe<Chat_Message_Bool_Exp>;
  display_name?: Maybe<String_Comparison_Exp>;
  free_claims?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  nickname?: Maybe<String_Comparison_Exp>;
  secret_setting_test?: Maybe<String_Comparison_Exp>;
  systems?: Maybe<Celestial_Bool_Exp>;
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
  free_claims?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_info" */
export type User_Info_Insert_Input = {
  avatar_url?: Maybe<Scalars['String']>;
  chat_messages?: Maybe<Chat_Message_Arr_Rel_Insert_Input>;
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
  systems?: Maybe<Celestial_Arr_Rel_Insert_Input>;
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
  on_conflict?: Maybe<User_Info_On_Conflict>;
};

/** on conflict condition type for table "user_info" */
export type User_Info_On_Conflict = {
  constraint: User_Info_Constraint;
  update_columns?: Array<User_Info_Update_Column>;
  where?: Maybe<User_Info_Bool_Exp>;
};

/** Ordering options when selecting data from "user_info". */
export type User_Info_Order_By = {
  avatar_url?: Maybe<Order_By>;
  chat_messages_aggregate?: Maybe<Chat_Message_Aggregate_Order_By>;
  display_name?: Maybe<Order_By>;
  free_claims?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  secret_setting_test?: Maybe<Order_By>;
  systems_aggregate?: Maybe<Celestial_Aggregate_Order_By>;
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
  avatar_url?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
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
  columns?: Maybe<Array<User_Me_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Me_Avg_Fields = {
  __typename?: 'user_me_avg_fields';
  free_claims?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_me". All fields are combined with a logical 'AND'. */
export type User_Me_Bool_Exp = {
  _and?: Maybe<Array<User_Me_Bool_Exp>>;
  _not?: Maybe<User_Me_Bool_Exp>;
  _or?: Maybe<Array<User_Me_Bool_Exp>>;
  display_name?: Maybe<String_Comparison_Exp>;
  free_claims?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  nickname?: Maybe<String_Comparison_Exp>;
  secret_setting_test?: Maybe<String_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "user_me" */
export type User_Me_Inc_Input = {
  free_claims?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_me" */
export type User_Me_Insert_Input = {
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
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
  display_name?: Maybe<Order_By>;
  free_claims?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  secret_setting_test?: Maybe<Order_By>;
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
  display_name?: Maybe<Scalars['String']>;
  free_claims?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  secret_setting_test?: Maybe<Scalars['String']>;
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
  columns?: Maybe<Array<User_Private_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
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
  user_id?: Maybe<Scalars['String']>;
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
  user_id?: Maybe<Scalars['String']>;
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

export type CelestialFieldsFragment = {
  __typename?: 'celestial';
  id: string;
  name?: Maybe<string>;
  owner_id?: Maybe<string>;
  user_info?: Maybe<{
    __typename?: 'user_info';
    display_name?: Maybe<string>;
    name?: Maybe<string>;
  }>;
};

export type GalaxyFieldsFragment = {
  __typename?: 'galaxy';
  id: any;
  name?: Maybe<string>;
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
    name?: Maybe<string>;
    owner_id?: Maybe<string>;
    user_info?: Maybe<{
      __typename?: 'user_info';
      display_name?: Maybe<string>;
      name?: Maybe<string>;
    }>;
  }>;
};

export type CelestialsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type CelestialsSubscription = {
  __typename?: 'subscription_root';
  celestial: Array<{
    __typename?: 'celestial';
    id: string;
    name?: Maybe<string>;
    owner_id?: Maybe<string>;
    user_info?: Maybe<{
      __typename?: 'user_info';
      display_name?: Maybe<string>;
      name?: Maybe<string>;
    }>;
  }>;
};

export type CelestialsByGalaxyIdSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type CelestialsByGalaxyIdSubscription = {
  __typename?: 'subscription_root';
  galaxy_by_pk?: Maybe<{
    __typename?: 'galaxy';
    celestials: Array<{
      __typename?: 'celestial';
      name?: Maybe<string>;
      id: string;
      owner_id?: Maybe<string>;
    }>;
    celestials_aggregate: {
      __typename?: 'celestial_aggregate';
      nodes: Array<{
        __typename?: 'celestial';
        owner_id?: Maybe<string>;
        user_info?: Maybe<{
          __typename?: 'user_info';
          display_name?: Maybe<string>;
          avatar_url?: Maybe<string>;
        }>;
      }>;
    };
  }>;
};

export type RequestRandomCelestialByGalaxyIdMutationVariables = Exact<{
  galaxy_id: Scalars['String'];
}>;

export type RequestRandomCelestialByGalaxyIdMutation = {
  __typename?: 'mutation_root';
  requestRandomCelestial?: Maybe<{
    __typename?: 'GalaxyManagement';
    freeClaimsLeft: number;
  }>;
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
  insert_celestial_one?: Maybe<{
    __typename?: 'celestial';
    galaxy_id: any;
    id: string;
    name?: Maybe<string>;
    owner_id?: Maybe<string>;
  }>;
  update_user_info_by_pk?: Maybe<{
    __typename?: 'user_info';
    free_claims: number;
  }>;
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
      display_name?: Maybe<string>;
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
  message?: Maybe<Scalars['String']>;
}>;

export type SendNewMessageMutation = {
  __typename?: 'mutation_root';
  insert_chat_message_one?: Maybe<{
    __typename?: 'chat_message';
    message: string;
  }>;
};

export type CreateGalaxyMutationVariables = Exact<{
  input: Galaxy_Insert_Input;
}>;

export type CreateGalaxyMutation = {
  __typename?: 'mutation_root';
  insert_galaxy_one?: Maybe<{
    __typename?: 'galaxy';
    id: any;
    name?: Maybe<string>;
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
      name?: Maybe<string>;
      owner_id?: Maybe<string>;
      user_info?: Maybe<{
        __typename?: 'user_info';
        display_name?: Maybe<string>;
        name?: Maybe<string>;
      }>;
    }>;
  }>;
};

export type DeleteGalaxyByIdMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type DeleteGalaxyByIdMutation = {
  __typename?: 'mutation_root';
  delete_galaxy_by_pk?: Maybe<{
    __typename?: 'galaxy';
    id: any;
    name?: Maybe<string>;
  }>;
};

export type GalaxiesSubscriptionVariables = Exact<{ [key: string]: never }>;

export type GalaxiesSubscription = {
  __typename?: 'subscription_root';
  galaxy: Array<{
    __typename?: 'galaxy';
    id: any;
    name?: Maybe<string>;
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
      name?: Maybe<string>;
      owner_id?: Maybe<string>;
      user_info?: Maybe<{
        __typename?: 'user_info';
        display_name?: Maybe<string>;
        name?: Maybe<string>;
      }>;
    }>;
  }>;
};

export type GalaxyByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type GalaxyByIdQuery = {
  __typename?: 'query_root';
  galaxy_by_pk?: Maybe<{
    __typename?: 'galaxy';
    arm_width: any;
    arms: any;
    core_concentration_factor: any;
    core_radius_factor: any;
    curvature: any;
    id: any;
    name?: Maybe<string>;
    radius: number;
    stars: number;
  }>;
};

export type GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables =
  Exact<{
    userId: Scalars['String'];
    galaxyId: Scalars['uuid'];
  }>;

export type GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery = {
  __typename?: 'query_root';
  user_info_by_pk?: Maybe<{ __typename?: 'user_info'; free_claims: number }>;
  galaxy_by_pk?: Maybe<{ __typename?: 'galaxy'; id: any; stars: number }>;
  celestial: Array<{ __typename?: 'celestial'; id: string }>;
};

export type SelfQueryVariables = Exact<{ [key: string]: never }>;

export type SelfQuery = {
  __typename?: 'query_root';
  user_me: Array<{
    __typename?: 'user_me';
    display_name?: Maybe<string>;
    id?: Maybe<string>;
    name?: Maybe<string>;
    nickname?: Maybe<string>;
    secret_setting_test?: Maybe<string>;
    free_claims?: Maybe<number>;
  }>;
};

export type SetDisplayNameByUserIdMutationVariables = Exact<{
  id: Scalars['String'];
  display_name: Scalars['String'];
}>;

export type SetDisplayNameByUserIdMutation = {
  __typename?: 'mutation_root';
  update_user_info_by_pk?: Maybe<{
    __typename?: 'user_info';
    display_name?: Maybe<string>;
  }>;
};

export type SetNameByUserIdMutationVariables = Exact<{
  display_name?: Maybe<Scalars['String']>;
}>;

export type SetNameByUserIdMutation = {
  __typename?: 'mutation_root';
  setDisplayName?: Maybe<{ __typename?: 'Register'; updatedName: string }>;
};

export type UpdateFreeClaimsMutationVariables = Exact<{
  id: Scalars['String'];
  free_claims: Scalars['Int'];
}>;

export type UpdateFreeClaimsMutation = {
  __typename?: 'mutation_root';
  update_user_info_by_pk?: Maybe<{
    __typename?: 'user_info';
    free_claims: number;
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
export const CelestialsDocument = gql`
  subscription Celestials {
    celestial {
      ...CelestialFields
    }
  }
  ${CelestialFieldsFragmentDoc}
`;

/**
 * __useCelestialsSubscription__
 *
 * To run a query within a React component, call `useCelestialsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCelestialsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCelestialsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCelestialsSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    CelestialsSubscription,
    CelestialsSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    CelestialsSubscription,
    CelestialsSubscriptionVariables
  >(CelestialsDocument, options);
}
export type CelestialsSubscriptionHookResult = ReturnType<
  typeof useCelestialsSubscription
>;
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

/**
 * __useCelestialsByGalaxyIdSubscription__
 *
 * To run a query within a React component, call `useCelestialsByGalaxyIdSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCelestialsByGalaxyIdSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCelestialsByGalaxyIdSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCelestialsByGalaxyIdSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    CelestialsByGalaxyIdSubscription,
    CelestialsByGalaxyIdSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    CelestialsByGalaxyIdSubscription,
    CelestialsByGalaxyIdSubscriptionVariables
  >(CelestialsByGalaxyIdDocument, options);
}
export type CelestialsByGalaxyIdSubscriptionHookResult = ReturnType<
  typeof useCelestialsByGalaxyIdSubscription
>;
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

/**
 * __useRequestRandomCelestialByGalaxyIdMutation__
 *
 * To run a mutation, you first call `useRequestRandomCelestialByGalaxyIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestRandomCelestialByGalaxyIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestRandomCelestialByGalaxyIdMutation, { data, loading, error }] = useRequestRandomCelestialByGalaxyIdMutation({
 *   variables: {
 *      galaxy_id: // value for 'galaxy_id'
 *   },
 * });
 */
export function useRequestRandomCelestialByGalaxyIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestRandomCelestialByGalaxyIdMutation,
    RequestRandomCelestialByGalaxyIdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestRandomCelestialByGalaxyIdMutation,
    RequestRandomCelestialByGalaxyIdMutationVariables
  >(RequestRandomCelestialByGalaxyIdDocument, options);
}
export type RequestRandomCelestialByGalaxyIdMutationHookResult = ReturnType<
  typeof useRequestRandomCelestialByGalaxyIdMutation
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

/**
 * __useTryInsertClaimedCelestialMutation__
 *
 * To run a mutation, you first call `useTryInsertClaimedCelestialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTryInsertClaimedCelestialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tryInsertClaimedCelestialMutation, { data, loading, error }] = useTryInsertClaimedCelestialMutation({
 *   variables: {
 *      galaxy_id: // value for 'galaxy_id'
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      owner_id: // value for 'owner_id'
 *      free_claims: // value for 'free_claims'
 *   },
 * });
 */
export function useTryInsertClaimedCelestialMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TryInsertClaimedCelestialMutation,
    TryInsertClaimedCelestialMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    TryInsertClaimedCelestialMutation,
    TryInsertClaimedCelestialMutationVariables
  >(TryInsertClaimedCelestialDocument, options);
}
export type TryInsertClaimedCelestialMutationHookResult = ReturnType<
  typeof useTryInsertClaimedCelestialMutation
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

/**
 * __useCreateGalaxyMutation__
 *
 * To run a mutation, you first call `useCreateGalaxyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGalaxyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGalaxyMutation, { data, loading, error }] = useCreateGalaxyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGalaxyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGalaxyMutation,
    CreateGalaxyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateGalaxyMutation,
    CreateGalaxyMutationVariables
  >(CreateGalaxyDocument, options);
}
export type CreateGalaxyMutationHookResult = ReturnType<
  typeof useCreateGalaxyMutation
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

/**
 * __useDeleteGalaxyByIdMutation__
 *
 * To run a mutation, you first call `useDeleteGalaxyByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGalaxyByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGalaxyByIdMutation, { data, loading, error }] = useDeleteGalaxyByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGalaxyByIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteGalaxyByIdMutation,
    DeleteGalaxyByIdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteGalaxyByIdMutation,
    DeleteGalaxyByIdMutationVariables
  >(DeleteGalaxyByIdDocument, options);
}
export type DeleteGalaxyByIdMutationHookResult = ReturnType<
  typeof useDeleteGalaxyByIdMutation
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

/**
 * __useGalaxyByIdQuery__
 *
 * To run a query within a React component, call `useGalaxyByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGalaxyByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGalaxyByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGalaxyByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GalaxyByIdQuery,
    GalaxyByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GalaxyByIdQuery, GalaxyByIdQueryVariables>(
    GalaxyByIdDocument,
    options
  );
}
export function useGalaxyByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GalaxyByIdQuery,
    GalaxyByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GalaxyByIdQuery, GalaxyByIdQueryVariables>(
    GalaxyByIdDocument,
    options
  );
}
export type GalaxyByIdQueryHookResult = ReturnType<typeof useGalaxyByIdQuery>;
export type GalaxyByIdLazyQueryHookResult = ReturnType<
  typeof useGalaxyByIdLazyQuery
>;
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

/**
 * __useGetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery__
 *
 * To run a query within a React component, call `useGetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      galaxyId: // value for 'galaxyId'
 *   },
 * });
 */
export function useGetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery,
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery,
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables
  >(GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsDocument, options);
}
export function useGetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery,
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery,
    GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryVariables
  >(GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsDocument, options);
}
export type GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQueryHookResult =
  ReturnType<
    typeof useGetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsQuery
  >;
export type GetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsLazyQueryHookResult =
  ReturnType<
    typeof useGetUserFreeClaimsAndGalaxyByIdAndUnclaimedCelestialsLazyQuery
  >;
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

/**
 * __useSelfQuery__
 *
 * To run a query within a React component, call `useSelfQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelfQuery(
  baseOptions?: Apollo.QueryHookOptions<SelfQuery, SelfQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SelfQuery, SelfQueryVariables>(SelfDocument, options);
}
export function useSelfLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SelfQuery, SelfQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SelfQuery, SelfQueryVariables>(
    SelfDocument,
    options
  );
}
export type SelfQueryHookResult = ReturnType<typeof useSelfQuery>;
export type SelfLazyQueryHookResult = ReturnType<typeof useSelfLazyQuery>;
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

/**
 * __useSetDisplayNameByUserIdMutation__
 *
 * To run a mutation, you first call `useSetDisplayNameByUserIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDisplayNameByUserIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDisplayNameByUserIdMutation, { data, loading, error }] = useSetDisplayNameByUserIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *      display_name: // value for 'display_name'
 *   },
 * });
 */
export function useSetDisplayNameByUserIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetDisplayNameByUserIdMutation,
    SetDisplayNameByUserIdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetDisplayNameByUserIdMutation,
    SetDisplayNameByUserIdMutationVariables
  >(SetDisplayNameByUserIdDocument, options);
}
export type SetDisplayNameByUserIdMutationHookResult = ReturnType<
  typeof useSetDisplayNameByUserIdMutation
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

/**
 * __useSetNameByUserIdMutation__
 *
 * To run a mutation, you first call `useSetNameByUserIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNameByUserIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNameByUserIdMutation, { data, loading, error }] = useSetNameByUserIdMutation({
 *   variables: {
 *      display_name: // value for 'display_name'
 *   },
 * });
 */
export function useSetNameByUserIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetNameByUserIdMutation,
    SetNameByUserIdMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SetNameByUserIdMutation,
    SetNameByUserIdMutationVariables
  >(SetNameByUserIdDocument, options);
}
export type SetNameByUserIdMutationHookResult = ReturnType<
  typeof useSetNameByUserIdMutation
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

/**
 * __useUpdateFreeClaimsMutation__
 *
 * To run a mutation, you first call `useUpdateFreeClaimsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFreeClaimsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFreeClaimsMutation, { data, loading, error }] = useUpdateFreeClaimsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      free_claims: // value for 'free_claims'
 *   },
 * });
 */
export function useUpdateFreeClaimsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFreeClaimsMutation,
    UpdateFreeClaimsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateFreeClaimsMutation,
    UpdateFreeClaimsMutationVariables
  >(UpdateFreeClaimsDocument, options);
}
export type UpdateFreeClaimsMutationHookResult = ReturnType<
  typeof useUpdateFreeClaimsMutation
>;
export type UpdateFreeClaimsMutationResult =
  Apollo.MutationResult<UpdateFreeClaimsMutation>;
export type UpdateFreeClaimsMutationOptions = Apollo.BaseMutationOptions<
  UpdateFreeClaimsMutation,
  UpdateFreeClaimsMutationVariables
>;

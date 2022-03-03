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
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
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

/** columns and relationships of "advert" */
export type Advert = {
  __typename?: 'advert';
  /** An object relationship */
  boardObjectByBoardObject: Board_Object;
  board_object: Scalars['uuid'];
  food_kind: Scalars['uuid'];
  food_quantity: Scalars['Int'];
  game: Scalars['uuid'];
  /** An object relationship */
  gameByGame: Game;
  id: Scalars['uuid'];
  kind: Scalars['uuid'];
};

/** aggregated selection of "advert" */
export type Advert_Aggregate = {
  __typename?: 'advert_aggregate';
  aggregate?: Maybe<Advert_Aggregate_Fields>;
  nodes: Array<Advert>;
};

/** aggregate fields of "advert" */
export type Advert_Aggregate_Fields = {
  __typename?: 'advert_aggregate_fields';
  avg?: Maybe<Advert_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Advert_Max_Fields>;
  min?: Maybe<Advert_Min_Fields>;
  stddev?: Maybe<Advert_Stddev_Fields>;
  stddev_pop?: Maybe<Advert_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Advert_Stddev_Samp_Fields>;
  sum?: Maybe<Advert_Sum_Fields>;
  var_pop?: Maybe<Advert_Var_Pop_Fields>;
  var_samp?: Maybe<Advert_Var_Samp_Fields>;
  variance?: Maybe<Advert_Variance_Fields>;
};

/** aggregate fields of "advert" */
export type Advert_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Advert_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "advert" */
export type Advert_Aggregate_Order_By = {
  avg?: InputMaybe<Advert_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Advert_Max_Order_By>;
  min?: InputMaybe<Advert_Min_Order_By>;
  stddev?: InputMaybe<Advert_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Advert_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Advert_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Advert_Sum_Order_By>;
  var_pop?: InputMaybe<Advert_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Advert_Var_Samp_Order_By>;
  variance?: InputMaybe<Advert_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "advert" */
export type Advert_Arr_Rel_Insert_Input = {
  data: Array<Advert_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Advert_On_Conflict>;
};

/** aggregate avg on columns */
export type Advert_Avg_Fields = {
  __typename?: 'advert_avg_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "advert" */
export type Advert_Avg_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "advert". All fields are combined with a logical 'AND'. */
export type Advert_Bool_Exp = {
  _and?: InputMaybe<Array<Advert_Bool_Exp>>;
  _not?: InputMaybe<Advert_Bool_Exp>;
  _or?: InputMaybe<Array<Advert_Bool_Exp>>;
  boardObjectByBoardObject?: InputMaybe<Board_Object_Bool_Exp>;
  board_object?: InputMaybe<Uuid_Comparison_Exp>;
  food_kind?: InputMaybe<Uuid_Comparison_Exp>;
  food_quantity?: InputMaybe<Int_Comparison_Exp>;
  game?: InputMaybe<Uuid_Comparison_Exp>;
  gameByGame?: InputMaybe<Game_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "advert" */
export enum Advert_Constraint {
  /** unique or primary key constraint */
  AdvertPkey = 'advert_pkey',
}

/** input type for incrementing numeric columns in table "advert" */
export type Advert_Inc_Input = {
  food_quantity?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "advert" */
export type Advert_Insert_Input = {
  boardObjectByBoardObject?: InputMaybe<Board_Object_Obj_Rel_Insert_Input>;
  board_object?: InputMaybe<Scalars['uuid']>;
  food_kind?: InputMaybe<Scalars['uuid']>;
  food_quantity?: InputMaybe<Scalars['Int']>;
  game?: InputMaybe<Scalars['uuid']>;
  gameByGame?: InputMaybe<Game_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  kind?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Advert_Max_Fields = {
  __typename?: 'advert_max_fields';
  board_object?: Maybe<Scalars['uuid']>;
  food_kind?: Maybe<Scalars['uuid']>;
  food_quantity?: Maybe<Scalars['Int']>;
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  kind?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "advert" */
export type Advert_Max_Order_By = {
  board_object?: InputMaybe<Order_By>;
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Advert_Min_Fields = {
  __typename?: 'advert_min_fields';
  board_object?: Maybe<Scalars['uuid']>;
  food_kind?: Maybe<Scalars['uuid']>;
  food_quantity?: Maybe<Scalars['Int']>;
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  kind?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "advert" */
export type Advert_Min_Order_By = {
  board_object?: InputMaybe<Order_By>;
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "advert" */
export type Advert_Mutation_Response = {
  __typename?: 'advert_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Advert>;
};

/** on conflict condition type for table "advert" */
export type Advert_On_Conflict = {
  constraint: Advert_Constraint;
  update_columns?: Array<Advert_Update_Column>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

/** Ordering options when selecting data from "advert". */
export type Advert_Order_By = {
  boardObjectByBoardObject?: InputMaybe<Board_Object_Order_By>;
  board_object?: InputMaybe<Order_By>;
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  gameByGame?: InputMaybe<Game_Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
};

/** primary key columns input for table: advert */
export type Advert_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "advert" */
export enum Advert_Select_Column {
  /** column name */
  BoardObject = 'board_object',
  /** column name */
  FoodKind = 'food_kind',
  /** column name */
  FoodQuantity = 'food_quantity',
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
}

/** input type for updating data in table "advert" */
export type Advert_Set_Input = {
  board_object?: InputMaybe<Scalars['uuid']>;
  food_kind?: InputMaybe<Scalars['uuid']>;
  food_quantity?: InputMaybe<Scalars['Int']>;
  game?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  kind?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Advert_Stddev_Fields = {
  __typename?: 'advert_stddev_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "advert" */
export type Advert_Stddev_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Advert_Stddev_Pop_Fields = {
  __typename?: 'advert_stddev_pop_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "advert" */
export type Advert_Stddev_Pop_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Advert_Stddev_Samp_Fields = {
  __typename?: 'advert_stddev_samp_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "advert" */
export type Advert_Stddev_Samp_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Advert_Sum_Fields = {
  __typename?: 'advert_sum_fields';
  food_quantity?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "advert" */
export type Advert_Sum_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** update columns of table "advert" */
export enum Advert_Update_Column {
  /** column name */
  BoardObject = 'board_object',
  /** column name */
  FoodKind = 'food_kind',
  /** column name */
  FoodQuantity = 'food_quantity',
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
}

/** aggregate var_pop on columns */
export type Advert_Var_Pop_Fields = {
  __typename?: 'advert_var_pop_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "advert" */
export type Advert_Var_Pop_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Advert_Var_Samp_Fields = {
  __typename?: 'advert_var_samp_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "advert" */
export type Advert_Var_Samp_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Advert_Variance_Fields = {
  __typename?: 'advert_variance_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "advert" */
export type Advert_Variance_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** columns and relationships of "board_object" */
export type Board_Object = {
  __typename?: 'board_object';
  /** An array relationship */
  adverts: Array<Advert>;
  /** An aggregate relationship */
  adverts_aggregate: Advert_Aggregate;
  /** An array relationship */
  diners: Array<Diner>;
  /** An aggregate relationship */
  diners_aggregate: Diner_Aggregate;
  /** An object relationship */
  drink?: Maybe<Drink>;
  /** An array relationship */
  gardens: Array<Garden>;
  /** An aggregate relationship */
  gardens_aggregate: Garden_Aggregate;
  /** An object relationship */
  house?: Maybe<House>;
  i: Scalars['Int'];
  id: Scalars['uuid'];
  j: Scalars['Int'];
  kind: Scalars['String'];
  /** An object relationship */
  road?: Maybe<Road>;
  rotation: Scalars['Int'];
};

/** columns and relationships of "board_object" */
export type Board_ObjectAdvertsArgs = {
  distinct_on?: InputMaybe<Array<Advert_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Advert_Order_By>>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

/** columns and relationships of "board_object" */
export type Board_ObjectAdverts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Advert_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Advert_Order_By>>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

/** columns and relationships of "board_object" */
export type Board_ObjectDinersArgs = {
  distinct_on?: InputMaybe<Array<Diner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Diner_Order_By>>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

/** columns and relationships of "board_object" */
export type Board_ObjectDiners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Diner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Diner_Order_By>>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

/** columns and relationships of "board_object" */
export type Board_ObjectGardensArgs = {
  distinct_on?: InputMaybe<Array<Garden_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Garden_Order_By>>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

/** columns and relationships of "board_object" */
export type Board_ObjectGardens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Garden_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Garden_Order_By>>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

/** aggregated selection of "board_object" */
export type Board_Object_Aggregate = {
  __typename?: 'board_object_aggregate';
  aggregate?: Maybe<Board_Object_Aggregate_Fields>;
  nodes: Array<Board_Object>;
};

/** aggregate fields of "board_object" */
export type Board_Object_Aggregate_Fields = {
  __typename?: 'board_object_aggregate_fields';
  avg?: Maybe<Board_Object_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Board_Object_Max_Fields>;
  min?: Maybe<Board_Object_Min_Fields>;
  stddev?: Maybe<Board_Object_Stddev_Fields>;
  stddev_pop?: Maybe<Board_Object_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Board_Object_Stddev_Samp_Fields>;
  sum?: Maybe<Board_Object_Sum_Fields>;
  var_pop?: Maybe<Board_Object_Var_Pop_Fields>;
  var_samp?: Maybe<Board_Object_Var_Samp_Fields>;
  variance?: Maybe<Board_Object_Variance_Fields>;
};

/** aggregate fields of "board_object" */
export type Board_Object_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Board_Object_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Board_Object_Avg_Fields = {
  __typename?: 'board_object_avg_fields';
  i?: Maybe<Scalars['Float']>;
  j?: Maybe<Scalars['Float']>;
  rotation?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "board_object". All fields are combined with a logical 'AND'. */
export type Board_Object_Bool_Exp = {
  _and?: InputMaybe<Array<Board_Object_Bool_Exp>>;
  _not?: InputMaybe<Board_Object_Bool_Exp>;
  _or?: InputMaybe<Array<Board_Object_Bool_Exp>>;
  adverts?: InputMaybe<Advert_Bool_Exp>;
  diners?: InputMaybe<Diner_Bool_Exp>;
  drink?: InputMaybe<Drink_Bool_Exp>;
  gardens?: InputMaybe<Garden_Bool_Exp>;
  house?: InputMaybe<House_Bool_Exp>;
  i?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  j?: InputMaybe<Int_Comparison_Exp>;
  kind?: InputMaybe<String_Comparison_Exp>;
  road?: InputMaybe<Road_Bool_Exp>;
  rotation?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "board_object" */
export enum Board_Object_Constraint {
  /** unique or primary key constraint */
  BoardObjectPkey = 'board_object_pkey',
}

/** input type for incrementing numeric columns in table "board_object" */
export type Board_Object_Inc_Input = {
  i?: InputMaybe<Scalars['Int']>;
  j?: InputMaybe<Scalars['Int']>;
  rotation?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "board_object" */
export type Board_Object_Insert_Input = {
  adverts?: InputMaybe<Advert_Arr_Rel_Insert_Input>;
  diners?: InputMaybe<Diner_Arr_Rel_Insert_Input>;
  drink?: InputMaybe<Drink_Obj_Rel_Insert_Input>;
  gardens?: InputMaybe<Garden_Arr_Rel_Insert_Input>;
  house?: InputMaybe<House_Obj_Rel_Insert_Input>;
  i?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  j?: InputMaybe<Scalars['Int']>;
  kind?: InputMaybe<Scalars['String']>;
  road?: InputMaybe<Road_Obj_Rel_Insert_Input>;
  rotation?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Board_Object_Max_Fields = {
  __typename?: 'board_object_max_fields';
  i?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  j?: Maybe<Scalars['Int']>;
  kind?: Maybe<Scalars['String']>;
  rotation?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Board_Object_Min_Fields = {
  __typename?: 'board_object_min_fields';
  i?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  j?: Maybe<Scalars['Int']>;
  kind?: Maybe<Scalars['String']>;
  rotation?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "board_object" */
export type Board_Object_Mutation_Response = {
  __typename?: 'board_object_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Board_Object>;
};

/** input type for inserting object relation for remote table "board_object" */
export type Board_Object_Obj_Rel_Insert_Input = {
  data: Board_Object_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Board_Object_On_Conflict>;
};

/** on conflict condition type for table "board_object" */
export type Board_Object_On_Conflict = {
  constraint: Board_Object_Constraint;
  update_columns?: Array<Board_Object_Update_Column>;
  where?: InputMaybe<Board_Object_Bool_Exp>;
};

/** Ordering options when selecting data from "board_object". */
export type Board_Object_Order_By = {
  adverts_aggregate?: InputMaybe<Advert_Aggregate_Order_By>;
  diners_aggregate?: InputMaybe<Diner_Aggregate_Order_By>;
  drink?: InputMaybe<Drink_Order_By>;
  gardens_aggregate?: InputMaybe<Garden_Aggregate_Order_By>;
  house?: InputMaybe<House_Order_By>;
  i?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  j?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  road?: InputMaybe<Road_Order_By>;
  rotation?: InputMaybe<Order_By>;
};

/** primary key columns input for table: board_object */
export type Board_Object_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "board_object" */
export enum Board_Object_Select_Column {
  /** column name */
  I = 'i',
  /** column name */
  Id = 'id',
  /** column name */
  J = 'j',
  /** column name */
  Kind = 'kind',
  /** column name */
  Rotation = 'rotation',
}

/** input type for updating data in table "board_object" */
export type Board_Object_Set_Input = {
  i?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  j?: InputMaybe<Scalars['Int']>;
  kind?: InputMaybe<Scalars['String']>;
  rotation?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Board_Object_Stddev_Fields = {
  __typename?: 'board_object_stddev_fields';
  i?: Maybe<Scalars['Float']>;
  j?: Maybe<Scalars['Float']>;
  rotation?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Board_Object_Stddev_Pop_Fields = {
  __typename?: 'board_object_stddev_pop_fields';
  i?: Maybe<Scalars['Float']>;
  j?: Maybe<Scalars['Float']>;
  rotation?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Board_Object_Stddev_Samp_Fields = {
  __typename?: 'board_object_stddev_samp_fields';
  i?: Maybe<Scalars['Float']>;
  j?: Maybe<Scalars['Float']>;
  rotation?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Board_Object_Sum_Fields = {
  __typename?: 'board_object_sum_fields';
  i?: Maybe<Scalars['Int']>;
  j?: Maybe<Scalars['Int']>;
  rotation?: Maybe<Scalars['Int']>;
};

/** update columns of table "board_object" */
export enum Board_Object_Update_Column {
  /** column name */
  I = 'i',
  /** column name */
  Id = 'id',
  /** column name */
  J = 'j',
  /** column name */
  Kind = 'kind',
  /** column name */
  Rotation = 'rotation',
}

/** aggregate var_pop on columns */
export type Board_Object_Var_Pop_Fields = {
  __typename?: 'board_object_var_pop_fields';
  i?: Maybe<Scalars['Float']>;
  j?: Maybe<Scalars['Float']>;
  rotation?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Board_Object_Var_Samp_Fields = {
  __typename?: 'board_object_var_samp_fields';
  i?: Maybe<Scalars['Float']>;
  j?: Maybe<Scalars['Float']>;
  rotation?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Board_Object_Variance_Fields = {
  __typename?: 'board_object_variance_fields';
  i?: Maybe<Scalars['Float']>;
  j?: Maybe<Scalars['Float']>;
  rotation?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "diner" */
export type Diner = {
  __typename?: 'diner';
  /** An object relationship */
  boardObjectByBoardObject?: Maybe<Board_Object>;
  board_object?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  owner: Scalars['uuid'];
  /** An object relationship */
  player: Player;
};

/** aggregated selection of "diner" */
export type Diner_Aggregate = {
  __typename?: 'diner_aggregate';
  aggregate?: Maybe<Diner_Aggregate_Fields>;
  nodes: Array<Diner>;
};

/** aggregate fields of "diner" */
export type Diner_Aggregate_Fields = {
  __typename?: 'diner_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Diner_Max_Fields>;
  min?: Maybe<Diner_Min_Fields>;
};

/** aggregate fields of "diner" */
export type Diner_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Diner_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "diner" */
export type Diner_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Diner_Max_Order_By>;
  min?: InputMaybe<Diner_Min_Order_By>;
};

/** input type for inserting array relation for remote table "diner" */
export type Diner_Arr_Rel_Insert_Input = {
  data: Array<Diner_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Diner_On_Conflict>;
};

/** Boolean expression to filter rows from the table "diner". All fields are combined with a logical 'AND'. */
export type Diner_Bool_Exp = {
  _and?: InputMaybe<Array<Diner_Bool_Exp>>;
  _not?: InputMaybe<Diner_Bool_Exp>;
  _or?: InputMaybe<Array<Diner_Bool_Exp>>;
  boardObjectByBoardObject?: InputMaybe<Board_Object_Bool_Exp>;
  board_object?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  owner?: InputMaybe<Uuid_Comparison_Exp>;
  player?: InputMaybe<Player_Bool_Exp>;
};

/** unique or primary key constraints on table "diner" */
export enum Diner_Constraint {
  /** unique or primary key constraint */
  DinerPkey = 'diner_pkey',
}

/** input type for inserting data into table "diner" */
export type Diner_Insert_Input = {
  boardObjectByBoardObject?: InputMaybe<Board_Object_Obj_Rel_Insert_Input>;
  board_object?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['uuid']>;
  player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Diner_Max_Fields = {
  __typename?: 'diner_max_fields';
  board_object?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "diner" */
export type Diner_Max_Order_By = {
  board_object?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Diner_Min_Fields = {
  __typename?: 'diner_min_fields';
  board_object?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "diner" */
export type Diner_Min_Order_By = {
  board_object?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "diner" */
export type Diner_Mutation_Response = {
  __typename?: 'diner_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Diner>;
};

/** on conflict condition type for table "diner" */
export type Diner_On_Conflict = {
  constraint: Diner_Constraint;
  update_columns?: Array<Diner_Update_Column>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

/** Ordering options when selecting data from "diner". */
export type Diner_Order_By = {
  boardObjectByBoardObject?: InputMaybe<Board_Object_Order_By>;
  board_object?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  player?: InputMaybe<Player_Order_By>;
};

/** primary key columns input for table: diner */
export type Diner_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "diner" */
export enum Diner_Select_Column {
  /** column name */
  BoardObject = 'board_object',
  /** column name */
  Id = 'id',
  /** column name */
  Owner = 'owner',
}

/** input type for updating data in table "diner" */
export type Diner_Set_Input = {
  board_object?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "diner" */
export enum Diner_Update_Column {
  /** column name */
  BoardObject = 'board_object',
  /** column name */
  Id = 'id',
  /** column name */
  Owner = 'owner',
}

/** columns and relationships of "drink" */
export type Drink = {
  __typename?: 'drink';
  /** An object relationship */
  board_object: Board_Object;
  game: Scalars['uuid'];
  /** An object relationship */
  gameByGame: Game;
  id: Scalars['uuid'];
  kind: Scalars['uuid'];
};

/** aggregated selection of "drink" */
export type Drink_Aggregate = {
  __typename?: 'drink_aggregate';
  aggregate?: Maybe<Drink_Aggregate_Fields>;
  nodes: Array<Drink>;
};

/** aggregate fields of "drink" */
export type Drink_Aggregate_Fields = {
  __typename?: 'drink_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Drink_Max_Fields>;
  min?: Maybe<Drink_Min_Fields>;
};

/** aggregate fields of "drink" */
export type Drink_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Drink_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "drink" */
export type Drink_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Drink_Max_Order_By>;
  min?: InputMaybe<Drink_Min_Order_By>;
};

/** input type for inserting array relation for remote table "drink" */
export type Drink_Arr_Rel_Insert_Input = {
  data: Array<Drink_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Drink_On_Conflict>;
};

/** Boolean expression to filter rows from the table "drink". All fields are combined with a logical 'AND'. */
export type Drink_Bool_Exp = {
  _and?: InputMaybe<Array<Drink_Bool_Exp>>;
  _not?: InputMaybe<Drink_Bool_Exp>;
  _or?: InputMaybe<Array<Drink_Bool_Exp>>;
  board_object?: InputMaybe<Board_Object_Bool_Exp>;
  game?: InputMaybe<Uuid_Comparison_Exp>;
  gameByGame?: InputMaybe<Game_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "drink" */
export enum Drink_Constraint {
  /** unique or primary key constraint */
  DrinkPkey = 'drink_pkey',
}

/** input type for inserting data into table "drink" */
export type Drink_Insert_Input = {
  board_object?: InputMaybe<Board_Object_Obj_Rel_Insert_Input>;
  game?: InputMaybe<Scalars['uuid']>;
  gameByGame?: InputMaybe<Game_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  kind?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Drink_Max_Fields = {
  __typename?: 'drink_max_fields';
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  kind?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "drink" */
export type Drink_Max_Order_By = {
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Drink_Min_Fields = {
  __typename?: 'drink_min_fields';
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  kind?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "drink" */
export type Drink_Min_Order_By = {
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "drink" */
export type Drink_Mutation_Response = {
  __typename?: 'drink_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Drink>;
};

/** input type for inserting object relation for remote table "drink" */
export type Drink_Obj_Rel_Insert_Input = {
  data: Drink_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Drink_On_Conflict>;
};

/** on conflict condition type for table "drink" */
export type Drink_On_Conflict = {
  constraint: Drink_Constraint;
  update_columns?: Array<Drink_Update_Column>;
  where?: InputMaybe<Drink_Bool_Exp>;
};

/** Ordering options when selecting data from "drink". */
export type Drink_Order_By = {
  board_object?: InputMaybe<Board_Object_Order_By>;
  game?: InputMaybe<Order_By>;
  gameByGame?: InputMaybe<Game_Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
};

/** primary key columns input for table: drink */
export type Drink_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "drink" */
export enum Drink_Select_Column {
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
}

/** input type for updating data in table "drink" */
export type Drink_Set_Input = {
  game?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  kind?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "drink" */
export enum Drink_Update_Column {
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
}

/** columns and relationships of "employee" */
export type Employee = {
  __typename?: 'employee';
  game: Scalars['uuid'];
  /** An object relationship */
  gameByGame: Game;
  hired_by: Scalars['uuid'];
  hires_available: Scalars['Int'];
  id: Scalars['uuid'];
  kind: Scalars['String'];
  manager: Scalars['uuid'];
  owner: Scalars['uuid'];
  promoted_from: Scalars['uuid'];
  trained_by: Scalars['uuid'];
  trained_from: Scalars['uuid'];
  trains_available: Scalars['Int'];
  used: Scalars['Boolean'];
};

/** aggregated selection of "employee" */
export type Employee_Aggregate = {
  __typename?: 'employee_aggregate';
  aggregate?: Maybe<Employee_Aggregate_Fields>;
  nodes: Array<Employee>;
};

/** aggregate fields of "employee" */
export type Employee_Aggregate_Fields = {
  __typename?: 'employee_aggregate_fields';
  avg?: Maybe<Employee_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Employee_Max_Fields>;
  min?: Maybe<Employee_Min_Fields>;
  stddev?: Maybe<Employee_Stddev_Fields>;
  stddev_pop?: Maybe<Employee_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Employee_Stddev_Samp_Fields>;
  sum?: Maybe<Employee_Sum_Fields>;
  var_pop?: Maybe<Employee_Var_Pop_Fields>;
  var_samp?: Maybe<Employee_Var_Samp_Fields>;
  variance?: Maybe<Employee_Variance_Fields>;
};

/** aggregate fields of "employee" */
export type Employee_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Employee_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "employee" */
export type Employee_Aggregate_Order_By = {
  avg?: InputMaybe<Employee_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Employee_Max_Order_By>;
  min?: InputMaybe<Employee_Min_Order_By>;
  stddev?: InputMaybe<Employee_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Employee_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Employee_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Employee_Sum_Order_By>;
  var_pop?: InputMaybe<Employee_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Employee_Var_Samp_Order_By>;
  variance?: InputMaybe<Employee_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "employee" */
export type Employee_Arr_Rel_Insert_Input = {
  data: Array<Employee_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Employee_On_Conflict>;
};

/** aggregate avg on columns */
export type Employee_Avg_Fields = {
  __typename?: 'employee_avg_fields';
  hires_available?: Maybe<Scalars['Float']>;
  trains_available?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "employee" */
export type Employee_Avg_Order_By = {
  hires_available?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "employee". All fields are combined with a logical 'AND'. */
export type Employee_Bool_Exp = {
  _and?: InputMaybe<Array<Employee_Bool_Exp>>;
  _not?: InputMaybe<Employee_Bool_Exp>;
  _or?: InputMaybe<Array<Employee_Bool_Exp>>;
  game?: InputMaybe<Uuid_Comparison_Exp>;
  gameByGame?: InputMaybe<Game_Bool_Exp>;
  hired_by?: InputMaybe<Uuid_Comparison_Exp>;
  hires_available?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  kind?: InputMaybe<String_Comparison_Exp>;
  manager?: InputMaybe<Uuid_Comparison_Exp>;
  owner?: InputMaybe<Uuid_Comparison_Exp>;
  promoted_from?: InputMaybe<Uuid_Comparison_Exp>;
  trained_by?: InputMaybe<Uuid_Comparison_Exp>;
  trained_from?: InputMaybe<Uuid_Comparison_Exp>;
  trains_available?: InputMaybe<Int_Comparison_Exp>;
  used?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "employee" */
export enum Employee_Constraint {
  /** unique or primary key constraint */
  EmployeePkey = 'employee_pkey',
}

/** input type for incrementing numeric columns in table "employee" */
export type Employee_Inc_Input = {
  hires_available?: InputMaybe<Scalars['Int']>;
  trains_available?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "employee" */
export type Employee_Insert_Input = {
  game?: InputMaybe<Scalars['uuid']>;
  gameByGame?: InputMaybe<Game_Obj_Rel_Insert_Input>;
  hired_by?: InputMaybe<Scalars['uuid']>;
  hires_available?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  kind?: InputMaybe<Scalars['String']>;
  manager?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['uuid']>;
  promoted_from?: InputMaybe<Scalars['uuid']>;
  trained_by?: InputMaybe<Scalars['uuid']>;
  trained_from?: InputMaybe<Scalars['uuid']>;
  trains_available?: InputMaybe<Scalars['Int']>;
  used?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Employee_Max_Fields = {
  __typename?: 'employee_max_fields';
  game?: Maybe<Scalars['uuid']>;
  hired_by?: Maybe<Scalars['uuid']>;
  hires_available?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  kind?: Maybe<Scalars['String']>;
  manager?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['uuid']>;
  promoted_from?: Maybe<Scalars['uuid']>;
  trained_by?: Maybe<Scalars['uuid']>;
  trained_from?: Maybe<Scalars['uuid']>;
  trains_available?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "employee" */
export type Employee_Max_Order_By = {
  game?: InputMaybe<Order_By>;
  hired_by?: InputMaybe<Order_By>;
  hires_available?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  manager?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  promoted_from?: InputMaybe<Order_By>;
  trained_by?: InputMaybe<Order_By>;
  trained_from?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Employee_Min_Fields = {
  __typename?: 'employee_min_fields';
  game?: Maybe<Scalars['uuid']>;
  hired_by?: Maybe<Scalars['uuid']>;
  hires_available?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  kind?: Maybe<Scalars['String']>;
  manager?: Maybe<Scalars['uuid']>;
  owner?: Maybe<Scalars['uuid']>;
  promoted_from?: Maybe<Scalars['uuid']>;
  trained_by?: Maybe<Scalars['uuid']>;
  trained_from?: Maybe<Scalars['uuid']>;
  trains_available?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "employee" */
export type Employee_Min_Order_By = {
  game?: InputMaybe<Order_By>;
  hired_by?: InputMaybe<Order_By>;
  hires_available?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  manager?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  promoted_from?: InputMaybe<Order_By>;
  trained_by?: InputMaybe<Order_By>;
  trained_from?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "employee" */
export type Employee_Mutation_Response = {
  __typename?: 'employee_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Employee>;
};

/** on conflict condition type for table "employee" */
export type Employee_On_Conflict = {
  constraint: Employee_Constraint;
  update_columns?: Array<Employee_Update_Column>;
  where?: InputMaybe<Employee_Bool_Exp>;
};

/** Ordering options when selecting data from "employee". */
export type Employee_Order_By = {
  game?: InputMaybe<Order_By>;
  gameByGame?: InputMaybe<Game_Order_By>;
  hired_by?: InputMaybe<Order_By>;
  hires_available?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  kind?: InputMaybe<Order_By>;
  manager?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  promoted_from?: InputMaybe<Order_By>;
  trained_by?: InputMaybe<Order_By>;
  trained_from?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
  used?: InputMaybe<Order_By>;
};

/** primary key columns input for table: employee */
export type Employee_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "employee" */
export enum Employee_Select_Column {
  /** column name */
  Game = 'game',
  /** column name */
  HiredBy = 'hired_by',
  /** column name */
  HiresAvailable = 'hires_available',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  Manager = 'manager',
  /** column name */
  Owner = 'owner',
  /** column name */
  PromotedFrom = 'promoted_from',
  /** column name */
  TrainedBy = 'trained_by',
  /** column name */
  TrainedFrom = 'trained_from',
  /** column name */
  TrainsAvailable = 'trains_available',
  /** column name */
  Used = 'used',
}

/** input type for updating data in table "employee" */
export type Employee_Set_Input = {
  game?: InputMaybe<Scalars['uuid']>;
  hired_by?: InputMaybe<Scalars['uuid']>;
  hires_available?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  kind?: InputMaybe<Scalars['String']>;
  manager?: InputMaybe<Scalars['uuid']>;
  owner?: InputMaybe<Scalars['uuid']>;
  promoted_from?: InputMaybe<Scalars['uuid']>;
  trained_by?: InputMaybe<Scalars['uuid']>;
  trained_from?: InputMaybe<Scalars['uuid']>;
  trains_available?: InputMaybe<Scalars['Int']>;
  used?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate stddev on columns */
export type Employee_Stddev_Fields = {
  __typename?: 'employee_stddev_fields';
  hires_available?: Maybe<Scalars['Float']>;
  trains_available?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "employee" */
export type Employee_Stddev_Order_By = {
  hires_available?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Employee_Stddev_Pop_Fields = {
  __typename?: 'employee_stddev_pop_fields';
  hires_available?: Maybe<Scalars['Float']>;
  trains_available?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "employee" */
export type Employee_Stddev_Pop_Order_By = {
  hires_available?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Employee_Stddev_Samp_Fields = {
  __typename?: 'employee_stddev_samp_fields';
  hires_available?: Maybe<Scalars['Float']>;
  trains_available?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "employee" */
export type Employee_Stddev_Samp_Order_By = {
  hires_available?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Employee_Sum_Fields = {
  __typename?: 'employee_sum_fields';
  hires_available?: Maybe<Scalars['Int']>;
  trains_available?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "employee" */
export type Employee_Sum_Order_By = {
  hires_available?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** update columns of table "employee" */
export enum Employee_Update_Column {
  /** column name */
  Game = 'game',
  /** column name */
  HiredBy = 'hired_by',
  /** column name */
  HiresAvailable = 'hires_available',
  /** column name */
  Id = 'id',
  /** column name */
  Kind = 'kind',
  /** column name */
  Manager = 'manager',
  /** column name */
  Owner = 'owner',
  /** column name */
  PromotedFrom = 'promoted_from',
  /** column name */
  TrainedBy = 'trained_by',
  /** column name */
  TrainedFrom = 'trained_from',
  /** column name */
  TrainsAvailable = 'trains_available',
  /** column name */
  Used = 'used',
}

/** aggregate var_pop on columns */
export type Employee_Var_Pop_Fields = {
  __typename?: 'employee_var_pop_fields';
  hires_available?: Maybe<Scalars['Float']>;
  trains_available?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "employee" */
export type Employee_Var_Pop_Order_By = {
  hires_available?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Employee_Var_Samp_Fields = {
  __typename?: 'employee_var_samp_fields';
  hires_available?: Maybe<Scalars['Float']>;
  trains_available?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "employee" */
export type Employee_Var_Samp_Order_By = {
  hires_available?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Employee_Variance_Fields = {
  __typename?: 'employee_variance_fields';
  hires_available?: Maybe<Scalars['Float']>;
  trains_available?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "employee" */
export type Employee_Variance_Order_By = {
  hires_available?: InputMaybe<Order_By>;
  trains_available?: InputMaybe<Order_By>;
};

/** columns and relationships of "game" */
export type Game = {
  __typename?: 'game';
  /** An array relationship */
  adverts: Array<Advert>;
  /** An aggregate relationship */
  adverts_aggregate: Advert_Aggregate;
  /** An array relationship */
  drinks: Array<Drink>;
  /** An aggregate relationship */
  drinks_aggregate: Drink_Aggregate;
  /** An array relationship */
  employees: Array<Employee>;
  /** An aggregate relationship */
  employees_aggregate: Employee_Aggregate;
  /** An array relationship */
  gardens: Array<Garden>;
  /** An aggregate relationship */
  gardens_aggregate: Garden_Aggregate;
  /** An array relationship */
  houses: Array<House>;
  /** An aggregate relationship */
  houses_aggregate: House_Aggregate;
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  players: Array<Player>;
  /** An aggregate relationship */
  players_aggregate: Player_Aggregate;
  /** An array relationship */
  roads: Array<Road>;
  /** An aggregate relationship */
  roads_aggregate: Road_Aggregate;
};

/** columns and relationships of "game" */
export type GameAdvertsArgs = {
  distinct_on?: InputMaybe<Array<Advert_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Advert_Order_By>>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameAdverts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Advert_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Advert_Order_By>>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameDrinksArgs = {
  distinct_on?: InputMaybe<Array<Drink_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Drink_Order_By>>;
  where?: InputMaybe<Drink_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameDrinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drink_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Drink_Order_By>>;
  where?: InputMaybe<Drink_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameEmployeesArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameEmployees_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameGardensArgs = {
  distinct_on?: InputMaybe<Array<Garden_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Garden_Order_By>>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameGardens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Garden_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Garden_Order_By>>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameHousesArgs = {
  distinct_on?: InputMaybe<Array<House_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Order_By>>;
  where?: InputMaybe<House_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameHouses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<House_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Order_By>>;
  where?: InputMaybe<House_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GamePlayersArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GamePlayers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameRoadsArgs = {
  distinct_on?: InputMaybe<Array<Road_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Order_By>>;
  where?: InputMaybe<Road_Bool_Exp>;
};

/** columns and relationships of "game" */
export type GameRoads_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Road_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Order_By>>;
  where?: InputMaybe<Road_Bool_Exp>;
};

/** aggregated selection of "game" */
export type Game_Aggregate = {
  __typename?: 'game_aggregate';
  aggregate?: Maybe<Game_Aggregate_Fields>;
  nodes: Array<Game>;
};

/** aggregate fields of "game" */
export type Game_Aggregate_Fields = {
  __typename?: 'game_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Game_Max_Fields>;
  min?: Maybe<Game_Min_Fields>;
};

/** aggregate fields of "game" */
export type Game_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Game_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "game". All fields are combined with a logical 'AND'. */
export type Game_Bool_Exp = {
  _and?: InputMaybe<Array<Game_Bool_Exp>>;
  _not?: InputMaybe<Game_Bool_Exp>;
  _or?: InputMaybe<Array<Game_Bool_Exp>>;
  adverts?: InputMaybe<Advert_Bool_Exp>;
  drinks?: InputMaybe<Drink_Bool_Exp>;
  employees?: InputMaybe<Employee_Bool_Exp>;
  gardens?: InputMaybe<Garden_Bool_Exp>;
  houses?: InputMaybe<House_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  players?: InputMaybe<Player_Bool_Exp>;
  roads?: InputMaybe<Road_Bool_Exp>;
};

/** unique or primary key constraints on table "game" */
export enum Game_Constraint {
  /** unique or primary key constraint */
  GamePkey = 'game_pkey',
}

/** input type for inserting data into table "game" */
export type Game_Insert_Input = {
  adverts?: InputMaybe<Advert_Arr_Rel_Insert_Input>;
  drinks?: InputMaybe<Drink_Arr_Rel_Insert_Input>;
  employees?: InputMaybe<Employee_Arr_Rel_Insert_Input>;
  gardens?: InputMaybe<Garden_Arr_Rel_Insert_Input>;
  houses?: InputMaybe<House_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  players?: InputMaybe<Player_Arr_Rel_Insert_Input>;
  roads?: InputMaybe<Road_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Game_Max_Fields = {
  __typename?: 'game_max_fields';
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Game_Min_Fields = {
  __typename?: 'game_min_fields';
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "game" */
export type Game_Mutation_Response = {
  __typename?: 'game_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Game>;
};

/** input type for inserting object relation for remote table "game" */
export type Game_Obj_Rel_Insert_Input = {
  data: Game_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Game_On_Conflict>;
};

/** on conflict condition type for table "game" */
export type Game_On_Conflict = {
  constraint: Game_Constraint;
  update_columns?: Array<Game_Update_Column>;
  where?: InputMaybe<Game_Bool_Exp>;
};

/** Ordering options when selecting data from "game". */
export type Game_Order_By = {
  adverts_aggregate?: InputMaybe<Advert_Aggregate_Order_By>;
  drinks_aggregate?: InputMaybe<Drink_Aggregate_Order_By>;
  employees_aggregate?: InputMaybe<Employee_Aggregate_Order_By>;
  gardens_aggregate?: InputMaybe<Garden_Aggregate_Order_By>;
  houses_aggregate?: InputMaybe<House_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  players_aggregate?: InputMaybe<Player_Aggregate_Order_By>;
  roads_aggregate?: InputMaybe<Road_Aggregate_Order_By>;
};

/** primary key columns input for table: game */
export type Game_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "game" */
export enum Game_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "game" */
export type Game_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "game" */
export enum Game_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** columns and relationships of "garden" */
export type Garden = {
  __typename?: 'garden';
  /** An object relationship */
  boardObjectByBoardObject: Board_Object;
  board_object: Scalars['uuid'];
  game: Scalars['uuid'];
  /** An object relationship */
  gameByGame: Game;
  id: Scalars['uuid'];
};

/** aggregated selection of "garden" */
export type Garden_Aggregate = {
  __typename?: 'garden_aggregate';
  aggregate?: Maybe<Garden_Aggregate_Fields>;
  nodes: Array<Garden>;
};

/** aggregate fields of "garden" */
export type Garden_Aggregate_Fields = {
  __typename?: 'garden_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Garden_Max_Fields>;
  min?: Maybe<Garden_Min_Fields>;
};

/** aggregate fields of "garden" */
export type Garden_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Garden_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "garden" */
export type Garden_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Garden_Max_Order_By>;
  min?: InputMaybe<Garden_Min_Order_By>;
};

/** input type for inserting array relation for remote table "garden" */
export type Garden_Arr_Rel_Insert_Input = {
  data: Array<Garden_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Garden_On_Conflict>;
};

/** Boolean expression to filter rows from the table "garden". All fields are combined with a logical 'AND'. */
export type Garden_Bool_Exp = {
  _and?: InputMaybe<Array<Garden_Bool_Exp>>;
  _not?: InputMaybe<Garden_Bool_Exp>;
  _or?: InputMaybe<Array<Garden_Bool_Exp>>;
  boardObjectByBoardObject?: InputMaybe<Board_Object_Bool_Exp>;
  board_object?: InputMaybe<Uuid_Comparison_Exp>;
  game?: InputMaybe<Uuid_Comparison_Exp>;
  gameByGame?: InputMaybe<Game_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "garden" */
export enum Garden_Constraint {
  /** unique or primary key constraint */
  GardenPkey = 'garden_pkey',
}

/** input type for inserting data into table "garden" */
export type Garden_Insert_Input = {
  boardObjectByBoardObject?: InputMaybe<Board_Object_Obj_Rel_Insert_Input>;
  board_object?: InputMaybe<Scalars['uuid']>;
  game?: InputMaybe<Scalars['uuid']>;
  gameByGame?: InputMaybe<Game_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Garden_Max_Fields = {
  __typename?: 'garden_max_fields';
  board_object?: Maybe<Scalars['uuid']>;
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "garden" */
export type Garden_Max_Order_By = {
  board_object?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Garden_Min_Fields = {
  __typename?: 'garden_min_fields';
  board_object?: Maybe<Scalars['uuid']>;
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "garden" */
export type Garden_Min_Order_By = {
  board_object?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "garden" */
export type Garden_Mutation_Response = {
  __typename?: 'garden_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Garden>;
};

/** on conflict condition type for table "garden" */
export type Garden_On_Conflict = {
  constraint: Garden_Constraint;
  update_columns?: Array<Garden_Update_Column>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

/** Ordering options when selecting data from "garden". */
export type Garden_Order_By = {
  boardObjectByBoardObject?: InputMaybe<Board_Object_Order_By>;
  board_object?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  gameByGame?: InputMaybe<Game_Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: garden */
export type Garden_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "garden" */
export enum Garden_Select_Column {
  /** column name */
  BoardObject = 'board_object',
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
}

/** input type for updating data in table "garden" */
export type Garden_Set_Input = {
  board_object?: InputMaybe<Scalars['uuid']>;
  game?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "garden" */
export enum Garden_Update_Column {
  /** column name */
  BoardObject = 'board_object',
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
}

/** columns and relationships of "house" */
export type House = {
  __typename?: 'house';
  /** An object relationship */
  boardObjectById: Board_Object;
  board_object?: Maybe<Scalars['uuid']>;
  game: Scalars['uuid'];
  /** An object relationship */
  gameByGame: Game;
  has_garden: Scalars['Boolean'];
  /** An array relationship */
  house_food_demands: Array<House_Food_Demand>;
  /** An aggregate relationship */
  house_food_demands_aggregate: House_Food_Demand_Aggregate;
  id: Scalars['uuid'];
  is_extra: Scalars['Boolean'];
  number: Scalars['Int'];
  orient: Scalars['Int'];
};

/** columns and relationships of "house" */
export type HouseHouse_Food_DemandsArgs = {
  distinct_on?: InputMaybe<Array<House_Food_Demand_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Food_Demand_Order_By>>;
  where?: InputMaybe<House_Food_Demand_Bool_Exp>;
};

/** columns and relationships of "house" */
export type HouseHouse_Food_Demands_AggregateArgs = {
  distinct_on?: InputMaybe<Array<House_Food_Demand_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Food_Demand_Order_By>>;
  where?: InputMaybe<House_Food_Demand_Bool_Exp>;
};

/** aggregated selection of "house" */
export type House_Aggregate = {
  __typename?: 'house_aggregate';
  aggregate?: Maybe<House_Aggregate_Fields>;
  nodes: Array<House>;
};

/** aggregate fields of "house" */
export type House_Aggregate_Fields = {
  __typename?: 'house_aggregate_fields';
  avg?: Maybe<House_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<House_Max_Fields>;
  min?: Maybe<House_Min_Fields>;
  stddev?: Maybe<House_Stddev_Fields>;
  stddev_pop?: Maybe<House_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<House_Stddev_Samp_Fields>;
  sum?: Maybe<House_Sum_Fields>;
  var_pop?: Maybe<House_Var_Pop_Fields>;
  var_samp?: Maybe<House_Var_Samp_Fields>;
  variance?: Maybe<House_Variance_Fields>;
};

/** aggregate fields of "house" */
export type House_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<House_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "house" */
export type House_Aggregate_Order_By = {
  avg?: InputMaybe<House_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<House_Max_Order_By>;
  min?: InputMaybe<House_Min_Order_By>;
  stddev?: InputMaybe<House_Stddev_Order_By>;
  stddev_pop?: InputMaybe<House_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<House_Stddev_Samp_Order_By>;
  sum?: InputMaybe<House_Sum_Order_By>;
  var_pop?: InputMaybe<House_Var_Pop_Order_By>;
  var_samp?: InputMaybe<House_Var_Samp_Order_By>;
  variance?: InputMaybe<House_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "house" */
export type House_Arr_Rel_Insert_Input = {
  data: Array<House_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<House_On_Conflict>;
};

/** aggregate avg on columns */
export type House_Avg_Fields = {
  __typename?: 'house_avg_fields';
  number?: Maybe<Scalars['Float']>;
  orient?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "house" */
export type House_Avg_Order_By = {
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "house". All fields are combined with a logical 'AND'. */
export type House_Bool_Exp = {
  _and?: InputMaybe<Array<House_Bool_Exp>>;
  _not?: InputMaybe<House_Bool_Exp>;
  _or?: InputMaybe<Array<House_Bool_Exp>>;
  boardObjectById?: InputMaybe<Board_Object_Bool_Exp>;
  board_object?: InputMaybe<Uuid_Comparison_Exp>;
  game?: InputMaybe<Uuid_Comparison_Exp>;
  gameByGame?: InputMaybe<Game_Bool_Exp>;
  has_garden?: InputMaybe<Boolean_Comparison_Exp>;
  house_food_demands?: InputMaybe<House_Food_Demand_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_extra?: InputMaybe<Boolean_Comparison_Exp>;
  number?: InputMaybe<Int_Comparison_Exp>;
  orient?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "house" */
export enum House_Constraint {
  /** unique or primary key constraint */
  HousePkey = 'house_pkey',
}

/** columns and relationships of "house_food_demand" */
export type House_Food_Demand = {
  __typename?: 'house_food_demand';
  food_kind: Scalars['String'];
  food_quantity: Scalars['Int'];
  house: Scalars['uuid'];
  /** An object relationship */
  houseByHouse: House;
};

/** aggregated selection of "house_food_demand" */
export type House_Food_Demand_Aggregate = {
  __typename?: 'house_food_demand_aggregate';
  aggregate?: Maybe<House_Food_Demand_Aggregate_Fields>;
  nodes: Array<House_Food_Demand>;
};

/** aggregate fields of "house_food_demand" */
export type House_Food_Demand_Aggregate_Fields = {
  __typename?: 'house_food_demand_aggregate_fields';
  avg?: Maybe<House_Food_Demand_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<House_Food_Demand_Max_Fields>;
  min?: Maybe<House_Food_Demand_Min_Fields>;
  stddev?: Maybe<House_Food_Demand_Stddev_Fields>;
  stddev_pop?: Maybe<House_Food_Demand_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<House_Food_Demand_Stddev_Samp_Fields>;
  sum?: Maybe<House_Food_Demand_Sum_Fields>;
  var_pop?: Maybe<House_Food_Demand_Var_Pop_Fields>;
  var_samp?: Maybe<House_Food_Demand_Var_Samp_Fields>;
  variance?: Maybe<House_Food_Demand_Variance_Fields>;
};

/** aggregate fields of "house_food_demand" */
export type House_Food_Demand_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<House_Food_Demand_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "house_food_demand" */
export type House_Food_Demand_Aggregate_Order_By = {
  avg?: InputMaybe<House_Food_Demand_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<House_Food_Demand_Max_Order_By>;
  min?: InputMaybe<House_Food_Demand_Min_Order_By>;
  stddev?: InputMaybe<House_Food_Demand_Stddev_Order_By>;
  stddev_pop?: InputMaybe<House_Food_Demand_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<House_Food_Demand_Stddev_Samp_Order_By>;
  sum?: InputMaybe<House_Food_Demand_Sum_Order_By>;
  var_pop?: InputMaybe<House_Food_Demand_Var_Pop_Order_By>;
  var_samp?: InputMaybe<House_Food_Demand_Var_Samp_Order_By>;
  variance?: InputMaybe<House_Food_Demand_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "house_food_demand" */
export type House_Food_Demand_Arr_Rel_Insert_Input = {
  data: Array<House_Food_Demand_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<House_Food_Demand_On_Conflict>;
};

/** aggregate avg on columns */
export type House_Food_Demand_Avg_Fields = {
  __typename?: 'house_food_demand_avg_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "house_food_demand" */
export type House_Food_Demand_Avg_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "house_food_demand". All fields are combined with a logical 'AND'. */
export type House_Food_Demand_Bool_Exp = {
  _and?: InputMaybe<Array<House_Food_Demand_Bool_Exp>>;
  _not?: InputMaybe<House_Food_Demand_Bool_Exp>;
  _or?: InputMaybe<Array<House_Food_Demand_Bool_Exp>>;
  food_kind?: InputMaybe<String_Comparison_Exp>;
  food_quantity?: InputMaybe<Int_Comparison_Exp>;
  house?: InputMaybe<Uuid_Comparison_Exp>;
  houseByHouse?: InputMaybe<House_Bool_Exp>;
};

/** unique or primary key constraints on table "house_food_demand" */
export enum House_Food_Demand_Constraint {
  /** unique or primary key constraint */
  HouseFoodDemandPkey = 'house_food_demand_pkey',
}

/** input type for incrementing numeric columns in table "house_food_demand" */
export type House_Food_Demand_Inc_Input = {
  food_quantity?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "house_food_demand" */
export type House_Food_Demand_Insert_Input = {
  food_kind?: InputMaybe<Scalars['String']>;
  food_quantity?: InputMaybe<Scalars['Int']>;
  house?: InputMaybe<Scalars['uuid']>;
  houseByHouse?: InputMaybe<House_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type House_Food_Demand_Max_Fields = {
  __typename?: 'house_food_demand_max_fields';
  food_kind?: Maybe<Scalars['String']>;
  food_quantity?: Maybe<Scalars['Int']>;
  house?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "house_food_demand" */
export type House_Food_Demand_Max_Order_By = {
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  house?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type House_Food_Demand_Min_Fields = {
  __typename?: 'house_food_demand_min_fields';
  food_kind?: Maybe<Scalars['String']>;
  food_quantity?: Maybe<Scalars['Int']>;
  house?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "house_food_demand" */
export type House_Food_Demand_Min_Order_By = {
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  house?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "house_food_demand" */
export type House_Food_Demand_Mutation_Response = {
  __typename?: 'house_food_demand_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<House_Food_Demand>;
};

/** on conflict condition type for table "house_food_demand" */
export type House_Food_Demand_On_Conflict = {
  constraint: House_Food_Demand_Constraint;
  update_columns?: Array<House_Food_Demand_Update_Column>;
  where?: InputMaybe<House_Food_Demand_Bool_Exp>;
};

/** Ordering options when selecting data from "house_food_demand". */
export type House_Food_Demand_Order_By = {
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  house?: InputMaybe<Order_By>;
  houseByHouse?: InputMaybe<House_Order_By>;
};

/** primary key columns input for table: house_food_demand */
export type House_Food_Demand_Pk_Columns_Input = {
  food_kind: Scalars['String'];
  house: Scalars['uuid'];
};

/** select columns of table "house_food_demand" */
export enum House_Food_Demand_Select_Column {
  /** column name */
  FoodKind = 'food_kind',
  /** column name */
  FoodQuantity = 'food_quantity',
  /** column name */
  House = 'house',
}

/** input type for updating data in table "house_food_demand" */
export type House_Food_Demand_Set_Input = {
  food_kind?: InputMaybe<Scalars['String']>;
  food_quantity?: InputMaybe<Scalars['Int']>;
  house?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type House_Food_Demand_Stddev_Fields = {
  __typename?: 'house_food_demand_stddev_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "house_food_demand" */
export type House_Food_Demand_Stddev_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type House_Food_Demand_Stddev_Pop_Fields = {
  __typename?: 'house_food_demand_stddev_pop_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "house_food_demand" */
export type House_Food_Demand_Stddev_Pop_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type House_Food_Demand_Stddev_Samp_Fields = {
  __typename?: 'house_food_demand_stddev_samp_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "house_food_demand" */
export type House_Food_Demand_Stddev_Samp_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type House_Food_Demand_Sum_Fields = {
  __typename?: 'house_food_demand_sum_fields';
  food_quantity?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "house_food_demand" */
export type House_Food_Demand_Sum_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** update columns of table "house_food_demand" */
export enum House_Food_Demand_Update_Column {
  /** column name */
  FoodKind = 'food_kind',
  /** column name */
  FoodQuantity = 'food_quantity',
  /** column name */
  House = 'house',
}

/** aggregate var_pop on columns */
export type House_Food_Demand_Var_Pop_Fields = {
  __typename?: 'house_food_demand_var_pop_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "house_food_demand" */
export type House_Food_Demand_Var_Pop_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type House_Food_Demand_Var_Samp_Fields = {
  __typename?: 'house_food_demand_var_samp_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "house_food_demand" */
export type House_Food_Demand_Var_Samp_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type House_Food_Demand_Variance_Fields = {
  __typename?: 'house_food_demand_variance_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "house_food_demand" */
export type House_Food_Demand_Variance_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** input type for incrementing numeric columns in table "house" */
export type House_Inc_Input = {
  number?: InputMaybe<Scalars['Int']>;
  orient?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "house" */
export type House_Insert_Input = {
  boardObjectById?: InputMaybe<Board_Object_Obj_Rel_Insert_Input>;
  board_object?: InputMaybe<Scalars['uuid']>;
  game?: InputMaybe<Scalars['uuid']>;
  gameByGame?: InputMaybe<Game_Obj_Rel_Insert_Input>;
  has_garden?: InputMaybe<Scalars['Boolean']>;
  house_food_demands?: InputMaybe<House_Food_Demand_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  is_extra?: InputMaybe<Scalars['Boolean']>;
  number?: InputMaybe<Scalars['Int']>;
  orient?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type House_Max_Fields = {
  __typename?: 'house_max_fields';
  board_object?: Maybe<Scalars['uuid']>;
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  number?: Maybe<Scalars['Int']>;
  orient?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "house" */
export type House_Max_Order_By = {
  board_object?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type House_Min_Fields = {
  __typename?: 'house_min_fields';
  board_object?: Maybe<Scalars['uuid']>;
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  number?: Maybe<Scalars['Int']>;
  orient?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "house" */
export type House_Min_Order_By = {
  board_object?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "house" */
export type House_Mutation_Response = {
  __typename?: 'house_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<House>;
};

/** input type for inserting object relation for remote table "house" */
export type House_Obj_Rel_Insert_Input = {
  data: House_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<House_On_Conflict>;
};

/** on conflict condition type for table "house" */
export type House_On_Conflict = {
  constraint: House_Constraint;
  update_columns?: Array<House_Update_Column>;
  where?: InputMaybe<House_Bool_Exp>;
};

/** Ordering options when selecting data from "house". */
export type House_Order_By = {
  boardObjectById?: InputMaybe<Board_Object_Order_By>;
  board_object?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  gameByGame?: InputMaybe<Game_Order_By>;
  has_garden?: InputMaybe<Order_By>;
  house_food_demands_aggregate?: InputMaybe<House_Food_Demand_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  is_extra?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** primary key columns input for table: house */
export type House_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "house" */
export enum House_Select_Column {
  /** column name */
  BoardObject = 'board_object',
  /** column name */
  Game = 'game',
  /** column name */
  HasGarden = 'has_garden',
  /** column name */
  Id = 'id',
  /** column name */
  IsExtra = 'is_extra',
  /** column name */
  Number = 'number',
  /** column name */
  Orient = 'orient',
}

/** input type for updating data in table "house" */
export type House_Set_Input = {
  board_object?: InputMaybe<Scalars['uuid']>;
  game?: InputMaybe<Scalars['uuid']>;
  has_garden?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['uuid']>;
  is_extra?: InputMaybe<Scalars['Boolean']>;
  number?: InputMaybe<Scalars['Int']>;
  orient?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type House_Stddev_Fields = {
  __typename?: 'house_stddev_fields';
  number?: Maybe<Scalars['Float']>;
  orient?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "house" */
export type House_Stddev_Order_By = {
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type House_Stddev_Pop_Fields = {
  __typename?: 'house_stddev_pop_fields';
  number?: Maybe<Scalars['Float']>;
  orient?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "house" */
export type House_Stddev_Pop_Order_By = {
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type House_Stddev_Samp_Fields = {
  __typename?: 'house_stddev_samp_fields';
  number?: Maybe<Scalars['Float']>;
  orient?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "house" */
export type House_Stddev_Samp_Order_By = {
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type House_Sum_Fields = {
  __typename?: 'house_sum_fields';
  number?: Maybe<Scalars['Int']>;
  orient?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "house" */
export type House_Sum_Order_By = {
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** update columns of table "house" */
export enum House_Update_Column {
  /** column name */
  BoardObject = 'board_object',
  /** column name */
  Game = 'game',
  /** column name */
  HasGarden = 'has_garden',
  /** column name */
  Id = 'id',
  /** column name */
  IsExtra = 'is_extra',
  /** column name */
  Number = 'number',
  /** column name */
  Orient = 'orient',
}

/** aggregate var_pop on columns */
export type House_Var_Pop_Fields = {
  __typename?: 'house_var_pop_fields';
  number?: Maybe<Scalars['Float']>;
  orient?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "house" */
export type House_Var_Pop_Order_By = {
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type House_Var_Samp_Fields = {
  __typename?: 'house_var_samp_fields';
  number?: Maybe<Scalars['Float']>;
  orient?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "house" */
export type House_Var_Samp_Order_By = {
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type House_Variance_Fields = {
  __typename?: 'house_variance_fields';
  number?: Maybe<Scalars['Float']>;
  orient?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "house" */
export type House_Variance_Order_By = {
  number?: InputMaybe<Order_By>;
  orient?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "advert" */
  delete_advert?: Maybe<Advert_Mutation_Response>;
  /** delete single row from the table: "advert" */
  delete_advert_by_pk?: Maybe<Advert>;
  /** delete data from the table: "board_object" */
  delete_board_object?: Maybe<Board_Object_Mutation_Response>;
  /** delete single row from the table: "board_object" */
  delete_board_object_by_pk?: Maybe<Board_Object>;
  /** delete data from the table: "diner" */
  delete_diner?: Maybe<Diner_Mutation_Response>;
  /** delete single row from the table: "diner" */
  delete_diner_by_pk?: Maybe<Diner>;
  /** delete data from the table: "drink" */
  delete_drink?: Maybe<Drink_Mutation_Response>;
  /** delete single row from the table: "drink" */
  delete_drink_by_pk?: Maybe<Drink>;
  /** delete data from the table: "employee" */
  delete_employee?: Maybe<Employee_Mutation_Response>;
  /** delete single row from the table: "employee" */
  delete_employee_by_pk?: Maybe<Employee>;
  /** delete data from the table: "game" */
  delete_game?: Maybe<Game_Mutation_Response>;
  /** delete single row from the table: "game" */
  delete_game_by_pk?: Maybe<Game>;
  /** delete data from the table: "garden" */
  delete_garden?: Maybe<Garden_Mutation_Response>;
  /** delete single row from the table: "garden" */
  delete_garden_by_pk?: Maybe<Garden>;
  /** delete data from the table: "house" */
  delete_house?: Maybe<House_Mutation_Response>;
  /** delete single row from the table: "house" */
  delete_house_by_pk?: Maybe<House>;
  /** delete data from the table: "house_food_demand" */
  delete_house_food_demand?: Maybe<House_Food_Demand_Mutation_Response>;
  /** delete single row from the table: "house_food_demand" */
  delete_house_food_demand_by_pk?: Maybe<House_Food_Demand>;
  /** delete data from the table: "player" */
  delete_player?: Maybe<Player_Mutation_Response>;
  /** delete single row from the table: "player" */
  delete_player_by_pk?: Maybe<Player>;
  /** delete data from the table: "player_food" */
  delete_player_food?: Maybe<Player_Food_Mutation_Response>;
  /** delete single row from the table: "player_food" */
  delete_player_food_by_pk?: Maybe<Player_Food>;
  /** delete data from the table: "road" */
  delete_road?: Maybe<Road_Mutation_Response>;
  /** delete single row from the table: "road" */
  delete_road_by_pk?: Maybe<Road>;
  /** delete data from the table: "road_connection" */
  delete_road_connection?: Maybe<Road_Connection_Mutation_Response>;
  /** delete single row from the table: "road_connection" */
  delete_road_connection_by_pk?: Maybe<Road_Connection>;
  /** delete data from the table: "user_info" */
  delete_user_info?: Maybe<User_Info_Mutation_Response>;
  /** delete single row from the table: "user_info" */
  delete_user_info_by_pk?: Maybe<User_Info>;
  /** delete data from the table: "user_me" */
  delete_user_me?: Maybe<User_Me_Mutation_Response>;
  /** insert data into the table: "advert" */
  insert_advert?: Maybe<Advert_Mutation_Response>;
  /** insert a single row into the table: "advert" */
  insert_advert_one?: Maybe<Advert>;
  /** insert data into the table: "board_object" */
  insert_board_object?: Maybe<Board_Object_Mutation_Response>;
  /** insert a single row into the table: "board_object" */
  insert_board_object_one?: Maybe<Board_Object>;
  /** insert data into the table: "diner" */
  insert_diner?: Maybe<Diner_Mutation_Response>;
  /** insert a single row into the table: "diner" */
  insert_diner_one?: Maybe<Diner>;
  /** insert data into the table: "drink" */
  insert_drink?: Maybe<Drink_Mutation_Response>;
  /** insert a single row into the table: "drink" */
  insert_drink_one?: Maybe<Drink>;
  /** insert data into the table: "employee" */
  insert_employee?: Maybe<Employee_Mutation_Response>;
  /** insert a single row into the table: "employee" */
  insert_employee_one?: Maybe<Employee>;
  /** insert data into the table: "game" */
  insert_game?: Maybe<Game_Mutation_Response>;
  /** insert a single row into the table: "game" */
  insert_game_one?: Maybe<Game>;
  /** insert data into the table: "garden" */
  insert_garden?: Maybe<Garden_Mutation_Response>;
  /** insert a single row into the table: "garden" */
  insert_garden_one?: Maybe<Garden>;
  /** insert data into the table: "house" */
  insert_house?: Maybe<House_Mutation_Response>;
  /** insert data into the table: "house_food_demand" */
  insert_house_food_demand?: Maybe<House_Food_Demand_Mutation_Response>;
  /** insert a single row into the table: "house_food_demand" */
  insert_house_food_demand_one?: Maybe<House_Food_Demand>;
  /** insert a single row into the table: "house" */
  insert_house_one?: Maybe<House>;
  /** insert data into the table: "player" */
  insert_player?: Maybe<Player_Mutation_Response>;
  /** insert data into the table: "player_food" */
  insert_player_food?: Maybe<Player_Food_Mutation_Response>;
  /** insert a single row into the table: "player_food" */
  insert_player_food_one?: Maybe<Player_Food>;
  /** insert a single row into the table: "player" */
  insert_player_one?: Maybe<Player>;
  /** insert data into the table: "road" */
  insert_road?: Maybe<Road_Mutation_Response>;
  /** insert data into the table: "road_connection" */
  insert_road_connection?: Maybe<Road_Connection_Mutation_Response>;
  /** insert a single row into the table: "road_connection" */
  insert_road_connection_one?: Maybe<Road_Connection>;
  /** insert a single row into the table: "road" */
  insert_road_one?: Maybe<Road>;
  /** insert data into the table: "user_info" */
  insert_user_info?: Maybe<User_Info_Mutation_Response>;
  /** insert a single row into the table: "user_info" */
  insert_user_info_one?: Maybe<User_Info>;
  /** insert data into the table: "user_me" */
  insert_user_me?: Maybe<User_Me_Mutation_Response>;
  /** insert a single row into the table: "user_me" */
  insert_user_me_one?: Maybe<User_Me>;
  /** update data of the table: "advert" */
  update_advert?: Maybe<Advert_Mutation_Response>;
  /** update single row of the table: "advert" */
  update_advert_by_pk?: Maybe<Advert>;
  /** update data of the table: "board_object" */
  update_board_object?: Maybe<Board_Object_Mutation_Response>;
  /** update single row of the table: "board_object" */
  update_board_object_by_pk?: Maybe<Board_Object>;
  /** update data of the table: "diner" */
  update_diner?: Maybe<Diner_Mutation_Response>;
  /** update single row of the table: "diner" */
  update_diner_by_pk?: Maybe<Diner>;
  /** update data of the table: "drink" */
  update_drink?: Maybe<Drink_Mutation_Response>;
  /** update single row of the table: "drink" */
  update_drink_by_pk?: Maybe<Drink>;
  /** update data of the table: "employee" */
  update_employee?: Maybe<Employee_Mutation_Response>;
  /** update single row of the table: "employee" */
  update_employee_by_pk?: Maybe<Employee>;
  /** update data of the table: "game" */
  update_game?: Maybe<Game_Mutation_Response>;
  /** update single row of the table: "game" */
  update_game_by_pk?: Maybe<Game>;
  /** update data of the table: "garden" */
  update_garden?: Maybe<Garden_Mutation_Response>;
  /** update single row of the table: "garden" */
  update_garden_by_pk?: Maybe<Garden>;
  /** update data of the table: "house" */
  update_house?: Maybe<House_Mutation_Response>;
  /** update single row of the table: "house" */
  update_house_by_pk?: Maybe<House>;
  /** update data of the table: "house_food_demand" */
  update_house_food_demand?: Maybe<House_Food_Demand_Mutation_Response>;
  /** update single row of the table: "house_food_demand" */
  update_house_food_demand_by_pk?: Maybe<House_Food_Demand>;
  /** update data of the table: "player" */
  update_player?: Maybe<Player_Mutation_Response>;
  /** update single row of the table: "player" */
  update_player_by_pk?: Maybe<Player>;
  /** update data of the table: "player_food" */
  update_player_food?: Maybe<Player_Food_Mutation_Response>;
  /** update single row of the table: "player_food" */
  update_player_food_by_pk?: Maybe<Player_Food>;
  /** update data of the table: "road" */
  update_road?: Maybe<Road_Mutation_Response>;
  /** update single row of the table: "road" */
  update_road_by_pk?: Maybe<Road>;
  /** update data of the table: "road_connection" */
  update_road_connection?: Maybe<Road_Connection_Mutation_Response>;
  /** update single row of the table: "road_connection" */
  update_road_connection_by_pk?: Maybe<Road_Connection>;
  /** update data of the table: "user_info" */
  update_user_info?: Maybe<User_Info_Mutation_Response>;
  /** update single row of the table: "user_info" */
  update_user_info_by_pk?: Maybe<User_Info>;
  /** update data of the table: "user_me" */
  update_user_me?: Maybe<User_Me_Mutation_Response>;
};

/** mutation root */
export type Mutation_RootDelete_AdvertArgs = {
  where: Advert_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Advert_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Board_ObjectArgs = {
  where: Board_Object_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Board_Object_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_DinerArgs = {
  where: Diner_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Diner_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_DrinkArgs = {
  where: Drink_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Drink_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_EmployeeArgs = {
  where: Employee_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Employee_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_GameArgs = {
  where: Game_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Game_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_GardenArgs = {
  where: Garden_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Garden_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_HouseArgs = {
  where: House_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_House_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_House_Food_DemandArgs = {
  where: House_Food_Demand_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_House_Food_Demand_By_PkArgs = {
  food_kind: Scalars['String'];
  house: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_PlayerArgs = {
  where: Player_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Player_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Player_FoodArgs = {
  where: Player_Food_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Player_Food_By_PkArgs = {
  food_kind: Scalars['String'];
  player: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_RoadArgs = {
  where: Road_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Road_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Road_ConnectionArgs = {
  where: Road_Connection_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Road_Connection_By_PkArgs = {
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
export type Mutation_RootInsert_AdvertArgs = {
  objects: Array<Advert_Insert_Input>;
  on_conflict?: InputMaybe<Advert_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Advert_OneArgs = {
  object: Advert_Insert_Input;
  on_conflict?: InputMaybe<Advert_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Board_ObjectArgs = {
  objects: Array<Board_Object_Insert_Input>;
  on_conflict?: InputMaybe<Board_Object_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Board_Object_OneArgs = {
  object: Board_Object_Insert_Input;
  on_conflict?: InputMaybe<Board_Object_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_DinerArgs = {
  objects: Array<Diner_Insert_Input>;
  on_conflict?: InputMaybe<Diner_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Diner_OneArgs = {
  object: Diner_Insert_Input;
  on_conflict?: InputMaybe<Diner_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_DrinkArgs = {
  objects: Array<Drink_Insert_Input>;
  on_conflict?: InputMaybe<Drink_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Drink_OneArgs = {
  object: Drink_Insert_Input;
  on_conflict?: InputMaybe<Drink_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_EmployeeArgs = {
  objects: Array<Employee_Insert_Input>;
  on_conflict?: InputMaybe<Employee_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Employee_OneArgs = {
  object: Employee_Insert_Input;
  on_conflict?: InputMaybe<Employee_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GameArgs = {
  objects: Array<Game_Insert_Input>;
  on_conflict?: InputMaybe<Game_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Game_OneArgs = {
  object: Game_Insert_Input;
  on_conflict?: InputMaybe<Game_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GardenArgs = {
  objects: Array<Garden_Insert_Input>;
  on_conflict?: InputMaybe<Garden_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Garden_OneArgs = {
  object: Garden_Insert_Input;
  on_conflict?: InputMaybe<Garden_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_HouseArgs = {
  objects: Array<House_Insert_Input>;
  on_conflict?: InputMaybe<House_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_House_Food_DemandArgs = {
  objects: Array<House_Food_Demand_Insert_Input>;
  on_conflict?: InputMaybe<House_Food_Demand_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_House_Food_Demand_OneArgs = {
  object: House_Food_Demand_Insert_Input;
  on_conflict?: InputMaybe<House_Food_Demand_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_House_OneArgs = {
  object: House_Insert_Input;
  on_conflict?: InputMaybe<House_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_PlayerArgs = {
  objects: Array<Player_Insert_Input>;
  on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_FoodArgs = {
  objects: Array<Player_Food_Insert_Input>;
  on_conflict?: InputMaybe<Player_Food_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_Food_OneArgs = {
  object: Player_Food_Insert_Input;
  on_conflict?: InputMaybe<Player_Food_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_OneArgs = {
  object: Player_Insert_Input;
  on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_RoadArgs = {
  objects: Array<Road_Insert_Input>;
  on_conflict?: InputMaybe<Road_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Road_ConnectionArgs = {
  objects: Array<Road_Connection_Insert_Input>;
  on_conflict?: InputMaybe<Road_Connection_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Road_Connection_OneArgs = {
  object: Road_Connection_Insert_Input;
  on_conflict?: InputMaybe<Road_Connection_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Road_OneArgs = {
  object: Road_Insert_Input;
  on_conflict?: InputMaybe<Road_On_Conflict>;
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
export type Mutation_RootUpdate_AdvertArgs = {
  _inc?: InputMaybe<Advert_Inc_Input>;
  _set?: InputMaybe<Advert_Set_Input>;
  where: Advert_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Advert_By_PkArgs = {
  _inc?: InputMaybe<Advert_Inc_Input>;
  _set?: InputMaybe<Advert_Set_Input>;
  pk_columns: Advert_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Board_ObjectArgs = {
  _inc?: InputMaybe<Board_Object_Inc_Input>;
  _set?: InputMaybe<Board_Object_Set_Input>;
  where: Board_Object_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Board_Object_By_PkArgs = {
  _inc?: InputMaybe<Board_Object_Inc_Input>;
  _set?: InputMaybe<Board_Object_Set_Input>;
  pk_columns: Board_Object_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_DinerArgs = {
  _set?: InputMaybe<Diner_Set_Input>;
  where: Diner_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Diner_By_PkArgs = {
  _set?: InputMaybe<Diner_Set_Input>;
  pk_columns: Diner_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_DrinkArgs = {
  _set?: InputMaybe<Drink_Set_Input>;
  where: Drink_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Drink_By_PkArgs = {
  _set?: InputMaybe<Drink_Set_Input>;
  pk_columns: Drink_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_EmployeeArgs = {
  _inc?: InputMaybe<Employee_Inc_Input>;
  _set?: InputMaybe<Employee_Set_Input>;
  where: Employee_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Employee_By_PkArgs = {
  _inc?: InputMaybe<Employee_Inc_Input>;
  _set?: InputMaybe<Employee_Set_Input>;
  pk_columns: Employee_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_GameArgs = {
  _set?: InputMaybe<Game_Set_Input>;
  where: Game_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Game_By_PkArgs = {
  _set?: InputMaybe<Game_Set_Input>;
  pk_columns: Game_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_GardenArgs = {
  _set?: InputMaybe<Garden_Set_Input>;
  where: Garden_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Garden_By_PkArgs = {
  _set?: InputMaybe<Garden_Set_Input>;
  pk_columns: Garden_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_HouseArgs = {
  _inc?: InputMaybe<House_Inc_Input>;
  _set?: InputMaybe<House_Set_Input>;
  where: House_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_House_By_PkArgs = {
  _inc?: InputMaybe<House_Inc_Input>;
  _set?: InputMaybe<House_Set_Input>;
  pk_columns: House_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_House_Food_DemandArgs = {
  _inc?: InputMaybe<House_Food_Demand_Inc_Input>;
  _set?: InputMaybe<House_Food_Demand_Set_Input>;
  where: House_Food_Demand_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_House_Food_Demand_By_PkArgs = {
  _inc?: InputMaybe<House_Food_Demand_Inc_Input>;
  _set?: InputMaybe<House_Food_Demand_Set_Input>;
  pk_columns: House_Food_Demand_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_PlayerArgs = {
  _inc?: InputMaybe<Player_Inc_Input>;
  _set?: InputMaybe<Player_Set_Input>;
  where: Player_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Player_By_PkArgs = {
  _inc?: InputMaybe<Player_Inc_Input>;
  _set?: InputMaybe<Player_Set_Input>;
  pk_columns: Player_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Player_FoodArgs = {
  _inc?: InputMaybe<Player_Food_Inc_Input>;
  _set?: InputMaybe<Player_Food_Set_Input>;
  where: Player_Food_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Player_Food_By_PkArgs = {
  _inc?: InputMaybe<Player_Food_Inc_Input>;
  _set?: InputMaybe<Player_Food_Set_Input>;
  pk_columns: Player_Food_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_RoadArgs = {
  _set?: InputMaybe<Road_Set_Input>;
  where: Road_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Road_By_PkArgs = {
  _set?: InputMaybe<Road_Set_Input>;
  pk_columns: Road_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Road_ConnectionArgs = {
  _inc?: InputMaybe<Road_Connection_Inc_Input>;
  _set?: InputMaybe<Road_Connection_Set_Input>;
  where: Road_Connection_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Road_Connection_By_PkArgs = {
  _inc?: InputMaybe<Road_Connection_Inc_Input>;
  _set?: InputMaybe<Road_Connection_Set_Input>;
  pk_columns: Road_Connection_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_InfoArgs = {
  _set?: InputMaybe<User_Info_Set_Input>;
  where: User_Info_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_Info_By_PkArgs = {
  _set?: InputMaybe<User_Info_Set_Input>;
  pk_columns: User_Info_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_MeArgs = {
  _set?: InputMaybe<User_Me_Set_Input>;
  where: User_Me_Bool_Exp;
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

/** columns and relationships of "player" */
export type Player = {
  __typename?: 'player';
  cash?: Maybe<Scalars['Int']>;
  colour?: Maybe<Scalars['String']>;
  /** An array relationship */
  diners: Array<Diner>;
  /** An aggregate relationship */
  diners_aggregate: Diner_Aggregate;
  game: Scalars['uuid'];
  /** An object relationship */
  gameByGame: Game;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  player_foods: Array<Player_Food>;
  /** An aggregate relationship */
  player_foods_aggregate: Player_Food_Aggregate;
};

/** columns and relationships of "player" */
export type PlayerDinersArgs = {
  distinct_on?: InputMaybe<Array<Diner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Diner_Order_By>>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerDiners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Diner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Diner_Order_By>>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerPlayer_FoodsArgs = {
  distinct_on?: InputMaybe<Array<Player_Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Food_Order_By>>;
  where?: InputMaybe<Player_Food_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerPlayer_Foods_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Food_Order_By>>;
  where?: InputMaybe<Player_Food_Bool_Exp>;
};

/** aggregated selection of "player" */
export type Player_Aggregate = {
  __typename?: 'player_aggregate';
  aggregate?: Maybe<Player_Aggregate_Fields>;
  nodes: Array<Player>;
};

/** aggregate fields of "player" */
export type Player_Aggregate_Fields = {
  __typename?: 'player_aggregate_fields';
  avg?: Maybe<Player_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Player_Max_Fields>;
  min?: Maybe<Player_Min_Fields>;
  stddev?: Maybe<Player_Stddev_Fields>;
  stddev_pop?: Maybe<Player_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Player_Stddev_Samp_Fields>;
  sum?: Maybe<Player_Sum_Fields>;
  var_pop?: Maybe<Player_Var_Pop_Fields>;
  var_samp?: Maybe<Player_Var_Samp_Fields>;
  variance?: Maybe<Player_Variance_Fields>;
};

/** aggregate fields of "player" */
export type Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player" */
export type Player_Aggregate_Order_By = {
  avg?: InputMaybe<Player_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Player_Max_Order_By>;
  min?: InputMaybe<Player_Min_Order_By>;
  stddev?: InputMaybe<Player_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Player_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Player_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Player_Sum_Order_By>;
  var_pop?: InputMaybe<Player_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Player_Var_Samp_Order_By>;
  variance?: InputMaybe<Player_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "player" */
export type Player_Arr_Rel_Insert_Input = {
  data: Array<Player_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** aggregate avg on columns */
export type Player_Avg_Fields = {
  __typename?: 'player_avg_fields';
  cash?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "player" */
export type Player_Avg_Order_By = {
  cash?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "player". All fields are combined with a logical 'AND'. */
export type Player_Bool_Exp = {
  _and?: InputMaybe<Array<Player_Bool_Exp>>;
  _not?: InputMaybe<Player_Bool_Exp>;
  _or?: InputMaybe<Array<Player_Bool_Exp>>;
  cash?: InputMaybe<Int_Comparison_Exp>;
  colour?: InputMaybe<String_Comparison_Exp>;
  diners?: InputMaybe<Diner_Bool_Exp>;
  game?: InputMaybe<Uuid_Comparison_Exp>;
  gameByGame?: InputMaybe<Game_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  player_foods?: InputMaybe<Player_Food_Bool_Exp>;
};

/** unique or primary key constraints on table "player" */
export enum Player_Constraint {
  /** unique or primary key constraint */
  PlayerPkey = 'player_pkey',
}

/** columns and relationships of "player_food" */
export type Player_Food = {
  __typename?: 'player_food';
  food_kind: Scalars['String'];
  food_quantity: Scalars['Int'];
  player: Scalars['uuid'];
  /** An object relationship */
  playerByPlayer: Player;
};

/** aggregated selection of "player_food" */
export type Player_Food_Aggregate = {
  __typename?: 'player_food_aggregate';
  aggregate?: Maybe<Player_Food_Aggregate_Fields>;
  nodes: Array<Player_Food>;
};

/** aggregate fields of "player_food" */
export type Player_Food_Aggregate_Fields = {
  __typename?: 'player_food_aggregate_fields';
  avg?: Maybe<Player_Food_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Player_Food_Max_Fields>;
  min?: Maybe<Player_Food_Min_Fields>;
  stddev?: Maybe<Player_Food_Stddev_Fields>;
  stddev_pop?: Maybe<Player_Food_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Player_Food_Stddev_Samp_Fields>;
  sum?: Maybe<Player_Food_Sum_Fields>;
  var_pop?: Maybe<Player_Food_Var_Pop_Fields>;
  var_samp?: Maybe<Player_Food_Var_Samp_Fields>;
  variance?: Maybe<Player_Food_Variance_Fields>;
};

/** aggregate fields of "player_food" */
export type Player_Food_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Player_Food_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player_food" */
export type Player_Food_Aggregate_Order_By = {
  avg?: InputMaybe<Player_Food_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Player_Food_Max_Order_By>;
  min?: InputMaybe<Player_Food_Min_Order_By>;
  stddev?: InputMaybe<Player_Food_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Player_Food_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Player_Food_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Player_Food_Sum_Order_By>;
  var_pop?: InputMaybe<Player_Food_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Player_Food_Var_Samp_Order_By>;
  variance?: InputMaybe<Player_Food_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "player_food" */
export type Player_Food_Arr_Rel_Insert_Input = {
  data: Array<Player_Food_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Player_Food_On_Conflict>;
};

/** aggregate avg on columns */
export type Player_Food_Avg_Fields = {
  __typename?: 'player_food_avg_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "player_food" */
export type Player_Food_Avg_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "player_food". All fields are combined with a logical 'AND'. */
export type Player_Food_Bool_Exp = {
  _and?: InputMaybe<Array<Player_Food_Bool_Exp>>;
  _not?: InputMaybe<Player_Food_Bool_Exp>;
  _or?: InputMaybe<Array<Player_Food_Bool_Exp>>;
  food_kind?: InputMaybe<String_Comparison_Exp>;
  food_quantity?: InputMaybe<Int_Comparison_Exp>;
  player?: InputMaybe<Uuid_Comparison_Exp>;
  playerByPlayer?: InputMaybe<Player_Bool_Exp>;
};

/** unique or primary key constraints on table "player_food" */
export enum Player_Food_Constraint {
  /** unique or primary key constraint */
  PlayerFoodPkey = 'player_food_pkey',
}

/** input type for incrementing numeric columns in table "player_food" */
export type Player_Food_Inc_Input = {
  food_quantity?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "player_food" */
export type Player_Food_Insert_Input = {
  food_kind?: InputMaybe<Scalars['String']>;
  food_quantity?: InputMaybe<Scalars['Int']>;
  player?: InputMaybe<Scalars['uuid']>;
  playerByPlayer?: InputMaybe<Player_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Player_Food_Max_Fields = {
  __typename?: 'player_food_max_fields';
  food_kind?: Maybe<Scalars['String']>;
  food_quantity?: Maybe<Scalars['Int']>;
  player?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "player_food" */
export type Player_Food_Max_Order_By = {
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  player?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Food_Min_Fields = {
  __typename?: 'player_food_min_fields';
  food_kind?: Maybe<Scalars['String']>;
  food_quantity?: Maybe<Scalars['Int']>;
  player?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "player_food" */
export type Player_Food_Min_Order_By = {
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  player?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player_food" */
export type Player_Food_Mutation_Response = {
  __typename?: 'player_food_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Player_Food>;
};

/** on conflict condition type for table "player_food" */
export type Player_Food_On_Conflict = {
  constraint: Player_Food_Constraint;
  update_columns?: Array<Player_Food_Update_Column>;
  where?: InputMaybe<Player_Food_Bool_Exp>;
};

/** Ordering options when selecting data from "player_food". */
export type Player_Food_Order_By = {
  food_kind?: InputMaybe<Order_By>;
  food_quantity?: InputMaybe<Order_By>;
  player?: InputMaybe<Order_By>;
  playerByPlayer?: InputMaybe<Player_Order_By>;
};

/** primary key columns input for table: player_food */
export type Player_Food_Pk_Columns_Input = {
  food_kind: Scalars['String'];
  player: Scalars['uuid'];
};

/** select columns of table "player_food" */
export enum Player_Food_Select_Column {
  /** column name */
  FoodKind = 'food_kind',
  /** column name */
  FoodQuantity = 'food_quantity',
  /** column name */
  Player = 'player',
}

/** input type for updating data in table "player_food" */
export type Player_Food_Set_Input = {
  food_kind?: InputMaybe<Scalars['String']>;
  food_quantity?: InputMaybe<Scalars['Int']>;
  player?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Player_Food_Stddev_Fields = {
  __typename?: 'player_food_stddev_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "player_food" */
export type Player_Food_Stddev_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Player_Food_Stddev_Pop_Fields = {
  __typename?: 'player_food_stddev_pop_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "player_food" */
export type Player_Food_Stddev_Pop_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Player_Food_Stddev_Samp_Fields = {
  __typename?: 'player_food_stddev_samp_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "player_food" */
export type Player_Food_Stddev_Samp_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Player_Food_Sum_Fields = {
  __typename?: 'player_food_sum_fields';
  food_quantity?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "player_food" */
export type Player_Food_Sum_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** update columns of table "player_food" */
export enum Player_Food_Update_Column {
  /** column name */
  FoodKind = 'food_kind',
  /** column name */
  FoodQuantity = 'food_quantity',
  /** column name */
  Player = 'player',
}

/** aggregate var_pop on columns */
export type Player_Food_Var_Pop_Fields = {
  __typename?: 'player_food_var_pop_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "player_food" */
export type Player_Food_Var_Pop_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Player_Food_Var_Samp_Fields = {
  __typename?: 'player_food_var_samp_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "player_food" */
export type Player_Food_Var_Samp_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Player_Food_Variance_Fields = {
  __typename?: 'player_food_variance_fields';
  food_quantity?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "player_food" */
export type Player_Food_Variance_Order_By = {
  food_quantity?: InputMaybe<Order_By>;
};

/** input type for incrementing numeric columns in table "player" */
export type Player_Inc_Input = {
  cash?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "player" */
export type Player_Insert_Input = {
  cash?: InputMaybe<Scalars['Int']>;
  colour?: InputMaybe<Scalars['String']>;
  diners?: InputMaybe<Diner_Arr_Rel_Insert_Input>;
  game?: InputMaybe<Scalars['uuid']>;
  gameByGame?: InputMaybe<Game_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  player_foods?: InputMaybe<Player_Food_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Player_Max_Fields = {
  __typename?: 'player_max_fields';
  cash?: Maybe<Scalars['Int']>;
  colour?: Maybe<Scalars['String']>;
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "player" */
export type Player_Max_Order_By = {
  cash?: InputMaybe<Order_By>;
  colour?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Min_Fields = {
  __typename?: 'player_min_fields';
  cash?: Maybe<Scalars['Int']>;
  colour?: Maybe<Scalars['String']>;
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "player" */
export type Player_Min_Order_By = {
  cash?: InputMaybe<Order_By>;
  colour?: InputMaybe<Order_By>;
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player" */
export type Player_Mutation_Response = {
  __typename?: 'player_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Player>;
};

/** input type for inserting object relation for remote table "player" */
export type Player_Obj_Rel_Insert_Input = {
  data: Player_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** on conflict condition type for table "player" */
export type Player_On_Conflict = {
  constraint: Player_Constraint;
  update_columns?: Array<Player_Update_Column>;
  where?: InputMaybe<Player_Bool_Exp>;
};

/** Ordering options when selecting data from "player". */
export type Player_Order_By = {
  cash?: InputMaybe<Order_By>;
  colour?: InputMaybe<Order_By>;
  diners_aggregate?: InputMaybe<Diner_Aggregate_Order_By>;
  game?: InputMaybe<Order_By>;
  gameByGame?: InputMaybe<Game_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  player_foods_aggregate?: InputMaybe<Player_Food_Aggregate_Order_By>;
};

/** primary key columns input for table: player */
export type Player_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "player" */
export enum Player_Select_Column {
  /** column name */
  Cash = 'cash',
  /** column name */
  Colour = 'colour',
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "player" */
export type Player_Set_Input = {
  cash?: InputMaybe<Scalars['Int']>;
  colour?: InputMaybe<Scalars['String']>;
  game?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Player_Stddev_Fields = {
  __typename?: 'player_stddev_fields';
  cash?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "player" */
export type Player_Stddev_Order_By = {
  cash?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Player_Stddev_Pop_Fields = {
  __typename?: 'player_stddev_pop_fields';
  cash?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "player" */
export type Player_Stddev_Pop_Order_By = {
  cash?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Player_Stddev_Samp_Fields = {
  __typename?: 'player_stddev_samp_fields';
  cash?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "player" */
export type Player_Stddev_Samp_Order_By = {
  cash?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Player_Sum_Fields = {
  __typename?: 'player_sum_fields';
  cash?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "player" */
export type Player_Sum_Order_By = {
  cash?: InputMaybe<Order_By>;
};

/** update columns of table "player" */
export enum Player_Update_Column {
  /** column name */
  Cash = 'cash',
  /** column name */
  Colour = 'colour',
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** aggregate var_pop on columns */
export type Player_Var_Pop_Fields = {
  __typename?: 'player_var_pop_fields';
  cash?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "player" */
export type Player_Var_Pop_Order_By = {
  cash?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Player_Var_Samp_Fields = {
  __typename?: 'player_var_samp_fields';
  cash?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "player" */
export type Player_Var_Samp_Order_By = {
  cash?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Player_Variance_Fields = {
  __typename?: 'player_variance_fields';
  cash?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "player" */
export type Player_Variance_Order_By = {
  cash?: InputMaybe<Order_By>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "advert" */
  advert: Array<Advert>;
  /** fetch aggregated fields from the table: "advert" */
  advert_aggregate: Advert_Aggregate;
  /** fetch data from the table: "advert" using primary key columns */
  advert_by_pk?: Maybe<Advert>;
  /** fetch data from the table: "board_object" */
  board_object: Array<Board_Object>;
  /** fetch aggregated fields from the table: "board_object" */
  board_object_aggregate: Board_Object_Aggregate;
  /** fetch data from the table: "board_object" using primary key columns */
  board_object_by_pk?: Maybe<Board_Object>;
  /** fetch data from the table: "diner" */
  diner: Array<Diner>;
  /** fetch aggregated fields from the table: "diner" */
  diner_aggregate: Diner_Aggregate;
  /** fetch data from the table: "diner" using primary key columns */
  diner_by_pk?: Maybe<Diner>;
  /** fetch data from the table: "drink" */
  drink: Array<Drink>;
  /** fetch aggregated fields from the table: "drink" */
  drink_aggregate: Drink_Aggregate;
  /** fetch data from the table: "drink" using primary key columns */
  drink_by_pk?: Maybe<Drink>;
  /** fetch data from the table: "employee" */
  employee: Array<Employee>;
  /** fetch aggregated fields from the table: "employee" */
  employee_aggregate: Employee_Aggregate;
  /** fetch data from the table: "employee" using primary key columns */
  employee_by_pk?: Maybe<Employee>;
  /** fetch data from the table: "game" */
  game: Array<Game>;
  /** fetch aggregated fields from the table: "game" */
  game_aggregate: Game_Aggregate;
  /** fetch data from the table: "game" using primary key columns */
  game_by_pk?: Maybe<Game>;
  /** fetch data from the table: "garden" */
  garden: Array<Garden>;
  /** fetch aggregated fields from the table: "garden" */
  garden_aggregate: Garden_Aggregate;
  /** fetch data from the table: "garden" using primary key columns */
  garden_by_pk?: Maybe<Garden>;
  /** fetch data from the table: "house" */
  house: Array<House>;
  /** fetch aggregated fields from the table: "house" */
  house_aggregate: House_Aggregate;
  /** fetch data from the table: "house" using primary key columns */
  house_by_pk?: Maybe<House>;
  /** fetch data from the table: "house_food_demand" */
  house_food_demand: Array<House_Food_Demand>;
  /** fetch aggregated fields from the table: "house_food_demand" */
  house_food_demand_aggregate: House_Food_Demand_Aggregate;
  /** fetch data from the table: "house_food_demand" using primary key columns */
  house_food_demand_by_pk?: Maybe<House_Food_Demand>;
  /** fetch data from the table: "player" */
  player: Array<Player>;
  /** fetch aggregated fields from the table: "player" */
  player_aggregate: Player_Aggregate;
  /** fetch data from the table: "player" using primary key columns */
  player_by_pk?: Maybe<Player>;
  /** fetch data from the table: "player_food" */
  player_food: Array<Player_Food>;
  /** fetch aggregated fields from the table: "player_food" */
  player_food_aggregate: Player_Food_Aggregate;
  /** fetch data from the table: "player_food" using primary key columns */
  player_food_by_pk?: Maybe<Player_Food>;
  /** fetch data from the table: "road" */
  road: Array<Road>;
  /** fetch aggregated fields from the table: "road" */
  road_aggregate: Road_Aggregate;
  /** fetch data from the table: "road" using primary key columns */
  road_by_pk?: Maybe<Road>;
  /** fetch data from the table: "road_connection" */
  road_connection: Array<Road_Connection>;
  /** fetch aggregated fields from the table: "road_connection" */
  road_connection_aggregate: Road_Connection_Aggregate;
  /** fetch data from the table: "road_connection" using primary key columns */
  road_connection_by_pk?: Maybe<Road_Connection>;
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
};

export type Query_RootAdvertArgs = {
  distinct_on?: InputMaybe<Array<Advert_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Advert_Order_By>>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

export type Query_RootAdvert_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Advert_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Advert_Order_By>>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

export type Query_RootAdvert_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootBoard_ObjectArgs = {
  distinct_on?: InputMaybe<Array<Board_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Board_Object_Order_By>>;
  where?: InputMaybe<Board_Object_Bool_Exp>;
};

export type Query_RootBoard_Object_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Board_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Board_Object_Order_By>>;
  where?: InputMaybe<Board_Object_Bool_Exp>;
};

export type Query_RootBoard_Object_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootDinerArgs = {
  distinct_on?: InputMaybe<Array<Diner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Diner_Order_By>>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

export type Query_RootDiner_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Diner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Diner_Order_By>>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

export type Query_RootDiner_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootDrinkArgs = {
  distinct_on?: InputMaybe<Array<Drink_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Drink_Order_By>>;
  where?: InputMaybe<Drink_Bool_Exp>;
};

export type Query_RootDrink_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drink_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Drink_Order_By>>;
  where?: InputMaybe<Drink_Bool_Exp>;
};

export type Query_RootDrink_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootEmployeeArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};

export type Query_RootEmployee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};

export type Query_RootEmployee_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootGameArgs = {
  distinct_on?: InputMaybe<Array<Game_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Game_Order_By>>;
  where?: InputMaybe<Game_Bool_Exp>;
};

export type Query_RootGame_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Game_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Game_Order_By>>;
  where?: InputMaybe<Game_Bool_Exp>;
};

export type Query_RootGame_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootGardenArgs = {
  distinct_on?: InputMaybe<Array<Garden_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Garden_Order_By>>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

export type Query_RootGarden_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Garden_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Garden_Order_By>>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

export type Query_RootGarden_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootHouseArgs = {
  distinct_on?: InputMaybe<Array<House_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Order_By>>;
  where?: InputMaybe<House_Bool_Exp>;
};

export type Query_RootHouse_AggregateArgs = {
  distinct_on?: InputMaybe<Array<House_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Order_By>>;
  where?: InputMaybe<House_Bool_Exp>;
};

export type Query_RootHouse_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootHouse_Food_DemandArgs = {
  distinct_on?: InputMaybe<Array<House_Food_Demand_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Food_Demand_Order_By>>;
  where?: InputMaybe<House_Food_Demand_Bool_Exp>;
};

export type Query_RootHouse_Food_Demand_AggregateArgs = {
  distinct_on?: InputMaybe<Array<House_Food_Demand_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Food_Demand_Order_By>>;
  where?: InputMaybe<House_Food_Demand_Bool_Exp>;
};

export type Query_RootHouse_Food_Demand_By_PkArgs = {
  food_kind: Scalars['String'];
  house: Scalars['uuid'];
};

export type Query_RootPlayerArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

export type Query_RootPlayer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

export type Query_RootPlayer_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootPlayer_FoodArgs = {
  distinct_on?: InputMaybe<Array<Player_Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Food_Order_By>>;
  where?: InputMaybe<Player_Food_Bool_Exp>;
};

export type Query_RootPlayer_Food_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Food_Order_By>>;
  where?: InputMaybe<Player_Food_Bool_Exp>;
};

export type Query_RootPlayer_Food_By_PkArgs = {
  food_kind: Scalars['String'];
  player: Scalars['uuid'];
};

export type Query_RootRoadArgs = {
  distinct_on?: InputMaybe<Array<Road_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Order_By>>;
  where?: InputMaybe<Road_Bool_Exp>;
};

export type Query_RootRoad_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Road_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Order_By>>;
  where?: InputMaybe<Road_Bool_Exp>;
};

export type Query_RootRoad_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Query_RootRoad_ConnectionArgs = {
  distinct_on?: InputMaybe<Array<Road_Connection_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Connection_Order_By>>;
  where?: InputMaybe<Road_Connection_Bool_Exp>;
};

export type Query_RootRoad_Connection_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Road_Connection_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Connection_Order_By>>;
  where?: InputMaybe<Road_Connection_Bool_Exp>;
};

export type Query_RootRoad_Connection_By_PkArgs = {
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

/** columns and relationships of "road" */
export type Road = {
  __typename?: 'road';
  /** An object relationship */
  board_object: Board_Object;
  game: Scalars['uuid'];
  /** An object relationship */
  gameByGame: Game;
  id: Scalars['uuid'];
  /** An object relationship */
  road_connection?: Maybe<Road_Connection>;
};

/** aggregated selection of "road" */
export type Road_Aggregate = {
  __typename?: 'road_aggregate';
  aggregate?: Maybe<Road_Aggregate_Fields>;
  nodes: Array<Road>;
};

/** aggregate fields of "road" */
export type Road_Aggregate_Fields = {
  __typename?: 'road_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Road_Max_Fields>;
  min?: Maybe<Road_Min_Fields>;
};

/** aggregate fields of "road" */
export type Road_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Road_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "road" */
export type Road_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Road_Max_Order_By>;
  min?: InputMaybe<Road_Min_Order_By>;
};

/** input type for inserting array relation for remote table "road" */
export type Road_Arr_Rel_Insert_Input = {
  data: Array<Road_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Road_On_Conflict>;
};

/** Boolean expression to filter rows from the table "road". All fields are combined with a logical 'AND'. */
export type Road_Bool_Exp = {
  _and?: InputMaybe<Array<Road_Bool_Exp>>;
  _not?: InputMaybe<Road_Bool_Exp>;
  _or?: InputMaybe<Array<Road_Bool_Exp>>;
  board_object?: InputMaybe<Board_Object_Bool_Exp>;
  game?: InputMaybe<Uuid_Comparison_Exp>;
  gameByGame?: InputMaybe<Game_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  road_connection?: InputMaybe<Road_Connection_Bool_Exp>;
};

/** columns and relationships of "road_connection" */
export type Road_Connection = {
  __typename?: 'road_connection';
  id: Scalars['uuid'];
  number: Scalars['Int'];
  /** An object relationship */
  road: Road;
};

/** aggregated selection of "road_connection" */
export type Road_Connection_Aggregate = {
  __typename?: 'road_connection_aggregate';
  aggregate?: Maybe<Road_Connection_Aggregate_Fields>;
  nodes: Array<Road_Connection>;
};

/** aggregate fields of "road_connection" */
export type Road_Connection_Aggregate_Fields = {
  __typename?: 'road_connection_aggregate_fields';
  avg?: Maybe<Road_Connection_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Road_Connection_Max_Fields>;
  min?: Maybe<Road_Connection_Min_Fields>;
  stddev?: Maybe<Road_Connection_Stddev_Fields>;
  stddev_pop?: Maybe<Road_Connection_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Road_Connection_Stddev_Samp_Fields>;
  sum?: Maybe<Road_Connection_Sum_Fields>;
  var_pop?: Maybe<Road_Connection_Var_Pop_Fields>;
  var_samp?: Maybe<Road_Connection_Var_Samp_Fields>;
  variance?: Maybe<Road_Connection_Variance_Fields>;
};

/** aggregate fields of "road_connection" */
export type Road_Connection_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Road_Connection_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Road_Connection_Avg_Fields = {
  __typename?: 'road_connection_avg_fields';
  number?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "road_connection". All fields are combined with a logical 'AND'. */
export type Road_Connection_Bool_Exp = {
  _and?: InputMaybe<Array<Road_Connection_Bool_Exp>>;
  _not?: InputMaybe<Road_Connection_Bool_Exp>;
  _or?: InputMaybe<Array<Road_Connection_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  number?: InputMaybe<Int_Comparison_Exp>;
  road?: InputMaybe<Road_Bool_Exp>;
};

/** unique or primary key constraints on table "road_connection" */
export enum Road_Connection_Constraint {
  /** unique or primary key constraint */
  RoadConnectionPkey = 'road_connection_pkey',
}

/** input type for incrementing numeric columns in table "road_connection" */
export type Road_Connection_Inc_Input = {
  number?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "road_connection" */
export type Road_Connection_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  number?: InputMaybe<Scalars['Int']>;
  road?: InputMaybe<Road_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Road_Connection_Max_Fields = {
  __typename?: 'road_connection_max_fields';
  id?: Maybe<Scalars['uuid']>;
  number?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Road_Connection_Min_Fields = {
  __typename?: 'road_connection_min_fields';
  id?: Maybe<Scalars['uuid']>;
  number?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "road_connection" */
export type Road_Connection_Mutation_Response = {
  __typename?: 'road_connection_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Road_Connection>;
};

/** input type for inserting object relation for remote table "road_connection" */
export type Road_Connection_Obj_Rel_Insert_Input = {
  data: Road_Connection_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Road_Connection_On_Conflict>;
};

/** on conflict condition type for table "road_connection" */
export type Road_Connection_On_Conflict = {
  constraint: Road_Connection_Constraint;
  update_columns?: Array<Road_Connection_Update_Column>;
  where?: InputMaybe<Road_Connection_Bool_Exp>;
};

/** Ordering options when selecting data from "road_connection". */
export type Road_Connection_Order_By = {
  id?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  road?: InputMaybe<Road_Order_By>;
};

/** primary key columns input for table: road_connection */
export type Road_Connection_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "road_connection" */
export enum Road_Connection_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Number = 'number',
}

/** input type for updating data in table "road_connection" */
export type Road_Connection_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  number?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Road_Connection_Stddev_Fields = {
  __typename?: 'road_connection_stddev_fields';
  number?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Road_Connection_Stddev_Pop_Fields = {
  __typename?: 'road_connection_stddev_pop_fields';
  number?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Road_Connection_Stddev_Samp_Fields = {
  __typename?: 'road_connection_stddev_samp_fields';
  number?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Road_Connection_Sum_Fields = {
  __typename?: 'road_connection_sum_fields';
  number?: Maybe<Scalars['Int']>;
};

/** update columns of table "road_connection" */
export enum Road_Connection_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Number = 'number',
}

/** aggregate var_pop on columns */
export type Road_Connection_Var_Pop_Fields = {
  __typename?: 'road_connection_var_pop_fields';
  number?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Road_Connection_Var_Samp_Fields = {
  __typename?: 'road_connection_var_samp_fields';
  number?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Road_Connection_Variance_Fields = {
  __typename?: 'road_connection_variance_fields';
  number?: Maybe<Scalars['Float']>;
};

/** unique or primary key constraints on table "road" */
export enum Road_Constraint {
  /** unique or primary key constraint */
  RoadPkey = 'road_pkey',
}

/** input type for inserting data into table "road" */
export type Road_Insert_Input = {
  board_object?: InputMaybe<Board_Object_Obj_Rel_Insert_Input>;
  game?: InputMaybe<Scalars['uuid']>;
  gameByGame?: InputMaybe<Game_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  road_connection?: InputMaybe<Road_Connection_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Road_Max_Fields = {
  __typename?: 'road_max_fields';
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "road" */
export type Road_Max_Order_By = {
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Road_Min_Fields = {
  __typename?: 'road_min_fields';
  game?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "road" */
export type Road_Min_Order_By = {
  game?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "road" */
export type Road_Mutation_Response = {
  __typename?: 'road_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Road>;
};

/** input type for inserting object relation for remote table "road" */
export type Road_Obj_Rel_Insert_Input = {
  data: Road_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Road_On_Conflict>;
};

/** on conflict condition type for table "road" */
export type Road_On_Conflict = {
  constraint: Road_Constraint;
  update_columns?: Array<Road_Update_Column>;
  where?: InputMaybe<Road_Bool_Exp>;
};

/** Ordering options when selecting data from "road". */
export type Road_Order_By = {
  board_object?: InputMaybe<Board_Object_Order_By>;
  game?: InputMaybe<Order_By>;
  gameByGame?: InputMaybe<Game_Order_By>;
  id?: InputMaybe<Order_By>;
  road_connection?: InputMaybe<Road_Connection_Order_By>;
};

/** primary key columns input for table: road */
export type Road_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "road" */
export enum Road_Select_Column {
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
}

/** input type for updating data in table "road" */
export type Road_Set_Input = {
  game?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "road" */
export enum Road_Update_Column {
  /** column name */
  Game = 'game',
  /** column name */
  Id = 'id',
}

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "advert" */
  advert: Array<Advert>;
  /** fetch aggregated fields from the table: "advert" */
  advert_aggregate: Advert_Aggregate;
  /** fetch data from the table: "advert" using primary key columns */
  advert_by_pk?: Maybe<Advert>;
  /** fetch data from the table: "board_object" */
  board_object: Array<Board_Object>;
  /** fetch aggregated fields from the table: "board_object" */
  board_object_aggregate: Board_Object_Aggregate;
  /** fetch data from the table: "board_object" using primary key columns */
  board_object_by_pk?: Maybe<Board_Object>;
  /** fetch data from the table: "diner" */
  diner: Array<Diner>;
  /** fetch aggregated fields from the table: "diner" */
  diner_aggregate: Diner_Aggregate;
  /** fetch data from the table: "diner" using primary key columns */
  diner_by_pk?: Maybe<Diner>;
  /** fetch data from the table: "drink" */
  drink: Array<Drink>;
  /** fetch aggregated fields from the table: "drink" */
  drink_aggregate: Drink_Aggregate;
  /** fetch data from the table: "drink" using primary key columns */
  drink_by_pk?: Maybe<Drink>;
  /** fetch data from the table: "employee" */
  employee: Array<Employee>;
  /** fetch aggregated fields from the table: "employee" */
  employee_aggregate: Employee_Aggregate;
  /** fetch data from the table: "employee" using primary key columns */
  employee_by_pk?: Maybe<Employee>;
  /** fetch data from the table: "game" */
  game: Array<Game>;
  /** fetch aggregated fields from the table: "game" */
  game_aggregate: Game_Aggregate;
  /** fetch data from the table: "game" using primary key columns */
  game_by_pk?: Maybe<Game>;
  /** fetch data from the table: "garden" */
  garden: Array<Garden>;
  /** fetch aggregated fields from the table: "garden" */
  garden_aggregate: Garden_Aggregate;
  /** fetch data from the table: "garden" using primary key columns */
  garden_by_pk?: Maybe<Garden>;
  /** fetch data from the table: "house" */
  house: Array<House>;
  /** fetch aggregated fields from the table: "house" */
  house_aggregate: House_Aggregate;
  /** fetch data from the table: "house" using primary key columns */
  house_by_pk?: Maybe<House>;
  /** fetch data from the table: "house_food_demand" */
  house_food_demand: Array<House_Food_Demand>;
  /** fetch aggregated fields from the table: "house_food_demand" */
  house_food_demand_aggregate: House_Food_Demand_Aggregate;
  /** fetch data from the table: "house_food_demand" using primary key columns */
  house_food_demand_by_pk?: Maybe<House_Food_Demand>;
  /** fetch data from the table: "player" */
  player: Array<Player>;
  /** fetch aggregated fields from the table: "player" */
  player_aggregate: Player_Aggregate;
  /** fetch data from the table: "player" using primary key columns */
  player_by_pk?: Maybe<Player>;
  /** fetch data from the table: "player_food" */
  player_food: Array<Player_Food>;
  /** fetch aggregated fields from the table: "player_food" */
  player_food_aggregate: Player_Food_Aggregate;
  /** fetch data from the table: "player_food" using primary key columns */
  player_food_by_pk?: Maybe<Player_Food>;
  /** fetch data from the table: "road" */
  road: Array<Road>;
  /** fetch aggregated fields from the table: "road" */
  road_aggregate: Road_Aggregate;
  /** fetch data from the table: "road" using primary key columns */
  road_by_pk?: Maybe<Road>;
  /** fetch data from the table: "road_connection" */
  road_connection: Array<Road_Connection>;
  /** fetch aggregated fields from the table: "road_connection" */
  road_connection_aggregate: Road_Connection_Aggregate;
  /** fetch data from the table: "road_connection" using primary key columns */
  road_connection_by_pk?: Maybe<Road_Connection>;
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
};

export type Subscription_RootAdvertArgs = {
  distinct_on?: InputMaybe<Array<Advert_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Advert_Order_By>>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

export type Subscription_RootAdvert_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Advert_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Advert_Order_By>>;
  where?: InputMaybe<Advert_Bool_Exp>;
};

export type Subscription_RootAdvert_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootBoard_ObjectArgs = {
  distinct_on?: InputMaybe<Array<Board_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Board_Object_Order_By>>;
  where?: InputMaybe<Board_Object_Bool_Exp>;
};

export type Subscription_RootBoard_Object_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Board_Object_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Board_Object_Order_By>>;
  where?: InputMaybe<Board_Object_Bool_Exp>;
};

export type Subscription_RootBoard_Object_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootDinerArgs = {
  distinct_on?: InputMaybe<Array<Diner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Diner_Order_By>>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

export type Subscription_RootDiner_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Diner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Diner_Order_By>>;
  where?: InputMaybe<Diner_Bool_Exp>;
};

export type Subscription_RootDiner_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootDrinkArgs = {
  distinct_on?: InputMaybe<Array<Drink_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Drink_Order_By>>;
  where?: InputMaybe<Drink_Bool_Exp>;
};

export type Subscription_RootDrink_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drink_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Drink_Order_By>>;
  where?: InputMaybe<Drink_Bool_Exp>;
};

export type Subscription_RootDrink_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootEmployeeArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};

export type Subscription_RootEmployee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Employee_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Employee_Order_By>>;
  where?: InputMaybe<Employee_Bool_Exp>;
};

export type Subscription_RootEmployee_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootGameArgs = {
  distinct_on?: InputMaybe<Array<Game_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Game_Order_By>>;
  where?: InputMaybe<Game_Bool_Exp>;
};

export type Subscription_RootGame_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Game_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Game_Order_By>>;
  where?: InputMaybe<Game_Bool_Exp>;
};

export type Subscription_RootGame_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootGardenArgs = {
  distinct_on?: InputMaybe<Array<Garden_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Garden_Order_By>>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

export type Subscription_RootGarden_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Garden_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Garden_Order_By>>;
  where?: InputMaybe<Garden_Bool_Exp>;
};

export type Subscription_RootGarden_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootHouseArgs = {
  distinct_on?: InputMaybe<Array<House_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Order_By>>;
  where?: InputMaybe<House_Bool_Exp>;
};

export type Subscription_RootHouse_AggregateArgs = {
  distinct_on?: InputMaybe<Array<House_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Order_By>>;
  where?: InputMaybe<House_Bool_Exp>;
};

export type Subscription_RootHouse_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootHouse_Food_DemandArgs = {
  distinct_on?: InputMaybe<Array<House_Food_Demand_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Food_Demand_Order_By>>;
  where?: InputMaybe<House_Food_Demand_Bool_Exp>;
};

export type Subscription_RootHouse_Food_Demand_AggregateArgs = {
  distinct_on?: InputMaybe<Array<House_Food_Demand_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<House_Food_Demand_Order_By>>;
  where?: InputMaybe<House_Food_Demand_Bool_Exp>;
};

export type Subscription_RootHouse_Food_Demand_By_PkArgs = {
  food_kind: Scalars['String'];
  house: Scalars['uuid'];
};

export type Subscription_RootPlayerArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

export type Subscription_RootPlayer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

export type Subscription_RootPlayer_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootPlayer_FoodArgs = {
  distinct_on?: InputMaybe<Array<Player_Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Food_Order_By>>;
  where?: InputMaybe<Player_Food_Bool_Exp>;
};

export type Subscription_RootPlayer_Food_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Food_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Food_Order_By>>;
  where?: InputMaybe<Player_Food_Bool_Exp>;
};

export type Subscription_RootPlayer_Food_By_PkArgs = {
  food_kind: Scalars['String'];
  player: Scalars['uuid'];
};

export type Subscription_RootRoadArgs = {
  distinct_on?: InputMaybe<Array<Road_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Order_By>>;
  where?: InputMaybe<Road_Bool_Exp>;
};

export type Subscription_RootRoad_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Road_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Order_By>>;
  where?: InputMaybe<Road_Bool_Exp>;
};

export type Subscription_RootRoad_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_RootRoad_ConnectionArgs = {
  distinct_on?: InputMaybe<Array<Road_Connection_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Connection_Order_By>>;
  where?: InputMaybe<Road_Connection_Bool_Exp>;
};

export type Subscription_RootRoad_Connection_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Road_Connection_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Road_Connection_Order_By>>;
  where?: InputMaybe<Road_Connection_Bool_Exp>;
};

export type Subscription_RootRoad_Connection_By_PkArgs = {
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

/** columns and relationships of "user_info" */
export type User_Info = {
  __typename?: 'user_info';
  avatar_url?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
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
  count: Scalars['Int'];
  max?: Maybe<User_Info_Max_Fields>;
  min?: Maybe<User_Info_Min_Fields>;
};

/** aggregate fields of "user_info" */
export type User_Info_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Info_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user_info". All fields are combined with a logical 'AND'. */
export type User_Info_Bool_Exp = {
  _and?: InputMaybe<Array<User_Info_Bool_Exp>>;
  _not?: InputMaybe<User_Info_Bool_Exp>;
  _or?: InputMaybe<Array<User_Info_Bool_Exp>>;
  avatar_url?: InputMaybe<String_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_info" */
export enum User_Info_Constraint {
  /** unique or primary key constraint */
  UserInfoDisplayNameKey = 'user_info_display_name_key',
  /** unique or primary key constraint */
  UserPkey = 'user_pkey',
}

/** input type for inserting data into table "user_info" */
export type User_Info_Insert_Input = {
  avatar_url?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Info_Max_Fields = {
  __typename?: 'user_info_max_fields';
  avatar_url?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Info_Min_Fields = {
  __typename?: 'user_info_min_fields';
  avatar_url?: Maybe<Scalars['String']>;
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_info" */
export type User_Info_Mutation_Response = {
  __typename?: 'user_info_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Info>;
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
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
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
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
}

/** input type for updating data in table "user_info" */
export type User_Info_Set_Input = {
  avatar_url?: InputMaybe<Scalars['String']>;
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
};

/** update columns of table "user_info" */
export enum User_Info_Update_Column {
  /** column name */
  AvatarUrl = 'avatar_url',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
}

/** columns and relationships of "user_me" */
export type User_Me = {
  __typename?: 'user_me';
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
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
  count: Scalars['Int'];
  max?: Maybe<User_Me_Max_Fields>;
  min?: Maybe<User_Me_Min_Fields>;
};

/** aggregate fields of "user_me" */
export type User_Me_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Me_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user_me". All fields are combined with a logical 'AND'. */
export type User_Me_Bool_Exp = {
  _and?: InputMaybe<Array<User_Me_Bool_Exp>>;
  _not?: InputMaybe<User_Me_Bool_Exp>;
  _or?: InputMaybe<Array<User_Me_Bool_Exp>>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nickname?: InputMaybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "user_me" */
export type User_Me_Insert_Input = {
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Me_Max_Fields = {
  __typename?: 'user_me_max_fields';
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Me_Min_Fields = {
  __typename?: 'user_me_min_fields';
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
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
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nickname?: InputMaybe<Order_By>;
};

/** select columns of table "user_me" */
export enum User_Me_Select_Column {
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
}

/** input type for updating data in table "user_me" */
export type User_Me_Set_Input = {
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
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

export type SelfQueryVariables = Exact<{ [key: string]: never }>;

export type SelfQuery = {
  __typename?: 'query_root';
  user_me: Array<{
    __typename?: 'user_me';
    display_name?: string | null;
    id?: string | null;
    name?: string | null;
    nickname?: string | null;
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

export const SelfDocument = gql`
  query Self {
    user_me {
      display_name
      id
      name
      nickname
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

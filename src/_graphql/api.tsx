import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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

/** columns and relationships of "idle_test" */
export type Idle_Test = {
  __typename?: 'idle_test';
  counter: Scalars['Int'];
  id: Scalars['uuid'];
  owner_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<Users>;
};

/** Boolean expression to filter rows from the table "idle_test". All fields are combined with a logical 'AND'. */
export type Idle_Test_Bool_Exp = {
  _and?: Maybe<Array<Idle_Test_Bool_Exp>>;
  _not?: Maybe<Idle_Test_Bool_Exp>;
  _or?: Maybe<Array<Idle_Test_Bool_Exp>>;
  counter?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "idle_test". */
export type Idle_Test_Order_By = {
  counter?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
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
  /** fetch data from the table: "idle_test" */
  idle_test: Array<Idle_Test>;
  /** fetch data from the table: "idle_test" using primary key columns */
  idle_test_by_pk?: Maybe<Idle_Test>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
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


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "idle_test" */
  idle_test: Array<Idle_Test>;
  /** fetch data from the table: "idle_test" using primary key columns */
  idle_test_by_pk?: Maybe<Idle_Test>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
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


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  id: Scalars['String'];
  nickname?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  id?: Maybe<String_Comparison_Exp>;
  nickname?: Maybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  id?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname'
}

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

export type IdleGameCountersRealTimeDescSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IdleGameCountersRealTimeDescSubscription = { __typename?: 'subscription_root', idle_test: Array<{ __typename?: 'idle_test', counter: number, id: any, user?: Maybe<{ __typename?: 'users', nickname?: Maybe<string> }> }> };

export type IdleGameCountersQueryVariables = Exact<{ [key: string]: never; }>;


export type IdleGameCountersQuery = { __typename?: 'query_root', idle_test: Array<{ __typename?: 'idle_test', id: any, counter: number }> };

export type IdleGameCounterRealTimeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IdleGameCounterRealTimeSubscription = { __typename?: 'subscription_root', idle_test: Array<{ __typename?: 'idle_test', id: any, counter: number }> };


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
export type IdleGameCountersRealTimeDescComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<IdleGameCountersRealTimeDescSubscription, IdleGameCountersRealTimeDescSubscriptionVariables>, 'subscription'>;

    export const IdleGameCountersRealTimeDescComponent = (props: IdleGameCountersRealTimeDescComponentProps) => (
      <ApolloReactComponents.Subscription<IdleGameCountersRealTimeDescSubscription, IdleGameCountersRealTimeDescSubscriptionVariables> subscription={IdleGameCountersRealTimeDescDocument} {...props} />
    );
    

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
export type IdleGameCountersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<IdleGameCountersQuery, IdleGameCountersQueryVariables>, 'query'>;

    export const IdleGameCountersComponent = (props: IdleGameCountersComponentProps) => (
      <ApolloReactComponents.Query<IdleGameCountersQuery, IdleGameCountersQueryVariables> query={IdleGameCountersDocument} {...props} />
    );
    

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
export type IdleGameCounterRealTimeComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<IdleGameCounterRealTimeSubscription, IdleGameCounterRealTimeSubscriptionVariables>, 'subscription'>;

    export const IdleGameCounterRealTimeComponent = (props: IdleGameCounterRealTimeComponentProps) => (
      <ApolloReactComponents.Subscription<IdleGameCounterRealTimeSubscription, IdleGameCounterRealTimeSubscriptionVariables> subscription={IdleGameCounterRealTimeDocument} {...props} />
    );
    

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
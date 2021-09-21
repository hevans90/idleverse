import { gql } from '@apollo/client';

export const CURVATURE = gql`
  query curvature {
    curvature @client
  }
`;

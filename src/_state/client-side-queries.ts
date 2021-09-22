import { gql } from '@apollo/client';

export const CURVATURE = gql`
  query curvature {
    curvature @client
  }
`;

export const GALAXY_CONFIG = gql`
  query galaxy_config {
    galaxyConfig @client
  }
`;

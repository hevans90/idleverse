import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'http://localhost:8080/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        } as any,
      },
    },
  ],
  generates: {
    'libs/galaxy-gql/src/lib/web-api.ts': {
      documents: 'libs/galaxy-gql/src/lib/web/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'fragment-matcher',
      ],
      config: {
        withHooks: false,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        scalars: {
          _numeric: 'number[]',
          _text: 'string[]',
          _uuid: 'string[]',
          numeric: 'number',
          timestamp: 'string',
          timestamptz: 'string',
          uuid: 'string',
        },
      },
    },
    'libs/galaxy-gql/src/lib/node-api.ts': {
      documents: 'libs/galaxy-gql/src/lib/node/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node',
        'fragment-matcher',
      ],
      config: {
        skipTypename: false,
        // namingConvention: removeEnumsSuffix,
        scalars: {
          _numeric: 'number[]',
          _text: 'string[]',
          _uuid: 'string[]',
          numeric: 'number',
          timestamp: 'string',
          timestamptz: 'string',
          uuid: 'string',
        },
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;

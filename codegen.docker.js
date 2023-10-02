module.exports = {
  overwrite: true,
  schema: [
    {
      'http://localhost:8080/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'myadminsecretkey',
        },
      },
    },
  ],
  generates: {
    'libs/galaxy-gql/src/lib/galaxy-api.ts': {
      documents: 'libs/galaxy-gql/src/lib/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'fragment-matcher',
      ],
      config: {
        skipTypename: false,
        withHooks: false,
        withHOC: false,
        withComponent: false,
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

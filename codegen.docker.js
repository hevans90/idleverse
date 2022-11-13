module.exports = {
  overwrite: true,
  generates: {
    'libs/galaxy-gql/src/lib/galaxy-api.ts': {
      documents: 'libs/galaxy-gql/src/lib/**/*.graphql',
      schema: [
        {
          'http://localhost:8080/v1/graphql': {
            headers: {
              'x-hasura-admin-secret': 'myadminsecretkey',
            },
          },
        },
      ],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
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
  },
};

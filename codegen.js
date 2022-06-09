module.exports = {
  overwrite: true,
  generates: {
    'libs/galaxy-gql/src/lib/galaxy-api.ts': {
      documents: 'libs/galaxy-gql/src/lib/**/*.graphql',
      schema: [
        {
          'https://idleverse-hasura.herokuapp.com/v1/graphql': {
            headers: {
              'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET_GALAXY,
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
      },
    },
  },
};

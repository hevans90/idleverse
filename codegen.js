module.exports = {
  schema: [
    {
      'https://idleverse-hasura.herokuapp.com/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['libs/graphql/src/lib/**/*.graphql'],
  overwrite: true,
  generates: {
    'libs/graphql/src/lib/api.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

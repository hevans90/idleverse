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
    'libs/food-gql/src/lib/food-api.ts': {
      documents: 'libs/food-gql/src/lib/**/*.graphql',
      schema: [
        {
          'https://food-hasura.herokuapp.com/v1/graphql': {
            headers: {
              'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET_FOOD,
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
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

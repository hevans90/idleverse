module.exports = {
  overwrite: true,
  generates: {
    'libs/graphql/src/libs/idleverse/galaxy-api.ts': {
      documents: 'libs/graphql/src/libs/idleverse/**/*.graphql',
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
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    'libs/graphql/src/libs/food/food-api.ts': {
      documents: 'libs/graphql/src/libs/food/**/*.graphql',
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

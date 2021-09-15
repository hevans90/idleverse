module.exports = {
  schema: [
    {
      'https://superb-caiman-21.hasura.app/v1/graphql': {
        headers: {
          Authorization: 'Bearer ' + process.env.IDLE_GAME_AUTH_TOKEN,
        },
      },
    },
  ],
  documents: ['./_graphql/**/*.graphql'],
  overwrite: true,
  generates: {
    './_graphql/api.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: true,
      },
    },
    // './graphql.schema.json': {
    //   plugins: ['introspection'],
    // },
  },
};

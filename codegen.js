module.exports = {
  schema: [
    {
      'https://idleverse.herokuapp.com/v1/graphql': {
        headers: {
          Authorization: 'Bearer ' + process.env.IDLE_GAME_AUTH_TOKEN,
        },
      },
    },
  ],
  documents: ['libs/graphql/src/lib/**/*.graphql'],
  overwrite: true,
  generates: {
    'libs/graphql/src/lib/api.tsx': {
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

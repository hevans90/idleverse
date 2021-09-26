export const resolvers = {
  Mutation: {
    SendMessage: async (_, { data }, { dataSources }) => {
      const speedrun = await dataSources.userAPI.submitSpeedrun(data);
      if (speedrun) {
        return {
          success: true,
          message: 'Submitted speedrun successfully',
          speedrun,
        };
      }
      return {
        success: false,
        message: 'Failed to submit speedrun',
      };
    },
  },
};

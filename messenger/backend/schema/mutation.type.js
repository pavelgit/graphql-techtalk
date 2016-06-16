const graphql = require('graphql');

const dataService = require('./../data.service');
const userType = require('./user.type');
const userInputType = require('./input-types/user.input-type');

const mutationType = new graphql.GraphQLObjectType({
  name: 'MessengerDataMutation',
  fields: () => ({
    updateUser: {
      type: userType,
      args: {
        user: { type: userInputType }
      },
      resolve: (value, args) => dataService.updateUser(args.user)
    }
  })
});

module.exports = mutationType;
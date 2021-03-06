const graphql = require('graphql');
const dataService = require('./../data.service.js');
const userType = require('./user.type');

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, args) => dataService.getUser(args.id)
    },
    users: {
      type: new graphql.GraphQLList(userType),
      resolve: (_, args) => dataService.getAllUsers()
    }
  }
});

module.exports = queryType;
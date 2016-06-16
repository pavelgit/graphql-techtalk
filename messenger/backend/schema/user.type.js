const graphql = require('graphql');

const dataService = require('./../data.service.js');
const userAddressType = require('./user-address.type');
const userContactsType = require('./user-contacts.type');
const messageType = require('./message.type');

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'A user of our website',
  fields: () => ({
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    name: { type: graphql.GraphQLString },
    followIds: { type: new graphql.GraphQLList(graphql.GraphQLString) },
    address: { type: userAddressType },
    contacts: { type: userContactsType },
    follows: {
      type: new graphql.GraphQLList(userType),
      description: 'The users followed by the user',
      resolve: user => dataService.getManyUsers(user.followIds)
    },
    messages: {
      type: new graphql.GraphQLList(messageType),
      resolve: user => dataService.getUserMessages(user.id)
    },
    feedMessages: {
      type: new graphql.GraphQLList(messageType),
      resolve: user => dataService.getManyMessages(user.followIds)
    }
  })
});

module.exports = userType;
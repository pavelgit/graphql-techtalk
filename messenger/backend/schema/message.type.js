const graphql = require('graphql');
const dataService = require('./../data.service.js');

const messageType = new graphql.GraphQLObjectType({
  name: 'Message',
  description: 'A user of our website',
  fields: () => ({
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    date: { type: graphql.GraphQLString },
    user: {
      type: require('./user.type'),
      description: 'The author of the message',
      resolve: message => dataService.getUser(message.userId)
    },
    text: { type: graphql.GraphQLString }
  })
});

module.exports = messageType;
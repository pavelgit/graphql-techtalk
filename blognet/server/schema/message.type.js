const graphql = require('graphql');

const messageType = new graphql.GraphQLObjectType({
  name: 'Message',
  description: 'A message of a user',
  fields: {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    userId: { type: graphql.GraphQLString },
    date: { type: graphql.GraphQLString },
    text: { type: graphql.GraphQLString }
  }
});

module.exports = messageType;
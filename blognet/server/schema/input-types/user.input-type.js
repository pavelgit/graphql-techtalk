const graphql = require('graphql');
const messageInput = require('./message.input-type');

const userInputType = new graphql.GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    name: { type: graphql.GraphQLString },
    messages: {
      type: new graphql.GraphQLList(messageInput)
    }
  })
});

module.exports = userInputType;
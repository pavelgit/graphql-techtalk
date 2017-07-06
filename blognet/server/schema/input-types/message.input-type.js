const graphql = require('graphql');
const dataService = require('./../../data/data.service.js');

const messageInputType = new graphql.GraphQLInputObjectType({
  name: 'MessageInput',
  fields: () => ({
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    text: { type: graphql.GraphQLString }
  })
});

module.exports = messageInputType;
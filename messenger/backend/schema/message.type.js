const graphql = require('graphql');
const dataService = require('./../data.service.js');

const messageType = new graphql.GraphQLObjectType({
  name: 'Message',
  description: 'A user of our website',
  fields: () => ({
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    date: { type: graphql.GraphQLString },
    text: { type: graphql.GraphQLString }
  })
});

module.exports = messageType;
const graphql = require('graphql');
const userType = require('./user.type');
const messageType = require('./message.type');
const queryType = require('./query.type');
const mutationType = require('./mutation.type');

const schema = new graphql.GraphQLSchema({
  types: [ messageType, userType ],
  query: queryType,
  mutation: mutationType
});

module.exports = schema;
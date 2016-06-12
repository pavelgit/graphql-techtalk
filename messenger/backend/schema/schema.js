const graphql = require('graphql');
const userType = require('./user.type');
const messageType = require('./message.type');
const queryType = require('./query.type');

const schema = new graphql.GraphQLSchema({
  query: queryType,
  types: [ userType, messageType ]
});

module.exports = schema;
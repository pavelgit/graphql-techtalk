const graphql = require('graphql');

const userInputType = new graphql.GraphQLInputObjectType({
  name: 'UserInputType',
  fields: () => ({
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    name: { type: graphql.GraphQLString }
  })
});

module.exports = userInputType;
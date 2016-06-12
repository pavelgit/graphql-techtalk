const graphql = require('graphql');

const userAddressType = new graphql.GraphQLObjectType({
  name: 'UserAddress',
  description: 'User address',
  fields: () => ({
    street: { type: graphql.GraphQLString },
    house: { type: graphql.GraphQLString }
  })
});

module.exports = userAddressType;
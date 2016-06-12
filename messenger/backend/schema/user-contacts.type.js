const graphql = require('graphql');

const userContactsType = new graphql.GraphQLObjectType({
  name: 'UserContacts',
  description: 'User contacts',
  fields: () => ({
    phone: { type: graphql.GraphQLString },
    skype: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString }
  })
});

module.exports = userContactsType;
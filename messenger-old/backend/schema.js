const graphql = require('graphql');
const express = require('express');
const dataService = require('./data.service');

const userAddressType = new graphql.GraphQLObjectType({
  name: 'UserAddress',
  description: 'User address',
  fields: () => ({
    street: { type: graphql.GraphQLString },
    house: { type: graphql.GraphQLString }
  })
});

const userContactsType = new graphql.GraphQLObjectType({
  name: 'UserContacts',
  description: 'User contacts',
  fields: () => ({
    phone: { type: graphql.GraphQLString },
    skype: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString }
  })
});

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'A user of our website',
  fields: () => ({
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    name: { type: graphql.GraphQLString },
    follows: {
      type: new graphql.GraphQLList(userType),
      description: 'The users followed by the user'
    },
    messages: {
      type: new graphql.GraphQLList(messageType),
      description: 'The messages of the user',
      resolve: ({ user }) => dataService.getUserMessages(user.id)
    },
    address: { type: new graphql.GraphQLList(userAddressType) },
    contacts: { type: new graphql.GraphQLList(userContactsType) }
  })
});

const messageType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'A user of our website',
  fields: () => ({
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    date: { type: graphql.GraphQLString },
    user: {
      type: userType,
      description: 'The author of the message',
      resolve: message => dataService.getUser(message.userId)
    },
    text: { type: graphql.GraphQLString }
  })
});

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: (_, { id }) => dataService.getUser(id)
    }
  }
});

const schema = new graphql.GraphQLSchema({
  query: queryType,
  types: [ userType, messageType ]
});

module.exports = schema;
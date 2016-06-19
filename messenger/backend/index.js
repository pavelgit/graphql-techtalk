const graphqlHTTP = require('express-graphql');
const express = require('express');
const schema = require('./schema/schema');
const cors = require('cors');

express()
  .use(cors({
    origin: 'http://localhost:8000',
    credentials: true
  }))
  .use('/graphql', graphqlHTTP({ schema, pretty: true, graphiql: true }))
  .listen(5000);

console.log('GraphQL server running on http://localhost:5000/graphql');
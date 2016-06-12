const graphqlHTTP = require('express-graphql');
const express = require('express');
const schema = require('./schema/schema');

express()
    .use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    })
    .use('/graphql', graphqlHTTP({ schema, pretty: true }))
    .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
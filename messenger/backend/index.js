const graphqlHTTP = require('express-graphql');
const express = require('express');
const schema = require('./schema/schema');

express()
    .use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Connection,Access-Control-Request-Method,Origin,User-Agent,Access-Control-Request-Headers,Accept,Referer,Accept-Encoding,Accept-Language');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    })
    .use('/graphql', graphqlHTTP({ schema, pretty: true, graphiql: true }))
    .listen(5001);

console.log('GraphQL server running on http://localhost:5001/graphql');
const express = require('express');
const schema = require('./schema');

express()
    .use('/graphql', graphqlHTTP({ schema, pretty: true }))
    .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
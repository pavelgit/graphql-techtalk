const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const cors = require('koa-cors');
const graphqlHTTP = require('koa-graphql');
const schema = require('./schema/schema');
const port = 3001;

const koa = new Koa();

koa.use(cors());

koa.use(bodyParser());

koa.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})));

koa.listen(port, (err) => {
  if (err) throw err;
  console.info(`Ready on http://localhost:${port}`);
});
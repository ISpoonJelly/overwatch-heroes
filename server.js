const express = require('express');
const graphqlHTTP = require('express-graphql');

const { initDb } = require('./db/pgClient');
const schema = require('./graphQL/schema');

const app = express();

initDb();

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'dev';

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: ENVIRONMENT === 'dev',
  }),
);


app.listen(PORT, () => {
  console.log(`App listetning on port ${PORT}`);
});

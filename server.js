const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const path = require('path');

const { initDb } = require('./db/pgClient');
const schema = require('./graphQL/schema');

const app = express();

initDb();

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV || 'dev';

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: ENVIRONMENT === 'dev',
  }),
);

app.use(express.static('public'));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App listetning on port ${PORT}`);
});

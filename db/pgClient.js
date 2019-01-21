const { Client } = require('pg');

const config = require('../config');
const { bootStrapDB } = require('./dataBootstrap');
const {
  CREATECLASSENUMQUERY,
  CREATEHEROTABLEQUERY,
  CREATERELATIONSHIPSTABLEQUERY,
  SELECTANYHEROQUERY,
} = require('./queries');

async function initDb() {
  await pgClient.query(CREATECLASSENUMQUERY);
  await pgClient.query(CREATEHEROTABLEQUERY);
  await pgClient.query(CREATERELATIONSHIPSTABLEQUERY);

  const heroesFound = await pgClient.query(SELECTANYHEROQUERY);

  if (heroesFound.rowCount < 1) {
    // Only run the bootstrap once if the DB is empty.
    bootStrapDB(pgClient);
  }
}

const pgClient = new Client({
  user: config.db.user,
  password: config.db.password,
  database: config.db.database || config.db.user,
});

pgClient.connect();

module.exports = { pgClient, initDb };

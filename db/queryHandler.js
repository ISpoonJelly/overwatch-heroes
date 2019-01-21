const { pgClient } = require('./pgClient');
const { SELECTHEROQUERY, SELECTHERORELATIONSHIPQUERY } = require('./queries');

async function getHero(id) {
  const response = await pgClient.query(SELECTHEROQUERY, [id]);

  return response.rows;
}

async function getRelationShips(id) {
  const response = await pgClient.query(SELECTHERORELATIONSHIPQUERY, [id]);
  const relationships = response.rows;

  return relationships.map(relationship => {
    return {
      title: relationship.title,
      description: relationship.description,
      // A XOR B XOR A === B;
      // so by XORing the input id with both id's, we get the different one.
      otherHero: relationship.first_hero_id ^ relationship.second_hero_id ^ id,
    };
  });
}

module.exports = {
  getHero,
  getRelationShips,
};

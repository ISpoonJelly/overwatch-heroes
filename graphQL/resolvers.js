const { getHero, getRelationShips } = require('../db/queryHandler');

async function resolveHero(_, { heroId }) {
  const heroes = await getHero(heroId);
  return heroes[0];
}

async function resolveRelationShip({ hero_id }) {
  return await getRelationShips(hero_id);
}

module.exports = {
  resolveHero,
  resolveRelationShip,
};

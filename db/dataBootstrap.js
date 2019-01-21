const axios = require('axios');

const config = require('../config');
const { INSERTHEROQUERY, INSERTRELATIONSHIPQUERY } = require('./queries');

const { mapNameToClass } = require('../overwatch/classes');
const { heroRelationShips } = require('../overwatch/relationships');

async function loadDataFromS3() {
  const response = await axios.get(config.overwatch.s3_data_file);
  return response.data.data;
}

function heroDataMapper(heroData) {
  const { name, slug, image_portrait, image_splash, image_card_background } = heroData.attributes;
  return {
    hero_id: heroData.id,
    name,
    slug,
    class: mapNameToClass(slug),
    image_portrait,
    image_splash,
    image_card_background,
  };
}

async function insertHeroesIntoDB(pgClient, heroData) {
  heroData.forEach(hero => {
    pgClient.query(INSERTHEROQUERY, Object.values(hero));
  });
}

async function insertRelationshipsIntoDB(pgClient, heroData, heroRelationShips) {
  heroRelationShips
    .map(relationship => {
      const foundFirst = heroData.find(hero => hero.slug === relationship.first_hero);
      const first_hero_id = foundFirst? foundFirst.hero_id: '';

      const foundSecond = heroData.find(hero => hero.slug === relationship.second_hero);
      const second_hero_id = foundSecond? foundSecond.hero_id: '';

      return {
        first_hero_id,
        second_hero_id,
        title: relationship.title,
        description: relationship.description,
      };
    })
    .forEach(relationship => {
      if(!relationship.first_hero_id || !relationship.second_hero_id) return;

      pgClient.query(INSERTRELATIONSHIPQUERY, [
        relationship.first_hero_id,
        relationship.second_hero_id,
        relationship.title,
        relationship.description,
      ]);
    });
}

async function bootStrapDB(pgClient) {
  const heroData = await loadDataFromS3();
  const mappedData = heroData.map(heroDataMapper);
  await insertHeroesIntoDB(pgClient, mappedData);
  await insertRelationshipsIntoDB(pgClient, mappedData, heroRelationShips);

  console.log('[DB-BOOTSTRAP] Successfully populated hero data into DB!');
}

module.exports = { bootStrapDB };

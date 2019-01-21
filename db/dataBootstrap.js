const axios = require('axios');

const config = require('../config');
const { INSERTHEROQUERY, INSERTRELATIONSHIPQUERY } = require('./queries');

const { mapNameToClass } = require('../overwatch/classes');
const { heroRelationShips } = require('../overwatch/relationships');

async function loadDataFromS3() {
  const response = await axios.get(config.overwatch.s3_data_file);
  return response.data.data;
}

async function insertHeroesIntoDB(pgClient, heroData) {
  // TODO: enhance by doing bulk insertions instead of querying inside a loop
  heroData.forEach(hero => {
    const {
      hero_id,
      name,
      slug,
      hero_class,
      image_portrait,
      image_splash,
      image_card_background,
    } = hero;

    pgClient.query(INSERTHEROQUERY, [
      hero_id,
      name,
      slug,
      hero_class,
      image_portrait,
      image_splash,
      image_card_background,
    ]);
  });
}

async function insertRelationshipsIntoDB(pgClient, heroData, heroRelationShips) {
  // TODO: enhance by doing bulk insertions instead of querying inside a loop
  heroRelationShips.forEach(relationship => {
    const { first_hero, second_hero, title, description } = relationship;
    const foundFirst = heroData.find(hero => hero.slug === first_hero);
    const foundSecond = heroData.find(hero => hero.slug === second_hero);

    if (!foundFirst || !foundSecond) return;

    pgClient.query(INSERTRELATIONSHIPQUERY, [
      foundFirst.hero_id,
      foundSecond.hero_id,
      title,
      description,
    ]);
  });
}

function heroDataMapper(heroData) {
  const attributes = heroData.attributes;
  return {
    hero_id: heroData.id,
    hero_class: mapNameToClass(attributes.slug),
    ...attributes,
  };
}

async function bootStrapDB(pgClient) {
  const heroData = await loadDataFromS3();
  const mappedData = heroData.map(heroDataMapper);
  await insertHeroesIntoDB(pgClient, mappedData);
  await insertRelationshipsIntoDB(pgClient, mappedData, heroRelationShips);

  console.log('[DB-BOOTSTRAP] Successfully populated hero data into DB!');
}

module.exports = { bootStrapDB };

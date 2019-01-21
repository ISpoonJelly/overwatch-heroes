const CREATECLASSENUMQUERY = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hero_class') THEN
    CREATE TYPE hero_class as enum('TANK', 'DAMAGE', 'SUPPORT');
  END IF;
END$$
;`;

const CREATEHEROTABLEQUERY = `
CREATE TABLE IF NOT EXISTS heroes(
  hero_id                 integer UNIQUE NOT NULL,
  name                    varchar(255) NOT NULL,
  slug                    varchar(255) NOT NULL,
  class                   hero_class NOT NULL,
  image_portrait          TEXT,
  image_splash            TEXT,
  image_card_background   TEXT
)
;`;

const CREATERELATIONSHIPSTABLEQUERY = `
CREATE TABLE IF NOT EXISTS hero_relationships(
  first_hero_id     integer REFERENCES heroes(hero_id) NOT NULL,
  second_hero_id    integer REFERENCES heroes(hero_id) NOT NULL,
  title             varchar(255) NOT NULL,
  description       TEXT
);`;

const INSERTHEROQUERY = `
INSERT INTO heroes(
  hero_id,
  name,
  slug,
  class,
  image_portrait,
  image_splash,
  image_card_background
) VALUES (
  $1, $2, $3, $4, $5, $6, $7
);`;

const INSERTRELATIONSHIPQUERY = `
INSERT INTO hero_relationships(
  first_hero_id,
  second_hero_id,
  title,
  description
) VALUES(
  $1, $2, $3, $4
);`;

const SELECTANYHEROQUERY = `SELECT 1 FROM heroes LIMIT 1;`;

const SELECTHEROQUERY = `
SELECT *
FROM heroes
WHERE hero_id = $1
;`;

const SELECTHEROLISTQUERY = `
SELECT *
FROM heroes
WHERE hero_id >= $1 AND hero_id <= $2
;`

const SELECTHERORELATIONSHIPQUERY = `
SELECT *
FROM hero_relationships
WHERE first_hero_id = $1 OR second_hero_id = $1
;`;

module.exports = {
  CREATECLASSENUMQUERY,
  CREATEHEROTABLEQUERY,
  CREATERELATIONSHIPSTABLEQUERY,
  INSERTHEROQUERY,
  INSERTRELATIONSHIPQUERY,
  SELECTANYHEROQUERY,
  SELECTHEROQUERY,
  SELECTHEROLISTQUERY,
  SELECTHERORELATIONSHIPQUERY,
};

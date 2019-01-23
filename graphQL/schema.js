const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const { getHero, getHeroList, getRelationShips } = require('../db/queryHandler');

// Hero Class Type
const HeroClassType = new GraphQLEnumType({
  name: 'Class',
  values: {
    TANK: { value: 'TANK' },
    DAMAGE: { value: 'DAMAGE' },
    SUPPORT: { value: 'SUPPORT' },
  },
});

// Hero Relationship Type
const HeroRelationshipType = new GraphQLObjectType({
  name: 'HeroRelationship',
  description: 'Relationship between two Overwatch heroes',
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    otherHero: {
      type: HeroType,
      resolve: async ({ otherHero }) => await getHero(otherHero),
    },
  }),
});

// Hero Type
const HeroType = new GraphQLObjectType({
  name: 'Hero',
  description: 'An Overwatch Hero',
  fields: () => ({
    name: { type: GraphQLString },
    heroClass: {
      type: HeroClassType,
      resolve: root => root.hero_class,
    },
    heroId: {
      type: GraphQLString,
      resolve: root => root.hero_id,
    },
    imagePortrait: {
      type: GraphQLString,
      resolve: root => root.image_portrait,
    },
    imageSplash: {
      type: GraphQLString,
      resolve: root => root.image_splash,
    },
    imageBackground: {
      type: GraphQLString,
      resolve: root => root.image_card_background,
    },
    relationships: {
      type: new GraphQLList(HeroRelationshipType),
      resolve: async ({ hero_id }) => await getRelationShips(hero_id),
    },
  }),
});

const HeroListResponseType = new GraphQLObjectType({
  name: 'HeroListResponse',
  description: 'List of hero data and cursor information',
  fields: () => ({
    heroes: {
      type: new GraphQLList(HeroType),
    },
    cursor: {
      type: GraphQLInt,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hero: {
      type: HeroType,
      args: {
        heroId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (_, { heroId }) => await getHero(heroId),
    },
    heroList: {
      type: HeroListResponseType,
      args: {
        cursor: { type: GraphQLInt },
        count: { type: GraphQLInt },
      },
      resolve: async (_, { cursor = 1, count = 7 }) => {
        const heroList = await getHeroList(cursor, count);
        return {
          cursor: cursor + count,
          heroes: heroList,
        };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

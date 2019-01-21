const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');

const { resolveHero, resolveRelationShip } = require('./resolvers');

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
      resolve: async root => await resolveHero(undefined, { heroId: root.otherHero }),
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
      resolve: root => root.class,
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
    imageBackgroud: {
      type: GraphQLString,
      resolve: root => root.image_backgroud,
    },
    relationships: {
      type: new GraphQLList(HeroRelationshipType),
      resolve: resolveRelationShip,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hero: {
      type: HeroType,
      args: {
        heroId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: resolveHero,
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

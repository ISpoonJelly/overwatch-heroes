module.exports = {
  db: {
    uri: process.env.DATABASE_URL || 'postgres://overwatch:overwatch@localhost:5432/overwatch',
  },
  overwatch: {
    s3_data_file: 'https://s3.eu-central-1.amazonaws.com/dojomadness.com/code-challenge/heros',
  },
};
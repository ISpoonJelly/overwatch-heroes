import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import HeroItem from './HeroItem';

const HEROES_QUERY = gql`
  query HeroesQuery {
    heroList(from: 1) {
      heroId
      name
      heroClass
      imagePortrait
      imageBackground
    }
  }
`;

class Heroes extends Component {
  render() {
    return (
      <div className='container'>
        <Query query={HEROES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) return console.log(error);

            return (
              <Fragment>
                {data.heroList.map(hero => {
                  return <HeroItem key={hero.heroId} hero={hero} />;
                })}
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Heroes;

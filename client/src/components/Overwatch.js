import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import HeroList from './HeroList';

const HEROES_QUERY = gql`
  query HeroesQuery($cursor: Int) {
    heroList(cursor: $cursor) {
      cursor
      heroes {
        heroId
        name
        heroClass
        imagePortrait
        imageBackground
      }
    }
  }
`;

class Overwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroFilter: '',
    };
  }

  filterList(event) {
    this.setState({
      heroFilter: event.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="input-group" style={{ marginBottom: '2%', marginLeft: '35%' }}>
          <div className="input-group-prepend">
            <span className="input-group-text">Filter</span>
          </div>
          <input
            id="heroFilterInput"
            name="hero"
            type="text"
            placeholder="Hero name..."
            onChange={this.filterList.bind(this)}
          />
        </div>

        <Query query={HEROES_QUERY}>
          {({ loading, error, fetchMore, data: { heroList } }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) return console.log(error);

            return (
              <HeroList
                heroList={heroList || []}
                heroFilter={this.state.heroFilter}
                onLoadMore={() => {
                  return fetchMore({
                    query: HEROES_QUERY,
                    variables: { cursor: heroList.cursor },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const previousEntry = previousResult.heroList;
                      const newHeroes = fetchMoreResult.heroList.heroes;
                      const newCursor = fetchMoreResult.heroList.cursor;

                      return {
                        heroList: {
                          cursor: newCursor,
                          heroes: [...previousEntry.heroes, ...newHeroes],
                          __typename: previousEntry.__typename,
                        },
                      };
                    },
                  });
                }}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Overwatch;

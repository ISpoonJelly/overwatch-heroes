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
  componentDidMount() {
    const ctx = this;

    document.getElementById('heroFilterInput').oninput = function(event) {
      const filterVal = event.target.value;
      ctx.setState({
        heroFilter: filterVal,
      });
    };
  }

  componentWillUnmount() {
    document.getElementById('heroFilterInput').oninput = undefined;
  }

  render() {
    return (
      <div className="container">
        <input
          id="heroFilterInput"
          type="text"
          name="name"
          style={{ display: 'block', margin: 'auto', width: 'auto', marginBottom: 25 }}
        />
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

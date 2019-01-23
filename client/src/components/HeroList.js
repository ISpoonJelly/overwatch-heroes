import React, { Component } from 'react';

import HeroItem from './HeroItem';

class HeroList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingMore: false,
      hasMore: true,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  isBottom(element) {
    const scrollBuffer = 350;
    return element.getBoundingClientRect().bottom <= window.innerHeight + scrollBuffer;
  }

  async fetchMoreHeroes() {
    this.setState({ fetchingMore: true });
    const loaded = await this.props.onLoadMore();

    return loaded.data.heroList;
  }

  trackScrolling = async () => {
    const listFooterItem = document.getElementById('listFooter');
    if (this.isBottom(listFooterItem)) {
      const { fetchingMore, hasMore } = this.state;
      if (fetchingMore || !hasMore) return;

      const newHeroes = await this.fetchMoreHeroes();

      if (!newHeroes.heroes || newHeroes.heroes.length === 0) {
        this.setState({
          hasMore: false,
          fetchingMore: false,
        });

        document.removeEventListener('scroll', this.trackScrolling);
        return;
      }

      this.setState({
        fetchingMore: false,
      });
    }
  };

  render() {
    const { heroList, heroFilter } = this.props;
    return (
      <div className="container">
        {heroList.heroes
          .filter(hero => {
            return hero.name
              .trim()
              .toLowerCase()
              .includes(heroFilter.trim().toLowerCase());
          })
          .map(hero => {
            return <HeroItem key={hero.heroId} hero={hero} />;
          })}
        <div id="listFooter" />
      </div>
    );
  }
}

export default HeroList;

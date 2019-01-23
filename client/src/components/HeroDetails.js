import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import HeroRelationships from './HeroRelationships';
import RoleItem from './RoleItem';

import { CenterText, BackgroundStyle } from '../styling/app';
import { BackGroundImage } from '../styling/heroDetails';

const HERO_QUERY = gql`
  query heroQuery($heroId: Int!) {
    hero(heroId: $heroId) {
      name
      heroClass
      imagePortrait
      imageSplash
      imageBackground
      relationships {
        title
        description
        otherHero {
          heroId
          name
          imagePortrait
        }
      }
    }
  }
`;

export class HeroDetails extends Component {
  render() {
    let { heroId } = this.props.match.params;
    heroId = parseInt(heroId);
    return (
      <Fragment>
        <Query query={HERO_QUERY} variables={{ heroId }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            const heroData = data.hero;
            return (
              <div
                className="card card-body mb-10"
                style={{ ...BackGroundImage, ...BackgroundStyle(heroData.imageBackground) }}
              >
                <div className="row">
                  <div className="col-md-3">
                    <h3 style={CenterText}>{heroData.name}</h3>
                    <img src={heroData.imagePortrait} alt="heroPortrait" />
                  </div>
                  <div className="col-md-8" />
                </div>
                <div className="row">
                  <div className="col-md-2">
                    <RoleItem heroClass={heroData.heroClass} />
                  </div>
                  <div className="col-md-4" />
                  <div className="col-md-6">
                    <HeroRelationships relationships={heroData.relationships} />
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default HeroDetails;

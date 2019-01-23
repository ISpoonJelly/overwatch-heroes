import React from 'react';
import { Link } from 'react-router-dom';

import { CenterText, BackgroundTransparent } from '../styling/app';

export default function HeroRelationships({ relationships }) {
  return relationships.length ? (
    <div className="card card-body mb-10" style={BackgroundTransparent}>
      <div className="row">
        {relationships.map(relationship => {
          return (
            <div key={relationship.otherHero.heroId} className="col-md">
              <h3 style={CenterText}>{relationship.title}</h3>
              <Link to={`/hero/${relationship.otherHero.heroId}`}>
                <img src={relationship.otherHero.imagePortrait} alt="heroPortrait" />
              </Link>
              <p>{relationship.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}

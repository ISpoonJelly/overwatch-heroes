import React from 'react';

import { Link } from 'react-router-dom';

import RoleItem from './RoleItem';

const backgroundStyle = image => {
  return {
    width: '100%',
    backgroundImage: `url(${image})`,
  };
};

export default function HeroItem({
  hero: { heroId, name, heroClass, imagePortrait, imageBackground },
}) {
  return (
    <div className="card card-body mb-10" style={backgroundStyle(imageBackground)}>
      <div className="row">
        <div className="col-md-3 ">
          <h3 style={{ textAlign: 'center' }}>{name}</h3>
          <img
            src={imagePortrait}
            alt="heroPortrait"
            style={{ display: 'block', margin: 'auto', width: 'auto' }}
          />
          <div className="row">
            <Link
              to={`/hero/${heroId}`}
              className="btn btn-secondary"
              style={{ display: 'block', margin: 'auto', width: 'auto', minWidth: 150 }}
            >
              Details
            </Link>
          </div>
        </div>

        <div className="col-md-7" />

        <RoleItem heroClass={heroClass} />
      </div>
    </div>
  );
}

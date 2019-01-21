import React from 'react';

import { Link } from 'react-router-dom';

import RoleItem from './RoleItem';

const sectionStyle = image => {
  return {
    width: '100%',
    backgroundImage: `url(${image})`,
  };
};

export default function HeroItem({
  hero: { heroId, name, heroClass, imagePortrait, imageBackgroud },
}) {
  return (
    <div className="card card-body mb-10" style={sectionStyle(imageBackgroud)}>
      <div className="row">
        <div className="col-md-2">
          <h3 style={{ 'text-align': 'center' }}>{name}</h3>
          <img src={imagePortrait} />
        </div>

        <div className="col-md-8">
        <Link to={`/hero/${heroId}`} className="btn btn-secondary">Details</Link>
        </div>

        <RoleItem heroClass={heroClass} />
      </div>
    </div>
  );
}

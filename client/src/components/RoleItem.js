import React from 'react';

import DamageIcon from '../assets/damageIcon.png';
import SupportIcon from '../assets/supportIcon.png';
import TankIcon from '../assets/tankIcon.png';
import Logo from '../assets/Logo.png';

import { CenterText, CenterDiv } from '../styling/app';

export default function RoleItem({ heroClass }) {
  let icon;

  switch (heroClass) {
    case 'DAMAGE':
      icon = DamageIcon;
      break;
    case 'TANK':
      icon = TankIcon;
      break;
    case 'SUPPORT':
      icon = SupportIcon;
      break;
    default:
      icon = Logo;
      break;
  }

  return (
    <div style={CenterDiv}>
      <img src={icon} alt="roleIcon" />
      <h4 style={CenterText}>{heroClass}</h4>
    </div>
  );
}

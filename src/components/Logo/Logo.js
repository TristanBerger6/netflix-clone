import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './Logo.scss';

function Logo({ state }) {
  if (state === 'clickable') {
    return (
      <Link to={ROUTES.HOME}>
        <img className="nf-logo" src="./nf-logo.svg" alt="Logo netflix" />
      </Link>
    );
  } else {
    return <img className="nf-logo" src="./nf-logo.svg" alt="Logo netflix" />;
  }
}

export default Logo;

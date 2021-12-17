import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './Logo.scss';

function Logo({ state, route }) {
  if (state === 'clickable' && route === 'home') {
    return (
      <Link to={ROUTES.HOME}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          className="nf-logo"
          src="/nf-logo.svg"
          alt="Logo netflix"
        />
      </Link>
    );
  } else if (state === 'clickable' && route === 'browse') {
    return (
      <Link to={ROUTES.BROWSE}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          className="nf-logo"
          src="/nf-logo.svg"
          alt="Logo netflix"
        />
      </Link>
    );
  } else {
    return <img className="nf-logo" src="/nf-logo.svg" alt="Logo netflix" />;
  }
}

export default Logo;

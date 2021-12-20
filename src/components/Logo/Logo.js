import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import * as ROUTES from '../../constants/routes';
import './Logo.scss';

function Logo({ state, route }) {
  // ----   media query ---------------------//
  const isDesktop = useMediaQuery({
    query: '(min-width: 576px)',
  });

  if (state === 'clickable' && route === 'home') {
    return (
      <Link to={ROUTES.HOME} onClick={() => window.scrollTo(0, 0)}>
        <img
          className="nf-logo"
          src={isDesktop ? '/nf-logo.svg' : '/images/nf-logo-mobile.png'}
          alt="Logo netflix"
        />
      </Link>
    );
  } else if (state === 'clickable' && route === 'browse') {
    return (
      <Link to={ROUTES.BROWSE} onClick={() => window.scrollTo(0, 0)}>
        <img
          className="nf-logo"
          src={isDesktop ? '/nf-logo.svg' : '/images/nf-logo-mobile.png'}
          alt="Logo netflix"
        />
      </Link>
    );
  } else {
    return (
      <img
        className="nf-logo"
        src={isDesktop ? '/nf-logo.svg' : '/images/nf-logo-mobile.png'}
        alt="Logo netflix"
      />
    );
  }
}

export default Logo;

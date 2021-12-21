import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import * as ROUTES from '../../constants/routes';

function Logo({ state, route }) {
  const isDesktop = useMediaQuery({
    query: '(min-width: 576px)',
  });

  if (state === 'clickable' && route === 'home') {
    return (
      <Link
        to={process.env.PUBLIC_URL + ROUTES.HOME}
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          className="nf-logo"
          src={
            isDesktop
              ? process.env.PUBLIC_URL + '/nf-logo.svg'
              : process.env.PUBLIC_URL + '/images/nf-logo-mobile.png'
          }
          alt="Logo netflix"
        />
      </Link>
    );
  } else if (state === 'clickable' && route === 'browse') {
    return (
      <Link
        to={process.env.PUBLIC_URL + ROUTES.BROWSE}
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          className="nf-logo"
          src={
            isDesktop
              ? process.env.PUBLIC_URL + '/nf-logo.svg'
              : process.env.PUBLIC_URL + '/images/nf-logo-mobile.png'
          }
          alt="Logo netflix"
        />
      </Link>
    );
  } else {
    return (
      <img
        className="nf-logo"
        src={
          isDesktop
            ? process.env.PUBLIC_URL + '/nf-logo.svg'
            : process.env.PUBLIC_URL + '/images/nf-logo-mobile.png'
        }
        alt="Logo netflix"
      />
    );
  }
}

Logo.propTypes = {
  state: PropTypes.string,
  route: PropTypes.string,
};

export default Logo;

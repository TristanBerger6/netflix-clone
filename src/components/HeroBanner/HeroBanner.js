import React from 'react';
import PropTypes from 'prop-types';
import './HeroBanner.scss';

function HeroBanner({ children, bg }) {
  return (
    <div className="hero">
      <div
        className={'hero__bg ' + bg}
        aria-hidden="true"
        style={{
          background: `url('/images/${bg}.jpg') no-repeat`,
          backgroundSize: 'cover',
        }}
      ></div>
      {children}
    </div>
  );
}

HeroBanner.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.node,
};

export default HeroBanner;

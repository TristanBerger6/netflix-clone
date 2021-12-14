import React from 'react';
import './HeroBanner.scss';

function HeroBanner({ children, bg }) {
  return (
    <div className="hero">
      <div className={'hero__bg ' + bg} aria-hidden="true"></div>
      {children}
    </div>
  );
}

export default HeroBanner;

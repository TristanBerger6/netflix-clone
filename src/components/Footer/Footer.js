import React from 'react';
import './Footer.scss';
import PropTypes from 'prop-types';

function Footer({ children, bg }) {
  const divStyle = { background: bg };

  return (
    <footer className="footer-container grey-top" style={divStyle}>
      <div className="footer text-grey-light fs-400">{children}</div>
    </footer>
  );
}

Footer.Grid = function FooterGrid({ gridItems }) {
  return (
    <ul className="footer__links grid">
      {gridItems.map((item, index) => (
        <li key={index}>
          <a href="/" className="link">
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
};

Footer.Title = function FooterTitle({ children }) {
  return <p className="footer__title fs-500">{children}</p>;
};

Footer.propTypes = {
  children: PropTypes.node,
  bg: PropTypes.string,
};
Footer.Title.propTypes = {
  children: PropTypes.node,
};
Footer.Grid.propTypes = {
  children: PropTypes.array,
};
export default Footer;

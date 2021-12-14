import React from 'react';
import './Footer.scss';

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
export default Footer;

import React from 'react';
import './Header.scss';

function Header({ children, bg }) {
  return <header className={bg}>{children}</header>;
}

export default Header;

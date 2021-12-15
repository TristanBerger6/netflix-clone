import React from 'react';
import './Header.scss';

function Header({ children, bg }) {
  return <header className={bg}>{children}</header>;
}

Header.Input = function HeaderInput({ searchTerm, setSearchTerm }) {
  return <input placeholder="rechercher" type="text"></input>;
};

export default Header;

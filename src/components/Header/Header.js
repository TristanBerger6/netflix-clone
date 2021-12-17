import React from 'react';
import { useEffect, useState, useRef } from 'react/cjs/react.development';
import { Link, useSearchParams } from 'react-router-dom';
import './Header.scss';
import GENRES from '../../constants/genres.json';

function Header({ children, bg }) {
  return <header className={bg}>{children}</header>;
}

Header.BrowseSearch = function HeaderBrowseSearch({ onChange }) {
  let [searchParams, setSearchParams] = useSearchParams('');
  const inputRef = useRef(null);
  const [open, setOpen] = useState('');

  useEffect(() => inputRef.current && open && inputRef.current.focus());

  const handleBlur = () => {
    setOpen('');
    setSearchParams('');
  };

  return (
    <div className={`header-browse-search flex ${open}`}>
      <img
        className="header-browse-search__btn"
        onClick={() => (open === 'open' ? setOpen('') : setOpen('open'))}
        src="/images/search.png"
        alt="search icon"
        role="button"
      />

      <input
        className={`header-browse-search__input ${open}`}
        value={
          searchParams.get('filter') !== null ? searchParams.get('filter') : ''
        }
        onChange={onChange}
        ref={inputRef}
        onBlur={handleBlur}
        onFocus={() => setOpen('open')}
      ></input>
    </div>
  );
};

Header.BrowseNav = function HeaderBrowseNav() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [classOpen, setClassOpen] = useState('');

  const handleClick = () => {
    open ? setOpen(false) : setOpen(true);
  };
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setClassOpen('open');
      }, 1);
    } else {
      setClassOpen('');
    }
  }, [open]);

  return (
    <div className="header-browse-nav">
      <button
        className="header-browse-nav__btn text-white flex"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={handleClick}
        onBlur={() => (hover ? null : setOpen(false))}
      >
        Genres
        <img src="/images/chevron-right.png" alt="chevron"></img>
      </button>
      {open && (
        <ul className={`header-browse-nav__list flex ${classOpen}`}>
          {GENRES.map((item, index) => (
            <li key={index}>
              <Link
                to={`./${item.name}`}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Header.BrowseOut = function HeaderBrowseOut({ onClick }) {
  return (
    <button className="header-browse-out" onClick={onClick}>
      Log Out
    </button>
  );
};

export default Header;

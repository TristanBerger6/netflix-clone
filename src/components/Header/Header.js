import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';
import './Header.scss';
import GENRES from '../../constants/genres.json';

function Header({ children, bg }) {
  return <header className={`${bg} header-desktop`}>{children}</header>;
}

Header.BrowseSearch = function HeaderBrowseSearch({ onChange }) {
  let [searchParams, setSearchParams] = useSearchParams('');
  const inputRef = useRef(null);
  const [open, setOpen] = useState('');
  const [searchActive, setSearchActive] = useState(true);
  const [closeActive, setCloseActive] = useState(false);

  useEffect(() => inputRef.current && open && inputRef.current.focus());

  const handleBlur = () => {
    if (!closeActive) {
      setOpen('');
      setSearchParams('');
      setTimeout(() => setSearchActive(true), 500);
    }
  };
  const handleClickSearch = () => {
    if (searchActive) {
      setOpen('open');
      setSearchActive(false);
    }
  };
  const handleClickClose = () => {
    if (closeActive) {
      setOpen('');
      setCloseActive(false);
      setSearchParams('');
      setTimeout(() => setSearchActive(true), 500);
    }
  };
  useEffect(() => {
    if (searchParams.get('filter') !== null) {
      setCloseActive(true);
    } else {
      setCloseActive(false);
    }
  }, [searchParams]);

  return (
    <div className={`header-browse-search flex ${open}`}>
      <img
        className="header-browse-search__btn"
        onClick={handleClickSearch}
        onKeyDown={(e) => (e.keyCode === 13 ? handleClickSearch() : null)}
        src={process.env.PUBLIC_URL + '/images/search.png'}
        alt="search icon"
        role="button"
        tabIndex="0"
      />
      <label htmlFor="search-input" className="sr-only">
        Rechercher un film
      </label>
      <input
        id="search-input"
        className={`header-browse-search__input ${open}`}
        value={
          searchParams.get('filter') !== null ? searchParams.get('filter') : ''
        }
        onChange={onChange}
        ref={inputRef}
        onBlur={handleBlur}
        tabIndex={open ? '0' : '-1'}
      ></input>
      <img
        className={`header-browse-search__close ${closeActive ? 'active' : ''}`}
        onClick={handleClickClose}
        onKeyDown={(e) => (e.keyCode === 13 ? handleClickClose() : null)}
        src={process.env.PUBLIC_URL + '/images/close-slim.png'}
        alt="close icon"
        role="button"
        tabIndex="0"
      />
    </div>
  );
};

Header.BrowseNav = function HeaderBrowseNav() {
  const [open, setOpen] = useState(false); // list opened or closed
  const [hover, setHover] = useState(false); // hover on links, maintain list open
  const [classOpen, setClassOpen] = useState(''); // class open or close

  const [tabFocus, setTabFocus] = useState(0);
  const [needFocus, setNeedFocus] = useState(false); // focus the link one time after arrow keydown

  const callbackRef = (node) => {
    if (node) {
      if (needFocus) {
        node.focus();
        setNeedFocus(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 9) {
      setTabFocus(0);
      setOpen(false);
      setHover(false);
    }
    if (e.keyCode === 39 || e.keyCode === 37) {
      if (e.keyCode === 39) {
        if (tabFocus >= GENRES.length - 1) {
          setTabFocus(0);
        } else {
          setTabFocus(tabFocus + 1);
        }
      }
      if (e.keyCode === 37) {
        if (tabFocus <= 0) {
          setTabFocus(GENRES.length - 1);
        } else {
          setTabFocus(tabFocus - 1);
        }
      }
      setNeedFocus(true);
    }
  };
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
        onClick={handleClick}
        onKeyDown={(e) => (e.keyCode === 9 ? setHover(true) : null)}
        onBlur={() => (hover ? null : setOpen(false))}
      >
        Genres
        <img
          src={process.env.PUBLIC_URL + '/images/chevron-right.png'}
          alt="chevron"
        />
      </button>
      {open && (
        <ul
          id="gender-list"
          role="tablist"
          className={`header-browse-nav__list flex ${classOpen}`}
        >
          {GENRES.map((item, index) => (
            <li key={index}>
              <Link
                to={`./${item.name}`}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onKeyDown={handleKeyDown}
                tabIndex={index === tabFocus ? '0' : '-1'}
                ref={index === tabFocus ? callbackRef : null}
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

Header.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.node,
};
Header.BrowseSearch.propTypes = {
  onChange: PropTypes.func,
};
Header.BrowseOut.propTypes = {
  onClick: PropTypes.func,
};

export default Header;

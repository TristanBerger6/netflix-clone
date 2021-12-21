import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MovieCard.scss';

function MovieCard({
  item,
  index,
  onMouseEnter,
  onMouseLeave,
  onClick,
  style,
  tabIndex,
  focusFirst,
  currentlyDisplayed,
  needFocus,
}) {
  const ref = useRef();
  useEffect(() => {
    if (focusFirst) {
      ref.current.focus();
    }
  }, [focusFirst]);

  useEffect(() => {
    if (currentlyDisplayed === item && needFocus) {
      ref.current.focus();
    }
  }, [needFocus]);

  return (
    <a
      href="/"
      tabIndex={tabIndex}
      ref={ref}
      className="movie-card"
      key={item.id}
      style={style(item.id, index)}
      onMouseEnter={(e) => {
        onMouseEnter(e, item.id);
      }}
      onMouseLeave={(e) => {
        onMouseLeave(e, item.id);
      }}
      onClick={(e) => {
        onClick(e, item.id);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={`${item.title}`}
      ></img>
    </a>
  );
}

MovieCard.Simple = function MovieCardSimple({ item, onClick }) {
  return (
    <a
      href="/"
      className="movie-card simple"
      key={item.id}
      onClick={(e) => {
        onClick(e, item.id);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={`${item.title}`}
      />
    </a>
  );
};

MovieCard.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.func,
  tabIndex: PropTypes.string,
  focusFirst: PropTypes.bool,
  currentlyDisplayed: PropTypes.object,
  needFocus: PropTypes.bool,
};

MovieCard.Simple.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default MovieCard;

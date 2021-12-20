import React, { useRef, useEffect } from 'react';
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
  const handleMouseEnter = (e, id) => {
    onMouseEnter(e, id);
  };
  const handleMouseLeave = (e, id) => {
    onMouseLeave(e, id);
  };
  const handleClick = (e, id) => {
    onClick(e, id);
  };
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
        handleMouseEnter(e, item.id);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e, item.id);
      }}
      onClick={(e) => {
        handleClick(e, item.id);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={`${item.title}`}
      />
    </a>
  );
}

MovieCard.Simple = function MovieCardSimple({ item, index, onClick }) {
  const handleClick = (e, id) => {
    onClick(e, id);
  };
  return (
    <a
      href="/"
      className="movie-card simple"
      key={item.id}
      onClick={(e) => {
        handleClick(e, item.id);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={`${item.title}`}
      />
    </a>
  );
};
export default MovieCard;

import React from 'react';
import './MovieCard.scss';

function MovieCard({
  item,
  index,
  onMouseEnter,
  onMouseLeave,
  onClick,
  style,
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

  return (
    <div // MovieCard. {item} onClick={handleClickFilm}
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
    </div>
  );
}

MovieCard.Simple = function MovieCardSimple({ item, index, onClick }) {
  const handleClick = (e, id) => {
    onClick(e, id);
  };
  return (
    <div
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
    </div>
  );
};
export default MovieCard;

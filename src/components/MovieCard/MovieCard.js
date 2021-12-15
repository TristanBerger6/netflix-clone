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
  const handleOnClick = (e, id) => {
    onClick(e, id);
  };

  return (
    <div // MovieCard. {item} onClick={handleClickFilm}
      className="movie-card"
      key={item.id}
      style={style(item.id, index)} // a envoyer
      onMouseEnter={(e) => {
        handleMouseEnter(e, item.id);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e, item.id);
      }}
      onClick={(e) => {
        handleOnClick(e, item.id);
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt="item.title"
      />
    </div>
  );
}

export default MovieCard;

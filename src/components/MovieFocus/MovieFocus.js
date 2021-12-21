import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './MovieFocus.scss';
import { fetchMovie, fetchVideos } from '../../constants/requests';
import { useFetch } from '../../utils/useFetch';

function MovieFocus({ movieToFocus, removeMovie }) {
  const [active, setActive] = useState('');
  const [movieInfos, movieInfosError, movieInfosLoading] = useFetch(
    fetchMovie(movieToFocus.id)
  );
  const [movieVideos, movieVideosError, movieVideosLoading] = useFetch(
    fetchVideos(movieToFocus.id)
  );
  const [videoUrl, setVideoUrl] = useState('');
  const [timeoutId, setTimeoutId] = useState('');

  const ref = useRef();

  const handleClick = () => {
    window.scrollTo(0, 0);
    removeMovie();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 9) {
      ref.current.focus();
    }
    if (e.keyCode === 27) {
      handleClick();
    }
  };

  useEffect(() => {
    // to trigger the transition between non-active and active state
    setTimeout(() => {
      setActive('active');
      ref.current.focus();
    }, 1);
  }, []);

  useEffect(() => {
    if (movieVideos) {
      if (movieVideos.results.length === 0) {
        setVideoUrl('');
      } else {
        setVideoUrl(
          `https://www.youtube.com/embed/${
            movieVideos.results.find((item) => item.type === 'Trailer').key
          }`
        );
      }
    }
  }, [movieVideos]);

  // ---------- Loading --------------------//
  // if loads for more than 4s, close the movie focus
  useEffect(() => {
    const id = setTimeout(() => {
      removeMovie();
    }, 4000);
    setTimeoutId(id);
  }, []);

  useEffect(() => {
    if (!(movieInfosLoading || movieVideosLoading)) {
      clearTimeout(timeoutId);
    }
  }, [movieInfosLoading, movieVideosLoading, timeoutId]);

  if (movieInfos && movieVideos) {
    return (
      <div
        className={`movie-focus-container ${active}`}
        tabIndex="-1"
        ref={ref}
        onKeyDown={handleKeyDown}
      >
        <div className="movie-focus text-white">
          <div>
            <div className="movie-focus__img flex">
              <img
                src={`https://image.tmdb.org/t/p/original${movieInfos.backdrop_path}`}
                alt="item.title"
              />
            </div>
            <div className="movie-focus__text flex">
              <div className="movie-focus__text__desc flow">
                <p className="fs-600 fw-700">{movieInfos.title}</p>
                <p className="fs-500">{movieInfos.overview}</p>
              </div>
              <div className="movie-focus__text__infos flow">
                <p>
                  <span>Sortie : </span> {movieInfos.release_date}
                </p>
                <p>
                  <span>Durée : </span> {movieInfos.runtime}min
                </p>
                <p>
                  <span>Note moyenne : </span> {movieInfos.vote_average}
                </p>
                <p>
                  <span>Genres : </span>
                  {movieInfos.genres.map((item) => (
                    <i key={item.id}>{item.name} </i>
                  ))}
                </p>
              </div>
            </div>
            <div className="movie-focus__video">
              <iframe
                title="movie trailer"
                key={movieVideos.id}
                src={videoUrl}
                allowFullScreen="allowFullScreen"
              />
            </div>
          </div>

          <button
            className="movie-focus__close"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            <img src="/images/close.png" alt="close" />
          </button>
        </div>
      </div>
    );
  } else if (movieInfosLoading || movieVideosLoading) {
    return (
      <div className={`movie-focus-container `} tabIndex="-1" ref={ref}>
        <div className="empty"></div>;
      </div>
    );
  } else if (movieInfosError || movieVideosError) {
    return (
      <div
        className={`movie-focus-container ${active}`}
        tabIndex="-1"
        ref={ref}
      >
        <div className="movie-focus text-white">
          <div className="movie-focus-error">Error</div>
          <div className="movie-focus__close" onClick={removeMovie}>
            <img src="./images/close.png" alt="close" />
          </div>
        </div>
      </div>
    );
  }
}

MovieFocus.propTypes = {
  removeMovie: PropTypes.func,
  movieToFocus: PropTypes.object,
};

export default MovieFocus;

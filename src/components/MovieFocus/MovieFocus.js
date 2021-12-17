import React from 'react';
import './MovieFocus.scss';
import { fetchMovie, fetchVideos } from '../../constants/requests';
import { useFetch } from '../../utils/useFetch';
import { useEffect, useState } from 'react/cjs/react.development';

function MovieFocus({ movieToFocus, removeFilm }) {
  const [active, setActive] = useState('');
  const [movieInfos, movieInfosError, movieInfosLoading] = useFetch(
    fetchMovie(movieToFocus.id)
  );
  const [movieVideos, movieVideosError, movieVideosLoading] = useFetch(
    fetchVideos(movieToFocus.id)
  );
  const [videoUrl, setVideoUrl] = useState('');
  const [timeoutId, setTimeoutId] = useState('');

  const handleClick = () => {
    window.scrollTo(0, 0);
    removeFilm();
  };
  useEffect(() => {
    // to trigger the transition between non-active and active state
    setTimeout(() => {
      setActive('active');
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
      removeFilm();
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
      <div className={`film-focus-container ${active}`}>
        <div className="film-focus text-white">
          <div>
            <div className="film-focus__img flex">
              <img
                src={`https://image.tmdb.org/t/p/original${movieInfos.backdrop_path}`}
                alt="item.title"
              />
            </div>
            <div className="film-focus__text flex">
              <div className="film-focus__text__desc flow">
                <p className="fs-600 fw-700">{movieInfos.title}</p>
                <p className="fs-500">{movieInfos.overview}</p>
              </div>
              <div className="film-focus__text__infos flow">
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
            <div className="film-focus__video">
              <iframe
                title="movie trailer"
                key={movieVideos.id}
                src={videoUrl}
                allowFullScreen="allowFullScreen"
              />
            </div>
          </div>

          <div className="film-focus__close" onClick={handleClick}>
            <img src="/images/close.png" alt="close" />
          </div>
        </div>
      </div>
    );
  } else if (movieInfosLoading || movieVideosLoading) {
    return (
      <div className={`film-focus-container `}>
        <div className="empty"></div>;
      </div>
    );
  } else if (movieInfosError || movieVideosError) {
    return (
      <div className={`film-focus-container ${active}`}>
        <div className="film-focus text-white">
          <div className="film-focus-error">Error</div>
          <div className="film-focus__close" onClick={removeFilm}>
            <img src="./images/close.png" alt="close" />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieFocus;

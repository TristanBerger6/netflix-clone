import React, { useState } from 'react';
import './browse.scss';
import { useFetch } from '../utils/useFetch';
import { fetchGenres } from '../constants/requests';
import GenreSlider from '../components/GenreSlider/GenreSlider';
import Header from '../components/Header/Header';
import Logo from '../components/Logo/Logo';
import { useEffect } from 'react/cjs/react.development';
import MovieFocus from '../components/MovieFocus/MovieFocus';

function BrowseContainer({ error, currentUser, onClick }) {
  // ---------- Fetch -----------------------------//
  const [horror, horrorError, horrorLoading] = useFetch(fetchGenres.horror);
  const [trending, trendingError, trendingLoading] = useFetch(
    fetchGenres.trending
  );
  const [topRated, topRatedError, topRatedLoading] = useFetch(
    fetchGenres.topRated
  );
  const [action, actionError, actionLoading] = useFetch(fetchGenres.action);
  const [adventure, adventureError, adventureLoading] = useFetch(
    fetchGenres.adventure
  );
  const [animation, animationError, animationLoading] = useFetch(
    fetchGenres.animation
  );
  const [comedy, comedyError, comedyLoading] = useFetch(fetchGenres.comedy);
  const [documentary, documentaryError, documentaryLoading] = useFetch(
    fetchGenres.documentary
  );
  const [drama, dramaError, dramaLoading] = useFetch(fetchGenres.drama);
  const [fantasy, fantasyError, fantasyLoading] = useFetch(fetchGenres.fantasy);
  const [romance, romanceError, romanceLoading] = useFetch(fetchGenres.romance);
  const [scifi, scifiError, scifiLoading] = useFetch(fetchGenres.scifi);
  const [thriller, thrillerError, thrillerLoading] = useFetch(
    fetchGenres.thriller
  );
  const [war, warError, warLoading] = useFetch(fetchGenres.war);

  //----------------------States ---------------------//
  const [scroll, setScroll] = useState('top'); // header opacity at the top
  const [activeMovieFocus, setActiveMovieFocus] = useState(false); // set focus of a film
  const [movieToFocus, setMovieToFocus] = useState('');
  const [scrollValue, setScrollValue] = useState(-1);
  const [posFixed, setPosFixed] = useState(false);

  // ------------------ Scroll --------------------------//
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset === 0) {
      setScroll('top');
    } else {
      setScroll('');
    }
  };
  useEffect(() => {
    if (movieToFocus) {
      setScrollValue(window.scrollY);
    }
  }, [movieToFocus]);

  // --------------------- Film focus ----------------------------//
  const displayFilm = (current) => {
    // triggered by GenreSlider on click of a film
    setActiveMovieFocus(true);
    setMovieToFocus(current);
    setPosFixed(true);
  };
  const removeFilm = async function (e) {
    // triggered by cross in Movie Focus
    setMovieToFocus('');
    setActiveMovieFocus(false);
    setPosFixed(false);
    setTimeout(() => {
      window.scrollBy(0, scrollValue);
    }, 0);
    setScrollValue(-1);
  };
  // ---------------------- Styles ------------------------------//
  const poster_style = () => {
    if (trending) {
      return {
        background: `url(https://image.tmdb.org/t/p/original${trending.results[0].backdrop_path}) no-repeat`,
        backgroundSize: 'cover',
      };
    }
  };
  const browse_style = () => {
    if (scrollValue > 0 && posFixed) {
      return {
        top: `-${scrollValue}px`,
        position: 'fixed',
      };
    } else if (scrollValue === 0 && posFixed) {
      return {
        position: 'fixed',
      };
    }

    return { position: 'relative' };
  };

  return (
    <div>
      {activeMovieFocus && (
        <MovieFocus movieToFocus={movieToFocus} removeFilm={removeFilm} />
      )}
      <div className="browse bg-grey-dark" style={browse_style()}>
        <Header bg={`fixed ${scroll}`}>
          <div className="browse__head flex">
            <Logo state="not-clickable" />
            <button onClick={onClick}>Log Out</button>
          </div>
        </Header>
        <div className="poster" style={poster_style()}></div>

        <GenreSlider
          title="Tendances"
          resFetch={trending}
          errFetch={trendingError}
          loadFetch={trendingLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Les mieux notés"
          resFetch={topRated}
          errFetch={topRatedError}
          loadFetch={topRatedLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Horreur"
          resFetch={horror}
          errFetch={horrorError}
          loadFetch={horrorLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Action"
          resFetch={action}
          errFetch={actionError}
          loadFetch={actionLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Aventure"
          resFetch={adventure}
          errFetch={adventureError}
          loadFetch={adventureLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Films d'animation"
          resFetch={animation}
          errFetch={animationError}
          loadFetch={animationLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Comédies"
          resFetch={comedy}
          errFetch={comedyError}
          loadFetch={comedyLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Documentaires"
          resFetch={documentary}
          errFetch={documentaryError}
          loadFetch={documentaryLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Drames"
          resFetch={drama}
          errFetch={dramaError}
          loadFetch={dramaLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Fantastiques"
          resFetch={fantasy}
          errFetch={fantasyError}
          loadFetch={fantasyLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Science-Fiction"
          resFetch={scifi}
          errFetch={scifiError}
          loadFetch={scifiLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Romance"
          resFetch={romance}
          errFetch={romanceError}
          loadFetch={romanceLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Thriller"
          resFetch={thriller}
          errFetch={thrillerError}
          loadFetch={thrillerLoading}
          displayFilm={displayFilm}
        />
        <GenreSlider
          title="Guerre"
          resFetch={war}
          errFetch={warError}
          loadFetch={warLoading}
          displayFilm={displayFilm}
        />
      </div>
    </div>
  );
}

export default BrowseContainer;

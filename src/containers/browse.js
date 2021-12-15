import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './browse.scss';
import { useFetch } from '../utils/useFetch';
import { fetchGenres } from '../constants/requests';
import GenreSlider from '../components/GenreSlider/GenreSlider';
import Header from '../components/Header/Header';
import Logo from '../components/Logo/Logo';
import MovieFocus from '../components/MovieFocus/MovieFocus';

function BrowseContainer({ error, currentUser, onClick }) {
  // ---------- Fetch Hook -----------------------------//
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

  // --------------------Search Hook ---------------//

  let [searchParams, setSearchParams] = useSearchParams();

  //----------------------States ---------------------//
  const [genresDisplayed, setGenreDisplayed] = useState('all');
  const [top, setTop] = useState('top'); // header opacity at the top
  const [activeMovieFocus, setActiveMovieFocus] = useState(false);
  const [movieToFocus, setMovieToFocus] = useState('');
  const [scrollValue, setScrollValue] = useState(-1);
  const [posFixed, setPosFixed] = useState(false);
  const [needScroll, setNeedScroll] = useState(false);

  // ------------------ Scroll header --------------------------//
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    window.pageYOffset === 0 ? setTop('top') : setTop('');
  };

  // --------------------- Film focus ----------------------------//
  useEffect(() => {
    // when focus movie needed, save the current scroll
    if (movieToFocus) {
      setScrollValue(window.scrollY);
    }
  }, [movieToFocus]);

  const displayFilm = (current) => {
    // triggered by MovieCard on click
    setActiveMovieFocus(true);
    setMovieToFocus(current);
    setPosFixed(true);
  };
  const removeFilm = async function (e) {
    // triggered by cross in Movie Focus
    setMovieToFocus('');
    setPosFixed(false);
    // from pos fixed to relative, the page go back to the top
    setNeedScroll(true); // need scroll will prescroll the page with pos relative + top pos
    // when passing from pos fixed to relative.
    setTimeout(() => {
      // act asynchronous, meaning it will wait next render
      // page is prescrolled, now we can make pos relative + scroll immediately
      setScrollValue(-1);
      setNeedScroll(false);
      window.scrollTo({
        top: scrollValue,
        behavior: 'instant',
      });
    }, 0);
    setActiveMovieFocus(false);
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
    if (scrollValue > 0 && needScroll === true) {
      return { top: `-${scrollValue}px`, position: 'relative' };
    } else if (scrollValue > 0 && posFixed) {
      return { top: `-${scrollValue}px`, position: 'fixed' };
    } else if (scrollValue === 0 && posFixed) {
      return { position: 'fixed' };
    }
    return { position: 'relative' }; // default scrollValue = -1.
  };

  // ------------------- Search --------------------//
  const handleOnChange = (event) => {
    let filter = event.target.value;
    if (filter) {
      setSearchParams({ filter }); // écrit dans l'url ?filter="valeur de filter"
      setGenreDisplayed('');
    } else {
      setSearchParams({});
      setGenreDisplayed('all');
    }
  };

  return (
    <div>
      {activeMovieFocus && (
        <MovieFocus movieToFocus={movieToFocus} removeFilm={removeFilm} />
      )}
      <div className="browse bg-grey-dark" style={browse_style()}>
        <Header bg={`fixed ${top}`}>
          <div className="browse__head flex">
            <Logo state="not-clickable" />
            <button onClick={onClick}>Log Out</button>
            <input
              value={searchParams.get('filter')}
              onChange={handleOnChange}
            ></input>
          </div>
        </Header>
        {genresDisplayed === 'all' ? (
          <>
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
          </>
        ) : (
          <p></p> // MovieSearch fetch +render movie card. Props displayfilm passed to Movie cardon Click
        )}
      </div>
    </div>
  );
}

export default BrowseContainer;

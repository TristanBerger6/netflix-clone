import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams, useParams } from 'react-router-dom';
import './browse.scss';
import { useFetch } from '../utils/useFetch';
import { fetchGenres } from '../constants/requests';

import GenreSlider from '../components/GenreSlider/GenreSlider';
import Header from '../components/Header/Header';
import Logo from '../components/Logo/Logo';
import MovieFocus from '../components/MovieFocus/MovieFocus';
import MovieSearch from '../components/MovieSearch/MovieSearch';
import HeroBannerBrowse from '../components/HeroBanner/HeroBannerBrowse';
import Footer from '../components/Footer/Footer';
import FooterData from '../components/Footer/Footer.json';
import GENRES from '../constants/genres.json';

function BrowseContainer({ onClick }) {
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

  // --------------------Params ---------------//

  let [searchParams, setSearchParams] = useSearchParams('');
  let params = useParams();

  // ----------------- Accessiblity --------------//

  const [currentlyDisplayed, setCurrentlyDisplayed] = useState();
  const [needFocus, setNeedFocus] = useState(false);

  //----------------------States ---------------------//
  const [genresDisplayed, setGenreDisplayed] = useState('all');
  const [top, setTop] = useState('top'); // header opacity at the top
  const [activeMovieFocus, setActiveMovieFocus] = useState(false);
  const [movieToFocus, setMovieToFocus] = useState('');
  const [scrollValue, setScrollValue] = useState(-1);
  const [posFixed, setPosFixed] = useState(false);
  const [needScroll, setNeedScroll] = useState(false);

  // ------------------ Scroll --------------------------//

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    window.pageYOffset === 0 ? setTop('top') : setTop('');
  };

  // --------------------- movie focus ----------------------------//
  useEffect(() => {
    // when focus movie needed, save the current scroll
    if (movieToFocus) {
      setScrollValue(window.scrollY);
    }
  }, [movieToFocus]);

  const displayMovie = (current) => {
    // triggered by MovieCard on click
    setNeedFocus(false);
    setActiveMovieFocus(true);
    setMovieToFocus(current);
    setPosFixed(true);
    setTimeout(() => {
      // act asynchron, it will wait next render
      window.scrollTo(0, 0); // scroll top when MovieFocus is rendered
      current !== trending.results[0]
        ? setCurrentlyDisplayed(current)
        : setCurrentlyDisplayed();
    }, 0);
  };
  const removeMovie = async function (e) {
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
      window.scrollTo(0, scrollValue);
      setNeedFocus(true);
      setTimeout(() => setNeedFocus(false), 10);
    }, 100);
    setActiveMovieFocus(false);
  };
  // ---------------------- Styles ------------------------------//
  const poster_style = () => {
    if (trending) {
      return {
        background: `url(https://image.tmdb.org/t/p/original${trending.results[0].backdrop_path}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      };
    }
  };
  const browse_style = () => {
    if (needScroll === true) {
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

  useEffect(() => {
    if (params.genre) {
      setGenreDisplayed(params.genre);
    } else if (!params.genre && searchParams.get('filter') === null) {
      setGenreDisplayed('all');
    }
    setTimeout(() => window.scrollTo(0, 0), 0); // scroll top after rendering
  }, [params, searchParams]);

  return (
    <div>
      {activeMovieFocus && (
        <MovieFocus movieToFocus={movieToFocus} removeMovie={removeMovie} />
      )}
      <div className="browse bg-grey-dark" style={browse_style()}>
        <Header bg={`fixed ${top}`}>
          <h1 className="sr-only">Accueil Netflix</h1>
          <div className="browse__head flex">
            <div className="browse__head__left flex">
              <Logo state="clickable" route="browse" />
              <Header.BrowseNav />
            </div>
            <div className="browse__head__right flex">
              <Header.BrowseSearch
                onChange={handleOnChange}
              ></Header.BrowseSearch>
              <Header.BrowseOut onClick={onClick} />
            </div>
          </div>
        </Header>

        <main>
          {!searchParams.get('filter') ? (
            <div>
              {trending ? (
                <HeroBannerBrowse
                  trending={trending}
                  style={poster_style}
                  displayMovie={displayMovie}
                />
              ) : (
                <HeroBannerBrowse.Loading />
              )}
              <div className="browse__genres">
                {genresDisplayed === 'all'
                  ? GENRES.map((item, index) => (
                      <GenreSlider
                        key={index}
                        title={item.title}
                        resFetch={eval(item.resFetch)}
                        errFetch={eval(item.resFetch + 'Error')}
                        loadFetch={eval(item.resFetch + 'Loading')}
                        displayMovie={displayMovie}
                        currentlyDisplayed={currentlyDisplayed}
                        needFocus={needFocus}
                      />
                    ))
                  : GENRES.filter((item) => item.name === genresDisplayed).map(
                      (item, index) => (
                        <GenreSlider
                          key={index}
                          title={item.title}
                          resFetch={eval(item.resFetch)}
                          errFetch={eval(item.resFetch + 'Error')}
                          loadFetch={eval(item.resFetch + 'Loading')}
                          displayMovie={displayMovie}
                          currentlyDisplayed={currentlyDisplayed}
                          needFocus={needFocus}
                        />
                      )
                    )}
              </div>
            </div>
          ) : (
            <MovieSearch displayMovie={displayMovie} render={searchParams} /> // MovieSearch fetch +render movie card. Props displayfilm passed to Movie cardon Click
          )}
        </main>
        <Footer bg="transparent">
          <Footer.Title>
            Des quesions ? Appelez le (+33)0805-543-063
          </Footer.Title>
          <Footer.Grid gridItems={FooterData.browse} />
          <p>Netflix france</p>
        </Footer>
      </div>
    </div>
  );
}

BrowseContainer.propTypes = {
  onClick: PropTypes.func,
};

export default BrowseContainer;

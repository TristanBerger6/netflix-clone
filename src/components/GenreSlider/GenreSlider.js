import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';
import './GenreSlider.scss';
import { useMediaQuery } from 'react-responsive';
import MovieCard from '../MovieCard/MovieCard';

const DIRECTIOM_TYPE = {
  next: 'NEXT',
  prev: 'PREV',
};

function GenreSlider({
  title,
  resFetch,
  errFetch,
  loadFetch,
  displayMovie,
  currentlyDisplayed,
  needFocus,
}) {
  // ----   media query ---------------------//
  const isDesktop = useMediaQuery({
    query: '(min-width: 576px)',
  });

  let nbMovies;
  isDesktop ? (nbMovies = 6) : (nbMovies = 4);

  // --------- States -------------------------//
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(1); // 20 slides, 6 slides per vw. 0 => 0-6 1 => 7-12 2=> 13-18
  const [needTransition, setNeedTransition] = useState(true);
  const [direction, setDirection] = useState('');
  const [hoverMovie, setHoverMovie] = useState(); // id of he movie hovered
  const [focusFirst, setFocusFirst] = useState(false); // focus first movie after prev or next for accessibility

  // ---------- Slider functions ----------------//
  const handleSliderTranslateEnd = (e) => {
    if (e.currentTarget === e.target) {
      // transition comes from this element
      switch (direction) {
        case DIRECTIOM_TYPE.next:
          validNextSlider();
          break;
        case DIRECTIOM_TYPE.prev:
          validPrevSlider();
          break;
        default:
          break;
      }
    }
  };

  const validNextSlider = () => {
    let _current = current;
    _current -= 1;
    const _movies = [...movies, ...movies.slice(0, nbMovies)].slice(
      -movies.length
    );
    setNeedTransition(false);
    setCurrent(_current);
    setMovies(_movies);
  };

  const validPrevSlider = () => {
    let _current = current;
    _current += 1;
    const _movies = [...movies.slice(-nbMovies), ...movies].slice(
      0,
      movies.length
    );
    setNeedTransition(false);
    setCurrent(_current);
    setMovies(_movies);
  };

  const handleNext = () => {
    let _current = current + 1;
    if (_current !== 2) return; // avoid spam click
    setNeedTransition(true);
    setCurrent(_current);
    setDirection(DIRECTIOM_TYPE.next);
    setFocusFirst(true);
  };

  const handlePrev = () => {
    let _current = current - 1;
    if (_current !== 0) return;
    setNeedTransition(true);
    setCurrent(_current);
    setDirection(DIRECTIOM_TYPE.prev);
    setFocusFirst(true);
  };

  const transLateVal = () => {
    if (current === 0 || current === 1 || current === 2) {
      return -(current * 100);
    }
  };

  //---- Styles --------//
  const sliderStyle = () => {
    if (needTransition) {
      return {
        transform: `translateX(${transLateVal()}%)`,
        transition: 'transform 1s ease-in-out',
      };
    }

    return {
      transform: `translateX(${transLateVal()}%)`,
    };
  };

  const movieStyle = (id, index) => {
    if (id === hoverMovie) {
      if (index === current * nbMovies) {
        return {
          minWidth: `calc(100%/${nbMovies})`,
          transform: `scale(1.2) translateX(10%)`,
        };
      }
      if (index === current * nbMovies + nbMovies - 1) {
        return {
          minWidth: `calc(100%/${nbMovies})`,
          transform: `scale(1.2) translateX(-10%)`,
        };
      }
      return {
        minWidth: `calc(100%/${nbMovies})`,
        transform: `scale(1.2)`,
      };
    }

    return {
      minWidth: `calc(100%/${nbMovies})`,
    };
  };

  //----- Movie clicked or hovered ------ //
  const handleMouseEnter = (e, id) => {
    setHoverMovie(id);
  };
  const handleMouseLeave = (e, id) => {
    setHoverMovie();
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    const current = movies.find((item) => item.id === id);
    displayMovie(current);
  };

  useEffect(() => {
    if (resFetch) {
      setMovies(resFetch.results);
    }
  }, [resFetch]);

  if (resFetch) {
    return (
      <div className="genre">
        <h2 className="text-white">{title}</h2>
        <div className="genre__wrapper ">
          <div
            className="genre__slider flex"
            style={sliderStyle()}
            onTransitionEnd={(e) => {
              handleSliderTranslateEnd(e);
            }}
          >
            {movies.map((item, index) => (
              <MovieCard
                key={index}
                style={movieStyle}
                item={item}
                index={index}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                tabIndex={
                  index < current * nbMovies ||
                  index > nbMovies * (current + 1) - 1
                    ? '-1'
                    : '0'
                }
                focusFirst={index === current * nbMovies ? focusFirst : false}
                currentlyDisplayed={currentlyDisplayed}
                needFocus={needFocus}
              />
            ))}
          </div>
          <button className="genre__left-arrow" onClick={handlePrev}>
            <img src="/images/chevron-right.png" alt="left arrow" />
          </button>
          <button className="genre__right-arrow" onClick={handleNext}>
            <img src="/images/chevron-right.png" alt="right arrow" />
          </button>
        </div>
      </div>
    );
  } else if (loadFetch) {
    return (
      <div className="genre-loading bg-black text-white fw-700 fs-600">
        <img src="/images/loading.gif" alt=" loading gif" />
      </div>
    );
  } else if (errFetch) {
    return (
      <div className="genre-error bg-black text-white fw-700 fs-600">
        <p>Error</p>
      </div>
    );
  }
}

GenreSlider.propTypes = {
  title: PropTypes.string,
  resFetch: PropTypes.object,
  errFetch: PropTypes.object,
  loadFetch: PropTypes.bool,
  displayMovie: PropTypes.func,
  currentlyDisplayed: PropTypes.object,
  needFocus: PropTypes.bool,
};

export default GenreSlider;

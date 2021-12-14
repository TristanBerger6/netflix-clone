import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import './GenreSlider.scss';
import { useMediaQuery } from 'react-responsive';

const DIRECTIOM_TYPE = {
  next: 'NEXT',
  prev: 'PREV',
};

function GenreSlider({ title, resFetch, errFetch, loadFetch, displayFilm }) {
  // ----   media query ---------------------//
  const isDesktop = useMediaQuery({
    query: '(min-width: 576px)',
  });

  let nbFilms;
  isDesktop ? (nbFilms = 6) : (nbFilms = 4);

  // --------- States -------------------------//
  const [films, setFilms] = useState([]);
  const [current, setCurrent] = useState(1); // 20 slides, 6 slides per vw. 0 => 0-6 1 => 7-12 2=> 13-18
  const [needTransition, setNeedTransition] = useState(true);
  const [direction, setDirection] = useState('');
  const [hoverFilm, setHoverFilm] = useState(); // id of he film hovered

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
    const _films = [...films, ...films.slice(0, nbFilms)].slice(-films.length);
    setNeedTransition(false);
    setCurrent(_current);
    setFilms(_films);
  };

  const validPrevSlider = () => {
    let _current = current;
    _current += 1;
    const _films = [...films.slice(-nbFilms), ...films].slice(0, films.length);
    setNeedTransition(false);
    setCurrent(_current);
    setFilms(_films);
  };

  const handleNext = () => {
    let _current = current + 1;
    if (_current !== 2) return; // avoid spam click
    setNeedTransition(true);
    setCurrent(_current);
    setDirection(DIRECTIOM_TYPE.next);
  };

  const handlePrev = () => {
    let _current = current - 1;
    if (_current !== 0) return;
    setNeedTransition(true);
    setCurrent(_current);
    setDirection(DIRECTIOM_TYPE.prev);
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

  const filmStyle = (id, index) => {
    if (id === hoverFilm) {
      if (index === current * nbFilms) {
        return {
          minWidth: `calc(100%/${nbFilms})`,
          transform: `scale(1.2) translateX(10%)`,
        };
      }
      if (index === current * nbFilms + nbFilms - 1) {
        return {
          minWidth: `calc(100%/${nbFilms})`,
          transform: `scale(1.2) translateX(-10%)`,
        };
      }
      return {
        minWidth: `calc(100%/${nbFilms})`,
        transform: `scale(1.2)`,
      };
    }

    return {
      minWidth: `calc(100%/${nbFilms})`,
    };
  };

  //----- Film clicked or hovered ------ //
  const handleMouseEnter = (e, id) => {
    setHoverFilm(id);
  };
  const handleMouseLeave = (e, id) => {
    setHoverFilm();
  };

  const handleClickFilm = (e, id) => {
    e.preventDefault();
    const current = films.find((item) => item.id === id);
    displayFilm(current);
  };

  useEffect(() => {
    if (resFetch) {
      setFilms(resFetch.results);
    }
  }, [resFetch]);

  if (resFetch) {
    return (
      <div className="genre">
        <h2 className="text-white">{title}</h2>
        <div className="genre__wrapper ">
          <div className="genre__left-arrow" onClick={handlePrev}>
            <img src="./images/chevron-right.png" alt="left arrow" />
          </div>
          <div className="genre__right-arrow" onClick={handleNext}>
            <img src="./images/chevron-right.png" alt="right arrow" />
          </div>
          <div
            className="genre__slider flex"
            style={sliderStyle()}
            onTransitionEnd={(e) => {
              handleSliderTranslateEnd(e);
            }}
          >
            {films.map((item, index) => (
              <div
                className="genre__slider__item"
                key={item.id}
                style={filmStyle(item.id, index)}
                onMouseEnter={(e) => {
                  handleMouseEnter(e, item.id);
                }}
                onMouseLeave={(e) => {
                  handleMouseLeave(e, item.id);
                }}
                onClick={(e) => {
                  handleClickFilm(e, item.id);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt="item.title"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (loadFetch) {
    return (
      <div className="genre-loading bg-black text-white fw-700 fs-600">
        <img src="./images/loading.gif" alt=" loading gif" />
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

export default GenreSlider;

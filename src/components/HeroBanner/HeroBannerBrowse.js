import React from 'react';
import './HeroBannerBrowse.scss';

function HeroBannerBrowse({ trending, style, displayFilm }) {
  const handleClick = function (e) {
    e.preventDefault();
    displayFilm(trending.results[0]);
  };

  return (
    <div className="banner-browse-container" style={style()}>
      <div className="banner-browse text-white ">
        <span className="fs-600 fw-700">{trending.results[0].title}</span>
        <p className="fs-500">{trending.results[0].overview}</p>
        <button
          className="banner-browse-infos flex text-white"
          onClick={handleClick}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="white"
              d="M 12 3 C 7.02944 3 3 7.02944 3 12 C 3 16.9706 7.02944 21 12 21 C 16.9706 21 21 16.9706 21 12 C 21 7.02944 16.9706 3 12 3 Z M 1 12 C 1 5.92487 5.92487 1 12 1 C 18.0751 1 23 5.92487 23 12 C 23 18.0751 18.0751 23 12 23 C 5.92487 23 1 18.0751 1 12 Z M 13 10 V 18 H 11 V 10 H 13 Z M 12 8.5 C 12.8284 8.5 13.5 7.82843 13.5 7 C 13.5 6.17157 12.8284 5.5 12 5.5 C 11.1716 5.5 10.5 6.17157 10.5 7 C 10.5 7.82843 11.1716 8.5 12 8.5 Z"
            />
          </svg>
          Plus d'infos
        </button>
      </div>
    </div>
  );
}

HeroBannerBrowse.Loading = function HeroBannerBrowseLoading() {
  return (
    <div className="banner-browse-loading">
      <img src="./images/loading.gif" alt=" loading gif" />
    </div>
  );
};

export default HeroBannerBrowse;

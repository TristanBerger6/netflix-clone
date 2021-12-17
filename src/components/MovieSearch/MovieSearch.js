import React, { useEffect, useState } from 'react';
import './MovieSearch.scss';
import { useSearchParams } from 'react-router-dom';
import { fetchQuery } from '../../constants/requests';
import { useFetch } from '../../utils/useFetch';
import MovieCard from '../MovieCard/MovieCard';

function MovieSearch({ displayFilm, render }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const doFetch = async () => {
      try {
        const res = await fetch(fetchQuery(searchParams.get('filter')));
        const json = await res.json();
        if (!signal.aborted) {
          setResponse(json);
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(e);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    doFetch();
    return () => {
      abortController.abort();
    };
  }, [searchParams]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const current = response.results.find((item) => item.id === id);
    displayFilm(current);
  };

  if (response) {
    return (
      <div className="movie-search grid">
        {response.results
          .filter((item) => item.poster_path !== null && item.overview !== '')
          .map((item, index) => (
            <MovieCard.Simple
              key={index}
              item={item}
              index={index}
              onClick={handleClick}
            />
          ))}
      </div>
    );
  } else if (loading) {
    return (
      <div className="movie-search bg-black ">
        <img src="./images/loading.gif" alt=" loading gif" />
      </div>
    );
  } else {
    return <div className="movie-search text-white fs-700">Error</div>;
  }
}

export default MovieSearch;

const API_KEY = process.env.REACT_APP_TMBD_API_KEY;
const URI = 'https://api.themoviedb.org/3';

export const fetchGenres = {
  trending: `${URI}/trending/movie/day?api_key=${API_KEY}&language=fr-FR`,
  topRated: `${URI}/movie/top_rated?api_key=${API_KEY}&language=fr-FR`,
  action: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=28`,
  adventure: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=12`,
  animation: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=16`,
  comedy: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=35`,
  documentary: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=99`,
  drama: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=18`,
  fantasy: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=14`,
  horror: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=27`,
  romance: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=10749`,
  scifi: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=878`,
  thriller: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=53`,
  war: `${URI}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=10752`,
};

export function fetchMovie(id) {
  return `${URI}/movie/${id}?api_key=${API_KEY}&language=fr-FR`;
}

export function fetchVideos(id) {
  return `${URI}/movie/${id}/videos?api_key=${API_KEY}&language=fr-FR`;
}

export function fetchQuery(query) {
  return `${URI}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${query}`;
}

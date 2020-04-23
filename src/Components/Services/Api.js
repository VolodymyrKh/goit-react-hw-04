import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING = 'trending/all/day';
const API_KEY = '?api_key=45e5de9f86a81a996f7173015078039f';

export const fetchPopular = () => axios.get(BASE_URL + TRENDING + API_KEY);
export const fetchWithId = (id) => axios.get(BASE_URL + `movie/${id}` + API_KEY + '&language=en-US');
export const fetchCast = (id) => axios.get(BASE_URL + `movie/${id}/credits` + API_KEY);
export const fetchReview = (id) => axios.get(BASE_URL + `movie/${id}/reviews` + API_KEY + '&language=en-US');
export const fetchSearch = (query) => axios.get(BASE_URL + 'search/movie' + API_KEY + `&language=en-US&query=${query}&page=1&include_adult=false`)

export const getIdFromProps = props => props.match.params.movieId;
export const mapper = items =>
  items.map(({ name: title, ...item }) => ({ title, ...item }));


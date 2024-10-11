import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzFjODk0YzgyMGU0MzAyMWJhMjRjYjc1ZDc4MzQzNSIsIm5iZiI6MTcyODI4NDkzMC40OTQ4ODgsInN1YiI6IjY3MDM4Njg1M2Q3YjNjNmMwNzc5NDkzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CGj9H58aVBfkMiM7zUqh0G9jKYq7ZWpP9hkf9NuQ6Ac',
  },
};

export const fetchTrendingToday = async () => {
  const { data } = await axios.get('trending/movie/day', options);
  return data.results;
};

export const fetchMovieByQuery = async query => {
  const { data } = await axios.get(`search/movie?query=${query}`, options);
  return data.results;
};

export const fetchMovieById = async movie_id => {
  const { data } = await axios.get(`movie/${movie_id}`, options);
  return data;
};

export const fetchCastByMovieId = async movie_id => {
  const { data } = await axios.get(`movie/${movie_id}/credits`, options);
  return data.cast;
};

export const fetchReviewsByMovieId = async movie_id => {
  const { data } = await axios.get(`movie/${movie_id}/reviews`, options);
  return data.results;
};

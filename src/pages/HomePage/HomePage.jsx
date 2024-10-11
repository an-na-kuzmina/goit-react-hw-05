import MovieList from '../../components/MovieList/MovieList';
import s from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchTrendingToday } from '../../services/api';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultEmpty, setIsResultEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsResultEmpty(false);
        setError(false);
        setIsLoading(true);
        const data = await fetchTrendingToday();
        if (data.length === 0) {
          setIsResultEmpty(true);
        }
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h2 className={s.title}>Trending Today</h2>
      {isLoading && <Loader />}
      {isResultEmpty && <h3>No trends for today</h3>}
      {error && <h3>Something went wrong. Please try again</h3>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;

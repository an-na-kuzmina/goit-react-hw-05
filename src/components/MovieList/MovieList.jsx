import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={s.list}>
      {movies.map(movie => (
        <li key={movie.id} className={s.item}>
          <Link
            to={`/movies/${movie.id.toString()}`}
            state={location}
            className={s.link}
          >
            <p>{movie.original_title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

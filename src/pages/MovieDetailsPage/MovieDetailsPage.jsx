import { Suspense, useEffect, useRef, useState } from 'react';
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import clsx from 'clsx';
import s from './MovieDetailsPage.module.css';
import { fetchMovieById } from '../../services/api';
import Loader from '../../components/Loader/Loader';

const MovieDetailsPage = () => {
  const location = useLocation();
  const goBackLink = useRef(location.state ?? '/movies');
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieById(movieId);
        setMovieDetails(data);
      } catch {
        return alert('Something went wrong. Please try again');
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (Object.keys(movieDetails).length === 0) {
    return <Loader />;
  }

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div className={s.wrapper}>
      <Link to={goBackLink.current} className={s.link}>
        Go Back
      </Link>
      <div className={s.movieCard}>
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />

        <div>
          <h3>{movieDetails.original_title}</h3>
          <p>User Score: {Math.ceil(movieDetails.vote_average * 10)}%</p>
          <p className={s.subTitle}>Owerview:</p>
          <p>{movieDetails.overview}</p>
          <p className={s.subTitle}>Genres:</p>
          <div>
            {movieDetails.genres.map(genre => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <p className={s.subTitle}>Additional information:</p>
      <span className={s.span}>
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </span>

      <hr />
      <Suspense fallback={<div>Loading details..please wait</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;

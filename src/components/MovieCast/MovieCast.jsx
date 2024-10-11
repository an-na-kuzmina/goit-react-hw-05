import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import s from './MovieCast.module.css';
import { fetchCastByMovieId } from '../../services/api';
import Loader from '../Loader/Loader';

const MovieCast = () => {
  const { movieId } = useParams();
  const defaultImg =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultEmpty, setIsResultEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsResultEmpty(false);
        setError(false);
        setIsLoading(true);
        const data = await fetchCastByMovieId(movieId);
        if (data.length === 0) {
          setIsResultEmpty(true);
        }
        setCast(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isResultEmpty && <h3>Sorry, cast info is not available</h3>}
      {error && <h3>Something went wrong. Please try again</h3>}
      <h3>Actors:</h3>
      <ul className={s.list}>
        {cast.map(actor => (
          <li className={s.item} key={actor.cast_id}>
            <div className={s.imgWrap}>
              {' '}
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : defaultImg
                }
                width={200}
                alt="poster"
              />
            </div>

            <div>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;

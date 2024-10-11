import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Sorry, this page not found</h2>
      <Link to="/" className={s.link}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

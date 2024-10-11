import { Field, Form, Formik } from 'formik';
import s from './SearchForm.module.css';
import { FcSearch } from 'react-icons/fc';

const SearchForm = ({ onSubmit }) => {
  const initialValues = {
    query: '',
  };

  const handleSubmit = values => {
    onSubmit(values.query);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <div className={s.formWrapper}>
        <Form className={s.form}>
          <Field
            name="query"
            placeholder="Search movies"
            className={s.input}
          />
          <button type="submit" className={s.btn}>
            <FcSearch className={s.icon} />
          </button>
        </Form>
      </div>
    </Formik>
  );
};

export default SearchForm;

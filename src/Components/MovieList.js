import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './MovieList.module.css';
import PropTypes from 'prop-types';

const MovieList = ({ items = [], location }) => (
  <ul className={styles.MovieList}>
    {items.map(item => (
      <li key={item.id}>
        <Link
          to={{
            pathname: `movies/${item.id}`,
            state: { from: location },
          }}
        >
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
);

MovieList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};
export default withRouter(MovieList);

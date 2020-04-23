import React from 'react';
import styles from './Movie.module.css';
import PropTypes from 'prop-types';

const Movie = ({
  poster_path,
  title,
  release_date,
  popularity,
  overview,
  genres,
  onGoback,
}) => (
  <section className={styles.MovieSection}>
    <button type="button" onClick={onGoback} className={styles.GobackBtn}>
      Go back
    </button>
    <div className={styles.Container}>
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          width="250"
          alt=""
          className={styles.Poster}
        />
      ) : (
        <p>Sorry, movie poster is not availeble(</p>
      )}{' '}
      <div className={styles.MovieInformation}>
        <h2>
          {title} ({release_date})
        </h2>

        <p>
          <b>Popularity</b> {popularity}
        </p>
        <p>
          <b>Overview</b>{' '}
        </p>
        <p>{overview}</p>
        <p>
          <b>Genres</b>
        </p>
        <ul className={styles.Genre}>
          {genres.map(genre => (
            <li key={genre.id} className={styles.Item}>
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

Movie.propTypes = {
  onGoback: PropTypes.func.isRequired,
};
export default Movie;

import React, { Component } from 'react';
import * as MovieAPI from '../Services/Api';
import styles from './Cast.module.css';
import PropTypes from 'prop-types';

export default class Cast extends Component {
  static propTypes = {
    cast: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        profile_path: PropTypes.string,
        character: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
  };
  state = { cast: [] };

  componentDidMount() {
    const id = MovieAPI.getIdFromProps(this.props);

    MovieAPI.fetchCast(id).then(({ data }) =>
      this.setState({ cast: data.cast }),
    );
  }

  render() {
    const { cast } = this.state;
    return (
      <>
        <ul>
          {cast.map(item => (
            <li key={item.id} className={styles.CastItem}>
              {item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                  width="100"
                  alt="Poster"
                />
              ) : (
                <p>Poster is missing</p>
              )}
              {item.character && (
                <p>
                  <b>Character:</b> {item.character}
                </p>
              )}
              <p>
                <b>Name:</b> {item.name}
              </p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

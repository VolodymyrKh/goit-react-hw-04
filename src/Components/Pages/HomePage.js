import React, { lazy, Suspense, Component } from 'react';
import * as movieAPI from '../Services/Api';
import PropTypes from 'prop-types';

const AsyncMovieList = lazy(
  () => import('../MovieList') /*webpackChunkName: "movie-list" */,
);

export default class HomePage extends Component {
  static propTypes = {
    popularMovies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        release_date: PropTypes.string,
        popularity: PropTypes.string,
        overview: PropTypes.string,
        genres: PropTypes.string,
      }),
    ),
  };

  state = {
    popularMovies: [],
  };

  componentDidMount() {
    movieAPI
      .fetchPopular()
      .then(({ data }) =>
        this.setState({ popularMovies: movieAPI.mapper(data.results) }),
      );
  }
  render() {
    const { popularMovies } = this.state;

    return (
      <>
        <h1>Trending today</h1>
        <Suspense fallback={<h2>Loading...</h2>}>
          <AsyncMovieList items={popularMovies} />
        </Suspense>
      </>
    );
  }
}

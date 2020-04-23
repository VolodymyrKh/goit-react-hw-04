import React, { lazy, Suspense, Component } from 'react';
import * as movieAPI from '../Services/Api';
import queryString from 'query-string';
import styles from './Movies.module.css';
import PropTypes from 'prop-types';

const AsyncMovieList = lazy(
  () => import('../MovieList') /*webpackChunkName: "movie-list" */,
);
const getQueryValueFromLocation = location =>
  queryString.parse(location.search).query;

export default class MoviePage extends Component {
  static propTypes = {
    queriedMovies: PropTypes.arrayOf(
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
  state = { query: '', queriedMovies: [], isloading: true};

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.history.push({
      ...this.props.location,
      search: `query=${this.state.query}`,
    });

   };

  componentDidMount() {
    const { location } = this.props;
    const qsValue = getQueryValueFromLocation(location);

    if (qsValue) {
      movieAPI
        .fetchSearch(qsValue)
        .then(({ data }) => this.setState({ queriedMovies: data.results }));
    }
  }

  componentDidUpdate(prevPros, prevState) {
    const pervQuery = getQueryValueFromLocation(prevPros.location);
    const currentQuery = getQueryValueFromLocation(this.props.location);
    

    if (currentQuery && pervQuery !== currentQuery) {
      this.setState({ isLoading: false });
      movieAPI
        .fetchSearch(currentQuery)
        .then(({ data }) => this.setState({ queriedMovies: data.results }))
        .finally(()=>this.setState({isLoading: true}));
    }
  }

  render() {
    const { query,  queriedMovies, isLoading } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={query}
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            onChange={this.handleChange}
            className={styles.MovieInput}
          />

          <button type="submit" className={styles.SearchBtn}>
            Search
          </button>
        </form>
        <Suspense fallback={<h2>Loading...</h2>}>
          {queriedMovies.length > 0 && <AsyncMovieList items={queriedMovies} />}
          {!queriedMovies.length && isLoading && (
            <h5>No matched found, please try again</h5>
          )}


        </Suspense>
      </>
    );
  }
}

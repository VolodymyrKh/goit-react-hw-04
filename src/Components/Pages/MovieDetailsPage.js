import React, { lazy, Suspense, Component } from 'react';
import { Route } from 'react-router-dom';
import * as movieAPI from '../Services/Api';
import PropTypes from 'prop-types';

const AsyncMovie = lazy(
  () => import('../Movie') /*webpackChunkName: "movie-details" */,
);
const AsyncAddInfo = lazy(
  () => import('../AddInfo/AddInfo') /*webpackChunkName: "additional-info" */,
);
const AsyncCast = lazy(
  () => import('../Cast/Cast') /*webpackChunkName: "cast" */,
);
const AsyncReviews = lazy(
  () => import('../Reviews/Reviews') /*webpackChunkName: "reviews" */,
);

export default class MovieDetails extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      poster_path: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
      popularity: PropTypes.string,
      overview: PropTypes.string,
      genres: PropTypes.string,
    }),
  };

  state = {
    movie: null,
  };
  componentDidMount() {
    const id = movieAPI.getIdFromProps(this.props);
    movieAPI
      .fetchWithId(id)
      .then(({ data }) =>
        this.setState({
          movie: { ...data, release_date: data.release_date.split('-')[0] },
        }),
      );
  }

  handleGoback = () => {
    const { location } = this.props;
    if (location.state) {
      return this.props.history.push(location.state.from);
    }

    this.props.history.push('/');
  };

  render() {
    const { movie } = this.state;

    const { location } = this.props;
    const goBackLocation = location.state ? location.state.from : {};

    return (
      <>
        <Suspense fallback={<h2>Loading...</h2>}>
          {movie && <AsyncMovie {...movie} onGoback={this.handleGoback} />}
          <AsyncAddInfo {...movie} goBackLocation={goBackLocation} />
          <Route path={`${this.props.match.path}/cast`} component={AsyncCast} />
          <Route
            path={`${this.props.match.path}/reviews`}
            component={AsyncReviews}
          />
        </Suspense>
      </>
    );
  }
}

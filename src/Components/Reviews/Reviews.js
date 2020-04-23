import React, { Component } from 'react';
import * as MovieAPI from '../Services/Api';
import PropTypes from 'prop-types';

export default class Cast extends Component {
  static propTypes = {
    revievs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ),
  };
  state = { reviews: [], isLoading: true };

  componentDidMount() {
    const id = MovieAPI.getIdFromProps(this.props);
    this.setState({isLoading: false})
    MovieAPI.fetchReview(id).then(({ data }) =>
      this.setState({ reviews: data.results }),
    ).finally(()=>this.setState({isLoading: true}));
  }

  render() {
    const { reviews, isLoading } = this.state;
    return (
      <>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(item => (
              <li key={item.id}>
                <p>Author: {item.author}</p>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (isLoading &&
          <p>Sorry, no reviews</p>
        )}
      </>
    );
  }
}

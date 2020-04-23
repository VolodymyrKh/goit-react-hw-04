import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './AddInfo.module.css';
import Proptypes from 'prop-types'

const AddInfo = ({ id, goBackLocation}) => (
  <section className={styles.AddInfoSection}>
    <p>Additional information</p>
    <ul className={styles.List}>
      <li>
        <Link
          to={{
            pathname: `/movies/${id}/cast`,
            state: { from: goBackLocation },
          }}
        >
          Cast
        </Link>
      </li>
      <li>
        <Link
          to={{
            pathname: `/movies/${id}/reviews`,
            state: { from: goBackLocation },
          }}
        >
          Reviews
        </Link>
      </li>
    </ul>
  </section>
);

AddInfo.propTypes ={
  goBackLocation: Proptypes.shape({
    pathname: Proptypes.string,
    search: Proptypes.string,
    state: Proptypes.string,
  })
}
export default withRouter(AddInfo);



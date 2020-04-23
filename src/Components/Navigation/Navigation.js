import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const activeStyle = {
  color: 'pale',
  };

const Nav = () => (
  <header className={styles.Header}>
    <nav className={styles.PageNav}>
      <ul className={styles.NavList}>
        <li >
          <NavLink to="/" exact activeStyle={activeStyle} className={styles.Link} >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" activeStyle={activeStyle} className={styles.Link}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Nav;

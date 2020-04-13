import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.scss';

export const Header = () => (
  <div className="container-l">
    <div className={styles.headerContent}>
      <NavLink className={styles.headerLink} activeClassName="active" to="/">
        Home
      </NavLink>
    </div>
  </div>
);

export default Header;

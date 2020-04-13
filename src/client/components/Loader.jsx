import React from 'react';
import styles from './Loader.scss';

export const Loader = ({ adaptive }) => (
  <div className={`${styles.spinner} ${adaptive ? styles.adaptive : ''}`} />
);

export default Loader;

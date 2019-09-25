import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

export default class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <nav className={styles.container}>
          <Link to="/">Home</Link> <Link to="/about">About</Link>
        </nav>
      </div>
    );
  }
}

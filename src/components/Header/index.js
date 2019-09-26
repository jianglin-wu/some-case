import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

export default class Header extends React.PureComponent {
  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.container}>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/archives">Archives</Link>
          <Link style={{ float: 'right' }} to="/about">About</Link>
        </nav>
      </header>
    );
  }
}

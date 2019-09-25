import React from 'react';
import styles from './index.css';

export default class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <nav className={styles.container}>
          <a href="/">Home</a> <a href="#Archives">Archives</a>
        </nav>
      </div>
    );
  }
}

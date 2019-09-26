import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classNames';
import stylesCommon from '@/components/styles';
import styles from './index.css';

const clsNav = classNames(styles.nav, stylesCommon.container);
export default class Header extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <header className={styles.header}>
        <nav className={clsNav}>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/archives">Archives</Link>
          <Link style={{ float: 'right' }} to="/about">
            About
          </Link>
        </nav>
        {title && <h1 className={styles.title}>{title}</h1>}
      </header>
    );
  }
}

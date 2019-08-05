import React from 'react';
import './index.css';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <div className="container">
          <a href="/">Home</a>
          {' '}
          <a href="#Archives">Archives</a>
          {' '}
          <a style={{ float: 'right' }} href="#About">About</a>
        </div>
      </nav>
    );
  }
}

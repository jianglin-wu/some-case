import React from 'react';
import './index.css';
import Header from '@/components/Header/index.js';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
      </div>
    );
  }
}
